# Callyzer Alternatives: programmatic SEO site

A static site generator with no dependencies. It builds comparison, alternatives and industry pages for SIM-based telecalling apps, and every page positions **Callyzer** as the top pick.

```bash
npm run build   # writes ./dist (static HTML, sitemap.xml, robots.txt)
npm run dev     # build + preview at http://localhost:4321
```

Deploy `dist/` to any static host (Netlify, Vercel, Cloudflare Pages, S3). Set `baseUrl` in `data/site.js` first.

## Page types (generated from data)

| Pattern | Example | Count |
|---|---|---|
| `/` | Best Callyzer alternatives (ranked, filterable) | 1 |
| `/callyzer-vs-{x}/` | `/callyzer-vs-runo/`: verdict, scorecard, feature matrix, pricing by team size, public sentiment, switching guide, FAQ | N |
| `/{x}-alternatives/` | `/godial-alternatives/`: Callyzer ranked #1 | N |
| `/{x}-vs-{y}/` | `/runo-vs-telecrm/`: head-to-head with Callyzer as the benchmark | N(N-1)/2 |
| `/best-call-tracking-app-for-{industry}/` | `/best-call-tracking-app-for-real-estate/` | industries |
| `/compare/`, `/industries/`, `/about/` | hubs + methodology/disclosure | 3 |

With 5 competitors and 10 industries, that's 36 pages. Each new competitor adds `2 + N` pages, and internal links update automatically.

Every page includes a canonical URL, OG tags, `FAQPage`, `BreadcrumbList` and `ItemList`/`Article` JSON-LD, and appears in the sitemap.

## Data files

- `data/callyzer.js`: Callyzer profile, features and scores
- `data/competitors.js`: one object per competitor (pricing, features, scores, praise/complaint themes, Callyzer edge, switching steps, FAQs, sourced quotes)
- `data/features.js`: feature matrix rows and score dimensions
- `data/industries.js`: industry pages
- `data/site.js`: domain, CTA URLs (with UTM), disclosure

## Before launch: verification checklist

- [ ] **Sentiment themes**: validate each `praiseThemes`/`complaintThemes` entry against real Reddit / G2 / Play Store threads, and add verbatim quotes with links to `quotes: [{ text, source, url }]`. Never invent quotes.
- [ ] **Pricing**: re-check every vendor's current price (NeoDove and Cratio are "On request").
- [ ] **Feature cells**: confirm competitor ✓/◐/✕ values, and the Callyzer items marked `VERIFY`.
- [ ] Replace `baseUrl`, add real logos if you have permission, and submit `sitemap.xml` to Search Console.
- [ ] Keep the footer disclosure. It tells readers the Callyzer team publishes the site, which keeps the site credible and compliant.
