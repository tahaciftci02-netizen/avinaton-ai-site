export const site = {
  name: "AviNation Türkiye",
  tagline: {
    tr: "Gökyüzünde Birlikte Daha Güçlü",
    en: "Stronger Together in the Sky",
  },
  description: {
    tr: "Türkiye havacılık öğrenci topluluklarını tek bir standartta buluşturan ulusal ağ.",
    en: "A national network uniting aviation student communities in Turkey under one shared standard.",
  },
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://silver-duckanoo-6d85ed.netlify.app",
  twitter: "@", // varsa güncelle
} as const;

export type Locale = "tr" | "en";
