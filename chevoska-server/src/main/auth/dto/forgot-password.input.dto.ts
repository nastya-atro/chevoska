import { IsNotEmpty, IsString } from "class-validator";

export class ForgotPasswordInputDto {
  @IsNotEmpty({ always: true })
  @IsString({ always: true })
  readonly token: string;

  @IsNotEmpty({ always: true })
  @IsString({ always: true })
  readonly password: string;
}
