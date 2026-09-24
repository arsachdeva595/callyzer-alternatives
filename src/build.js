import { mkdirSync, writeFileSync, rmSync, cpSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { site } from '../data/site.js';
import { callyzer } from '../data/callyzer.js';
import { competitors } from '../data/competitors.js';
import { industries } from '../data/industries.js';
import { abs, vsSlug, altSlug, industrySlug } from './lib.js';
import {
  homePage, vsPage, headToHeadPage, alternativesPage, industryPage, compareHub, industriesHub, aboutPage, h2hPath,
} from './templates/pages.js';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const out = join(root, 'dist');
rmSync(out, { recursive: true, force: true });
cpSync(join(root, 'public'), out, { recursive: true });

const pages = [];
const emit = (path, html, priority = 0.7) => {
  const dir = join(out, path);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, 'index.html'), html);
  pages.push({ path, priority });
};

const pairs = [];
competitors.forEach((a, i) => competitors.slice(i + 1).forEach((b) => pairs.push([a, b])));

emit('/', homePage(), 1.0);
competitors.forEach((c) => emit(vsSlug(callyzer, c), vsPage(c), 0.9));
competitors.forEach((c) => emit(altSlug(c), alternativesPage(c), 0.8));
pairs.forEach(([a, b]) => emit(h2hPath(a, b), headToHeadPage(a, b), 0.6));
industries.forEach((ind) => emit(industrySlug(ind), industryPage(ind), 0.7));
emit('/compare/', compareHub(pairs), 0.5);
emit('/industries/', industriesHub(), 0.5);
emit('/about/', aboutPage(), 0.3);

writeFileSync(
  join(out, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${pages
    .map((p) => `  <url><loc>${abs(p.path)}</loc><lastmod>${site.lastUpdated}</lastmod><priority>${p.priority.toFixed(1)}</priority></url>`)
    .join('\n')}\n</urlset>\n`,
);
writeFileSync(join(out, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${abs('/sitemap.xml')}\n`);

console.log(`Built ${pages.length} pages into dist/`);
