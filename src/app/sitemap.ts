import type { MetadataRoute } from "next";
import { LOCALES, contact } from "@/content/profile";
import { articles } from "@/content/articles";

const ROUTES = [
  "",
  "/about",
  "/clinical",
  "/insights",
  "/research",
  "/media",
  "/contact",
  "/cv",
  ...articles.map((article) => `/insights/${article.slug}`),
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return LOCALES.flatMap((locale) =>
    ROUTES.map((route) => ({
      url: `${contact.siteUrl}/${locale}${route}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: route === "" ? 1 : 0.7,
      alternates: {
        languages: Object.fromEntries(
          LOCALES.map((l) => [l, `${contact.siteUrl}/${l}${route}`]),
        ),
      },
    })),
  );
}
