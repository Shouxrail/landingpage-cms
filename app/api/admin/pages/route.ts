import { db } from "@/db";
import { landingPages } from "@/db/schema";
import { desc } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET() {
  const pages = await db.query.landingPages.findMany({
    orderBy: [desc(landingPages.updatedAt)],
  });
  return NextResponse.json(pages);
}

export async function POST(req: Request) {
  const { title, slug } = await req.json();

  if (!title || !slug) {
    return NextResponse.json({ error: "Title and slug are required" }, { status: 400 });
  }

  try {
    const result = await db.insert(landingPages).values({
      pageTitle: title,
      slug: slug,
      content: { blocks: [] },
    });

    return NextResponse.json({ success: true, id: result[0].insertId });
  } catch (error: any) {
    if (error.code === 'ER_DUP_ENTRY') {
      return NextResponse.json({ error: "Slug already exists" }, { status: 409 });
    }
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
