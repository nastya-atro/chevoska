import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";
import { UserEntity } from "./user.entity";

@Entity("profiles")
export class ProfileEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "first_name", type: "varchar", length: 80 })
  firstName: string;

  @Column({ name: "last_name", type: "varchar", length: 80 })
  lastName: string;

  @Column({ type: "varchar", length: 25 })
  phone: string;

  @Column({ type: "varchar", length: 255 })
  avatar: string;

  @Column({ type: "varchar", length: 45 })
  timezone: string;

  @OneToOne(() => UserEntity, (user) => user.id)
  @JoinColumn({ name: "id" })
  user: UserEntity[];

  constructor(profile?: Partial<ProfileEntity>) {
    profile && Object.assign(this, profile);
  }
}
