import { Reveal } from "./reveal";

export function PageHeader({
  eyebrow,
  title,
  lede,
  children,
}: {
  eyebrow?: string;
  title: string;
  lede?: string;
  children?: React.ReactNode;
}) {
  return (
    <header className="relative overflow-hidden border-b border-line">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 left-1/4 h-[26rem] w-[46rem] rounded-full opacity-50 blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, var(--accent-soft), transparent)",
        }}
      />
      <div className="container-page relative py-16 sm:py-24">
        <Reveal y={12}>
          {eyebrow && <p className="eyebrow mb-4">{eyebrow}</p>}
          <h1 className="type-heading max-w-3xl text-ink">{title}</h1>
          {lede && <p className="type-lede mt-6 max-w-2xl">{lede}</p>}
          {children && <div className="mt-8">{children}</div>}
        </Reveal>
      </div>
    </header>
  );
}
