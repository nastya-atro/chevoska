import { ConflictException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DataSource, Repository } from "typeorm";
import { ProfileEntity } from "../../common/entities/profile.entity";
import { StreamEntity } from "../../common/entities/stream.entity";
import { StreamStatusesEntity } from "../../common/entities/stream-statuses.entity";
import { SignUpModel } from "./models/stream.model";
import * as moment from "moment";
import { generateLink } from "../../common/utils/streams.utils";

@Injectable()
export class StreamsService {
  constructor(
    @InjectRepository(StreamEntity)
    private streamRepository: Repository<StreamEntity>,
    @InjectRepository(ProfileEntity)
    private profileRepository: Repository<ProfileEntity>,
    @InjectRepository(StreamStatusesEntity)
    private streamStatusRepository: Repository<StreamStatusesEntity>,
    private dataSource: DataSource
  ) {}

  async create(stream: SignUpModel, domain: string, userId: number) {
    const { title, description, keyWord, startDate, isPrivate } = stream;

    const enterLink = generateLink("sha1", keyWord);

    const profile = await this.profileRepository.findOneBy({
      id: userId,
    });
    const status = await this.streamStatusRepository.findOneBy({
      id: 1,
    }); // pending status
    try {
      const stream = await this.streamRepository.save({
        title,
        description,
        startDate,
        private: isPrivate,
        createDate: moment.utc().toDate(),
        enterLink: `${domain}/stream/${enterLink}`,
        updateDate: "",
        downloadLink: null,
        profile,
        status,
      });

      console.log("____stream", stream);
      return { statusCode: 204 };
    } catch (e) {
      if (e.code === "ER_DUP_ENTRY") {
        throw new ConflictException();
      }
      throw e;
    }
  }
}
