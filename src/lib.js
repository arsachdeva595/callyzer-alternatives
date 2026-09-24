import { site } from '../data/site.js';
import { scoreDimensions } from '../data/features.js';

export const esc = (s = '') =>
  String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

export const abs = (path) => site.baseUrl.replace(/\/$/, '') + path;

export const inr = (n) => '₹' + Number(n).toLocaleString('en-IN');

export const priceLabel = (p) => (p.startingInr == null ? 'On request' : `${inr(p.startingInr)}`);

export const overall = (scores) => {
  const vals = scoreDimensions.map((d) => scores[d.id]);
  return Math.round((vals.reduce((a, b) => a + b, 0) / vals.length) * 10) / 10;
};

export const featureValue = (raw) => (typeof raw === 'object' && raw ? raw : { v: raw || 'no' });

const CELL = {
  yes: { icon: '✓', cls: 'yes', text: 'Yes' },
  partial: { icon: '◐', cls: 'partial', text: 'Partial' },
  addon: { icon: '+', cls: 'partial', text: 'Add-on' },
  no: { icon: '✕', cls: 'no', text: 'No' },
};

export const featureCell = (raw) => {
  const { v, note } = featureValue(raw);
  const c = CELL[v] || CELL.no;
  return `<span class="cell ${c.cls}"><span aria-hidden="true">${c.icon}</span> ${esc(note || c.text)}</span>`;
};

export const logo = (p, size = 'md') =>
  `<span class="logo logo-${size}" style="--brand:${p.color}" aria-hidden="true">${esc(p.logoText)}</span>`;

export const scoreBar = (label, value, isWinner) => `
  <div class="bar-row">
    <span class="bar-label">${esc(label)}</span>
    <span class="bar"><span class="bar-fill${isWinner ? ' win' : ''}" style="width:${value * 10}%"></span></span>
    <span class="bar-val">${value.toFixed(1)}</span>
  </div>`;

export const jsonLd = (obj) => `<script type="application/ld+json">${JSON.stringify(obj).replace(/</g, '\\u003c')}</script>`;

export const faqSchema = (faqs) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
});

export const breadcrumbSchema = (items) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.name, item: abs(it.path) })),
});

export const breadcrumbs = (items) =>
  `<nav class="crumbs" aria-label="Breadcrumb">${items
    .map((it, i) => (i === items.length - 1 ? `<span>${esc(it.name)}</span>` : `<a href="${it.path}">${esc(it.name)}</a>`))
    .join('<span class="sep">/</span>')}</nav>`;

export const faqBlock = (faqs) => `
  <section class="section" id="faq">
    <h2>Frequently asked questions</h2>
    <div class="faq">
      ${faqs.map((f) => `<details><summary>${esc(f.q)}</summary><p>${esc(f.a)}</p></details>`).join('')}
    </div>
  </section>`;

export const ctaBox = (heading = 'Track every call your team makes — starting today') => `
  <aside class="cta">
    <div>
      <h2>${esc(heading)}</h2>
      <p>Install Callyzer on your team’s phones and see calls, recordings and reports on one dashboard in minutes. No new dialer, no VoIP numbers.</p>
    </div>
    <div class="cta-actions">
      <a class="btn btn-primary" href="${site.ctaUrl}" rel="noopener">Start free trial</a>
      <a class="btn btn-ghost" href="${site.demoUrl}" rel="noopener">Book a demo</a>
    </div>
  </aside>`;

export const vsSlug = (a, b) => `/${a.slug}-vs-${b.slug}/`;
export const altSlug = (c) => `/${c.slug}-alternatives/`;
export const industrySlug = (i) => `/best-call-tracking-app-for-${i.slug}/`;
