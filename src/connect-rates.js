// Derives every benchmark metric from the raw counts in data/connect-rates.js.
import { connectRows, connectMeta } from '../data/connect-rates.js';

const pct = (num, den) => (den ? (num / den) * 100 : 0);
const round1 = (n) => Math.round(n * 10) / 10;

function derive(r) {
  const incomingCalls = r.totalCalls - r.outgoingCalls;
  const connectedIncoming = r.connectedCalls - r.connectedOutgoing;
  const outgoing = pct(r.connectedOutgoing, r.outgoingCalls);
  return {
    ...r,
    overall: round1(pct(r.connectedCalls, r.totalCalls)),
    outgoing: round1(outgoing),
    incoming: round1(pct(connectedIncoming, incomingCalls)),
    outShare: round1(pct(r.outgoingCalls, r.totalCalls)),
    // Dials needed for 100 connected outgoing calls.
    dialsPer100: Math.round(10000 / outgoing),
    ranked: r.totalCalls >= connectMeta.minRankedCalls,
  };
}

export const industriesData = connectRows.map(derive);
export const rankedData = industriesData.filter((r) => r.ranked);
export const lowSampleData = industriesData.filter((r) => !r.ranked);

const sum = (k) => connectRows.reduce((a, r) => a + r[k], 0);
export const totals = derive({
  slug: 'all',
  name: 'All industries',
  totalCalls: sum('totalCalls'),
  connectedCalls: sum('connectedCalls'),
  outgoingCalls: sum('outgoingCalls'),
  connectedOutgoing: sum('connectedOutgoing'),
});

export const sortBy = (rows, key, dir = 'desc') =>
  [...rows].sort((a, b) => (dir === 'desc' ? b[key] - a[key] : a[key] - b[key]));

// Pearson correlation, used to describe (not overstate) the dial-volume pattern.
export function correlation(rows, kx, ky) {
  const n = rows.length;
  const mx = rows.reduce((a, r) => a + r[kx], 0) / n;
  const my = rows.reduce((a, r) => a + r[ky], 0) / n;
  let sxy = 0, sxx = 0, syy = 0;
  rows.forEach((r) => {
    const dx = r[kx] - mx, dy = r[ky] - my;
    sxy += dx * dy; sxx += dx * dx; syy += dy * dy;
  });
  return sxy / Math.sqrt(sxx * syy);
}

export { connectMeta };
