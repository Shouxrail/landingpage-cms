import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { db } from "@/db";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const settings = await db.query.siteSettings.findFirst();
  return {
    title: settings?.siteName || "Landing Page CMS",
    description: settings?.siteDescription || "Landing Page CMS",
    metadataBase: settings?.baseUrl ? new URL(settings.baseUrl) : undefined,
    icons: {
      icon: settings?.faviconUrl || "/favicon.ico",
    }
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await db.query.siteSettings.findFirst();

  return (
    <html lang="en">
      <head>
        {/* Google Analytics */}
        {settings?.gaId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${settings.gaId}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${settings.gaId}');
              `}
            </Script>
          </>
        )}

        {/* Meta Pixel */}
        {settings?.fbPixelId && (
          <Script id="fb-pixel" strategy="afterInteractive">
            {`
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${settings.fbPixelId}');
              fbq('track', 'PageView');
            `}
          </Script>
        )}

        {/* Custom Head Scripts */}
        {settings?.customHeadScripts && (
          <div dangerouslySetInnerHTML={{ __html: settings.customHeadScripts }} />
        )}
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
