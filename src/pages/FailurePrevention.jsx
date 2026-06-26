import { useState } from 'react'
import { Shield, Send, RotateCcw } from 'lucide-react'
import { getRiskAnalysis } from '../data/mockData'
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
  const [decision, setDecision] = useState('')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  const analyze = () => {
    if (!decision.trim()) return
    setLoading(true)
    setResult(null)
    setTimeout(() => {
      setResult(getRiskAnalysis(decision))
      setLoading(false)
    }, 1200)
  }

  const reset = () => {
    setDecision('')
    setResult(null)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      analyze()
    }
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-fade-up">
      <SectionHeader
        tag="Failure Prevention AI"
        title="Check Before You Decide"
        subtitle="Describe a business decision you are considering. Bedaya AI will tell you the risk level and a safer alternative."
      />

      {/* Input area */}
      <div className="glass p-6 space-y-5">
        <div>
          <label className="block text-sm font-semibold text-slate-300 mb-2">
            🤔 What decision are you thinking about?
          </label>
          <textarea
            className="input-field resize-none"
            rows={3}
            placeholder="e.g. I want to spend AED 5000 on branding before testing my idea..."
            value={decision}
            onChange={(e) => setDecision(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>

        <div>
          <p className="text-xs text-slate-500 mb-3">Examples:</p>
          <div className="flex flex-wrap gap-2">
            {examples.map((ex) => (
              <button
                key={ex}
                onClick={() => setDecision(ex)}
                className="text-xs px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/8 transition-all"
              >
                {ex}
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={analyze}
            disabled={!decision.trim() || loading}
            className="btn-primary flex-1 justify-center disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Analyzing Risk...
              </>
            ) : (
              <>
                <Shield size={16} />
                Analyze Risk
                <Send size={14} />
              </>
            )}
          </button>
          {result && (
            <button onClick={reset} className="btn-secondary py-2 px-4">
              <RotateCcw size={16} />
            </button>
          )}
        </div>
      </div>

      {/* Result */}
      {result && (
        <div className="space-y-2">
          <div className="flex items-center gap-2 mb-4">
            <div className="h-px flex-1 bg-white/6" />
            <p className="text-xs text-slate-500 uppercase tracking-widest">AI Risk Analysis</p>
            <div className="h-px flex-1 bg-white/6" />
          </div>
          <RiskAlert analysis={result} />
        </div>
      )}

      {/* Encouragement footer */}
      <div className="text-center">
        <p className="text-slate-600 text-sm italic">
          "Testing before spending is smart. One small action is better than a perfect plan."
        </p>
      </div>
    </div>
  )
}
