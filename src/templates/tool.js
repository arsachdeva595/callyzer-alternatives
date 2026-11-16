// /tools/call-connect-rate-benchmark/: one-page benchmark tool built on Callyzer's
// first-party industry data. The calculator runs client-side (public/tools/connect-rate.js);
// everything a crawler needs (table, insights, FAQ) is server-rendered here.
import { site } from '../../data/site.js';
import { layout } from './layout.js';
import { esc, abs, faqBlock, faqSchema, breadcrumbs, breadcrumbSchema } from '../lib.js';
import {
  industriesData, rankedData, lowSampleData, totals, sortBy, correlation, connectMeta,
} from '../connect-rates.js';

export const TOOL_PATH = '/tools/call-connect-rate-benchmark/';
const DEFAULT_SLUG = 'real-estate';

const fmtInt = (n) => Number(n).toLocaleString('en-IN');
const crore = (n) => `${(n / 1e7).toFixed(1)} crore`;
const f1 = (n) => n.toFixed(1);
const utm = (content) =>
  `https://callyzer.co/?utm_source=callyzer-alternatives&utm_medium=tool&utm_campaign=connect-rate-benchmark&utm_content=${content}`;

// ---------- server-rendered fragments ----------

function industryOptions(selected) {
  return [...industriesData]
    .sort((a, b) => a.name.localeCompare(b.name))
    .map((r) => `<option value="${r.slug}"${r.slug === selected ? ' selected' : ''}>${esc(r.name)}${r.ranked ? '' : ' (low sample)'}</option>`)
    .join('');
}

const METRICS = [
  { key: 'outgoing', label: 'Outgoing connect rate', unit: '%', dir: 'desc', note: 'Share of dialled calls that were answered.' },
  { key: 'overall', label: 'Overall connect rate', unit: '%', dir: 'desc', note: 'Incoming + outgoing calls that connected.' },
  { key: 'incoming', label: 'Incoming answer rate', unit: '%', dir: 'desc', note: 'Share of calls from customers that reps answered.' },
  { key: 'dialsPer100', label: 'Dials per 100 conversations', unit: '', dir: 'asc', note: 'Outgoing dials needed for 100 answered calls. Lower is easier.' },
];

function leaderboardRows(metric) {
  const max = Math.max(...industriesData.map((r) => r[metric.key]));
  const row = (r, i) => `
    <tr data-slug="${r.slug}"${r.slug === DEFAULT_SLUG ? ' class="is-selected"' : ''}>
      <td class="lb-rank">${r.ranked ? i + 1 : '–'}</td>
      <th scope="row">${esc(r.name)}${r.ranked ? '' : ' <span class="tag">Low sample</span>'}</th>
      <td class="lb-bar-cell"><span class="lb-bar"><span style="width:${((r[metric.key] / max) * 100).toFixed(1)}%"></span></span></td>
      <td class="lb-val">${metric.key === 'dialsPer100' ? r[metric.key] : f1(r[metric.key]) + '%'}</td>
      <td class="lb-calls">${fmtInt(r.totalCalls)}</td>
    </tr>`;
  return [
    ...sortBy(rankedData, metric.key, metric.dir).map(row),
    ...sortBy(lowSampleData, metric.key, metric.dir).map((r) => row(r, 0)),
  ].join('');
}

