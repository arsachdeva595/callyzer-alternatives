// /tools/lead-leak-calculator/: explains the three places telecalling teams lose
// leads (unreturned missed calls, giving up too early, calling at the wrong time),
// estimates the ₹ impact from the visitor's own numbers, and reserves slots for
// Callyzer's India benchmarks (data/response-benchmarks.js) once they are computed.
import { site } from '../../data/site.js';
import { layout } from './layout.js';
import { esc, abs, faqBlock, faqSchema, breadcrumbs, breadcrumbSchema } from '../lib.js';
import { industriesData, totals, connectMeta } from '../connect-rates.js';
import { responseBenchmarks as RB, responseMeta } from '../../data/response-benchmarks.js';
import { TOOL_PATH as BENCH_PATH } from './tool.js';

export const LEAK_PATH = '/tools/lead-leak-calculator/';
const DEFAULT_SLUG = 'real-estate';
const utm = (c) => `https://callyzer.co/?utm_source=callyzer-alternatives&utm_medium=tool&utm_campaign=lead-leak-calculator&utm_content=${c}`;
const src = (href, label) => `<a href="${href}" rel="noopener nofollow" target="_blank">${esc(label)}</a>`;

const options = () =>
  [...industriesData].sort((a, b) => a.name.localeCompare(b.name))
    .map((r) => `<option value="${r.slug}"${r.slug === DEFAULT_SLUG ? ' selected' : ''}>${esc(r.name)}</option>`).join('');

// A benchmark tile: real value when computed, an honest "coming soon" otherwise.
function benchTile(key, fmt) {
  const b = RB[key];
  if (b.value == null) {
    return `<div class="bench-tile pending"><span class="bench-badge">India benchmark · coming soon</span><strong>—</strong><span>${esc(b.label)}</span></div>`;
  }
  return `<div class="bench-tile"><span class="bench-badge">India · ${esc(responseMeta.period || '')}</span><strong>${esc(fmt(b.value))}</strong><span>${esc(b.label)}</span></div>`;
}

const field = (label, id, value, extra = '') =>
  `<label class="field"><span>${label}</span><input type="number" inputmode="decimal" id="${id}" value="${value}" ${extra}></label>`;

