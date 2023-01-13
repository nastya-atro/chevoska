import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { AuthLocalStrategy } from "./strategies/local.strategy";
import { RoleEntity } from "../../common/entities/role.entity";
import { UserEntity } from "../../common/entities/user.entity";
import { ProfileEntity } from "../../common/entities/profile.entity";
import { TransportModule } from "../../shared/transport/transport.module";
import { StreamClientsEntity } from "../../common/entities/stream-clients.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      RoleEntity,
      UserEntity,
      ProfileEntity,
      StreamClientsEntity,
    ]),
    TransportModule,
  ],
  providers: [AuthService, AuthLocalStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
