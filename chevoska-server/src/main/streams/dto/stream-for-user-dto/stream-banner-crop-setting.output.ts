import { IsNumber } from "class-validator";
import { BannerCropSettings } from "../../../../common/models/background-crop-settings.model";

export class StreamBannerCropSettingOutputDto implements BannerCropSettings {
  @IsNumber({ maxDecimalPlaces: 0 })
  readonly x1: number;

  @IsNumber({ maxDecimalPlaces: 0 })
  readonly y1: number;

  @IsNumber({ maxDecimalPlaces: 0 })
  readonly x2: number;

  @IsNumber({ maxDecimalPlaces: 0 })
  readonly y2: number;
}
