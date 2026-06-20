# Technical SEO — Findings

**Score: 45/100**

## Evidence captured
- Live `index.html` (production) — full SEO `<head>` with canonical/OG/Twitter/JSON-LD.
- Served body: empty `<div id="root"></div>` (~3.8 KB shell) → confirmed CSR SPA.
- `https://.../robots.txt` → 200, references `fannycarcelesapp.vercel.app`.
- `https://.../sitemap.xml` → 200, single `<loc>` = `vercel.app/` (404).
- `https://fannycarcelesapp.vercel.app/` → **404 (dead duplicate domain)**.
- `https://.../admin` → 404 (server doesn't rewrite non-root to SPA shell).
- `https://.../favicon.ico` → 404.

## The core problem: incomplete domain migration
Every canonical/discovery signal still points at the original Vercel preview domain,
which is now offline:

| Signal | Current (wrong) | Should be |
|--------|-----------------|-----------|
| `rel=canonical` | `https://fannycarcelesapp.vercel.app` | `https://fannycarceles-immobilier-allevard.fr/` |
| `og:url` / `twitter:url` | `…vercel.app` | `…allevard.fr/` |
| `sitemap.xml` `<loc>` | `…vercel.app/` (404) | `…allevard.fr/` |
| `robots.txt` `Sitemap:` | `…vercel.app/sitemap.xml` | `…allevard.fr/sitemap.xml` |

**Impact:** Google is told the canonical version of the page is a URL that 404s.
This suppresses indexing/ranking of the real `.fr` domain and wastes the otherwise
well-built metadata.

## Rendering
Client-side React 19 + react-router-dom SPA, no SSR/SSG/prerender. Acceptable for
Googlebot (renders JS) but a risk for AI crawlers and any render failure.

## Repo vs production drift
The repo's `index.html` predates the SEO work done on production:
```html
<html lang="en"> ... <title>Mon avis de valeur</title>   <!-- repo: no meta/OG/schema -->
```
A `npm run build` deploy from this repo would overwrite the good production head.
**Reconcile before the next deploy.**
