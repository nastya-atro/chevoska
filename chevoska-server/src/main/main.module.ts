import { Module } from "@nestjs/common";
import { AuthModule } from "./auth/auth.module";
import { MainService } from "./main.service";
import { MainController } from "./main.controller";
import { StreamsModule } from "./streams/streams.module";
import { ProfileModule } from "./profile/profile.module";

@Module({
  imports: [AuthModule, StreamsModule, ProfileModule],
  providers: [MainService],
  controllers: [MainController],
  exports: [],
})
export class MainModule {}
