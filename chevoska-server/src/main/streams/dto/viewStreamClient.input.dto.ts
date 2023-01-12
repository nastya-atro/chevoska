import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from "class-validator";

export class ViewStreamClientInputDto {
  @IsNotEmpty({ always: true })
  @IsString({ always: true })
  readonly username: string;

  @IsNotEmpty({ always: true })
  @IsString({ always: true })
  @IsEmail()
  readonly email: string;

  @IsString()
  @IsOptional()
  readonly phone: string;
}
