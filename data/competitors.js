// Competitor profiles. One entry = one "callyzer-vs-{slug}" page, one
// "{slug}-alternatives" page, and N "{a}-vs-{b}" pages. Add a competitor here
// and rebuild — every page type and internal link updates automatically.
//
// SENTIMENT DATA: `praiseThemes` / `complaintThemes` summarise recurring themes
// seen across public reviews (Play Store, G2, Capterra, Reddit, LinkedIn).
// Before launch, validate each theme against real threads and add verbatim,
// linked quotes to `quotes` (rendered only when present). Never invent quotes.
//
// PRICING: `startingInr: null` renders as "On request". Re-check every quarter.

export const competitors = [
  {
    slug: 'runo',
    name: 'Runo',
    url: 'https://runo.ai',
    logoText: 'R',
    color: '#e8590c',
    bestFor: 'SIM-based call management & productivity',
    summary:
      'Popular SIM-based telecalling and call-management app focused on lifting connect ratios and telecalling productivity for Indian teams. Strong at the calling function.',
    overview:
      'Runo is a call-management CRM that works on the rep’s SIM and adds an in-app dialer, lead allocation, custom fields and dispositions. It is built around the calling workflow: reps open the Runo app, call from a queue, tag outcomes and schedule follow-ups.',
    pricing: { startingInr: 599, unit: 'per user / month (annual)', note: 'Publicly listed starting price on an annual plan; 10-day free trial.' },
    platforms: ['Android app', 'Web dashboard'],
    features: {
      simTracking: 'yes', dualSim: 'yes', missedRejected: 'yes', autoSync: 'yes', noVoip: 'yes',
      recording: 'yes', recordingIncluded: 'partial', recordingSearch: 'yes',
      employeeReports: 'yes', hourlyAnalysis: 'partial', reportDepth: 'partial', realtimeDashboard: 'yes', excelExport: 'yes',
      leadManagement: 'yes', autoDialer: 'yes', followups: 'yes', whatsapp: 'yes',
      api: 'yes', zapier: 'partial', excludeNumbers: 'partial', setupTime: 'partial',
    },
    scores: { callTracking: 8.8, recording: 8.6, reporting: 8.3, ease: 8.0, value: 7.4, support: 8.4 },
    strengths: [
      'Solid in-app dialer and calling queue for outbound-heavy teams',
      'Custom fields and dispositions for structured lead qualification',
      'Mature product with a large Indian customer base',
    ],
    weaknesses: [
      'Per-user price is roughly 3× Callyzer’s entry price',
      'Reps have to work inside the Runo app, which adds a change-management step',
      'Reporting is focused on the dialer workflow rather than every call on the SIM',
    ],
    praiseThemes: [
      { title: 'Good for high-volume outbound', detail: 'Reviewers running dialing campaigns like the queue-based calling and quick disposition tagging.' },
      { title: 'Helpful onboarding', detail: 'Several reviews mention responsive onboarding and account managers.' },
    ],
    complaintThemes: [
      { title: 'Cost adds up with team size', detail: 'Buyers with 20+ telecallers frequently flag per-user pricing as the main reason to look elsewhere.' },
      { title: 'Learning curve for custom setups', detail: 'Configuring fields, stages and allocation rules takes admin time before the team is productive.' },
      { title: 'App-first workflow', detail: 'Calls made outside the app flow need discipline to be captured with full context.' },
    ],
    callyzerEdge: [
      { title: 'Track every call, not just dialer calls', detail: 'Callyzer reads the native call log on the business SIM, so walk-in call-backs, personal-dialer calls and inbound enquiries are all captured automatically.' },
      { title: 'Roughly one-third the cost per seat', detail: 'At ₹175 vs ₹599 starting price, a 25-member team saves over ₹10,000 every month with Callyzer.' },
      { title: 'Deeper call analytics out of the box', detail: '30+ prebuilt reports — never-attended, not-picked-up, hourly trends, unique clients — without building custom views.' },
      { title: 'Zero behaviour change for reps', detail: 'Telecallers keep using their phone’s dialer; managers get data from day one.' },
    ],
    chooseCompetitorIf: ['Your team only makes outbound calls from a fixed dialing queue and you want dialing to live inside one app'],
    switching: [
      'Export your lead list and dispositions from Runo as CSV',
      'Install Callyzer on each business phone and link the SIM',
      'Import leads into Callyzer and map stages to your existing dispositions',
      'Run both apps in parallel for one week to compare call counts',
      'Switch off Runo seats once reports match',
    ],
    faqs: [
      { q: 'Is Callyzer cheaper than Runo?', a: 'Yes. Callyzer starts at ₹175 per number per month, while Runo’s published starting price is ₹599 per user per month on an annual plan. For most team sizes Callyzer costs about one-third as much.' },
      { q: 'Does Callyzer have an auto dialer like Runo?', a: 'Yes. Callyzer includes lead management with calling lists and follow-ups, while also tracking every call made from the SIM — including calls placed outside the dialer.' },
      { q: 'Can I move my Runo data to Callyzer?', a: 'Yes. Export leads from Runo as CSV and import them into Callyzer. Call history going forward is captured automatically from the SIM.' },
    ],
    quotes: [],
    sources: [
      { label: 'Runo website', url: 'https://runo.ai' },
      { label: 'Runo on Google Play', url: 'https://play.google.com/store/apps/details?id=in.runo.call_crm' },
      { label: 'Runo reviews on G2', url: 'https://www.g2.com/products/runo-call-management-crm/reviews' },
    ],
  },
  {
    slug: 'godial',
    name: 'GoDial',
    url: 'https://godial.cc',
    logoText: 'G',
    color: '#2f9e44',
    bestFor: 'Simple auto dialer for small teams',
    summary:
      'Lightweight telecalling CRM and auto dialer that’s fast to deploy on Android. Good for small calling teams that want dialing and basic reporting without complexity.',
    overview:
      'GoDial is a mobile-first auto dialer: you upload a list, the app dials numbers one after another from the rep’s SIM, and reps mark dispositions. It is intentionally simple, which makes it quick to start but lighter on tracking and analytics.',
    pricing: { startingInr: 350, unit: 'per member / month', note: 'Published starting price; enterprise plans on request.' },
    platforms: ['Android app', 'Web dashboard'],
    features: {
      simTracking: 'partial', dualSim: 'partial', missedRejected: 'partial', autoSync: 'yes', noVoip: 'yes',
      recording: 'yes', recordingIncluded: 'partial', recordingSearch: 'partial',
      employeeReports: 'yes', hourlyAnalysis: 'no', reportDepth: 'no', realtimeDashboard: 'partial', excelExport: 'yes',
      leadManagement: 'yes', autoDialer: 'yes', followups: 'yes', whatsapp: 'yes',
      api: 'yes', zapier: 'yes', excludeNumbers: 'no', setupTime: 'yes',
    },
    scores: { callTracking: 7.4, recording: 7.8, reporting: 7.0, ease: 8.8, value: 8.0, support: 7.6 },
    strengths: ['Very quick to set up for list-based dialing', 'Simple interface for new telecallers', 'Lead-source integrations for common ad platforms'],
    weaknesses: [
      'Tracking centres on dialer calls; calls outside the app are less visible',
      'Limited analytics beyond basic call counts and dispositions',
      'Fewer controls for managers of larger teams',
    ],
    praiseThemes: [
      { title: 'Fast to start', detail: 'Small teams like that they can upload a sheet and start dialing the same day.' },
      { title: 'Easy for freshers', detail: 'The one-tap dialing flow works for new telecallers without training.' },
    ],
    complaintThemes: [
      { title: 'Reporting outgrown quickly', detail: 'As teams grow, managers ask for hourly, idle-time and never-attended views that aren’t there.' },
      { title: 'Blind spots outside the dialer', detail: 'Inbound calls and call-backs from the native dialer are harder to audit.' },
      { title: 'Support response times', detail: 'Some reviewers mention slower responses on lower plans.' },
    ],
    callyzerEdge: [
      { title: 'Full call visibility, inbound included', detail: 'Callyzer logs every incoming, outgoing, missed and rejected call on the business SIM — GoDial focuses on what’s dialed from its list.' },
      { title: 'Analytics that scale with the team', detail: 'Hourly analysis, never-attended and employee comparisons help managers of 10–500 reps, not just 3–5.' },
      { title: 'Half the entry price', detail: '₹175 vs ₹350 per seat to start — and recordings are included.' },
      { title: 'Privacy controls', detail: 'Exclude personal numbers so reps are comfortable having tracking on their phone.' },
    ],
    chooseCompetitorIf: ['You are a 2–3 person team that only needs a bare-bones list dialer this month'],
    switching: [
      'Download your contact lists and dispositions from GoDial',
      'Install Callyzer on the team’s phones — no new dialer to learn',
      'Import lists into Callyzer lead management',
      'Turn on missed-call alerts so inbound enquiries get call-backs',
      'Cancel GoDial seats at the end of the billing cycle',
    ],
    faqs: [
      { q: 'Is Callyzer better than GoDial for call tracking?', a: 'Yes. GoDial is primarily an auto dialer, while Callyzer is built to track every call on the SIM — incoming, outgoing, missed and rejected — with recordings and 30+ reports.' },
      { q: 'Which is cheaper, GoDial or Callyzer?', a: 'Callyzer starts at ₹175 per number per month versus GoDial’s published ₹350 per member per month.' },
      { q: 'Can small teams use Callyzer?', a: 'Yes. Callyzer is priced per number, so a team of two pays for two numbers and can scale without changing plans.' },
    ],
    quotes: [],
    sources: [
      { label: 'GoDial website', url: 'https://godial.cc' },
      { label: 'GoDial pricing', url: 'https://godial.cc/pricing/' },
    ],
  },
  {
    slug: 'neodove',
    name: 'NeoDove',
    url: 'https://neodove.com',
    logoText: 'N',
    color: '#7048e8',
    bestFor: 'Structured telecalling campaigns',
    summary:
      'Telecalling-first CRM with campaign management, dialing modes and detailed reporting. Well suited to teams running defined outbound campaigns.',
    overview:
      'NeoDove organises calling into campaigns: leads are grouped, assigned to callers and dialed through different modes with campaign-level reporting. It suits BPO-style operations with clear scripts and campaign cycles.',
    pricing: { startingInr: null, unit: 'per user / month', note: 'Pricing shared on request / varies by plan — confirm with NeoDove.' },
    platforms: ['Android app', 'Web dashboard'],
    features: {
      simTracking: 'yes', dualSim: 'partial', missedRejected: 'partial', autoSync: 'yes', noVoip: 'yes',
      recording: 'yes', recordingIncluded: 'partial', recordingSearch: 'yes',
      employeeReports: 'yes', hourlyAnalysis: 'partial', reportDepth: 'partial', realtimeDashboard: 'yes', excelExport: 'yes',
      leadManagement: 'yes', autoDialer: 'yes', followups: 'yes', whatsapp: 'yes',
      api: 'yes', zapier: 'partial', excludeNumbers: 'partial', setupTime: 'partial',
    },
    scores: { callTracking: 8.4, recording: 8.3, reporting: 8.5, ease: 7.6, value: 7.8, support: 8.0 },
    strengths: ['Campaign structure for outbound programmes', 'Multiple dialing modes', 'Campaign-level reporting'],
    weaknesses: [
      'Campaign setup adds overhead for teams with mixed inbound/outbound calling',
      'Pricing not transparent on the website',
      'Heavier product than teams that mainly need tracking require',
    ],
    praiseThemes: [
      { title: 'Campaign discipline', detail: 'Operations heads like being able to run and measure campaigns end to end.' },
      { title: 'Dialing speed', detail: 'Power-dialing modes help high-volume teams increase attempts per hour.' },
    ],
    complaintThemes: [
      { title: 'Setup effort', detail: 'Defining campaigns, lists and rules before calling starts takes time.' },
      { title: 'Unclear pricing', detail: 'Buyers often need a sales call just to get a quote.' },
      { title: 'Overkill for field & inbound teams', detail: 'Teams where reps take inbound calls or call from the field find the campaign model restrictive.' },
    ],
    callyzerEdge: [
      { title: 'Works for every calling style', detail: 'Inbound, outbound, field or desk — Callyzer tracks all calls on the SIM without forcing a campaign structure.' },
      { title: 'Transparent pricing', detail: 'Callyzer publishes its price (from ₹175 per number) so you can budget without a sales call.' },
      { title: 'Live in hours, not weeks', detail: 'Install, link the SIM and data starts flowing — no campaign design needed.' },
      { title: 'Manager-first reports', detail: 'Never-attended, idle-time and hourly views surface problems campaigns can hide.' },
    ],
    chooseCompetitorIf: ['You run a BPO-style outbound floor where every call belongs to a predefined campaign'],
    switching: [
      'Export campaign leads and outcomes from NeoDove',
      'Install Callyzer on each business phone',
      'Recreate key campaigns as lead lists / tags in Callyzer',
      'Compare one week of call reports side by side',
      'Retire NeoDove seats after validation',
    ],
    faqs: [
      { q: 'Is Callyzer a good NeoDove alternative?', a: 'Yes — especially for teams that take inbound calls or don’t want to design campaigns before they can start tracking. Callyzer captures every SIM call automatically with recordings and reports.' },
      { q: 'How much does NeoDove cost compared with Callyzer?', a: 'NeoDove shares pricing on request. Callyzer publishes its pricing, starting at ₹175 per number per month.' },
      { q: 'Does Callyzer support outbound campaigns?', a: 'Yes. You can build calling lists, assign leads and schedule follow-ups, while tracking all other calls on the SIM too.' },
    ],
    quotes: [],
    sources: [{ label: 'NeoDove website', url: 'https://neodove.com' }],
  },
  {
    slug: 'telecrm',
    name: 'TeleCRM',
    url: 'https://telecrm.in',
    logoText: 'T',
    color: '#0c8599',
    bestFor: 'Telecalling plus sales automation',
    summary:
      'Telecalling app and sales CRM combining auto-dialer with follow-up automation and dashboards. Sits between a pure calling app and a full CRM.',
    overview:
      'TeleCRM combines an auto dialer, lead pipeline, WhatsApp automation and workflow rules. It aims to be the one system for SMB sales teams, which means more configuration and a higher price point than a focused calling tool.',
    pricing: { startingInr: 799, unit: 'per user / month', note: 'Published plans range from about ₹799 to ₹1,099; confirm current pricing with TeleCRM.' },
    platforms: ['Android app', 'Web dashboard'],
    features: {
      simTracking: 'yes', dualSim: 'partial', missedRejected: 'partial', autoSync: 'yes', noVoip: 'yes',
      recording: 'yes', recordingIncluded: 'partial', recordingSearch: 'yes',
      employeeReports: 'yes', hourlyAnalysis: 'partial', reportDepth: 'partial', realtimeDashboard: 'yes', excelExport: 'yes',
      leadManagement: 'yes', autoDialer: 'yes', followups: 'yes', whatsapp: 'yes',
      api: 'yes', zapier: 'yes', excludeNumbers: 'partial', setupTime: 'no',
    },
    scores: { callTracking: 8.2, recording: 8.2, reporting: 8.4, ease: 7.2, value: 7.0, support: 8.1 },
    strengths: ['Workflow and follow-up automation', 'Built-in WhatsApp messaging', 'Pipeline views for SMB sales'],
    weaknesses: [
      'Highest entry price in this comparison',
      'More configuration before the team is productive',
      'Teams that already have a CRM pay for overlapping features',
    ],
    praiseThemes: [
      { title: 'Automation', detail: 'Reviewers like automatic follow-up reminders and WhatsApp templates.' },
      { title: 'All-in-one', detail: 'Small businesses without a CRM appreciate getting pipeline + dialer together.' },
    ],
    complaintThemes: [
      { title: 'Price vs. usage', detail: 'Teams that mostly need call tracking feel they are paying for automation they don’t use.' },
      { title: 'Complex setup', detail: 'Workflows and fields need an admin to configure and maintain.' },
      { title: 'Duplicate CRM', detail: 'Companies already on Zoho, Salesforce or LeadSquared end up running two systems.' },
    ],
    callyzerEdge: [
      { title: 'Pay for calling, not a second CRM', detail: 'Callyzer plugs call data into the CRM you already use via API/Zapier — no need to migrate your pipeline.' },
      { title: 'Up to ~80% lower cost per seat', detail: '₹175 vs ~₹799+ per seat per month to start.' },
      { title: 'Faster rollout', detail: 'No workflows to configure before you see data; reps keep their dialer.' },
      { title: 'Better call-level analytics', detail: 'Purpose-built reports for call behaviour: never-attended, not-picked-up, hourly and unique-client trends.' },
    ],
    chooseCompetitorIf: ['You have no CRM at all and want pipeline, WhatsApp automation and dialing bundled in one tool'],
    switching: [
      'Export leads, stages and notes from TeleCRM',
      'Connect Callyzer to your main CRM (or use Callyzer lead management)',
      'Install Callyzer on business phones and link SIMs',
      'Recreate follow-up reminders in Callyzer or your CRM',
      'Validate reports for a week, then cancel TeleCRM',
    ],
    faqs: [
      { q: 'Callyzer vs TeleCRM — which is better for call tracking?', a: 'Callyzer. It is purpose-built for SIM call tracking and recording with 30+ reports, and costs a fraction of TeleCRM’s per-user price.' },
      { q: 'Does Callyzer replace TeleCRM’s WhatsApp features?', a: 'Callyzer focuses on calling. WhatsApp workflows can be connected through integrations, and most teams already have a WhatsApp tool or CRM for this.' },
      { q: 'Can Callyzer integrate with my existing CRM?', a: 'Yes, via REST API and Zapier, so call logs and recordings flow into the CRM your team already uses.' },
    ],
    quotes: [],
    sources: [
      { label: 'TeleCRM website', url: 'https://telecrm.in' },
      { label: 'TeleCRM pricing', url: 'https://telecrm.in/pricing' },
      { label: 'TeleCRM on G2', url: 'https://www.g2.com/products/telecrm/pricing' },
    ],
  },
  {
    slug: 'cratio-crm',
    name: 'Cratio CRM',
    url: 'https://www.cratiocrm.com',
    logoText: 'Cr',
    color: '#c2255c',
    bestFor: 'Mobile call tracking with lead capture',
    summary:
      'India-built CRM with mobile call tracking, recordings and lead auto-capture aimed at the Indian sales process. Reasonable middle ground on breadth.',
    overview:
      'Cratio is a general sales CRM with a mobile app that adds call tracking, recordings and automatic lead capture from calls. Call tracking is one module inside a broader CRM rather than the core product.',
    pricing: { startingInr: null, unit: 'per user / month', note: 'Pricing on request — confirm with Cratio.' },
    platforms: ['Android app', 'Web CRM'],
    features: {
      simTracking: 'yes', dualSim: 'partial', missedRejected: 'partial', autoSync: 'yes', noVoip: 'yes',
      recording: 'yes', recordingIncluded: 'partial', recordingSearch: 'partial',
      employeeReports: 'yes', hourlyAnalysis: 'no', reportDepth: 'partial', realtimeDashboard: 'partial', excelExport: 'yes',
      leadManagement: 'yes', autoDialer: 'partial', followups: 'yes', whatsapp: 'partial',
      api: 'yes', zapier: 'partial', excludeNumbers: 'partial', setupTime: 'no',
    },
    scores: { callTracking: 7.8, recording: 7.9, reporting: 7.8, ease: 7.0, value: 7.5, support: 7.9 },
    strengths: ['Full CRM modules (leads, deals, quotes)', 'Auto lead capture from unknown numbers', 'Customisable for Indian sales processes'],
    weaknesses: [
      'Call tracking is a module, not the core — reports are less call-specific',
      'CRM implementation takes longer than a calling app',
      'Pricing not published',
    ],
    praiseThemes: [
      { title: 'Breadth', detail: 'Teams wanting a CRM plus call tracking in one contract value the combined package.' },
      { title: 'Customisation', detail: 'Fields and modules can be tailored to specific sales processes.' },
    ],
    complaintThemes: [
      { title: 'Implementation time', detail: 'Getting a full CRM configured takes longer than installing a call tracker.' },
      { title: 'Interface depth', detail: 'Some users find navigation heavy for simple call-tracking needs.' },
      { title: 'Opaque pricing', detail: 'Quotes require contacting sales.' },
    ],
    callyzerEdge: [
      { title: 'Specialist vs generalist', detail: 'Callyzer is built only for calling teams — tracking, recording and reports are deeper and faster.' },
      { title: 'Keep your CRM', detail: 'Use Callyzer alongside any CRM via API/Zapier instead of replacing it.' },
      { title: 'Live the same day', detail: 'No CRM implementation project — install and track.' },
      { title: 'Published, low pricing', detail: 'From ₹175 per number per month.' },
    ],
    chooseCompetitorIf: ['You need a full CRM (quotes, deals, invoices) and call tracking is a secondary requirement'],
    switching: [
      'Export contacts and call logs from Cratio',
      'Install Callyzer on business phones',
      'Connect Callyzer to your CRM or import leads into Callyzer',
      'Run in parallel for a week and compare',
      'Move call tracking fully to Callyzer',
    ],
    faqs: [
      { q: 'Is Callyzer a Cratio CRM alternative?', a: 'For call tracking, yes. Callyzer gives deeper SIM call tracking, recordings and reports, and can sit alongside your CRM.' },
      { q: 'Which is easier to set up?', a: 'Callyzer — it installs on the phone and starts tracking immediately, whereas a CRM rollout involves configuring modules and fields.' },
      { q: 'What does Callyzer cost vs Cratio?', a: 'Callyzer starts at ₹175 per number per month. Cratio shares pricing on request.' },
    ],
    quotes: [],
    sources: [{ label: 'Cratio CRM website', url: 'https://www.cratiocrm.com' }],
  },
];
