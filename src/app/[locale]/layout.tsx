import type { Metadata, Viewport } from "next";
import { Fraunces, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import { notFound } from "next/navigation";
import { dictionary, t } from "@/content/dictionary";
import {
  LOCALES,
  contact,
  person,
  residency,
  shortBio,
} from "@/content/profile";
import { isLocale, localeTags, type Locale } from "@/lib/i18n";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { ThemeScript } from "@/components/theme-toggle";
import "../globals.css";

const display = Fraunces({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-fraunces",
});

const sans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
  variable: "--font-ibm-sans",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--font-ibm-mono",
});

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#faf7f2" },
    { media: "(prefers-color-scheme: dark)", color: "#0b1211" },
  ],
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";
  const description = t(shortBio, locale);

  return {
    metadataBase: new URL(contact.siteUrl),
    title: {
      default: `${person.displayName} — ${t(person.specialty, locale)}`,
      template: `%s · ${person.displayName}`,
    },
    description,
    applicationName: person.displayName,
    authors: [{ name: person.displayName }],
    creator: person.displayName,
    keywords: [
      person.fullName,
      "family medicine",
      "medicina familiar",
      "resident physician",
      "primary care",
      "Hialeah",
      "Miami",
      "Florida",
      "bilingual physician",
      residency.hospital,
    ],
    alternates: {
      canonical: `/${locale}`,
      languages: {
        "en-US": "/en",
        "es-US": "/es",
        "x-default": "/en",
      },
    },
    openGraph: {
      type: "profile",
      siteName: person.displayName,
      title: `${person.displayName} — ${t(person.specialty, locale)}`,
      description,
      url: `/${locale}`,
      locale: localeTags[locale].replace("-", "_"),
      firstName: person.firstName,
      lastName: person.lastName,
    },
    twitter: {
      card: "summary_large_image",
      title: `${person.displayName} — ${t(person.specialty, locale)}`,
      description,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large" },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;

  return (
    <html
      lang={localeTags[locale]}
      className={`${display.variable} ${sans.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <ThemeScript />
      </head>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-accent focus:px-5 focus:py-2.5 focus:text-sm focus:text-accent-contrast"
        >
          {t(dictionary.nav.skipToContent, locale)}
        </a>
        <div className="relative z-10 flex min-h-dvh flex-col">
          <SiteHeader locale={locale} />
          <main id="main" className="flex-1">
            {children}
          </main>
          <SiteFooter locale={locale} />
        </div>
        <PersonJsonLd locale={locale} />
      </body>
    </html>
  );
}

/**
 * Structured data so search engines and professional directories can read the
 * profile correctly. Rendered as a script tag rather than via next/script so it
 * is present in the static HTML.
 */
function PersonJsonLd({ locale }: { locale: Locale }) {
  const json = {
    "@context": "https://schema.org",
    "@type": "Physician",
    name: person.displayName,
    givenName: person.firstName,
    familyName: person.lastName,
    honorificSuffix: person.credential,
    description: t(shortBio, locale),
    url: `${contact.siteUrl}/${locale}`,
    email: `mailto:${contact.email}`,
    medicalSpecialty: "PrimaryCare",
    knowsLanguage: ["en", "es"],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Hialeah",
      addressRegion: "FL",
      addressCountry: "US",
    },
    worksFor: {
      "@type": "Hospital",
      name: residency.hospital,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Hialeah",
        addressRegion: "FL",
        addressCountry: "US",
      },
    },
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "Universidad de Ciencias Médicas de Camagüey",
    },
    sameAs: [contact.linkedin, contact.doximity].filter(Boolean),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
}
