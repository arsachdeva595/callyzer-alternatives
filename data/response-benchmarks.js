// India response benchmarks for /tools/lead-leak-calculator/.
// Status: PENDING. Values stay null until computed from Callyzer per-call data
// (see README "Data request for the lead-leak benchmarks"). The page shows a
// "coming soon" state for any metric whose `value` is null. Never fill these
// with estimates: they are published as first-party data.
export const responseMeta = {
  period: null, // e.g. 'September–October 2026' once computed
  calls: null, // number of calls the benchmarks are computed from
};

export const responseBenchmarks = {
  // Leak 1: missed calls
  missedNeverReturnedPct: { value: null, label: 'of missed customer calls are never called back (within 7 days)' },
  missedMedianCallbackMin: { value: null, label: 'median time to call back a missed customer call' },
  missedReturnedWithin1hPct: { value: null, label: 'of missed calls are returned within 1 hour' },
  // Leak 2: attempts
  connectsByAttempt3Pct: { value: null, label: 'of first connects happen by the 3rd attempt' },
  singleAttemptAbandonPct: { value: null, label: 'of unanswered new numbers are never tried a second time' },
  // Leak 3: timing
  bestHourByIndustry: { value: null, label: 'answer rate by hour of day, by industry' },
};
