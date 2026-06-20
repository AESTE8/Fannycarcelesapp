# Action Plan — fannycarceles-immobilier-allevard.fr

Prioritized by impact-to-effort. Most fixes live in the deployed `index.html`,
`sitemap.xml`, and `robots.txt` — and must also be **synced back into the repo**
so the next `npm run build` deploy doesn't undo them.

---

## 🔴 CRITICAL — Fix immediately (this week)

### 1. Repoint all canonical signals from `vercel.app` → `.fr`
The old `fannycarcelesapp.vercel.app` domain is dead (404). Update in production `index.html`:
```html
<link rel="canonical" href="https://fannycarceles-immobilier-allevard.fr/">
<meta property="og:url"      content="https://fannycarceles-immobilier-allevard.fr/">
<meta property="twitter:url" content="https://fannycarceles-immobilier-allevard.fr/">
```
Also update `og:url`/schema `url` consistently. **Single highest-impact fix.**

### 2. Fix `sitemap.xml`
Replace the dead `vercel.app` loc with the live domain:
```xml
<url>
  <loc>https://fannycarceles-immobilier-allevard.fr/</loc>
  <lastmod>2026-06-20</lastmod>
  <changefreq>monthly</changefreq>
  <priority>1.0</priority>
</url>
```

### 3. Fix `robots.txt`
```
User-agent: *
Allow: /
Sitemap: https://fannycarceles-immobilier-allevard.fr/sitemap.xml
```
(Drop the `vercel.app` references and the comment header.)

### 4. Sync production `index.html` → repo
The repo's `index.html` is stale (`lang="en"`, title "Mon avis de valeur", no meta/OG/schema). Copy the live, SEO-complete `<head>` into the repo so a rebuild can't regress it. Verify `lang="fr"`.

> After 1–4: in Google Search Console, add/verify the `.fr` property, submit the corrected sitemap, and request indexing of the homepage.

---

## 🟠 HIGH — Within 1–2 weeks

### 5. Make the homepage content crawlable (SSR/SSG/prerender)
The body is a CSR SPA. Options, easiest first:
- Add a prerender step (e.g. `vite-plugin-prerender`, `react-snap`, or host-level prerendering) so the homepage HTML ships with rendered content.
- This unlocks AI-crawler citability and removes rendering-dependency risk.

### 6. Fix the `aggregateRating` schema
Either add individual `Review` objects matching the 5 on-page testimonials (name, `reviewBody`, `datePublished`, `reviewRating`), **or** remove `aggregateRating` and rely on the linked Immodvisor profile. Make `reviewCount` match reality.

### 7. Add legal pages (France requirement + trust)
Create `Mentions légales` and `Politique de confidentialité` (the lead form collects personal data → RGPD). Link them in the footer. Add the SIRET / RSAC (mandataire) number for E-E-A-T.

---

## 🟡 MEDIUM — Within 1 month

### 8. Improve heading hierarchy
Promote the hero value proposition to a keyword-rich `<h1>` (e.g. "Conseillère immobilière à Allevard — avis de valeur gratuit"); demote the logo name from `<h1>`.

### 9. Performance pass
- Replace the 2000px Unsplash hero with a sized, compressed, local image; add `fetchpriority="high"`.
- Add explicit `width`/`height` to all `<img>` (kills CLS).
- Add `loading="lazy"` below the fold; serve WebP/AVIF.
- Consider trimming Framer Motion or code-splitting it.

### 10. Add favicon + proper OG image
Ship `/favicon.ico` (+ apple-touch-icon) and a dedicated 1200×630 `og-image.jpg` (currently the OG image is a square profile photo).

### 11. Add an FAQ section + `FAQPage` schema
3–5 local Q&As in static HTML ("Comment se passe un avis de valeur ?", "Quelles communes autour d'Allevard couvrez-vous ?"). High leverage for AI Overviews / featured snippets.

---

## 🟢 LOW / ONGOING — Backlog

### 12. Expand content footprint
Add commune-level pages (Allevard, Goncelin, La Rochette, Pontcharra…) and/or a short blog. Each adds an indexable surface for local long-tail queries.

### 13. Local SEO reinforcement
- Link a Google Business Profile from the site and keep NAP identical everywhere.
- Add `llms.txt` for AI engines.
- Keep gathering Immodvisor/Google reviews.

### 14. Monitoring
Once the `.fr` domain is indexing cleanly, run PageSpeed Insights for real CWV field data and set up Search Console performance tracking.

---

### Effort / Impact snapshot
| # | Item | Impact | Effort |
|---|------|--------|--------|
| 1 | Fix canonical/OG → .fr | ★★★★★ | 5 min |
| 2 | Fix sitemap | ★★★★☆ | 5 min |
| 3 | Fix robots.txt | ★★★☆☆ | 5 min |
| 4 | Sync index.html to repo | ★★★★☆ | 15 min |
| 5 | Prerender/SSG | ★★★★☆ | 0.5–1 day |
| 6 | Fix review schema | ★★★☆☆ | 1 hr |
| 7 | Legal pages | ★★★☆☆ (compliance) | 2 hr |
| 8 | H1 hierarchy | ★★☆☆☆ | 15 min |
| 9 | Performance pass | ★★★☆☆ | 0.5 day |
| 11 | FAQ + schema | ★★★☆☆ | 2 hr |
