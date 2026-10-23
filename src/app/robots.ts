import type { MetadataRoute } from "next";
import { artist } from "@/data/artist";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/api/" },
    sitemap: `${artist.siteUrl}/sitemap.xml`,
  };
}
