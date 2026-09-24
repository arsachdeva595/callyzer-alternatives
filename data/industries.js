// Industry pages: /best-call-tracking-app-for-{slug}/
// `ranking` lists competitor slugs in order after Callyzer (always #1).
export const industries = [
  {
    slug: 'real-estate',
    name: 'Real Estate',
    audience: 'real estate brokers, builders and channel partners',
    pains: [
      'Portal leads (99acres, MagicBricks, Housing) go cold when not called back within minutes',
      'Site-visit calls happen from the field, outside any office dialer',
      'Managers can’t verify whether reps actually followed up on hot enquiries',
    ],
    howCallyzerHelps: [
      'Missed-call alerts and never-attended reports make sure every portal enquiry gets a call-back',
      'Tracks calls from reps’ phones in the field — no desk dialer required',
      'Recordings settle disputes about what was promised on price or possession date',
    ],
    ranking: ['runo', 'telecrm', 'cratio-crm', 'neodove', 'godial'],
  },
  {
    slug: 'education',
    name: 'Education & EdTech',
    audience: 'admission counsellors, coaching institutes and edtech sales teams',
    pains: ['Admission season spikes call volumes overnight', 'Counsellor quality varies widely', 'Parents call back on personal numbers'],
    howCallyzerHelps: [
      'Hourly analysis shows counsellor load during peak admission hours',
      'Recordings let senior counsellors coach juniors on real calls',
      'Unique-client reports reveal how many new students each counsellor actually reached',
    ],
    ranking: ['neodove', 'runo', 'telecrm', 'godial', 'cratio-crm'],
  },
  {
    slug: 'insurance',
    name: 'Insurance',
    audience: 'insurance agencies, POSPs and bancassurance teams',
    pains: ['Compliance needs call records for mis-selling disputes', 'Renewal calls slip through', 'Agents work from their own phones'],
    howCallyzerHelps: [
      'Every call recorded and searchable by customer number for audits',
      'Follow-up reminders keep renewal calls on schedule',
      'Works on the agent’s own SIM — no telephony setup',
    ],
    ranking: ['runo', 'neodove', 'telecrm', 'cratio-crm', 'godial'],
  },
  {
    slug: 'loans-nbfc',
    name: 'Loans & NBFC',
    audience: 'DSAs, loan agents, NBFC tele-sales and collections teams',
    pains: ['High-volume outbound with low connect rates', 'Collections calls need proof of contact', 'Rep productivity is hard to measure'],
    howCallyzerHelps: [
      'Not-picked-up and never-attended reports drive smarter retry schedules',
      'Call logs and recordings provide proof of contact attempts',
      'Employee-wise dashboards rank reps by talk time and connects',
    ],
    ranking: ['neodove', 'runo', 'godial', 'telecrm', 'cratio-crm'],
  },
  {
    slug: 'healthcare',
    name: 'Healthcare & Clinics',
    audience: 'hospitals, diagnostic labs and clinic chains',
    pains: ['Missed patient calls mean lost appointments', 'Front-desk staff juggle multiple phones', 'No visibility into call handling quality'],
    howCallyzerHelps: [
      'Missed and rejected call alerts ensure every patient gets a call-back',
      'Track multiple front-desk phones from one dashboard',
      'Recordings help train staff on patient communication',
    ],
    ranking: ['cratio-crm', 'runo', 'telecrm', 'godial', 'neodove'],
  },
  {
    slug: 'automobile-dealers',
    name: 'Automobile Dealerships',
    audience: 'car and two-wheeler dealerships, service centres',
    pains: ['Test-drive and service follow-ups are inconsistent', 'Sales executives use personal phones', 'OEM audits ask for lead-response proof'],
    howCallyzerHelps: [
      'SIM-based tracking captures calls from executives’ phones',
      'Response-time and never-attended reports for OEM lead audits',
      'Follow-up reminders for test drives and service due dates',
    ],
    ranking: ['telecrm', 'runo', 'cratio-crm', 'neodove', 'godial'],
  },
  {
    slug: 'solar',
    name: 'Solar & Renewable Energy',
    audience: 'rooftop solar installers and EPC sales teams',
    pains: ['Long sales cycles with many follow-ups', 'Field surveyors and tele-sales both call leads', 'Subsidy queries flood inbound lines'],
    howCallyzerHelps: [
      'One view of calls from both tele-sales and field staff',
      'Call history per lead shows every touch across a long cycle',
      'Inbound missed-call alerts during subsidy announcements',
    ],
    ranking: ['telecrm', 'runo', 'godial', 'cratio-crm', 'neodove'],
  },
  {
    slug: 'bpo-call-centres',
    name: 'BPO & Call Centres',
    audience: 'domestic BPOs and outsourced tele-calling vendors',
    pains: ['Clients demand proof of call volume and quality', 'Agent idle time is costly', 'VoIP setups are expensive for small centres'],
    howCallyzerHelps: [
      'Client-ready reports on attempts, connects and talk time',
      'Hourly analysis exposes idle time per agent',
      'Runs on regular SIMs — no dialer infrastructure',
    ],
    ranking: ['neodove', 'runo', 'godial', 'telecrm', 'cratio-crm'],
  },
  {
    slug: 'travel',
    name: 'Travel & Tourism',
    audience: 'travel agencies and holiday package sellers',
    pains: ['Enquiries peak around holidays', 'Quotes are negotiated over many calls', 'Lost enquiries go to competitors within hours'],
    howCallyzerHelps: [
      'Instant visibility into unanswered enquiries',
      'Recordings capture what was quoted',
      'Employee reports balance load across agents during peaks',
    ],
    ranking: ['telecrm', 'runo', 'godial', 'neodove', 'cratio-crm'],
  },
  {
    slug: 'distribution-b2b',
    name: 'Distribution & B2B Sales',
    audience: 'distributors, FMCG field sales and B2B inside sales',
    pains: ['Order-taking calls happen from the field', 'Dealer follow-ups are irregular', 'No record of commitments made on calls'],
    howCallyzerHelps: [
      'Tracks field reps’ calls without changing how they work',
      'Unique-client reports show dealer coverage per rep',
      'Recordings keep a record of order commitments',
    ],
    ranking: ['cratio-crm', 'telecrm', 'runo', 'godial', 'neodove'],
  },
];
