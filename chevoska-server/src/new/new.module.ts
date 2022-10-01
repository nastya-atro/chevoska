import { Module } from "@nestjs/common";
import { NewController } from "./new.controller";
import { NewService } from "./new.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "../common/entities/user.entity";
import { UserLocalStrategy } from "./strategies/local.strategy";

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [NewService, UserLocalStrategy],
  controllers: [NewController],
  exports: [],
})
export class NewModule {}
