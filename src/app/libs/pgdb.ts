// lib/postgres.js
import { env } from "next-runtime-env";
import { Pool } from "pg";

const DBPool = new Pool({
  host: env("POSTGRES_HOST"),
  port: parseInt(env("POSTGRES_PORT") as string),
  user: env("POSTGRES_USER"),
  password: env("POSTGRES_PASSWORD"),
  database: env("POSTGRES_DATABASE"),
});

export default DBPool;
