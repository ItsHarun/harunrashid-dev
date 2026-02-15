import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as schema from "@shared/schema";

const { Pool } = pg;

if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?",
  );
}

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  // Force IPv4 to avoid ETIMEDOUT on IPv6 networks
  // @ts-ignore - pg types might not include this valid node option
  family: 4,
});
export const db = drizzle(pool, { schema });
