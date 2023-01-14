import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { SignUpModel } from "./models/signUp.model";
import * as moment from "moment";
import * as crypto from "crypto";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "../../common/entities/user.entity";
import { DataSource, Repository } from "typeorm";
import { ProfileEntity } from "../../common/entities/profile.entity";
import { RoleEntity } from "../../common/entities/role.entity";
import {
  generatePasswordHash,
  generateSalt,
  generateTokenHash,
} from "../../common/utils/auth.utils";
import { ROLES } from "../../common/constants/roles.constants";
import { TransportService } from "../../shared/transport/transport.service";
import { TemplateType } from "../../common/constants/email-templates";
import { SignInModel } from "./models/signIn.model";
import { SessionService } from "../../common/session/session.service";
import { UserProfileOutputDto } from "./dto/user-profile.output.dto";
import { ForgotPasswordModel } from "./models/forgotPassword.model";

import { post } from "request-promise";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @InjectRepository(ProfileEntity)
    private profileRepository: Repository<ProfileEntity>,
    @InjectRepository(RoleEntity)
    private roleRepository: Repository<RoleEntity>,
    private dataSource: DataSource,
    private transport: TransportService
  ) {}

  async findCurrentProfile(id: number) {
    if (!id) {
      throw new NotFoundException("User not found");
    }

    const profile = await this.userRepository
      .createQueryBuilder("user")
      .leftJoinAndSelect("user.profile", "profile")
      .leftJoinAndSelect("user.role", "role")
      .whereInIds([id])
      .getOne();
    return new UserProfileOutputDto(profile);
  }

  login(user: SignInModel, session: SessionService) {
    if (!user.role) {
      throw new UnauthorizedException();
    }
    session.setUser(user.id, user.email, user.role ? user.role.title : null);
    return {
      statusCode: 201,
    };
  }

  private async findUserByToken(token: string, tokenType: string) {
    const user = await this.userRepository.findOne({
      where: { [tokenType]: token },
    });
    if (!user) {
      throw new NotFoundException("Token is not valid");
    }

    if (user.tokenExpirationDate < moment.utc().toDate()) {
      throw new BadRequestException(
        "Token link has been expired. Please proceed to account creation"
      );
    }
    if (user.enabled) {
      throw new BadRequestException("User has already been activated");
    }
    return user;
  }

  async activate(token: string): Promise<{ statusCode: number }> {
    const user = await this.findUserByToken(token, "confirmToken");

    user.confirmToken = null;
    user.enabled = true;
    await this.userRepository.save(user);
    return { statusCode: 204 };
  }

  async validateUser(username: string, password: string) {
    const user = await this.findOneByUsername(username);
    if (!user) {
      throw new UnauthorizedException(
        "Account with this email isn’t registered"
      );
    }
    if (!user.enabled) {
      throw new ForbiddenException(
        "User is not active or has been deactivated"
      );
    }

    if (
      user &&
      crypto.timingSafeEqual(
        Buffer.from(user.passwordHash),
        Buffer.from(generatePasswordHash(password, user.passwordSalt))
      )
    ) {
      return user;
    }
    throw new UnauthorizedException("Wrong Password");
  }

  private async findOneByUsername(email) {
    return this.userRepository.findOne({
      where: { email },
      relations: ["role"],
    });
  }

  private async createUser(data: SignUpModel) {
    const { email, firstName, password, phone, lastName, username } = data;

    const existsUser = await this.findOneByUsername(email);

    if (existsUser) {
      if (!existsUser.enabled) {
        throw new ForbiddenException("User is not active.");
      }
      if (
        existsUser.token &&
        existsUser.tokenExpirationDate < moment.utc().toDate()
      ) {
        await this.profileRepository.delete({ id: existsUser.id });
        await this.userRepository.delete({ id: existsUser.id });
      } else {
        throw new ConflictException("Account with this email is existed");
      }
    }

    const passwordSalt = generateSalt();
    const passwordHash = generatePasswordHash(password, passwordSalt);
    const token = generateTokenHash("sha1", data.email);
    const confirmToken = generateTokenHash("sha1", token);

    try {
      const role = await this.roleRepository.findOneBy({
        title: ROLES.USER,
      });

      return await this.dataSource.transaction(async () => {
        const user = await this.userRepository.save({
          email,
          passwordSalt,
          passwordHash,
          confirmToken,
          token,
          role,
          tokenExpirationDate: moment.utc().add(24, "h").toDate(),
          createDate: moment.utc().toDate(),
        });

        await this.profileRepository.save({
          id: user.id,
          firstName,
          lastName,
          username,
          phone,
        });

        return user;
      });
    } catch (e) {
      if (e.code === "ER_DUP_ENTRY") {
        throw new ConflictException();
      }
      throw e;
    }
  }

  async signup(data: SignUpModel): Promise<string> {
    try {
      if (!data.isAgreement) {
        throw new Error("Accept the Terms Of Agreement for registration");
      }
      const newUser = await this.createUser(data);
      return newUser.token;
    } catch (e) {
      throw e;
    }
  }

  private async findProfileById(id: number) {
    return this.profileRepository.findOne({
      where: { id: id },
    });
  }

  async getUserInfo(token: string): Promise<{ email: string; phone: string }> {
    const user = await this.findUserByToken(token, "token");
    const profile = await this.findProfileById(user.id);
    return { email: user.email, phone: profile.phone };
  }

  async validateUserEmail(token: string, domain: string) {
    const user = await this.findUserByToken(token, "token");

    await this.transport.send(
      TemplateType.EmailConfirmation,
      {
        from: '"Do not reply" <stream-service@example.com>',
        to: user.email,
        subject: "Confirm registration for StreamService",
      },
      {
        confirm_link: `${domain}/${process.env.CONFIRMATION_LINK}?token=${user.confirmToken}`,
      }
    );
    return { statusCode: 204 };
  }
  async validateUserPhone(token: string, domain: string) {
    const user = await this.findUserByToken(token, "token");

    post({
      uri: "https://api.zenvia.com/v2/channels/sms/messages",
      headers: {
        "X-API-TOKEN": "WajyfHoetoY7DZAnPZOiicT4Aop74kFmfqhS",
      },
      body: {
        from: "belle.nastja",
        to: "+375295209720",
        contents: [
          {
            type: "text",
            text: "Yoo from chevoska service",
          },
        ],
      },
      json: true,
    })
      .then((response) => {
        console.log("__________Response:", response);
      })
      .catch((error) => {
        console.log("____________Error:", error);
      });
    return { statusCode: 204 };
  }

  async activateUserWithoutValidate(token: string) {
    const user = await this.findUserByToken(token, "token");
    user.confirmToken = null;
    user.enabled = true;
    await this.userRepository.save(user);
    return { statusCode: 204 };
  }

  private async saveNewUserPassword(token: string, password: string) {
    const user = await this.findUserByForgotToken(token);

    if (!user) {
      throw new NotFoundException("Not found user");
    }

    if (!user.enabled) {
      throw new ForbiddenException(
        "User is not active or has been deactivated"
      );
    }
    if (user.forgotPasswordExpirationDate < moment.utc().toDate()) {
      throw new ForbiddenException("Token was expired.");
    }

    const passwordSalt = generateSalt();
    const passwordHash = generatePasswordHash(password, passwordSalt);

    user.passwordHash = passwordHash;
    user.passwordSalt = passwordSalt;
    user.forgotPasswordToken = null;

    await this.userRepository.save(user);
  }

  async forgotPassword(
    data: ForgotPasswordModel
  ): Promise<{ statusCode: number }> {
    await this.saveNewUserPassword(data.token, data.password);
    return { statusCode: 204 };
  }

  private async findUserByForgotToken(token: string): Promise<UserEntity> {
    if (!token) {
      throw new BadRequestException("Invalid token");
    }
    const user = await this.userRepository.findOne({
      where: { forgotPasswordToken: token },
    });
    if (!user) {
      throw new NotFoundException("Not found user");
    }

    if (!user.enabled) {
      throw new ForbiddenException(
        "User is not active or has been deactivated"
      );
    }
    if (user.forgotPasswordExpirationDate < moment.utc().toDate()) {
      throw new ForbiddenException("Token was expired.");
    }
    return user;
  }

  async forgotPasswordInfo(token: string): Promise<string> {
    const user = await this.findUserByForgotToken(token);

    if (!user.email || user.email.indexOf("@") < 1) {
      throw new BadRequestException("Invalid Email");
    }
    const atIndex = user.email.indexOf("@");
    const prefix =
      atIndex > 2 ? `${user.email[0]}***${user.email[atIndex - 1]}` : "***";
    return `${prefix}${user.email.substring(atIndex)}`;
  }

  private async recovery(email: string): Promise<string> {
    const user = await this.userRepository.findOne({
      where: { email, enabled: true },
      relations: ["role"],
    });
    if (!user) {
      throw new NotFoundException("User not found");
    }
    if (!user.role) {
      throw new NotFoundException("User not found");
    }

    if (!user.enabled) {
      if (
        user.tokenExpirationDate < moment.utc().toDate() &&
        user.confirmToken
      ) {
        throw new NotFoundException("User not found");
      } else {
        throw new ForbiddenException(
          "User is not active or has been deactivated"
        );
      }
    }
    const forgotToken = generateTokenHash("sha1", `${email}${new Date()}`);
    user.forgotPasswordToken = forgotToken;
    user.forgotPasswordExpirationDate = moment.utc().add(24, "h").toDate();
    await this.userRepository.save(user);
    return forgotToken;
  }

  async recoveryPassword(
    email: string,
    domain: string,
    appLink: string
  ): Promise<{ statusCode: number }> {
    try {
      const token = await this.recovery(email);

      await this.transport.send(
        TemplateType.ForgotPassword,
        {
          from: '"Do not reply" <stream-service@example.com>',
          to: email,
          subject: "Recovery password for Stream Service",
        },
        {
          recover_link: `${domain}/${process.env.RECOVERY_LINK}?token=${token}`,
          base_app_url: appLink,
        }
      );
      return { statusCode: 204 };
    } catch (e) {
      throw e;
    }
  }
}
