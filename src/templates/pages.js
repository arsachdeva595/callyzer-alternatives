import { site } from '../../data/site.js';
import { callyzer } from '../../data/callyzer.js';
import { competitors } from '../../data/competitors.js';
import { industries } from '../../data/industries.js';
import { featureGroups, scoreDimensions } from '../../data/features.js';
import { layout } from './layout.js';
import {
  esc, inr, priceLabel, overall, featureCell, logo, scoreBar, faqBlock, faqSchema, breadcrumbs,
  breadcrumbSchema, ctaBox, vsSlug, altSlug, industrySlug, featureValue,
} from '../lib.js';

const Y = site.year;
const TEAM_SIZES = [5, 10, 25, 50, 100];
const bySlug = (s) => competitors.find((c) => c.slug === s);

// ---------- shared fragments ----------

const updated = () => `<p class="meta">Updated <time datetime="${site.lastUpdated}">${site.lastUpdated}</time> · Based on vendor sites, app-store & review-platform feedback and community discussions</p>`;

const headerCell = (p) => `<th scope="col"><span class="th-prod">${logo(p, 'sm')} ${esc(p.name)}</span></th>`;

function featureMatrix(products) {
  return `
  <div class="table-scroll">
  <table class="matrix">
    <thead><tr><th scope="col">Feature</th>${products.map(headerCell).join('')}</tr></thead>
    <tbody>
      ${featureGroups
        .map(
          (g) => `
        <tr class="group"><th colspan="${products.length + 1}" scope="colgroup">${esc(g.group)}</th></tr>
        ${g.items
          .map((it) => `<tr><th scope="row">${esc(it.label)}</th>${products.map((p, i) => `<td class="${i === 0 ? 'col-win' : ''}">${featureCell(p.features[it.id])}</td>`).join('')}</tr>`)
          .join('')}`,
        )
        .join('')}
    </tbody>
  </table>
  </div>
  <p class="small muted">✓ Yes · ◐ Partial / plan-dependent · ✕ Not available. Competitor capabilities are based on public information and may vary by plan.</p>`;
}

function scoreCards(products) {
  return `<div class="score-grid cols-${products.length}">
    ${products
      .map(
        (p, i) => `
      <div class="score-card${i === 0 ? ' winner' : ''}">
        ${i === 0 ? '<span class="ribbon">Our pick</span>' : ''}
        <div class="score-head">${logo(p)}<div><strong>${esc(p.name)}</strong><div class="big-score">${overall(p.scores).toFixed(1)}<small>/10</small></div></div></div>
        ${scoreDimensions.map((d) => scoreBar(d.label, p.scores[d.id], i === 0)).join('')}
      </div>`,
      )
      .join('')}
  </div>`;
}

function pricingTable(products) {
  const known = products.filter((p) => p.pricing.startingInr != null);
  return `
  <div class="table-scroll">
  <table class="matrix pricing">
    <thead><tr><th scope="col">Team size (monthly, starting price)</th>${products.map(headerCell).join('')}</tr></thead>
    <tbody>
      <tr><th scope="row">Starting price</th>${products.map((p, i) => `<td class="${i === 0 ? 'col-win' : ''}"><strong>${priceLabel(p.pricing)}</strong><div class="small muted">${esc(p.pricing.unit)}</div></td>`).join('')}</tr>
      ${TEAM_SIZES.map(
        (n) => `<tr><th scope="row">${n} telecallers</th>${products
          .map((p, i) => `<td class="${i === 0 ? 'col-win' : ''}">${p.pricing.startingInr == null ? '<span class="muted">Quote</span>' : inr(p.pricing.startingInr * n)}</td>`)
          .join('')}</tr>`,
      ).join('')}
    </tbody>
  </table>
  </div>
  <p class="small muted">${products.map((p) => `<strong>${esc(p.name)}:</strong> ${esc(p.pricing.note)}`).join(' ')} ${known.length < products.length ? 'Vendors marked “Quote” do not publish prices.' : ''}</p>`;
}

function savingsLine(c) {
  if (c.pricing.startingInr == null) return `${esc(c.name)} doesn’t publish its pricing, while Callyzer starts at ${inr(callyzer.pricing.startingInr)} ${esc(callyzer.pricing.unit)} — you can budget for a full team without a sales call.`;
  const diff = (c.pricing.startingInr - callyzer.pricing.startingInr) * 25;
  const pct = Math.round((1 - callyzer.pricing.startingInr / c.pricing.startingInr) * 100);
  return `At starting prices, a 25-member team pays <strong>${inr(diff)} less every month</strong> (${inr(diff * 12)} a year) with Callyzer — about ${pct}% lower than ${esc(c.name)}.`;
}

function themes(list, tone) {
  return `<ul class="themes ${tone}">${list.map((t) => `<li><strong>${esc(t.title)}.</strong> ${esc(t.detail)}</li>`).join('')}</ul>`;
}

