import {
  Body,
  Controller,
  Get,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { ProfileService } from "./profile.service";
import { ValidateDTO } from "../../common/decorators/validate-dto.decorator";
import { CurrentUser } from "../../common/decorators/current-user.decorators";
import { SessionUser } from "../../common/session/models/session.model";
import { EditProfileInputDto } from "./dto/editProfile.input.dto";
import { UserProfileOutputDto } from "../auth/dto/user-profile.output.dto";
import { FileInterceptor } from "@nestjs/platform-express";

@Controller("profile")
@UseGuards()
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get()
  findCurrentProfile(
    @CurrentUser() user: SessionUser
  ): Promise<UserProfileOutputDto> {
    return this.profileService.findCurrentProfile(user?.id);
  }

  @Put()
  @ValidateDTO()
  @UseInterceptors(FileInterceptor("file"))
  async edit(
    @UploadedFile() file: Express.Multer.File,
    @CurrentUser() user: SessionUser,
    @Body() body: EditProfileInputDto
  ) {
    return await this.profileService.edit(user.id, body, file);
  }
}
