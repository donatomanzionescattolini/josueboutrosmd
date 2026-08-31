import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { dictionary, t } from "@/content/dictionary";
import { researchProjects } from "@/content/profile";
import { isLocale, localeHref, type Locale } from "@/lib/i18n";
import { ArrowRightIcon, FileTextIcon } from "@/components/icons";
import { PageHeader } from "@/components/page-header";
import { Reveal } from "@/components/reveal";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";
  return {
    title: t(dictionary.research.title, locale),
    description: t(dictionary.research.lede, locale),
    alternates: { canonical: `/${locale}/research` },
  };
}

export default async function ResearchPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;
  const r = dictionary.research;

  const statusLabel = {
    peer: t(r.statusPeer, locale),
    ongoing: t(r.statusOngoing, locale),
    published: t(r.statusPublished, locale),
  } as const;

  return (
    <>
      <PageHeader
        eyebrow={t(dictionary.nav.research, locale)}
        title={t(r.title, locale)}
        lede={t(r.lede, locale)}
      />

      <section className="pb-16 sm:pb-20">
        <div className="container-page space-y-6">
          {researchProjects.map((project, i) => (
            <Reveal key={project.id} delay={i * 0.08}>
              <div className="card card-interactive group rounded-card p-8 sm:p-10">
                <div className="mb-4 flex flex-wrap items-center gap-4">
                  <span className="rounded-full border border-accent/40 bg-accent-soft px-3.5 py-1 text-[0.625rem] font-medium uppercase tracking-[0.2em] text-accent-ink">
                    {statusLabel[project.status]}
                  </span>
                  <FileTextIcon width={15} height={15} className="text-muted" />
                </div>
                <h2 className="font-display text-2xl font-medium tracking-tight text-ink transition-colors duration-300 group-hover:text-accent sm:text-3xl">
                  {t(project.title, locale)}
                </h2>
                <p className="mt-4 max-w-3xl text-[0.9375rem] leading-relaxed text-muted sm:text-base">
                  {t(project.body, locale)}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="pb-20 sm:pb-28">
        <div className="container-page">
          <Reveal>
            <div className="flex flex-col items-start gap-6 rounded-card border border-line bg-surface-2/70 p-8 sm:flex-row sm:items-center sm:p-10">
              <p className="flex-1 text-[0.9375rem] leading-relaxed text-muted">
                {t(r.collab, locale)}
              </p>
              <Link
                href={localeHref(locale, "/contact")}
                className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-paper transition-colors hover:bg-accent"
              >
                {t(dictionary.nav.contact, locale)}
                <ArrowRightIcon
                  width={14}
                  height={14}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

