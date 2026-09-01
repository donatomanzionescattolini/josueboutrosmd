import type { Locale, Localized } from "./profile";

/**
 * Interface copy — every string the components render that is not biographical.
 * Biographical facts live in `profile.ts`.
 */
export const dictionary = {
  nav: {
    home: { en: "Home", es: "Inicio" },
    about: { en: "About", es: "Sobre mí" },
    clinical: { en: "Clinical", es: "Clínica" },
    insights: { en: "Insights", es: "Ideas" },
    research: { en: "Research", es: "Investigación" },
    media: { en: "Media", es: "Medios" },
    cv: { en: "CV", es: "Currículum" },
    contact: { en: "Contact", es: "Contacto" },
    menu: { en: "Menu", es: "Menú" },
    close: { en: "Close", es: "Cerrar" },
    skipToContent: { en: "Skip to content", es: "Saltar al contenido" },
  },

  actions: {
    readMore: { en: "Read more", es: "Leer más" },
    viewCv: { en: "View curriculum vitae", es: "Ver currículum" },
    getInTouch: { en: "Get in touch", es: "Escríbeme" },
    emailDirectly: { en: "Email directly", es: "Escribir por correo" },
    backHome: { en: "Back to home", es: "Volver al inicio" },
    print: { en: "Print / Save as PDF", es: "Imprimir / Guardar en PDF" },
    toggleTheme: { en: "Toggle colour theme", es: "Cambiar tema de color" },
    toggleLanguage: { en: "Switch language", es: "Cambiar idioma" },
  },

  home: {
    eyebrow: { en: "Family Medicine", es: "Medicina Familiar" },
    kicker: { en: "Family Medicine — Hialeah, Florida", es: "Medicina Familiar — Hialeah, Florida" },
    heroBadge: { en: "Chief Resident · Palmetto General Hospital", es: "Jefe de Residentes · Palmetto General Hospital" },
    heroLine1: { en: "A physician trained", es: "Un médico capacitado" },
    heroLine2: { en: "to treat the household,", es: "para tratar el hogar," },
    heroLine3: { en: "not just the chart.", es: "no solo el historial." },
    heroSub: {
      en: "Family physician and researcher in training, serving one of the most Spanish-speaking communities in the United States. Continuity. Language. Trust. These are not extras — they are the point.",
      es: "Médico de familia e investigador en formación, al servicio de una de las comunidades hispanohablantes más grandes de Estados Unidos. Continuidad. Idioma. Confianza. No son extras — son el punto.",
    },
    heroCtaPrimary: { en: "Read the Insights", es: "Leer las Ideas" },
    heroCtaSecondary: { en: "Get in touch", es: "Escríbeme" },
    heroTagline: { en: "Continuity. Language. Trust.", es: "Continuidad. Idioma. Confianza." },
    heroScroll: { en: "Scroll", es: "Desplázate" },
    marqueeItems: [
      { en: "Bilingual Family Medicine", es: "Medicina Familiar Bilingüe" },
      { en: "Camagüey to Miami", es: "De Camagüey a Miami" },
      { en: "Continuity of Care", es: "Continuidad Asistencial" },
      { en: "Language Concordance Research", es: "Investigación en Concordancia Lingüística" },
      { en: "Chief Resident, Palmetto General", es: "Jefe de Residentes, Palmetto General" },
      { en: "Preventive Care for Real Households", es: "Prevención para Hogares Reales" },
      { en: "English · Español", es: "English · Español" },
    ] satisfies Localized[],
    aboutHeading: { en: "About", es: "Perfil" },
    aboutLede: {
      en: "A physician trained to treat the household, not just the chart.",
      es: "Un médico formado para atender a la familia, no solamente al expediente.",
    },
    focusHeading: { en: "Clinical Focus", es: "Enfoque Clínico" },
    focusLede: {
      en: "Where the work concentrates, and why.",
      es: "Dónde se concentra el trabajo, y por qué.",
    },
    principlesHeading: { en: "How I Practice", es: "Cómo Ejerzo" },
    principlesLede: {
      en: "Four commitments that survive a busy clinic day.",
      es: "Cuatro compromisos que sobreviven un día ocupado de consulta.",
    },
    trainingHeading: { en: "Training", es: "Formación" },
    contactHeading: { en: "Get in Touch", es: "Contacto" },
    contactLede: {
      en: "For colleagues, programs, and collaborators.",
      es: "Para colegas, programas y colaboradores.",
    },
    insightsEyebrow: { en: "The Archive", es: "El Archivo" },
    insightsTitle: { en: "Insights, written to be used.", es: "Ideas escritas para usarse." },
    insightsSub: {
      en: "Long-form essays on family medicine, prevention, and the practical physics of staying healthy — in plain English and Spanish.",
      es: "Ensayos sobre medicina familiar, prevención y la física práctica de mantenerse sano — en inglés y español claros.",
    },
    viewAllInsights: { en: "Browse the full archive", es: "Ver el archivo completo" },
    clinicalEyebrow: { en: "Clinical Work", es: "Trabajo Clínico" },
    clinicalTitle: { en: "Where the work concentrates.", es: "Dónde se concentra el trabajo." },
    clinicalLink: { en: "Explore the clinical work", es: "Explorar el trabajo clínico" },
    statArticles: { en: "Published research articles", es: "Artículos de investigación publicados" },
    statRole: { en: "Chief Resident, Family Medicine", es: "Jefe de Residentes, Medicina Familiar" },
    statLanguages: { en: "Languages of care: English & Spanish", es: "Idiomas de atención: inglés y español" },
    statPgy: { en: "Current postgraduate year", es: "Año actual de posgrado" },
    ctaTitle: { en: "Patients, podiums, press, and partnerships.", es: "Pacientes, podios, prensa y colaboraciones." },
    ctaSub: {
      en: "Whether you are looking for a physician who speaks your language, a speaker for your program, or a collaborator on research that matters — the door is open.",
      es: "Si busca un médico que hable su idioma, un conferencista para su programa o un colaborador de investigación — la puerta está abierta.",
    },
    ctaButton: { en: "Start a conversation", es: "Iniciar una conversación" },
  },

  editorialHome: {
    railQuote: {
      en: "The best care is the care that makes room for the whole story.",
      es: "La mejor atención es la que deja espacio para toda la historia.",
    },
    railQuoteAttribution: { en: "— J.B.", es: "— J.B." },
    atAGlance: { en: "At a glance", es: "De un vistazo" },
    drivesTitle: { en: "What drives my work", es: "Qué impulsa mi trabajo" },
    drivesItems: [
      { en: "Every patient has a story", es: "Cada paciente tiene una historia" },
      { en: "Time is a clinical tool", es: "El tiempo es una herramienta clínica" },
      { en: "Evidence meets reality", es: "La evidencia encuentra la realidad" },
      { en: "Families, not just individuals", es: "Familias, no solo individuos" },
    ] satisfies Localized[],
    drivesDetails: [
      { en: "I listen for the whole one.", es: "Escucho la historia completa." },
      { en: "I spend it where it changes outcomes.", es: "Lo invierto donde cambia resultados." },
      { en: "Good medicine fits a real life.", es: "La buena medicina cabe en una vida real." },
      { en: "I treat the household.", es: "Atiendo al hogar." },
    ] satisfies Localized[],
    rolesTitle: { en: "Current roles", es: "Roles actuales" },
    achievementsTitle: { en: "Selected achievements", es: "Logros destacados" },
    championBadge: { en: "ABFM Resident Champion · 2026–2027", es: "Campeón de Residentes de ABFM · 2026–2027" },
    practiceEyebrow: { en: "How I practice", es: "Cómo ejerzo" },
    practiceTitle: { en: "Medicine as a relationship", es: "La medicina como relación" },
    practiceArtLabel: { en: "Continuity / Language / Trust", es: "Continuidad / Idioma / Confianza" },
    practiceBody: {
      en: "Family medicine is built on continuity. I want to know my patients across years, not visits — the person in front of me and the people behind them.",
      es: "La medicina familiar se construye sobre la continuidad. Quiero conocer a mis pacientes a lo largo de los años, no solo de las consultas: a la persona frente a mí y a quienes están detrás.",
    },
    practiceLink: { en: "Read more about my philosophy", es: "Leer más sobre mi filosofía" },
    clinicalEyebrow: { en: "Clinical work", es: "Trabajo clínico" },
    clinicalTitle: { en: "What I focus on", es: "En qué me enfoco" },
    clinicalLink: { en: "See my approach to patient care", es: "Ver mi enfoque de atención" },
    researchEyebrow: { en: "Research", es: "Investigación" },
    researchTitle: { en: "Questions I’m pursuing", es: "Preguntas que persigo" },
    researchBody: {
      en: "I study the intersection of language, culture, and access in primary care. My goal is to generate evidence that improves care for communities like mine.",
      es: "Estudio la intersección del idioma, la cultura y el acceso en la atención primaria. Mi objetivo es generar evidencia que mejore la atención de comunidades como la mía.",
    },
    researchLink: { en: "View all research projects", es: "Ver todos los proyectos" },
    writingEyebrow: { en: "Writing", es: "Escritura" },
    writingTitle: { en: "Thoughts in progress", es: "Ideas en proceso" },
    writingBody: {
      en: "Plain-language writing for patients, families, and anyone who wants to understand medicine better.",
      es: "Escritura en lenguaje claro para pacientes, familias y cualquiera que quiera entender mejor la medicina.",
    },
    writingLink: { en: "View all notes", es: "Ver todas las notas" },
    storyEyebrow: { en: "My story", es: "Mi historia" },
    storyTitle: { en: "Why this path", es: "Por qué este camino" },
    storyBody: {
      en: "I trained in Camagüey, Cuba, where medicine begins with the neighborhood and the household. Work in genetics, dermatology, elder care, and urgent care taught me to stay curious under pressure. After emigrating, I worked, studied, and rebuilt a path into U.S. medicine. Every step made the same lesson clearer: care is strongest when it is skilled, curious, and kind.",
      es: "Me formé en Camagüey, Cuba, donde la medicina comienza con el barrio y el hogar. El trabajo en genética, dermatología, cuidado de personas mayores y urgencias me enseñó a mantener la curiosidad bajo presión. Después de emigrar, trabajé, estudié y reconstruí un camino hacia la medicina en Estados Unidos. Cada paso hizo más clara la misma lección: la atención es más fuerte cuando es competente, curiosa y bondadosa.",
    },
    storyLink: { en: "Read my story", es: "Leer mi historia" },
    storyQuote: {
      en: "If you have talent for something, you should not bury it but multiply it.",
      es: "Si tienes talento para algo, no debes enterrarlo, sino multiplicarlo.",
    },
    bottomCta: {
      en: "Open to opportunities that combine clinical excellence, research, and meaningful care.",
      es: "Abierto a oportunidades que combinen excelencia clínica, investigación y atención significativa.",
    },
    bottomCtaSub: {
      en: "If you are building a team that shares these values, I would love to connect.",
      es: "Si está construyendo un equipo que comparte estos valores, me encantaría conectar.",
    },
    bottomCtaLink: { en: "Let’s start a conversation", es: "Empecemos una conversación" },
    siteNote: {
      en: "This site is a personal professional profile.",
      es: "Este sitio es un perfil profesional personal.",
    },
  },

  schemes: {
    label: { en: "Color palette", es: "Paleta de color" },
    choose: { en: "Choose a palette", es: "Elegir una paleta" },
    active: { en: "Active palette", es: "Paleta activa" },
    helper: { en: "From the catalogue", es: "Del catálogo" },
    names: {
      warm: { en: "Warm split", es: "Complementaria cálida" },
      monochromatic: { en: "Monochromatic", es: "Monocromática" },
      analogous: { en: "Analogous", es: "Análoga" },
      complementary: { en: "Complementary", es: "Complementaria" },
      split: { en: "Split-complementary", es: "Complementaria dividida" },
      triadic: { en: "Triadic", es: "Triádica" },
      tetradic: { en: "Tetradic", es: "Tetrádica" },
    },
    descriptions: {
      warm: { en: "Pine, paper, and the original clay warmth.", es: "Pino, papel y la calidez arcilla original." },
      monochromatic: { en: "One calm hue, varied by depth.", es: "Un tono sereno, con distintas profundidades." },
      analogous: { en: "Pine with steel-blue and leaf-green neighbors.", es: "Pino con vecinos azul acero y verde hoja." },
      complementary: { en: "Pine with a focused berry counterpoint.", es: "Pino con un contrapunto baya preciso." },
      split: { en: "Pine, clay, and a rare plum note.", es: "Pino, arcilla y una nota ciruela poco común." },
      triadic: { en: "Pine, amber, and a quiet plum reserve.", es: "Pino, ámbar y una reserva ciruela serena." },
      tetradic: { en: "Four editorial hues for a bolder system.", es: "Cuatro tonos editoriales para un sistema más audaz." },
    },
  },

  manifesto: {
    eyebrow: { en: "The Manifesto", es: "El Manifiesto" },
    title: { en: "Three commitments, practiced daily.", es: "Tres compromisos, practicados a diario." },
    sub: {
      en: "Family medicine is a long conversation. These are the terms I practice by.",
      es: "La medicina familiar es una conversación larga. Estos son los términos con los que practico.",
    },
    open: { en: "Open", es: "Abrir" },
    close: { en: "Close", es: "Cerrar" },
  },

  clinical: {
    title: { en: "Clinical Work", es: "Trabajo Clínico" },
    lede: {
      en: "The practice, in six parts — primary care for real households, where plans must survive contact with work schedules, budgets, and abuela's cooking.",
      es: "La práctica, en seis partes — atención primaria para hogares reales, donde los planes deben sobrevivir el contacto con horarios de trabajo, presupuestos y la cocina de la abuela.",
    },
    noteTitle: { en: "A note for patients", es: "Una nota para pacientes" },
    note: {
      en: "This site is educational and does not replace medical advice. For appointments at Palmetto General Hospital's family medicine clinic, or for questions about becoming a patient, please use the contact form.",
      es: "Este sitio es educativo y no reemplaza el consejo médico. Para citas en la clínica de medicina familiar de Palmetto General Hospital, o para preguntas sobre convertirse en paciente, use el formulario de contacto.",
    },
  },

  insights: {
    title: { en: "Insights", es: "Ideas" },
    lede: {
      en: "Essays and explainers on family medicine — searchable, citable, and written to be read by patients and colleagues alike.",
      es: "Ensayos y explicaciones sobre medicina familiar — buscables, citables y escritos para pacientes y colegas por igual.",
    },
    searchPlaceholder: { en: "Search the archive — try “blood pressure” or “diabetes”…", es: "Buscar en el archivo — pruebe “presión” o “diabetes”…" },
    all: { en: "All", es: "Todos" },
    read: { en: "Read", es: "Leer" },
    minRead: { en: "min read", es: "min de lectura" },
    empty: { en: "Nothing matches that search — try another term.", es: "Nada coincide con esa búsqueda — intente otro término." },
    results: { en: "essays", es: "ensayos" },
    backToArchive: { en: "Back to the archive", es: "Volver al archivo" },
    takeaway: { en: "The takeaway", es: "La idea clave" },
    share: { en: "Copy link", es: "Copiar enlace" },
    copied: { en: "Link copied to clipboard", es: "Enlace copiado" },
    related: { en: "Keep reading", es: "Seguir leyendo" },
    disclaimer: { en: "Educational content — not a substitute for personal medical advice.", es: "Contenido educativo — no sustituye el consejo médico personal." },
  },

  research: {
    title: { en: "Research", es: "Investigación" },
    lede: {
      en: "Published, peer-reviewed work and presentations at regional and national meetings — all of it beginning at the same place: the exam room in Hialeah.",
      es: "Trabajo publicado y revisado por pares, y presentaciones en reuniones regionales y nacionales — todo comenzando en el mismo lugar: la consulta en Hialeah.",
    },
    statusPeer: { en: "Peer Review", es: "Revisión por Pares" },
    statusOngoing: { en: "Ongoing Cohort", es: "Cohorte en Curso" },
    statusPublished: { en: "Published Monograph", es: "Monografía Publicada" },
    collab: {
      en: "For research collaboration, data requests, or speaking about this work, use the contact form.",
      es: "Para colaboración en investigación, solicitudes de datos o charlas sobre este trabajo, use el formulario de contacto.",
    },
  },

  media: {
    title: { en: "Media & Appearances", es: "Medios y Apariciones" },
    lede: {
      en: "Teaching, community work, and research presentation — the public side of the practice.",
      es: "Docencia, trabajo comunitario y presentación de investigación — el lado público de la práctica.",
    },
    cta: { en: "Book Josue for a talk, interview, or workshop", es: "Invite a Josué a una charla, entrevista o taller" },
  },

  about: {
    title: { en: "About", es: "Perfil" },
    lede: {
      en: "Why family medicine, and how that choice shows up in a clinic room.",
      es: "Por qué medicina familiar, y cómo esa elección se refleja en la consulta.",
    },
    languagesHeading: { en: "Languages", es: "Idiomas" },
    locationHeading: { en: "Based in", es: "Ubicación" },
    programHeading: { en: "Program", es: "Programa" },
  },


  cv: {
    title: { en: "Curriculum Vitae", es: "Currículum Vitae" },
    lede: {
      en: "Training, education, and credentials.",
      es: "Formación, educación y credenciales.",
    },
    training: { en: "Graduate Medical Education", es: "Educación Médica de Posgrado" },
    education: { en: "Medical Education", es: "Educación Médica" },
    experience: { en: "Experience", es: "Experiencia" },
    credentials: { en: "Certifications & Licensure", es: "Certificaciones y Licencias" },
    publications: { en: "Publications", es: "Publicaciones" },
    presentations: { en: "Presentations", es: "Presentaciones" },
    awards: { en: "Honors & Awards", es: "Honores y Distinciones" },
    memberships: { en: "Professional Memberships", es: "Membresías Profesionales" },
    languages: { en: "Languages", es: "Idiomas" },
  },

  sideNav: {
    atAGlance: { en: "At a glance", es: "De un vistazo" },
    credentialed: { en: "Credentialed", es: "Certificaciones" },
    bilingualCare: { en: "Bilingual care", es: "Atención bilingüe" },
    viewFullCv: { en: "View full CV", es: "Ver currículum completo" },
  },

  contact: {
    title: { en: "Contact", es: "Contacto" },
    lede: {
      en: "For professional correspondence — colleagues, residency and fellowship programs, research collaborators, and community organizations.",
      es: "Para correspondencia profesional: colegas, programas de residencia y becas, colaboradores de investigación y organizaciones comunitarias.",
    },
    nameLabel: { en: "Your name", es: "Su nombre" },
    emailLabel: { en: "Email address", es: "Correo electrónico" },
    subjectLabel: { en: "Subject", es: "Asunto" },
    messageLabel: { en: "Message", es: "Mensaje" },
    submit: { en: "Send message", es: "Enviar mensaje" },
    sending: { en: "Sending…", es: "Enviando…" },
    success: {
      en: "Thank you — your message has been sent. You can expect a reply within a few days.",
      es: "Gracias, su mensaje ha sido enviado. Puede esperar una respuesta en unos pocos días.",
    },
    error: {
      en: "Something went wrong sending your message. Please email directly instead.",
      es: "Ocurrió un problema al enviar su mensaje. Por favor escriba directamente por correo.",
    },
    validation: {
      name: { en: "Please enter your name.", es: "Por favor ingrese su nombre." },
      email: { en: "Please enter a valid email address.", es: "Por favor ingrese un correo electrónico válido." },
      message: { en: "Please enter a message.", es: "Por favor escriba un mensaje." },
    },
    directHeading: { en: "Direct", es: "Directo" },
    elsewhereHeading: { en: "Elsewhere", es: "En otros sitios" },
  },

  notFound: {
    title: { en: "Page not found", es: "Página no encontrada" },
    body: {
      en: "The page you are looking for does not exist or has moved.",
      es: "La página que busca no existe o ha sido movida.",
    },
  },

  footer: {
    rights: { en: "All rights reserved.", es: "Todos los derechos reservados." },
    disclaimer: {
      en: "This website is for professional and informational purposes only. It does not provide medical advice and does not create a physician–patient relationship.",
      es: "Este sitio web tiene fines profesionales e informativos únicamente. No proporciona asesoramiento médico ni establece una relación médico–paciente.",
    },
    emergency: {
      en: "In an emergency, call 911.",
      es: "En caso de emergencia, llame al 911.",
    },
  },

  meta: {
    pgy: { en: "PGY", es: "PGY" },
    currentYear: { en: "Current year", es: "Año actual" },
  },
} as const;

/** Resolve a `Localized` value (or a plain string) for the active locale. */
export function t(value: Localized | string, locale: Locale): string {
  return typeof value === "string" ? value : value[locale];
}
