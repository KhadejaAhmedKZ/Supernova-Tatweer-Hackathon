const voteConfig = {
  'Proceed Now':  { color: '#10b981', bg: 'rgba(16,185,129,0.1)',  border: 'rgba(16,185,129,0.2)' },
  'Wait':         { color: '#f59e0b', bg: 'rgba(245,158,11,0.1)',  border: 'rgba(245,158,11,0.2)' },
  'Improve First':{ color: '#6366f1', bg: 'rgba(99,102,241,0.1)',  border: 'rgba(99,102,241,0.2)' },
}

export default function BoardOpinionCard({ item, index, visible }) {
  const { agent, question, opinion, vote } = item
  const vc = voteConfig[vote] || voteConfig['Wait']

  if (!visible) {
    return (
      <div
        className="p-5 rounded-2xl flex items-center gap-3 opacity-20"
        style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', filter: 'blur(1px)' }}
      >
        <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl" style={{ background: agent.colorLight }}>
          {agent.emoji}
        </div>
        <div className="space-y-1.5">
          <div className="h-3 w-28 rounded-full bg-white/10" />
          <div className="h-2 w-20 rounded-full bg-white/6" />
        </div>
      </div>
    )
  }

  return (
    <div
      className="p-6 rounded-2xl space-y-4 animate-fade-up"
      style={{
        background: `linear-gradient(135deg, ${agent.color}07, rgba(255,255,255,0.025))`,
        border: `1px solid ${agent.color}20`,
        animationDelay: `${index * 0.08}s`,
      }}
    >
      {/* Agent + vote */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
            style={{
              background: `linear-gradient(135deg, ${agent.color}20, ${agent.color}0a)`,
              border: `1px solid ${agent.color}22`,
            }}
          >
            {agent.emoji}
          </div>
          <div>
            <p className="font-bold text-white text-sm">{agent.name}</p>
            <p className="text-xs text-slate-500">{agent.role}</p>
          </div>
        </div>
        <span
          className="tag font-bold text-xs"
          style={{ background: vc.bg, color: vc.color, border: `1px solid ${vc.border}` }}
        >
          {vote}
        </span>
      </div>

      {/* Question */}
      <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: agent.color }}>
        {question}
      </p>

      {/* Opinion */}
      <p className="text-slate-300 text-sm leading-relaxed">{opinion}</p>
    </div>
  )
}
