import { AlertTriangle, ShieldCheck, ArrowRight } from 'lucide-react'

const levelStyles = {
  High: { bg: 'rgba(239,68,68,0.08)', border: 'rgba(239,68,68,0.2)', color: '#ef4444', icon: '🚨' },
  Medium: { bg: 'rgba(245,158,11,0.08)', border: 'rgba(245,158,11,0.2)', color: '#f59e0b', icon: '⚠️' },
  Low: { bg: 'rgba(16,185,129,0.08)', border: 'rgba(16,185,129,0.2)', color: '#10b981', icon: '✅' },
}

export default function RiskAlert({ analysis }) {
  const style = levelStyles[analysis.riskLevel] || levelStyles.Low

  return (
    <div className="space-y-4 animate-fade-up">
      {/* Risk level badge */}
      <div
        className="flex items-center gap-3 p-4 rounded-2xl border"
        style={{ background: style.bg, borderColor: style.border }}
      >
        <span className="text-2xl">{style.icon}</span>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Risk Level</p>
          <p className="text-xl font-bold mt-0.5" style={{ color: style.color }}>
            {analysis.riskLevel}
          </p>
        </div>
      </div>

      {/* Possible mistake */}
      <div className="glass p-5 space-y-1">
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Possible Mistake</p>
        <p className="text-white font-semibold">{analysis.mistake}</p>
      </div>

      {/* Why risky */}
      <div className="glass p-5 space-y-1">
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Why It Is Risky</p>
        <p className="text-slate-300 leading-relaxed">{analysis.why}</p>
      </div>

      {/* Safer alternative */}
      <div
        className="p-5 rounded-2xl border"
        style={{ background: 'rgba(16,185,129,0.06)', borderColor: 'rgba(16,185,129,0.2)' }}
      >
        <div className="flex items-center gap-2 mb-2">
          <ShieldCheck size={15} className="text-emerald-400" />
          <p className="text-xs font-semibold uppercase tracking-wider text-emerald-400">Safer Alternative</p>
        </div>
        <p className="text-slate-200 leading-relaxed">{analysis.safer}</p>
      </div>

      {/* First step */}
      <div
        className="p-5 rounded-2xl border"
        style={{ background: 'rgba(99,102,241,0.06)', borderColor: 'rgba(99,102,241,0.2)' }}
      >
        <div className="flex items-center gap-2 mb-2">
          <ArrowRight size={15} className="text-indigo-400" />
          <p className="text-xs font-semibold uppercase tracking-wider text-indigo-400">Recommended First Step</p>
        </div>
        <p className="text-slate-200 leading-relaxed">{analysis.firstStep}</p>
      </div>
    </div>
  )
}
