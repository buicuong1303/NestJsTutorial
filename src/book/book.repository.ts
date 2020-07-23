import { Repository, EntityRepository } from 'typeorm';
import { Book } from './book.entity';

@EntityRepository(Book)
export class BookRepository extends Repository<Book> {
  //   async createBook(createBookDto: CreateBookDto): Promise<Book> {
  //   }
}
