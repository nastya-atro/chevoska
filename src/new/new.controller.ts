import { Controller, Get, UseGuards } from '@nestjs/common';
import { NewService } from './new.service';

@Controller('info')
@UseGuards()
export class NewController {
  constructor(private readonly newService: NewService) {}

  @Get()
  getInfo() {
    return this.newService.getInfo();
  }
}
