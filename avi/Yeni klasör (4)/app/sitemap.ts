import type { MetadataRoute } from "next";
import { clubs } from "@/lib/clubs";
import { site } from "@/lib/site";

const base = site.url;

const locales: Array<"tr" | "en"> = ["tr", "en"];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = ["", "founding", "apply", "clubs", "ulusal-model", "partners", "about"];

  const routes: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const p of staticPaths) {
      const path = p ? `/${locale}/${p}` : `/${locale}`;
      routes.push({
        url: `${base}${path}`,
        changeFrequency: "weekly",
        priority: p === "" ? 1.0 : 0.8,
      });
    }

    for (const c of clubs) {
      routes.push({
        url: `${base}/${locale}/clubs/${c.slug}`,
        changeFrequency: "monthly",
        priority: 0.6,
      });
    }
  }

  return routes;
}
