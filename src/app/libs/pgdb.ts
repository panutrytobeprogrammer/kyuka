// lib/postgres.js
import { Pool } from "pg";

const DBPool = new Pool({
  connectionString: process.env.POSTGRES_URL,
});

export default DBPool;
