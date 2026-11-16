// Call Connect Rate Benchmark: client-side calculator, leaderboard toggles and share links.
(() => {
  const D = JSON.parse(document.getElementById('cr-data').textContent);
  const $ = (id) => document.getElementById(id);
  const bySlug = Object.fromEntries(D.industries.map((r) => [r.slug, r]));
  const ranked = D.industries.filter((r) => r.ranked);
  const nf = (n, d = 0) => Number(n).toLocaleString('en-IN', { maximumFractionDigits: d, minimumFractionDigits: d });
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
  const num = (el) => { const v = parseFloat(el.value); return Number.isFinite(v) ? v : NaN; };
  const WORKING_DAYS = 26;
  const MODE_LABEL = { outgoing: 'outgoing', overall: 'overall' };

  // ---------- tabs ----------
  const tabs = document.querySelectorAll('.tool-tab');
  const showTab = (name) => {
    tabs.forEach((t) => {
      const on = t.dataset.tab === name;
      t.classList.toggle('active', on);
      t.setAttribute('aria-selected', on);
      $(t.getAttribute('aria-controls')).hidden = !on;
    });
  };
  tabs.forEach((t) => t.addEventListener('click', () => { showTab(t.dataset.tab); syncUrl(); }));

  // ---------- shared: highlight selected industry ----------
  let selected = $('bench-industry').value;
  const highlight = (slug) => {
    selected = slug;
    document.querySelectorAll('#lb-body tr').forEach((tr) => tr.classList.toggle('is-selected', tr.dataset.slug === slug));
    document.querySelectorAll('.sc-pt').forEach((g) => g.classList.toggle('is-selected', g.dataset.slug === slug));
  };

  // ---------- benchmark ----------
  const bf = $('bench-form');
  const mode = () => bf.querySelector('input[name=mode]:checked').value;

  // Horizontal comparison bars: no overlapping labels, readable on phones.
  function compareBars(rows) {
    const max = Math.max(...rows.map((r) => r.v)) * 1.1;
    return `<div class="cmp">${rows.map((r) => `
      <div class="cmp-row ${r.cls}"><span class="cmp-lbl">${esc(r.label)}</span>
        <span class="cmp-bar"><span style="width:${((r.v / max) * 100).toFixed(1)}%"></span></span>
        <span class="cmp-val">${nf(r.v, 1)}%</span></div>`).join('')}</div>`;
  }

  function renderBench() {
    const ind = bySlug[$('bench-industry').value];
    const m = mode();
    const dials = num($('bench-dials')), conn = num($('bench-connected'));
    $('lbl-dials').textContent = m === 'outgoing' ? 'Calls your team dialled' : 'Total calls (incoming + outgoing)';
    $('lbl-conn').textContent = m === 'outgoing' ? 'How many of those connected' : 'How many connected';
    highlight(ind.slug);
    const out = $('bench-result');
    if (!(dials > 0) || !(conn >= 0)) { out.innerHTML = `<p class="hint">Enter your calls and connected calls to see how you compare.</p>`; return; }
    if (conn > dials) { out.innerHTML = `<p class="error">Connected calls can’t be more than total calls.</p>`; return; }

    const you = (conn / dials) * 100;
    const avg = ind[m];
    const diff = you - avg;
    const tier = diff >= 2 ? 'above' : diff <= -2 ? 'below' : 'par';
    const top = ranked.reduce((a, r) => (r[m] > a[m] ? r : a));
    const beat = ranked.filter((r) => r[m] < you).length;
    const perCall = Math.abs(diff) / 100;
    const monthly = Math.round(dials * perCall);

    const head = {
      above: `You’re <b>${nf(diff, 1)} points above</b> the ${esc(ind.name)} average`,
      par: `You’re <b>on par</b> with the ${esc(ind.name)} average`,
      below: `You’re <b>${nf(-diff, 1)} points below</b> the ${esc(ind.name)} average`,
    }[tier];
    const impact = tier === 'below'
      ? `At the industry average, the same <b>${nf(dials)}</b> calls would give you <b class="pos">+${nf(monthly)} more conversations</b>. That’s ${nf(perCall * 100, 1)} extra for every 100 calls.`
      : tier === 'above'
        ? `On the same <b>${nf(dials)}</b> calls, you get <b class="pos">${nf(monthly)} more conversations</b> than an average ${esc(ind.name)} team.`
        : `Your rate is within 2 points of the industry average. Top industries reach ${nf(top[m], 1)}%.`;
    const tip = {
      below: 'Biggest quick wins: call new leads within 5 minutes, retry unanswered numbers at a different time of day, and stop redialling numbers that never pick up.',
      par: 'To move above average, track connect rate per rep: the gap between your best and worst caller is usually bigger than the gap to the industry.',
      above: 'Keep it there: watch the rate weekly per rep and per lead source, so a bad list or a struggling rep shows up early.',
    }[tier];

    out.innerHTML = `
      <div class="res-head res-${tier}">
        <div class="res-big"><span>Your ${MODE_LABEL[m]} connect rate</span><strong>${nf(you, 1)}%</strong></div>
        <p class="res-line">${head} (${nf(avg, 1)}%).</p>
      </div>
      ${compareBars([
        { label: 'Your team', v: you, cls: 'c-you' },
        { label: `${ind.name} avg`, v: avg, cls: 'c-ind' },
        { label: 'All industries', v: D.all[m], cls: '' },
        { label: `Best: ${top.name}`, v: top[m], cls: '' },
      ])}
      <ul class="res-facts">
        <li>${impact}</li>
        <li>Your rate beats <b>${beat} of ${ranked.length}</b> industry averages. Best: ${esc(top.name)} at ${nf(top[m], 1)}%.</li>
        ${ind.ranked ? '' : '<li class="warn">This industry has a small sample in our data, so treat its average as a rough guide.</li>'}
      </ul>
      <p class="res-tip">${tip}</p>
      <div class="res-actions">
        <a class="btn btn-primary" href="${D.ctaUrl}" rel="noopener">Track this per rep with Callyzer</a>
        <button type="button" class="btn btn-ghost" data-share="copy">Copy link</button>
        <a class="btn btn-ghost" data-share="wa" target="_blank" rel="noopener" href="#">Share on WhatsApp</a>
      </div>`;
    const waText = `Our ${MODE_LABEL[m]} call connect rate is ${nf(you, 1)}% vs the ${ind.name} average of ${nf(avg, 1)}% (${D.meta.period} benchmark). Check yours: `;
    wireShare(out, waText);
  }

  // ---------- plan ----------
  function renderPlan() {
    const ind = bySlug[$('plan-industry').value];
    const target = num($('plan-target')), cap = num($('plan-capacity'));
    const own = num($('plan-own'));
    const useOwn = own > 0 && own <= 100;
    const rate = useOwn ? own : ind.outgoing;
    highlight(ind.slug);
    const out = $('plan-result');
    if (!(target > 0) || !(cap > 0)) { out.innerHTML = `<p class="hint">Enter your daily conversation target and rep capacity.</p>`; return; }

    const dialsFor = (r) => Math.ceil(target / (r / 100));
    const dials = dialsFor(rate);
    const reps = Math.ceil(dials / cap);
    const top = ranked.reduce((a, r) => (r.outgoing > a.outgoing ? r : a));
    const lift = Math.min(100, rate + 5);
    const liftDials = dialsFor(lift);
    const liftReps = Math.ceil(liftDials / cap);

    out.innerHTML = `
      <div class="res-head res-par">
        <div class="res-big"><span>Dials needed per day</span><strong>${nf(dials)}</strong></div>
        <p class="res-line">To get <b>${nf(target)}</b> conversations a day at a <b>${nf(rate, 1)}%</b> connect rate${useOwn ? ' (yours)' : ` (${esc(ind.name)} average)`}.</p>
      </div>
      <div class="plan-stats">
        <div><strong>${nf(reps)}</strong><span>reps at ${nf(cap)} dials/day</span></div>
        <div><strong>${nf(dials * WORKING_DAYS)}</strong><span>dials a month (${WORKING_DAYS} days)</span></div>
        <div><strong>${nf(100 / rate, 1)}</strong><span>dials per conversation</span></div>
      </div>
      <ul class="res-facts">
        <li>Raise your connect rate by 5 points (to ${nf(lift, 1)}%) and you need <b class="pos">${nf(dials - liftDials)} fewer dials a day</b>${reps - liftReps > 0 ? `, about <b>${reps - liftReps} fewer rep${reps - liftReps > 1 ? 's' : ''}</b>` : ''}.</li>
        <li>The same target takes ${nf(dialsFor(top.outgoing))} dials/day in ${esc(top.name)} (${nf(top.outgoing, 1)}%) and ${nf(dialsFor(D.all.outgoing))} at the all-industry average (${nf(D.all.outgoing, 1)}%).</li>
        ${ind.ranked || useOwn ? '' : '<li class="warn">This industry has a small sample in our data, so treat its average as a rough guide.</li>'}
      </ul>
      <div class="res-actions">
        <a class="btn btn-primary" href="${D.ctaUrl}" rel="noopener">See each rep’s dials and connects in Callyzer</a>
        <button type="button" class="btn btn-ghost" data-share="copy">Copy link</button>
      </div>`;
    wireShare(out, '');
  }

  // ---------- share + URL state ----------
  function syncUrl() {
    const p = new URLSearchParams();
    const tab = document.querySelector('.tool-tab.active').dataset.tab;
    if (tab === 'plan') {
      p.set('tab', 'plan'); p.set('i', $('plan-industry').value);
      p.set('t', $('plan-target').value); p.set('cap', $('plan-capacity').value);
      if ($('plan-own').value) p.set('own', $('plan-own').value);
    } else {
      p.set('i', $('bench-industry').value); p.set('m', mode());
      p.set('d', $('bench-dials').value); p.set('c', $('bench-connected').value);
    }
    history.replaceState(null, '', `${location.pathname}?${p}`);
  }

  function wireShare(root, waText) {
    const url = () => location.href;
    const copy = root.querySelector('[data-share=copy]');
    copy?.addEventListener('click', async () => {
      try { await navigator.clipboard.writeText(url()); copy.textContent = 'Link copied'; }
      catch { prompt('Copy this link', url()); }
      setTimeout(() => { copy.textContent = 'Copy link'; }, 2000);
    });
    const wa = root.querySelector('[data-share=wa]');
    if (wa) wa.href = `https://wa.me/?text=${encodeURIComponent(waText + url())}`;
  }

  function loadUrl() {
    const p = new URLSearchParams(location.search);
    const i = p.get('i');
    if (p.get('tab') === 'plan') {
      showTab('plan');
      if (bySlug[i]) $('plan-industry').value = i;
      if (p.get('t')) $('plan-target').value = p.get('t');
      if (p.get('cap')) $('plan-capacity').value = p.get('cap');
      if (p.get('own')) $('plan-own').value = p.get('own');
    } else {
      if (bySlug[i]) $('bench-industry').value = i;
      const m = bf.querySelector(`input[name=mode][value="${p.get('m')}"]`);
      if (m) m.checked = true;
      if (p.get('d')) $('bench-dials').value = p.get('d');
      if (p.get('c')) $('bench-connected').value = p.get('c');
    }
    // Keep both tabs on the same industry by default.
    if (bySlug[i]) { $('bench-industry').value = i; $('plan-industry').value = i; }
  }

  bf.addEventListener('input', () => { renderBench(); syncUrl(); });
  $('plan-form').addEventListener('input', () => { renderPlan(); syncUrl(); });
  $('bench-industry').addEventListener('change', (e) => { $('plan-industry').value = e.target.value; });
  $('plan-industry').addEventListener('change', (e) => { $('bench-industry').value = e.target.value; });
  [bf, $('plan-form')].forEach((f) => f.addEventListener('submit', (e) => e.preventDefault()));

  // ---------- leaderboard metric toggle ----------
  const lbBody = $('lb-body');
  const fmt = (key, v) => (key === 'dialsPer100' ? nf(v) : `${nf(v, 1)}%`);
  const allVal = { outgoing: D.all.outgoing, overall: D.all.overall, incoming: D.all.incoming, dialsPer100: Math.round(10000 / D.all.outgoing) };
  function renderBoard(key) {
    const meta = D.metrics.find((x) => x.key === key);
    const sort = (rows) => [...rows].sort((a, b) => (meta.dir === 'desc' ? b[key] - a[key] : a[key] - b[key]));
    const max = Math.max(...D.industries.map((r) => r[key]));
    const row = (r, i) => `<tr data-slug="${r.slug}"${r.slug === selected ? ' class="is-selected"' : ''}>
      <td class="lb-rank">${r.ranked ? i + 1 : '–'}</td>
      <th scope="row">${esc(r.name)}${r.ranked ? '' : ' <span class="tag">Low sample</span>'}</th>
      <td class="lb-bar-cell"><span class="lb-bar"><span style="width:${((r[key] / max) * 100).toFixed(1)}%"></span></span></td>
      <td class="lb-val">${fmt(key, r[key])}</td>
      <td class="lb-calls">${nf(r.calls)}</td></tr>`;
    lbBody.innerHTML = sort(ranked).map(row).join('') + sort(D.industries.filter((r) => !r.ranked)).map((r) => row(r, 0)).join('');
    $('lb-col').textContent = meta.label;
    $('lb-note').textContent = meta.note;
    $('lb-all').textContent = fmt(key, allVal[key]);
  }
  $('lb-metrics').addEventListener('click', (e) => {
    const chip = e.target.closest('.chip');
    if (!chip) return;
    document.querySelectorAll('#lb-metrics .chip').forEach((c) => { const on = c === chip; c.classList.toggle('active', on); c.setAttribute('aria-pressed', on); });
    renderBoard(chip.dataset.metric);
  });
  // Clicking a leaderboard row selects that industry in the calculator.
  lbBody.addEventListener('click', (e) => {
    const tr = e.target.closest('tr[data-slug]');
    if (!tr) return;
    $('bench-industry').value = tr.dataset.slug; $('plan-industry').value = tr.dataset.slug;
    renderBench(); renderPlan(); syncUrl();
    $('tool').scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  loadUrl();
  renderBench();
  renderPlan();
})();
