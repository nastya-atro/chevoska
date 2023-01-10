import { Body, Controller, Get, Post, Query, UseGuards } from "@nestjs/common";
import { StreamsService } from "./streams.service";
import { ValidateDTO } from "../../common/decorators/validate-dto.decorator";
import { CreateStreamInputDto } from "./dto/stream.input.dto";
import { Host } from "../../common/decorators/host.decorator";
import { CurrentUser } from "../../common/decorators/current-user.decorators";
import { SessionUser } from "../../common/session/models/session.model";
import { PaginationPipe } from "../../common/pipes/pagination.pipe";
import { OrderPipe } from "../../common/pipes/order.pipe";

@Controller("streams")
@UseGuards()
export class StreamsController {
  constructor(private readonly streamService: StreamsService) {}

  @Get()
  @ValidateDTO()
  async findAll(
    @Query(new PaginationPipe(), new OrderPipe()) query,
    @CurrentUser() user: SessionUser
  ) {
    const { pagination, order } = query;
    return await this.streamService.findList(pagination, order, user?.id);
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
}
