import { PassportStrategy } from "@nestjs/passport";
import {
  Injectable,
  ForbiddenException,
  UnauthorizedException,
} from "@nestjs/common";
import { Strategy } from "passport-local";
import { UserEntity } from "../../common/entities/user.entity";
import { NewService } from "../new.service";

@Injectable()
export class UserLocalStrategy extends PassportStrategy(Strategy, "userLocal") {
  constructor(private authService: NewService) {
    super();
  }

  async validate(username: string, password: string): Promise<UserEntity> {
    const user = await this.authService.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
