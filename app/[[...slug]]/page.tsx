import React from "react";
import { db } from "@/db";
import { notFound } from "next/navigation";
import BlockRenderer from "@/components/BlockRenderer";
import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import HashScrollHandler from "@/components/HashScrollHandler";

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

  const settings = await db.query.siteSettings.findFirst();
  const content = typeof page.content === "string" ? JSON.parse(page.content) : page.content;
  const isSnapScroll = content?.settings?.isSnapScroll || false;

  const navbar = (
    <Navbar
      logoUrl={settings?.logoUrl}
      siteName={settings?.siteName}
      menuItems={settings?.navigationMenu?.items}
    />
  );

  if (isSnapScroll) {
    return (
      <>
        <HashScrollHandler />
        {navbar}
        <main className="h-screen w-full overflow-y-scroll snap-y snap-mandatory scroll-smooth no-scrollbar" style={{
          backgroundColor: content?.settings?.backgroundColor || "transparent",
          overflowX: 'hidden',
          display: 'grid',
          gridTemplateColumns: '1fr', // Ensures sections stack correctly
          position: 'relative'
        }}>
          {content?.blocks?.map((block: any, index: number) => (
            <div 
              key={index}
              id={block.data?.id || `section-${index}`}
              className="relative h-screen w-full"
              style={{ scrollSnapAlign: 'start' }}
            >
              <section
                className="h-screen w-full sticky top-0 snap-center snap-always shrink-0 overflow-hidden shadow-2xl"
                style={{ zIndex: index + 1 }}
              >
                <div className="h-screen w-full">
                  <BlockRenderer blocks={[block]} />
                </div>
              </section>
            </div>
          ))}
        </main>
      </>
    );
  }

  return (
    <>
      <HashScrollHandler />
      {navbar}
      <main style={{ backgroundColor: content?.settings?.backgroundColor || "transparent", overflowX: 'hidden' }}>
        <BlockRenderer blocks={content?.blocks || []} />
      </main>
    </>
  );
}