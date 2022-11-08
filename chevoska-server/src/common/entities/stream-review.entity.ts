import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity("stream_reviews")
export class StreamReviewEntity {
  @PrimaryGeneratedColumn()
  id: number;

  constructor(review?: Partial<StreamReviewEntity>) {
    review && Object.assign(this, review);
  }
}
