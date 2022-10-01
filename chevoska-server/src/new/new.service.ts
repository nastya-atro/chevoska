import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { UserEntity } from "../common/entities/user.entity";
import { UserListOutputDto } from "./dto/usersList.output.dto";
import { IncomingMessageSession } from "../shared/models/incoming-message-session.model";
import { InjectRepository } from "@nestjs/typeorm";
import crypto from "crypto";

@Injectable()
export class NewService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
    private dataSource: DataSource
  ) {}

  async login(user: any, req: IncomingMessageSession) {
    try {
      const newUser = await this.usersRepository.save({
        name: user.name,
      });
      req.session.currentUser = {
        username: newUser.name,
        userId: newUser.id,
        role: "user",
      };
      return newUser;
    } catch (e) {
      if (e.code === "ER_DUP_ENTRY") {
        throw new ConflictException();
      }
      throw e;
    }

    return { statusCode: 200 };
  }

  async getProfile(currentUser: any) {
    if (!currentUser) {
      throw new UnauthorizedException();
    }
    return currentUser;
  }

  async getInfo() {
    const query = this.dataSource.createQueryBuilder(UserEntity, "users");
    const results = await query.getMany();
    return { users: results.map(UserListOutputDto.new) };
  }

  async validateUser(username: string, password: string): Promise<UserEntity> {
    const user = await this.usersRepository.findOne({
      where: { name: username },
    });
    if (!user) {
      throw new UnauthorizedException(
        "Account with this email isn’t registered"
      );
    }

    if (user) {
      return user;
    }
  }
}
