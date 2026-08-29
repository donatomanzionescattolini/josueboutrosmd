# josueboutrosmd.com

Portfolio website for **Josue Boutros, MD** — family medicine resident physician,
Palmetto General Hospital, Hialeah, Florida.

Bilingual (English / Spanish), fully static, accessible, and free to host.

---

## ⚠️ Before launch — verify the content

Every fact on the site lives in one file: **[`src/content/profile.ts`](src/content/profile.ts)**.

The biographical details currently in it were seeded from public professional
directories (LinkedIn, Doximity, Healthgrades) as a starting point. **They have
not been confirmed by Dr. Boutros.** Please read through that file and correct
anything wrong or out of date. Items needing attention are marked `verify:` and
`TODO:` in comments.

Specifically:

| Item | Status |
| --- | --- |
| Name, specialty, location | Seeded from public profiles — confirm |
| Residency program, hospital, 2024–2027 dates | Seeded — confirm |
| Medical school and graduation year | Seeded — confirm |
| Certifications (ECFMG, BLS, ACLS) | **Placeholder list — confirm or delete** |
| Contact email | **`contact@josueboutrosmd.com` — replace with the real address** |
| Bio, clinical focus, practice principles | Written as a first draft — edit freely |
| Publications, awards, memberships, presentations | Empty on purpose — add real entries |
| Portrait photograph | Not yet added — see [`public/README.md`](public/README.md) |

Nothing on the site is fabricated. Sections with no confirmed content are empty
arrays, and **empty sections do not render**, so the site looks complete now and
grows as entries are added.

---

## Editing the site

You do not need to touch any component to change the website's content.

| To change… | Edit |
| --- | --- |
| Any biographical fact, bio text, clinical focus, CV entries, contact details | `src/content/profile.ts` |
| Button labels, navigation, form labels, section headings | `src/content/dictionary.ts` |
| Colours, typography, spacing, print styles | `src/app/globals.css` |

Both content files are typed, so if you add an English string and forget the
Spanish one, `npm run typecheck` will tell you.

### The PGY level updates itself

The "PGY-3" badge is computed from `residency.startYear` and the current date,
rolling over on July 1 each year. It never needs manual updating, and it
disappears automatically once the program end year passes.

---

## Local development

```bash
npm install
npm run dev          # http://localhost:3000
```

Other commands:

```bash
npm run build        # production build
npm run start        # serve the production build
npm run typecheck    # TypeScript, no emit
npm run lint         # ESLint
```

Requires Node 20+ (CI uses Node 22).

---

## Deploying to Vercel (free)

The site fits comfortably in Vercel's free Hobby plan — every page is
prerendered as static HTML, and the only server function is the contact form.

### 1. Push to GitHub

Already done if you are reading this in the repo.

### 2. Import the project

1. Go to [vercel.com/new](https://vercel.com/new) and sign in with GitHub.
2. Select the `josueboutrosmd` repository.
3. Vercel detects Next.js automatically — **leave every build setting as-is**.
   `vercel.json` in this repo already pins the framework, build command and
   region (`iad1`, Washington D.C. — the closest region to Florida).
4. Click **Deploy**.

The first deploy takes about a minute and gives you a live
`*.vercel.app` URL. Every push to `main` redeploys; every pull request gets
its own preview URL.

### 3. Add the contact-form environment variables (optional)

Without these the form shows a clear error and offers a direct mailto link
instead — it never silently drops a message. To enable real delivery, see
[`.env.example`](.env.example) and add the three variables under
**Project → Settings → Environment Variables**.

---

## Connecting a domain

`josueboutrosmd.com` was available at the time of writing (~$11–12/year).
Alternatives that were also free: `josueboutros.com`, `drjosueboutros.com`,
`josueboutrosmd.org`.

### Option A — buy through Vercel (simplest)

1. **Project → Settings → Domains → Buy**, search `josueboutrosmd.com`.
2. Purchase. DNS is configured automatically, HTTPS is issued within minutes,
   and there is nothing further to do.

### Option B — buy elsewhere (Cloudflare, Namecheap, Porkbun…)

1. Register the domain with your registrar.
2. In Vercel: **Project → Settings → Domains → Add**, enter
   `josueboutrosmd.com`.
3. Vercel shows the exact records to create. They are normally:

   | Type | Name | Value |
   | --- | --- | --- |
   | `A` | `@` | `76.76.21.21` |
   | `CNAME` | `www` | `cname.vercel-dns.com` |

   **Use the values Vercel displays** rather than these — they are
   occasionally region- or account-specific.
4. Wait for propagation (usually minutes, up to 48 hours). Vercel issues the
   TLS certificate on its own.

### After the domain is live

Update `contact.siteUrl` in `src/content/profile.ts` if you chose a domain
other than `josueboutrosmd.com`. That value drives canonical URLs, `hreflang`
alternates, the sitemap, `robots.txt`, and social share cards — it is the one
string that must match the real domain.

Then submit `https://<your-domain>/sitemap.xml` to
[Google Search Console](https://search.google.com/search-console) so the site
is indexed under his name.

---

## What's in the box

**Stack** — Next.js 16 (App Router), React 19, TypeScript (strict), Tailwind
CSS v4, Motion. No UI kit, no icon package, no analytics, no trackers.

- **Bilingual routing** — `/en/…` and `/es/…` are separately prerendered, with
  `hreflang` alternates and a language toggle that keeps the reader on the same
  page. Paths without a locale (`/cv`) redirect to the English equivalent.
- **Light and dark themes** — follows the OS by default, with a manual toggle
  and a pre-paint script so there is no flash of the wrong theme.
- **Accessibility** — semantic landmarks, a skip link, visible focus rings,
  labelled form fields with inline error messaging, `prefers-reduced-motion`
  honoured throughout, and AA-contrast colour pairings in both themes.
- **SEO** — per-locale metadata, generated `sitemap.xml` and `robots.txt`,
  `Physician` JSON-LD structured data, and build-time Open Graph cards.
- **Print** — the CV page has dedicated print styles (`Print / Save as PDF`
  produces a clean document with the site chrome removed).
- **Security headers** — a strict CSP, HSTS, `X-Content-Type-Options`,
  `Referrer-Policy`, and a `Permissions-Policy`, all set in `next.config.ts`.
- **Contact form** — server-side validation, a honeypot field, and a
  best-effort rate limit.

### Layout

```
src/
├── app/
│   ├── [locale]/          # every page, prerendered per language
│   │   ├── layout.tsx     # <html>, fonts, header/footer, JSON-LD
│   │   ├── page.tsx       # home
│   │   ├── about/  practice/  cv/  contact/
│   │   ├── not-found.tsx
│   │   └── opengraph-image.tsx
│   ├── api/contact/       # form delivery
│   ├── globals.css        # design tokens, base styles, print styles
│   ├── sitemap.ts  robots.ts  icon.svg
├── components/            # presentational only — no content
├── content/               # ← everything you edit lives here
│   ├── profile.ts         # facts
│   └── dictionary.ts      # interface copy
├── lib/                   # i18n helpers, PGY calculation, utilities
└── middleware.ts          # locale redirect
```

---

## Licence

Code is MIT licensed (see [`LICENSE`](LICENSE)). The biographical content,
photographs, and the name and likeness of Dr. Josue Boutros are not covered by
that licence and remain his.
