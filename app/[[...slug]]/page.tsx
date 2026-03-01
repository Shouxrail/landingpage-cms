import { db } from "@/db";
import { landingPages } from "@/db/schema";
import { notFound } from "next/navigation";
import BlockRenderer from "@/components/BlockRenderer";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ slug?: string[] }> }): Promise<Metadata> {
  const { slug } = await params;
  const slugString = slug ? slug.join("/") : "home";

  const page = await db.query.landingPages.findFirst({
    where: (landingPages, { eq, and }) => and(
      eq(landingPages.slug, slugString),
      eq(landingPages.status, "published")
    ),
  });

  const settings = await db.query.siteSettings.findFirst();
  const siteName = settings?.siteName || "Landing Page CMS";
  const faviconUrl = settings?.faviconUrl || "";
  const baseUrl = settings?.baseUrl || "";

  if (!page) return { title: `Not Found | ${siteName}` };

  const pageTitle = page.seoTitle || page.pageTitle || slugString;
  const template = settings?.seoTitleTemplate || "%s | " + siteName;
  const fullTitle = template.replace("%s", pageTitle);
  const description = page.seoDescription || settings?.siteDescription || "Built with Landing Page CMS";
  const ogImage = page.ogImage || settings?.ogImageUrl || "";

  return {
    title: fullTitle,
    description: description,
    icons: {
      icon: faviconUrl,
    },
    alternates: {
      canonical: baseUrl ? `${baseUrl}/${slugString === "home" ? "" : slugString}` : undefined,
    },
    openGraph: {
      title: fullTitle,
      description: description,
      url: baseUrl ? `${baseUrl}/${slugString === "home" ? "" : slugString}` : undefined,
      siteName: siteName,
      images: ogImage ? [{ url: ogImage }] : [],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description: description,
      images: ogImage ? [ogImage] : [],
    },
  };
}

export default async function Page({ params }: { params: Promise<{ slug?: string[] }> }) {
  const { slug } = await params;
  const slugString = slug ? slug.join("/") : "home";

  // Fetch 'home' slug by default for the root page
  const page = await db.query.landingPages.findFirst({
    where: (landingPages, { eq, and }) => and(
      eq(landingPages.slug, slugString),
      eq(landingPages.status, "published")
    ),
  });

  if (!page) notFound();

  return (
    <main>
      {/* page.content is the JSON column we defined in the schema */}
      <BlockRenderer blocks={page.content?.blocks || []} />
    </main>
  );
}