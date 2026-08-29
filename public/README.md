# Static assets

## Adding a portrait photograph

Drop a headshot in this folder named `portrait.jpg` (or `.png`, `.webp`,
`.avif`) and it will replace the designed placeholder plate on the home and
about pages automatically on the next deploy. No code change is needed.

Guidance for the photo:

- **Aspect ratio 4:5 (portrait)** — e.g. 1600 × 2000 px. Other ratios are
  centre-cropped to 4:5.
- At least 1200 px wide so it stays sharp on high-density screens.
- A plain or softly blurred background works best with the site's palette.
- A white coat photo is conventional for residency and fellowship applications.

Next.js converts the image to AVIF/WebP and serves the right size per device,
so a large original is fine — do not pre-compress it aggressively.
