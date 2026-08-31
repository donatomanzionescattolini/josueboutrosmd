import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { useLang } from "../context/LangContext";

export function formatDate(iso, lang) {
  const [y, m] = iso.split("-").map(Number);
  const d = new Date(y, m - 1);
  return d.toLocaleDateString(lang === "es" ? "es-ES" : "en-US", { year: "numeric", month: "long" });
}

export function ArticleCard({ article, index, lang, t }) {
  return (
    <Link
      to={`/insights/${article.slug}`}
      data-testid={`article-card-${article.slug}`}
      className="group flex flex-col border-t border-linew pt-6 pb-8 h-full"
    >
      <div className="flex items-center justify-between mb-4">
        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-terra">
          {article.category[lang]}
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-subtlew">
          {formatDate(article.date, lang)} · {article.readMin} {t.insights.minRead}
        </span>
      </div>
      <h3 className="font-serif text-2xl sm:text-[1.7rem] font-medium tracking-tight text-ink leading-snug group-hover:text-terra transition-colors duration-300">
        {article.title[lang]}
      </h3>
      <p className="mt-3 text-sm sm:text-[15px] leading-relaxed text-mutedw flex-1">
        {article.dek[lang]}
      </p>
      <span className="mt-5 inline-flex items-center gap-1.5 text-[13px] font-semibold text-ink group-hover:text-terra transition-colors duration-300">
        {t.insights.read}
        <ArrowUpRight size={14} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </span>
    </Link>
  );
}
