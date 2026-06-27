import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, Zap, Sparkles, Lock } from 'lucide-react'
import { agents } from '../data/mockData'
import { useApp } from '../context/AppContext'
import AgentCard from '../components/AgentCard'

export default function Agents() {
  const navigate = useNavigate()
  const { session } = useApp()
  const { result, teamUnlocked, agentHistory, idea } = session

  const [customIdea, setCustomIdea] = useState(idea?.idea || '')

  // Guard: no result
  if (!result) return (
    <div style={{ textAlign:'center', padding:'60px 0' }} className="animate-fade-up">
      <div style={{ fontSize:56, marginBottom:16 }}>🔒</div>
      <h2 style={{ color:'#fef9ee', fontSize:22, fontWeight:800, marginBottom:8 }}>AI Team is waiting</h2>
      <p style={{ color:'rgba(253,230,138,0.4)', fontSize:14, maxWidth:360, margin:'0 auto 24px', lineHeight:1.7 }}>
        Submit your idea in the Idea Engine first, then click <strong style={{ color:'#fde68a' }}>Continue</strong> to unlock your 5 AI advisors.
      </p>
      <button onClick={() => navigate('/welcome')} className="btn-primary" style={{ margin:'0 auto' }}>
        <Zap size={15} /> Start the Journey
      </button>
    </div>
  )

  return (
    <div className="animate-fade-up">
      {/* Header */}
      <div style={{ marginBottom:28 }}>
        <div style={{ display:'inline-flex', alignItems:'center', gap:8, padding:'6px 14px', borderRadius:99, background:'rgba(245,158,11,0.12)', border:'1px solid rgba(245,158,11,0.25)', fontSize:11, fontWeight:700, color:'#fde68a', textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:14 }}>
          <span style={{ width:6, height:6, borderRadius:'50%', background:'#f59e0b', animation:'pulseGlow 2s infinite', display:'inline-block' }} />
          AI Startup Team
        </div>
        <h1 style={{ fontSize:28, fontWeight:800, color:'#fef9ee', letterSpacing:'-0.02em', marginBottom:8 }}>Your 5 Expert Advisors</h1>
        <p style={{ color:'rgba(253,230,138,0.4)', fontSize:14 }}>
          Personalised for: <span style={{ color:'#e8e0d0', fontWeight:600 }}>"{idea?.idea?.slice(0,60)}{idea?.idea?.length > 60 ? '...' : ''}"</span>
        </p>
      </div>

      {/* Locked notice */}
      {!teamUnlocked && (
        <div style={{ display:'flex', alignItems:'start', gap:10, padding:'13px 16px', borderRadius:14, marginBottom:20, background:'rgba(251,191,36,0.07)', border:'1px solid rgba(251,191,36,0.2)' }}>
          <Lock size={14} style={{ color:'#fbbf24', flexShrink:0, marginTop:1 }} />
          <p style={{ color:'#fde68a', fontSize:13, lineHeight:1.6 }}>
            Preview mode — go to <button onClick={() => navigate('/results')} style={{ color:'#f59e0b', fontWeight:700, background:'none', border:'none', cursor:'pointer', padding:0, textDecoration:'underline', fontSize:13 }}>Results</button> and click <strong>Continue</strong> to fully unlock all advisors with your startup context.
          </p>
        </div>
      )}

      {/* Idea refinement input */}
      <div style={{ display:'flex', flexDirection:'column', sm:'row', gap:10, padding:'16px 18px', borderRadius:16, marginBottom:24, background:'rgba(6,2,24,0.85)', border:'1px solid rgba(255,210,80,0.12)' }}>
        <div style={{ display:'flex', alignItems:'center', gap:7, marginBottom:8 }}>
          <Sparkles size={13} style={{ color:'#f59e0b' }} />
          <span style={{ color:'rgba(253,230,138,0.45)', fontSize:11, fontWeight:600, textTransform:'uppercase', letterSpacing:'0.06em' }}>Refine your idea for better responses</span>
        </div>
        <div style={{ display:'flex', gap:10 }}>
          <input className="input-field" style={{ flex:1 }}
            placeholder="Add more detail about your specific idea..."
            value={customIdea}
            onChange={e => setCustomIdea(e.target.value)}
          />
          {customIdea !== (idea?.idea || '') && (
            <button onClick={() => setCustomIdea(idea?.idea || '')} className="btn-ghost" style={{ fontSize:11, flexShrink:0 }}>
              Reset
            </button>
          )}
        </div>
      </div>

      {/* Agent grid */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))', gap:16 }}>
        {agents.map(agent => {
          const history = agentHistory?.[agent.id] || []
          return (
            <button key={agent.id}
              onClick={() => navigate(`/agents/${agent.id}`)}
              className="glass-hover"
              style={{ padding:22, textAlign:'left', display:'flex', flexDirection:'column', gap:13 }}>

              <div style={{ display:'flex', alignItems:'center', gap:12 }}>
                <div style={{ width:50, height:50, borderRadius:15, flexShrink:0, display:'flex', alignItems:'center', justifyContent:'center', fontSize:24,
                  background:`linear-gradient(135deg,${agent.color}22,${agent.color}0a)`,
                  border:`1px solid ${agent.color}25`,
                  boxShadow:`0 0 18px ${agent.color}18` }}>
                  {agent.emoji}
                </div>
                <div>
                  <p style={{ color:'#fef9ee', fontWeight:800, fontSize:14, marginBottom:3 }}>{agent.name}</p>
                  <span style={{ fontSize:11, fontWeight:600, padding:'3px 9px', borderRadius:99, background:`${agent.color}15`, color:agent.color, border:`1px solid ${agent.color}20` }}>
                    {agent.role}
                  </span>
                </div>
              </div>

              <p style={{ color:'rgba(253,230,138,0.4)', fontSize:12, lineHeight:1.6 }}>{agent.tagline}</p>

              <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                <div style={{ display:'flex', alignItems:'center', gap:5, fontSize:12, fontWeight:600, color:agent.color }}>
                  Ask {agent.name.split(' ')[0]} <ArrowRight size={13} />
                </div>
                {history.length > 0 && (
                  <span style={{ fontSize:11, color:'#34d399' }}>
                    ✓ {history.length} chat{history.length > 1 ? 's' : ''}
                  </span>
                )}
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