function quotes(c) {
  if (!c.quotes?.length) return '';
  return `<div class="quotes">${c.quotes
    .map((q) => `<blockquote><p>“${esc(q.text)}”</p><cite><a href="${esc(q.url)}" rel="nofollow noopener">${esc(q.source)}</a></cite></blockquote>`)
    .join('')}</div>`;
}

function sourcesList(list) {
  return `<p class="small muted">Sources: ${list.map((s) => `<a href="${esc(s.url)}" rel="nofollow noopener">${esc(s.label)}</a>`).join(' · ')}</p>`;
}

function glance(products) {
  const rows = [
    ['Best for', (p) => esc(p.bestFor)],
    ['Starting price', (p) => `${priceLabel(p.pricing)} <span class="muted small">${esc(p.pricing.unit)}</span>`],
    ['Platforms', (p) => esc(p.platforms.join(', '))],
    ['Overall score', (p) => `<strong>${overall(p.scores).toFixed(1)}</strong>/10`],
  ];
  return `<div class="table-scroll"><table class="matrix glance"><thead><tr><th></th>${products.map(headerCell).join('')}</tr></thead><tbody>
    ${rows.map(([l, f]) => `<tr><th scope="row">${l}</th>${products.map((p, i) => `<td class="${i === 0 ? 'col-win' : ''}">${f(p)}</td>`).join('')}</tr>`).join('')}
  </tbody></table></div>`;
}

function relatedLinks(exclude = []) {
  const links = [
    ...competitors.filter((c) => !exclude.includes(c.slug)).map((c) => ({ href: vsSlug(callyzer, c), label: `Callyzer vs ${c.name}` })),
    ...competitors.filter((c) => !exclude.includes(c.slug)).map((c) => ({ href: altSlug(c), label: `${c.name} alternatives` })),
  ].slice(0, 8);
  return `<section class="section"><h2>More comparisons</h2><div class="link-grid">${links.map((l) => `<a class="link-card" href="${l.href}">${esc(l.label)} →</a>`).join('')}</div></section>`;
}

function rankCard(p, rank, { pick = false, extra = '' } = {}) {
  const isCallyzer = p.slug === 'callyzer';
  return `
  <article class="rank-card${pick ? ' pick' : ''}" data-tags="${esc(tagsFor(p).join(','))}">
    <div class="rank-num">${rank}</div>
    <div class="rank-body">
      <div class="rank-head">
        ${logo(p)}
        <div>
          <h3>${esc(p.name)} ${pick ? '<span class="badge">Best overall</span>' : ''}</h3>
          <p class="best-for"><strong>Best for:</strong> ${esc(p.bestFor)}</p>
        </div>
        <div class="rank-score"><span>${overall(p.scores).toFixed(1)}</span><small>/10</small></div>
      </div>
      <p>${esc(isCallyzer ? callyzer.overview : p.summary)}</p>
      ${extra}
      <div class="tags">${tagsFor(p).map((t) => `<span class="tag">${esc(t)}</span>`).join('')}</div>
      <div class="rank-foot">
        <span><strong>${priceLabel(p.pricing)}</strong> <span class="muted small">${esc(p.pricing.unit)}</span></span>
        <span class="rank-links">
          ${isCallyzer ? `<a class="btn btn-primary btn-sm" href="${site.ctaUrl}" rel="noopener">Try Callyzer free</a>` : `<a href="${vsSlug(callyzer, p)}">Callyzer vs ${esc(p.name)}</a> · <a href="${altSlug(p)}">${esc(p.name)} alternatives</a>`}
        </span>
      </div>
    </div>
  </article>`;
}

function tagsFor(p) {
  const t = [];
  const has = (id) => featureValue(p.features[id]).v === 'yes';
  if (has('simTracking')) t.push('SIM-based');
  if (has('recording')) t.push('Call recording');
  if (has('autoDialer')) t.push('Auto dialer');
  if (has('whatsapp')) t.push('WhatsApp');
  if (has('reportDepth')) t.push('30+ reports');
  if (p.pricing.startingInr != null) t.push('Transparent pricing');
  if (has('setupTime')) t.push('Same-day setup');
  return t;
}

// ---------- page: home (Callyzer alternatives) ----------

