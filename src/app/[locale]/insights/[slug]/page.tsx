import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { dictionary, t } from "@/content/dictionary";
import { articles, findArticle, formatArticleDate } from "@/content/articles";
import { contact, person } from "@/content/profile";
import { isLocale, localeHref, type Locale } from "@/lib/i18n";
import { ArrowLeftIcon } from "@/components/icons";
import { CopyLinkButton } from "@/components/copy-link-button";
import { Reveal } from "@/components/reveal";

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale: raw, slug } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";
  const article = findArticle(slug);
  if (!article) {
    return { title: t(dictionary.insights.title, locale) };
  }
  return {
    title: `${t(article.title, locale)} — ${person.displayName}`,
    description: t(article.dek, locale),
    alternates: { canonical: `/${locale}/insights/${slug}` },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: raw, slug } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;

  const article = findArticle(slug);
  if (!article) notFound();

  const paragraphs = article.body[locale];
  const leading = paragraphs[0] ?? "";
  const middle = paragraphs.slice(1, -1);
  const takeaway = paragraphs[paragraphs.length - 1] ?? "";
  const related = articles.filter((a) => a.slug !== slug).slice(0, 2);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: t(article.title, locale),
    description: t(article.dek, locale),
    datePublished: article.date,
    inLanguage: locale,
    author: { "@type": "Physician", name: person.displayName },
    publisher: { "@type": "Person", name: person.displayName },
    mainEntityOfPage: `${contact.siteUrl}/${locale}/insights/${slug}`,
  };

  return (
    <div className="pt-14 pb-24 sm:pt-16">
      <article className="container-page max-w-3xl">
        <Reveal>
          <Link
            href={localeHref(locale, "/insights")}
            className="group inline-flex items-center gap-2 text-sm font-semibold text-muted transition-colors hover:text-clay"
          >
            <ArrowLeftIcon
              width={15}
              height={15}
              className="transition-transform duration-300 group-hover:-translate-x-1"
            />
            {t(dictionary.insights.backToArchive, locale)}
          </Link>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <span className="rounded-full border border-clay/40 bg-clay-soft px-3.5 py-1 text-[0.625rem] font-medium uppercase tracking-[0.18em] text-clay">
              {t(article.category, locale)}
            </span>
            <span className="text-[0.625rem] uppercase tracking-[0.18em] text-muted">
              {formatArticleDate(article.date, locale)} · {article.readMinutes}{" "}
              {t(dictionary.insights.minRead, locale)}
            </span>
          </div>

          <h1 className="mt-6 font-display text-4xl leading-[1.1] font-medium tracking-tight text-ink sm:text-5xl">
            {t(article.title, locale)}
          </h1>
          <p className="mt-6 font-display text-xl italic leading-relaxed text-muted sm:text-2xl">
            {t(article.dek, locale)}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4 border-y border-line py-4">
            <div>
              <p className="text-sm font-semibold text-ink">{person.displayName}</p>
              <p className="text-xs text-muted">{t(dictionary.home.heroBadge, locale)}</p>
            </div>
            <CopyLinkButton
              label={t(dictionary.insights.share, locale)}
              copiedLabel={t(dictionary.insights.copied, locale)}
            />
          </div>
        </Reveal>

        <Reveal delay={0.1} className="mt-10">
          <p className="drop-cap type-body text-lg sm:text-xl">{leading}</p>
          {middle.map((paragraph, i) => (
            <p key={i} className="type-body mt-6">
              {paragraph}
            </p>
          ))}

          <div className="mt-12 rounded-card border border-clay/25 bg-clay-soft p-8">
            <p className="text-[0.625rem] font-medium uppercase tracking-[0.2em] text-clay">
              {t(dictionary.insights.takeaway, locale)}
            </p>
            <p className="mt-3 font-display text-xl leading-relaxed text-ink sm:text-2xl">
              {takeaway}
            </p>
          </div>
          <p className="mt-10 text-xs text-muted">{t(dictionary.insights.disclaimer, locale)}</p>
        </Reveal>
      </article>

      {related.length > 0 && (
        <div className="container-page mt-20">
          <Reveal>
            <p className="mb-6 text-[0.6875rem] font-medium uppercase tracking-[0.2em] text-muted">
              {t(dictionary.insights.related, locale)}
            </p>
            <div className="grid gap-6 sm:grid-cols-2">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={localeHref(locale, `/insights/${r.slug}`)}
                  className="card card-interactive group rounded-card p-8"
                >
                  <span className="text-[0.625rem] font-medium uppercase tracking-[0.18em] text-clay">
                    {t(r.category, locale)}
                  </span>
                  <h3 className="mt-3 font-display text-xl font-medium tracking-tight text-ink transition-colors group-hover:text-clay sm:text-2xl">
                    {t(r.title, locale)}
                  </h3>
                </Link>
              ))}
            </div>
          </Reveal>
        </div>
      )}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </div>
  );
}

