import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { useLang } from "../context/LangContext";
import { articles } from "../data/articles";
import { ArticleCard } from "../components/ArticleCard";
import { Reveal, Eyebrow } from "../components/Reveal";
import { useSEO } from "../hooks/useSEO";

export default function Insights() {
  const { t, lang } = useLang();
  useSEO(t.seo.insights.title, t.seo.insights.desc);
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState("all");

  const categories = useMemo(
    () => [...new Set(articles.map((a) => a.category[lang]))],
    [lang]
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return [...articles]
      .sort((a, b) => b.date.localeCompare(a.date))
      .filter((a) => {
        const matchCat = cat === "all" || a.category[lang] === cat;
        const hay = `${a.title[lang]} ${a.dek[lang]} ${a.body[lang].join(" ")}`.toLowerCase();
        return matchCat && (!q || hay.includes(q));
      });
  }, [query, cat, lang]);

  return (
    <div className="pt-36 sm:pt-44" data-testid="insights-page">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <Eyebrow>{t.insights.eyebrow}</Eyebrow>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-ink leading-[1.08]">
            {t.insights.title}
          </h1>
          <p className="mt-6 max-w-2xl text-base sm:text-lg text-mutedw">{t.insights.sub}</p>
        </Reveal>

        <Reveal delay={0.1} className="mt-12">
          <div className="relative">
            <Search size={17} className="absolute left-5 top-1/2 -translate-y-1/2 text-subtlew" />
            <input
              data-testid="insights-search-input"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t.insights.searchPlaceholder}
              className="w-full rounded-full border border-linew bg-surface py-4 pl-12 pr-6 text-sm sm:text-base text-ink placeholder:text-subtlew outline-none focus:border-terra/60 focus:ring-2 focus:ring-terra/15 transition-all duration-300"
            />
          </div>
          <div className="mt-5 flex flex-wrap items-center gap-2" data-testid="insights-category-filter">
            {["all", ...categories].map((c) => (
              <button
                key={c}
                data-testid={`category-chip-${c === "all" ? "all" : c.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                onClick={() => setCat(c)}
                className={`rounded-full border px-4 py-2 text-[12px] font-semibold tracking-wide transition-all duration-300 ${
                  cat === c
                    ? "border-terra bg-terra text-cream"
                    : "border-linew text-mutedw hover:border-terra/50 hover:text-terra"
                }`}
              >
                {c === "all" ? t.insights.all : c}
              </button>
            ))}
            <span className="ml-auto font-mono text-[10px] uppercase tracking-[0.2em] text-subtlew" data-testid="insights-result-count">
              {filtered.length} {t.insights.results}
            </span>
          </div>
        </Reveal>

        {filtered.length === 0 ? (
          <p className="mt-20 text-center font-serif italic text-2xl text-subtlew" data-testid="insights-empty-state">
            {t.insights.empty}
          </p>
        ) : (
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-x-10" data-testid="insights-grid">
            {filtered.map((a, i) => (
              <ArticleCard key={a.slug} article={a} index={i} lang={lang} t={t} />
            ))}
          </div>
        )}
        <p className="mt-10 text-xs text-subtlew" data-testid="insights-disclaimer">{t.insights.disclaimer}</p>
      </div>
    </div>
  );
}
