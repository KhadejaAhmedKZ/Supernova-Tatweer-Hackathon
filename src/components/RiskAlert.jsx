import { ShieldCheck, ArrowRight, AlertTriangle } from 'lucide-react'

const levelConfig = {
  High:   { bg: 'rgba(239,68,68,0.08)',   border: 'rgba(239,68,68,0.2)',   color: '#ef4444', icon: '🚨', label: 'High Risk' },
  Medium: { bg: 'rgba(245,158,11,0.08)',  border: 'rgba(245,158,11,0.2)',  color: '#f59e0b', icon: '⚠️', label: 'Medium Risk' },
  Low:    { bg: 'rgba(16,185,129,0.08)',  border: 'rgba(16,185,129,0.2)',  color: '#10b981', icon: '✅', label: 'Low Risk' },
}

export default function RiskAlert({ analysis }) {
  const cfg = levelConfig[analysis.riskLevel] || levelConfig.Low

  return (
    <div className="space-y-4 animate-fade-up">
      {/* Risk level */}
      <div
        className="flex items-center gap-4 p-5 rounded-2xl"
        style={{ background: cfg.bg, border: `1px solid ${cfg.border}` }}
      >
        <span className="text-3xl">{cfg.icon}</span>
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-0.5">Risk Level</p>
          <p className="text-2xl font-black" style={{ color: cfg.color }}>{cfg.label}</p>
        </div>
      </div>

      {/* Mistake */}
      <div
        className="p-5 rounded-2xl"
        style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
      >
        <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-2">Possible Mistake</p>
        <p className="text-white font-semibold leading-snug">{analysis.mistake}</p>
      </div>

      {/* Why risky */}
      <div
        className="p-5 rounded-2xl"
        style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
      >
        <div className="flex items-center gap-2 mb-2">
          <AlertTriangle size={13} style={{ color: cfg.color }} />
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">Why It Is Risky</p>
        </div>
        <p className="text-slate-300 leading-relaxed text-sm">{analysis.why}</p>
      </div>

      {/* Safer alternative */}
      <div
        className="p-5 rounded-2xl"
        style={{ background: 'rgba(16,185,129,0.06)', border: '1px solid rgba(16,185,129,0.18)' }}
      >
        <div className="flex items-center gap-2 mb-2">
          <ShieldCheck size={13} className="text-emerald-400" />
          <p className="text-xs font-semibold uppercase tracking-widest text-emerald-400">Safer Alternative</p>
        </div>
        <p className="text-slate-200 leading-relaxed text-sm">{analysis.safer}</p>
      </div>

      {/* First step */}
      <div
        className="p-5 rounded-2xl"
        style={{ background: 'rgba(99,102,241,0.07)', border: '1px solid rgba(99,102,241,0.18)' }}
      >
        <div className="flex items-center gap-2 mb-2">
          <ArrowRight size={13} className="text-indigo-400" />
          <p className="text-xs font-semibold uppercase tracking-widest text-indigo-400">Recommended First Step</p>
        </div>
        <p className="text-slate-200 leading-relaxed text-sm">{analysis.firstStep}</p>
      </div>
    </div>
  )
}
