import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "./reveal";

type SectionProps = {
  id?: string;
  eyebrow?: string;
  heading?: string;
  lede?: string;
  children: ReactNode;
  className?: string;
  /** Adds a hairline rule above the section. */
  divider?: boolean;
};

export function Section({
  id,
  eyebrow,
  heading,
  lede,
  children,
  className,
  divider = false,
}: SectionProps) {
  return (
    <section id={id} className={cn("relative py-20 sm:py-28", className)}>
      <div className="container-page">
        {divider && <div className="rule mb-16" />}
        {(eyebrow || heading || lede) && (
          <Reveal className="mb-12 max-w-2xl sm:mb-16">
            {eyebrow && <p className="eyebrow mb-4">{eyebrow}</p>}
            {heading && <h2 className="type-heading text-ink">{heading}</h2>}
            {lede && <p className="type-lede mt-5">{lede}</p>}
          </Reveal>
        )}
        {children}
      </div>
    </section>
  );
}
