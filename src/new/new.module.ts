import { Module } from '@nestjs/common';
import { NewController } from './new.controller';
import { NewService } from './new.service';

@Module({
  imports: [],
  providers: [NewService],
  controllers: [NewController],
  exports: [],
})
export class NewModule {}
