import { ValidateNested } from "class-validator";
import { plainToInstance, Transform, Type } from "class-transformer";
import { EditStreamInputDto } from "./editStream.input.dto";

export class StreamEditFileInputDto {
  @Transform(
    ({ value }) => plainToInstance(EditStreamInputDto, JSON.parse(value)),
    {
      toClassOnly: true,
      toPlainOnly: false,
    }
  )
  @Type(() => EditStreamInputDto)
  @ValidateNested({ each: true })
  stream: EditStreamInputDto;
}
