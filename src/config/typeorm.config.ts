import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Book } from '../book/book.entity';
import { User } from 'src/auth/auth.entity';
export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'Buicong08',
  database: 'bookmanagement',
  entities: ['src/**/*.entity.ts'],
  synchronize: true,
};
