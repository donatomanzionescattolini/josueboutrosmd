"use client";

import Link from "next/link";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { useRef, useState } from "react";
import { localeHref, type Locale } from "@/lib/i18n";
import { residency } from "@/content/profile";

const copy = {
  en: {
    specialty: "FAMILY MEDICINE",
    location: "MIAMI—HIALEAH, FLORIDA",
    hero: <>A physician trained<br />to treat the household,<br /><em>not just the chart.</em></>,
    intro: "I am a family physician and researcher in training, serving one of the most Spanish-speaking communities in the United States.",
    rhythm: "Continuity. Language. Trust.\nThese are not extras — they are the point.",
    explore: "EXPLORE MY WORK",
    practiceEyebrow: "HOW I PRACTICE",
    practiceTitle: "Medicine as a Relationship",
    practiceBody: "Family medicine is built on continuity. I want to know my patients across years, not visits. I care for the person in front of me and the people behind them.",
    practiceLink: "READ MORE ABOUT MY PHILOSOPHY",
    clinicalEyebrow: "CLINICAL WORK",
    clinicalTitle: "What I Focus On",
    researchEyebrow: "RESEARCH",
    researchTitle: "Questions I’m Pursuing",
    researchBody: "I study the intersection of language, culture, and access in primary care. My goal is to generate evidence that improves care for communities like mine.",
    writingEyebrow: "WRITING",
    writingTitle: "Thoughts in Progress",
    writingBody: "Plain-language writing for patients, families, and anyone who wants to understand medicine better.",
    storyEyebrow: "MY STORY",
    storyTitle: "Why This Path",
    storyBody: "I trained in Camagüey, Cuba. I came to the U.S. with no roadmap, only a commitment to learn, serve, and keep going. There were nights I thought I would fail. I kept studying, kept showing up, kept believing in the work.",
    storyLink: "READ MY STORY",
    drivers: "WHAT DRIVES MY WORK",
    roles: "CURRENT ROLES",
    achievements: "SELECT ACHIEVEMENTS",
    contact: "Looking for a physician who combines deep clinical commitment with curiosity, humility, and the discipline to build something that lasts? Let’s connect.",
    getInTouch: "GET IN TOUCH",
    open: "OPEN",
    close: "CLOSE",
    quote: "Medicine gave me purpose. My patients remind me every day what that purpose is.",
    footer: "This is a personal professional profile. It is not medical advice and does not create a physician–patient relationship.",
    language: "EN / ES",
  },
  es: {
    specialty: "MEDICINA FAMILIAR",
    location: "MIAMI—HIALEAH, FLORIDA",
    hero: <>Un médico formado<br />para tratar a la familia,<br /><em>no solo la historia clínica.</em></>,
    intro: "Soy médico de familia e investigador en formación, al servicio de una de las comunidades hispanohablantes más grandes de Estados Unidos.",
    rhythm: "Continuidad. Lenguaje. Confianza.\nNo son extras — son el punto.",
    explore: "EXPLORA MI TRABAJO",
    practiceEyebrow: "CÓMO PRACTICO",
    practiceTitle: "La medicina como relación",
    practiceBody: "La medicina familiar se construye con continuidad. Quiero conocer a mis pacientes a través de los años, no solo de las consultas.",
    practiceLink: "LEER SOBRE MI FILOSOFÍA",
    clinicalEyebrow: "TRABAJO CLÍNICO",
    clinicalTitle: "En qué me enfoco",
    researchEyebrow: "INVESTIGACIÓN",
    researchTitle: "Preguntas que persigo",
    researchBody: "Estudio la intersección entre lenguaje, cultura y acceso en atención primaria. Mi objetivo es generar evidencia que mejore la atención de comunidades como la mía.",
    writingEyebrow: "ESCRITURA",
    writingTitle: "Pensamientos en proceso",
    writingBody: "Escritura en lenguaje claro para pacientes, familias y cualquiera que quiera entender mejor la medicina.",
    storyEyebrow: "MI HISTORIA",
    storyTitle: "Por qué este camino",
    storyBody: "Estudié medicina en Camagüey, Cuba. Llegué a Estados Unidos sin un mapa, solo con el compromiso de aprender, servir y seguir adelante. Hubo noches en las que pensé que fracasaría. Seguí estudiando, apareciendo y creyendo en el trabajo.",
    storyLink: "LEER MI HISTORIA",
    drivers: "LO QUE GUÍA MI TRABAJO",
    roles: "ROLES ACTUALES",
    achievements: "LOGROS SELECCIONADOS",
    contact: "¿Buscas un médico que combine compromiso clínico, curiosidad, humildad y la disciplina para construir algo que perdure? Conectemos.",
    getInTouch: "CONTACTAR",
    open: "ABRIR",
    close: "CERRAR",
    quote: "La medicina me dio propósito. Mis pacientes me recuerdan cada día cuál es ese propósito.",
    footer: "Este es un perfil profesional personal. No constituye consejo médico ni crea una relación médico–paciente.",
    language: "ES / EN",
  },
} as const;

