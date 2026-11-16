// Lead Leak Calculator: estimates monthly ₹ lost to unreturned missed calls and
// to giving up on new leads too early. Formulas are shown on the page and in the FAQ.
(() => {
  const D = JSON.parse(document.getElementById('lk-data').textContent);
  const $ = (id) => document.getElementById(id);
  const bySlug = Object.fromEntries(D.industries.map((r) => [r.slug, r]));
  const TARGET_ATTEMPTS = 6;
  const IDS = ['industry', 'deal', 'conv', 'missed', 'returned', 'enquiry', 'leads', 'attempts', 'p'];
  const el = (k) => $(`lk-${k}`);
  const val = (k) => { const v = parseFloat(el(k).value); return Number.isFinite(v) ? v : NaN; };
  const clampPct = (v) => Math.min(100, Math.max(0, v));
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
  const nf = (n, d = 0) => Number(n).toLocaleString('en-IN', { maximumFractionDigits: d, minimumFractionDigits: d });

  // ₹ in Indian units: 4,50,000 → ₹4.5 lakh; 2,30,00,000 → ₹2.3 crore.
  const inr = (n) => {
    if (n >= 1e7) return `₹${nf(n / 1e7, n >= 1e8 ? 0 : 1)} crore`;
    if (n >= 1e5) return `₹${nf(n / 1e5, n >= 1e6 ? 0 : 1)} lakh`;
    return `₹${nf(Math.round(n / 100) * 100)}`;
  };
  const range = (lo, hi) => (Math.round(lo) === Math.round(hi) || inr(lo) === inr(hi) ? inr(hi) : `${inr(lo)}–${inr(hi)}`);

  // Share of leads reached within k attempts. First attempt connects at p; later
  // attempts at p × decay (decay 1 = optimistic, 0.5 = conservative).
  const reached = (k, p, decay) => {
    let miss = 1 - p;
    for (let i = 2; i <= k; i++) miss *= 1 - p * decay;
    return 1 - miss;
  };

  let lastIndustry = null;
  function render() {
    const ind = bySlug[el('industry').value];
    if (ind.slug !== lastIndustry) { el('p').value = ind.outgoing; lastIndustry = ind.slug; }
    const deal = val('deal'), conv = clampPct(val('conv')) / 100;
    const missed = val('missed'), returned = clampPct(val('returned')) / 100, enquiry = clampPct(val('enquiry')) / 100;
    const leads = val('leads'), k = parseInt(el('attempts').value, 10), p = clampPct(val('p')) / 100;
    const out = $('leak-result');
    if ([deal, conv, missed, returned, enquiry, leads, p].some((x) => !Number.isFinite(x)) || p <= 0) {
      out.innerHTML = '<p class="hint">Fill in all the fields to see your estimate.</p>';
      return;
    }

    // Leak 1: missed calls
    const unreturned = missed * (1 - returned);
    const lostEnquiries = unreturned * enquiry;
    const leak1 = lostEnquiries * conv * deal;

    // Leak 2: giving up early (range)
    // At high connect rates the "same rate" case reaches almost everyone early, so it
    // can gain less from extra attempts than the decaying case: order the pair.
    const a = leads * (reached(TARGET_ATTEMPTS, p, 1) - reached(k, p, 1));
    const b = leads * (reached(TARGET_ATTEMPTS, p, 0.5) - reached(k, p, 0.5));
    const extraLo = Math.min(a, b), extraHi = Math.max(a, b);
    const leak2Hi = extraHi * conv * deal, leak2Lo = extraLo * conv * deal;

    const totLo = leak1 + leak2Lo, totHi = leak1 + leak2Hi;
    const sales = (n) => nf(n * conv, n * conv < 10 ? 1 : 0);

    out.innerHTML = `
      <div class="res-head res-below">
        <div class="res-big"><span>Estimated sales lost every month</span><strong>${range(totLo, totHi)}</strong></div>
        <p class="res-line">That’s about <b>${range(totLo * 12, totHi * 12)} a year</b> from two fixable leaks.</p>
      </div>
      <div class="leak-cards">
        <div class="leak-card">
          <span class="leak-card-k">Leak 1 · Missed calls</span>
          <strong>${inr(leak1)}</strong>
          <p><b>${nf(unreturned)}</b> missed calls a month never get a call back. About <b>${nf(lostEnquiries)}</b> are sales enquiries, worth roughly <b>${sales(lostEnquiries)} sales</b>.</p>
          <p class="leak-fix">Fix: return every missed call within the hour, with a named owner.</p>
        </div>
        <div class="leak-card">
          <span class="leak-card-k">Leak 2 · Giving up after ${k} ${k === 1 ? 'try' : 'tries'}</span>
          <strong>${range(leak2Lo, leak2Hi)}</strong>
          <p>At a ${nf(p * 100, 1)}% connect rate, going from ${k} to ${TARGET_ATTEMPTS} attempts would reach about <b>${nf(extraLo)}–${nf(extraHi)}</b> more of your ${nf(leads)} new leads a month.</p>
          <p class="leak-fix">Fix: 4–6 attempts per lead, at different times of day.</p>
        </div>
      </div>
      <details class="how"><summary>How this is calculated</summary>
        <p><b>Missed calls:</b> ${nf(missed)} × ${nf((1 - returned) * 100)}% not returned × ${nf(enquiry * 100)}% enquiries × ${nf(conv * 100, 1)}% conversion × ₹${nf(deal)}.</p>
        <p><b>Attempts:</b> extra leads reached between attempt ${k} and ${TARGET_ATTEMPTS}, shown as a range between two assumptions: every attempt connects ${nf(p * 100, 1)}% of the time, or later attempts connect half as often. × conversion × deal value. Connect rate defaults to the ${esc(ind.name)} average from our benchmark; change it to your own.</p>
        <p>Leak 3 (calling at the wrong time) isn’t included: it needs answer rates by hour, which we’re adding as an India benchmark.</p>
      </details>
      <div class="res-actions">
        <a class="btn btn-primary" href="${D.ctaUrl}" rel="noopener">Find these leads in Callyzer</a>
        <button type="button" class="btn btn-ghost" id="lk-copy">Copy link</button>
        <a class="btn btn-ghost" id="lk-wa" target="_blank" rel="noopener" href="#">Share on WhatsApp</a>
      </div>`;

    syncUrl();
    const url = location.href;
    $('lk-copy').addEventListener('click', async (e) => {
      const b = e.currentTarget;
      try { await navigator.clipboard.writeText(url); b.textContent = 'Link copied'; } catch { prompt('Copy this link', url); }
      setTimeout(() => { b.textContent = 'Copy link'; }, 2000);
    });
    $('lk-wa').href = `https://wa.me/?text=${encodeURIComponent(`Our telecalling team may be losing ${range(totLo, totHi)} a month in leads. Check yours: ${url}`)}`;
  }

  function syncUrl() {
    const p = new URLSearchParams();
    IDS.forEach((k) => p.set(k, el(k).value));
    history.replaceState(null, '', `${location.pathname}?${p}`);
  }

  function loadUrl() {
    const p = new URLSearchParams(location.search);
    if (p.get('industry') && bySlug[p.get('industry')]) { el('industry').value = p.get('industry'); lastIndustry = p.get('industry'); }
    IDS.filter((k) => k !== 'industry').forEach((k) => { if (p.get(k) !== null && p.get(k) !== '') el(k).value = p.get(k); });
    if (!p.get('p')) lastIndustry = null; // fill the industry default
  }

  $('leak-form').addEventListener('input', render);
  $('leak-form').addEventListener('submit', (e) => e.preventDefault());
  loadUrl();
  render();
})();
