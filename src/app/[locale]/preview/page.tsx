import type { CSSProperties } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/page-header";
import { isLocale, type Locale } from "@/lib/i18n";

type Copy = { en: string; es: string };

function t(copy: Copy, locale: Locale) {
  return copy[locale];
}

type Variant = {
  id: string;
  name: Copy;
  palette: Copy;
  rationale: Copy;
  hero: Copy;
  subtitle: Copy;
  highlights: Copy[];
  style: CSSProperties & Record<`--${string}`, string>;
};

const variants: Variant[] = [
  {
    id: "trust",
    name: { en: "Trust & Clinical Clarity", es: "Confianza y Claridad Clínica" },
    palette: {
      en: "Deep navy + calm cyan + soft slate",
      es: "Azul marino profundo + cian sereno + gris suave",
    },
    rationale: {
      en: "A high-trust academic profile direction inspired by physician pages from large medical systems and residency programs.",
      es: "Una dirección de perfil académico de alta confianza inspirada en páginas de médicos de grandes sistemas de salud y programas de residencia.",
    },
    hero: {
      en: "A physician who pairs rigor with uncommon human warmth.",
      es: "Un médico que une rigor con una calidez humana poco común.",
    },
    subtitle: {
      en: "Built for colleagues and institutions looking for a dependable clinician-scholar in growth.",
      es: "Diseñado para colegas e instituciones que buscan un clínico-investigador confiable y en crecimiento.",
    },
    highlights: [
      {
        en: "Frames Dr. Boutros as methodical, evidence-oriented, and collaborative.",
        es: "Presenta al Dr. Boutros como metódico, orientado a la evidencia y colaborativo.",
      },
      {
        en: "Leans into clean hierarchy and credibility markers (training, outcomes, languages).",
        es: "Refuerza jerarquía visual limpia y marcadores de credibilidad (formación, resultados, idiomas).",
      },
      {
        en: "Best fit for hospital recruiters, mentors, and research teams.",
        es: "Mejor ajuste para reclutadores hospitalarios, mentores y equipos de investigación.",
      },
    ],
    style: {
      "--preview-bg": "#f5f9fc",
      "--preview-card": "#ffffff",
      "--preview-ink": "#102333",
      "--preview-muted": "#4d6576",
      "--preview-accent": "#0f6e8d",
      "--preview-line": "#d8e3eb",
    },
  },
  {
    id: "editorial",
    name: { en: "Human Story Editorial", es: "Narrativa Humana Editorial" },
    palette: {
      en: "Ivory + warm graphite + terracotta",
      es: "Marfil + grafito cálido + terracota",
    },
    rationale: {
      en: "An editorial portfolio direction inspired by respected clinician-authors and thought leaders with long-form storytelling.",
      es: "Una dirección editorial de portafolio inspirada en clínicos-autores y referentes con narrativa extensa.",
    },
    hero: {
      en: "From immigrant uncertainty to trusted continuity physician.",
      es: "De la incertidumbre del inmigrante al médico de continuidad en quien se confía.",
    },
    subtitle: {
      en: "Centers his trajectory with humility: language barriers, adaptation, discipline, and service.",
      es: "Centra su trayectoria con humildad: barreras de idioma, adaptación, disciplina y servicio.",
    },
    highlights: [
      {
        en: "Brings emotional resonance while preserving professional seriousness.",
        es: "Aporta resonancia emocional manteniendo seriedad profesional.",
      },
      {
        en: "Highlights kindness and persistence as clinical strengths, not marketing slogans.",
        es: "Destaca la bondad y la perseverancia como fortalezas clínicas, no como eslóganes.",
      },
      {
        en: "Best fit for patient trust and community-facing reputation.",
        es: "Mejor ajuste para confianza del paciente y reputación comunitaria.",
      },
    ],
    style: {
      "--preview-bg": "#fbf6ef",
      "--preview-card": "#fffdf9",
      "--preview-ink": "#2a211b",
      "--preview-muted": "#6c584d",
      "--preview-accent": "#9d4e30",
      "--preview-line": "#e8d8c8",
    },
  },
  {
    id: "research",
    name: { en: "Research Forward", es: "Orientado a Investigación" },
    palette: {
      en: "Forest + emerald + neutral stone",
      es: "Verde bosque + esmeralda + piedra neutra",
    },
    rationale: {
      en: "A research-network direction inspired by faculty profile pages that balance publications, projects, and clinical identity.",
      es: "Una dirección para redes de investigación inspirada en páginas docentes que equilibran publicaciones, proyectos e identidad clínica.",
    },
    hero: {
      en: "Clinical depth today, academic impact tomorrow.",
      es: "Profundidad clínica hoy, impacto académico mañana.",
    },
    subtitle: {
      en: "Shows trajectory toward multidisciplinary research collaboration without overclaiming seniority.",
      es: "Muestra trayectoria hacia colaboración de investigación multidisciplinaria sin sobredimensionar su senioridad.",
    },
    highlights: [
      {
        en: "Prioritizes future-ready sections: research interests, methods, and collaborations.",
        es: "Prioriza secciones orientadas al futuro: intereses de investigación, métodos y colaboraciones.",
      },
      {
        en: "Communicates erudition through structure, not self-promotion.",
        es: "Comunica erudición mediante estructura, no autopromoción.",
      },
      {
        en: "Best fit for fellowship pathways and investigator networks.",
        es: "Mejor ajuste para vías de fellowship y redes de investigadores.",
      },
    ],
    style: {
      "--preview-bg": "#f4faf7",
      "--preview-card": "#ffffff",
      "--preview-ink": "#14241d",
      "--preview-muted": "#4f675a",
      "--preview-accent": "#1f7d57",
      "--preview-line": "#d5e5dc",
    },
  },
];

