import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class EditProfileInputDto {
  @IsNotEmpty({ always: true })
  @IsString({ always: true })
  readonly firstName: string;

  @IsNotEmpty({ always: true })
  @IsString({ always: true })
  readonly lastName: string;

  @IsNotEmpty({ always: true })
  @IsString({ always: true })
  @IsEmail()
  readonly email: string;

  @IsNotEmpty({ always: true })
  readonly phone: string;

  @IsString({ always: true })
  readonly avatar: string;
}
