import { useState } from 'react'
import { Users, Sparkles } from 'lucide-react'
import { agents } from '../data/mockData'
import AgentCard from '../components/AgentCard'
import SectionHeader from '../components/SectionHeader'

export default function Agents() {
  const [idea, setIdea] = useState('')

  return (
    <div className="space-y-8 animate-fade-up">
      <SectionHeader
        tag="AI Startup Team"
        title="Your 5 Expert Advisors"
        subtitle="Five specialists available anytime. Enter your idea below to get personalised responses from each advisor."
      />

      {/* Idea input */}
      <div
        className="flex flex-col sm:flex-row gap-3 p-5 rounded-2xl"
        style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
      >
        <div className="flex items-center gap-2 text-indigo-400 flex-shrink-0">
          <Sparkles size={15} />
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Your idea</span>
        </div>
        <input
          className="input-field flex-1"
          placeholder="Enter your business idea to personalise all agent responses..."
          value={idea}
          onChange={e => setIdea(e.target.value)}
        />
        {idea && (
          <button onClick={() => setIdea('')} className="btn-ghost text-xs shrink-0">Clear</button>
        )}
      </div>

      {/* Agent grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {agents.map(agent => (
          <AgentCard key={agent.id} agent={agent} idea={idea} />
        ))}
      </div>

      {/* Disclaimer */}
      <div
        className="flex items-start gap-3 p-5 rounded-2xl"
        style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}
      >
        <Users size={14} className="text-slate-600 mt-0.5 flex-shrink-0" />
        <p className="text-xs text-slate-600 leading-relaxed">
          All agent responses are mock examples demonstrating how Bedaya AI would guide real founders.
          In production, these connect to live AI models trained on UAE business regulations, community data,
          and founder support resources.
        </p>
      </div>
    </div>
  )
}
