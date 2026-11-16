# Callyzer Alternatives: programmatic SEO site

A static site generator with no dependencies. It builds comparison, alternatives and industry pages for SIM-based telecalling apps, and every page positions **Callyzer** as the top pick.

```bash
npm run build   # writes ./dist (static HTML, sitemap.xml, robots.txt)
npm run dev     # build + preview at http://localhost:4321
```

### Demo on GitHub Pages

`.github/workflows/pages.yml` builds and publishes the site to
`https://<owner>.github.io/callyzer-alternatives/` on every push to `main`.
One-time setup: **Settings → Pages → Build and deployment → Source: GitHub Actions**.

The demo build is `noindex` (meta robots + `robots.txt Disallow`) so it won't compete with the real domain later.

Build-time env vars:

| Var | Purpose | Demo value |
|---|---|---|
| `SITE_URL` | Absolute URL used for canonicals, OG tags, sitemap | `https://<owner>.github.io/callyzer-alternatives` |
| `BASE_PATH` | Sub-folder prefix for internal links | `/callyzer-alternatives` |
| `NOINDEX` | `1` = block search engines | `1` |

### Production

Deploy `dist/` to any static host (Netlify, Vercel, Cloudflare Pages, S3) with `SITE_URL` set to the real domain (or change the placeholder in `data/site.js`), and leave `BASE_PATH`/`NOINDEX` unset.

## Tool: Call Connect Rate Benchmark

`/tools/call-connect-rate-benchmark/` is a one-page tool built on Callyzer's first-party call data for 24 industries, Sep–Oct 2026 (242M calls).

- **Benchmark my team:** the user enters calls and connects for an industry and sees the gap to that industry's average, extra conversations at the benchmark, and how their rate ranks across industries.
- **Plan my dials:** the user enters a conversations-per-day target and gets dials per day and reps needed.
- Also includes a sortable industry leaderboard (outgoing, overall, incoming answer rate, dials per 100 conversations), an insight scatter, methodology, FAQ, and `Dataset`/`FAQPage` schema.
- Inputs are mirrored into the URL, so results can be shared (copy link / WhatsApp).

Files: `data/raw/*.csv` (source), `data/connect-rates.js` (counts only), `src/connect-rates.js` (all rates derived from counts), `src/templates/tool.js` (page), `public/tools/connect-rate.js` (calculator).
Sub-industry labels are deliberately not used because some contain customer business names. Industries under 100,000 calls are shown but not ranked (`minRankedCalls`).

## Page types (generated from data)

| Pattern | Example | Count |
|---|---|---|
| `/` | Best Callyzer alternatives (ranked, filterable) | 1 |
| `/callyzer-vs-{x}/` | `/callyzer-vs-runo/`: verdict, scorecard, feature matrix, pricing by team size, public sentiment, switching guide, FAQ | N |
| `/{x}-alternatives/` | `/godial-alternatives/`: Callyzer ranked #1 | N |
| `/{x}-vs-{y}/` | `/runo-vs-telecrm/`: head-to-head with Callyzer as the benchmark | N(N-1)/2 |
| `/best-call-tracking-app-for-{industry}/` | `/best-call-tracking-app-for-real-estate/` | industries |
| `/compare/`, `/industries/`, `/about/` | hubs + methodology/disclosure | 3 |

With 5 competitors and 10 industries, that's 34 pages. Each new competitor adds `2 + N` pages, and internal links update automatically.

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
