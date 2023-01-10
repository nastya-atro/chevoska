import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { StreamEntity } from "./stream.entity";

@Entity("stream_statuses")
export class StreamStatusesEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 80 })
  title: string;

  @OneToMany(() => StreamEntity, (stream) => stream.status)
  users?: StreamEntity[];

  constructor(status?: Partial<StreamStatusesEntity>) {
    status && Object.assign(this, status);
  }
}
