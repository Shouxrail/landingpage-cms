import "dotenv/config";
import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import bcrypt from "bcryptjs";
import { users } from "../db/schema";

async function main() {
  const username = process.argv[2];
  const password = process.argv[3];

  if (!username || !password) {
    console.error("Usage: npx tsx scripts/seed-admin.ts <username> <password>");
    process.exit(1);
  }

  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: Number(process.env.DB_PORT) || 3306,
  });

  const db = drizzle(connection);

  console.log(`Seeding admin user: ${username}...`);

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await db.insert(users).values({
      username,
      password: hashedPassword,
    });
    console.log("✅ Admin user created successfully!");
  } catch (error: any) {
    if (error.code === 'ER_DUP_ENTRY') {
      console.error("❌ Error: Username already exists.");
    } else {
      console.error("❌ Error seeding user:", error.message);
    }
  } finally {
    await connection.end();
  }
}

main();
