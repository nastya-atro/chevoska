import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";
import { RoleEntity } from "./role.entity";
import { ProfileEntity } from "./profile.entity";
import { StreamStatusesEntity } from "./stream-statuses.entity";
import { StreamClientsEntity } from "./stream-clients.entity";

@Entity("stream")
export class StreamEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "title", type: "varchar", length: 80 })
  title: string;

  @Column({ type: "varchar", length: 255 })
  description: string;

  @Column({ name: "enter_link", type: "varchar", length: 255 })
  enterLink: string;

  @Column({ name: "enter_key", type: "varchar", length: 64 })
  enterKey: string;

  @Column({ name: "create_date" })
  createDate: Date;

  @Column({ name: "update_date" })
  updateDate: Date;

  @Column({ name: "start_date" })
  startDate: Date;

  @Column({ name: "download_link", type: "varchar", length: 255 })
  downloadLink: string;

  @Column()
  private: boolean;

  @ManyToOne(() => StreamStatusesEntity, (status) => status.id)
  @JoinColumn({ name: "status_id" })
  status?: StreamStatusesEntity;

  @ManyToOne(() => ProfileEntity, (profile) => profile.id)
  @JoinColumn({ name: "user_id" })
  profile?: ProfileEntity;

  @OneToMany(() => StreamClientsEntity, (client) => client.stream)
  clients?: StreamClientsEntity[];

  constructor(stream?: Partial<StreamEntity>) {
    stream && Object.assign(this, stream);
  }
}
