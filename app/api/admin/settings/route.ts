import { db } from "@/db";
import { siteSettings } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET() {
  const settings = await db.query.siteSettings.findFirst();
  return NextResponse.json(settings || {
    siteName: "My Landing Page",
    siteDescription: "Manage your landing pages effortlessly.",
    baseUrl: "",
    seoTitleTemplate: "%s | My Site",
    ogImageUrl: "",
    logoUrl: "",
    faviconUrl: "",
    gaId: "",
    fbPixelId: "",
    customHeadScripts: ""
  });
}

export async function POST(req: Request) {
  const body = await req.json();
  const { 
    siteName, 
    siteDescription, 
    baseUrl,
    seoTitleTemplate, 
    ogImageUrl,
    logoUrl,
    faviconUrl,
    gaId,
    fbPixelId,
    customHeadScripts
  } = body;

  const existing = await db.query.siteSettings.findFirst();

  if (existing) {
    await db.update(siteSettings)
      .set({ 
        siteName, 
        siteDescription, 
        baseUrl,
        seoTitleTemplate,
        ogImageUrl,
        logoUrl,
        faviconUrl,
        gaId,
        fbPixelId,
        customHeadScripts,
        updatedAt: new Date() 
      })
      .where(eq(siteSettings.id, existing.id));
  } else {
    await db.insert(siteSettings).values({
      siteName,
      siteDescription,
      baseUrl,
      seoTitleTemplate,
      ogImageUrl,
      logoUrl,
      faviconUrl,
      gaId,
      fbPixelId,
      customHeadScripts
    });
  }

  return NextResponse.json({ success: true });
}
