const fs = require('fs');

let profile = fs.readFileSync('src/content/profile.ts', 'utf8');

const newBio = `export const bio: Localized[] = [
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
];`;

profile = profile.replace(/export const bio: Localized\[\] = \[([\s\S]*?)\];/, newBio);

fs.writeFileSync('src/content/profile.ts', profile);
