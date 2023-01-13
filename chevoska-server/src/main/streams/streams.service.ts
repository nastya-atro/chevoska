import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DataSource, Repository } from "typeorm";
import { ProfileEntity } from "../../common/entities/profile.entity";
import { StreamEntity } from "../../common/entities/stream.entity";
import { StreamStatusesEntity } from "../../common/entities/stream-statuses.entity";
import { CreateStreamModel } from "./models/createStream.model";
import * as moment from "moment";
import {
  generateLink,
  generateTokenHash,
} from "../../common/utils/streams.utils";
import { StreamListOutputDto } from "./dto/streamsList.output.dto";
import { Order, Pagination } from "../../common/models/pagination.model";
import { getSortByAllowed } from "../../common/utils/pagination.utils";
import { StreamOneOutputDto } from "./dto/streamOne.output.dto";
import { EditStreamModel } from "./models/editStream.model";
import { StreamViewOutputDto } from "./dto/streamView.output.dto";
import { StreamClientsEntity } from "../../common/entities/stream-clients.entity";
import { StreamClientModel } from "./models/streamClient.model";
import { ViewStreamClientOutputDto } from "./dto/viewStreamClient.output.dto";
import { SessionService } from "../../common/session/session.service";
import { UserEntity } from "../../common/entities/user.entity";
import { SessionUser } from "../../common/session/models/session.model";

@Injectable()
export class StreamsService {
  constructor(
    @InjectRepository(StreamEntity)
    private streamRepository: Repository<StreamEntity>,
    @InjectRepository(ProfileEntity)
    private profileRepository: Repository<ProfileEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @InjectRepository(StreamStatusesEntity)
    private streamStatusRepository: Repository<StreamStatusesEntity>,
    @InjectRepository(StreamClientsEntity)
    private streamClientsRepository: Repository<StreamClientsEntity>,
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

  async findOne(id: number) {
    const stream = await this.dataSource
      .createQueryBuilder(StreamEntity, "stream")
      .leftJoinAndSelect("stream.status", "status")
      .whereInIds([id])
      .getOne();

    if (!stream) {
      throw new NotFoundException();
    }

    return StreamOneOutputDto.new(stream);
  }

  async findViewStream(enterLink: string) {
    const stream = await this.dataSource
      .createQueryBuilder(StreamEntity, "stream")
      .leftJoinAndSelect("stream.status", "status")
      .andWhere(`stream.enterLink = (:enterLink)`, { enterLink: enterLink })
      .getOne();

    if (!stream) {
      throw new NotFoundException();
    }

    return StreamViewOutputDto.new(stream);
  }

  async findCurrentClient(id: number) {
    try {
      const client = await this.dataSource
        .createQueryBuilder(StreamClientsEntity, "stream_clients")
        .leftJoinAndSelect("stream_clients.stream", "stream")
        .andWhere(`stream_clients.id = (:id)`, { id })
        .getOne();
      if (!client) {
        throw new NotFoundException("Client not found");
      }
      return new ViewStreamClientOutputDto(client);
    } catch (e) {
      if (e.code === "ER_DUP_ENTRY") {
        throw new ConflictException();
      }
      throw e;
    }
  }

  async enterViewStream(
    client: StreamClientModel,
    streamId: number,
    session: SessionService
  ) {
    const { email, username, phone, timezone, key } = client;

    const existClient = await this.dataSource
      .createQueryBuilder(StreamClientsEntity, "stream_clients")
      .leftJoinAndSelect("stream_clients.stream", "stream")
      .andWhere(`stream_clients.email = (:email)`, { email })
      .andWhere(`stream.id = (:streamId)`, { streamId })
      .getOne();

    if (existClient) {
      if (username !== existClient.username) {
        await this.replaceExistedClient(existClient.id, username);
      }
      session.setClient(existClient.id, email, "client");
      return new ViewStreamClientOutputDto(existClient);
    } else {
      try {
        const stream = await this.streamRepository.findOneBy({
          id: streamId,
        });

        if (stream.private) {
          if (stream.enterKey === key) {
            const user = await this.streamClientsRepository.save({
              email,
              username,
              phone,
              timezone,
              stream,
            });
            session.setClient(user.id, user.email, "client");
            return new ViewStreamClientOutputDto(user);
          } else {
            throw new ConflictException("Enter key not correct");
          }
        } else {
          const user = await this.streamClientsRepository.save({
            email,
            username,
            phone,
            timezone,
            stream,
            active: true,
          });
          session.setClient(user.id, user.email, "client");
          return new ViewStreamClientOutputDto(user);
        }
      } catch (e) {
        if (e.code === "ER_DUP_ENTRY") {
          throw new ConflictException();
        }
        throw e;
      }
    }
  }

  async replaceExistedClient(clientId: number, username: string) {
    try {
      await this.dataSource
        .createQueryBuilder()
        .update(StreamClientsEntity, {
          username,
        })
        .whereInIds([clientId])
        .execute();
    } catch (e) {
      if (e.code === "ER_DUP_ENTRY") {
        throw new ConflictException();
      }
      throw e;
    }
  }

  async generatePrivateStreamKey(streamId: number) {
    const key = generateTokenHash("sha1", String(streamId));
    try {
      await this.dataSource
        .createQueryBuilder()
        .update(StreamEntity, {
          enterKey: key,
        })
        .whereInIds([streamId])
        .execute();
      return { statusCode: 204 };
    } catch (e) {
      if (e.code === "ER_DUP_ENTRY") {
        throw new ConflictException();
      }
      throw e;
    }
  }

  async create(stream: CreateStreamModel, domain: string, userId: number) {
    const { title, description, keyWord, startDate, isPrivate } = stream;

    const enterLink = generateLink("sha1", keyWord, title);

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
        enterLink: `${enterLink}`,
        updateDate: "",
        downloadLink: null,
        profile,
        status,
      });
      return { statusCode: 204 };
    } catch (e) {
      if (e.code === "ER_DUP_ENTRY") {
        throw new ConflictException();
      }
      throw e;
    }
  }

  async edit(id: number, body: EditStreamModel) {
    try {
      await this.dataSource
        .createQueryBuilder()
        .update(StreamEntity, {
          title: body.title,
          description: body.description,
          startDate: body.startDate,
          private: body.isPrivate,
        })
        .whereInIds([id])
        .execute();
      return { statusCode: 204 };
    } catch (e) {
      if (e.code === "ER_DUP_ENTRY") {
        throw new ConflictException();
      }
      throw e;
    }
  }

  async remove(id: number): Promise<{ statusCode: number }> {
    //check if used
    await this.streamRepository
      .createQueryBuilder()
      .delete()
      .whereInIds([id])
      .execute();

    return { statusCode: 204 };
  }
}
