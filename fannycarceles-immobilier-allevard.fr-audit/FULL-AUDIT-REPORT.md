# SEO Audit — fannycarceles-immobilier-allevard.fr

**Date:** 2026-06-20
**Audited URL:** https://fannycarceles-immobilier-allevard.fr/
**Source code:** local repo (Vite + React 19 SPA, `Fannycarcelesapp-1`)
**Business type detected:** Local Service business — independent real estate agent (mandataire IAD France), service-area / personal-brand, single-page lead-generation site

---

## Executive Summary

### Overall SEO Health Score: **55 / 100** — *Needs Improvement*

This is a well-designed, modern one-page lead-generation site with genuinely good
on-page metadata, clean French copy, and real customer testimonials. The
fundamentals of a *page* are mostly right.

The problem is the *signals*: the site was originally built and deployed on
`fannycarcelesapp.vercel.app`, then moved to the custom domain
`fannycarceles-immobilier-allevard.fr` — **but none of the canonical signals were
updated during the migration.** The canonical tag, Open Graph URLs, Twitter URLs,
the XML sitemap, and the robots.txt sitemap directive all still point to the old
`vercel.app` domain, which now returns **404 (dead)**. The site is effectively
telling Google "the real version of this page lives at a URL that no longer
exists." This single misconfiguration caps the entire site's ranking potential.

The second structural issue is that the site is a **client-side-rendered SPA**:
the served HTML body is an empty `<div id="root">`. Google can render JavaScript,
but most AI crawlers (GPTBot, ClaudeBot, PerplexityBot) and many tools cannot — so
all body content (services, reviews, the lead form) is invisible to them. Only the
`<head>` metadata and JSON-LD survive.

### Top 5 Critical / High Issues
1. **Canonical, OG & Twitter URLs point to a dead domain** (`fannycarcelesapp.vercel.app`, now 404) instead of the live `.fr` domain. *(Critical)*
2. **Sitemap and robots.txt reference the wrong/dead domain**; the sitemap lists only the dead `vercel.app` root, so the live `.fr` URL is effectively absent from the sitemap. *(Critical)*
3. **Client-side-rendered SPA** — body content not present in initial HTML; poor for AI crawlers and a rendering-dependency risk. *(High)*
4. **Repo `index.html` is stale and regressive** — it has `lang="en"`, title "Mon avis de valeur", and *no* meta description / OG / schema. A fresh `npm run build` + deploy from this repo would **wipe out every SEO improvement** currently live. *(High)*
5. **Self-serving `aggregateRating` (4.9 / 70)** in schema with no individual `Review` objects and a count that doesn't match the 5 reviews on the page — rich-result ineligible and a Google policy risk. *(High)*

### Top 5 Quick Wins
1. Update canonical + `og:url` + `twitter:url` to `https://fannycarceles-immobilier-allevard.fr/` (5-minute edit, biggest single ranking impact).
2. Fix `sitemap.xml` and `robots.txt` to use the `.fr` domain.
3. Sync the production `index.html` improvements back into the repo so deploys don't regress.
4. Add a `favicon.ico` (currently 404) and a dedicated 1200×630 `og-image`.
5. Add `mentions légales` + `politique de confidentialité` pages (legally required in France; also a trust/E-E-A-T signal).

---

## 1. Technical SEO — Score 45/100

**What works**
- HTTPS enabled, valid certificate.
- `<html lang="fr">` correct on production.
- Responsive viewport meta present; layout is mobile-friendly (Tailwind).
- `robots` meta = `index, follow`.
- `robots.txt` and `sitemap.xml` both exist and return 200.

**Findings**
- **[Critical] Canonical points to a dead domain.** `<link rel="canonical" href="https://fannycarcelesapp.vercel.app">`. That domain now returns 404. A canonical to a dead/foreign domain tells Google not to index the `.fr` URL as canonical. Fix: self-referencing canonical to `https://fannycarceles-immobilier-allevard.fr/`.
- **[Critical] Sitemap lists the wrong domain.** `sitemap.xml` contains a single `<loc>https://fannycarcelesapp.vercel.app/</loc>` (404). The live `.fr` homepage is not in any sitemap. The `robots.txt` `Sitemap:` directive also points to `vercel.app`.
- **[High] Client-side rendering.** Served HTML is a ~3.8 KB shell with an empty `#root`. No SSR/SSG/prerendering. Risk for crawl budget, AI crawlers, and any rendering failure = blank page to bots.
- **[Medium] Stale repo `index.html`.** Production `index.html` has full SEO head; the repo version (`index.html`) does not (`lang="en"`, generic title, no meta/OG/schema). Deploying from this repo regresses SEO. Reconcile the two.
- **[Low] No favicon** — `/favicon.ico` returns 404.
- **[Low] SPA deep-link handling** — `/admin` returns a server 404 rather than the SPA shell; non-root deep links aren't server-rewritten on the live host (the `netlify.toml` SPA rewrite isn't in effect on the current host). Not impactful today (single indexable URL) but worth noting.

---

## 2. Content Quality & E-E-A-T — Score 58/100

**What works**
- Original, fluent French copy with clear local positioning (Allevard, Grésivaudan, Isère).
- 5 detailed, credible client testimonials with names and dates.
- Clear service descriptions (expertise locale, réseau IAD, accompagnement A→Z).
- Strong, specific value proposition and CTA ("avis de valeur gratuit").

