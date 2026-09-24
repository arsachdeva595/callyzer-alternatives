import { site } from '../../data/site.js';
import { competitors } from '../../data/competitors.js';
import { industries } from '../../data/industries.js';
import { esc, abs, jsonLd, vsSlug, altSlug, industrySlug } from '../lib.js';
import { callyzer } from '../../data/callyzer.js';

export function layout({ title, description, path, body, schema = [] }) {
  const canonical = abs(path);
  return `<!doctype html>
<html lang="en-IN">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<link rel="canonical" href="${canonical}">
<meta property="og:type" content="article">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${canonical}">
<meta property="og:site_name" content="${esc(site.name)}">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="stylesheet" href="/styles.css">
${schema.map(jsonLd).join('\n')}
</head>
<body>
<header class="topbar">
  <div class="wrap topbar-inner">
    <a class="brand" href="/"><span class="brand-mark">C</span> ${esc(site.name)}</a>
    <nav class="topnav">
      <a href="/compare/">Comparisons</a>
      <a href="/industries/">By industry</a>
      <a href="/about/">Methodology</a>
      <a class="btn btn-primary btn-sm" href="${site.ctaUrl}" rel="noopener">Try Callyzer</a>
    </nav>
  </div>
</header>
<main>
${body}
</main>
<footer class="footer">
  <div class="wrap footer-grid">
    <div>
      <h3>Callyzer vs</h3>
      <ul>${competitors.map((c) => `<li><a href="${vsSlug(callyzer, c)}">Callyzer vs ${esc(c.name)}</a></li>`).join('')}</ul>
    </div>
    <div>
      <h3>Alternatives</h3>
      <ul><li><a href="/">Callyzer alternatives</a></li>${competitors.map((c) => `<li><a href="${altSlug(c)}">${esc(c.name)} alternatives</a></li>`).join('')}</ul>
    </div>
    <div>
      <h3>By industry</h3>
      <ul>${industries.map((i) => `<li><a href="${industrySlug(i)}">${esc(i.name)}</a></li>`).join('')}</ul>
    </div>
    <div>
      <h3>About</h3>
      <p class="muted small">${esc(site.disclosure)}</p>
      <p class="muted small">Last updated ${esc(site.lastUpdated)}.</p>
    </div>
  </div>
  <div class="wrap small muted footer-bottom">© ${site.year} ${esc(site.name)}. All trademarks belong to their respective owners.</div>
</footer>
<script src="/app.js" defer></script>
</body>
</html>`;
}
