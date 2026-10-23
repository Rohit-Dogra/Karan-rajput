import type { MetadataRoute } from "next";
import { artist } from "@/data/artist";
import { catalogueSyncedAt } from "@/lib/catalogue";

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: artist.siteUrl, lastModified: catalogueSyncedAt, changeFrequency: "weekly", priority: 1 }];
}
