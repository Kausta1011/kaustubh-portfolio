# Kaustubh Salunke — Portfolio

Swiss-Modern + Glitchy personal site. Vanilla HTML + CSS + React (via UMD + Babel-standalone, no build step).

## Files

| File | Purpose |
| --- | --- |
| `index.html` | Entry point. Loads fonts, React, and the JSX modules. |
| `swiss.css` | All styles (ink-only palette, 12-col grid, glitch effects). |
| `data.js` | **Edit me first** — all portfolio content lives here as `window.PORTFOLIO`. Identity, bio, projects, stack, process, writing, testimonials, career, contact. |
| `swiss-hooks.jsx` | Shared hooks: scramble-decode, reveal-on-scroll, scroll progress, section tracker, Berlin clock. |
| `swiss-sections-1.jsx` | Hero (3 variants), Now Playing, About, Work (expandable rows), Stack, Process. |
| `swiss-sections-2.jsx` | Writing, Lab (4 interactive demos), Testimonials, Career, Contact. |
| `tweaks-panel.jsx` | In-page tweaks panel — lets you flip hero treatment + glitch intensity live. |

## Run locally

The page uses `<script src>` for JSX modules, so you need a real HTTP server (opening `index.html` directly via `file://` will fail with CORS errors).

Pick one:

```bash
# Python 3
python3 -m http.server 8000

# Node
npx serve .

# PHP
php -S localhost:8000
```

Then open http://localhost:8000.

## Deploying

Drop the folder into any static host: GitHub Pages, Netlify, Vercel, Cloudflare Pages, S3 + CloudFront. No build, no env vars.

For GitHub Pages: push to a repo, Settings → Pages → deploy from branch (`main` / root).

## Editing content

Almost everything you'll want to change is in **`data.js`**:

- `identity` — name, status, short/long bio
- `metrics` — the 4 stat tiles in the hero
- `now_playing` — current focus tiles
- `projects` — work entries (each has `summary`, `desc`, `stack`, `architecture`, `highlights`)
- `stack_visual` — tools grouped by category
- `process` — the 5-step working method
- `writing` — blog post stubs
- `testimonials` — quotes (mark `placeholder: true` for empty slots)
- `experience` / `education` / `certifications`
- `contact` — email, social links

Section copy that isn't data-driven (Lab demos, Specimens, footer) lives directly in the JSX files.

## Tweaks panel

Click the **Tweaks** toggle (top-right) to switch:

- **Hero** — Classic / Fillscreen / Terminal runner
- **Glitch** — Subtle / Medium / Heavy

Choices persist via the `EDITMODE-BEGIN`/`END` block in `index.html`.

## Notes

- The page renders client-side. Initial paint shows a "Loading" placeholder until React + Babel + JSX have all parsed (~500ms on a fast connection).
- For production, consider precompiling the JSX (esbuild/vite) and removing Babel-standalone for faster load.
