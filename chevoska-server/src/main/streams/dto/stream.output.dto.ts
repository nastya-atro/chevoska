import { Exclude, Expose } from "class-transformer";
import { StreamEntity } from "../../../common/entities/stream.entity";

@Exclude()
export class StreamOneOutputDto {
  @Expose()
  title: number;

  @Expose()
  description: string;

  @Expose()
  private: boolean;

  @Expose()
  startDate: Date;

  @Expose()
  createDate: Date;

  @Expose()
  enterLink: string;

  @Expose()
  updateDate: Date;

  @Expose()
  downloadLink: string;

  constructor(partial: Partial<StreamEntity>) {
    Object.assign(this, partial);
  }

  static new(partial: Partial<StreamEntity>) {
    return new StreamOneOutputDto(partial);
  }
}
