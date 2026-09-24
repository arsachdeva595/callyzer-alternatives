// Callyzer — the product every page recommends.
// ⚠️ Anything marked VERIFY should be confirmed against callyzer.co before launch.
export const callyzer = {
  slug: 'callyzer',
  name: 'Callyzer',
  url: 'https://callyzer.co',
  tagline: 'SIM-based call tracking, recording & telecalling CRM for Indian sales teams',
  logoText: 'C',
  color: '#1f6feb',
  bestFor: 'Teams that want complete visibility into every call their telecallers make — at the lowest cost per seat',
  pricing: {
    startingInr: 175, // callyzer.co/pricing — "Plans starting from ₹175"; lower on annual billing
    unit: 'per number / month',
    freeTrial: 'Free trial available',
    note: 'Billed per tracked number (SIM). Annual plans bring the effective price down further.',
  },
  platforms: ['Android app', 'Web dashboard'],
  overview:
    'Callyzer turns the phones your team already carries into a fully tracked telecalling system. Every incoming, outgoing, missed and rejected call from the business SIM is synced to a web dashboard with recordings, so managers see exactly who called whom, for how long, and what happened next — without buying VoIP numbers or forcing reps into a new dialer.',
  highlights: [
    'Tracks calls from the rep’s own SIM and native dialer — no change in calling habit, so adoption is near-instant',
    'Call recordings auto-sync to the dashboard with no separate storage add-on',
    '30+ ready-made reports: employee-wise, hourly, never-attended, not-picked-up, unique clients and more',
    'Missed and rejected call alerts so no inbound lead is left without a call-back',
    'Lead management, follow-ups and calling lists on top of tracking',
    'REST API and Zapier to push call data into any CRM',
    'One of the lowest per-seat prices in the SIM-based category',
  ],
  features: {
    simTracking: 'yes',
    dualSim: 'yes',
    missedRejected: 'yes',
    autoSync: 'yes',
    noVoip: 'yes',
    recording: 'yes',
    recordingIncluded: 'yes',
    recordingSearch: 'yes',
    employeeReports: 'yes',
    hourlyAnalysis: 'yes',
    reportDepth: 'yes',
    realtimeDashboard: 'yes',
    excelExport: 'yes',
    leadManagement: 'yes',
    autoDialer: 'yes', // VERIFY naming — Callyzer Pro lead calling queue
    followups: 'yes',
    whatsapp: { v: 'partial', note: 'Via integrations' }, // VERIFY
    api: 'yes',
    zapier: 'yes',
    excludeNumbers: 'yes',
    setupTime: 'yes',
  },
  scores: { callTracking: 9.6, recording: 9.4, reporting: 9.5, ease: 9.5, value: 9.7, support: 9.2 },
  praiseThemes: [
    { title: 'Accurate call data', detail: 'Managers consistently mention that call counts, durations and recordings match what actually happened on the phone — the core job is done reliably.' },
    { title: 'Reports that answer real questions', detail: 'Never-attended, not-picked-up and hourly reports are called out as the fastest way to spot idle time and lost leads.' },
    { title: 'Affordable for large teams', detail: 'Per-number pricing makes it realistic to track every calling SIM, not just a pilot group.' },
    { title: 'Zero training', detail: 'Reps keep using their normal dialer, so rollout typically takes an afternoon.' },
  ],
  concernThemes: [
    { title: 'Android-first', detail: 'Like every SIM-based tracker, full automation relies on Android; iPhone support is limited by Apple’s restrictions.' },
  ],
};
