import { Exclude, Expose } from "class-transformer";

@Exclude()
export class StreamListForClientFiltersOutputDto {
  @Expose()
  q: string;

  @Expose()
  privacy: string[];

  @Expose()
  statuses: string[];
}
