import { useNavigate } from 'react-router-dom'
import { ArrowRight, Lock, Zap } from 'lucide-react'
import { agents } from '../data/mockData'
import { useApp } from '../context/AppContext'

export default function Agents() {
  const navigate = useNavigate()
  const { session } = useApp()
  const { result, teamUnlocked, agentHistory } = session

  if (!result) return (
    <div style={{ textAlign:'center', padding:'60px 0' }} className="animate-fade-up">
      <div style={{ fontSize:56, marginBottom:16 }}>🔒</div>
      <h2 style={{ color:'white', fontSize:22, fontWeight:800, marginBottom:8 }}>AI Team is waiting</h2>
      <p style={{ color:'#64748b', fontSize:14, maxWidth:360, margin:'0 auto 24px', lineHeight:1.7 }}>
        Submit your idea in the Idea Engine first, then click Continue to unlock your 5 AI advisors.
      </p>
      <button onClick={() => navigate('/welcome')} className="btn-primary" style={{ margin:'0 auto' }}>
        <Zap size={15} /> Start the Journey
      </button>
    </div>
  )

  return (
    <div className="animate-fade-up">
      <div style={{ marginBottom:32 }}>
        <div style={{ display:'inline-flex', alignItems:'center', gap:8, padding:'6px 16px', borderRadius:99, background:'rgba(139,92,246,0.12)', border:'1px solid rgba(139,92,246,0.22)', fontSize:11, fontWeight:700, color:'#c4b5fd', textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:16 }}>
          <span style={{ width:6, height:6, borderRadius:'50%', background:'#a78bfa', animation:'pulseGlow 2s infinite', display:'inline-block' }} />
          AI Startup Team
        </div>
        <h1 style={{ fontSize:30, fontWeight:800, color:'white', letterSpacing:'-0.02em', marginBottom:8 }}>Your 5 Expert Advisors</h1>
        <p style={{ color:'#64748b', fontSize:14 }}>
          Choose an advisor to get personalised guidance for{' '}
          <span style={{ color:'#cbd5e1', fontWeight:600 }}>"{session.idea?.idea?.slice(0,50)}{session.idea?.idea?.length > 50 ? '...' : ''}"</span>
        </p>
      </div>

      {!teamUnlocked && (
        <div style={{ padding:'14px 18px', borderRadius:14, marginBottom:24, background:'rgba(251,191,36,0.08)', border:'1px solid rgba(251,191,36,0.2)', display:'flex', alignItems:'center', gap:10 }}>
          <Lock size={14} style={{ color:'#fbbf24' }} />
          <p style={{ color:'#fde68a', fontSize:13 }}>
            Preview mode — go back to Results and click <strong>Continue</strong> to fully unlock all advisors.
          </p>
        </div>
      )}

      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))', gap:16 }}>
        {agents.map(agent => {
          const history = agentHistory?.[agent.id] || []
          return (
            <button key={agent.id} onClick={() => navigate(`/agents/${agent.id}`)}
              className="glass-hover"
              style={{ padding:24, textAlign:'left', display:'flex', flexDirection:'column', gap:14 }}>

              {/* Header */}
              <div style={{ display:'flex', alignItems:'center', gap:14 }}>
                <div style={{ width:52, height:52, borderRadius:16, background:`linear-gradient(135deg,${agent.color}25,${agent.color}10)`, border:`1px solid ${agent.color}25`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:26, boxShadow:`0 0 20px ${agent.color}20`, flexShrink:0 }}>
                  {agent.emoji}
                </div>
                <div>
                  <p style={{ color:'white', fontWeight:700, fontSize:15, marginBottom:3 }}>{agent.name}</p>
                  <span style={{ fontSize:11, fontWeight:600, padding:'3px 10px', borderRadius:99, background:`${agent.color}15`, color:agent.color, border:`1px solid ${agent.color}20` }}>
                    {agent.role}
                  </span>
                </div>
              </div>

              <p style={{ color:'#64748b', fontSize:13, lineHeight:1.6 }}>{agent.tagline}</p>

              {/* Chat history count */}
              {history.length > 0 && (
                <div style={{ fontSize:11, color:'#34d399', fontWeight:600 }}>
                  ✓ {history.length} conversation{history.length > 1 ? 's' : ''} saved
                </div>
              )}

              <div style={{ display:'flex', alignItems:'center', gap:4, fontSize:13, fontWeight:600, color:agent.color, marginTop:'auto' }}>
                Ask {agent.name.split(' ')[0]} <ArrowRight size={14} />
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
