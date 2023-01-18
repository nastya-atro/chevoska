import { BannerCropSettings } from "../../../common/models/background-crop-settings.model";

export interface EditStreamModel {
  title: string;
  description: string;
  startDate: Date;
  isPrivate: boolean;
  originBanner: string;
  banner: string;
  bannerCropSettings: BannerCropSettings;
}
