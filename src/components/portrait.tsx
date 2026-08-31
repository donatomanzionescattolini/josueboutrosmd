import fs from "node:fs";
import path from "node:path";
import type { Locale } from "@/lib/i18n";
import { PortraitFrame } from "./portrait-frame";

const CANDIDATES = [
  "portrait.jpg",
  "portrait.jpeg",
  "portrait.png",
  "portrait.webp",
  "portrait.avif",
];

/**
 * Returns the public path of a portrait if one has been added, else null.
 * Resolved at build time so no placeholder image is ever shipped: drop a file
 * at `public/portrait.jpg` and the photograph replaces the designed plate
 * automatically on the next deploy.
 */
function findPortrait(): string | null {
  const dir = path.join(process.cwd(), "public");
  for (const name of CANDIDATES) {
    if (fs.existsSync(path.join(dir, name))) return `/${name}`;
  }
  return null;
}

export function Portrait({
  alt,
  locale,
  variant = "hero",
  tagline,
}: {
  alt: string;
  locale: Locale;
  variant?: "hero" | "badge";
  tagline?: string;
}) {
  const src = findPortrait();
  return (
    <PortraitFrame src={src} alt={alt} locale={locale} variant={variant} tagline={tagline} />
  );
}

