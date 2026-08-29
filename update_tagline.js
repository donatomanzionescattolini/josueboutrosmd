const fs = require('fs');

let profile = fs.readFileSync('src/content/profile.ts', 'utf8');

const newTagline = `export const tagline: Localized = {
  en: "A physician forged by resilience, practicing primary care with exceptional rigor, plain language, and the patience to listen twice.",
  es: "Un médico forjado por la resiliencia, ejerciendo la atención primaria con excepcional rigor, lenguaje claro y la paciencia de escuchar dos veces.",
};`;

profile = profile.replace(/export const tagline: Localized = \{[\s\S]*?\};/, newTagline);

fs.writeFileSync('src/content/profile.ts', profile);
