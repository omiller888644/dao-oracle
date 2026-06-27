import type { MetadataRoute } from "next";
import { publicRoutes } from "@/lib/site/routes";
import { loadHexagramSeed } from "@/lib/hexagrams/load-source";
import { getHexagramSlug } from "@/lib/hexagrams/slug";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://dao-oracle.vercel.app";
  const now = new Date();
  const hexagramRoutes = loadHexagramSeed().map((hexagram) => ({
    url: `${baseUrl}/hexagrams/${getHexagramSlug(hexagram.number, hexagram.title_en)}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.65
  }));

  return [
    ...publicRoutes.map((route) => ({
      url: `${baseUrl}${route.path}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: route.priority
    })),
    ...hexagramRoutes
  ];
}
