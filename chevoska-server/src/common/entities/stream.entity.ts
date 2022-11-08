import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity("stream")
export class StreamEntity {
  @PrimaryGeneratedColumn()
  id: number;

  constructor(stream?: Partial<StreamEntity>) {
    stream && Object.assign(this, stream);
  }
}
