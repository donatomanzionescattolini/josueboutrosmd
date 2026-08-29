import { Link } from "react-router-dom";
import { ArrowRight, FileText } from "lucide-react";
import { useLang } from "../context/LangContext";
import { Reveal, Eyebrow } from "../components/Reveal";
import { useSEO } from "../hooks/useSEO";
import { IMAGES } from "../data/content";

export default function Research() {
  const { t } = useLang();
  useSEO(t.seo.research.title, t.seo.research.desc);

  return (
    <div className="pt-36 sm:pt-44" data-testid="research-page">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid lg:grid-cols-12 gap-12 items-end">
          <Reveal className="lg:col-span-7">
            <Eyebrow>{t.research.eyebrow}</Eyebrow>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-ink leading-[1.08]">
              {t.research.title}
            </h1>
            <p className="mt-6 max-w-2xl text-base sm:text-lg text-mutedw">{t.research.sub}</p>
          </Reveal>
          <Reveal className="lg:col-span-5" delay={0.12}>
            <div className="overflow-hidden rounded-3xl aspect-[16/10]">
              <img src={IMAGES.research} alt="Research notes and stethoscope" data-testid="research-hero-image" className="h-full w-full object-cover transition-transform duration-700 hover:scale-105" />
            </div>
          </Reveal>
        </div>

        <div className="mt-16 space-y-6">
          {t.research.items.map((r, i) => (
            <Reveal key={r.title} delay={i * 0.08}>
              <div
                data-testid={`research-item-${i}`}
                className="group rounded-3xl border border-linew bg-surface p-8 sm:p-10 transition-all duration-500 hover:border-sage/50 hover:shadow-[0_20px_50px_rgb(0,0,0,0.07)]"
              >
                <div className="flex flex-wrap items-center gap-4 mb-4">
                  <span className="rounded-full border border-sage/40 bg-sage/10 px-3.5 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-sage">
                    {t.research.status[r.status]}
                  </span>
                  <FileText size={15} className="text-subtlew" />
                </div>
                <h2 className="font-serif text-2xl sm:text-3xl font-medium tracking-tight text-ink leading-snug group-hover:text-sage transition-colors duration-300">
                  {r.title}
                </h2>
                <p className="mt-4 max-w-3xl text-sm sm:text-base leading-relaxed text-mutedw">{r.body}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-12">
          <div className="rounded-3xl border border-linew bg-cardw p-8 sm:p-10 flex flex-col sm:flex-row items-start sm:items-center gap-6" data-testid="research-collab-note">
            <p className="flex-1 text-sm sm:text-base leading-relaxed text-mutedw">{t.research.collab}</p>
            <Link to="/contact" data-testid="research-contact-link" className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-cream hover:bg-terra transition-colors duration-300">
              {t.nav.contact}
              <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
