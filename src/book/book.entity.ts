import { BaseEntity, Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { BookStatus } from './book-status.enum';
@Entity()
export class Book extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  title: string;
  @Column()
  description: string;
  @Column()
  status: BookStatus;
}