type Copy = (typeof copy)[keyof typeof copy];

const clinical = [
  ["01", "Chronic Disease", "Diabetes, hypertension, and the long work of making a plan sustainable."],
  ["02", "Preventive Care", "Screening, vaccines, and wellness plans that respect real-world constraints."],
  ["03", "A Language Line", "Care across English and Spanish, with understanding before agreement."],
  ["04", "Whole-Person Care", "Physical health, mental health, social context, and the household."],
];

const research = [
  ["Language Concordance & Diagnostic Accuracy", "How speaking the same language changes what patients tell us — and what we understand."],
  ["Continuity of Care in Immigrant Families", "What long-term relationships change in outcomes, access, and patient trust."],
  ["Barriers to Preventive Care in South Florida", "Why good intentions do not become completed screenings without attention to access."],
];

const writing = [
  ["2026 · ES / EN", "What Your Blood Pressure Numbers Actually Mean", "The two numbers, why the second one matters, and when a single high reading is not a diagnosis."],
  ["2026 · ES / EN", "Diabetes and the Food You Already Eat", "Managing blood sugar without abandoning the way your family has cooked for generations."],
  ["2025 · ES / EN", "When to Go to the ER, and When to Wait", "A short list of symptoms that should not wait, and a longer list of ones that safely can."],
];

const drivers = [
  ["01", "Every patient has a story", "I listen for the whole one."],
  ["02", "Time is a clinical tool", "I spend it where it changes outcomes."],
  ["03", "Evidence meets reality", "Good medicine fits a real life."],
  ["04", "Families, not just individuals", "I treat the household."],
];

const achievements = [
  ["Chief Resident", "2025—2026"],
  ["Medical Board Representative", "2025—2026"],
  ["Published Research Articles", "4"],
  ["Research Presentations", "Regional & National Meetings"],
  ["Recognition for Compassionate Patient Care", "Nominated by Patients & Colleagues"],
];

function Arrow() {
  return <span aria-hidden className="editorial-arrow">→</span>;
}

