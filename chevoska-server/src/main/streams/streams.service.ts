import { ConflictException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DataSource, Repository } from "typeorm";
import { ProfileEntity } from "../../common/entities/profile.entity";
import { StreamEntity } from "../../common/entities/stream.entity";
import { StreamStatusesEntity } from "../../common/entities/stream-statuses.entity";
import { SignUpModel } from "./models/stream.model";
import * as moment from "moment";
import { generateLink } from "../../common/utils/streams.utils";
import { StreamListOutputDto } from "./dto/streamsList.output.dto";
import { Order, Pagination } from "../../common/models/pagination.model";
import { getSortByAllowed } from "../../common/utils/pagination.utils";

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

  async findList(pagination: Pagination, order: Order, userId: number) {
    const { limit, page, offset } = pagination;
    const { sortOrder } = order;

    const sortBy: string = getSortByAllowed(order.sortBy, {
      id: "streams.id",
    });

    const query = this.dataSource
      .createQueryBuilder(StreamEntity, "streams")
      .leftJoinAndSelect("streams.profile", "profile")
      .leftJoinAndSelect("streams.status", "status")
      .andWhere(`streams.user_id in (:usersIds)`, { usersIds: [userId] })
      .orderBy(sortBy, sortOrder)
      .skip(offset)
      .take(limit);

    const $count = query.getCount();
    const [total, results] = await Promise.all([$count, query.getMany()]);

    return {
      results: results.map(StreamListOutputDto.new),
      totalPages: Math.ceil(total / limit),
      total,
      sortOrder,
      sortBy: order.sortBy,
      limit,
      page,
    };
  }

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
