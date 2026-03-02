import Script from "next/script";
import { site, type Locale } from "@/lib/site";

type OrgSchemaProps = {
  locale: Locale;
  description: string;
  contactEmail?: string;
};

export function SeoJsonLd({
  locale,
  description,
  contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "avinationturkiye@gmail.com",
}: OrgSchemaProps) {
  const org = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    url: site.url,
    description,
    email: contactEmail,
    logo: `${site.url}/logo.png`,
    sameAs: [],
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.name,
    url: site.url,
    inLanguage: locale === "tr" ? "tr-TR" : "en-US",
    description,
  };

  return (
    <>
      <Script id="jsonld-org" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(org)}
      </Script>
      <Script id="jsonld-website" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(website)}
      </Script>
    </>
  );
}
