# Schema / Structured Data — Findings

**Score: 60/100**

## Current implementation (production `<head>`)
A single `RealEstateAgent` JSON-LD block:
- ✅ `name`, `jobTitle`, `image`, `telephone` (+33645003752), `email`
- ✅ `areaServed`: Allevard, Isère, Vallée du Grésivaudan
- ✅ `address`: PostalAddress with `addressRegion` Isère, `addressCountry` FR
- ✅ `sameAs`: Facebook, Instagram, Immodvisor
- ⚠️ `aggregateRating`: `ratingValue 4.9`, `reviewCount 70`

## Issues
1. **Self-serving `aggregateRating` (High).** The business marks up its own rating
   with no individual `Review` nodes, and `reviewCount` (70) does not match the 5
   testimonials shown on the page. Google does not render review rich results for
   self-serving LocalBusiness/RealEstateAgent ratings, and unverifiable counts risk
   a structured-data manual action.
   - **Fix A:** add `review: [...]` with the 5 on-page testimonials
     (`author`, `reviewBody`, `datePublished`, `reviewRating.ratingValue`), and set
     `reviewCount` to the real number.
   - **Fix B (simpler/safer):** remove `aggregateRating` and let the linked
     Immodvisor profile carry third-party review signals.

2. **Missing properties (Medium):** `url` (self), `priceRange`, `description`,
   `hasMap`/GBP link. Add a `WebSite` node and, once an FAQ exists, a `FAQPage` node.

3. **Image (Low):** schema/OG `image` is a square profile photo; provide a
   dedicated 1200×630 asset for social/rich contexts.

## Recommended additions
- `FAQPage` (after adding a static FAQ) — strong for AI Overviews & snippets.
- `BreadcrumbList` if/when secondary pages are added.
- `Person` node for Fanny linked via `employee`/`founder` to reinforce E-E-A-T.
