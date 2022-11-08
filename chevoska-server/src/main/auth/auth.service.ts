import {
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
        existsUser.confirmToken &&
        existsUser.confirmTokenExpirationDate < moment.utc().toDate()
      ) {
        await this.profileRepository.delete({ id: existsUser.id });
        await this.userRepository.delete({ id: existsUser.id });
      } else {
        throw new ConflictException("Account with this email is existed");
      }
    }

    const passwordSalt = generateSalt();
    const passwordHash = generatePasswordHash(password, passwordSalt);
    const confirmToken = generateTokenHash("sha1", data.email);

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
          role,
          confirmTokenExpirationDate: moment.utc().add(24, "h").toDate(),
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

  async signup(data: SignUpModel, domain: string) {
    try {
      if (!data.isAgreement) {
        throw new Error("Accept the Terms Of Agreement for registration");
      }
      const newUser = await this.createUser(data);
      await this.transport.send(
        TemplateType.EmailConfirmation,
        {
          from: '"Do not reply" <stream-service@example.com>',
          to: newUser.email,
          subject: "Confirm registration for StreamService",
        },
        {
          confirm_link: `${domain}/${process.env.CONFIRMATION_LINK}?token=${newUser.confirmToken}`,
        }
      );
      return { statusCode: 204 };
    } catch (e) {
      throw e;
    }
  }
}
