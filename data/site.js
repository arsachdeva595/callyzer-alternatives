// Global site config. Change `baseUrl` before deploying.
export const site = {
  name: 'Callyzer Alternatives',
  // Placeholder production domain. Overridable at build time via SITE_URL.
  baseUrl: process.env.SITE_URL || 'https://callyzer-alternatives.example.com',
  // Sub-path when hosted in a folder, e.g. '/callyzer-alternatives' on GitHub Pages.
  basePath: (process.env.BASE_PATH || '').replace(/\/$/, ''),
  // Set NOINDEX=1 for demo/preview builds so they don't compete with the real domain.
  noindex: process.env.NOINDEX === '1',
  tagline: 'Honest comparisons of SIM-based telecalling & call tracking apps for Indian sales teams',
  lastUpdated: '2026-09-24',
  year: 2026,
  ctaUrl: 'https://callyzer.co/?utm_source=callyzer-alternatives&utm_medium=referral&utm_campaign=pseo',
  demoUrl: 'https://callyzer.co/contact-us/?utm_source=callyzer-alternatives&utm_medium=referral&utm_campaign=pseo-demo',
  // Shown in the footer. Keep this: disclosing the relationship keeps the site
  // trustworthy for readers and compliant with review/endorsement guidelines.
  disclosure:
    'This site is published by the Callyzer team. We compare products using public information (vendor websites, app stores, review platforms and community discussions) and our own testing. Pricing and features change often — always confirm with each vendor.',
};