**Findings**
- **[High] Thin site footprint.** One indexable page (~600 words). No blog, no neighbourhood/commune landing pages, no FAQ. Severely limits long-tail and local keyword coverage (e.g. "estimation maison Allevard", "vendre appartement Goncelin").
- **[High] Body content is CSR-only** — invisible to non-JS crawlers (see Technical).
- **[Medium] Missing legal/trust pages.** No `Mentions légales` or `Politique de confidentialité`. In France these are legally required for a commercial site collecting personal data (the lead form collects name/email/phone). Also a direct E-E-A-T/trust gap.
- **[Medium] Limited author/credibility detail.** No SIRET, no RSAC/mandataire number, no bio depth or certifications. Adding these strengthens "Trust" for a YMYL (real-estate/financial) topic.
- **[Low] No content freshness mechanism** (blog/news), which AI engines and Google reward for local authority.

---

## 3. On-Page SEO — Score 62/100

**What works**
- **Excellent title:** "Fanny Carceles | Conseillère Immobilière - Allevard et ses environs" (keyword + brand + location, good length).
- **Excellent meta description** with location, service and CTA.
- Keyword-rich `keywords`/`author` meta and natural on-page keyword usage.

**Findings**
- **[Medium] H1 is the brand name only.** The single `<h1>` is "Fanny Carceles" (header logo); the hero value proposition "Vendez votre bien au meilleur prix" is an `<h2>`. Recommend a keyword-bearing H1 such as "Conseillère immobilière à Allevard — Avis de valeur gratuit" (keep the logo as styled text, not H1).
- **[Medium] One URL = one keyword target.** No internal content pages means no internal linking depth and a single ranking surface.
- **[Low] Anchor-only navigation** (`#services`, `#avis`) — fine for UX, but no crawlable secondary pages.

---

## 4. Schema / Structured Data — Score 60/100

**What works**
- Valid `RealEstateAgent` JSON-LD present with `name`, `jobTitle`, `image`, `telephone`, `email`, `areaServed`, `address` (region), and `sameAs` (Facebook, Instagram, Immodvisor).

**Findings**
- **[High] Self-serving `aggregateRating`.** `ratingValue 4.9 / reviewCount 70` is embedded by the business about itself, with **no individual `Review` objects** and a count (70) that doesn't match the 5 reviews displayed. Google does not show rich-result stars for self-serving LocalBusiness/RealEstateAgent reviews, and inflated/unverifiable counts are a structured-data policy risk. Either: (a) add individual `Review` items that match on-page testimonials, or (b) remove `aggregateRating` and rely on third-party (Immodvisor) review signals.
- **[Medium] Schema gaps.** Missing `url`, `priceRange`, `description`, and a proper `PostalAddress` (street optional for SAB, but add `url` + `hasMap`/GBP link). No `WebSite` schema, no `BreadcrumbList`, no `FAQPage`.
- **[Low] `og:image`/schema image is a square profile photo** used where a 1200×630 image is expected.

---

## 5. Performance (Core Web Vitals) — Score 55/100 *(lab estimate; no field data)*

**Observations** (static analysis — no CrUX field data available)
- **LCP risk:** hero background is a full-size Unsplash image (`w=2000`) loaded eagerly behind the headline; likely the LCP element. Serve a properly sized/compressed, `fetchpriority="high"` local image.
- **CLS risk:** images (`<img>`) have no explicit `width`/`height` attributes → layout shift during load. The animated marquee and gradient text also animate layout/paint.
- **JS weight:** single bundle including React 19 + `react-router-dom` + `motion` (Framer Motion) + `lucide-react`. Framer Motion is heavy for a one-pager; consider CSS animations or code-splitting.
- **Render-blocking:** Google Fonts stylesheet in `<head>` (preconnect present — good; consider `display=swap` is already set, and self-hosting for further gains).
- No lazy-loading on below-the-fold images.

> Recommend running PageSpeed Insights / CrUX once indexing on the `.fr` domain stabilises to capture real field data.

---

## 6. Images — Score 60/100

**What works**
- **All images have descriptive `alt` text** ("Fanny Carceles", "Vallée du Grésivaudan").
- `referrerPolicy="no-referrer"` set on external images.

**Findings**
- **[Medium] No `width`/`height`** on any `<img>` → CLS.
- **[Medium] Externally hosted hero & profile** (Unsplash, iadfrance CDN) — no control over compression/format/availability; hero is oversized (2000px).
- **[Low] No `loading="lazy"`** on below-fold images; no WebP/AVIF strategy.
- **[Low] OG image** is a square profile picture rather than a 1200×630 social card.

---

## 7. AI Search Readiness (GEO) — Score 45/100

**What works**
- JSON-LD `RealEstateAgent` block is in the static `<head>` — visible to AI crawlers and a citability anchor.
- Clean, factual brand/NAP signals in metadata.

**Findings**
- **[High] Body content invisible to AI crawlers.** Because the page is CSR, GPTBot/ClaudeBot/PerplexityBot see an empty body — services, testimonials, and the offer aren't citable. Prerender/SSG the homepage so the answer-bearing content is in static HTML.
- **[Medium] No `llms.txt`** and no `FAQPage` schema. A short FAQ ("Comment obtenir un avis de valeur à Allevard ?", "Quelles communes couvrez-vous ?") in static HTML + `FAQPage` schema is high-leverage for AI answers.
- **[Medium] Wrong-domain canonical/OG** also confuses AI engines about the authoritative URL.

---

## Methodology & Limitations
- Homepage rendered and raw HTML inspected directly; `robots.txt`, `sitemap.xml`, `/admin`, the `vercel.app` duplicate, favicon and og-image probed via HTTP.
- Source code reviewed in the local repo (`index.html`, `src/App.tsx`, `src/pages/Home.tsx`, configs).
- Site is a single indexable URL, so no multi-page crawl was required.
- Core Web Vitals are **lab/heuristic estimates** — no CrUX field data or Lighthouse run was available in this environment. Treat performance scores as directional.
