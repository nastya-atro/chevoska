import { IsBoolean, IsNotEmpty, IsString } from "class-validator";
import { Type } from "class-transformer";

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
}
