/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  SINGLE SOURCE OF TRUTH FOR EVERY FACT ON THIS SITE.
 *  Edit this file to update the website. No copy lives in the components.
 * ─────────────────────────────────────────────────────────────────────────────
 *
 *  ⚠️  PLEASE VERIFY BEFORE LAUNCH
 *  The biographical details below were seeded from public professional
 *  directories (LinkedIn, Doximity, Healthgrades). They are a starting point,
 *  not a verified record. Confirm every item marked `verify:` with Dr. Boutros
 *  and correct anything that is wrong or out of date.
 *
 *  Nothing here is invented: sections that have no confirmed content yet are
 *  empty arrays. Empty sections simply do not render, so the site always looks
 *  complete. Add publications, awards, presentations and memberships as they
 *  are confirmed and they will appear automatically.
 */

export const LOCALES = ["en", "es"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "en";

/** A string that exists in both site languages. */
export type Localized = { en: string; es: string };

export type FocusArea = {
  id: string;
  title: Localized;
  body: Localized;
};

export type Principle = {
  id: string;
  title: Localized;
  body: Localized;
};

export type TimelineEntry = {
  id: string;
  /** e.g. "2024 — 2027" or "2016". Rendered verbatim. */
  period: string;
  title: Localized;
  organization: string;
  location?: string;
  detail?: Localized;
};

export type CredentialEntry = {
  id: string;
  label: Localized;
  issuer?: string;
  /** Year or "In progress" style note. */
  note?: Localized;
};

export type PublicationEntry = {
  id: string;
  /** Full citation, rendered as-is. Citations are not translated. */
  citation: string;
  href?: string;
};

/* ═══════════════════════════════════════════════════════════════════════════
   IDENTITY
   ═══════════════════════════════════════════════════════════════════════════ */

export const person = {
  /** verify: legal / professional name and preferred display form */
  firstName: "Josue",
  lastName: "Boutros",
  credential: "MD",
  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  },
  get displayName() {
    return `${this.firstName} ${this.lastName}, ${this.credential}`;
  },
  specialty: {
    en: "Family Medicine",
    es: "Medicina Familiar",
  } satisfies Localized,
  /** Shown under the name in the hero. */
  role: {
    en: "Family Medicine Resident Physician",
    es: "Médico Residente de Medicina Familiar",
  } satisfies Localized,
  location: {
    en: "Hialeah, Florida",
    es: "Hialeah, Florida",
  } satisfies Localized,
  /** verify: pronouns — remove this field entirely if it should not be shown. */
  languages: [
    { en: "English", es: "Inglés" },
    { en: "Spanish", es: "Español" },
  ] satisfies Localized[],
} as const;

/* ═══════════════════════════════════════════════════════════════════════════
   RESIDENCY — drives the automatically calculated PGY level
   ═══════════════════════════════════════════════════════════════════════════ */

export const residency = {
  /** verify: program name, sponsor and dates */
  program: {
    en: "Family Medicine Residency",
    es: "Residencia de Medicina Familiar",
  } satisfies Localized,
  hospital: "Palmetto General Hospital",
  affiliation: "Nova Southeastern University",
  location: "Hialeah, Florida",
  /** Residency academic years begin July 1. Used to compute the current PGY. */
  startYear: 2024,
  endYear: 2027,
} as const;

/* ═══════════════════════════════════════════════════════════════════════════
   NARRATIVE
   ═══════════════════════════════════════════════════════════════════════════ */

/** One line. Sits directly under the name. Should read like a person, not a CV. */
export const tagline: Localized = {
  en: "A physician forged by resilience, practicing primary care with exceptional rigor, plain language, and the patience to listen twice.",
  es: "Un médico forjado por la resiliencia, ejerciendo la atención primaria con excepcional rigor, lenguaje claro y la paciencia de escuchar dos veces.",
};

