import Link from "next/link";
import { t } from "@/content/dictionary";
import { dictionary } from "@/content/dictionary";
import { formatArticleDate, type Article } from "@/content/articles";
import { localeHref, type Locale } from "@/lib/i18n";
import { ArrowUpRightIcon } from "./icons";

export function ArticleCard({
  article,
  locale,
}: {
  article: Article;
  locale: Locale;
}) {
  return (
    <Link
      href={localeHref(locale, `/insights/${article.slug}`)}
      className="group flex h-full flex-col border-t border-line pt-6 pb-8"
    >
      <div className="mb-4 flex items-center justify-between gap-3">
        <span className="font-medium text-[0.6875rem] uppercase tracking-[0.16em] text-clay">
          {t(article.category, locale)}
        </span>
        <span className="whitespace-nowrap text-[0.6875rem] uppercase tracking-[0.16em] text-muted">
          {formatArticleDate(article.date, locale)} · {article.readMinutes}{" "}
          {t(dictionary.insights.minRead, locale)}
        </span>
      </div>
      <h3 className="font-display text-2xl leading-snug tracking-tight text-ink transition-colors duration-300 group-hover:text-clay sm:text-[1.7rem]">
        {t(article.title, locale)}
      </h3>
      <p className="mt-3 flex-1 text-[0.9375rem] leading-relaxed text-muted">
        {t(article.dek, locale)}
      </p>
      <span className="mt-5 inline-flex items-center gap-1.5 text-[0.8125rem] font-semibold text-ink transition-colors duration-300 group-hover:text-clay">
        {t(dictionary.insights.read, locale)}
        <ArrowUpRightIcon
          width={14}
          height={14}
          className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
        />
      </span>
    </Link>
  );
}

