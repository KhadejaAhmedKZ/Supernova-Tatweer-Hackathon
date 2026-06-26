const voteStyles = {
  'Proceed Now': { color: '#10b981', bg: 'rgba(16,185,129,0.12)' },
  'Wait': { color: '#f59e0b', bg: 'rgba(245,158,11,0.12)' },
  'Improve First': { color: '#6366f1', bg: 'rgba(99,102,241,0.12)' },
}

export default function BoardOpinionCard({ item, index, visible }) {
  const { agent, question, opinion, vote } = item
  const vs = voteStyles[vote] || voteStyles['Wait']

  if (!visible) {
    return (
      <div className="glass p-5 opacity-30 blur-sm flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl" style={{ background: agent.colorLight }}>
          {agent.emoji}
        </div>
        <div>
          <div className="h-3 w-32 bg-white/10 rounded" />
          <div className="h-2 w-20 bg-white/5 rounded mt-2" />
        </div>
      </div>
    )
  }

  return (
    <div
      className="glass p-6 space-y-3 transition-all duration-500"
      style={{
        borderColor: `${agent.color}25`,
        animation: `fadeUp 0.5s ease ${index * 0.1}s both`,
      }}
    >
      {/* Agent header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
            style={{ background: agent.colorLight }}
          >
            {agent.emoji}
          </div>
          <div>
            <p className="font-bold text-white text-sm">{agent.name}</p>
            <p className="text-xs text-slate-500">{agent.role}</p>
          </div>
        </div>
        <span
          className="tag text-xs font-bold px-3 py-1 rounded-full"
          style={{ background: vs.bg, color: vs.color }}
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
