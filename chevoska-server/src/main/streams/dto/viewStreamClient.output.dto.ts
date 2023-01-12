import { Expose, Type } from "class-transformer";
import { StreamClientsEntity } from "../../../common/entities/stream-clients.entity";
import { StreamOneOutputDto } from "./streamOne.output.dto";

export class ViewStreamClientOutputDto {
  @Expose()
  id: number;

  @Expose()
  username: string;

  @Expose()
  phone: string;

  @Expose()
  timezone: string;

  @Expose()
  email: string;

  constructor(partial: Partial<StreamClientsEntity>) {
    Object.assign(this, partial);
  }

  static new(partial: Partial<StreamClientsEntity>) {
    return new ViewStreamClientOutputDto(partial);
  }
}
