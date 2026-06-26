import { ArrowRight } from 'lucide-react'

export default function OpportunityCard({ opportunity }) {
  const { emoji, color, colorLight, title, type, whyItHelps, action } = opportunity

  return (
    <div className="glass-hover p-6 flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-start gap-3">
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
          style={{ background: colorLight }}
        >
          {emoji}
        </div>
        <div>
          <h3 className="font-bold text-white leading-tight">{title}</h3>
          <span
            className="tag mt-1 text-xs"
            style={{ background: colorLight, color }}
          >
            {type}
          </span>
        </div>
      </div>

      {/* Why it helps */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">Why it helps</p>
        <p className="text-slate-300 text-sm leading-relaxed">{whyItHelps}</p>
      </div>

      {/* Action */}
      <div
        className="rounded-xl p-3 flex items-start gap-2"
        style={{ background: colorLight, borderLeft: `3px solid ${color}` }}
      >
        <ArrowRight size={14} style={{ color }} className="mt-0.5 flex-shrink-0" />
        <p className="text-sm leading-relaxed" style={{ color }}>
          <span className="font-semibold">Recommended: </span>
          {action}
        </p>
      </div>
    </div>
  )
}