function scatterSvg() {
  // x: outgoing share of all calls, y: outgoing connect rate. Ranked industries only.
  const W = 640, H = 380, P = { l: 52, r: 20, t: 20, b: 48 };
  const xMin = 50, xMax = 95, yMin = 30, yMax = 65;
  const X = (v) => P.l + ((v - xMin) / (xMax - xMin)) * (W - P.l - P.r);
  const Y = (v) => H - P.b - ((v - yMin) / (yMax - yMin)) * (H - P.t - P.b);
  const xs = [50, 60, 70, 80, 90], ys = [30, 40, 50, 60];
  const label = new Set(['logistics-transportation', 'real-estate', 'edtech-education', 'trading-wholesale', 'solar-renewable-energy', 'marketing-agencies', 'e-commerce-retail']);
  const pts = rankedData.map((r) => {
    const x = X(r.outShare), y = Y(r.outgoing);
    const short = r.name.split(/ [&/] | & /)[0];
    const rad = Math.max(4, Math.sqrt(r.totalCalls / 1e6) * 1.6);
    const anchor = r.outShare > 85 ? 'end' : 'start';
    const dx = (anchor === 'end' ? -1 : 1) * (rad + 5);
    return `<g class="sc-pt" data-slug="${r.slug}"><circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${rad.toFixed(1)}"><title>${esc(r.name)}: ${f1(r.outShare)}% of calls outgoing, ${f1(r.outgoing)}% connect</title></circle>${label.has(r.slug) ? `<text x="${(x + dx).toFixed(1)}" y="${(y + 4).toFixed(1)}" text-anchor="${anchor}">${esc(short)}</text>` : ''}</g>`;
  }).join('');
  return `<svg class="scatter" viewBox="0 0 ${W} ${H}" role="img" aria-labelledby="sc-title sc-desc">
    <title id="sc-title">Outgoing share of calls vs outgoing connect rate, by industry</title>
    <desc id="sc-desc">Industries where a larger share of calls are outgoing tend to have lower outgoing connect rates.</desc>
    ${xs.map((v) => `<line class="sc-grid" x1="${X(v)}" x2="${X(v)}" y1="${P.t}" y2="${H - P.b}"/><text class="sc-tick" x="${X(v)}" y="${H - P.b + 18}" text-anchor="middle">${v}%</text>`).join('')}
    ${ys.map((v) => `<line class="sc-grid" x1="${P.l}" x2="${W - P.r}" y1="${Y(v)}" y2="${Y(v)}"/><text class="sc-tick" x="${P.l - 8}" y="${Y(v) + 4}" text-anchor="end">${v}%</text>`).join('')}
    <text class="sc-axis" x="${(P.l + W - P.r) / 2}" y="${H - 8}" text-anchor="middle">Share of calls that are outgoing →</text>
    <text class="sc-axis" transform="translate(14 ${(P.t + H - P.b) / 2}) rotate(-90)" text-anchor="middle">Outgoing connect rate →</text>
    ${pts}
  </svg>`;
}

// ---------- page ----------

