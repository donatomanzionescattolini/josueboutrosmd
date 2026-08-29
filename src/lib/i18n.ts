import { LOCALES, DEFAULT_LOCALE, type Locale } from "@/content/profile";

export { LOCALES, DEFAULT_LOCALE };
export type { Locale };

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

/** The other language — this site has exactly two. */
export function otherLocale(locale: Locale): Locale {
  return locale === "en" ? "es" : "en";
}

/** Build an in-site href, e.g. localeHref("es", "/cv") → "/es/cv". */
export function localeHref(locale: Locale, path = ""): string {
  const clean = path === "/" ? "" : path;
  return `/${locale}${clean}`;
}

export const localeNames: Record<Locale, string> = {
  en: "English",
  es: "Español",
};

/** Short label for the language toggle. */
export const localeShortNames: Record<Locale, string> = {
  en: "EN",
  es: "ES",
};

/** BCP-47 tags for <html lang> and hreflang. */
export const localeTags: Record<Locale, string> = {
  en: "en-US",
  es: "es-US",
};
