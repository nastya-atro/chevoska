import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { StreamEntity } from "./stream.entity";

@Entity("stream_clients")
export class StreamClientsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 80 })
  username: string;

  @Column({ type: "varchar", length: 50 })
  email: string;

  @Column({ type: "varchar", length: 25 })
  phone: string;

  @Column({ type: "varchar", length: 45 })
  timezone: string;

  @ManyToOne(() => StreamEntity, (stream) => stream.clients)
  @JoinColumn({ name: "stream_id" })
  stream?: StreamEntity;

  constructor(review?: Partial<StreamClientsEntity>) {
    review && Object.assign(this, review);
  }
}
