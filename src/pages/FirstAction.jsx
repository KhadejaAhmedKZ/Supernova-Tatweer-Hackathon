import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Zap, ArrowRight, ChevronRight, RotateCcw, Users,
  CheckCircle, Target, Brain, MapPin, AlertCircle
} from 'lucide-react'
import { getFirstActionResult, ideaExamples } from '../data/mockData'
import ScoreCard from '../components/ScoreCard'
import DecisionButton, { variants } from '../components/DecisionButton'
import SectionHeader from '../components/SectionHeader'

const initialForm = {
  idea: '',
  location: "Al Qua'a, Al Ain, UAE",
  budget: '',
  hours: '',
  blocker: '',
  customers: '',
  sellMode: 'locally',
}

export default function FirstAction() {
  const navigate = useNavigate()
  const [form, setForm] = useState(initialForm)
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [decision, setDecision] = useState(null)

  const update = (k, v) => setForm((f) => ({ ...f, [k]: v }))

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    setResult(null)
    setDecision(null)
    setTimeout(() => {
      setResult(getFirstActionResult(form))
      setLoading(false)
    }, 1800)
  }

  const handleDecision = (type) => {
    setDecision(type)
    if (type === 'continue') setTimeout(() => navigate('/agents'), 1500)
  }

  const reset = () => {
    setResult(null)
    setDecision(null)
    setForm(initialForm)
  }

  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center animate-fade-up">
      <div className="text-7xl mb-6 animate-pulse-slow">🧠</div>
      <h2 className="text-3xl font-bold gradient-text mb-3">Analyzing Your Idea...</h2>
      <p className="text-slate-400 mb-8 max-w-md">
        Your AI co-founders are reviewing your idea, budget, location, and goals.
      </p>
      <div className="w-64 h-1.5 bg-white/5 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-500"
          style={{ width: '75%', transition: 'width 1.8s ease' }}
        />
      </div>
    </div>
  )

  if (result) return (
    <div className="max-w-3xl mx-auto space-y-8 animate-fade-up">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <SectionHeader
          tag="Analysis Complete"
          title="Your First Action"
        />
        <button onClick={reset} className="btn-ghost text-sm">
          <RotateCcw size={14} /> Start Over
        </button>
      </div>

      {/* Founder & Idea Summary */}
      <div className="glass p-6 space-y-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-indigo-400 mb-2 flex items-center gap-1">
            <Brain size={12} /> Founder Summary
          </p>
          <p className="text-slate-200 leading-relaxed">{result.founderSummary}</p>
        </div>
        <div className="divider pt-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-violet-400 mb-2 flex items-center gap-1">
            <Target size={12} /> Business Idea Summary
          </p>
          <p className="text-slate-200 leading-relaxed">{result.ideaSummary}</p>
        </div>
        <div className="divider pt-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-emerald-400 mb-2 flex items-center gap-1">
            <MapPin size={12} /> Community Fit – Al Qua'a
          </p>
          <p className="text-slate-200 leading-relaxed">{result.communityFit}</p>
        </div>
      </div>

      {/* Scores */}
      <div>
        <p className="score-label mb-4">Your Startup Scores</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <ScoreCard label="Readiness" score={result.readinessScore} color="#6366f1" />
          <ScoreCard label="Community Fit" score={result.communityFitScore} color="#10b981" />
          <ScoreCard label="Risk Score" score={result.riskScore} color="#ef4444" />
          <ScoreCard label="Confidence" score={result.confidenceScore} color="#8b5cf6" />
        </div>
      </div>

      {/* First Action */}
      <div
        className="rounded-2xl p-6 border"
        style={{
          background: 'linear-gradient(135deg, rgba(99,102,241,0.1), rgba(124,58,237,0.1))',
          borderColor: 'rgba(99,102,241,0.25)',
        }}
      >
        <div className="flex items-center gap-2 mb-3">
          <Zap size={18} className="text-indigo-400" />
          <p className="text-indigo-300 font-bold text-sm uppercase tracking-wider">Your #1 First Action</p>
        </div>
        <p className="text-white text-xl font-bold mb-4 leading-snug">{result.firstAction}</p>
        <div className="bg-white/5 rounded-xl p-4">
          <p className="text-slate-400 text-sm leading-relaxed">
            <span className="text-white font-semibold">Why this matters: </span>
            {result.whyItMatters}
          </p>
        </div>
      </div>

      {/* Step-by-step */}
      <div className="glass p-6">
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-5">
          Step-by-Step Instructions
        </p>
        <ol className="space-y-4">
          {result.steps.map((step, i) => (
            <li key={i} className="flex items-start gap-4">
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5"
                style={{ background: 'rgba(99,102,241,0.2)', color: '#818cf8' }}
              >
                {i + 1}
              </div>
              <p className="text-slate-200 leading-relaxed">{step}</p>
            </li>
          ))}
        </ol>
      </div>

      {/* After action */}
      <div
        className="rounded-2xl p-5 border flex items-start gap-3"
        style={{ background: 'rgba(16,185,129,0.06)', borderColor: 'rgba(16,185,129,0.2)' }}
      >
        <CheckCircle size={18} className="text-emerald-400 mt-0.5 flex-shrink-0" />
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-emerald-400 mb-1">After You Complete This Step</p>
          <p className="text-slate-200 text-sm leading-relaxed">{result.afterAction}</p>
        </div>
      </div>

      {/* Decision buttons */}
      <div>
        <p className="score-label mb-4">What do you want to do next?</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {['continue', 'improve', 'pause', 'stop'].map((type) => (
            <DecisionButton key={type} type={type} selected={decision} onSelect={handleDecision} />
          ))}
        </div>

        {decision && (
          <div
            className="mt-4 rounded-xl p-4 border text-sm text-slate-200 leading-relaxed animate-fade-up"
            style={{
              background: 'rgba(255,255,255,0.04)',
              borderColor: 'rgba(255,255,255,0.08)',
            }}
          >
            <span className="text-white font-semibold">Bedaya AI: </span>
            {variants[decision].message}
            {decision === 'continue' && (
              <button onClick={() => navigate('/agents')} className="btn-primary text-sm mt-3">
                <Users size={14} /> Meet Your AI Team <ArrowRight size={14} />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )

  return (
    <div className="max-w-2xl mx-auto animate-fade-up">
      <SectionHeader
        tag="Idea Engine"
        title="From Idea to First Action"
        subtitle="Answer a few questions and Bedaya AI will give you one clear, low-risk first step."
      />

      {/* Example ideas */}
      <div className="mb-6">
        <p className="text-xs text-slate-500 mb-3">Try an example:</p>
        <div className="flex flex-wrap gap-2">
          {ideaExamples.map((ex) => (
            <button
              key={ex}
              onClick={() => update('idea', ex)}
              className="text-xs px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/8 hover:border-indigo-500/30 transition-all"
            >
              {ex}
            </button>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="glass p-6 sm:p-8 space-y-6">
        {/* Idea */}
        <div>
          <label className="block text-sm font-semibold text-slate-300 mb-2">
            💡 What skill or business idea do you have?
            <span className="text-indigo-400 ml-1">*</span>
          </label>
          <textarea
            className="input-field resize-none"
            rows={3}
            placeholder="e.g. I make homemade camel milk chocolate in Al Qua'a..."
            value={form.idea}
            onChange={(e) => update('idea', e.target.value)}
            required
          />
        </div>

        {/* Location + Budget */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-slate-300 mb-2">
              📍 Where are you located?
            </label>
            <input
              className="input-field"
              placeholder="Al Qua'a, Al Ain, UAE"
              value={form.location}
              onChange={(e) => update('location', e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-300 mb-2">
              💵 Starting budget (AED)
            </label>
            <input
              className="input-field"
              type="number"
              placeholder="e.g. 500"
              value={form.budget}
              onChange={(e) => update('budget', e.target.value)}
            />
          </div>
        </div>

        {/* Hours + Sell mode */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-slate-300 mb-2">
              ⏱️ Hours per week available
            </label>
            <input
              className="input-field"
              type="number"
              placeholder="e.g. 10"
              value={form.hours}
              onChange={(e) => update('hours', e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-300 mb-2">
              🛒 Sell locally, online, or both?
            </label>
            <select
              className="input-field"
              value={form.sellMode}
              onChange={(e) => update('sellMode', e.target.value)}
            >
              <option value="locally">Locally (in-person)</option>
              <option value="online">Online only</option>
              <option value="both">Both</option>
            </select>
          </div>
        </div>

        {/* First customers */}
        <div>
          <label className="block text-sm font-semibold text-slate-300 mb-2">
            👥 Who do you think your first customers are?
          </label>
          <input
            className="input-field"
            placeholder="e.g. Families in Al Qua'a, local shops, tourists..."
            value={form.customers}
            onChange={(e) => update('customers', e.target.value)}
          />
        </div>

        {/* Blocker */}
        <div>
          <label className="block text-sm font-semibold text-slate-300 mb-2">
            😟 What is stopping you from starting?
          </label>
          <textarea
            className="input-field resize-none"
            rows={2}
            placeholder="e.g. I don't know if people will buy it, I have no money to invest..."
            value={form.blocker}
            onChange={(e) => update('blocker', e.target.value)}
          />
        </div>

        <div className="flex items-center gap-3 p-4 rounded-xl bg-white/3 border border-white/6">
          <AlertCircle size={16} className="text-indigo-400 flex-shrink-0" />
          <p className="text-xs text-slate-400 leading-relaxed">
            Your answers stay private and are only used to generate your first action. No data is stored.
          </p>
        </div>

        <button
          type="submit"
          disabled={!form.idea.trim()}
          className="btn-primary w-full justify-center py-4 text-base disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <Zap size={18} />
          Find My First Action
          <ArrowRight size={18} />
        </button>
      </form>
    </div>
  )
}
