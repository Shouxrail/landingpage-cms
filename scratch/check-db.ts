import "dotenv/config";
import { db } from "../db";
import { landingPages } from "../db/schema";

async function check() {
  const pages = await db.query.landingPages.findMany();
  console.log(JSON.stringify(pages, null, 2));
  process.exit(0);
}

check();
