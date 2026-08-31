import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useLang } from "../context/LangContext";
import { articles } from "../data/articles";
import { Hero } from "../components/Hero";
import { Marquee } from "../components/Marquee";
import { Manifesto } from "../components/Manifesto";
import { ArticleCard } from "../components/ArticleCard";
import { Reveal, Eyebrow } from "../components/Reveal";
import { useSEO } from "../hooks/useSEO";

export default function Home() {
  const { t, lang } = useLang();
  useSEO(t.seo.home.title, t.seo.home.desc);
  const featured = [...articles].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 3);
  const creds = [
    ["4", t.home.credArticles],
    ["6+", t.home.credPresentations],
    ["CR", t.home.credRole],
    ["EN·ES", t.home.credLang],
  ];

  return (
    <div data-testid="home-page">
      <Hero />
      <Marquee />
      <Manifesto />

      <section className="py-10 sm:py-16" data-testid="home-insights-section">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <Reveal className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <Eyebrow>{t.home.insightsEyebrow}</Eyebrow>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-ink leading-tight">{t.home.insightsTitle}</h2>
              <p className="mt-4 max-w-xl text-mutedw">{t.home.insightsSub}</p>
            </div>
            <Link to="/insights" data-testid="home-view-archive-link" className="group inline-flex items-center gap-2 text-sm font-semibold text-ink hover:text-terra transition-colors duration-300">
              {t.home.viewAll}
              <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </Reveal>
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-x-10">
            {featured.map((a, i) => (
              <Reveal key={a.slug} delay={i * 0.1}>
                <ArticleCard article={a} index={i} lang={lang} t={t} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 sm:py-32 bg-ink text-cream mt-16" data-testid="home-credential-band">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <Reveal>
            <Eyebrow>{t.home.clinicalEyebrow}</Eyebrow>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight leading-tight max-w-2xl">{t.home.clinicalTitle}</h2>
          </Reveal>
          <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-cream/15">
            {t.clinical.pillars.map((p, i) => (
              <Reveal key={p.num} delay={i * 0.08} className="bg-ink p-7 sm:p-8">
                <span className="font-serif italic text-terra text-xl">{p.num}</span>
                <h3 className="mt-4 font-serif text-xl sm:text-2xl font-medium">{p.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-cream/60">{p.body}</p>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-10">
            <Link to="/clinical" data-testid="home-clinical-link" className="group inline-flex items-center gap-2 text-sm font-semibold text-cream hover:text-terra transition-colors duration-300">
              {t.home.clinicalLink}
              <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </Reveal>
          <div className="mt-20 grid grid-cols-2 lg:grid-cols-4 gap-10 border-t border-cream/15 pt-12">
            {creds.map(([num, label], i) => (
              <Reveal key={label} delay={i * 0.08}>
                <p className="font-serif text-4xl sm:text-5xl font-medium text-terra">{num}</p>
                <p className="mt-2 text-sm text-cream/60">{label}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 sm:py-36" data-testid="home-cta-section">
        <div className="mx-auto max-w-6xl px-5 sm:px-8 text-center">
          <Reveal>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-ink leading-[1.08] max-w-3xl mx-auto">
              {t.home.ctaTitle}
            </h2>
            <p className="mt-6 max-w-xl mx-auto text-mutedw text-base sm:text-lg">{t.home.ctaSub}</p>
            <Link
              to="/contact"
              data-testid="home-cta-contact-button"
              className="mt-10 inline-flex items-center gap-2 rounded-full bg-terra px-8 py-4 text-sm font-semibold text-cream hover:bg-ink transition-colors duration-300"
            >
              {t.home.ctaButton}
              <ArrowRight size={15} />
            </Link>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
