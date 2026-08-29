# PRD — Josué Boutros, MD — Personal Authority Website

## Original Problem Statement
Create a sophisticated personal professional website for Josué Boutros using josueboutrosmd.vercel.app/en as the factual source of truth. Primarily professional/clinical; authority platform inspired by Peter Attia (searchable long-form archive), Zubin Damania (media-centered hub), Aaron Carroll (named-expert credibility). Premium medical editorial + warm human design, elegant typography, generous whitespace, mobile responsive, distinctive identity. Pages: Home, About/Bio, Clinical work, searchable Insights archive + article pages, Media/Appearances, Research/publications, contact pathways (patients, speaking, media, professional). SEO-friendly architecture with metadata, internal linking, CTAs.

## User Choices
- Content: crawl & reuse existing site faithfully + fresh editorial copy
- Language: English + Spanish (full bilingual toggle)
- Contact: simple contact form (stored in DB, no email delivery)

## Architecture
- Frontend: React 19 + react-router 7, framer-motion (masked hero reveal, scroll reveals, parallax), Lenis smooth scrolling, Tailwind + custom CSS-variable palette (linen/terracotta/sage), Newsreader + Manrope + IBM Plex Mono, light/dark theme toggle, EN/ES LangContext.
- Backend: FastAPI, `/api/health`, `POST /api/contact` (MongoDB `contact_inquiries`, validated inquiry types).
- SEO: per-page title/description via useSEO hook, Physician + Article JSON-LD, dedicated routes per article (`/insights/:slug`), internal linking between archive/articles/related.
- Content data: `src/data/content.js` (bilingual dict, images, links), `src/data/articles.js` (5 long-form essays, EN+ES bodies).

## User Personas
- Patients (English/Spanish speakers in South Florida)
- Academic/speaking organizers (residency programs, conferences)
- Journalists/podcasters seeking bilingual medical commentary
- Research collaborators and employers

## Implemented (2026-08-29)
- Kinetic hero: masked line-by-line reveal, parallax arched portrait, live Chief Resident badge, tagline card
- Numbered manifesto chapters (3, expandable) — Continuity / Language Line / Trust
- Slow editorial marquee (bilingual pillars)
- Insights archive: full-text search, category chips, result count, 5 long-form articles (EN+ES), article pages with drop-cap, takeaway box, copy-link share, related articles, Article JSON-LD
- About: bio, credentials card, 4-step journey timeline
- Clinical: 4 numbered pillars, imagery, patient note
- Research: 3 projects with status chips, collaboration CTA
- Media: teaching/community/research/press cards, booking CTA
- Contact: routed inquiry form (patient/speaking/media/professional) → MongoDB, Sonner toasts (EN/ES)
- Global EN/ES toggle, dark/light theme toggle, mobile menu, footer with LinkedIn/Doximity/email

## Verified
- Backend: /api/health 200; POST /api/contact stores + returns doc; invalid payload 422
- Frontend: home hero/manifesto/insights render; search filters (diabetes → 3); article page loads; ES toggle translates all UI; contact form submits with Spanish success toast; dark mode works; all 8 routes 200

## Implemented (2026-08-29, round 2)
- Essay audio: "Listen to this essay" button on every article page — OpenAI TTS (tts-1-hd, voice "onyx") via Emergent universal key; text chunked ≤4000 chars, audio cached as mp3 in /app/backend/audio_cache, served via GET /api/tts/{key}.mp3; custom mini-player with play/pause + progress. Works EN + ES (ES has slight English accent — OpenAI voice limitation)
- Newsletter: global footer subscribe form (EN/ES) → POST /api/newsletter stores in `newsletter_subscribers` (idempotent) + sends branded welcome email via Emergent managed Resend
- Contact notifications: every inquiry triggers a branded HTML notification email to the site owner (all fields escaped, guardrail-gated)
- BLOCKER: hello@josueboutros.md is undeliverable (domain josueboutros.md has no DNS/MX) — email provider blocks it. Notification pipeline is built and verified working with real sends; needs one real inbox address (change OWNER_EMAIL in backend/.env) to go live
- Real photography: his existing site has zero photos of him (verified in source; josueboutros.com doesn't resolve). Stock placeholders remain; swap on user upload

## Verified (round 2)
- POST /api/newsletter: stores, dedupes (already:true), welcome email sent (202 from proxy)
- POST /api/contact: stores + notification path runs (email blocked only by undeliverable recipient)
- POST /api/tts: generated 65KB mp3, GET serves audio/mpeg 200; UI test: full essay audio generated (~30s) and played in custom player
- UI: newsletter subscribe through footer shows success toast

## Backlog
- P0: Real owner inbox for inquiry notifications (one env var once provided)
- P1: Real photos of Dr. Boutros (awaiting user upload), swap into Hero/About/Clinical
- P1: Admin inbox view for stored inquiries + subscriber list
- P2: RSS feed + sitemap.xml; per-language URLs; essay auto-email to subscribers on publish
- P2: Native-Spanish voice via ElevenLabs for ES essay audio
