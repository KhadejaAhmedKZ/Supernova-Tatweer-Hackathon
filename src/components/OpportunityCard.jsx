import { ArrowUpRight } from 'lucide-react'

export default function OpportunityCard({ opportunity }) {
  const { emoji, color, colorLight, title, type, whyItHelps, action } = opportunity

  return (
    <div
      className="flex flex-col gap-4 p-6 rounded-2xl group transition-all duration-300 hover:-translate-y-1"
      style={{
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.07)',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = `${color}30`
        e.currentTarget.style.boxShadow = `0 8px 32px ${color}15`
        e.currentTarget.style.background = `linear-gradient(135deg, ${color}08, rgba(255,255,255,0.03))`
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'
        e.currentTarget.style.boxShadow = 'none'
        e.currentTarget.style.background = 'rgba(255,255,255,0.03)'
      }}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
            style={{
              background: `linear-gradient(135deg, ${color}20, ${color}0a)`,
              border: `1px solid ${color}20`,
            }}
          >
            {emoji}
          </div>
          <div>
            <h3 className="font-bold text-white text-sm leading-tight">{title}</h3>
            <span
              className="tag mt-1.5 text-xs"
              style={{ background: `${color}14`, color, border: `1px solid ${color}20` }}
            >
              {type}
            </span>
          </div>
        </div>
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 opacity-0 group-hover:opacity-100 transition-all duration-200 translate-x-1 group-hover:translate-x-0"
          style={{ background: `${color}18`, color }}
        >
          <ArrowUpRight size={14} />
        </div>
      </div>

      {/* Why it helps */}
      <p className="text-slate-400 text-sm leading-relaxed flex-1">{whyItHelps}</p>

      {/* Action */}
      <div
        className="rounded-xl p-3.5 flex items-start gap-2.5"
        style={{
          background: `${color}0c`,
          borderLeft: `3px solid ${color}`,
        }}
      >
        <p className="text-sm leading-relaxed" style={{ color: `${color}dd` }}>
          <span className="font-semibold text-white">Action: </span>
          {action}
        </p>
      </div>
    </div>
  )
}