export function leadLeakPage() {
  const crumbs = [{ name: 'Home', path: '/' }, { name: 'Lead Leak Calculator', path: LEAK_PATH }];
  const pending = Object.values(RB).some((b) => b.value == null);

  const clientData = {
    industries: industriesData.map((r) => ({ slug: r.slug, name: r.name, outgoing: r.outgoing })),
    all: totals.outgoing,
    ctaUrl: utm('result'),
  };

  const faqs = [
    { q: 'What is a lead leak in telecalling?', a: 'A lead leak is a sales opportunity your team had and lost without ever having a real conversation: a customer who called and was never called back, a new enquiry that was dialled once and then dropped, or calls placed at hours when that customer segment rarely answers. These leaks are invisible in daily call counts, which is why teams with high dial volumes can still lose many leads.' },
    { q: 'How quickly should a sales team call back a missed call?', a: 'As fast as possible, ideally within minutes. The often-quoted MIT/InsideSales study found that calling a web lead within 5 minutes rather than 30 gave about 100 times higher odds of reaching them and 21 times higher odds of qualifying them. It measured contact and qualification, not sales, and it was US data from 2007. A practical goal for Indian teams is to return every missed customer call within the same working hour and never leave one unreturned.' },
    { q: 'How many times should you call a lead before giving up?', a: 'Large US datasets suggest most leads who can be reached are reached within the first few attempts: Velocify found about 93% of converted leads were contacted by the 6th attempt, and Cognism found 93% of conversations happened by call 3. Both suggest that stopping after one or two attempts wastes leads, while very high attempt counts bring little extra. Vary the time of day between attempts, and stay within calling-hour rules for your industry.' },
    { q: 'Is it true that 80% of sales need 5 follow-ups?', a: 'No reliable study supports it. The statistic has been traced to a 1942 survey of fewer than 40 people and an uncited newspaper column, and VentureBeat has called it false. Measure your own follow-up curve instead: how many of your connected leads needed 2, 3 or more attempts.' },
    { q: 'What is the best time to call customers in India?', a: 'Published studies disagree. US studies point to late afternoon or mid-morning on different days, and Indian vendor analyses also disagree with each other. The best time varies by industry and customer type, so measure the answer rate by hour for your own team. Callyzer is preparing an India benchmark by industry and hour.' },
    { q: 'How is the lead leak estimate calculated?', a: 'Missed calls: unreturned missed calls × share that are real sales enquiries × your conversion rate × deal value. Giving up too early: new leads × the extra share you would reach by making more attempts (using your industry’s average connect rate per attempt) × your conversion rate × deal value. The attempt estimate is a range between two assumptions: every attempt connects as often as the first, or later attempts connect half as often. All inputs are editable.' },
  ];

  const schema = [
    breadcrumbSchema(crumbs),
    faqSchema(faqs),
    { '@context': 'https://schema.org', '@type': 'WebApplication', name: 'Lead Leak Calculator for Telecalling Teams', applicationCategory: 'BusinessApplication', operatingSystem: 'Any', url: abs(LEAK_PATH), offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' } },
  ];

  const body = `
  <section class="hero tool-hero"><div class="wrap">
    ${breadcrumbs(crumbs)}
    <span class="eyebrow">Free tool · For sales &amp; telecalling heads</span>
    <h1>Lead Leak Calculator: how many sales is your calling team losing?</h1>
    <p class="lede">Most telecalling teams don’t lose leads because they make too few calls. They lose them in three quiet places: <strong>missed calls nobody returns</strong>, <strong>leads dropped after one or two tries</strong>, and <strong>calls made when customers don’t pick up</strong>. Work out what each one costs you in rupees, and how to fix it.</p>
    <div class="toc">
      <a href="#calculator">Calculator</a><a href="#leak-missed">1. Missed calls</a><a href="#leak-attempts">2. Giving up too early</a><a href="#leak-timing">3. Wrong time</a><a href="#myths">Myths vs evidence</a><a href="#kpis">KPIs to track</a><a href="#faq">FAQ</a>
    </div>
  </div></section>

  <div class="wrap">
  <section class="tool" id="calculator" aria-label="Lead leak calculator">
    <div class="tool-grid">
      <form class="tool-form" id="leak-form" novalidate>
        <h2 class="form-h">Your business</h2>
        <label class="field"><span>Industry</span><select id="lk-industry">${options()}</select></label>
        ${field('Average deal value (₹)', 'lk-deal', 50000, 'min="0" step="1000"')}
        ${field('% of reached leads that buy', 'lk-conv', 5, 'min="0" max="100" step="0.5"')}

        <h2 class="form-h">Leak 1 · Missed calls</h2>
        ${field('Missed customer calls per month', 'lk-missed', 600, 'min="0"')}
        ${field('% your team calls back', 'lk-returned', 60, 'min="0" max="100"')}
        ${field('% of missed calls that are sales enquiries', 'lk-enquiry', 50, 'min="0" max="100"')}

        <h2 class="form-h">Leak 2 · Giving up too early</h2>
        ${field('New leads per month', 'lk-leads', 1500, 'min="0"')}
        <label class="field"><span>Attempts before your team gives up</span>
          <select id="lk-attempts"><option value="1">1</option><option value="2" selected>2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option></select></label>
        <label class="field"><span>Connect rate per attempt, % <em>(defaults to your industry)</em></span>
          <input type="number" inputmode="decimal" id="lk-p" min="1" max="100" step="0.1"></label>
        <p class="hint">Don’t know your numbers? Callyzer’s reports show missed calls, callbacks and attempts per number.</p>
      </form>
      <div class="tool-result" id="leak-result" aria-live="polite"></div>
    </div>
    <noscript><p class="hint">The calculator needs JavaScript. The guide below works without it.</p></noscript>
  </section>

  ${pending ? `<p class="notice"><strong>India benchmarks are on the way.</strong> We’re computing missed-call callback speed, attempts-to-connect and best hour to call by industry from Callyzer’s anonymised call data. Until they’re published, this page uses only your inputs, real industry connect rates from our <a href="${BENCH_PATH}">connect rate benchmark</a> (${esc(connectMeta.periodShort)}), and published research, clearly labelled.</p>` : ''}

  <article class="guide prose-wide">
    <section class="section leak" id="leak-missed">
      <span class="leak-num">Leak 1</span>
      <h2>Missed calls nobody returns</h2>
      <p class="lede-sm">A missed call from a customer is the warmest lead you will ever get: they wanted to talk to you, right now. Every one left unreturned is a lead that probably went to a competitor who picked up.</p>
      <div class="cards-2">
        <div class="panel"><h3>Why it happens</h3><ul>
          <li>Reps are on another call, on leave, or the call came in after hours.</li>
          <li>No one “owns” the callback, so everyone assumes someone else did it.</li>
          <li>Missed calls sit in each rep’s phone. Managers only see totals, not which numbers were never called back.</li>
        </ul></div>
        <div class="panel"><h3>What the research says</h3><ul>
          <li>In a Harvard Business Review audit of 2,241 US companies, only <strong>37% replied to an enquiry within an hour</strong> and <strong>23% never replied at all</strong> (${src('https://scholarsarchive.byu.edu/facpub/9711', 'HBR 2011')}).</li>
          <li>Calling within 5 minutes instead of 30 gave about <strong>100× higher odds of reaching</strong> the lead and 21× higher odds of qualifying them. It did not measure sales (${src('https://www.real-estate.ca/blog/the-lead-response-management-study', 'MIT/InsideSales, 2007')}).</li>
          <li>There is <strong>no published benchmark for India</strong> on how fast businesses return missed calls. That’s what we’re building.</li>
        </ul></div>
      </div>
      <div class="bench-row">
        ${benchTile('missedNeverReturnedPct', (v) => `${v}%`)}
        ${benchTile('missedMedianCallbackMin', (v) => `${v} min`)}
        ${benchTile('missedReturnedWithin1hPct', (v) => `${v}%`)}
      </div>
      <h3>How to fix it</h3>
      <ol class="steps">
        <li><strong>Set a callback rule</strong>: every missed customer call returned within the same working hour, and never left overnight without a reply.</li>
        <li><strong>Give each missed call an owner</strong>: the rep who last spoke to that number, or a duty rep for new numbers.</li>
        <li><strong>Track two numbers daily</strong>: missed calls not yet returned (a list, not a total), and median callback time.</li>
        <li><strong>Cover the gaps</strong>: look at which hours collect the most missed calls (lunch, after 7 PM) and stagger breaks or shifts.</li>
      </ol>
    </section>

    <section class="section leak" id="leak-attempts">
      <span class="leak-num">Leak 2</span>
      <h2>Giving up after one or two tries</h2>
      <p class="lede-sm">A new lead who doesn’t answer the first call isn’t a dead lead. In India especially, many people don’t pick up unknown numbers, then call back later or answer the second or third time.</p>
      <div class="cards-2">
        <div class="panel"><h3>Why it happens</h3><ul>
          <li>Reps chase daily call targets, so fresh leads feel more productive than redialling.</li>
          <li>No one can see how many times each lead was actually tried, across all reps.</li>
          <li>Retries happen at the same time of day, so they fail for the same reason.</li>
        </ul></div>
        <div class="panel"><h3>What the research says</h3><ul>
          <li>Across about 3.5 million leads, <strong>93% of converted leads were reached by the 6th attempt</strong> (${src('https://www.slideshare.net/Velocify/the-ultimate-contact-strategy', 'Velocify')}). Cognism found 93% of its cold-call conversations happened by call 3 (${src('https://www.cognism.com/cold-calling-report-2025', 'Cognism 2025')}).</li>
          <li>Surveys suggest <strong>71% of companies stop after 3–5 attempts</strong> (${src('https://dev.marketingcharts.com/customer-centric/lead-generation-and-management-115285', 'Ascend2 via MarketingCharts')}).</li>
          <li>In India, <strong>79% of businesses say customers avoid unknown numbers</strong> (${src('https://m.thewire.in/article/ptiprnews/79-percent-indians-avoid-unknown-business-calls-reveals-truecaller-and-tata-tele-business-services-report', 'Truecaller / Tata Tele / Kantar, 2026')}). The first call is the hardest to get answered.</li>
        </ul></div>
      </div>
      <div class="bench-row">
        ${benchTile('connectsByAttempt3Pct', (v) => `${v}%`)}
        ${benchTile('singleAttemptAbandonPct', (v) => `${v}%`)}
      </div>
      <h3>How to fix it</h3>
      <ol class="steps">
        <li><strong>Set a minimum attempt rule</strong> before a lead can be marked “not reachable” (for example, 4–6 attempts over 3–5 days).</li>
        <li><strong>Change the time</strong> between attempts: morning, then evening, then the next day.</li>
        <li><strong>Count attempts per number across the whole team</strong>, not per rep. Two reps calling the same lead twice each is still four attempts.</li>
        <li><strong>Don’t over-dial.</strong> Too many calls in one day get your number marked as spam. Lenders must follow RBI’s 8 AM–7 PM recovery-calling window (${src('https://business-standard.com/amp/article/finance/rbi-directs-loan-recovery-agents-not-to-intimidate-borrowers-no-calling-before-8am-after-7pm-122081201144_1.html', 'RBI, 2022')}).</li>
      </ol>
    </section>

    <section class="section leak" id="leak-timing">
      <span class="leak-num">Leak 3</span>
      <h2>Calling when customers don’t pick up</h2>
      <p class="lede-sm">The same rep, list and script can get very different answer rates at 11 AM and at 5 PM. If most of your dials happen in your team’s worst hours, you’re paying for calls that were never likely to connect.</p>
      <div class="cards-2">
        <div class="panel"><h3>Why it happens</h3><ul>
          <li>Calling hours follow the office routine (dial after the morning meeting) rather than when customers are free.</li>
          <li>“Best time to call” advice online comes from US studies that contradict each other.</li>
          <li>Teams rarely measure answer rate by hour for their own customers.</li>
        </ul></div>
        <div class="panel"><h3>What the research says</h3><ul>
          <li>Studies disagree: InsideSales found late afternoon on Wednesday/Thursday best, WAVV’s 85 million dials favour Monday, and Cognism points to mid-morning (${src('https://www.wavv.com/post/best-time-to-call', 'WAVV')}, ${src('https://www.cognism.com/cold-calling-report-2025', 'Cognism')}).</li>
          <li>Indian vendor analyses also disagree with each other. The honest answer: <strong>the best hour depends on your industry and your customers</strong>.</li>
        </ul></div>
      </div>
      <div class="bench-row">${benchTile('bestHourByIndustry', () => 'See chart')}</div>
      <h3>How to fix it</h3>
      <ol class="steps">
        <li><strong>Measure answer rate by hour</strong> for your own team over at least 2–4 weeks (you need a few hundred calls per hour slot to trust it).</li>
        <li><strong>Move retries, not first calls</strong>: keep fresh leads fast, but schedule second and third attempts in your best hours.</li>
        <li><strong>Use weak hours</strong> for admin, WhatsApp follow-ups and planning.</li>
      </ol>
    </section>

    <section class="section" id="myths">
      <h2>Calling statistics: myths vs evidence</h2>
      <p class="muted">Many sales “stats” are decades old or misquoted. Here’s what the original sources actually say.</p>
      <div class="table-scroll"><table class="matrix">
        <thead><tr><th scope="col">Commonly quoted</th><th scope="col">What the source actually found</th><th scope="col">Verdict</th></tr></thead>
        <tbody>
          <tr><th scope="row">“Call within 5 minutes and you’re 21× more likely to close”</th><td>21× higher odds of <em>qualifying</em> and 100× of <em>reaching</em> a lead, 5 vs 30 minutes. Closing wasn’t measured. US, 2007.</td><td><span class="verdict-tag warn">Misquoted</span></td></tr>
          <tr><th scope="row">“80% of sales need 5 follow-ups; 44% give up after one”</th><td>Traced to a 1942 survey of fewer than 40 people (${src('https://venturebeat.com/marketing/these-incredible-sales-stats-everyone-cites-are-actually-completely-false', 'VentureBeat')}).</td><td><span class="verdict-tag no">Myth</span></td></tr>
          <tr><th scope="row">“Most leads are reached within 6 attempts”</th><td>93% of converted leads reached by attempt 6, ~3.5M leads (Velocify). Measures reaching, not selling.</td><td><span class="verdict-tag ok">Supported</span></td></tr>
          <tr><th scope="row">“Calls over 60–90 seconds are qualified calls”</th><td>A practitioner rule of thumb. No study has tested it against sales outcomes.</td><td><span class="verdict-tag warn">Unproven</span></td></tr>
          <tr><th scope="row">“The best time to call is 4–5 PM on Thursday”</th><td>One US study. Others say Monday or mid-morning. Varies by industry.</td><td><span class="verdict-tag warn">Depends</span></td></tr>
        </tbody>
      </table></div>
    </section>

    <section class="section" id="kpis">
      <h2>The KPIs that actually show lead leaks</h2>
      <p class="muted">Total calls and connect rate tell you how busy the team was. These tell you how many leads you’re losing, and where.</p>
      <div class="table-scroll"><table class="matrix kpi-table">
        <thead><tr><th scope="col">KPI</th><th scope="col">How to calculate it</th><th scope="col">What good looks like</th></tr></thead>
        <tbody>
          <tr><th scope="row">Unreturned missed calls</th><td>Customer numbers with a missed call and no call back from anyone on the team</td><td>Zero at the end of each day</td></tr>
          <tr><th scope="row">Missed-call callback time</th><td>Time from a customer’s missed call to the first call back, median</td><td>Within the same working hour</td></tr>
          <tr><th scope="row">Speed to first call</th><td>Time from a new number first calling in to your first call back</td><td>Minutes, not hours</td></tr>
          <tr><th scope="row">Attempts before giving up</th><td>Calls made to a never-reached number before it goes quiet for 14 days</td><td>4–6, spread across times and days</td></tr>
          <tr><th scope="row">Conversation rate</th><td>Outgoing calls lasting 60 seconds or more ÷ all outgoing calls</td><td>Rising week on week</td></tr>
          <tr><th scope="row">Leads going cold</th><td>Active leads with no connected call in the last 7 days</td><td>Shrinking list</td></tr>
          <tr><th scope="row">Duplicate calling</th><td>Numbers called by 2+ reps in the same week</td><td>Only planned handovers</td></tr>
        </tbody>
      </table></div>
      <p class="small muted">Calculating these needs every call to and from each customer number in order, across all reps. That’s hard in Excel and easy with a call-tracking tool that syncs the whole team’s call logs.</p>
    </section>
  </article>

  <aside class="cta">
    <div>
      <h2>See your team’s leaks automatically</h2>
      <p>Callyzer syncs every rep’s SIM call log, so you can see unreturned missed calls, callback time and attempts per lead without spreadsheets.</p>
    </div>
    <div class="cta-actions">
      <a class="btn btn-primary" href="${utm('cta-band')}" rel="noopener">Start free trial</a>
      <a class="btn btn-ghost" href="${site.demoUrl}" rel="noopener">Book a demo</a>
    </div>
  </aside>

  <section class="section">
    <h2>Related tool</h2>
    <a class="card card-link" href="${BENCH_PATH}"><h3>Call Connect Rate Benchmark →</h3><p>Compare your team’s connect rate with ${industriesData.length} industries, from ${(totals.totalCalls / 1e7).toFixed(1)} crore calls.</p></a>
  </section>

  ${faqBlock(faqs)}
  </div>

  <script type="application/json" id="lk-data">${JSON.stringify(clientData).replace(/</g, '\\u003c')}</script>
  <script src="/tools/lead-leak.js" defer></script>`;

  return layout({
    title: `Lead Leak Calculator: Missed Calls, Follow-ups & Best Time to Call (${site.year})`,
    description: 'Free calculator for Indian sales teams: estimate the revenue lost to unreturned missed calls, leads dropped after one or two tries and calls at the wrong time, with fixes and the evidence behind them.',
    path: LEAK_PATH,
    body,
    schema,
  });
}
