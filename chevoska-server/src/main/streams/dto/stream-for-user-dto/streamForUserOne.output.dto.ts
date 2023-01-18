import { Exclude, Expose, Type } from "class-transformer";
import { StreamEntity } from "../../../../common/entities/stream.entity";
import { StreamStatusesEntity } from "../../../../common/entities/stream-statuses.entity";
import { StreamBannerCropSettingOutputDto } from "./stream-banner-crop-setting.output";

@Exclude()
export class StreamForUserOneOutputDto {
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
  banner: string;

  @Expose()
  originBanner: string;

  @Expose()
  @Type(() => StreamBannerCropSettingOutputDto)
  bannerCropSettings: StreamBannerCropSettingOutputDto;

  @Expose()
  get streamStatus() {
    return this.status?.title || "";
  }

  constructor(partial: Partial<StreamEntity>) {
    Object.assign(this, partial);
  }

  static new(partial: Partial<StreamEntity>) {
    return new StreamForUserOneOutputDto(partial);
  }
}
