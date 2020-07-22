import { BookStatus } from '../model/book.model';
import { IsIn } from 'class-validator';
export class UpdateBookDto {
  id: string;
  title: string;
  description: string;
  @IsIn([BookStatus.AVAILABLE, BookStatus.OUT_OF_STOCK])
  status: BookStatus;
}
