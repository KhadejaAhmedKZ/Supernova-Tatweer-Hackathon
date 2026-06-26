import { useState } from 'react'
import { MessageSquare, ChevronDown, ChevronUp, AlertCircle, Sparkles } from 'lucide-react'

export default function AgentCard({ agent, idea }) {
  const [response, setResponse] = useState(null)
  const [loading, setLoading]   = useState(false)
  const [expanded, setExpanded] = useState(false)

  const ask = () => {
    setLoading(true); setResponse(null)
    setTimeout(() => {
      setResponse(agent.mockResponse(idea || 'your business idea'))
      setLoading(false); setExpanded(true)
    }, 1400)
  }

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:16, padding:24, borderRadius:20, transition:'all 0.3s',
      background: expanded ? `linear-gradient(135deg, ${agent.color}10, rgba(6,2,24,0.92))` : 'rgba(6,2,24,0.88)',
      border: `1px solid ${expanded ? agent.color+'40' : 'rgba(255,210,100,0.18)'}`,
      backdropFilter:'blur(20px)' }}>

      {/* Header */}
      <div style={{ display:'flex', alignItems:'flex-start', gap:14 }}>
        <div style={{ width:52, height:52, borderRadius:16, flexShrink:0, display:'flex', alignItems:'center', justifyContent:'center', fontSize:26,
          background:`linear-gradient(135deg, ${agent.color}25, ${agent.color}10)`,
          border:`1px solid ${agent.color}30`,
          boxShadow:`0 0 20px ${agent.color}22` }}>
          {agent.emoji}
        </div>
        <div style={{ flex:1 }}>
          <div style={{ display:'flex', alignItems:'center', gap:8, flexWrap:'wrap', marginBottom:4 }}>
            <h3 style={{ fontWeight:800, color:'#fef9ee', fontSize:15 }}>{agent.name}</h3>
            <span style={{ fontSize:11, fontWeight:600, padding:'3px 10px', borderRadius:99, background:`${agent.color}18`, color:agent.color, border:`1px solid ${agent.color}25` }}>
              {agent.role}
            </span>
          </div>
          <p style={{ color:'rgba(253,230,138,0.55)', fontSize:13 }}>{agent.tagline}</p>
        </div>
      </div>

      {/* Capabilities */}
      <ul style={{ listStyle:'none', margin:0, padding:0, display:'flex', flexDirection:'column', gap:8 }}>
        {agent.capabilities.map((c,i) => (
          <li key={i} style={{ display:'flex', alignItems:'flex-start', gap:10, fontSize:13, color:'#e2d9c8' }}>
            <span style={{ width:6, height:6, borderRadius:'50%', background:agent.color, flexShrink:0, marginTop:5 }} />
            {c}
          </li>
        ))}
      </ul>

      {/* Disclaimer */}
      {agent.disclaimer && (
        <div style={{ display:'flex', alignItems:'flex-start', gap:8, padding:'10px 14px', borderRadius:12, background:'rgba(239,68,68,0.1)', border:'1px solid rgba(239,68,68,0.2)' }}>
          <AlertCircle size={13} style={{ color:'#fca5a5', marginTop:1, flexShrink:0 }} />
          <p style={{ color:'#fca5a5', fontSize:11, lineHeight:1.6 }}>{agent.disclaimer}</p>
        </div>
      )}

      {/* Response */}
      {response && expanded && (
        <div style={{ padding:16, borderRadius:14, background:`linear-gradient(135deg,${agent.color}12,${agent.color}06)`, border:`1px solid ${agent.color}25` }} className="animate-fade-up">
          <div style={{ display:'flex', alignItems:'center', gap:6, marginBottom:10, color:agent.color }}>
            <Sparkles size={12} />
            <span style={{ fontSize:11, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.07em' }}>{agent.name} responds</span>
          </div>
          <p style={{ color:'#f1ece0', fontSize:13, lineHeight:1.8 }}>{response}</p>
        </div>
      )}

      {/* Actions */}
      <div style={{ display:'flex', gap:10 }}>
        <button onClick={ask} disabled={loading}
          style={{ flex:1, display:'inline-flex', alignItems:'center', justifyContent:'center', gap:8, padding:'11px 16px', borderRadius:12, fontSize:13, fontWeight:700, cursor:loading?'not-allowed':'pointer', transition:'all 0.2s', border:'none',
            background: loading ? 'rgba(255,255,255,0.06)' : `linear-gradient(135deg, ${agent.color}cc, ${agent.color})`,
            color: loading ? '#94a3b8' : '#fff',
            boxShadow: loading ? 'none' : `0 4px 16px ${agent.color}40`,
            opacity: loading ? 0.7 : 1 }}>
          {loading ? (
            <><span style={{ width:14, height:14, border:'2px solid rgba(255,255,255,0.3)', borderTopColor:'white', borderRadius:'50%', animation:'spin 0.8s linear infinite' }} />Thinking...</>
          ) : (
            <><MessageSquare size={14} />Ask Agent</>
          )}
        </button>
        {response && (
          <button onClick={() => setExpanded(!expanded)} className="btn-ghost"
            style={{ padding:'11px 14px', background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,210,100,0.15)', borderRadius:12 }}>
            {expanded ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
          </button>
        )}
      </div>
    </div>
  )
}
