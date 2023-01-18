import { BannerCropSettings } from "../../../common/models/background-crop-settings.model";

export interface CreateStreamModel {
  title: string;
  description: string;
  startDate: Date;
  isPrivate: boolean;
  keyWord: string;
  originBanner: string;
  banner: string;
  bannerCropSettings: BannerCropSettings;
}
