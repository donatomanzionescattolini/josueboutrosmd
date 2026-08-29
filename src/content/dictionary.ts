import type { Locale, Localized } from "./profile";

/**
 * Interface copy — every string the components render that is not biographical.
 * Biographical facts live in `profile.ts`.
 */
export const dictionary = {
  nav: {
    home: { en: "Home", es: "Inicio" },
    about: { en: "About", es: "Perfil" },
    practice: { en: "Clinical Focus", es: "Enfoque Clínico" },
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

  practice: {
    title: { en: "Clinical Focus", es: "Enfoque Clínico" },
    lede: {
      en: "Full-spectrum family medicine, with particular attention to the conditions that shape health in South Florida.",
      es: "Medicina familiar de espectro completo, con atención particular a las condiciones que definen la salud en el sur de la Florida.",
    },
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
