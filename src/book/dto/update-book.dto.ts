import { BookStatus } from '../book-status.enum';
import { IsIn } from 'class-validator';
export class UpdateBookDto {
  id: number;
  title: string;
  description: string;
  @IsIn([BookStatus.AVAILABLE, BookStatus.OUT_OF_STOCK])
  status: BookStatus;
}
