import { db } from "@/db";
import { landingPages, siteSettings } from "@/db/schema";
import { MetadataRoute } from "next";
import { eq } from "drizzle-orm";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const settings = await db.query.siteSettings.findFirst();
  const baseUrl = settings?.baseUrl || "";

  if (!baseUrl) return [];

  const pages = await db.query.landingPages.findMany({
    where: eq(landingPages.status, "published"),
  });

  return pages.map((page) => ({
    url: `${baseUrl}/${page.slug === "home" ? "" : page.slug}`,
    lastModified: page.updatedAt || new Date(),
    changeFrequency: 'weekly' as const,
    priority: page.slug === "home" ? 1 : 0.8,
  }));
}
