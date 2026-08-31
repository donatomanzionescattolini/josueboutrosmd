import Link from "next/link";
import { dictionary, t } from "@/content/dictionary";
import { sortedArticles } from "@/content/articles";
import { localeHref, type Locale } from "@/lib/i18n";
import { ArticleCard } from "./article-card";
import { ArrowRightIcon } from "./icons";
import { Reveal } from "./reveal";

export function FeaturedInsights({ locale }: { locale: Locale }) {
  const d = dictionary.home;
  const featured = sortedArticles().slice(0, 3);

  return (
    <section className="py-16 sm:py-24">
      <div className="container-page">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow mb-4">{t(d.insightsEyebrow, locale)}</p>
            <h2 className="type-heading max-w-xl text-ink">
              {t(d.insightsTitle, locale)}
            </h2>
            <p className="type-lede mt-4 max-w-xl">{t(d.insightsSub, locale)}</p>
          </div>
          <Link
            href={localeHref(locale, "/insights")}
            className="group inline-flex items-center gap-2 text-sm font-semibold text-ink transition-colors hover:text-clay"
          >
            {t(d.viewAllInsights, locale)}
            <ArrowRightIcon
              width={15}
              height={15}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </Reveal>

        <div className="mt-12 grid gap-x-10 gap-y-2 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((article, i) => (
            <Reveal key={article.slug} delay={i * 0.1}>
              <ArticleCard article={article} locale={locale} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

