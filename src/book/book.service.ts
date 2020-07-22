import { Injectable, NotFoundException } from '@nestjs/common';
import { Book, BookStatus } from './model/book.model';
import { v1 as uuidv1 } from 'uuid';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { GetBookFilter } from './dto/get-book-filter.dto';

@Injectable()
export class BookService {
  private books: Book[] = [];

  getAllBooks(): Book[] {
    return this.books;
  }
  createBook(createBookDto: CreateBookDto): Book {
    const { title, description } = createBookDto;

    const book: Book = {
      id: uuidv1(),
      title,
      description,
      status: BookStatus.AVAILABLE,
    };
    this.books.push(book);
    return book;
  }
  getBookById(id: string): Book {
    const found = this.books.find(item => item.id === id);
    if (!found) {
      throw new NotFoundException(`Book with id ${id} not found`);
    }
    return found;
  }
  deleteBookById(id: string): void {
    const found = this.books.find(item => item.id === id);
    if (!found) {
      throw new NotFoundException(`Book with id ${id} not found`);
    }
    this.books = this.books.filter(item => item.id !== id);
  }
  updateBook(updateBookDto: UpdateBookDto): Book {
    const { id, title, description, status } = updateBookDto;
    console.log('=>>>>>', title);
    const book = this.getBookById(id);
    book.title = title;
    book.description = description;
    book.status = status;
    return book;
  }
  searchBook(filterDto: GetBookFilter): Book[] {
    const { search, status } = filterDto;
    console.log('status:', status);
    return this.books.filter(
      item =>
        item.title.includes(search) ||
        item.description.includes(search) ||
        item.status === status,
    );
  }
  updateBookStatus(id: string, status: BookStatus): Book {
    const book = this.getBookById(id);
    book.status = status;
    return book;
  }
}
