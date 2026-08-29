import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useLang } from "../context/LangContext";
import { Reveal, Eyebrow } from "../components/Reveal";

export function Manifesto() {
  const { t } = useLang();
  const [open, setOpen] = useState(0);

  return (
    <section className="py-24 sm:py-32" data-testid="manifesto-section">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <Eyebrow>{t.manifesto.eyebrow}</Eyebrow>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-ink max-w-2xl leading-tight">
            {t.manifesto.title}
          </h2>
          <p className="mt-4 text-mutedw max-w-xl">{t.manifesto.sub}</p>
        </Reveal>
        <div className="mt-14 border-t border-linew">
          {t.manifesto.chapters.map((ch, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={ch.num} delay={i * 0.08}>
                <div className="border-b border-linew">
                  <button
                    data-testid={`manifesto-chapter-${i + 1}-button`}
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    className="w-full flex items-baseline gap-5 sm:gap-8 py-7 sm:py-9 text-left group"
                  >
                    <span className="font-serif italic text-2xl sm:text-3xl text-terra/80 w-12 shrink-0">
                      {ch.num}.
                    </span>
                    <span className={`flex-1 font-serif text-2xl sm:text-3xl lg:text-4xl font-medium tracking-tight transition-colors duration-300 ${isOpen ? "text-terra" : "text-ink group-hover:text-terra"}`}>
                      {ch.title}
                    </span>
                    <motion.span
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.35 }}
                      className="shrink-0 rounded-full border border-linew p-2 text-mutedw group-hover:border-terra/50 group-hover:text-terra transition-colors duration-300"
                    >
                      <Plus size={15} />
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="pb-9 pl-[4.25rem] sm:pl-20 pr-4 max-w-3xl text-base sm:text-lg leading-relaxed text-mutedw">
                          {ch.body}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
