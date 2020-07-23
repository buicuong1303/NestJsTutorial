import {
  PipeTransform,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { BookStatus } from '../book-status.enum';
export class BookStatusValidationPipe implements PipeTransform {
  readonly allowedStatus = [BookStatus.AVAILABLE, BookStatus.OUT_OF_STOCK];
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  transform(value: any, metadata: ArgumentMetadata) {
    value = value.toUpperCase();
    if (!this.isStatusValid(value)) {
      throw new BadRequestException(`"${value}" is an invalid status `);
    }
    return value;
  }
  private isStatusValid(status: any) {
    const idx = this.allowedStatus.indexOf(status);
    return idx !== -1;
  }
}
