import pg from "pg";
import dotenv from "dotenv";
dotenv.config();

const port = process.env.PORT || 3000;
const db = new pg.Client({
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: 5432,
});
export { port, db };
