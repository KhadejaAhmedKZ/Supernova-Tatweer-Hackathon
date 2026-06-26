import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Users, Sparkles, Lock, Zap } from 'lucide-react'
import { agents } from '../data/mockData'
import { useApp } from '../context/AppContext'
import AgentCard from '../components/AgentCard'
import SectionHeader from '../components/SectionHeader'

export default function Agents() {
  const navigate = useNavigate()
  const { session } = useApp()
  const { form, result, teamUnlocked } = session

  // Let user override/add to idea — pre-fill from session
  const [idea, setIdea] = useState(form?.idea || '')

  if (!result) return (
    <div className="max-w-xl mx-auto text-center py-16 animate-fade-up space-y-5">
      <div className="text-5xl">🔒</div>
      <h2 className="text-2xl font-bold text-white">AI Team is waiting</h2>
      <p className="text-slate-400 text-sm leading-relaxed">
        Submit your business idea in the Idea Engine first. Once you click <strong className="text-white">Continue</strong>, your 5 AI advisors will be tailored to your specific idea.
      </p>
      <button onClick={() => navigate('/first-action')} className="btn-primary mx-auto">
        <Zap size={15} /> Go to Idea Engine
      </button>
    </div>
  )

  return (
    <div className="space-y-8 animate-fade-up">
      <SectionHeader
        tag="AI Startup Team"
        title="Your 5 Expert Advisors"
        subtitle={`All responses are personalised to: "${form?.idea || 'your idea'}"`}
      />

      {/* Unlock notice */}
      {!teamUnlocked && (
        <div className="flex items-start gap-3 p-4 rounded-2xl"
          style={{ background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.2)' }}>
          <Lock size={14} className="text-amber-400 mt-0.5 flex-shrink-0" />
          <p className="text-amber-300 text-sm">
            Your AI team is available in preview mode. Go back to the Idea Engine and click <strong>Continue</strong> to fully unlock all advisors.
          </p>
        </div>
      )}

      {/* Idea input — pre-filled, editable */}
      <div className="flex flex-col sm:flex-row gap-3 p-5 rounded-2xl"
        style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
        <div className="flex items-center gap-2 text-indigo-400 flex-shrink-0">
          <Sparkles size={14} />
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Your idea</span>
        </div>
        <input
          className="input-field flex-1"
          placeholder="Refine your idea for more specific responses..."
          value={idea}
          onChange={e => setIdea(e.target.value)}
        />
        {idea !== form?.idea && (
          <button onClick={() => setIdea(form?.idea || '')} className="btn-ghost text-xs shrink-0">Reset</button>
        )}
      </div>

      {/* Agent grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {agents.map(agent => (
          <AgentCard key={agent.id} agent={agent} idea={idea || form?.idea} />
        ))}
      </div>

      {/* Disclaimer */}
      <div className="flex items-start gap-3 p-5 rounded-2xl"
        style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
        <Users size={14} className="text-slate-600 mt-0.5 flex-shrink-0" />
        <p className="text-xs text-slate-600 leading-relaxed">
          All responses are mock examples demonstrating how Bedaya AI would guide real founders.
          In production, these connect to live AI models trained on UAE business regulations, community data, and founder support resources.
        </p>
      </div>
    </div>
  )
}