function BotanicalMark() {
  return (
    <svg aria-hidden viewBox="0 0 140 180" className="editorial-botanical">
      <path d="M72 174C67 128 72 76 96 15" fill="none" stroke="currentColor" strokeWidth="1" />
      <path d="M75 132C48 121 30 104 24 81C48 84 67 96 76 116" fill="none" stroke="currentColor" strokeWidth="1" />
      <path d="M72 111C90 92 109 75 122 52C96 58 78 73 70 94" fill="none" stroke="currentColor" strokeWidth="1" />
      <path d="M70 91C48 78 37 60 36 39C58 47 71 61 72 79" fill="none" stroke="currentColor" strokeWidth="1" />
      <path d="M83 63C91 46 101 35 113 28C111 47 102 59 86 70" fill="none" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

function SignalIcon({ kind }: { kind: "heart" | "clock" | "clipboard" | "family" }) {
  return (
    <span className="signal-icon" aria-hidden>
      {kind === "heart" && "♡"}
      {kind === "clock" && "◷"}
      {kind === "clipboard" && "▤"}
      {kind === "family" && "♧"}
    </span>
  );
}

export function EditorialHome({ locale }: { locale: Locale }) {
  const c: Copy = copy[locale];
  const shell = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: shell });
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 24 });
  const beam = useTransform(progress, [0, 1], ["0%", "100%"]);
  const [openResearch, setOpenResearch] = useState<number | null>(null);

  return (
    <div ref={shell} className="editorial-home">
      <div className="editorial-progress" aria-hidden>
        <motion.span style={{ height: beam }} />
      </div>

      <aside className="editorial-rail">
        <Link href={localeHref(locale, "/")} className="editorial-name">Josue<br />Boutros,<br /><span>MD</span></Link>
        <div className="editorial-rail-meta">{c.specialty}<br />{c.location}</div>
        <nav className="editorial-nav" aria-label="Primary">
          {["Home", "How I Practice", "Clinical Work", "Research", "Writing", "Training", "About Me", "CV & Publications", "Contact"].map((label, i) => (
            <a key={label} href={i === 0 ? "#top" : `#section-${i}`}>{label}</a>
          ))}
        </nav>
        <div className="editorial-lang">{c.language}</div>
        <blockquote>“La medicina familiar<br />no es solo tratar<br />enfermedades.<br />Es acompañar vidas.”<footer>— J.B.</footer></blockquote>
      </aside>

      <main id="top" className="editorial-main">
        <section className="editorial-hero">
          <div className="editorial-hero-copy">
            <div className="editorial-kicker">FAMILY MEDICINE · RESIDENT PHYSICIAN</div>
            <h1>{c.hero}</h1>
            <p className="editorial-intro">{c.intro}</p>
            <p className="editorial-rhythm">{c.rhythm}</p>
            <a href="#section-1" className="editorial-action">{c.explore} <Arrow /></a>
          </div>
          <motion.div className="editorial-hero-art" initial={{ scale: 1.05 }} animate={{ scale: 1 }} transition={{ duration: 1.4, ease: "easeOut" }}>
            <div className="art-sun" />
            <div className="art-shadow" />
            <div className="art-door"><span /></div>
            <div className="art-tree"><i /><i /><i /><i /><i /><i /></div>
            <div className="art-caption">PALMETTO GENERAL<br />HOSPITAL · HIALEAH</div>
          </motion.div>
        </section>

        <section id="section-1" className="editorial-section practice-section">
          <div className="practice-illustration" aria-hidden><div className="chair" /><div className="plant" /></div>
          <div>
            <div className="editorial-kicker">{c.practiceEyebrow}</div>
            <h2>{c.practiceTitle}</h2>
            <p>{c.practiceBody}</p>
            <Link href={localeHref(locale, "/about")} className="editorial-action">{c.practiceLink} <Arrow /></Link>
          </div>
        </section>

        <section id="section-2" className="editorial-section">
          <div className="editorial-kicker">{c.clinicalEyebrow}</div>
          <h2>{c.clinicalTitle}</h2>
          <div className="clinical-grid">
            {clinical.map(([num, title, body]) => (
              <motion.article key={num} whileHover={{ y: -5 }} className="clinical-card">
                <span className="clinical-number">{num}</span><div className="clinical-symbol">{num === "01" ? "♡" : num === "02" ? "♢" : num === "03" ? "◌" : "⌂"}</div>
                <h3>{title}</h3><p>{body}</p>
              </motion.article>
            ))}
          </div>
          <a href="#section-3" className="editorial-action">SEE MY APPROACH TO PATIENT CARE <Arrow /></a>
        </section>

        <section id="section-3" className="editorial-section research-section">
          <BotanicalMark />
          <div className="editorial-kicker">{c.researchEyebrow}</div>
          <h2>{c.researchTitle}</h2>
          <p className="section-lede">{c.researchBody}</p>
          <div className="research-grid">
            {research.map(([title, body], i) => (
              <button key={title} type="button" className={`research-card ${openResearch === i ? "is-open" : ""}`} onClick={() => setOpenResearch(openResearch === i ? null : i)} aria-expanded={openResearch === i}>
                <span>{title}</span><p>{body}</p><small>{openResearch === i ? c.close : c.open} <Arrow /></small>
              </button>
            ))}
          </div>
          <Link href={localeHref(locale, "/cv")} className="editorial-action">VIEW ALL RESEARCH PROJECTS <Arrow /></Link>
        </section>

        <section id="section-4" className="editorial-section writing-section">
          <div className="writing-heading"><div><div className="editorial-kicker">{c.writingEyebrow}</div><h2>{c.writingTitle}</h2><p>{c.writingBody}</p></div><Link href={localeHref(locale, "/practice")} className="editorial-action">VIEW ALL NOTES <Arrow /></Link></div>
          <div className="writing-grid">
            {writing.map(([meta, title, body]) => <article key={title}><small>{meta}</small><h3>{title}</h3><p>{body}</p></article>)}
          </div>
        </section>

        <section id="section-5" className="editorial-section story-section">
          <div><div className="editorial-kicker">{c.storyEyebrow}</div><h2>{c.storyTitle}</h2><p>{c.storyBody}</p><Link href={localeHref(locale, "/about")} className="editorial-action">{c.storyLink} <Arrow /></Link></div>
          <div className="story-art" aria-hidden><div className="story-sky" /><div className="story-building"><b /><i /><i /><i /><i /><i /></div></div>
        </section>

        <section className="editorial-bottom-cta"><p>{c.contact}</p><Link href={localeHref(locale, "/contact")}>{c.getInTouch}</Link></section>
      </main>

      <aside className="editorial-right">
        <section><div className="editorial-side-heading">AT A GLANCE</div><div className="glance-list">
          <div><b>♧</b><span>Family Medicine Resident<small>Chief Resident (2025—2026)<br />{residency.hospital}</small></span></div>
          <div><b>▣</b><span>Medical Board Representative<small>Resident Member<br />{residency.hospital}</small></span></div>
          <div><b>▤</b><span>4 Published Research Articles<small>in Peer-Reviewed Journals</small></span></div>
          <div><b>◫</b><span>Bilingual Care<small>Español e Inglés</small></span></div>
        </div></section>

        <section><div className="editorial-side-heading">{c.drivers}</div><div className="driver-list">
          {drivers.map(([num, title, body], i) => <motion.div key={num} whileHover={{ x: 5 }}><SignalIcon kind={["heart", "clock", "clipboard", "family"][i] as "heart" | "clock" | "clipboard" | "family"} /><span><b>{title}</b><small>{body}</small></span></motion.div>)}
        </div></section>

        <blockquote className="editorial-side-quote">“{c.quote}”<footer>— J.B.</footer></blockquote>

        <section><div className="editorial-side-heading">{c.roles}</div><div className="side-plain">Chief Resident<small>Family Medicine Residency Program</small><br />Medical Board Representative<small>Resident Member</small><br />Resident Researcher<small>Primary Care & Health Equity</small></div></section>

        <section><div className="editorial-side-heading">{c.achievements}</div><ol className="achievement-list">{achievements.map(([title, detail]) => <li key={title}><span>✓</span><div>{title}<small>{detail}</small></div></li>)}</ol></section>

        <div className="right-contact"><p>{c.contact}</p><Link href={localeHref(locale, "/contact")}>{c.getInTouch}</Link></div>
      </aside>

      <footer className="editorial-footer"><div><strong>Josue Boutros, MD</strong><small>Family Medicine Physician<br />Researcher · Teacher · Advocate</small></div><div>For professional inquiries<br /><b>hello@josueboutros.md</b><br />Miami, Florida</div><div>Consultations in<br />Spanish & English<br />in · Research</div><div>{c.footer}<br />© 2026 Josue Boutros, MD</div></footer>
    </div>
  );
}
