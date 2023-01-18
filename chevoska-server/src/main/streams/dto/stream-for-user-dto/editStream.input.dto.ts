import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from "class-validator";
import { Type } from "class-transformer";
import { BannerCropInputDto } from "./banner-crop.input.dto";

export class EditStreamInputDto {
  @IsNotEmpty({ always: true })
  @IsString({ always: true })
  readonly title: string;

  @IsNotEmpty({ always: true })
  @IsString({ always: true })
  readonly description: string;

  @IsNotEmpty({ always: true })
  @Type(() => Date)
  readonly startDate: Date;

  @IsNotEmpty({ always: true })
  @IsBoolean()
  readonly isPrivate: boolean;

  @IsOptional()
  @IsString()
  readonly banner: string;

  @IsOptional()
  @IsString()
  readonly originBanner: string;

  @IsOptional()
  @Type(() => BannerCropInputDto)
  @ValidateNested({ each: true })
  readonly bannerCropSettings: BannerCropInputDto;
}
