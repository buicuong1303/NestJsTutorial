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
} from '@nestjs/common';
import { Request } from 'express';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { BookService } from './book.service';
import { Book } from './model/book.model';
import { GetBookFilter } from './dto/get-book-filter.dto';
@Controller('books')
export class BookController {
  constructor(private bookService: BookService) {}
  @Get()
  findAll(): Book[] {
    return this.bookService.getAllBooks();
  }
  @Post()
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
  @Put()
  updateBook(@Body() updateBookDto: UpdateBookDto): Book {
    return this.bookService.updateBook(updateBookDto);
  }
  @Get()
  getBookFilter(@Query() filterDto: GetBookFilter): Book[] {
    if (Object.keys(filterDto).length) {
      return this.bookService.searchBook(filterDto);
    }
    return this.bookService.getAllBooks();
  }
}
