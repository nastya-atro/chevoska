import { Injectable } from '@nestjs/common';

@Injectable()
export class NewService {
  getInfo() {
    return { info: 'Success' };
  }
}
