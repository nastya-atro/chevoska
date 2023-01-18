import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { StreamsService } from "./streams.service";
import { ValidateDTO } from "../../common/decorators/validate-dto.decorator";
import { CreateStreamInputDto } from "./dto/stream-for-user-dto/createStream.input.dto";
import { Host } from "../../common/decorators/host.decorator";
import { CurrentUser } from "../../common/decorators/current-user.decorators";
import { SessionUser } from "../../common/session/models/session.model";
import { PaginationPipe } from "../../common/pipes/pagination.pipe";
import { OrderPipe } from "../../common/pipes/order.pipe";
import { EditStreamInputDto } from "./dto/stream-for-user-dto/editStream.input.dto";
import { ViewStreamClientInputDto } from "./dto/view-stream-dto/viewStreamClient.input.dto";
import { Session } from "../../common/session/decorators/session.decorator";
import { SessionService } from "../../common/session/session.service";
import { CurrentClient } from "../../common/decorators/current-client.decorators";
import { EmailRequestInputDto } from "./dto/stream-for-client-dto/emailRequest.input.dto";
import { FiltersPipe } from "../../common/pipes/filters.pipe";
import { StreamListForUserFiltersOutputDto } from "./dto/stream-for-user-dto/stream-list-filters.output.dto";
import { StreamListForClientFiltersOutputDto } from "./dto/stream-for-client-dto/stream-list-filters.output.dto";
import { FileFieldsInterceptor } from "@nestjs/platform-express";
import { StreamsFilesModel } from "./models/files.model";
import { StreamCreateFileInputDto } from "./dto/stream-for-user-dto/stream-create-file.input.dto";
import { StreamEditFileInputDto } from "./dto/stream-for-user-dto/stream-edit-file.input.dto";

@Controller("streams")
@UseGuards()
export class StreamsController {
  constructor(private readonly streamService: StreamsService) {}

  @Get("all")
  @ValidateDTO()
  async findForClientAll(
    @Query(
      new PaginationPipe(),
      new OrderPipe(),
      new FiltersPipe(StreamListForClientFiltersOutputDto)
    )
    query
  ) {
    const { pagination, order, filters } = query;
    return await this.streamService.findForClientAll(
      pagination,
      order,
      filters
    );
  }

  @Get("client")
  findCurrentClient(@CurrentClient() client: SessionUser) {
    return this.streamService.findCurrentClient(client?.id);
  }

  @Get("detail/:id")
  @ValidateDTO()
  async findForClientOne(@Param("id", ParseIntPipe) id: number) {
    return await this.streamService.findForClientOne(id);
  }

  @Post("detail/:id")
  @ValidateDTO()
  sendEnterLinkRequest(
    @Param("id", ParseIntPipe) id: number,
    @Body() body: EmailRequestInputDto,
    @Host() domain
  ) {
    return this.streamService.sendEnterLinkRequest(id, body.email, domain);
  }

  @Get(":id")
  @ValidateDTO()
  async findForUserOne(@Param("id", ParseIntPipe) id: number) {
    return await this.streamService.findForUserOne(id);
  }

  @Get()
  @ValidateDTO()
  async findForUserAll(
    @Query(
      new PaginationPipe(),
      new OrderPipe(),
      new FiltersPipe(StreamListForUserFiltersOutputDto)
    )
    query,
    @CurrentUser() user: SessionUser
  ) {
    const { pagination, order, filters } = query;
    return await this.streamService.findForUserAll(
      pagination,
      order,
      filters,
      user?.id
    );
  }

  @Get("view/:enterLink")
  @ValidateDTO()
  async findViewStream(@Param("enterLink") enterLink: string) {
    return await this.streamService.findViewStream(enterLink);
  }

  @Post("view/enter/:streamId")
  @ValidateDTO()
  async enterViewStream(
    @Param("streamId", ParseIntPipe) streamId: number,
    @Body() body: ViewStreamClientInputDto,
    @Session() session: SessionService
  ) {
    return await this.streamService.enterViewStream(body, streamId, session);
  }

  @ValidateDTO()
  @Post()
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: "bannerFile", maxCount: 1 },
      { name: "croppedBannerFile", maxCount: 1 },
    ])
  )
  async create(
    @UploadedFiles()
    files: StreamsFilesModel,
    @Body() body: StreamCreateFileInputDto,
    @Host() domain,
    @CurrentUser() user: SessionUser
  ) {
    return await this.streamService.create(
      body.stream,
      domain,
      user?.id,
      files
    );
  }

  @ValidateDTO()
  @Put(":id")
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: "bannerFile", maxCount: 1 },
      { name: "croppedBannerFile", maxCount: 1 },
    ])
  )
  edit(
    @UploadedFiles()
    files: StreamsFilesModel,
    @Param("id", ParseIntPipe) id: number,
    @Body() body: StreamEditFileInputDto
  ) {
    return this.streamService.edit(id, body.stream, files);
  }

  @Get("key/:id")
  @ValidateDTO()
  async generatePrivateKey(@Param("id", ParseIntPipe) id: number) {
    return await this.streamService.generatePrivateStreamKey(id);
  }

  @Delete(":id")
  async delete(@Param("id", ParseIntPipe) id: number): Promise<{ statusCode }> {
    return await this.streamService.remove(id);
  }
}
