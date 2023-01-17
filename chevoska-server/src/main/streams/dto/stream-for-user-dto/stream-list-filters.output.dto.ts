import { Exclude, Expose } from "class-transformer";

@Exclude()
export class StreamListForUserFiltersOutputDto {
  @Expose()
  q: string;

  @Expose()
  privacy: string[];

  @Expose()
  statuses: string[];
}
