import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DataSource, Repository } from "typeorm";
import { ProfileEntity } from "../../common/entities/profile.entity";
import { UserEntity } from "../../common/entities/user.entity";
import { EditProfileModel } from "./models/editProfile.model";
import { UserProfileOutputDto } from "../auth/dto/user-profile.output.dto";
import { UploadPath } from "../../common/constants/uploadPath.constants";
import * as path from "path";
import { cleaningDirectory, uploadImage } from "../../common/utils/fs.utils";

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(ProfileEntity)
    private profileRepository: Repository<ProfileEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private dataSource: DataSource
  ) {}

  async findCurrentProfile(id: number) {
    if (!id) {
      throw new NotFoundException("User not found");
    }

    const profile = await this.userRepository
      .createQueryBuilder("user")
      .leftJoinAndSelect("user.profile", "profile")
      .leftJoinAndSelect("user.role", "role")
      .whereInIds([id])
      .getOne();
    return new UserProfileOutputDto(profile);
  }

  async edit(id: number, data: EditProfileModel, file: Express.Multer.File) {
    const { email, firstName, phone, lastName, avatar } = data;

    try {
      const filename = file
        ? uploadImage(
            String(id),
            file,
            UploadPath.globalUsersStoragePath,
            UploadPath.localUsersStoragePath
          )
        : data.avatar || "";

      const userForUpdating = {
        firstName,
        phone,
        lastName,
        avatar: filename,
      };

      //  const profileData = { firstName, phone, lastName, avatar };

      await this.dataSource.transaction(async (manager) => {
        await manager
          .createQueryBuilder()
          .update(ProfileEntity, userForUpdating)
          .whereInIds([id])
          .execute();

        await manager
          .createQueryBuilder()
          .update(UserEntity, { email })
          .whereInIds([id])
          .execute();
      });

      if (file) {
        const uploadPath = path.join(
          UploadPath.globalUsersStoragePath,
          `${id}`
        );
        const image = path.basename(filename || "");
        try {
          await cleaningDirectory(
            uploadPath,
            (file) => ![image].includes(file)
          );
        } catch (e) {
          // this.logger.error(e.message, e.stack);
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
}
