import { ImageResponse } from "next/og";
import { t } from "@/content/dictionary";
import { person, residency, tagline } from "@/content/profile";
import { isLocale, type Locale } from "@/lib/i18n";

import { LOCALES } from "@/content/profile";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${person.displayName} — Family Medicine`;

/** Prerender one card per locale instead of rendering on demand. */
export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

/** Social share card, generated at build time for each locale. */
export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#faf7f2",
          padding: "72px 80px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 18,
            color: "#0f5f55",
            fontSize: 22,
            letterSpacing: 3,
            textTransform: "uppercase",
          }}
        >
          <div
            style={{
              width: 46,
              height: 46,
              borderRadius: 999,
              border: "2px solid #0f5f55",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 20,
              letterSpacing: 0,
            }}
          >
            JB
          </div>
          {t(person.specialty, locale)}
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 96,
              color: "#14201d",
              letterSpacing: -3,
              lineHeight: 1.05,
            }}
          >
            {person.displayName}
          </div>
          <div
            style={{
              marginTop: 26,
              fontSize: 30,
              color: "#5c6a66",
              lineHeight: 1.4,
              maxWidth: 900,
            }}
          >
            {t(tagline, locale)}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid #e4dcd0",
            paddingTop: 28,
            fontSize: 24,
            color: "#5c6a66",
          }}
        >
          <span>{residency.hospital}</span>
          <span>{residency.location}</span>
        </div>
      </div>
    ),
    size,
  );
}