export function homePage() {
  const all = [callyzer, ...competitors];
  const allTags = [...new Set(all.flatMap(tagsFor))];
  const faqs = [
    { q: `What are the best Callyzer alternatives in ${Y}?`, a: `The most-compared Callyzer alternatives are ${competitors.map((c) => c.name).join(', ')}. Each covers part of what Callyzer does, but none combines full SIM call tracking, included recordings, 30+ reports and per-number pricing from ${inr(callyzer.pricing.startingInr)}.` },
    { q: 'Why do people look for Callyzer alternatives?', a: 'Usually to check whether a tool with an auto dialer, WhatsApp automation or a full CRM fits better. Most teams find Callyzer already covers calling needs and integrates with their CRM for the rest.' },
    { q: 'Which Callyzer alternative is cheapest?', a: `Among tools with published pricing, GoDial starts at ${inr(bySlug('godial').pricing.startingInr)}, Runo at ${inr(bySlug('runo').pricing.startingInr)} and TeleCRM around ${inr(bySlug('telecrm').pricing.startingInr)} per user per month — all above Callyzer’s ${inr(callyzer.pricing.startingInr)} starting price.` },
    { q: 'Is SIM-based call tracking better than cloud telephony?', a: 'For Indian sales teams calling mobile numbers, SIM-based calls usually get higher pick-up rates because customers see a regular mobile number rather than an unknown landline or virtual number. It also avoids VoIP setup and per-minute charges.' },
  ];
  const body = `
  <section class="hero">
    <div class="wrap">
      ${breadcrumbs([{ name: 'Home', path: '/' }, { name: 'Callyzer alternatives', path: '/' }])}
      <h1>Best Callyzer Alternatives in ${Y}: ${competitors.length} SIM-Based Telecalling Apps Compared</h1>
      <p class="lede">We compared ${competitors.length} popular alternatives to Callyzer on call tracking, recordings, reports, pricing and what real users say. Here’s how they stack up — and why most Indian telecalling teams still end up on Callyzer.</p>
      ${updated()}
    </div>
  </section>
  <div class="wrap">
    <section class="verdict">
      <div class="verdict-icon">🏆</div>
      <div>
        <h2>Short answer</h2>
        <p><strong>Callyzer remains the best choice for SIM-based call tracking</strong> — it captures every call on the business SIM, includes recordings, ships 30+ reports and starts at ${inr(callyzer.pricing.startingInr)} ${esc(callyzer.pricing.unit)}. Alternatives make sense only for narrow cases: ${competitors.map((c) => `<a href="${vsSlug(callyzer, c)}">${esc(c.name)}</a> (${esc(c.bestFor.toLowerCase())})`).join(', ')}.</p>
      </div>
    </section>

    <section class="section">
      <h2>Ranked: Callyzer and its top alternatives</h2>
      <div class="filters" role="group" aria-label="Filter by feature">
        <button class="chip active" data-filter="all">All</button>
        ${allTags.map((t) => `<button class="chip" data-filter="${esc(t)}">${esc(t)}</button>`).join('')}
      </div>
      <div class="rank-list">
        ${rankCard(callyzer, 1, { pick: true, extra: `<ul class="checks">${callyzer.highlights.slice(0, 4).map((h) => `<li>${esc(h)}</li>`).join('')}</ul>` })}
        ${competitors.map((c, i) => rankCard(c, i + 2)).join('')}
      </div>
    </section>

    <section class="section">
      <h2>At a glance</h2>
      ${glance(all)}
    </section>

    <section class="section">
      <h2>Feature comparison</h2>
      ${featureMatrix(all)}
    </section>

    ${ctaBox()}

    <section class="section">
      <h2>How we pick the best telecalling app</h2>
      <div class="cards-3">
        <div class="card"><h3>SIM-first</h3><p>We only compare tools that work on regular Indian SIMs — the setup most telecalling teams actually use.</p></div>
        <div class="card"><h3>Real-world sentiment</h3><p>We read app-store reviews, review platforms, Reddit and LinkedIn threads to find recurring praise and complaints.</p></div>
        <div class="card"><h3>Cost at team scale</h3><p>We price every tool for 5 to 100 telecallers, because per-seat differences compound fast.</p></div>
      </div>
      <p><a href="/about/">Read our full methodology →</a></p>
    </section>

    ${faqBlock(faqs)}
    ${relatedLinks()}
  </div>`;
  return layout({
    title: `${competitors.length} Best Callyzer Alternatives & Competitors (${Y}) — Compared`,
    description: `Compare Callyzer with ${competitors.map((c) => c.name).join(', ')} on SIM call tracking, recording, reports and pricing. See why Callyzer is still the top pick for Indian telecalling teams.`,
    path: '/',
    body,
    schema: [
      faqSchema(faqs),
      breadcrumbSchema([{ name: 'Home', path: '/' }]),
      {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: `Best Callyzer alternatives ${Y}`,
        itemListElement: all.map((p, i) => ({ '@type': 'ListItem', position: i + 1, name: p.name, url: p.url })),
      },
    ],
  });
}

// ---------- page: Callyzer vs X ----------

