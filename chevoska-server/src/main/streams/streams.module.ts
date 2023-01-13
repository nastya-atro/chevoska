import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { StreamsService } from "./streams.service";
import { StreamsController } from "./streams.controller";
import { ProfileEntity } from "../../common/entities/profile.entity";
import { TransportModule } from "../../shared/transport/transport.module";
import { StreamEntity } from "../../common/entities/stream.entity";
import { StreamStatusesEntity } from "../../common/entities/stream-statuses.entity";
import { StreamClientsEntity } from "../../common/entities/stream-clients.entity";
import { UserEntity } from "../../common/entities/user.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      StreamEntity,
      StreamClientsEntity,
      StreamStatusesEntity,
      ProfileEntity,
      UserEntity,
    ]),
    TransportModule,
  ],
  providers: [StreamsService],
  controllers: [StreamsController],
  exports: [StreamsService],
})
export class StreamsModule {}
