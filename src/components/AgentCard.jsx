import { useState } from 'react'
import { MessageSquare, ChevronDown, ChevronUp, AlertCircle, Sparkles } from 'lucide-react'

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
    }, 1400)
  }

  return (
    <div
      className="flex flex-col gap-5 p-6 rounded-2xl transition-all duration-300"
      style={{
        background: expanded
          ? `linear-gradient(135deg, ${agent.color}08, rgba(255,255,255,0.03))`
          : 'rgba(255,255,255,0.03)',
        border: `1px solid ${expanded ? agent.color + '28' : 'rgba(255,255,255,0.07)'}`,
      }}
    >
      {/* Header */}
      <div className="flex items-start gap-4">
        <div
          className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0"
          style={{
            background: `linear-gradient(135deg, ${agent.color}22, ${agent.color}10)`,
            border: `1px solid ${agent.color}25`,
            boxShadow: `0 4px 16px ${agent.color}18`,
          }}
        >
          {agent.emoji}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <h3 className="font-bold text-white text-base">{agent.name}</h3>
            <span
              className="tag text-xs"
              style={{
                background: `${agent.color}15`,
                color: agent.color,
                border: `1px solid ${agent.color}20`,
              }}
            >
              {agent.role}
            </span>
          </div>
          <p className="text-slate-400 text-sm">{agent.tagline}</p>
        </div>
      </div>

      {/* Capabilities */}
      <ul className="space-y-2">
        {agent.capabilities.map((c, i) => (
          <li key={i} className="flex items-start gap-2.5 text-sm text-slate-300">
            <span
              className="mt-1 flex-shrink-0 w-1.5 h-1.5 rounded-full"
              style={{ background: agent.color }}
            />
            {c}
          </li>
        ))}
      </ul>

      {/* Legal disclaimer */}
      {agent.disclaimer && (
        <div
          className="flex items-start gap-2.5 rounded-xl p-3"
          style={{ background: 'rgba(239,68,68,0.07)', border: '1px solid rgba(239,68,68,0.15)' }}
        >
          <AlertCircle size={13} className="text-red-400 mt-0.5 flex-shrink-0" />
          <p className="text-red-300 text-xs leading-relaxed">{agent.disclaimer}</p>
        </div>
      )}

      {/* AI Response */}
      {response && expanded && (
        <div
          className="rounded-xl p-4 text-sm text-slate-200 leading-relaxed animate-fade-up"
          style={{
            background: `linear-gradient(135deg, ${agent.color}10, ${agent.color}06)`,
            border: `1px solid ${agent.color}20`,
          }}
        >
          <div className="flex items-center gap-1.5 mb-3" style={{ color: agent.color }}>
            <Sparkles size={12} />
            <span className="text-xs font-semibold uppercase tracking-wider">{agent.name} responds</span>
          </div>
          <p className="text-slate-200 leading-relaxed">{response}</p>
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center gap-2 pt-1">
        <button
          onClick={ask}
          disabled={loading}
          className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-sm font-semibold text-white transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          style={{
            background: loading ? 'rgba(255,255,255,0.08)' : `linear-gradient(135deg, ${agent.color}cc, ${agent.color})`,
            boxShadow: loading ? 'none' : `0 4px 14px ${agent.color}35`,
          }}
        >
          {loading ? (
            <>
              <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Thinking...
            </>
          ) : (
            <>
              <MessageSquare size={14} />
              Ask Agent
            </>
          )}
        </button>
        {response && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="btn-ghost p-2.5 rounded-xl"
            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
          >
            {expanded ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
          </button>
        )}
      </div>
    </div>
  )
}
