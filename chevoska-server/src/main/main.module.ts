import { Module } from "@nestjs/common";
import { AuthModule } from "./auth/auth.module";
import { MainService } from "./main.service";
import { MainController } from "./main.controller";

@Module({
  imports: [AuthModule],
  providers: [MainService],
  controllers: [MainController],
  exports: [],
})
export class MainModule {}
