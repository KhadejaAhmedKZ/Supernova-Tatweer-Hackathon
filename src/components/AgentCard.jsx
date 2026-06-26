import { useState } from 'react'
import { MessageSquare, ChevronDown, ChevronUp, AlertCircle } from 'lucide-react'

export default function AgentCard({ agent, idea }) {
  const [response, setResponse] = useState(null)
  const [loading, setLoading] = useState(false)
  const [expanded, setExpanded] = useState(false)

  const ask = () => {
    setLoading(true)
    setResponse(null)
    setTimeout(() => {
      setResponse(agent.mockResponse(idea || 'your business idea'))
      setLoading(false)
      setExpanded(true)
    }, 1200)
  }

  return (
    <div
      className="glass-hover p-6 flex flex-col gap-4"
      style={{ borderColor: expanded ? `${agent.color}30` : undefined }}
    >
      {/* Header */}
      <div className="flex items-start gap-4">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
          style={{ background: agent.colorLight }}
        >
          {agent.emoji}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="font-bold text-white">{agent.name}</h3>
            <span
              className="tag text-xs"
              style={{ background: agent.colorLight, color: agent.color }}
            >
              {agent.role}
            </span>
          </div>
          <p className="text-slate-400 text-sm mt-1">{agent.tagline}</p>
        </div>
      </div>

      {/* Capabilities */}
      <ul className="space-y-2">
        {agent.capabilities.map((c, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
            <span style={{ color: agent.color }} className="mt-0.5 flex-shrink-0">✦</span>
            {c}
          </li>
        ))}
      </ul>

      {/* Legal disclaimer */}
      {agent.disclaimer && (
        <div className="flex items-start gap-2 bg-red-500/8 border border-red-500/15 rounded-xl p-3">
          <AlertCircle size={14} className="text-red-400 mt-0.5 flex-shrink-0" />
          <p className="text-red-300 text-xs leading-relaxed">{agent.disclaimer}</p>
        </div>
      )}

      {/* Response */}
      {response && expanded && (
        <div
          className="rounded-xl p-4 text-sm text-slate-200 leading-relaxed border"
          style={{ background: agent.colorLight, borderColor: `${agent.color}25` }}
        >
          <div className="flex items-center gap-1.5 mb-2" style={{ color: agent.color }}>
            <MessageSquare size={13} />
            <span className="text-xs font-semibold uppercase tracking-wider">{agent.name} says</span>
          </div>
          {response}
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center gap-2 pt-1">
        <button
          onClick={ask}
          disabled={loading}
          className="btn-primary text-sm py-2 px-4 flex-1 justify-center"
          style={
            loading
              ? {}
              : { background: `linear-gradient(135deg, ${agent.color}cc, ${agent.color})` }
          }
        >
          {loading ? (
            <>
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Thinking...
            </>
          ) : (
            <>
              <MessageSquare size={15} />
              Ask Agent
            </>
          )}
        </button>
        {response && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="btn-ghost py-2 px-3"
          >
            {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
        )}
      </div>
    </div>
  )
}
