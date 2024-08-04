import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config({
  path: process.env.NODE_ENV === 'development' ? '.dev.env' : '.env',
});

export default new DataSource({
  type: 'mariadb',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: false,
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  migrations: ['src/migrations/**/*.ts'],
  migrationsTableName: 'migrations',
});
