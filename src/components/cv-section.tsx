import type { ReactNode } from "react";
import { Reveal } from "./reveal";

/**
 * A CV block. Renders nothing when it has no content, which is what keeps the
 * page looking finished while sections are still being filled in.
 */
export function CvSection({
  title,
  isEmpty = false,
  children,
}: {
  title: string;
  isEmpty?: boolean;
  children: ReactNode;
}) {
  if (isEmpty) return null;

  return (
    <section className="border-t border-line py-12 first:border-t-0 first:pt-0">
      <Reveal>
        <div className="grid gap-8 lg:grid-cols-[14rem_1fr] lg:gap-12">
          <h2 className="font-display text-lg leading-snug text-accent lg:pt-1">
            {title}
          </h2>
          <div>{children}</div>
        </div>
      </Reveal>
    </section>
  );
}