/** Two or three paragraphs. The home page shows the first; /about shows all. */
export const bio: Localized[] = [
  {
    en: "I am a family medicine resident physician in Hialeah, Florida, training at Palmetto General Hospital. My path to medicine here was not traditional. I arrived as an immigrant without knowing the language, facing the immense challenge of rebuilding my life and career from the ground up. Through relentless dedication and an unyielding work ethic, I overcame those barriers, and today I bring that same resilience and erudition to the care of my patients.",
    es: "Soy médico residente de medicina familiar en Hialeah, Florida, formándome en Palmetto General Hospital. Mi camino hacia la medicina aquí no fue tradicional. Llegué como inmigrante sin conocer el idioma, enfrentando el inmenso reto de reconstruir mi vida y carrera desde cero. Con dedicación incansable y una ética de trabajo inquebrantable, superé esas barreras, y hoy aporto esa misma resiliencia y erudición al cuidado de mis pacientes.",
  },
  {
    en: "Having trained at the Universidad de Ciencias Médicas de Camagüey in Cuba, I learned early on that medicine must be taught and practiced from the neighborhood inward. We learn the household before we learn the hospital. That grounding, combined with my own journey, profoundly shapes how I practice now in South Florida. I strive to be a kind-hearted, thorough, and brilliant advocate for my community—ensuring that every plan is explained with empathy, precision, and a deep understanding of the life the patient actually lives.",
    es: "Habiéndome formado en la Universidad de Ciencias Médicas de Camagüey en Cuba, aprendí pronto que la medicina debe enseñarse y practicarse desde el barrio hacia adentro. Conocemos el hogar antes que el hospital. Esa base, combinada con mi propia trayectoria, define profundamente cómo ejerzo hoy en el sur de la Florida. Me esfuerzo por ser un médico amable, minucioso y brillante para mi comunidad, asegurando que cada plan se explique con empatía, precisión y un conocimiento profundo de la realidad del paciente.",
  },
  {
    en: "My clinical focus addresses the realities of my community: diabetes, hypertension, obesity, and the essential, continuous work of prevention. I am committed to the meticulous details that many treat as administrative—the follow-up call, reconciling a medication list, or closing a referral—because these are the moments where true continuity and trust are forged. My ultimate goal is to contribute to medical research and the broader physician community, extending the reach of compassionate and exceptionally rigorous care.",
    es: "Mi enfoque clínico atiende las realidades de mi comunidad: diabetes, hipertensión, obesidad y el trabajo esencial y continuo de la prevención. Estoy comprometido con los detalles meticulosos que muchos consideran administrativos —la llamada de seguimiento, conciliar una lista de medicamentos o cerrar una referencia— porque en esos momentos se forja la verdadera continuidad y confianza. Mi meta final es aportar a la investigación médica y a la comunidad médica en general, expandiendo el alcance de una atención compasiva y excepcionalmente rigurosa.",
  },
];

/** Short version used for meta descriptions and social cards. */
export const shortBio: Localized = {
  en: "Family medicine resident physician in Hialeah, Florida, training at Palmetto General Hospital. Bilingual primary care focused on prevention, chronic disease, and continuity.",
  es: "Médico residente de medicina familiar en Hialeah, Florida, en formación en Palmetto General Hospital. Atención primaria bilingüe centrada en la prevención, las enfermedades crónicas y la continuidad.",
};

/* ═══════════════════════════════════════════════════════════════════════════
   CLINICAL FOCUS
   ═══════════════════════════════════════════════════════════════════════════ */