export function vsPage(c) {
  const products = [callyzer, c];
  const path = vsSlug(callyzer, c);
  const faqs = [
    { q: `Which is better, Callyzer or ${c.name}?`, a: `For most Indian telecalling teams, Callyzer. It scores ${overall(callyzer.scores)}/10 vs ${overall(c.scores)}/10 in our evaluation, tracks every call on the SIM (not just dialer calls), includes recordings and costs less per seat. ${c.name} is a fit mainly if: ${c.chooseCompetitorIf[0].toLowerCase()}.` },
    ...c.faqs,
    { q: `Is there a free trial for Callyzer and ${c.name}?`, a: `Callyzer offers a free trial so you can compare call data with your current setup. ${c.name}’s trial terms vary — check their website.` },
  ];
  const crumbs = [{ name: 'Home', path: '/' }, { name: 'Comparisons', path: '/compare/' }, { name: `Callyzer vs ${c.name}`, path }];
  const body = `
  <section class="hero">
    <div class="wrap">
      ${breadcrumbs(crumbs)}
      <div class="vs-logos">${logo(callyzer, 'lg')}<span class="vs">vs</span>${logo(c, 'lg')}</div>
      <h1>Callyzer vs ${esc(c.name)} (${Y}): Which Telecalling App Is Better?</h1>
      <p class="lede">A deep, side-by-side look at Callyzer and ${esc(c.name)} — features, real pricing for your team size, what users praise and complain about, and which one fits your calling team.</p>
      ${updated()}
      <nav class="toc" aria-label="On this page">
        <a href="#verdict">Verdict</a><a href="#scores">Scores</a><a href="#features">Features</a><a href="#pricing">Pricing</a><a href="#sentiment">What users say</a><a href="#why">Why Callyzer</a><a href="#switch">Switching</a><a href="#faq">FAQ</a>
      </nav>
    </div>
  </section>
  <div class="wrap">
    <section class="verdict" id="verdict">
      <div class="verdict-icon">🏆</div>
      <div>
        <h2>Verdict: Callyzer wins</h2>
        <p><strong>Callyzer is the better choice for most teams.</strong> ${esc(c.name)} is a capable ${esc(c.bestFor.toLowerCase())} tool, but Callyzer captures <em>every</em> call on the business SIM, includes recordings at no extra cost, gives managers deeper reports and is cheaper to roll out across the whole team.</p>
        <p>${savingsLine(c)}</p>
        <a class="btn btn-primary" href="${site.ctaUrl}" rel="noopener">Try Callyzer free</a>
      </div>
    </section>

    <section class="section">
      <h2>Callyzer vs ${esc(c.name)} at a glance</h2>
      ${glance(products)}
    </section>

    <section class="section" id="scores">
      <h2>Scorecard</h2>
      <p>We score each product 1–10 on six things that matter to telecalling managers. See <a href="/about/">methodology</a>.</p>
      ${scoreCards(products)}
    </section>

    <section class="section" id="features">
      <h2>Feature-by-feature comparison</h2>
      ${featureMatrix(products)}
    </section>

    <section class="section" id="pricing">
      <h2>Pricing: what your team will actually pay</h2>
      <p>${savingsLine(c)}</p>
      ${pricingTable(products)}
    </section>

    <section class="section" id="sentiment">
      <h2>What users say: public sentiment</h2>
      <p>We read through app-store reviews, review platforms (G2, Capterra), Reddit and LinkedIn discussions. These are the recurring themes.</p>
      <div class="two-col">
        <div class="panel">
          <h3>${esc(c.name)} — what users like</h3>
          ${themes(c.praiseThemes, 'pos')}
          <h3>${esc(c.name)} — common complaints</h3>
          ${themes(c.complaintThemes, 'neg')}
        </div>
        <div class="panel panel-win">
          <h3>Callyzer — what users like</h3>
          ${themes(callyzer.praiseThemes, 'pos')}
          <h3>Callyzer — things to know</h3>
          ${themes(callyzer.concernThemes, 'neutral')}
        </div>
      </div>
      ${quotes(c)}
      ${sourcesList(c.sources)}
    </section>

    <section class="section" id="why">
      <h2>Why teams choose Callyzer over ${esc(c.name)}</h2>
      <div class="cards-2">
        ${c.callyzerEdge.map((e) => `<div class="card edge"><h3>${esc(e.title)}</h3><p>${esc(e.detail)}</p></div>`).join('')}
      </div>
    </section>

    <section class="section">
      <h2>Where ${esc(c.name)} is strong (to be fair)</h2>
      <div class="two-col">
        <div class="panel"><h3>Strengths</h3><ul>${c.strengths.map((s) => `<li>${esc(s)}</li>`).join('')}</ul></div>
        <div class="panel"><h3>Limitations</h3><ul>${c.weaknesses.map((s) => `<li>${esc(s)}</li>`).join('')}</ul></div>
      </div>
      <div class="two-col">
        <div class="panel panel-win"><h3>Choose Callyzer if…</h3><ul>
          <li>You want every call on the business SIM tracked automatically — inbound, outbound, missed and rejected</li>
          <li>You need recordings and manager reports without paying for add-ons</li>
          <li>You’re rolling out to 10+ telecallers and cost per seat matters</li>
          <li>You already have a CRM (or want a light one) and need calling data inside it</li>
        </ul></div>
        <div class="panel"><h3>Consider ${esc(c.name)} only if…</h3><ul>${c.chooseCompetitorIf.map((s) => `<li>${esc(s)}</li>`).join('')}</ul></div>
      </div>
    </section>

    <section class="section" id="switch">
      <h2>Switching from ${esc(c.name)} to Callyzer</h2>
      <ol class="steps">${c.switching.map((s) => `<li>${esc(s)}</li>`).join('')}</ol>
      <p>Need help? <a href="${site.demoUrl}" rel="noopener">Book a free migration call</a> with the Callyzer team.</p>
    </section>

    ${ctaBox(`Switch from ${c.name} to Callyzer`)}
    ${faqBlock(faqs)}

    <section class="section">
      <h2>Compare ${esc(c.name)} with other tools</h2>
      <div class="link-grid">
        ${competitors.filter((o) => o.slug !== c.slug).map((o) => `<a class="link-card" href="${h2hPath(c, o)}">${esc(pairName(c, o))} →</a>`).join('')}
        <a class="link-card" href="${altSlug(c)}">Best ${esc(c.name)} alternatives →</a>
      </div>
    </section>
    ${relatedLinks([c.slug])}
  </div>`;
  return layout({
    title: `Callyzer vs ${c.name} (${Y}): Features, Pricing & Honest Verdict`,
    description: `Callyzer vs ${c.name} compared on SIM call tracking, recording, reports, pricing and user sentiment. See why Callyzer is the better pick for Indian telecalling teams.`,
    path,
    body,
    schema: [faqSchema(faqs), breadcrumbSchema(crumbs), articleSchema(`Callyzer vs ${c.name}`, path)],
  });
}

