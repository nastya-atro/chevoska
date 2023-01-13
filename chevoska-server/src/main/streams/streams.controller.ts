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
  Req,
  UseGuards,
} from "@nestjs/common";
import { StreamsService } from "./streams.service";
import { ValidateDTO } from "../../common/decorators/validate-dto.decorator";
import { CreateStreamInputDto } from "./dto/createStream.input.dto";
import { Host } from "../../common/decorators/host.decorator";
import { CurrentUser } from "../../common/decorators/current-user.decorators";
import { SessionUser } from "../../common/session/models/session.model";
import { PaginationPipe } from "../../common/pipes/pagination.pipe";
import { OrderPipe } from "../../common/pipes/order.pipe";
import { EditStreamInputDto } from "./dto/editStream.input.dto";
import { ViewStreamClientInputDto } from "./dto/viewStreamClient.input.dto";
import { Session } from "../../common/session/decorators/session.decorator";
import { SessionService } from "../../common/session/session.service";
import { CurrentClient } from "../../common/decorators/current-client.decorators";

@Controller("streams")
@UseGuards()
export class StreamsController {
  constructor(private readonly streamService: StreamsService) {}

  @Get("client")
  findCurrentClient(@CurrentClient() client: SessionUser) {
    return this.streamService.findCurrentClient(client?.id);
  }

  @Get(":id")
  @ValidateDTO()
  async findOne(@Param("id", ParseIntPipe) id: number) {
    return await this.streamService.findOne(id);
  }

  @Get()
  @ValidateDTO()
  async findAll(
    @Query(new PaginationPipe(), new OrderPipe()) query,
    @CurrentUser() user: SessionUser
  ) {
    const { pagination, order } = query;
    return await this.streamService.findList(pagination, order, user?.id);
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
