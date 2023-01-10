import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { StreamsService } from "./streams.service";
import { StreamsController } from "./streams.controller";
import { ProfileEntity } from "../../common/entities/profile.entity";
import { TransportModule } from "../../shared/transport/transport.module";
import { StreamEntity } from "../../common/entities/stream.entity";
import { StreamStatusesEntity } from "../../common/entities/stream-statuses.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      StreamEntity,
      StreamStatusesEntity,
      ProfileEntity,
    ]),
    TransportModule,
  ],
  providers: [StreamsService],
  controllers: [StreamsController],
  exports: [StreamsService],
})
export class StreamsModule {}
