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
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { BookService } from './book.service';
import { GetBookFilter } from './dto/get-book-filter.dto';
import { BookStatusValidationPipe } from './pipes/book-status-validatatiom.pipe';
import { Book } from './book.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('books')
@UseGuards(AuthGuard())
export class BookController {
  constructor(private bookService: BookService) {}
  @Get('/:id')
  getBookById(@Param('id', ParseIntPipe) id: number): Promise<Book> {
    return this.bookService.getBookById(id);
  }
  @Post()
  @UsePipes(ValidationPipe)
  createBook(@Body() createBookDto: CreateBookDto): Promise<Book> {
    return this.bookService.createBook(createBookDto);
  }

  @Delete('/:id')
  deleteBookById(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.bookService.deleteBookById(id);
  }
  // @Patch('/:id/status')
  // updateStatus(
  //   @Param('id') id: string,
  //   @Body('status', BookStatusValidationPipe) status: BookStatus,
  // ): Promise<Book> {
  //   return this.bookService.updateBookStatus(id, status);
  // }
  @Put()
  updateBook(
    @Body(ValidationPipe) updateBookDto: UpdateBookDto,
  ): Promise<Book> {
    return this.bookService.updateBook(updateBookDto);
  }
  @Get()
  getBooks(@Query(ValidationPipe) filterDto: GetBookFilter): Promise<Book[]> {
    return this.bookService.getBooks(filterDto);
  }
}
