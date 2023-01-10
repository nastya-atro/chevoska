import { Exclude, Expose } from "class-transformer";
import { StreamEntity } from "../../../common/entities/stream.entity";
import { StreamStatusesEntity } from "../../../common/entities/stream-statuses.entity";

@Exclude()
export class StreamListOutputDto {
  @Expose()
  id: number;

  @Expose()
  title: number;

  @Expose()
  description: string;

  @Expose()
  private: boolean;

  @Expose()
  startDate: Date;

  @Expose()
  enterLink: string;

  status: StreamStatusesEntity;

  @Expose()
  get streamStatus() {
    return this.status?.title || "";
  }

  constructor(partial: Partial<StreamEntity>) {
    Object.assign(this, partial);
  }

  static new(partial: Partial<StreamEntity>) {
    return new StreamListOutputDto(partial);
  }
}
