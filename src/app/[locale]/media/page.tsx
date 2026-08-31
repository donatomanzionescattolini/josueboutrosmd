import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { dictionary, t } from "@/content/dictionary";
import { mediaAppearances } from "@/content/profile";
import { isLocale, localeHref, type Locale } from "@/lib/i18n";
import {
  ArrowRightIcon,
  GraduationCapIcon,
  MicIcon,
  PresentationIcon,
  UsersIcon,
} from "@/components/icons";
import { PageHeader } from "@/components/page-header";
import { Reveal } from "@/components/reveal";

const ICONS = [GraduationCapIcon, UsersIcon, PresentationIcon, MicIcon];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";
  return {
    title: t(dictionary.media.title, locale),
    description: t(dictionary.media.lede, locale),
    alternates: { canonical: `/${locale}/media` },
  };
}

export default async function MediaPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;
  const m = dictionary.media;

  return (
    <>
      <PageHeader
        eyebrow={t(dictionary.nav.media, locale)}
        title={t(m.title, locale)}
        lede={t(m.lede, locale)}
      />

      <section className="pb-16 sm:pb-20">
        <div className="container-page grid gap-6 md:grid-cols-2">
          {mediaAppearances.map((item, i) => {
            const Icon = ICONS[i % ICONS.length] ?? GraduationCapIcon;
            return (
              <Reveal key={item.id} delay={i * 0.08}>
                <div className="card card-interactive group h-full rounded-card p-8 sm:p-10">
                  <div className="mb-5 flex items-center gap-3">
                    <span className="rounded-full border border-line bg-surface-2 p-2.5 text-clay">
                      <Icon width={16} height={16} />
                    </span>
                    <span className="text-[0.625rem] font-medium uppercase tracking-[0.2em] text-muted">
                      {t(item.kind, locale)}
                    </span>
                  </div>
                  <h2 className="font-display text-xl font-medium tracking-tight text-ink transition-colors duration-300 group-hover:text-clay sm:text-2xl">
                    {t(item.title, locale)}
                  </h2>
                  <p className="mt-4 text-[0.9375rem] leading-relaxed text-muted">
                    {t(item.body, locale)}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section className="pb-20 text-center sm:pb-28">
        <div className="container-page">
          <Reveal>
            <Link
              href={localeHref(locale, "/contact")}
              className="group inline-flex items-center gap-2 rounded-full bg-clay px-8 py-4 text-sm font-semibold text-paper transition-colors hover:bg-ink"
            >
              {t(m.cta, locale)}
              <ArrowRightIcon
                width={15}
                height={15}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}