export const focusAreas: FocusArea[] = [
  {
    id: "chronic",
    title: {
      en: "Chronic disease management",
      es: "Manejo de enfermedades crónicas",
    },
    body: {
      en: "Diabetes, hypertension, and lipid management carried over years rather than visits — titrating deliberately, revisiting what the patient can actually sustain, and treating a stalled A1c as a question about someone's life rather than a failure of will.",
      es: "Diabetes, hipertensión y manejo de lípidos sostenidos a lo largo de años, no de consultas: ajustar con criterio, revisar lo que el paciente realmente puede sostener y entender una hemoglobina glicosilada estancada como una pregunta sobre la vida de alguien, no como una falta de voluntad.",
    },
  },
  {
    id: "prevention",
    title: {
      en: "Prevention and screening",
      es: "Prevención y tamizaje",
    },
    body: {
      en: "Age-appropriate screening, immunization, and cardiovascular risk reduction, with attention to the step that is most often skipped: making sure the result comes back, gets explained, and turns into a decision.",
      es: "Tamizaje según la edad, inmunización y reducción del riesgo cardiovascular, con atención al paso que más se omite: asegurar que el resultado regrese, se explique y se convierta en una decisión.",
    },
  },
  {
    id: "bilingual",
    title: {
      en: "Bilingual and culturally grounded care",
      es: "Atención bilingüe y culturalmente cercana",
    },
    body: {
      en: "Full clinical fluency in Spanish and English. Consent, counseling, and bad news are delivered in the patient's own language — not through a relative, and not in a register that leaves them nodding at something they did not follow.",
      es: "Fluidez clínica completa en español e inglés. El consentimiento, la orientación y las malas noticias se dan en el idioma del paciente, no a través de un familiar ni en un registro que lo deje asintiendo a algo que no entendió.",
    },
  },
  {
    id: "lifespan",
    title: {
      en: "Care across the lifespan",
      es: "Atención a lo largo de la vida",
    },
    body: {
      en: "Well-child checks, adolescent and adult primary care, women's health, and geriatrics within one continuous relationship — the particular advantage of family medicine is that these are not separate patients.",
      es: "Control del niño sano, atención primaria de adolescentes y adultos, salud de la mujer y geriatría dentro de una misma relación continua: la ventaja particular de la medicina familiar es que estos no son pacientes distintos.",
    },
  },
  {
    id: "community",
    title: {
      en: "Community and access",
      es: "Comunidad y acceso",
    },
    body: {
      en: "Practicing in a community where cost, immigration status, work schedules, and coverage gaps shape outcomes as much as physiology does, and building plans that survive contact with those realities.",
      es: "Ejercer en una comunidad donde el costo, el estatus migratorio, los horarios de trabajo y los vacíos de cobertura influyen en los resultados tanto como la fisiología, y construir planes que sobrevivan al contacto con esa realidad.",
    },
  },
  {
    id: "procedures",
    title: {
      en: "Office-based procedures",
      es: "Procedimientos en consultorio",
    },
    body: {
      en: "The procedural range that keeps care in the primary care office instead of sending it elsewhere — skin and soft tissue, joint injection, and point-of-care evaluation.",
      es: "El rango de procedimientos que mantiene la atención en el consultorio de atención primaria en lugar de derivarla: piel y tejidos blandos, infiltración articular y evaluación en el punto de atención.",
    },
  },
];

/* ═══════════════════════════════════════════════════════════════════════════
   PRACTICE PRINCIPLES
   ═══════════════════════════════════════════════════════════════════════════ */

export const principles: Principle[] = [
  {
    id: "listen",
    title: { en: "Listen twice", es: "Escuchar dos veces" },
    body: {
      en: "The second telling of a history is usually the true one. Most of what changes a diagnosis arrives after the patient has decided the room is safe.",
      es: "La segunda vez que se cuenta una historia suele ser la verdadera. Casi todo lo que cambia un diagnóstico aparece después de que el paciente decide que la consulta es un lugar seguro.",
    },
  },
  {
    id: "plain",
    title: { en: "Plain language, always", es: "Lenguaje claro, siempre" },
    body: {
      en: "A plan the patient cannot repeat back is not a plan. Precision and clarity are the same skill, and neither requires the patient to learn my vocabulary.",
      es: "Un plan que el paciente no puede repetir no es un plan. La precisión y la claridad son la misma destreza, y ninguna exige que el paciente aprenda mi vocabulario.",
    },
  },
  {
    id: "continuity",
    title: { en: "Continuity is the treatment", es: "La continuidad es el tratamiento" },
    body: {
      en: "In primary care the intervention with the strongest evidence behind it is often simply being the same physician next time, holding the whole thread.",
      es: "En atención primaria, la intervención con mejor evidencia suele ser sencillamente ser el mismo médico la próxima vez, sosteniendo el hilo completo.",
    },
  },
  {
    id: "dignity",
    title: { en: "Dignity is not optional", es: "La dignidad no es opcional" },
    body: {
      en: "Every patient arrives having been dismissed somewhere before. How someone is treated on a bad day is the part of medicine they remember longest.",
      es: "Todo paciente llega habiendo sido ignorado en algún lugar antes. Cómo se trata a alguien en un mal día es la parte de la medicina que más tiempo recuerda.",
    },
  },
];

