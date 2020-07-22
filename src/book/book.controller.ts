import {
  Controller,
  Get,
  Req,
  Body,
  Post,
  Param,
  Delete,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
  Patch,
} from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { BookService } from './book.service';
import { Book, BookStatus } from './model/book.model';
import { GetBookFilter } from './dto/get-book-filter.dto';
import { BookStatusValidationPipe } from './pipes/book-status-validatatiom.pipe';

@Controller('books')
export class BookController {
  constructor(private bookService: BookService) {}
  @Post()
  @UsePipes(ValidationPipe)
  createBook(@Body() createBookDto: CreateBookDto): Book {
    return this.bookService.createBook(createBookDto);
  }
  @Get('/:id')
  getBookById(@Param('id') id: string): Book {
    return this.bookService.getBookById(id);
  }
  @Delete('/:id')
  deleteBookById(@Param('id') id: string): void {
    return this.bookService.deleteBookById(id);
  }
  @Patch('/:id/status')
  updateStatus(
    @Param('id') id: string,
    @Body('status', BookStatusValidationPipe) status: BookStatus,
  ): Book {
    return this.bookService.updateBookStatus(id, status);
  }
  @Put()
  updateBook(@Body(ValidationPipe) updateBookDto: UpdateBookDto): Book {
    return this.bookService.updateBook(updateBookDto);
  }
  @Get()
  getBookFilter(@Query(ValidationPipe) filterDto: GetBookFilter): Book[] {
    if (Object.keys(filterDto).length) {
      return this.bookService.searchBook(filterDto);
    }
    return this.bookService.getAllBooks();
  }
}
