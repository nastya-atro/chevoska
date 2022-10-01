import { Exclude, Expose } from 'class-transformer';
import { UserEntity } from "../../common/entities/user.entity";

@Exclude()
export class UserListOutputDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }

  static new(partial: Partial<UserEntity>) {
    return new UserListOutputDto(partial);
  }
}