/* ═══════════════════════════════════════════════════════════════════════════
   CURRICULUM VITAE
   ═══════════════════════════════════════════════════════════════════════════ */

/** verify: dates, titles and institutions */
export const training: TimelineEntry[] = [
  {
    id: "residency",
    period: "2024 — 2027",
    title: {
      en: "Resident Physician, Family Medicine",
      es: "Médico Residente, Medicina Familiar",
    },
    organization: "Palmetto General Hospital",
    location: "Hialeah, Florida",
    detail: {
      en: "Accredited family medicine residency in affiliation with Nova Southeastern University. Full-spectrum training across inpatient medicine, continuity clinic, pediatrics, obstetrics, geriatrics, behavioral health, and emergency medicine.",
      es: "Residencia acreditada de medicina familiar en afiliación con Nova Southeastern University. Formación de espectro completo en medicina hospitalaria, clínica de continuidad, pediatría, obstetricia, geriatría, salud conductual y medicina de emergencia.",
    },
  },
];

/** verify: degree title, institution name and year of graduation */
export const education: TimelineEntry[] = [
  {
    id: "md",
    period: "2016",
    title: {
      en: "Doctor of Medicine (MD)",
      es: "Doctor en Medicina (MD)",
    },
    organization: "Universidad de Ciencias Médicas de Camagüey",
    location: "Camagüey, Cuba",
  },
];

/**
 * verify: which of these are actually held, and add certificate numbers/dates.
 * Delete any that do not apply — nothing here should be aspirational.
 */
export const credentials: CredentialEntry[] = [
  {
    id: "ecfmg",
    label: {
      en: "ECFMG Certification",
      es: "Certificación ECFMG",
    },
    issuer: "Educational Commission for Foreign Medical Graduates",
  },
  {
    id: "bls",
    label: { en: "Basic Life Support (BLS)", es: "Soporte Vital Básico (BLS)" },
    issuer: "American Heart Association",
  },
  {
    id: "acls",
    label: { en: "Advanced Cardiovascular Life Support (ACLS)", es: "Soporte Vital Cardiovascular Avanzado (ACLS)" },
    issuer: "American Heart Association",
  },
];

/**
 * Add entries as they are confirmed — the CV page renders each of these
 * sections only when it is non-empty, so an empty list costs nothing.
 */
export const publications: PublicationEntry[] = [];
export const presentations: PublicationEntry[] = [];
export const awards: CredentialEntry[] = [];
export const memberships: CredentialEntry[] = [];
export const experience: TimelineEntry[] = [];

/* ═══════════════════════════════════════════════════════════════════════════
   CONTACT
   ═══════════════════════════════════════════════════════════════════════════ */

export type Contact = {
  email: string;
  /** Optional — an empty string hides it everywhere. */
  phone: string;
  linkedin: string;
  doximity: string;
  siteUrl: string;
};

export const contact: Contact = {
  /** TODO: replace with the real address before launch. */
  email: "contact@josueboutrosmd.com",
  /** Optional. Leave empty to hide. */
  phone: "",
  /** Optional professional profiles. Leave a value empty to hide the link. */
  linkedin: "https://www.linkedin.com/in/josue-boutros-617b7a309/",
  doximity: "https://www.doximity.com/pub/josue-boutros-md",
  /** Set once the domain is live — used for canonical URLs and social cards. */
  siteUrl: "https://josueboutrosmd.com",
};

/** Shown on the contact page so expectations are clear. */
export const contactNote: Localized = {
  en: "This site is a professional profile, not a patient portal. Please do not send personal health information, and do not use this form for anything urgent. If you are experiencing a medical emergency, call 911.",
  es: "Este sitio es un perfil profesional, no un portal de pacientes. Por favor no envíe información médica personal ni utilice este formulario para asuntos urgentes. Si tiene una emergencia médica, llame al 911.",
};
