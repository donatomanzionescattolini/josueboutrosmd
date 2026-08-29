import { Link } from "react-router-dom";
import { ArrowRight, Info } from "lucide-react";
import { useLang } from "../context/LangContext";
import { Reveal, Eyebrow } from "../components/Reveal";
import { useSEO } from "../hooks/useSEO";
import { IMAGES } from "../data/content";

export default function Clinical() {
  const { t } = useLang();
  useSEO(t.seo.clinical.title, t.seo.clinical.desc);

  return (
    <div className="pt-36 sm:pt-44" data-testid="clinical-page">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <Eyebrow>{t.clinical.eyebrow}</Eyebrow>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-ink leading-[1.08] max-w-3xl">
            {t.clinical.title}
          </h1>
          <p className="mt-6 max-w-2xl text-base sm:text-lg text-mutedw">{t.clinical.sub}</p>
        </Reveal>

        <div className="mt-16 grid md:grid-cols-2 gap-6">
          {t.clinical.pillars.map((p, i) => (
            <Reveal key={p.num} delay={i * 0.08}>
              <div
                data-testid={`clinical-pillar-${i + 1}`}
                className="group h-full rounded-3xl border border-linew bg-surface p-8 sm:p-10 transition-all duration-500 hover:border-terra/40 hover:shadow-[0_20px_50px_rgb(0,0,0,0.07)]"
              >
                <span className="font-serif italic text-3xl text-terra/80">{p.num}</span>
                <h2 className="mt-5 font-serif text-2xl sm:text-3xl font-medium tracking-tight text-ink group-hover:text-terra transition-colors duration-300">
                  {p.title}
                </h2>
                <p className="mt-4 text-sm sm:text-base leading-relaxed text-mutedw">{p.body}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-16 grid md:grid-cols-2 gap-6">
          {[IMAGES.consult1, IMAGES.consult2].map((src, i) => (
            <Reveal key={src} delay={i * 0.1}>
              <div className="overflow-hidden rounded-3xl aspect-[16/10]">
                <img
                  src={src}
                  alt="Clinical consultation"
                  data-testid={`clinical-image-${i + 1}`}
                  className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-16">
          <div className="rounded-3xl border border-sage/30 bg-sage/10 p-8 sm:p-10 flex flex-col sm:flex-row gap-6" data-testid="clinical-patient-note">
            <Info size={22} className="text-sage shrink-0 mt-1" />
            <div>
              <h3 className="font-serif text-xl sm:text-2xl font-medium text-ink">{t.clinical.noteTitle}</h3>
              <p className="mt-3 text-sm sm:text-base leading-relaxed text-mutedw">{t.clinical.note}</p>
              <Link to="/contact" data-testid="clinical-contact-link" className="group mt-5 inline-flex items-center gap-2 text-sm font-semibold text-sage hover:text-terra transition-colors duration-300">
                {t.nav.contact}
                <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
