import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { dictionary, t } from "@/content/dictionary";
import {
  awards,
  contact,
  credentials,
  education,
  experience,
  memberships,
  person,
  presentations,
  publications,
  residency,
  training,
} from "@/content/profile";
import { isLocale, type Locale } from "@/lib/i18n";
import { currentPgy } from "@/lib/utils";
import { CvSection } from "@/components/cv-section";
import { ExternalIcon } from "@/components/icons";
import { PageHeader } from "@/components/page-header";
import { PrintButton } from "@/components/print-button";
import { Timeline } from "@/components/timeline";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";
  return {
    title: t(dictionary.cv.title, locale),
    description: t(dictionary.cv.lede, locale),
    alternates: { canonical: `/${locale}/cv` },
  };
}

export default async function CvPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;
  const c = dictionary.cv;
  const pgy = currentPgy(residency.startYear, residency.endYear);

  return (
    <>
      <PageHeader
        eyebrow={`${person.displayName}${pgy !== null ? ` · PGY-${pgy}` : ""}`}
        title={t(c.title, locale)}
        lede={t(c.lede, locale)}
      >
        <PrintButton label={t(dictionary.actions.print, locale)} />
      </PageHeader>

      <div className="container-page py-16 sm:py-20">
        <CvSection title={t(c.training, locale)} isEmpty={training.length === 0}>
          <Timeline entries={training} locale={locale} />
        </CvSection>

        <CvSection title={t(c.education, locale)} isEmpty={education.length === 0}>
          <Timeline entries={education} locale={locale} />
        </CvSection>

        <CvSection title={t(c.experience, locale)} isEmpty={experience.length === 0}>
          <Timeline entries={experience} locale={locale} />
        </CvSection>

        <CvSection
          title={t(c.credentials, locale)}
          isEmpty={credentials.length === 0}
        >
          <ul className="space-y-5">
            {credentials.map((item) => (
              <li key={item.id}>
                <p className="text-[0.9375rem] text-ink">{t(item.label, locale)}</p>
                {item.issuer && (
                  <p className="mt-0.5 text-sm text-muted">{item.issuer}</p>
                )}
                {item.note && (
                  <p className="mt-0.5 text-sm text-muted">{t(item.note, locale)}</p>
                )}
              </li>
            ))}
          </ul>
        </CvSection>

        <CvSection
          title={t(c.publications, locale)}
          isEmpty={publications.length === 0}
        >
          <ol className="space-y-5">
            {publications.map((item) => (
              <li key={item.id} className="text-[0.9375rem] leading-relaxed text-ink-soft">
                {item.href ? (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-draw inline-flex items-baseline gap-1.5"
                  >
                    {item.citation}
                    <ExternalIcon className="shrink-0 self-center text-muted" />
                  </a>
                ) : (
                  item.citation
                )}
              </li>
            ))}
          </ol>
        </CvSection>

        <CvSection
          title={t(c.presentations, locale)}
          isEmpty={presentations.length === 0}
        >
          <ol className="space-y-5">
            {presentations.map((item) => (
              <li key={item.id} className="text-[0.9375rem] leading-relaxed text-ink-soft">
                {item.citation}
              </li>
            ))}
          </ol>
        </CvSection>

        <CvSection title={t(c.awards, locale)} isEmpty={awards.length === 0}>
          <ul className="space-y-5">
            {awards.map((item) => (
              <li key={item.id}>
                <p className="text-[0.9375rem] text-ink">{t(item.label, locale)}</p>
                {item.issuer && (
                  <p className="mt-0.5 text-sm text-muted">{item.issuer}</p>
                )}
              </li>
            ))}
          </ul>
        </CvSection>

        <CvSection
          title={t(c.memberships, locale)}
          isEmpty={memberships.length === 0}
        >
          <ul className="space-y-5">
            {memberships.map((item) => (
              <li key={item.id}>
                <p className="text-[0.9375rem] text-ink">{t(item.label, locale)}</p>
                {item.issuer && (
                  <p className="mt-0.5 text-sm text-muted">{item.issuer}</p>
                )}
              </li>
            ))}
          </ul>
        </CvSection>

        <CvSection title={t(c.languages, locale)}>
          <ul className="flex flex-wrap gap-2.5">
            {person.languages.map((language) => (
              <li
                key={language.en}
                className="rounded-pill border border-line bg-surface px-4 py-1.5 text-sm text-ink-soft"
              >
                {t(language, locale)}
              </li>
            ))}
          </ul>
        </CvSection>

        <CvSection title={t(dictionary.contact.directHeading, locale)}>
          <ul className="space-y-2 text-[0.9375rem]">
            <li>
              <a
                href={`mailto:${contact.email}`}
                className="link-draw text-ink-soft hover:text-ink"
              >
                {contact.email}
              </a>
            </li>
            {contact.phone && (
              <li>
                <a
                  href={`tel:${contact.phone.replace(/[^+\d]/g, "")}`}
                  className="link-draw text-ink-soft hover:text-ink"
                >
                  {contact.phone}
                </a>
              </li>
            )}
            <li className="text-muted">{t(person.location, locale)}</li>
          </ul>
        </CvSection>
      </div>
    </>
  );
}
