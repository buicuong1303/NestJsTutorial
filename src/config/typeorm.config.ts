import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'Buicong08',
  database: 'bookmanagement',
  entities: ['dist/**/*.entity{.ts,.js}'],
  synchronize: true,
};
