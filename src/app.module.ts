import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookController } from './book/book.controller';
import { BookService } from './book/book.service';
import { BookModule } from './book/book.module';
import { PaperController } from './paper/paper.controller';
import { PaperService } from './paper/paper.service';
import { PaperModule } from './paper/paper.module';
import { LoggerMiddleware } from './services/logger.middleware';
import { logger } from './services/loggerFunc.middleware';
import * as helmet from 'helmet';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { BookRepository } from './book/book.repository';
import { Connection } from 'typeorm';
import { AuthModule } from './auth/auth.module';
@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), BookModule, AuthModule],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(helmet(), logger).forRoutes(BookController);
    // .apply(LoggerMiddleware)
    // .exclude(
    //   { path: 'books', method: RequestMethod.PUT },
    //   { path: 'books', method: RequestMethod.GET },
    //   'books/(.*)',
    // )
    // .forRoutes({ path: 'books', method: RequestMethod.POST });
  }
}
