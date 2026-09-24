// Feature matrix used on every comparison page.
// Each product (callyzer.js / competitors.js) sets `features[id]` to one of:
//   'yes' | 'partial' | 'addon' | 'no'   (optionally as { v: 'yes', note: '...' })
export const featureGroups = [
  {
    group: 'Call tracking (SIM-based)',
    items: [
      { id: 'simTracking', label: 'Tracks calls made from the employee’s own SIM / phone dialer' },
      { id: 'dualSim', label: 'Dual-SIM support (track business SIM only)' },
      { id: 'missedRejected', label: 'Missed, rejected & never-attended call visibility' },
      { id: 'autoSync', label: 'Automatic call-log sync to web dashboard' },
      { id: 'noVoip', label: 'Works without VoIP / cloud telephony numbers' },
    ],
  },
  {
    group: 'Call recording',
    items: [
      { id: 'recording', label: 'Auto call recording sync' },
      { id: 'recordingIncluded', label: 'Recording included without extra storage fee' },
      { id: 'recordingSearch', label: 'Search & play recordings by employee / number / date' },
    ],
  },
  {
    group: 'Reports & analytics',
    items: [
      { id: 'employeeReports', label: 'Employee-wise productivity reports' },
      { id: 'hourlyAnalysis', label: 'Hourly / day-wise call analysis' },
      { id: 'reportDepth', label: '30+ ready-made call reports' },
      { id: 'realtimeDashboard', label: 'Real-time team dashboard' },
      { id: 'excelExport', label: 'Excel / PDF export & scheduled email reports' },
    ],
  },
  {
    group: 'Leads & follow-ups',
    items: [
      { id: 'leadManagement', label: 'Lead management & assignment' },
      { id: 'autoDialer', label: 'Auto dialer / calling queue' },
      { id: 'followups', label: 'Follow-up reminders & call notes' },
      { id: 'whatsapp', label: 'WhatsApp messaging' },
    ],
  },
  {
    group: 'Admin & integrations',
    items: [
      { id: 'api', label: 'REST API & webhooks' },
      { id: 'zapier', label: 'Zapier / third-party CRM integrations' },
      { id: 'excludeNumbers', label: 'Exclude personal numbers (privacy controls)' },
      { id: 'setupTime', label: 'Go-live in under a day, no training needed' },
    ],
  },
];

export const scoreDimensions = [
  { id: 'callTracking', label: 'SIM call tracking' },
  { id: 'recording', label: 'Call recording' },
  { id: 'reporting', label: 'Reports & analytics' },
  { id: 'ease', label: 'Ease of setup' },
  { id: 'value', label: 'Value for money' },
  { id: 'support', label: 'Support (India)' },
];
