import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowLeft, ArrowUpRight, Link2 } from "lucide-react";
import { toast } from "sonner";
import { useLang } from "../context/LangContext";
import { articles } from "../data/articles";
import { formatDate } from "../components/ArticleCard";
import { ListenButton } from "../components/ListenButton";
import { Reveal } from "../components/Reveal";
import { useSEO } from "../hooks/useSEO";

export default function ArticlePage() {
  const { slug } = useParams();
  const { t, lang } = useLang();
  const article = articles.find((a) => a.slug === slug);

  const jsonLd = article
    ? {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: article.title[lang],
        description: article.dek[lang],
        datePublished: article.date,
        inLanguage: lang,
        author: { "@type": "Physician", name: "Josué Boutros, MD" },
      }
    : null;

  useSEO(
    article ? `${article.title[lang]} — Josué Boutros, MD` : t.seo.insights.title,
    article ? article.dek[lang] : t.seo.insights.desc,
    jsonLd
  );

  if (!article) return <Navigate to="/insights" replace />;

  const related = articles.filter((a) => a.slug !== slug).slice(0, 2);
  const paras = article.body[lang];
  const takeaway = paras[paras.length - 1];

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success(t.insights.copied);
  };

  return (
    <div className="pt-36 sm:pt-44" data-testid="article-page">
      <article className="mx-auto max-w-3xl px-5 sm:px-8">
        <Reveal>
          <Link to="/insights" data-testid="article-back-link" className="group inline-flex items-center gap-2 text-sm font-semibold text-mutedw hover:text-terra transition-colors duration-300">
            <ArrowLeft size={15} className="transition-transform duration-300 group-hover:-translate-x-1" />
            {t.insights.backToArchive}
          </Link>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <span className="rounded-full border border-terra/40 bg-terra/10 px-3.5 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-terra" data-testid="article-category">
              {article.category[lang]}
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-subtlew" data-testid="article-meta">
              {formatDate(article.date, lang)} · {article.readMin} {t.insights.minRead}
            </span>
          </div>
          <h1 className="mt-6 font-serif text-4xl sm:text-5xl font-medium tracking-tight text-ink leading-[1.1]" data-testid="article-title">
            {article.title[lang]}
          </h1>
          <p className="mt-6 font-serif italic text-xl sm:text-2xl text-mutedw leading-relaxed" data-testid="article-dek">
            {article.dek[lang]}
          </p>
          <div className="mt-8 flex items-center gap-4 border-y border-linew py-4">
            <div>
              <p className="text-sm font-semibold text-ink">Josué Boutros, MD</p>
              <p className="text-xs text-subtlew">{t.hero.badge}</p>
            </div>
            <ListenButton
              text={`${article.title[lang]}. ${article.dek[lang]} ${paras.join(" ")}`}
              lang={lang}
            />
            <button
              data-testid="article-share-button"
              onClick={copyLink}
              className="ml-auto inline-flex items-center gap-2 rounded-full border border-linew px-4 py-2 text-[12px] font-semibold text-mutedw hover:border-terra/50 hover:text-terra transition-colors duration-300"
            >
              <Link2 size={13} />
              {t.insights.share}
            </button>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="mt-10">
          <p className="text-lg sm:text-xl leading-relaxed text-ink drop-cap">{paras[0]}</p>
          {paras.slice(1, -1).map((p, i) => (
            <p key={i} className="mt-6 text-base sm:text-lg leading-relaxed text-mutedw">
              {p}
            </p>
          ))}
          <div className="mt-12 rounded-3xl border border-terra/25 bg-terra/[0.06] p-8" data-testid="article-takeaway">
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-terra mb-3">{t.insights.takeaway}</p>
            <p className="font-serif text-xl sm:text-2xl leading-relaxed text-ink">{takeaway}</p>
          </div>
          <p className="mt-10 text-xs text-subtlew">{t.insights.disclaimer}</p>
        </Reveal>
      </article>

      <div className="mx-auto max-w-6xl px-5 sm:px-8 mt-24">
        <Reveal>
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-subtlew mb-6">{t.insights.related}</p>
          <div className="grid sm:grid-cols-2 gap-6">
            {related.map((r) => (
              <Link
                key={r.slug}
                to={`/insights/${r.slug}`}
                data-testid={`related-article-${r.slug}`}
                className="group rounded-3xl border border-linew bg-surface p-8 transition-all duration-500 hover:border-terra/40 hover:shadow-[0_20px_50px_rgb(0,0,0,0.07)]"
              >
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-terra">{r.category[lang]}</span>
                <h3 className="mt-3 font-serif text-xl sm:text-2xl font-medium tracking-tight text-ink leading-snug group-hover:text-terra transition-colors duration-300">
                  {r.title[lang]}
                </h3>
                <span className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-semibold text-mutedw group-hover:text-terra transition-colors duration-300">
                  {t.insights.read}
                  <ArrowUpRight size={14} />
                </span>
              </Link>
            ))}
          </div>
        </Reveal>
      </div>
    </div>
  );
}