// ---------- page: X vs Y (competitor head-to-head, Callyzer as the better third option) ----------

export const orderedPair = (a, b) => (competitors.indexOf(a) < competitors.indexOf(b) ? [a, b] : [b, a]);
export const h2hPath = (a, b) => {
  const [x, y] = orderedPair(a, b);
  return `/${x.slug}-vs-${y.slug}/`;
};
const pairName = (a, b) => {
  const [x, y] = orderedPair(a, b);
  return `${x.name} vs ${y.name}`;
};

export function headToHeadPage(a, b) {
  const products = [callyzer, a, b];
  const path = h2hPath(a, b);
  const [lead, trail] = overall(a.scores) >= overall(b.scores) ? [a, b] : [b, a];
  const cheaper = [a, b].filter((p) => p.pricing.startingInr != null).sort((x, y) => x.pricing.startingInr - y.pricing.startingInr)[0];
  const faqs = [
    { q: `Which is better, ${a.name} or ${b.name}?`, a: `${lead.name} edges ${trail.name} in our scoring (${overall(lead.scores)} vs ${overall(trail.scores)}). ${a.name} is best for ${a.bestFor.toLowerCase()}; ${b.name} is best for ${b.bestFor.toLowerCase()}. If your main need is tracking every call your team makes, Callyzer (${overall(callyzer.scores)}/10) beats both.` },
    { q: `Is ${a.name} cheaper than ${b.name}?`, a: cheaper ? `${cheaper.name} has the lower published starting price (${inr(cheaper.pricing.startingInr)} ${cheaper.pricing.unit}). Callyzer starts lower than both at ${inr(callyzer.pricing.startingInr)} ${callyzer.pricing.unit}.` : `Neither publishes pricing. Callyzer publishes its price: from ${inr(callyzer.pricing.startingInr)} ${callyzer.pricing.unit}.` },
    { q: `Is there a better alternative to both ${a.name} and ${b.name}?`, a: `Yes — Callyzer. It tracks all SIM calls automatically, includes recordings and 30+ reports, and costs less per seat than either.` },
  ];
  const crumbs = [{ name: 'Home', path: '/' }, { name: 'Comparisons', path: '/compare/' }, { name: pairName(a, b), path }];
  const [x, y] = orderedPair(a, b);
  const body = `
  <section class="hero">
    <div class="wrap">
      ${breadcrumbs(crumbs)}
      <div class="vs-logos">${logo(x, 'lg')}<span class="vs">vs</span>${logo(y, 'lg')}</div>
      <h1>${esc(x.name)} vs ${esc(y.name)} (${Y}): Which Is Better — and Is There a Smarter Option?</h1>
      <p class="lede">Choosing between ${esc(x.name)} and ${esc(y.name)} for your telecalling team? We compared features, pricing and user sentiment — and added Callyzer as the benchmark both are measured against.</p>
      ${updated()}
    </div>
  </section>
  <div class="wrap">
    <section class="verdict">
      <div class="verdict-icon">⚖️</div>
      <div>
        <h2>Quick verdict</h2>
        <p><strong>${esc(lead.name)}</strong> narrowly beats <strong>${esc(trail.name)}</strong> (${overall(lead.scores)} vs ${overall(trail.scores)}). Pick ${esc(x.name)} for ${esc(x.bestFor.toLowerCase())}, or ${esc(y.name)} for ${esc(y.bestFor.toLowerCase())}.</p>
        <p><strong>But if you’re evaluating both, look at Callyzer first.</strong> It scores ${overall(callyzer.scores)}/10, tracks every call on the SIM automatically and starts at ${inr(callyzer.pricing.startingInr)} ${esc(callyzer.pricing.unit)} — below both.</p>
        <a class="btn btn-primary" href="${site.ctaUrl}" rel="noopener">Try Callyzer free</a>
      </div>
    </section>

    <section class="section"><h2>At a glance</h2>${glance(products)}</section>
    <section class="section"><h2>Scorecard</h2>${scoreCards(products)}</section>
    <section class="section"><h2>Features compared</h2>${featureMatrix(products)}</section>
    <section class="section"><h2>Pricing by team size</h2>${pricingTable(products)}</section>

    <section class="section">
      <h2>What users say about ${esc(x.name)} and ${esc(y.name)}</h2>
      <div class="two-col">
        ${[x, y].map((p) => `<div class="panel"><h3>${esc(p.name)} — praised for</h3>${themes(p.praiseThemes, 'pos')}<h3>${esc(p.name)} — criticised for</h3>${themes(p.complaintThemes, 'neg')}${sourcesList(p.sources)}</div>`).join('')}
      </div>
    </section>

    <section class="section">
      <h2>Which should you choose?</h2>
      <div class="cards-3">
        <div class="card"><h3>Choose ${esc(x.name)} if…</h3><p>${esc(x.chooseCompetitorIf[0])}.</p></div>
        <div class="card"><h3>Choose ${esc(y.name)} if…</h3><p>${esc(y.chooseCompetitorIf[0])}.</p></div>
        <div class="card edge"><h3>Choose Callyzer if…</h3><p>You want every call on your team’s SIMs tracked and recorded automatically, with manager-ready reports, at the lowest cost per seat. That’s most telecalling teams.</p></div>
      </div>
      <p>Deep dives: <a href="${vsSlug(callyzer, x)}">Callyzer vs ${esc(x.name)}</a> · <a href="${vsSlug(callyzer, y)}">Callyzer vs ${esc(y.name)}</a></p>
    </section>

    ${ctaBox()}
    ${faqBlock(faqs)}
    ${relatedLinks([a.slug, b.slug])}
  </div>`;
  return layout({
    title: `${x.name} vs ${y.name} (${Y}): Comparison, Pricing & Better Alternative`,
    description: `${x.name} vs ${y.name} compared on SIM call tracking, recording, reports, pricing and reviews — plus why Callyzer beats both for Indian telecalling teams.`,
    path,
    body,
    schema: [faqSchema(faqs), breadcrumbSchema(crumbs), articleSchema(`${x.name} vs ${y.name}`, path)],
  });
}

