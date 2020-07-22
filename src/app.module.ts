import { Module, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookController } from './book/book.controller';
import { BookService } from './book/book.service';
import { BookModule } from './book/book.module';
import { PaperController } from './paper/paper.controller';
import { PaperService } from './paper/paper.service';
import { PaperModule } from './paper/paper.module';
import { LoggerMiddleware } from './services/logger.middleware';

@Module({
  imports: [BookModule, PaperModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes(BookController);
  }
}
