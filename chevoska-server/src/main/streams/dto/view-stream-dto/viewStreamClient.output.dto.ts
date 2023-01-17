import { Expose, Type } from "class-transformer";
import { StreamClientsEntity } from "../../../../common/entities/stream-clients.entity";
import { RoleOutputDto } from "../../../auth/dto/role.output.dto";
import { StreamForUserOneOutputDto } from "../stream-for-user-dto/streamForUserOne.output.dto";

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

  @Expose({ name: "stream" })
  getStream() {
    return this.stream.id;
  }

  @Type(() => StreamForUserOneOutputDto)
  stream: StreamForUserOneOutputDto;

  constructor(partial: Partial<StreamClientsEntity>) {
    Object.assign(this, partial);

    if (partial?.stream) {
      Object.assign(this, { stream: partial.stream });
    }
  }

  static new(partial: Partial<StreamClientsEntity>) {
    return new ViewStreamClientOutputDto(partial);
  }
}