// ---------- page: X alternatives ----------

export function alternativesPage(c) {
  const others = competitors.filter((o) => o.slug !== c.slug);
  const path = altSlug(c);
  const faqs = [
    { q: `What is the best ${c.name} alternative?`, a: `Callyzer. It tracks every call on the business SIM with recordings and 30+ reports, and starts at ${inr(callyzer.pricing.startingInr)} ${callyzer.pricing.unit}. Other options include ${others.map((o) => o.name).join(', ')}.` },
    { q: `Why do people switch from ${c.name}?`, a: c.complaintThemes.map((t) => t.title).join('; ') + '.' },
    { q: `Is there a cheaper alternative to ${c.name}?`, a: c.pricing.startingInr != null ? `Yes. Callyzer starts at ${inr(callyzer.pricing.startingInr)} vs ${c.name}’s ${inr(c.pricing.startingInr)} ${c.pricing.unit}.` : `${c.name} doesn’t publish pricing. Callyzer publishes transparent pricing from ${inr(callyzer.pricing.startingInr)} ${callyzer.pricing.unit}.` },
  ];
  const crumbs = [{ name: 'Home', path: '/' }, { name: `${c.name} alternatives`, path }];
  const body = `
  <section class="hero">
    <div class="wrap">
      ${breadcrumbs(crumbs)}
      <h1>Best ${esc(c.name)} Alternatives in ${Y} (Ranked for Telecalling Teams)</h1>
      <p class="lede">Looking beyond ${esc(c.name)}? Here are the ${others.length + 1} best alternatives for SIM-based calling, tracking and recording — ranked on features, pricing and user feedback.</p>
      ${updated()}
    </div>
  </section>
  <div class="wrap">
    <section class="verdict">
      <div class="verdict-icon">🏆</div>
      <div>
        <h2>Best ${esc(c.name)} alternative: Callyzer</h2>
        <p>${savingsLine(c)} Callyzer also tracks every call on the SIM — not just calls made inside an app — so managers finally see the full picture.</p>
        <a class="btn btn-primary" href="${site.ctaUrl}" rel="noopener">Try Callyzer free</a>
        <a class="btn btn-ghost" href="${vsSlug(callyzer, c)}">Callyzer vs ${esc(c.name)} →</a>
      </div>
    </section>

    <section class="section">
      <h2>Why teams look for ${esc(c.name)} alternatives</h2>
      <p>Recurring themes from ${esc(c.name)} reviews and community discussions:</p>
      ${themes(c.complaintThemes, 'neg')}
    </section>

    <section class="section">
      <h2>Top ${esc(c.name)} alternatives</h2>
      <div class="rank-list">
        ${rankCard(callyzer, 1, { pick: true, extra: `<ul class="checks">${c.callyzerEdge.map((e) => `<li><strong>${esc(e.title)}:</strong> ${esc(e.detail)}</li>`).join('')}</ul>` })}
        ${others.map((o, i) => rankCard(o, i + 2, { extra: `<p class="small"><a href="${h2hPath(c, o)}">${esc(pairName(c, o))} →</a></p>` })).join('')}
      </div>
    </section>

    <section class="section"><h2>${esc(c.name)} vs alternatives: features</h2>${featureMatrix([callyzer, c, ...others.slice(0, 2)])}</section>
    ${ctaBox(`The ${c.name} alternative your managers will actually use`)}
    ${faqBlock(faqs)}
    ${relatedLinks([c.slug])}
  </div>`;
  return layout({
    title: `${others.length + 1} Best ${c.name} Alternatives & Competitors (${Y})`,
    description: `Top ${c.name} alternatives for Indian telecalling teams, compared on SIM call tracking, recording, reports and pricing. Callyzer ranks #1.`,
    path,
    body,
    schema: [
      faqSchema(faqs),
      breadcrumbSchema(crumbs),
      { '@context': 'https://schema.org', '@type': 'ItemList', name: `${c.name} alternatives`, itemListElement: [callyzer, ...others].map((p, i) => ({ '@type': 'ListItem', position: i + 1, name: p.name, url: p.url })) },
    ],
  });
}

