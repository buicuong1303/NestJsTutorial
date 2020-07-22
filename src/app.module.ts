import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookController } from './book/book.controller';
import { BookService } from './book/book.service';
import { BookModule } from './book/book.module';
import { PaperController } from './paper/paper.controller';
import { PaperService } from './paper/paper.service';
import { PaperModule } from './paper/paper.module';

@Module({
  imports: [BookModule, PaperModule],
  controllers: [AppController, BookController, PaperController],
  providers: [AppService, BookService, PaperService],
})
export class AppModule {}
