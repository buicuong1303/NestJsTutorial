import { Injectable } from '@nestjs/common';
import { Book } from './model/book.model';
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
    };
    this.books.push(book);
    return book;
  }
  getBookById(id: string): Book {
    return this.books.find(item => item.id === id);
  }
  deleteBookById(id: string): void {
    this.books = this.books.filter(item => item.id !== id);
  }
  updateBook(updateBookDto: UpdateBookDto): Book {
    const { id, title, description } = updateBookDto;
    const book = this.getBookById(id);
    book.title = title;
    book.description = description;
    return book;
  }
  searchBook(filterDto: GetBookFilter): Book[] {
    const { search } = filterDto;
    return this.books.filter(
      item => item.title.includes(search) || item.description.includes(search),
    );
  }
}
