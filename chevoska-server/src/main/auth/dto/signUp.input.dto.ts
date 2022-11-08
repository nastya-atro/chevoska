import { IsBoolean, IsEmail, IsNotEmpty, IsString } from "class-validator";

export class SignUpInputDto {
  @IsNotEmpty({ always: true })
  @IsString({ always: true })
  readonly firstName: string;

  @IsNotEmpty({ always: true })
  @IsString({ always: true })
  readonly lastName: string;

  @IsNotEmpty({ always: true })
  @IsString({ always: true })
  readonly username: string;

  @IsNotEmpty({ always: true })
  @IsString({ always: true })
  @IsEmail()
  readonly email: string;

  @IsNotEmpty({ always: true })
  @IsString({ always: true })
  readonly password: string;

  @IsString()
  readonly phone: string;

  @IsNotEmpty()
  @IsBoolean()
  readonly isAgreement: boolean;
}
