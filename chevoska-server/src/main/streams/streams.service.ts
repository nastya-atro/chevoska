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
import { StreamsForUserListOutputDto } from "./dto/stream-for-user-dto/streamsForUserList.output.dto";
import { Order, Pagination } from "../../common/models/pagination.model";
import { getSortByAllowed } from "../../common/utils/pagination.utils";
import { StreamForUserOneOutputDto } from "./dto/stream-for-user-dto/streamForUserOne.output.dto";
import { EditStreamModel } from "./models/editStream.model";
import { StreamViewOutputDto } from "./dto/view-stream-dto/streamView.output.dto";
import { StreamClientsEntity } from "../../common/entities/stream-clients.entity";
import { StreamClientModel } from "./models/streamClient.model";
import { ViewStreamClientOutputDto } from "./dto/view-stream-dto/viewStreamClient.output.dto";
import { SessionService } from "../../common/session/session.service";
import { UserEntity } from "../../common/entities/user.entity";
import { StreamForClientOneOutputDto } from "./dto/stream-for-client-dto/streamForClientOne.output.dto";
import { StreamForClientListOutputDto } from "./dto/stream-for-client-dto/streamsForClientList.output.dto";
import { TemplateType } from "../../common/constants/email-templates";
import { TransportService } from "../../shared/transport/transport.service";
import { StreamsFilters } from "./models/streams-filters.model";
import { Privacy } from "../../common/constants/privacy.constants";
import { UploadPath } from "../../common/constants/uploadPath.constants";
import { StreamsFilesModel } from "./models/files.model";
import { cleaningDirectory, uploadImage } from "../../common/utils/fs.utils";
import * as path from "path";

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
    private dataSource: DataSource,
    private transport: TransportService
  ) {}

  async findForClientAll(
    pagination: Pagination,
    order: Order,
    filters: StreamsFilters
  ) {
    const { limit, page, offset } = pagination;
    const { sortOrder } = order;

    const isPrivateArray =
      filters.privacy?.map((e: Privacy) => e === Privacy.PRIVATE) || null;

    const sortBy: string = getSortByAllowed(order.sortBy, {
      id: "streams.id",
      startDate: "streams.startDate",
    });

    const query = this.dataSource
      .createQueryBuilder(StreamEntity, "streams")
      .leftJoinAndSelect("streams.status", "status");

    //Filter by q search
    filters.q &&
      query.andWhere("streams.title LIKE :q", { q: `%${filters.q}%` });

    //Filter by statuses
    Array.isArray(filters.statuses) &&
      filters.statuses.length > 0 &&
      query.andWhere(`status.title in (:statuses)`, {
        statuses: filters.statuses,
      });

    //Filter by private / social
    Array.isArray(isPrivateArray) &&
      isPrivateArray.length > 0 &&
      query.andWhere(`streams.private in (:privacyFilter)`, {
        privacyFilter: isPrivateArray,
      });

    query.orderBy(sortBy, sortOrder).skip(offset).take(limit);

    const $count = query.getCount();
    const [total, results] = await Promise.all([$count, query.getMany()]);

    return {
      results: results.map(StreamForClientListOutputDto.new),
      totalPages: Math.ceil(total / limit),
      total,
      sortOrder,
      sortBy: order.sortBy,
      limit,
      page,
    };
  }

  async findForUserAll(
    pagination: Pagination,
    order: Order,
    filters: StreamsFilters,
    userId: number
  ) {
    const { limit, page, offset } = pagination;
    const { sortOrder } = order;

    const isPrivateArray =
      filters.privacy?.map((e: Privacy) => e === Privacy.PRIVATE) || null;

    const sortBy: string = getSortByAllowed(order.sortBy, {
      id: "streams.id",
      startDate: "streams.startDate",
    });

    const query = this.dataSource
      .createQueryBuilder(StreamEntity, "streams")
      .leftJoinAndSelect("streams.profile", "profile")
      .leftJoinAndSelect("streams.status", "status")
      .andWhere(`streams.user_id in (:usersIds)`, { usersIds: [userId] });

    //Filter by q search
    filters.q &&
      query.andWhere("streams.title LIKE :q", { q: `%${filters.q}%` });

    //Filter by statuses
    filters.statuses &&
      query.andWhere(`streams.status in (:statuses)`, {
        statuses: filters.statuses,
      });

    //Filter by private / social
    Array.isArray(isPrivateArray) &&
      isPrivateArray.length > 0 &&
      query.andWhere(`streams.private in (:privacyFilter)`, {
        privacyFilter: isPrivateArray,
      });

    query.orderBy(sortBy, sortOrder).skip(offset).take(limit);

    const $count = query.getCount();
    const [total, results] = await Promise.all([$count, query.getMany()]);

    return {
      results: results.map(StreamsForUserListOutputDto.new),
      totalPages: Math.ceil(total / limit),
      total,
      sortOrder,
      sortBy: order.sortBy,
      limit,
      page,
    };
  }

  async findForUserOne(id: number) {
    const stream = await this.dataSource
      .createQueryBuilder(StreamEntity, "stream")
      .leftJoinAndSelect("stream.status", "status")
      .whereInIds([id])
      .getOne();

    if (!stream) {
      throw new NotFoundException();
    }

    return StreamForUserOneOutputDto.new(stream);
  }

  async findForClientOne(id: number) {
    const stream = await this.dataSource
      .createQueryBuilder(StreamEntity, "stream")
      .leftJoinAndSelect("stream.status", "status")
      .whereInIds([id])
      .getOne();

    if (!stream) {
      throw new NotFoundException();
    }

    return StreamForClientOneOutputDto.new(stream);
  }

  async sendEnterLinkRequest(id: number, email: string, domain: string) {
    const stream = await this.dataSource
      .createQueryBuilder(StreamEntity, "stream")
      .whereInIds([id])
      .getOne();

    if (stream.private) {
      await this.transport.send(
        TemplateType.JoinStreamInstruction,
        {
          from: '"Do not reply" <stream-service@example.com>',
          to: email,
          subject: "Join To Stream Instruction",
        },
        {
          stream_title: stream.title,
          stream_start_date: stream.startDate,
          stream_details: `${domain}/detail/${id}`,
          stream_instructions: `...`,
        }
      );
    } else {
      await this.transport.send(
        TemplateType.EnterLinkRequest,
        {
          from: '"Do not reply" <stream-service@example.com>',
          to: email,
          subject: "Enter Link to Stream",
        },
        {
          stream_title: stream.title,
          stream_start_date: stream.startDate,
          stream_details: `${domain}/detail/${id}`,
          stream_enter_link: `${domain}/stream/${stream.enterLink}`,
        }
      );
    }
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
    try {
      const stream = await this.streamRepository.findOneBy({
        id: streamId,
      });

      const newClientData = {
        email,
        username,
        phone,
        timezone,
        stream,
      };

      if (stream.private) {
        if (stream.enterKey === key) {
          return await this.saveNewClient(newClientData, session, streamId);
        } else {
          throw new ConflictException("Enter key not correct");
        }
      } else {
        return await this.saveNewClient(newClientData, session, streamId);
      }
    } catch (e) {
      if (e.code === "ER_DUP_ENTRY") {
        throw new ConflictException();
      }
      throw e;
    }
  }

  private async saveNewClient(
    newClient: StreamClientModel,
    session: SessionService,
    streamId: number
  ) {
    try {
      const existClient = await this.dataSource
        .createQueryBuilder(StreamClientsEntity, "stream_clients")
        .leftJoinAndSelect("stream_clients.stream", "stream")
        .andWhere(`stream_clients.email = (:email)`, { email: newClient.email })
        .andWhere(`stream.id = (:streamId)`, { streamId })
        .getOne();

      if (existClient) {
        if (newClient.username !== existClient.username) {
          await this.replaceExistedClient(existClient.id, newClient.username);
        }
        session.setClient(existClient.id, newClient.email, "client");
        return new ViewStreamClientOutputDto(existClient);
      } else {
        const user = await this.streamClientsRepository.save({
          ...newClient,
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

  private async replaceExistedClient(clientId: number, username: string) {
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

  async create(
    stream: CreateStreamModel,
    domain: string,
    userId: number,
    files: StreamsFilesModel
  ) {
    const { title, description, keyWord, startDate, isPrivate } = stream;
    const enterLink = generateLink("sha1", keyWord, title);
    const profile = await this.profileRepository.findOneBy({
      id: userId,
    });
    try {
      const status = await this.streamStatusRepository.findOneBy({
        id: 1,
      });

      await this.dataSource.transaction(async (manager) => {
        const newStream = await manager.save(StreamEntity, {
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

        const globalPath = UploadPath.globalStreamsStoragePath;
        const localPath = UploadPath.localStreamsStoragePath;
        const originBannerFilename = files?.bannerFile
          ? uploadImage(
              String(newStream.id),
              files.bannerFile[0],
              globalPath,
              localPath,
              "origin-banner"
            )
          : stream.originBanner || "";

        const croppedBannerFilename = files?.croppedBannerFile
          ? uploadImage(
              String(newStream.id),
              files.croppedBannerFile[0],
              globalPath,
              localPath,
              "banner"
            )
          : stream.banner || "";

        const streamForUpdating = {
          ...newStream,
          originBanner: originBannerFilename,
          banner: croppedBannerFilename,
          bannerCropSettings: stream.bannerCropSettings,
        };

        await manager
          .createQueryBuilder()
          .update(StreamEntity, { ...streamForUpdating })
          .whereInIds([newStream.id])
          .execute();

        if (files) {
          const uploadPath = path.join(
            UploadPath.globalStreamsStoragePath,
            `${newStream.id}`
          );
          const banner = path.basename(croppedBannerFilename || "");
          const originBanner = path.basename(originBannerFilename || "");

          try {
            await cleaningDirectory(
              uploadPath,
              (file) => ![banner, originBanner].includes(file)
            );
          } catch (e) {
            // throw new ConflictException();
          }
        }
      });
      return { statusCode: 204 };
    } catch (e) {
      if (e.code === "ER_DUP_ENTRY") {
        throw new ConflictException();
      }
      throw e;
    }
  }

  async edit(id: number, body: EditStreamModel, files: StreamsFilesModel) {
    try {
      const globalPath = UploadPath.globalStreamsStoragePath;
      const localPath = UploadPath.localStreamsStoragePath;
      const originBannerFilename = files?.bannerFile
        ? uploadImage(
            String(id),
            files.bannerFile[0],
            globalPath,
            localPath,
            "origin-banner"
          )
        : body.originBanner || "";

      const croppedBannerFilename = files?.croppedBannerFile
        ? uploadImage(
            String(id),
            files.croppedBannerFile[0],
            globalPath,
            localPath,
            "banner"
          )
        : body.banner || "";

      const streamForUpdating = {
        title: body.title,
        description: body.title,
        startDate: body.startDate,
        private: body.isPrivate,
        originBanner: originBannerFilename,
        bannerCropSettings: body.bannerCropSettings,
        banner: croppedBannerFilename,
      };
      await this.dataSource
        .createQueryBuilder()
        .update(StreamEntity, streamForUpdating)
        .whereInIds([id])
        .execute();

      if (files) {
        const uploadPath = path.join(
          UploadPath.globalStreamsStoragePath,
          `${id}`
        );
        const banner = path.basename(croppedBannerFilename || "");
        const originBanner = path.basename(originBannerFilename || "");

        try {
          await cleaningDirectory(
            uploadPath,
            (file) => ![banner, originBanner].includes(file)
          );
        } catch (e) {
          // throw new ConflictException();
        }
      }
      return { statusCode: 204 };
    } catch (e) {
      if (e.code === "ER_DUP_ENTRY") {
        throw new ConflictException();
      }
      throw e;
    }
  }

  async remove(id: number): Promise<{ statusCode: number }> {
    await this.streamRepository
      .createQueryBuilder()
      .delete()
      .whereInIds([id])
      .execute();

    return { statusCode: 204 };
  }
}
