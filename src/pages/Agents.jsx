import { useState } from 'react'
import { Users } from 'lucide-react'
import { agents } from '../data/mockData'
import AgentCard from '../components/AgentCard'
import SectionHeader from '../components/SectionHeader'

export default function Agents() {
  const [idea, setIdea] = useState('')

  return (
    <div className="space-y-8 animate-fade-up">
      <SectionHeader
        tag="AI Startup Team"
        title="Your 5 Expert AI Advisors"
        subtitle="Five specialists available anytime — no appointment needed. Ask any of them about your specific idea."
      />

      {/* Optional idea input to personalise responses */}
      <div className="glass p-5 flex flex-col sm:flex-row gap-3">
        <input
          className="input-field flex-1"
          placeholder="Enter your business idea to personalise responses (optional)..."
          value={idea}
          onChange={(e) => setIdea(e.target.value)}
        />
        {idea && (
          <button
            className="btn-ghost whitespace-nowrap"
            onClick={() => setIdea('')}
          >
            Clear
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {agents.map((agent) => (
          <AgentCard key={agent.id} agent={agent} idea={idea} />
        ))}
      </div>

      <div className="glass p-5 flex items-start gap-3">
        <Users size={16} className="text-slate-500 mt-0.5 flex-shrink-0" />
        <p className="text-xs text-slate-500 leading-relaxed">
          All AI agent responses are mock examples designed to demonstrate how Bedaya AI would guide real founders.
          In a production version, these would connect to live AI models trained on UAE business regulations,
          community data, and founder support resources.
        </p>
      </div>
    </div>
  )
}
