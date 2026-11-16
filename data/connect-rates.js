// First-party Callyzer call data, Sept–Oct 2026: 24 industries (main industry level only).
// Source: data/raw/industry-connect-rates-sep-oct-2026.csv. Sub-industry labels are deliberately
// not used: they are self-reported and some contain customer business names.
// Rates are always recomputed from the raw counts (see src/connect-rates.js), never copied.
export const connectMeta = {
  period: 'September–October 2026',
  periodShort: 'Sep–Oct 2026',
  lastUpdated: '2026-11-16',
  // Industries with fewer total calls than this are shown but not ranked.
  minRankedCalls: 100000,
};

export const connectRows = [
  { slug: 'logistics-transportation', name: 'Logistics & Transportation', totalCalls: 2367188, connectedCalls: 1423137, outgoingCalls: 1336634, connectedOutgoing: 838926 },
  { slug: 'telecom-mobile', name: 'Telecom & Mobile', totalCalls: 2424, connectedCalls: 1461, outgoingCalls: 271, connectedOutgoing: 132 },
  { slug: 'solar-renewable-energy', name: 'Solar & Renewable Energy', totalCalls: 2211063, connectedCalls: 1287816, outgoingCalls: 1428768, connectedOutgoing: 816047 },
  { slug: 'jewellery-luxury', name: 'Jewellery & Luxury', totalCalls: 401423, connectedCalls: 231298, outgoingCalls: 217366, connectedOutgoing: 128530 },
  { slug: 'recruitment-agencies', name: 'Recruitment Agencies', totalCalls: 219569, connectedCalls: 122457, outgoingCalls: 152212, connectedOutgoing: 85115 },
  { slug: 'media-entertainment-gaming', name: 'Media, Entertainment & Gaming', totalCalls: 340953, connectedCalls: 184628, outgoingCalls: 216828, connectedOutgoing: 105742 },
  { slug: 'manufacturing-industrial', name: 'Manufacturing & Industrial', totalCalls: 23799790, connectedCalls: 12797406, outgoingCalls: 15313961, connectedOutgoing: 7522439 },
  { slug: 'services-bpo', name: 'Services & BPO', totalCalls: 561417, connectedCalls: 299227, outgoingCalls: 420538, connectedOutgoing: 197210 },
  { slug: 'travel-hospitality', name: 'Travel & Hospitality', totalCalls: 10024442, connectedCalls: 5333169, outgoingCalls: 6172272, connectedOutgoing: 3066220 },
  { slug: 'e-commerce-retail', name: 'E-commerce & Retail', totalCalls: 10600846, connectedCalls: 5448727, outgoingCalls: 6998325, connectedOutgoing: 3587899 },
  { slug: 'construction-interiors', name: 'Construction & Interiors', totalCalls: 356300, connectedCalls: 181586, outgoingCalls: 254922, connectedOutgoing: 121385 },
  { slug: 'automobile', name: 'Automobile', totalCalls: 12540920, connectedCalls: 6316595, outgoingCalls: 8816081, connectedOutgoing: 4195180 },
  { slug: 'banking-finance', name: 'Banking & Finance', totalCalls: 19295046, connectedCalls: 9661123, outgoingCalls: 14749033, connectedOutgoing: 6820255 },
  { slug: 'real-estate', name: 'Real Estate', totalCalls: 20130884, connectedCalls: 9718092, outgoingCalls: 14755730, connectedOutgoing: 5645885 },
  { slug: 'it-ites-software', name: 'IT / ITES & Software', totalCalls: 9925213, connectedCalls: 4667791, outgoingCalls: 7346051, connectedOutgoing: 3317118 },
  { slug: 'consultancy-staffing', name: 'Consultancy & Staffing', totalCalls: 10507025, connectedCalls: 4867608, outgoingCalls: 7765551, connectedOutgoing: 3462106 },
  { slug: 'legal-services', name: 'Legal Services', totalCalls: 70027, connectedCalls: 31918, outgoingCalls: 56886, connectedOutgoing: 23781 },
  { slug: 'healthcare-wellness', name: 'Healthcare & Wellness', totalCalls: 35049551, connectedCalls: 15959191, outgoingCalls: 25647048, connectedOutgoing: 10450297 },
  { slug: 'sports-events', name: 'Sports & Events', totalCalls: 196792, connectedCalls: 85693, outgoingCalls: 138064, connectedOutgoing: 59174 },
  { slug: 'agriculture-agro', name: 'Agriculture & Agro', totalCalls: 6586453, connectedCalls: 2851836, outgoingCalls: 5239783, connectedOutgoing: 2172701 },
  { slug: 'marketing-agencies', name: 'Marketing Agencies', totalCalls: 5719155, connectedCalls: 2465426, outgoingCalls: 4991862, connectedOutgoing: 2050952 },
  { slug: 'edtech-education', name: 'EdTech & Education', totalCalls: 69233341, connectedCalls: 29178672, outgoingCalls: 54540281, connectedOutgoing: 20133873 },
  { slug: 'trading-wholesale', name: 'Trading & Wholesale', totalCalls: 2093523, connectedCalls: 734578, outgoingCalls: 1899007, connectedOutgoing: 614293 },
  { slug: 'market-research-verification', name: 'Market Research & Verification', totalCalls: 49918, connectedCalls: 10330, outgoingCalls: 47270, connectedOutgoing: 8645 },
];
