import { IsOptional, ValidateNested } from "class-validator";
import { plainToInstance, Transform, Type } from "class-transformer";
import { CreateStreamInputDto } from "./createStream.input.dto";

export class StreamCreateFileInputDto {
  @Transform(
    ({ value }) => plainToInstance(CreateStreamInputDto, JSON.parse(value)),
    {
      toClassOnly: true,
      toPlainOnly: false,
    }
  )
  @Type(() => CreateStreamInputDto)
  @ValidateNested({ each: true })
  stream: CreateStreamInputDto;
}
