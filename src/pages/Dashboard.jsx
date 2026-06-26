import { useNavigate } from 'react-router-dom'
import { Zap, Users, Shield, Presentation, TrendingUp, ArrowRight, RotateCcw, Clock } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { opportunities, getBusinessHealth } from '../data/mockData'
import ScoreCard from '../components/ScoreCard'
import ProgressTimeline from '../components/ProgressTimeline'

const quickLinks = [
  { to:'/results',           icon:Zap,          label:'My Results',    color:'#f59e0b' },
  { to:'/agents',            icon:Users,         label:'AI Team',       color:'#a78bfa' },
  { to:'/failure-prevention',icon:Shield,        label:'Risk Check',    color:'#fb923c' },
  { to:'/board-meeting',     icon:Presentation,  label:'Board Meeting', color:'#34d399' },
  { to:'/opportunities',     icon:TrendingUp,    label:'Opportunities', color:'#fbbf24' },
]

const healthColor = { green:'#34d399', yellow:'#fbbf24', red:'#fb923c', grey:'rgba(255,255,255,0.15)' }
const healthDot   = { green:'🟢', yellow:'🟡', red:'🔴', grey:'⚫' }

export default function Dashboard() {
  const navigate = useNavigate()
  const { session, resetSession } = useApp()
  const { about, idea, result, decision, teamUnlocked, completedStages, boardHistory, riskHistory } = session

  const card = { background:'rgba(6,2,24,0.88)', backdropFilter:'blur(20px)', border:'1px solid rgba(255,210,80,0.15)', borderRadius:18 }

  if (!result) return (
    <div className="animate-fade-up" style={{ textAlign:'center', padding:'60px 0' }}>
      <div style={{ fontSize:64, marginBottom:20, animation:'floatY 4s ease-in-out infinite', display:'inline-block' }}>🌟</div>
      <h2 style={{ color:'#fef9ee', fontSize:22, fontWeight:800, marginBottom:12 }}>Start your journey</h2>
      <p style={{ color:'rgba(253,230,138,0.4)', fontSize:14, maxWidth:360, margin:'0 auto 28px', lineHeight:1.8 }}>
        Complete the Idea Engine to unlock your personal business dashboard.
      </p>
      <button onClick={() => navigate('/welcome')} className="btn-primary" style={{ margin:'0 auto' }}>
        <Zap size={16} /> Begin My Journey <ArrowRight size={16} />
      </button>
    </div>
  )

  const health = getBusinessHealth(session)
  const statusColor = decision==='continue'?'#34d399':decision==='pause'?'#fbbf24':decision==='stop'?'#fb923c':'#f59e0b'
  const statusLabel = decision==='continue'?'In Progress':decision==='pause'?'Paused':decision==='stop'?'Stopped':'Ready'

  return (
    <div className="animate-fade-up" style={{ display:'flex', flexDirection:'column', gap:18 }}>

      {/* Welcome banner */}
      <div style={{ padding:'22px 26px', borderRadius:20, display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:14, background:'linear-gradient(135deg,rgba(200,112,16,0.15),rgba(6,2,24,0.9))', border:'1px solid rgba(245,158,11,0.25)' }}>
        <div>
          <p style={{ color:'rgba(253,230,138,0.4)', fontSize:11, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:6 }}>Business Dashboard</p>
          <h1 style={{ color:'#fef9ee', fontSize:20, fontWeight:800, marginBottom:4 }}>
            Welcome back{about?.name ? `, ${about.name}` : ''} 👋
          </h1>
          <p style={{ color:'rgba(253,230,138,0.4)', fontSize:13 }}>
            Working on: <span style={{ color:'#e8e0d0', fontWeight:600 }}>{idea?.idea?.slice(0,60)}{idea?.idea?.length>60?'...':''}</span>
          </p>
        </div>
        <div style={{ display:'flex', gap:10, alignItems:'center' }}>
          <span style={{ padding:'6px 14px', borderRadius:99, fontSize:12, fontWeight:700, background:`${statusColor}15`, color:statusColor, border:`1px solid ${statusColor}25` }}>
            ● {statusLabel}
          </span>
          <button onClick={() => { if(confirm('Reset and start a new idea?')){ resetSession(); navigate('/welcome') } }} className="btn-ghost" style={{ fontSize:11, color:'rgba(253,230,138,0.25)' }}>
            <RotateCcw size={12} /> New idea
          </button>
        </div>
      </div>

      {/* Main grid */}
      <div style={{ display:'grid', gridTemplateColumns:'1fr 320px', gap:18 }} className="dash-grid">
        <div style={{ display:'flex', flexDirection:'column', gap:18 }}>

          {/* Scores */}
          <div style={{ ...card, padding:22 }}>
            <p className="score-label" style={{ marginBottom:14 }}>Startup Scores</p>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:12 }}>
              <ScoreCard label="Readiness"     score={result.readinessScore}    color="#f59e0b" />
              <ScoreCard label="Confidence"    score={result.confidenceScore}   color="#34d399" />
              <ScoreCard label="Risk Level"    score={result.riskScore}         color="#fb923c" />
              <ScoreCard label="Community Fit" score={result.communityFitScore} color="#a78bfa" />
            </div>
          </div>

          {/* Business Health */}
          <div style={{ ...card, padding:22 }}>
            <p className="score-label" style={{ marginBottom:16 }}>Business Health</p>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:10 }}>
              {health.map(h => (
                <div key={h.label} style={{ padding:'14px 10px', borderRadius:14, textAlign:'center', background:'rgba(255,255,255,0.03)', border:`1px solid ${healthColor[h.status]}25`, transition:'all 0.3s' }}>
                  <div style={{ fontSize:22, marginBottom:6 }}>{h.emoji}</div>
                  <p style={{ color:'rgba(253,230,138,0.5)', fontSize:10, fontWeight:600, textTransform:'uppercase', marginBottom:4 }}>{h.label}</p>
                  <span style={{ fontSize:18 }}>{healthDot[h.status]}</span>
                </div>
              ))}
            </div>
          </div>

          {/* First Action */}
          <div style={{ padding:22, borderRadius:18, background:'linear-gradient(135deg,rgba(245,158,11,0.12),rgba(6,2,24,0.9))', border:'1px solid rgba(245,158,11,0.25)' }}>
            <p style={{ color:'#fbbf24', fontSize:11, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:10 }}>⚡ Current Mission</p>
            <p style={{ color:'#fef9ee', fontSize:15, fontWeight:700, lineHeight:1.5, marginBottom:14 }}>{result.firstAction}</p>
            <button onClick={() => navigate('/results')} className="btn-primary" style={{ fontSize:13, padding:'10px 20px' }}>
              View Full Analysis <ArrowRight size={14} />
            </button>
          </div>

          {/* Recent AI Advice */}
          {(boardHistory.length > 0 || riskHistory.length > 0) && (
            <div style={{ ...card, padding:22 }}>
              <p className="score-label" style={{ marginBottom:14 }}>Recent AI Advice</p>
              <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
                {riskHistory.slice(0,2).map((r,i) => (
                  <div key={i} style={{ padding:'12px 14px', borderRadius:12, background:'rgba(251,146,60,0.07)', border:'1px solid rgba(251,146,60,0.15)' }}>
                    <p style={{ color:'#fdba74', fontSize:11, fontWeight:700, marginBottom:4 }}>🛡️ Risk Check</p>
                    <p style={{ color:'#e8e0d0', fontSize:12, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{r.decision}</p>
                    <p style={{ color:r.analysis.riskLevel==='High'?'#fb923c':r.analysis.riskLevel==='Medium'?'#fbbf24':'#34d399', fontSize:11, fontWeight:600, marginTop:4 }}>{r.analysis.riskLevel} Risk</p>
                  </div>
                ))}
                {boardHistory.slice(0,1).map((b,i) => (
                  <div key={i} style={{ padding:'12px 14px', borderRadius:12, background:'rgba(52,211,153,0.07)', border:'1px solid rgba(52,211,153,0.15)' }}>
                    <p style={{ color:'#6ee7b7', fontSize:11, fontWeight:700, marginBottom:4 }}>🏛️ Board Meeting</p>
                    <p style={{ color:'#e8e0d0', fontSize:12, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{b.pitch}</p>
                    {b.final && <p style={{ color:b.final.color, fontSize:11, fontWeight:600, marginTop:4 }}>Decision: {b.final.decision}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Recommended Opportunity */}
          <div style={{ ...card, padding:22 }}>
            <p className="score-label" style={{ marginBottom:14 }}>Recommended Opportunity</p>
            <div style={{ display:'flex', gap:14 }}>
              <div style={{ width:44, height:44, borderRadius:14, background:`${opportunities[0].color}18`, border:`1px solid ${opportunities[0].color}20`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:22, flexShrink:0 }}>
                {opportunities[0].emoji}
              </div>
              <div>
                <p style={{ color:'#fef9ee', fontWeight:700, fontSize:14, marginBottom:4 }}>{opportunities[0].title}</p>
                <p style={{ color:'rgba(253,230,138,0.4)', fontSize:12, lineHeight:1.6, marginBottom:10 }}>{opportunities[0].whyItHelps}</p>
                <button onClick={() => navigate('/opportunities')} className="btn-ghost" style={{ fontSize:12, padding:'0', color:'#f59e0b' }}>
                  View all opportunities <ArrowRight size={12} style={{ display:'inline' }} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right column */}
        <div style={{ display:'flex', flexDirection:'column', gap:18 }}>
          {/* Founder Journey */}
          <div style={{ ...card, padding:22 }}>
            <ProgressTimeline completedStages={completedStages} />
          </div>

          {/* Quick Actions */}
          <div style={{ ...card, padding:22 }}>
            <p className="score-label" style={{ marginBottom:14 }}>Quick Actions</p>
            <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
              {quickLinks.map(({ to, icon:Icon, label, color }) => (
                <button key={to} onClick={() => navigate(to)}
                  style={{ display:'flex', alignItems:'center', gap:12, padding:'12px 14px', borderRadius:14, background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,210,80,0.1)', cursor:'pointer', textAlign:'left', transition:'all 0.2s', width:'100%' }}
                  onMouseEnter={e => { e.currentTarget.style.background=`${color}0c`; e.currentTarget.style.borderColor=`${color}30` }}
                  onMouseLeave={e => { e.currentTarget.style.background='rgba(255,255,255,0.03)'; e.currentTarget.style.borderColor='rgba(255,210,80,0.1)' }}>
                  <div style={{ width:32, height:32, borderRadius:10, background:`${color}18`, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                    <Icon size={15} style={{ color }} />
                  </div>
                  <p style={{ color:'#e8e0d0', fontWeight:600, fontSize:13 }}>{label}</p>
                  <ArrowRight size={13} style={{ color:'rgba(255,255,255,0.15)', marginLeft:'auto' }} />
                </button>
              ))}
            </div>
          </div>

          {/* Continue */}
          <div style={{ padding:20, borderRadius:18, background:'linear-gradient(135deg,rgba(52,211,153,0.1),rgba(6,2,24,0.9))', border:'1px solid rgba(52,211,153,0.2)', textAlign:'center' }}>
            <div style={{ fontSize:28, marginBottom:10 }}>🚀</div>
            <p style={{ color:'#6ee7b7', fontSize:13, fontWeight:700, marginBottom:12 }}>Continue Building</p>
            <button onClick={() => navigate('/agents')} className="btn-primary" style={{ fontSize:12, padding:'10px 20px', width:'100%', justifyContent:'center' }}>
              Talk to AI Team
            </button>
          </div>
        </div>
      </div>

      <style>{`@media(max-width:768px){.dash-grid{grid-template-columns:1fr!important}}`}</style>
    </div>
  )
}
