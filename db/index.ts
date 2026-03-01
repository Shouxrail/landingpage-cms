import { drizzle } from "drizzle-orm/mysql2";
import * as mysql from "mysql2/promise";
import * as schema from "./schema";

/**
 * To prevent creating multiple connection pools during Hot Module Replacement (HMR) 
 * in development, we use a global variable to store the pool.
 */
const globalForDb = globalThis as unknown as { pool: mysql.Pool | undefined };

const poolConnection = globalForDb.pool ?? mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT) || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

if (process.env.NODE_ENV !== "production") globalForDb.pool = poolConnection;

export const db = drizzle(poolConnection, { schema, mode: "default" });