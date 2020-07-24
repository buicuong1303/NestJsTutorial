import { Module } from '@nestjs/common';
import { BookController } from './book.controller';
import { BookService } from './book.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookRepository } from './book.repository';
import { Book } from './book.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([BookRepository]), AuthModule],
  controllers: [BookController],
  providers: [BookService],
  exports: [TypeOrmModule],
})
export class BookModule {}
