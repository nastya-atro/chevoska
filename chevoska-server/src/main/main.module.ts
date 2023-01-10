import { Module } from "@nestjs/common";
import { AuthModule } from "./auth/auth.module";
import { MainService } from "./main.service";
import { MainController } from "./main.controller";
import { StreamsModule } from "./streams/streams.module";

@Module({
  imports: [AuthModule, StreamsModule],
  providers: [MainService],
  controllers: [MainController],
  exports: [],
})
export class MainModule {}
