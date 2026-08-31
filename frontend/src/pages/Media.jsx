import { Link } from "react-router-dom";
import { ArrowRight, GraduationCap, Users, Presentation, Mic } from "lucide-react";
import { useLang } from "../context/LangContext";
import { Reveal, Eyebrow } from "../components/Reveal";
import { useSEO } from "../hooks/useSEO";

const icons = [GraduationCap, Users, Presentation, Mic];

export default function Media() {
  const { t } = useLang();
  useSEO(t.seo.media.title, t.seo.media.desc);

  return (
    <div className="pt-36 sm:pt-44" data-testid="media-page">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <Eyebrow>{t.media.eyebrow}</Eyebrow>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-ink leading-[1.08] max-w-3xl">
            {t.media.title}
          </h1>
          <p className="mt-6 max-w-2xl text-base sm:text-lg text-mutedw">{t.media.sub}</p>
        </Reveal>

        <div className="mt-16 grid md:grid-cols-2 gap-6">
          {t.media.items.map((m, i) => {
            const Icon = icons[i % icons.length];
            return (
              <Reveal key={m.title} delay={i * 0.08}>
                <div
                  data-testid={`media-item-${i}`}
                  className="group h-full rounded-3xl border border-linew bg-surface p-8 sm:p-10 transition-all duration-500 hover:border-terra/40 hover:shadow-[0_20px_50px_rgb(0,0,0,0.07)]"
                >
                  <div className="flex items-center gap-3 mb-5">
                    <span className="rounded-full border border-linew bg-cardw p-2.5 text-terra">
                      <Icon size={16} />
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-subtlew">{m.kind}</span>
                  </div>
                  <h2 className="font-serif text-xl sm:text-2xl font-medium tracking-tight text-ink leading-snug group-hover:text-terra transition-colors duration-300">
                    {m.title}
                  </h2>
                  <p className="mt-4 text-sm sm:text-base leading-relaxed text-mutedw">{m.body}</p>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal className="mt-16 text-center">
          <Link
            to="/contact"
            data-testid="media-booking-cta"
            className="group inline-flex items-center gap-2 rounded-full bg-terra px-8 py-4 text-sm font-semibold text-cream hover:bg-ink transition-colors duration-300"
          >
            {t.media.cta}
            <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </Reveal>
      </div>
    </div>
  );
}
