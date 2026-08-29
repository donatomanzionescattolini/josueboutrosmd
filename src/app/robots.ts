import type { MetadataRoute } from "next";
import { contact } from "@/content/profile";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/"],
    },
    sitemap: `${contact.siteUrl}/sitemap.xml`,
    host: contact.siteUrl,
  };
}
