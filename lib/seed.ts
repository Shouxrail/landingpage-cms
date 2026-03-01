"use server";

import { db } from "@/db";
import { users } from "@/db/schema";
import bcrypt from "bcryptjs";

export async function seedAdmin(username: string, pass: string) {
  const hashedPassword = await bcrypt.hash(pass, 10);
  
  await db.insert(users).values({
    username: username,
    password: hashedPassword,
  });

  return { success: true, message: `Admin user '${username}' created successfully.` };
}
