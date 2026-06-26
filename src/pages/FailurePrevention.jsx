import { useState } from 'react'
import { Shield, Send, RotateCcw, History } from 'lucide-react'
import { getRiskAnalysis } from '../data/mockData'
import { useApp } from '../context/AppContext'
import RiskAlert from '../components/RiskAlert'
import SectionHeader from '../components/SectionHeader'

const examples = [
  'I want to spend AED 5000 on branding.',
  'I want to register the business before testing.',
  'I want to add delivery to my business.',
  'I want to sell homemade food online.',
  'I want to hire an employee.',
]

export default function FailurePrevention() {
  const { session, saveRiskCheck } = useApp()
  const [decision, setDecision] = useState('')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [showHistory, setShowHistory] = useState(false)

  const analyze = () => {
    if (!decision.trim()) return
    setLoading(true); setResult(null)
    setTimeout(() => {
      const analysis = getRiskAnalysis(decision)
      setResult(analysis)
      saveRiskCheck(decision, analysis)   // persist to session
      setLoading(false)
    }, 1200)
  }

  const reset = () => { setDecision(''); setResult(null) }

  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-fade-up">
      <div className="flex items-start justify-between flex-wrap gap-4">
        <SectionHeader
          tag="Failure Prevention AI"
          title="Check Before You Decide"
          subtitle="Describe a business decision you're considering. Bedaya AI will tell you the risk level and a safer alternative."
        />
        {session.riskHistory.length > 0 && (
          <button onClick={() => setShowHistory(!showHistory)} className="btn-ghost text-xs text-slate-500">
            <History size={13} /> Past checks ({session.riskHistory.length})
          </button>
        )}
      </div>

      {/* Past risk checks */}
      {showHistory && session.riskHistory.length > 0 && (
        <div className="glass p-5 space-y-3 animate-fade-up">
          <p className="score-label">Previous Risk Checks</p>
          {session.riskHistory.map((item, i) => (
            <button key={i} onClick={() => { setDecision(item.decision); setResult(item.analysis); setShowHistory(false) }}
              className="w-full text-left p-3 rounded-xl flex items-center justify-between gap-3 transition-all"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
              <span className="text-slate-300 text-sm truncate">{item.decision}</span>
              <span className="text-xs font-semibold flex-shrink-0 px-2 py-0.5 rounded-full"
                style={{
                  background: item.analysis.riskLevel === 'High' ? 'rgba(239,68,68,0.12)' : item.analysis.riskLevel === 'Medium' ? 'rgba(245,158,11,0.12)' : 'rgba(16,185,129,0.12)',
                  color: item.analysis.riskLevel === 'High' ? '#ef4444' : item.analysis.riskLevel === 'Medium' ? '#f59e0b' : '#10b981',
                }}>
                {item.analysis.riskLevel}
              </span>
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <div className="glass p-6 space-y-5">
        <div>
          <label className="block text-sm font-semibold text-slate-300 mb-2">
            🤔 What decision are you thinking about?
          </label>
          <textarea className="input-field resize-none" rows={3}
            placeholder="e.g. I want to spend AED 5000 on branding before testing my idea..."
            value={decision} onChange={e => setDecision(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); analyze() } }} />
        </div>

        <div>
          <p className="text-xs text-slate-600 uppercase tracking-widest font-semibold mb-3">Try an example</p>
          <div className="flex flex-wrap gap-2">
            {examples.map(ex => (
              <button key={ex} onClick={() => setDecision(ex)}
                className="text-xs px-3 py-1.5 rounded-full transition-all duration-200"
                style={{
                  background: decision === ex ? 'rgba(99,102,241,0.15)' : 'rgba(255,255,255,0.04)',
                  border: decision === ex ? '1px solid rgba(99,102,241,0.3)' : '1px solid rgba(255,255,255,0.07)',
                  color: decision === ex ? '#a5b4fc' : '#64748b',
                }}>
                {ex}
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-3">
          <button onClick={analyze} disabled={!decision.trim() || loading}
            className="btn-primary flex-1 justify-center disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none">
            {loading ? (
              <><span className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" /> Analyzing...</>
            ) : (
              <><Shield size={15} /> Analyze Risk <Send size={13} /></>
            )}
          </button>
          {result && (
            <button onClick={reset} className="btn-secondary py-2 px-4"><RotateCcw size={15} /></button>
          )}
        </div>
      </div>

      {/* Result */}
      {result && (
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="h-px flex-1" style={{ background: 'rgba(255,255,255,0.06)' }} />
            <p className="text-xs text-slate-600 uppercase tracking-widest font-semibold">AI Risk Analysis</p>
            <div className="h-px flex-1" style={{ background: 'rgba(255,255,255,0.06)' }} />
          </div>
          <RiskAlert analysis={result} />
        </div>
      )}

      <p className="text-center text-slate-700 text-xs italic">
        "Testing before spending is smart. One small action is better than a perfect plan."
      </p>
    </div>
  )
}
