import { seedAdmin } from "@/lib/seed";
import { NextResponse } from "next/server";

export async function GET() {
  // IMPORTANT: Set your desired username and password here temporarily
  const username = "admin";
  const password = "password123";

  try {
    const result = await seedAdmin(username, password);
    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