// ---------- page: industry ----------

export function industryPage(ind) {
  const ranked = ind.ranking.map(bySlug).filter(Boolean);
  const path = industrySlug(ind);
  const faqs = [
    { q: `What is the best call tracking app for ${ind.name.toLowerCase()}?`, a: `Callyzer. ${ind.howCallyzerHelps[0]}. It works on regular SIMs and starts at ${inr(callyzer.pricing.startingInr)} ${callyzer.pricing.unit}.` },
    { q: `Can ${ind.audience} track calls made from personal phones?`, a: 'Yes. Callyzer tracks calls on the business SIM of the phone and lets you exclude personal numbers, so reps stay comfortable while managers get complete business-call visibility.' },
    { q: `Do we need cloud telephony for ${ind.name.toLowerCase()} telecalling?`, a: 'No. SIM-based tools like Callyzer work with the phones and numbers your team already uses, and customers are more likely to pick up a regular mobile number.' },
  ];
  const crumbs = [{ name: 'Home', path: '/' }, { name: 'Industries', path: '/industries/' }, { name: ind.name, path }];
  const body = `
  <section class="hero">
    <div class="wrap">
      ${breadcrumbs(crumbs)}
      <h1>Best Call Tracking &amp; Telecalling App for ${esc(ind.name)} (${Y})</h1>
      <p class="lede">For ${esc(ind.audience)}: the SIM-based calling apps worth considering, what matters in your industry, and why Callyzer comes out on top.</p>
      ${updated()}
    </div>
  </section>
  <div class="wrap">
    <section class="section">
      <h2>What ${esc(ind.name.toLowerCase())} calling teams struggle with</h2>
      ${themes(ind.pains.map((p) => ({ title: p, detail: '' })), 'neg')}
    </section>
    <section class="section">
      <h2>Top picks for ${esc(ind.name)}</h2>
      <div class="rank-list">
        ${rankCard(callyzer, 1, { pick: true, extra: `<ul class="checks">${ind.howCallyzerHelps.map((h) => `<li>${esc(h)}</li>`).join('')}</ul>` })}
        ${ranked.map((c, i) => rankCard(c, i + 2)).join('')}
      </div>
    </section>
    <section class="section"><h2>Pricing for ${esc(ind.name.toLowerCase())} teams</h2>${pricingTable([callyzer, ...ranked.slice(0, 3)])}</section>
    ${ctaBox(`Callyzer for ${ind.name}`)}
    ${faqBlock(faqs)}
    <section class="section"><h2>Other industries</h2><div class="link-grid">${industries.filter((i) => i.slug !== ind.slug).map((i) => `<a class="link-card" href="${industrySlug(i)}">${esc(i.name)} →</a>`).join('')}</div></section>
  </div>`;
  return layout({
    title: `Best Call Tracking App for ${ind.name} in ${Y} (SIM-Based, Compared)`,
    description: `Compare the best SIM-based call tracking and telecalling apps for ${ind.audience}. Features, pricing and why Callyzer ranks #1.`,
    path,
    body,
    schema: [faqSchema(faqs), breadcrumbSchema(crumbs)],
  });
}

