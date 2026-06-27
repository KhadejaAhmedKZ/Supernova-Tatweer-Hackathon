// ── Al-Amanah — The Trust Layer ─────────────────────────────────
// Named after the Emirati principle of sacred trust.
// Shows the founder exactly what data each agent can and cannot see.

export const AGENT_PERMISSIONS = {
  strategist: {
    permitted: ['idea', 'idea type', 'location', 'experience'],
    withheld:  ['name', 'age', 'budget', 'occupation'],
    reason:    'Strategy advice does not require your personal or financial details.',
  },
  finance: {
    permitted: ['budget', 'idea type', 'location'],
    withheld:  ['name', 'age', 'occupation', 'customers'],
    reason:    'Financial analysis uses only your budget and idea category.',
  },
  marketing: {
    permitted: ['idea', 'location', 'customers', 'idea type'],
    withheld:  ['name', 'age', 'budget', 'occupation'],
    reason:    'Marketing advice is based on your idea and community, not personal details.',
  },
  legal: {
    permitted: ['idea type', 'location'],
    withheld:  ['name', 'age', 'budget', 'occupation', 'customers'],
    reason:    'Legal guidance requires only your business category and location.',
  },
  growth: {
    permitted: ['idea', 'location', 'budget', 'experience'],
    withheld:  ['name', 'age', 'occupation'],
    reason:    'Opportunity matching uses your idea, location, and readiness level.',
  },
}

export const AGENT_CONFIDENCE = {
  strategist: { level: 'high',   label: 'General principles — broadly reliable' },
  finance:    { level: 'medium', label: 'Estimates only — verify local costs' },
  legal:      { level: 'medium', label: 'Educational only — verify with UAE authorities' },
  marketing:  { level: 'high',   label: 'Suggestions — test with real customers' },
  growth:     { level: 'medium', label: 'Programmes change — verify with Khalifa Fund' },
}
