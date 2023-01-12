import { Exclude, Expose } from "class-transformer";
import { StreamEntity } from "../../../common/entities/stream.entity";
import { StreamStatusesEntity } from "../../../common/entities/stream-statuses.entity";

@Exclude()
export class StreamOneOutputDto {
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

  @Expose()
  createDate: string;

  @Expose()
  updateDate: string;

  @Expose()
  downloadLink: string;

  @Expose()
  enterKey: string;

  status: StreamStatusesEntity;

  @Expose()
  get streamStatus() {
    return this.status?.title || "";
  }

  constructor(partial: Partial<StreamEntity>) {
    Object.assign(this, partial);
  }

  static new(partial: Partial<StreamEntity>) {
    return new StreamOneOutputDto(partial);
  }
}
