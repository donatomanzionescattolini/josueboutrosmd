"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { localeShortNames, otherLocale, type Locale } from "@/lib/i18n";

/**
 * Swaps the leading locale segment of the current path, so switching language
 * keeps the reader on the same page rather than dumping them at the home page.
 */
export function LanguageToggle({
  locale,
  label,
}: {
  locale: Locale;
  label: string;
}) {
  const pathname = usePathname() ?? `/${locale}`;
  const target = otherLocale(locale);
  const segments = pathname.split("/");
  segments[1] = target;
  const href = segments.join("/") || `/${target}`;

  return (
    <Link
      href={href}
      hrefLang={target}
      aria-label={`${label}: ${localeShortNames[target]}`}
      title={label}
      className="inline-flex h-9 items-center gap-1.5 rounded-full border border-line px-3 text-xs font-medium tracking-wide text-muted transition-colors hover:border-line-strong hover:text-ink"
    >
      <span aria-hidden className={locale === "en" ? "text-ink" : ""}>
        EN
      </span>
      <span aria-hidden className="opacity-40">
        /
      </span>
      <span aria-hidden className={locale === "es" ? "text-ink" : ""}>
        ES
      </span>
    </Link>
  );
}