// ---------- hubs ----------

export function compareHub(pairs) {
  const crumbs = [{ name: 'Home', path: '/' }, { name: 'Comparisons', path: '/compare/' }];
  const body = `
  <section class="hero"><div class="wrap">${breadcrumbs(crumbs)}<h1>All Telecalling App Comparisons</h1><p class="lede">Every head-to-head comparison of SIM-based call tracking and telecalling apps on this site.</p></div></section>
  <div class="wrap">
    <section class="section"><h2>Callyzer vs competitors</h2><div class="link-grid">${competitors.map((c) => `<a class="link-card" href="${vsSlug(callyzer, c)}">Callyzer vs ${esc(c.name)} →</a>`).join('')}</div></section>
    <section class="section"><h2>Head-to-head</h2><div class="link-grid">${pairs.map(([a, b]) => `<a class="link-card" href="${h2hPath(a, b)}">${esc(pairName(a, b))} →</a>`).join('')}</div></section>
    <section class="section"><h2>Alternatives</h2><div class="link-grid"><a class="link-card" href="/">Callyzer alternatives →</a>${competitors.map((c) => `<a class="link-card" href="${altSlug(c)}">${esc(c.name)} alternatives →</a>`).join('')}</div></section>
  </div>`;
  return layout({ title: `Telecalling App Comparisons (${Y}) — Callyzer, Runo, GoDial & More`, description: 'Side-by-side comparisons of SIM-based telecalling, call tracking and call recording apps for Indian sales teams.', path: '/compare/', body, schema: [breadcrumbSchema(crumbs)] });
}

export function industriesHub() {
  const crumbs = [{ name: 'Home', path: '/' }, { name: 'Industries', path: '/industries/' }];
  const body = `
  <section class="hero"><div class="wrap">${breadcrumbs(crumbs)}<h1>Best Call Tracking Apps by Industry</h1><p class="lede">Telecalling looks different in real estate, lending, education and healthcare. Pick your industry for a tailored comparison.</p></div></section>
  <div class="wrap"><section class="section"><div class="cards-3">${industries.map((i) => `<a class="card card-link" href="${industrySlug(i)}"><h3>${esc(i.name)}</h3><p>${esc(i.pains[0])}.</p></a>`).join('')}</div></section></div>`;
  return layout({ title: `Best Call Tracking App by Industry (${Y})`, description: 'Industry-specific guides to SIM-based call tracking and telecalling apps for Indian businesses.', path: '/industries/', body, schema: [breadcrumbSchema(crumbs)] });
}

export function aboutPage() {
  const crumbs = [{ name: 'Home', path: '/' }, { name: 'Methodology', path: '/about/' }];
  const body = `
  <section class="hero"><div class="wrap">${breadcrumbs(crumbs)}<h1>How We Compare Telecalling Apps</h1></div></section>
  <div class="wrap prose">
    <section class="section">
      <h2>Who we are</h2>
      <p>${esc(site.disclosure)}</p>
      <h2>What we score</h2>
      <ul>${scoreDimensions.map((d) => `<li><strong>${esc(d.label)}</strong></li>`).join('')}</ul>
      <p>Each dimension is scored 1–10 from hands-on use, vendor documentation and public user feedback. The overall score is the simple average.</p>
      <h2>Where sentiment comes from</h2>
      <p>We review Google Play reviews, G2 and Capterra listings, Reddit threads (e.g. r/IndianStartups, r/sales, r/india) and LinkedIn discussions, then group feedback into recurring themes. We link to sources on every comparison page.</p>
      <h2>Pricing</h2>
      <p>We use each vendor’s published starting price and multiply by team size. Discounts, taxes and add-ons are excluded. If a vendor doesn’t publish pricing we mark it “On request”.</p>
      <h2>Corrections</h2>
      <p>Spotted something outdated? Vendors and users can request corrections and we update pages promptly.</p>
    </section>
  </div>`;
  return layout({ title: 'Methodology & Disclosure — Callyzer Alternatives', description: 'How we score and compare SIM-based telecalling apps, where our data comes from, and who publishes this site.', path: '/about/', body, schema: [breadcrumbSchema(crumbs)] });
}

function articleSchema(headline, path) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline,
    dateModified: site.lastUpdated,
    author: { '@type': 'Organization', name: site.name },
    publisher: { '@type': 'Organization', name: site.name },
    mainEntityOfPage: site.baseUrl + path,
  };
}
