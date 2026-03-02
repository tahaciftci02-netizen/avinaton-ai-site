import "./globals.css";
import type { ReactNode } from "react";
import type { Metadata } from "next";
import Providers from "./providers";
import { ScrollProgress } from "@/components/chrome";
import AIAssistant from "@/components/ai-assistant";
import { SeoJsonLd } from "@/components/seo-jsonld";
import { site } from "@/lib/site";
import trMessages from "@/messages/tr.json";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: site.name,
  description: site.description,
  applicationName: site.name,
  themeColor: "#0B1F3A",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: "/",
    siteName: site.name,
    title: site.name,
    description: site.description,
    images: [{ url: "/og.svg", width: 1200, height: 630, alt: site.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: site.name,
    description: site.description,
    images: ["/og.svg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  const locale = "tr";

  return (
    <html lang={locale}>
      <body>
        <ScrollProgress />
        <div className="noise" />
        <div className="stars" />
        <SeoJsonLd locale={locale as any} description={site.description} />
        
          <Providers>{children}</Providers>
        
        <AIAssistant />
      </body>
    </html>
  );
}
