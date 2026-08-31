"use client";

import { useMemo, useState } from "react";
import { dictionary, t } from "@/content/dictionary";
import { sortedArticles } from "@/content/articles";
import type { Locale } from "@/lib/i18n";
import { ArticleCard } from "./article-card";
import { SearchIcon } from "./icons";
import { Reveal } from "./reveal";

/**
 * The searchable insights archive: free-text search plus a category filter,
 * both scoped to the active locale. A client component so filtering feels
 * instant; the article content itself is still fully static/prerendered.
 */
export function InsightsArchive({ locale }: { locale: Locale }) {
  const d = dictionary.insights;
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const all = useMemo(() => sortedArticles(), []);

  const categories = useMemo(() => {
    return Array.from(new Set(all.map((a) => t(a.category, locale))));
  }, [all, locale]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return all.filter((article) => {
      const cat = t(article.category, locale);
      if (category !== "all" && cat !== category) return false;
      if (!q) return true;
      const haystack = `${t(article.title, locale)} ${t(article.dek, locale)} ${article.body[locale].join(" ")}`.toLowerCase();
      return haystack.includes(q);
    });
  }, [all, query, category, locale]);

  return (
    <div className="container-page pb-20 sm:pb-28">
      <Reveal delay={0.1}>
        <div className="relative">
          <SearchIcon
            width={17}
            height={17}
            className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-muted"
          />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={t(d.searchPlaceholder, locale)}
            aria-label={t(d.searchPlaceholder, locale)}
            className="field w-full rounded-pill py-3.5 pr-6 pl-12"
          />
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-2">
          {["all", ...categories].map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCategory(c)}
              className={`rounded-pill border px-4 py-2 text-xs font-semibold tracking-wide transition-colors duration-300 ${
                category === c
                  ? "border-accent bg-accent text-accent-contrast"
                  : "border-line text-muted hover:border-accent/50 hover:text-ink"
              }`}
            >
              {c === "all" ? t(d.all, locale) : c}
            </button>
          ))}
          <span className="ml-auto text-[0.6875rem] uppercase tracking-[0.2em] text-muted">
            {filtered.length} {t(d.results, locale)}
          </span>
        </div>
      </Reveal>

      {filtered.length === 0 ? (
        <p className="mt-20 text-center font-display text-2xl italic text-muted">
          {t(d.empty, locale)}
        </p>
      ) : (
        <div className="mt-12 grid gap-x-10 gap-y-2 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((article, i) => (
            <Reveal key={article.slug} delay={Math.min(i * 0.05, 0.3)}>
              <ArticleCard article={article} locale={locale} />
            </Reveal>
          ))}
        </div>
      )}

      <p className="mt-10 text-xs text-muted">{t(d.disclaimer, locale)}</p>
    </div>
  );
}

