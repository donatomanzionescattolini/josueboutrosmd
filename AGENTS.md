# AGENTS.md

This file provides guidance to Codex (Codex.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # start local dev server
npm run build      # production build
npm run lint       # ESLint (flat config)
npm run typecheck  # tsc --noEmit (no test suite)
```

There is no test runner. CI runs `typecheck → lint → build` on Node 22.

## Architecture

Next.js 15 App Router site with bilingual (en/es) routing, fully statically generated at build time.

### Routing

Every page lives under `src/app/[locale]/` where locale is `"en"` or `"es"`. `generateStaticParams()` in the root layout pre-renders both at build time. `src/middleware.ts` redirects bare paths (e.g. `/cv`) to `/en/cv`. The only dynamic server route is `POST /api/contact`.

### Content layer

All site content is isolated in two files — **never hard-code content in components**:

- `src/content/profile.ts` — every biographical fact (person, residency, bio, principles, training, education, publications, etc.). Empty arrays simply don't render.
- `src/content/dictionary.ts` — every UI string. Exports a `t(value, locale)` helper. The `Localized = { en: string; es: string }` type enforces bilingual coverage at compile time.

### CSS

Tailwind v4 is configured entirely via `@theme inline` blocks inside `src/app/globals.css` — there is no `tailwind.config.*` file. Design tokens (colors, type scale, spacing) live as CSS custom properties in `:root` / `.dark` and are bridged into Tailwind via `@theme inline`, so utility classes like `text-accent`, `bg-paper`, and `border-line` reference the live variables. Shared component classes (`.card`, `.field`, `.eyebrow`, `.link-draw`, `.container-page`) are authored in `@layer components`. `src/app/[locale]/editorial.css` is a self-contained stylesheet scoped to `.editorial-home` and should not be imported elsewhere.

### Theme (dark/light)

Class-driven (`.dark` on `<html>`), not media-query-driven. `ThemeScript` is a raw inline `<script>` injected in the root layout before paint to avoid flash-of-wrong-theme. `ThemeToggle` reads/writes the DOM class directly to avoid hydration mismatches — do not introduce React state for theme.

### Animations

Motion for React (`motion/react`) is used throughout. The `src/components/reveal.tsx` wrapper handles scroll-triggered fade+lift and respects `useReducedMotion`. `EditorialHome` uses `useScroll` + `useSpring` for the vertical progress beam. `SiteHeader`'s mobile menu uses `AnimatePresence` with staggered children.

### PGY badge

`currentPgy(startYear, endYear)` in `src/lib/utils.ts` computes the residency training year from today's date; the academic year rolls over on July 1. It returns `null` outside the program window, automatically hiding the badge.

### Contact API security

`src/app/api/contact/route.ts` has an in-memory rate limiter (5 req / 10 min per IP), a honeypot `company` field (bots get a silent `200`), server-side field validation, and HTML entity escaping before email injection. Preserve all of these when modifying the route.

### Path alias

`@/` maps to `src/` everywhere.

## Key environment variables

See `.env.example`: `RESEND_API_KEY`, `CONTACT_FROM_EMAIL`, `CONTACT_TO_EMAIL`. The contact form degrades gracefully if Resend is unconfigured.

## TypeScript strictness

`strict: true` and `noUncheckedIndexedAccess: true` are both enabled. Array index access returns `T | undefined` — always guard against it.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
