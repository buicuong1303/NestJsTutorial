import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { GetBookFilter } from './dto/get-book-filter.dto';
import { BookRepository } from './book.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './book.entity';
import { BookStatus } from './book-status.enum';
import { createQueryBuilder } from 'typeorm';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(BookRepository)
    private bookRepository: BookRepository,
  ) {}
  async getBooks(filterDto: GetBookFilter): Promise<Book[]> {
    const { search, status } = filterDto;
    const query = this.bookRepository.createQueryBuilder('book');
    if (status) {
      query.andWhere('book.status = :status', { status });
    }
    if (search) {
      query.andWhere(
        '(book.title LIKE :search OR book.description LIKE :search)',
        { search: `%${search}%` },
      );
    }
    const books = await query.getMany();
    return books;
  }
  async createBook(createBookDto: CreateBookDto): Promise<Book> {
    const { title, description } = createBookDto;
    const book = new Book();
    book.title = title;
    book.description = description;
    book.status = BookStatus.AVAILABLE;
    await book.save();
    return book;
  }
  // createBook(createBookDto: CreateBookDto): Book {
  //   const { title, description } = createBookDto;
  //   const book: Book = {
  //     id: uuidv1(),
  //     title,
  //     description,
  //     status: BookStatus.AVAILABLE,
  //   };
  //   this.books.push(book);
  //   return book;
  // }
  async getBookById(id: number): Promise<Book> {
    const found = await this.bookRepository.findOne(id);
    if (!found) {
      throw new NotFoundException(`Book with id ${id} not found`);
    }
    return found;
  }
  // getBookById(id: string): Book {
  //   const found = this.books.find(item => item.id === id);
  //   if (!found) {
  //     throw new NotFoundException(`Book with id ${id} not found`);
  //   }
  //   return found;
  // }
  async deleteBookById(id: number): Promise<void> {
    const result = await this.bookRepository.delete(id);
    if (result.affected === 0)
      throw new NotFoundException(`Book with id ${id} not found`);
  }
  // deleteBookById(id: string): void {
  //   const found = this.books.find(item => item.id === id);
  //   if (!found) {
  //     throw new NotFoundException(`Book with id ${id} not found`);
  //   }
  //   this.books = this.books.filter(item => item.id !== id);
  // }
  async updateBook(updateBookDto: UpdateBookDto): Promise<Book> {
    const { id, title, description, status } = updateBookDto;
    const book = await this.getBookById(id);
    book.title = title;
    book.description = description;
    book.status = status;
    book.save();
    return book;
  }
  // searchBook(filterDto: GetBookFilter): Book[] {
  //   const { search, status } = filterDto;
  //   console.log('status:', status);
  //   return this.books.filter(
  //     item =>
  //       item.title.includes(search) ||
  //       item.description.includes(search) ||
  //       item.status === status,
  //   );
  // }
  // updateBookStatus(id: string, status: BookStatus): Book {
  //   const book = this.getBookById(id);
  //   book.status = status;
  //   return book;
  // }
}
