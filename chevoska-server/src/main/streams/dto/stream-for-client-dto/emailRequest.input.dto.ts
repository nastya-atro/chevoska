import { IsNotEmpty, IsString } from "class-validator";

export class EmailRequestInputDto {
  @IsNotEmpty({ always: true })
  @IsString({ always: true })
  readonly email: string;
}
