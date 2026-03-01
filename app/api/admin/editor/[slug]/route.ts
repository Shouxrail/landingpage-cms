import { db } from "@/db";
import { landingPages } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = await db.query.landingPages.findFirst({
    where: eq(landingPages.slug, slug),
  });
  return NextResponse.json(page || { content: { blocks: [] } });
}

export async function POST(req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const body = await req.json();
  
  const existing = await db.query.landingPages.findFirst({
      where: eq(landingPages.slug, slug),
  });

  if (existing) {
    await db.update(landingPages)
      .set({ 
        pageTitle: body.pageTitle, 
        slug: body.slug, 
        content: body.content, 
        status: body.status,
        seoTitle: body.seoTitle,
        seoDescription: body.seoDescription,
        ogImage: body.ogImage,
        updatedAt: new Date() 
      })
      .where(eq(landingPages.slug, slug));
  } else {
    return NextResponse.json({ error: "Page not found / missing" }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}