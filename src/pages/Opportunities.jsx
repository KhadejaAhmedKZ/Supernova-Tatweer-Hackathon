import { useState } from 'react'
import { TrendingUp } from 'lucide-react'
import { opportunities } from '../data/mockData'
import OpportunityCard from '../components/OpportunityCard'
import SectionHeader from '../components/SectionHeader'

const categories = ['All', 'Funding', 'Certification', 'Training', 'Mentorship', 'Event', 'Government']

export default function Opportunities() {
  const [active, setActive] = useState('All')
  const filtered = active === 'All' ? opportunities : opportunities.filter(o => o.category === active)

  return (
    <div className="space-y-8 animate-fade-up">
      <SectionHeader
        tag="Opportunities"
        title="Support Available for You"
        subtitle="Funding, grants, certifications, training, mentorship, and government support — curated for founders in Al Qua'a and Al Ain."
      />

      {/* Filter tabs */}
      <div className="flex flex-wrap gap-2">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className="px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200"
            style={{
              background: active === cat ? 'rgba(99,102,241,0.18)' : 'rgba(255,255,255,0.04)',
              border: active === cat ? '1px solid rgba(99,102,241,0.35)' : '1px solid rgba(255,255,255,0.07)',
              color: active === cat ? '#a5b4fc' : '#64748b',
            }}
          >
            {cat}
            {active === cat && (
              <span
                className="ml-2 text-xs px-1.5 py-0.5 rounded-full font-bold"
                style={{ background: 'rgba(99,102,241,0.3)', color: '#c7d2fe' }}
              >
                {filtered.length}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filtered.map(opp => (
          <OpportunityCard key={opp.id} opportunity={opp} />
        ))}
      </div>

      {/* Footer */}
      <div
        className="flex items-start gap-3 p-5 rounded-2xl"
        style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}
      >
        <TrendingUp size={14} className="text-slate-600 mt-0.5 flex-shrink-0" />
        <p className="text-xs text-slate-600 leading-relaxed">
          Opportunity data is curated for demonstration purposes. Always verify availability,
          deadlines, and eligibility directly with the issuing organisation. Bedaya AI will connect
          to live databases in its production version.
        </p>
      </div>
    </div>
  )
}