export function connectRateToolPage() {
  const crumbs = [{ name: 'Home', path: '/' }, { name: 'Call Connect Rate Benchmark', path: TOOL_PATH }];
  const byOut = sortBy(rankedData, 'outgoing');
  const best = byOut[0], worst = byOut[byOut.length - 1];
  const re = industriesData.find((r) => r.slug === 'real-estate');
  const gapTop = sortBy(rankedData.map((r) => ({ ...r, gap: r.incoming - r.outgoing })), 'gap')[0];
  const rVol = correlation(rankedData, 'outShare', 'outgoing');
  const edu = industriesData.find((r) => r.slug === 'edtech-education');

  const clientData = {
    meta: { period: connectMeta.periodShort },
    all: { overall: totals.overall, outgoing: totals.outgoing, incoming: totals.incoming },
    industries: industriesData.map((r) => ({
      slug: r.slug, name: r.name, overall: r.overall, outgoing: r.outgoing, incoming: r.incoming,
      outShare: r.outShare, dialsPer100: r.dialsPer100, calls: r.totalCalls, ranked: r.ranked,
    })),
    metrics: METRICS,
    ctaUrl: utm('result'),
  };

  const faqs = [
    { q: 'What is a good call connect rate in India?', a: `Across ${fmtInt(totals.totalCalls)} business calls tracked by Callyzer in ${connectMeta.period}, ${f1(totals.outgoing)}% of outgoing calls connected. Industry averages ranged from ${f1(worst.outgoing)}% (${worst.name}) to ${f1(best.outgoing)}% (${best.name}). A “good” rate depends on your industry and lead quality, so compare against your own industry rather than one national number.` },
    { q: 'What is the average call connect rate in real estate?', a: `Real estate teams connected ${f1(re.outgoing)}% of outgoing calls and ${f1(re.overall)}% of all calls in ${connectMeta.period}. Reps answered ${f1(re.incoming)}% of calls coming in from customers, the widest inbound/outbound gap of any industry in the data.` },
    { q: 'How is connect rate calculated?', a: 'Connect rate = connected calls ÷ total calls × 100. Outgoing connect rate uses only calls your team dialled; a call counts as connected when the other person answered, as recorded in the phone’s call log. Overall connect rate includes incoming calls too.' },
    { q: 'How many dials does it take to get one conversation?', a: `On average ${(totals.dialsPer100 / 100).toFixed(1)} dials per answered call across all industries. It ranges from ${(best.dialsPer100 / 100).toFixed(1)} in ${best.name} to ${(worst.dialsPer100 / 100).toFixed(1)} in ${worst.name}. Use the “Plan my dials” tab above to work out dials and reps for your own target.` },
    { q: 'Where does this data come from?', a: `It is aggregated, anonymised call-log data from businesses that use Callyzer’s call tracking app on their teams’ SIM phones, for ${connectMeta.period}. No individual business or phone number is identifiable. Industries are self-reported by each business and grouped into ${industriesData.length} categories. Industries with fewer than ${fmtInt(connectMeta.minRankedCalls)} calls are shown but not ranked.` },
    { q: 'How can I improve my team’s connect rate?', a: 'Call within minutes of a lead coming in, call at the hours your industry answers most, retry unanswered numbers at a different time of day, call from a number customers recognise, and drop numbers that never connect after several attempts. Measure it per rep every week so you can see what works.' },
  ];

  const schema = [
    breadcrumbSchema(crumbs),
    faqSchema(faqs),
    {
      '@context': 'https://schema.org',
      '@type': 'Dataset',
      name: `India Call Connect Rate Benchmark by Industry (${connectMeta.periodShort})`,
      description: `Call connect rates (overall, outgoing and incoming) across ${industriesData.length} industries in India, from ${fmtInt(totals.totalCalls)} business calls tracked by Callyzer in ${connectMeta.period}.`,
      url: abs(TOOL_PATH),
      creator: { '@type': 'Organization', name: 'Callyzer', url: 'https://callyzer.co/' },
      temporalCoverage: '2026-09-01/2026-10-31',
      spatialCoverage: 'India',
      variableMeasured: ['Overall connect rate', 'Outgoing connect rate', 'Incoming answer rate', 'Total calls'],
      dateModified: connectMeta.lastUpdated,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: 'Call Connect Rate Benchmark Calculator',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Any',
      url: abs(TOOL_PATH),
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
    },
  ];

  const body = `
  <section class="hero tool-hero"><div class="wrap">
    ${breadcrumbs(crumbs)}
    <span class="eyebrow">Free tool · First-party data · ${connectMeta.periodShort}</span>
    <h1>Call Connect Rate Benchmark: is your team above or below your industry?</h1>
    <p class="lede">Compare your team’s connect rate with ${industriesData.length} industries, built from <strong>${crore(totals.totalCalls)} real business calls</strong> (${fmtInt(totals.totalCalls)}) tracked by Callyzer across India.</p>
    <div class="stat-strip">
      <div><strong>${f1(totals.outgoing)}%</strong><span>of outgoing calls connect</span></div>
      <div><strong>${f1(totals.incoming)}%</strong><span>of incoming calls get answered</span></div>
      <div><strong>${(totals.dialsPer100 / 100).toFixed(1)}</strong><span>dials per conversation</span></div>
      <div><strong>${industriesData.length}</strong><span>industries benchmarked</span></div>
    </div>
  </div></section>

  <div class="wrap">
  <section class="tool" id="tool" aria-label="Connect rate calculator">
    <div class="tool-tabs" role="tablist">
      <button role="tab" id="tab-bench" aria-controls="panel-bench" aria-selected="true" class="tool-tab active" data-tab="bench">Benchmark my team</button>
      <button role="tab" id="tab-plan" aria-controls="panel-plan" aria-selected="false" class="tool-tab" data-tab="plan">Plan my dials</button>
    </div>

    <div class="tool-grid" role="tabpanel" id="panel-bench" aria-labelledby="tab-bench">
      <form class="tool-form" id="bench-form" novalidate>
        <label class="field"><span>Your industry</span>
          <select name="industry" id="bench-industry">${industryOptions(DEFAULT_SLUG)}</select></label>
        <fieldset class="field seg"><legend>Compare</legend>
          <label><input type="radio" name="mode" value="outgoing" checked> Outgoing calls</label>
          <label><input type="radio" name="mode" value="overall"> All calls</label>
        </fieldset>
        <label class="field"><span id="lbl-dials">Calls your team dialled</span>
          <input type="number" inputmode="numeric" min="1" name="dials" id="bench-dials" placeholder="e.g. 6000" value="6000"></label>
        <label class="field"><span id="lbl-conn">How many of those connected</span>
          <input type="number" inputmode="numeric" min="0" name="connected" id="bench-connected" placeholder="e.g. 2100" value="2100"></label>
        <p class="hint">Use any period: a day, a week or a month. Don’t know your numbers? Callyzer’s call reports show them per rep.</p>
      </form>
      <div class="tool-result" id="bench-result" aria-live="polite"></div>
    </div>

    <div class="tool-grid" role="tabpanel" id="panel-plan" aria-labelledby="tab-plan" hidden>
      <form class="tool-form" id="plan-form" novalidate>
        <label class="field"><span>Your industry</span>
          <select name="industry" id="plan-industry">${industryOptions(DEFAULT_SLUG)}</select></label>
        <label class="field"><span>Conversations you want per day</span>
          <input type="number" inputmode="numeric" min="1" name="target" id="plan-target" value="100"></label>
        <label class="field"><span>Dials one rep can make per day</span>
          <input type="number" inputmode="numeric" min="1" name="capacity" id="plan-capacity" value="120"></label>
        <label class="field"><span>Your own connect rate, % <em>(optional)</em></span>
          <input type="number" inputmode="decimal" min="1" max="100" step="0.1" name="own" id="plan-own" placeholder="Leave blank to use industry average"></label>
      </form>
      <div class="tool-result" id="plan-result" aria-live="polite"></div>
    </div>
    <noscript><p class="hint">The calculator needs JavaScript. The full benchmark table below works without it.</p></noscript>
  </section>

  <section class="section" id="leaderboard">
    <div class="section-head">
      <div>
        <h2>Connect rate by industry, ${connectMeta.periodShort}</h2>
        <p class="muted" id="lb-note">${esc(METRICS[0].note)}</p>
      </div>
      <div class="filters" id="lb-metrics" role="group" aria-label="Metric">
        ${METRICS.map((m, i) => `<button type="button" class="chip${i === 0 ? ' active' : ''}" data-metric="${m.key}" aria-pressed="${i === 0}">${esc(m.label)}</button>`).join('')}
      </div>
    </div>
    <div class="table-scroll">
      <table class="matrix leaderboard">
        <thead><tr><th scope="col">#</th><th scope="col">Industry</th><th scope="col" class="lb-bar-cell"><span class="sr-only">Bar</span></th><th scope="col" class="lb-val" id="lb-col">Outgoing connect rate</th><th scope="col" class="lb-calls">Calls analysed</th></tr></thead>
        <tbody id="lb-body">${leaderboardRows(METRICS[0])}</tbody>
        <tfoot><tr><td></td><th scope="row">All industries</th><td></td><td class="lb-val" id="lb-all">${f1(totals.outgoing)}%</td><td class="lb-calls">${fmtInt(totals.totalCalls)}</td></tr></tfoot>
      </table>
    </div>
    <p class="small muted">Industries with fewer than ${fmtInt(connectMeta.minRankedCalls)} calls are marked <em>low sample</em> and not ranked. Your selected industry is highlighted.</p>
  </section>

  <section class="section" id="insights">
    <h2>What ${crore(totals.totalCalls)} calls tell us</h2>
    <div class="cards-3 insight-cards">
      <article class="card insight">
        <span class="insight-num">${f1(gapTop.incoming)}% vs ${f1(gapTop.outgoing)}%</span>
        <h3>${esc(gapTop.name)} answers customers, but customers don’t answer back</h3>
        <p>${esc(gapTop.name)} reps picked up ${f1(gapTop.incoming)}% of calls coming in, but only ${f1(gapTop.outgoing)}% of the calls they dialled were answered. That ${Math.round(gapTop.incoming - gapTop.outgoing)}-point gap is the widest of any industry. Leads are keen when they call you, much less so when you call them.</p>
      </article>
      <article class="card insight">
        <span class="insight-num">${(best.dialsPer100 / 100).toFixed(1)} vs ${(edu.dialsPer100 / 100).toFixed(1)}</span>
        <h3>Same target, very different effort</h3>
        <p>For every conversation, ${esc(best.name)} teams make ${(best.dialsPer100 / 100).toFixed(1)} dials. ${esc(edu.name)} teams need ${(edu.dialsPer100 / 100).toFixed(1)}, ${Math.round((edu.dialsPer100 / best.dialsPer100 - 1) * 100)}% more work for the same result. Set call targets by industry, not by a generic “100 calls a day”.</p>
      </article>
      <article class="card insight">
        <span class="insight-num">${f1(best.outgoing)}% → ${f1(worst.outgoing)}%</span>
        <h3>Best vs worst industry</h3>
        <p>${esc(best.name)} connects ${f1(best.outgoing)}% of outgoing calls. ${esc(worst.name)} connects ${f1(worst.outgoing)}%. Warm, transactional calls (deliveries, installations, orders) get answered; cold lists and bulk outreach don’t.</p>
      </article>
    </div>

    <div class="panel scatter-panel">
      <div class="scatter-copy">
        <h3>The more an industry dials, the less it connects</h3>
        <p class="muted">Each dot is an industry (size = call volume). Industries where most calls are outgoing (bulk outreach) connect less often. Correlation across the ${rankedData.length} ranked industries: <strong>r = ${rVol.toFixed(2)}</strong>. That’s a strong pattern, not proof of cause: industries that dial more also tend to call colder lists.</p>
      </div>
      ${scatterSvg()}
    </div>
  </section>

  <aside class="cta">
    <div>
      <h2>See your real connect rate, per rep, every day</h2>
      <p>Callyzer reads call logs from your team’s SIM phones and reports connect rate, missed calls, talk time and follow-ups automatically. No dialer, no VoIP numbers.</p>
    </div>
    <div class="cta-actions">
      <a class="btn btn-primary" href="${utm('cta-band')}" rel="noopener">Start free trial</a>
      <a class="btn btn-ghost" href="${site.demoUrl}" rel="noopener">Book a demo</a>
    </div>
  </aside>

  <section class="section prose" id="methodology">
    <h2>Methodology</h2>
    <ul>
      <li><strong>Data:</strong> ${fmtInt(totals.totalCalls)} calls (${fmtInt(totals.outgoingCalls)} outgoing, ${fmtInt(totals.totalCalls - totals.outgoingCalls)} incoming) from businesses using Callyzer, ${connectMeta.period}. Aggregated and anonymised; no business or number is identifiable.</li>
      <li><strong>Connected:</strong> a call the other side answered, as recorded in the phone’s call log.</li>
      <li><strong>Outgoing connect rate</strong> = connected outgoing ÷ outgoing calls. <strong>Overall connect rate</strong> = all connected ÷ all calls. <strong>Incoming answer rate</strong> = connected incoming ÷ incoming calls.</li>
      <li><strong>Industries:</strong> self-reported by each business, grouped into ${industriesData.length} categories. Industries under ${fmtInt(connectMeta.minRankedCalls)} calls are not ranked.</li>
      <li><strong>Citing this data:</strong> “Callyzer Call Connect Rate Benchmark, ${connectMeta.periodShort}”, with a link to this page.</li>
    </ul>
  </section>

  ${faqBlock(faqs)}
  </div>

  <script type="application/json" id="cr-data">${JSON.stringify(clientData).replace(/</g, '\\u003c')}</script>
  <script src="/tools/connect-rate.js" defer></script>`;

  return layout({
    title: `Call Connect Rate Benchmark by Industry, India ${site.year} (Free Calculator)`,
    description: `Free tool: compare your team’s call connect rate with ${industriesData.length} industries, built from ${fmtInt(totals.totalCalls)} real calls. Average outgoing connect rate: ${f1(totals.outgoing)}%.`,
    path: TOOL_PATH,
    body,
    schema,
  });
}
