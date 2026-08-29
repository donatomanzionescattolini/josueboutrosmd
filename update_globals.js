const fs = require('fs');

let css = fs.readFileSync('src/app/globals.css', 'utf8');

const newRoot = `:root {
  color-scheme: light;

  --paper: #fcfbf9;
  --surface: #ffffff;
  --surface-2: #f4f1ea;
  --ink: #111827;
  --ink-soft: #334155;
  --muted: #64748b;
  --border: #e2e8f0;
  --border-strong: #cbd5e1;

  --accent: #1e3a8a;
  --accent-hover: #172554;
  --accent-contrast: #ffffff;
  --accent-soft: #eff6ff;
  --accent-ink: #1e3a8a;

  --clay: #b45309;
  --clay-soft: #fef3c7;

  --shadow-color: 220 20% 12%;
}`;

const newDark = `.dark {
  color-scheme: dark;

  --paper: #090e17;
  --surface: #111827;
  --surface-2: #1e293b;
  --ink: #f8fafc;
  --ink-soft: #e2e8f0;
  --muted: #94a3b8;
  --border: #1e293b;
  --border-strong: #334155;

  --accent: #60a5fa;
  --accent-hover: #93c5fd;
  --accent-contrast: #0f172a;
  --accent-soft: #1e3a8a;
  --accent-ink: #bfdbfe;

  --clay: #fbbf24;
  --clay-soft: #78350f;

  --shadow-color: 220 40% 3%;
}`;

css = css.replace(/:root\s*\{[\s\S]*?--shadow-color:[^}]*\}/, newRoot);
css = css.replace(/\.dark\s*\{[\s\S]*?--shadow-color:[^}]*\}/, newDark);

// Update comment
css = css.replace(
  "A warm, paper-like light theme and a deep pine dark theme. The accent is a\n   pine teal — clinical without the cold corporate blue — warmed by a clay\n   secondary.",
  "An elegant navy and warm ivory light theme, and a deep oxford dark theme. The accent is a\n   distinguished navy — conveying erudition and brilliance — warmed by a gold/bronze\n   secondary."
);

fs.writeFileSync('src/app/globals.css', css);