const copy = {
  title: {
    en: "Stylistic preview lab",
    es: "Laboratorio de estilos",
  },
  lede: {
    en: "Three visual directions to position Dr. Josue Boutros as a kind, thorough, and intellectually serious physician — while honoring his immigrant journey without turning it into spectacle.",
    es: "Tres direcciones visuales para presentar al Dr. Josue Boutros como un médico amable, minucioso e intelectualmente sólido, honrando su trayectoria migrante sin convertirla en espectáculo.",
  },
  label: { en: "Palette", es: "Paleta" },
  objectiveTitle: { en: "Shared objective", es: "Objetivo compartido" },
  objectiveBody: {
    en: "Position him for strong opportunities in patient care, academic medicine, and research communities by making his values and trajectory immediately legible.",
    es: "Posicionarlo para grandes oportunidades en atención clínica, medicina académica y comunidades de investigación, haciendo sus valores y su trayectoria legibles de inmediato.",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";

  return {
    title: locale === "en" ? "Style Preview" : "Vista Previa de Estilos",
    description: t(copy.lede, locale),
    alternates: { canonical: `/${locale}/preview` },
    robots: { index: false, follow: true },
  };
}

export default async function PreviewPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;

  return (
    <>
      <PageHeader title={t(copy.title, locale)} lede={t(copy.lede, locale)} />

      <section className="py-14 sm:py-20">
        <div className="container-page">
          <div className="rounded-card border border-line bg-surface px-6 py-8 sm:px-9">
            <h2 className="font-display text-2xl text-ink">{t(copy.objectiveTitle, locale)}</h2>
            <p className="mt-3 type-body max-w-3xl">{t(copy.objectiveBody, locale)}</p>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {variants.map((variant) => (
              <article
                key={variant.id}
                className="rounded-card border p-6 shadow-soft"
                style={{
                  ...variant.style,
                  background: "var(--preview-bg)",
                  borderColor: "var(--preview-line)",
                  color: "var(--preview-ink)",
                }}
              >
                <p
                  className="text-xs uppercase tracking-[0.14em]"
                  style={{ color: "var(--preview-accent)" }}
                >
                  {t(copy.label, locale)}
                </p>
                <p className="mt-2 text-sm" style={{ color: "var(--preview-muted)" }}>
                  {t(variant.palette, locale)}
                </p>
                <h3 className="mt-5 font-display text-2xl leading-tight">
                  {t(variant.name, locale)}
                </h3>
                <p className="mt-3 text-sm leading-relaxed" style={{ color: "var(--preview-muted)" }}>
                  {t(variant.rationale, locale)}
                </p>
                <p className="mt-6 text-lg leading-snug">{t(variant.hero, locale)}</p>
                <p className="mt-3 text-sm leading-relaxed" style={{ color: "var(--preview-muted)" }}>
                  {t(variant.subtitle, locale)}
                </p>
                <ul
                  className="mt-6 list-disc space-y-3 border-t pl-5 pt-5"
                  style={{ borderColor: "var(--preview-line)" }}
                >
                  {variant.highlights.map((highlight) => (
                    <li
                      key={highlight.en}
                      className="text-sm leading-relaxed"
                      style={{ color: "var(--preview-muted)" }}
                    >
                      {t(highlight, locale)}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
