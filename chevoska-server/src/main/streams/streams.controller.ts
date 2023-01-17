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
  UseGuards,
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

@Controller("streams")
@UseGuards()
export class StreamsController {
  constructor(private readonly streamService: StreamsService) {}

  @Get("all")
  @ValidateDTO()
  async findForClientAll(@Query(new PaginationPipe(), new OrderPipe()) query) {
    const { pagination, order } = query;
    return await this.streamService.findForClientAll(pagination, order);
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
    @Query(new PaginationPipe(), new OrderPipe()) query,
    @CurrentUser() user: SessionUser
  ) {
    const { pagination, order } = query;
    return await this.streamService.findForUserAll(pagination, order, user?.id);
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

  @Post()
  @ValidateDTO()
  async create(
    @Body() body: CreateStreamInputDto,
    @Host() domain,
    @CurrentUser() user: SessionUser
  ) {
    return await this.streamService.create(body, domain, user?.id);
  }

  @Put(":id")
  @ValidateDTO()
  async edit(
    @Param("id", ParseIntPipe) id: number,
    @Body() body: EditStreamInputDto
  ) {
    return await this.streamService.edit(id, body);
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
