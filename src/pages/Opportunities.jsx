import { useState } from 'react'
import { TrendingUp } from 'lucide-react'
import { opportunities } from '../data/mockData'
import OpportunityCard from '../components/OpportunityCard'
import SectionHeader from '../components/SectionHeader'

const categories = ['All', 'Funding', 'Certification', 'Training', 'Mentorship', 'Event', 'Government']

export default function Opportunities() {
  const [active, setActive] = useState('All')

  const filtered = active === 'All'
    ? opportunities
    : opportunities.filter((o) => o.category === active)

  return (
    <div className="space-y-8 animate-fade-up">
      <SectionHeader
        tag="Opportunities"
        title="Support Available for You"
        subtitle="Funding, grants, certifications, training, mentorship, and government support — curated for founders in Al Qua'a and Al Ain."
      />

      {/* Category filter */}
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
              active === cat
                ? 'bg-indigo-500/20 border border-indigo-500/40 text-indigo-300'
                : 'bg-white/4 border border-white/8 text-slate-400 hover:text-white hover:bg-white/8'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map((opp) => (
          <OpportunityCard key={opp.id} opportunity={opp} />
        ))}
      </div>

      {/* Footer note */}
      <div className="glass p-5 flex items-start gap-3">
        <TrendingUp size={16} className="text-slate-500 mt-0.5 flex-shrink-0" />
        <p className="text-xs text-slate-500 leading-relaxed">
          Opportunity data is curated for demonstration purposes. Always verify programme availability,
          deadlines, and eligibility directly with the issuing organisation. Bedaya AI will connect
          to live databases in its production version.
        </p>
      </div>
    </div>
  )
}
