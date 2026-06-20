# Content / GEO / Local — Findings

## Content Quality & E-E-A-T (58/100)
**Strengths:** original, fluent French; clear local intent (Allevard, Grésivaudan,
Isère); 5 named, dated, credible testimonials; sharp value prop + CTA ("avis de
valeur gratuit").

**Gaps:**
- **Thin footprint** — one indexable page (~600 words). No blog, commune pages, or FAQ → minimal long-tail coverage.
- **CSR body** — content not in static HTML (see technical.md).
- **Missing legal pages** — no `Mentions légales` / `Politique de confidentialité`. The lead form collects name/email/phone → these are **legally required in France (RGPD + LCEN)** and are also a trust signal.
- **Author credibility** — no SIRET / RSAC (mandataire) number, thin bio. For a YMYL real-estate topic, add these to strengthen "Trust".

## Local SEO (Local Service — SAB / personal brand)
**Strengths:** NAP partly present (name, phone `06 45 00 37 52`, email
`fanny.carceles@iadfrance.fr`); `areaServed` in schema; Immodvisor + IAD profiles
linked; Facebook/Instagram linked.

**Gaps / recommendations:**
- No physical street address — acceptable for a service-area business, but link a **Google Business Profile** and keep NAP byte-identical across site, GBP, IAD, Immodvisor.
- Add commune-level landing pages (Allevard, Goncelin, La Rochette, Pontcharra, Crêts en Belledonne…) for "estimation / vente [type] [commune]" queries.
- Surface phone/email as crawlable text (already present in footer — good).

## AI Search Readiness / GEO (45/100)
- **JSON-LD in static head** is the one thing AI crawlers can read today — keep and enrich it.
- **Body is invisible to AI crawlers** because of CSR. Prerender so services,
  testimonials and the offer become citable.
- Add a **static FAQ + `FAQPage` schema** (e.g. "Comment se passe un avis de valeur
  à Allevard ?", "Quelles communes couvrez-vous ?", "L'estimation est-elle
  gratuite ?") — high leverage for AI Overviews / ChatGPT / Perplexity answers.
- Add an **`llms.txt`** summarising who Fanny is, area served, and how to contact.
- Fix the wrong-domain canonical/OG so AI engines attribute content to the `.fr` brand domain.
