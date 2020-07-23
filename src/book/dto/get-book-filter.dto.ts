import { BookStatus } from '../book-status.enum';
import { IsOptional, IsIn } from 'class-validator';

export class GetBookFilter {
  @IsOptional()
  search: string;

  @IsOptional()
  @IsIn([BookStatus.AVAILABLE, BookStatus.OUT_OF_STOCK])
  status: BookStatus;
}
