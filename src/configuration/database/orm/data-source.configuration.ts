import { DataSource } from 'typeorm';
import connectionOptions from './orm.configuration';

const entities = ['src/modules/**/infrastructure/entities/*.entity.{ts,js}'];
const migrations = ['./data/migrations/*.ts'];

export default new DataSource({
  ...connectionOptions,
  entities,
  migrations,
});
