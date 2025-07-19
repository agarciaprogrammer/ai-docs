import 'dotenv/config';          // 1️⃣ force-load
import pg from 'pg';
import { Sequelize } from 'sequelize';

console.log('👀 DATABASE_URL =>', process.env.DATABASE_URL);

const url = process.env.DATABASE_URL;
if (!url) {
  console.error('❌ DATABASE_URL not found');
  process.exit(1);
}

const sequelize = new Sequelize(url, {
  dialect: 'postgres',
  logging: false,
  dialectModule: pg,
  schema: 'public',
});

export default sequelize;

export function isDatabaseAvailable() {
  return !!process.env.DATABASE_URL;
}