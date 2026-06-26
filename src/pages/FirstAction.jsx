import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Zap, ArrowRight, RotateCcw, Users, CheckCircle, Target, Brain, MapPin, AlertCircle } from 'lucide-react'
import { getFirstActionResult, ideaExamples } from '../data/mockData'
import { useApp } from '../context/AppContext'
import ScoreCard from '../components/ScoreCard'
import DecisionButton, { variants } from '../components/DecisionButton'
import SectionHeader from '../components/SectionHeader'

const initialForm = {
  idea: '', location: "Al Qua'a, Al Ain, UAE",
  budget: '', hours: '', blocker: '', customers: '', sellMode: 'locally',
}

export default function FirstAction() {
  const navigate = useNavigate()
  const { session, saveResult, saveDecision } = useApp()

  // Pre-fill form if user already has a saved session
  const [form, setForm] = useState(session.form || initialForm)
  const [result, setResult] = useState(session.result || null)
  const [loading, setLoading] = useState(false)
  const [decision, setDecision] = useState(session.decision || null)

  const update = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true); setResult(null); setDecision(null)
    setTimeout(() => {
      const r = getFirstActionResult(form)
      setResult(r)
      saveResult(form, r)   // persist to context + localStorage
      setLoading(false)
    }, 1800)
  }

  const handleDecision = (type) => {
    setDecision(type)
    saveDecision(type)      // persist decision
    if (type === 'continue') setTimeout(() => navigate('/agents'), 1500)
    if (type === 'improve')  setTimeout(() => { setResult(null); setDecision(null) }, 1500)
  }

  const reset = () => {
    setResult(null); setDecision(null); setForm(initialForm)
    saveResult(null, null)
  }

  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center animate-fade-up">
      <div className="w-20 h-20 rounded-3xl flex items-center justify-center text-4xl mb-6"
        style={{ background: 'linear-gradient(135deg,rgba(99,102,241,0.2),rgba(139,92,246,0.2))', border: '1px solid rgba(99,102,241,0.3)', animation: 'pulse 2s infinite' }}>
        🧠
      </div>
      <h2 className="text-3xl font-bold gradient-text mb-3 tracking-tight">Analyzing Your Idea...</h2>
      <p className="text-slate-400 mb-10 max-w-sm">Your AI co-founders are reviewing your idea, budget, location, and goals.</p>
      <div className="w-56 h-1 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
        <div className="h-full rounded-full" style={{ width: '70%', background: 'linear-gradient(90deg,#4f46e5,#7c3aed)', boxShadow: '0 0 12px rgba(99,102,241,0.6)' }} />
      </div>
    </div>
  )

  if (result) return (
    <div className="max-w-3xl mx-auto space-y-6 animate-fade-up">
      <div className="flex items-start justify-between flex-wrap gap-4">
        <SectionHeader tag="Analysis Complete" title="Your First Action" />
        <button onClick={reset} className="btn-ghost text-sm"><RotateCcw size={14} /> Start Over</button>
      </div>

      {/* Summaries */}
      <div className="glass p-6 space-y-5">
        {[
          { icon: Brain,  color: 'text-indigo-400',  label: 'Founder Summary',        text: result.founderSummary },
          { icon: Target, color: 'text-violet-400',  label: 'Business Idea Summary',  text: result.ideaSummary },
          { icon: MapPin, color: 'text-emerald-400', label: "Community Fit – Al Qua'a", text: result.communityFit },
        ].map(({ icon: Icon, color, label, text }, i) => (
          <div key={label} className={i > 0 ? 'divider pt-5' : ''}>
            <p className={`text-xs font-semibold uppercase tracking-wider ${color} mb-2 flex items-center gap-1.5`}>
              <Icon size={11} /> {label}
            </p>
            <p className="text-slate-300 leading-relaxed text-sm">{text}</p>
          </div>
        ))}
      </div>

      {/* Scores */}
      <div>
        <p className="score-label mb-4">Your Startup Scores</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <ScoreCard label="Readiness"     score={result.readinessScore}    color="#6366f1" />
          <ScoreCard label="Community Fit" score={result.communityFitScore} color="#10b981" />
          <ScoreCard label="Risk Score"    score={result.riskScore}         color="#ef4444" />
          <ScoreCard label="Confidence"    score={result.confidenceScore}   color="#8b5cf6" />
        </div>
      </div>

      {/* First action */}
      <div className="rounded-2xl p-6" style={{ background: 'linear-gradient(135deg,rgba(99,102,241,0.1),rgba(124,58,237,0.08))', border: '1px solid rgba(99,102,241,0.22)' }}>
        <div className="flex items-center gap-2 mb-3">
          <div className="w-6 h-6 rounded-lg flex items-center justify-center" style={{ background: 'rgba(99,102,241,0.3)' }}>
            <Zap size={13} className="text-indigo-300" />
          </div>
          <p className="text-indigo-300 font-bold text-xs uppercase tracking-widest">Your #1 First Action</p>
        </div>
        <p className="text-white text-xl font-bold mb-4 leading-snug tracking-tight">{result.firstAction}</p>
        <div className="rounded-xl p-4" style={{ background: 'rgba(255,255,255,0.05)' }}>
          <p className="text-slate-400 text-sm leading-relaxed">
            <span className="text-white font-semibold">Why this matters: </span>{result.whyItMatters}
          </p>
        </div>
      </div>

      {/* Steps */}
      <div className="glass p-6">
        <p className="score-label mb-5">Step-by-Step Instructions</p>
        <ol className="space-y-4">
          {result.steps.map((step, i) => (
            <li key={i} className="flex items-start gap-4">
              <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5"
                style={{ background: 'rgba(99,102,241,0.18)', color: '#a5b4fc', border: '1px solid rgba(99,102,241,0.2)' }}>
                {i + 1}
              </div>
              <p className="text-slate-300 leading-relaxed text-sm">{step}</p>
            </li>
          ))}
        </ol>
      </div>

      {/* After action */}
      <div className="rounded-2xl p-5 flex items-start gap-3" style={{ background: 'rgba(16,185,129,0.06)', border: '1px solid rgba(16,185,129,0.18)' }}>
        <CheckCircle size={16} className="text-emerald-400 mt-0.5 flex-shrink-0" />
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-emerald-400 mb-1.5">After You Complete This Step</p>
          <p className="text-slate-200 text-sm leading-relaxed">{result.afterAction}</p>
        </div>
      </div>

      {/* Decision buttons */}
      <div>
        <p className="score-label mb-4">What do you want to do next?</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {['continue', 'improve', 'pause', 'stop'].map(type => (
            <DecisionButton key={type} type={type} selected={decision} onSelect={handleDecision} />
          ))}
        </div>
        {decision && (
          <div className="mt-4 rounded-xl p-4 text-sm text-slate-200 leading-relaxed animate-fade-up"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <span className="text-white font-semibold">Bedaya AI: </span>
            {variants[decision].message}
            {decision === 'continue' && (
              <div className="mt-3">
                <button onClick={() => navigate('/agents')} className="btn-primary text-sm py-2.5 group">
                  <Users size={14} /> Meet Your AI Team
                  <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
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

      {/* Example chips */}
      <div className="mb-6">
        <p className="text-xs text-slate-600 mb-3 uppercase tracking-widest font-semibold">Try an example</p>
        <div className="flex flex-wrap gap-2">
          {ideaExamples.map(ex => (
            <button key={ex} onClick={() => update('idea', ex)}
              className="text-xs px-3 py-1.5 rounded-full transition-all duration-200"
              style={{
                background: form.idea === ex ? 'rgba(99,102,241,0.18)' : 'rgba(255,255,255,0.04)',
                border: form.idea === ex ? '1px solid rgba(99,102,241,0.35)' : '1px solid rgba(255,255,255,0.08)',
                color: form.idea === ex ? '#a5b4fc' : '#94a3b8',
              }}>
              {ex}
            </button>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="glass p-6 sm:p-8 space-y-6">
        <div>
          <label className="block text-sm font-semibold text-slate-300 mb-2">
            💡 What skill or business idea do you have? <span className="text-indigo-400">*</span>
          </label>
          <textarea className="input-field resize-none" rows={3}
            placeholder="e.g. I make homemade camel milk chocolate in Al Qua'a..."
            value={form.idea} onChange={e => update('idea', e.target.value)} required />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-slate-300 mb-2">📍 Where are you located?</label>
            <input className="input-field" placeholder="Al Qua'a, Al Ain, UAE" value={form.location} onChange={e => update('location', e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-300 mb-2">💵 Starting budget (AED)</label>
            <input className="input-field" type="number" placeholder="e.g. 500" value={form.budget} onChange={e => update('budget', e.target.value)} />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-slate-300 mb-2">⏱️ Hours per week available</label>
            <input className="input-field" type="number" placeholder="e.g. 10" value={form.hours} onChange={e => update('hours', e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-300 mb-2">🛒 Sell locally, online, or both?</label>
            <select className="input-field" value={form.sellMode} onChange={e => update('sellMode', e.target.value)}>
              <option value="locally">Locally (in-person)</option>
              <option value="online">Online only</option>
              <option value="both">Both</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-300 mb-2">👥 Who are your first customers?</label>
          <input className="input-field" placeholder="e.g. Families in Al Qua'a, local shops, tourists..."
            value={form.customers} onChange={e => update('customers', e.target.value)} />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-300 mb-2">😟 What is stopping you from starting?</label>
          <textarea className="input-field resize-none" rows={2}
            placeholder="e.g. I don't know if people will buy it..."
            value={form.blocker} onChange={e => update('blocker', e.target.value)} />
        </div>

        <div className="flex items-center gap-3 p-3.5 rounded-xl"
          style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
          <AlertCircle size={14} className="text-slate-600 flex-shrink-0" />
          <p className="text-xs text-slate-500">Your answers are saved locally in your browser. No data leaves your device.</p>
        </div>

        <button type="submit" disabled={!form.idea.trim()}
          className="btn-primary w-full justify-center py-4 text-sm group disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:shadow-none disabled:hover:translate-y-0">
          <Zap size={16} />
          Find My First Action
          <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </form>
    </div>
  )
}
