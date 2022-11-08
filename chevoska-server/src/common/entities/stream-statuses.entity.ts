import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity("stream_statuses")
export class StreamStatusesEntity {
  @PrimaryGeneratedColumn()
  id: number;

  constructor(status?: Partial<StreamStatusesEntity>) {
    status && Object.assign(this, status);
  }
}
