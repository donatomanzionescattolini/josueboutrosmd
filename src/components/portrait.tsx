import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import { t } from "@/content/dictionary";
import { person, residency } from "@/content/profile";
import type { Locale } from "@/lib/i18n";
import { currentPgy } from "@/lib/utils";
import { Monogram } from "./monogram";

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

export function Portrait({ alt, locale }: { alt: string; locale: Locale }) {
  const src = findPortrait();

  return (
    <div className="relative">
      {/* Offset frame — gives the plate depth without a drop shadow. */}
      <div
        aria-hidden
        className="absolute -bottom-4 -right-4 h-full w-full rounded-[1.25rem] border border-accent/25 sm:-bottom-5 sm:-right-5"
      />

      <div className="relative aspect-4/5 overflow-hidden rounded-[1.25rem] border border-line bg-surface-2">
        {src ? (
          <Image
            src={src}
            alt={alt}
            fill
            priority
            sizes="(max-width: 1024px) 88vw, 34vw"
            className="object-cover"
          />
        ) : (
          <PortraitPlate locale={locale} />
        )}
      </div>
    </div>
  );
}

/**
 * The designed stand-in shown until a photograph is added. It is a finished
 * piece of art direction rather than a grey box, so the site launches complete.
 */
function PortraitPlate({ locale }: { locale: Locale }) {
  const pgy = currentPgy(residency.startYear, residency.endYear);

  return (
    <div className="relative flex h-full w-full flex-col justify-between overflow-hidden bg-linear-to-br from-accent-soft via-surface-2 to-clay-soft p-8">
      {/* Concentric arcs, echoing the monogram ring. */}
      <svg
        aria-hidden
        viewBox="0 0 400 500"
        className="pointer-events-none absolute inset-0 h-full w-full text-accent"
        preserveAspectRatio="xMidYMid slice"
      >
        {[70, 120, 170, 220, 270].map((r, i) => (
          <circle
            key={r}
            cx="320"
            cy="410"
            r={r}
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            opacity={0.38 - i * 0.055}
          />
        ))}
      </svg>

      <div className="relative">
        <Monogram size={56} className="text-accent" />
      </div>

      <div className="relative">
        <p className="font-display text-4xl leading-[1.08] tracking-tight text-ink sm:text-[2.75rem]">
          {t(person.specialty, locale)}
        </p>
        <p className="mt-4 max-w-[24ch] text-sm leading-relaxed text-muted">
          {t(residency.program, locale)}
          {pgy !== null && (
            <span className="whitespace-nowrap text-accent"> · PGY-{pgy}</span>
          )}
          <br />
          {residency.hospital}
          <br />
          {residency.location}
        </p>
      </div>
    </div>
  );
}
