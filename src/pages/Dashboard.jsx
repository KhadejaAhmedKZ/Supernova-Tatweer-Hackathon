import { useNavigate } from 'react-router-dom'
import {
  Zap, Users, Shield, Presentation, TrendingUp,
  ArrowRight, RotateCcw, Map,
} from 'lucide-react'
import { useApp } from '../context/AppContext'
import { opportunities } from '../data/mockData'
import ScoreCard        from '../components/ScoreCard'
import ProgressTimeline from '../components/ProgressTimeline'

const quickLinks = [
  { to:'/results',           icon:Zap,          label:'My Results',    color:'#f59e0b', desc:'View full analysis' },
  { to:'/agents',            icon:Users,         label:'AI Team',       color:'#a78bfa', desc:'5 expert advisors' },
  { to:'/failure-prevention',icon:Shield,        label:'Risk Check',    color:'#fb923c', desc:'Avoid mistakes' },
  { to:'/board-meeting',     icon:Presentation,  label:'Board Meeting', color:'#34d399', desc:'Multi-agent debate' },
  { to:'/market-discovery',  icon:Map,           label:'Market AI',     color:'#818cf8', desc:'Competitive analysis' },
  { to:'/opportunities',     icon:TrendingUp,    label:'Opportunities', color:'#fbbf24', desc:'Grants & funding' },
]

const healthStatus = (session) => {
  const { result, resources, decision } = session
  return [
    {
      label: 'Idea', emoji: '💡',
      status: result ? 'green' : 'grey',
    },
    {
      label: 'Validation', emoji: '🔍',
      status: resources?.hasCustomers === 'yes' ? 'green'
             : resources?.hasCustomers === 'maybe' ? 'yellow'
             : result ? 'yellow' : 'grey',
    },
    {
      label: 'Marketing', emoji: '📣',
      status: decision === 'continue' ? 'yellow' : 'grey',
    },
    {
      label: 'Finance', emoji: '💰',
      status: resources?.budget && Number(resources.budget) >= 200 ? 'green' : result ? 'yellow' : 'grey',
    },
    {
      label: 'Legal', emoji: '⚖️',
      status: 'grey',
    },
    {
      label: 'Growth', emoji: '📈',
      status: decision === 'continue' ? 'yellow' : 'grey',
    },
  ]
}

const dot   = { green:'🟢', yellow:'🟡', red:'🔴', grey:'⚫' }
const dotClr= { green:'#34d399', yellow:'#fbbf24', red:'#fb923c', grey:'rgba(255,255,255,0.1)' }

export default function Dashboard() {
  const navigate = useNavigate()
  const { session, resetSession } = useApp()
  const { about, idea, result, decision, teamUnlocked, completedStages, boardHistory, riskHistory } = session

  const card = {
    background:'rgba(6,2,24,0.88)',
    backdropFilter:'blur(20px)',
    border:'1px solid rgba(255,210,80,0.15)',
    borderRadius:18,
  }

  // Empty state
  if (!result) return (
    <div className="animate-fade-up" style={{ textAlign:'center', padding:'60px 0' }}>
      <div style={{ fontSize:64, marginBottom:20, animation:'floatY 4s ease-in-out infinite', display:'inline-block' }}>🌟</div>
      <h2 style={{ color:'#fef9ee', fontSize:22, fontWeight:800, marginBottom:12 }}>Start your journey</h2>
      <p style={{ color:'rgba(253,230,138,0.4)', fontSize:14, maxWidth:360, margin:'0 auto 28px', lineHeight:1.8 }}>
        Complete the Idea Engine to unlock your personal business dashboard.
      </p>
      <button onClick={() => navigate('/welcome')} className="btn-primary" style={{ margin:'0 auto' }}>
        <Zap size={16} /> Begin My Journey <ArrowRight size={15} />
      </button>
    </div>
  )

  const health     = healthStatus(session)
  const statusColor = decision==='continue'?'#34d399':decision==='pause'?'#fbbf24':decision==='stop'?'#fb923c':'#f59e0b'
  const statusLabel = decision==='continue'?'In Progress':decision==='pause'?'Paused':decision==='stop'?'Stopped':'Ready'

  const handleReset = () => {
    if (window.confirm('Reset your session and start a completely new idea?')) {
      resetSession()
      navigate('/welcome')
    }
  }

  return (
    <div className="animate-fade-up" style={{ display:'flex', flexDirection:'column', gap:18 }}>

      {/* Welcome banner */}
      <div style={{ padding:'20px 24px', borderRadius:20, display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:14, background:'linear-gradient(135deg,rgba(200,112,16,0.14),rgba(6,2,24,0.92))', border:'1px solid rgba(245,158,11,0.22)' }}>
        <div>
          <p style={{ color:'rgba(253,230,138,0.4)', fontSize:11, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:5 }}>
            Business Dashboard
          </p>
          <h1 style={{ color:'#fef9ee', fontSize:19, fontWeight:800, marginBottom:4 }}>
            Welcome back{about?.name ? `, ${about.name}` : ''} 👋
          </h1>
          <p style={{ color:'rgba(253,230,138,0.4)', fontSize:13 }}>
            {idea?.idea?.slice(0,70)}{idea?.idea?.length > 70 ? '...' : ''}
          </p>
        </div>
        <div style={{ display:'flex', gap:10, alignItems:'center', flexWrap:'wrap' }}>
          <span style={{ padding:'5px 13px', borderRadius:99, fontSize:12, fontWeight:700, background:`${statusColor}15`, color:statusColor, border:`1px solid ${statusColor}25` }}>
            ● {statusLabel}
          </span>
          <button onClick={handleReset} className="btn-ghost" style={{ fontSize:11, color:'rgba(253,230,138,0.25)' }}>
            <RotateCcw size={12} /> New idea
          </button>
        </div>
      </div>

      {/* Main 2-col grid */}
      <div style={{ display:'grid', gridTemplateColumns:'1fr 300px', gap:18 }} className="dash-grid">

        {/* LEFT */}
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
                <div key={h.label} style={{ padding:'13px 10px', borderRadius:14, textAlign:'center', background:'rgba(255,255,255,0.02)', border:`1px solid ${dotClr[h.status]}22`, transition:'all 0.3s' }}>
                  <div style={{ fontSize:20, marginBottom:5 }}>{h.emoji}</div>
                  <p style={{ color:'rgba(253,230,138,0.4)', fontSize:10, fontWeight:600, textTransform:'uppercase', marginBottom:3 }}>{h.label}</p>
                  <span style={{ fontSize:16 }}>{dot[h.status]}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Current Mission */}
          <div style={{ padding:20, borderRadius:18, background:'linear-gradient(135deg,rgba(245,158,11,0.12),rgba(6,2,24,0.92))', border:'1px solid rgba(245,158,11,0.22)' }}>
            <p style={{ color:'#fbbf24', fontSize:11, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:9 }}>⚡ Current Mission</p>
            <p style={{ color:'#fef9ee', fontSize:14, fontWeight:700, lineHeight:1.55, marginBottom:14 }}>{result.firstAction}</p>
            <button onClick={() => navigate('/results')} className="btn-primary" style={{ fontSize:12, padding:'9px 18px' }}>
              View Full Analysis <ArrowRight size={13} />
            </button>
          </div>

          {/* Recent AI Advice */}
          {(boardHistory.length > 0 || riskHistory.length > 0) && (
            <div style={{ ...card, padding:22 }}>
              <p className="score-label" style={{ marginBottom:14 }}>Recent AI Advice</p>
              <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
                {riskHistory.slice(0,2).map((r,i) => (
                  <div key={i} style={{ padding:'11px 14px', borderRadius:12, background:'rgba(251,146,60,0.07)', border:'1px solid rgba(251,146,60,0.15)', cursor:'pointer' }}
                    onClick={() => navigate('/failure-prevention')}>
                    <p style={{ color:'#fdba74', fontSize:11, fontWeight:700, marginBottom:3 }}>🛡️ Risk Check</p>
                    <p style={{ color:'#e8e0d0', fontSize:12, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{r.decision}</p>
                    <p style={{ color:r.analysis.riskLevel==='High'?'#fb923c':r.analysis.riskLevel==='Medium'?'#fbbf24':'#34d399', fontSize:11, fontWeight:600, marginTop:3 }}>
                      {r.analysis.riskLevel} Risk
                    </p>
                  </div>
                ))}
                {boardHistory.slice(0,1).map((b,i) => (
                  <div key={i} style={{ padding:'11px 14px', borderRadius:12, background:'rgba(52,211,153,0.07)', border:'1px solid rgba(52,211,153,0.15)', cursor:'pointer' }}
                    onClick={() => navigate('/board-meeting')}>
                    <p style={{ color:'#6ee7b7', fontSize:11, fontWeight:700, marginBottom:3 }}>🏛️ Board Meeting</p>
                    <p style={{ color:'#e8e0d0', fontSize:12, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{b.pitch}</p>
                    {b.final && <p style={{ color:b.final.color, fontSize:11, fontWeight:600, marginTop:3 }}>Decision: {b.final.decision}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Recommended Opportunity */}
          <div style={{ ...card, padding:22 }}>
            <p className="score-label" style={{ marginBottom:14 }}>Recommended Opportunity</p>
            <div style={{ display:'flex', gap:14 }}>
              <div style={{ width:44, height:44, borderRadius:14, flexShrink:0, display:'flex', alignItems:'center', justifyContent:'center', fontSize:22, background:`${opportunities[0].color}18`, border:`1px solid ${opportunities[0].color}20` }}>
                {opportunities[0].emoji}
              </div>
              <div>
                <p style={{ color:'#fef9ee', fontWeight:700, fontSize:13, marginBottom:4 }}>{opportunities[0].title}</p>
                <p style={{ color:'rgba(253,230,138,0.4)', fontSize:12, lineHeight:1.65, marginBottom:10 }}>{opportunities[0].whyItHelps}</p>
                <button onClick={() => navigate('/opportunities')} className="btn-ghost" style={{ fontSize:12, padding:0, color:'#f59e0b' }}>
                  View all opportunities <ArrowRight size={12} style={{ display:'inline', marginLeft:4 }} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div style={{ display:'flex', flexDirection:'column', gap:18 }}>

          {/* Founder Journey */}
          <div style={{ ...card, padding:22 }}>
            <ProgressTimeline completedStages={completedStages} />
          </div>

          {/* Quick Actions */}
          <div style={{ ...card, padding:22 }}>
            <p className="score-label" style={{ marginBottom:14 }}>Quick Actions</p>
            <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
              {quickLinks.map(({ to, icon:Icon, label, color, desc }) => (
                <button key={to} onClick={() => navigate(to)}
                  style={{ display:'flex', alignItems:'center', gap:11, padding:'11px 13px', borderRadius:13, background:'rgba(255,255,255,0.02)', border:'1px solid rgba(255,210,80,0.08)', cursor:'pointer', textAlign:'left', transition:'all 0.2s', width:'100%' }}
                  onMouseEnter={e => { e.currentTarget.style.background=`${color}0c`; e.currentTarget.style.borderColor=`${color}28` }}
                  onMouseLeave={e => { e.currentTarget.style.background='rgba(255,255,255,0.02)'; e.currentTarget.style.borderColor='rgba(255,210,80,0.08)' }}>
                  <div style={{ width:32, height:32, borderRadius:10, background:`${color}18`, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                    <Icon size={14} style={{ color }} />
                  </div>
                  <div style={{ flex:1 }}>
                    <p style={{ color:'#e8e0d0', fontWeight:600, fontSize:12 }}>{label}</p>
                    <p style={{ color:'rgba(255,255,255,0.2)', fontSize:10 }}>{desc}</p>
                  </div>
                  <ArrowRight size={12} style={{ color:'rgba(255,255,255,0.12)' }} />
                </button>
              ))}
            </div>
          </div>

          {/* Continue CTA */}
          <div style={{ padding:18, borderRadius:18, background:'linear-gradient(135deg,rgba(52,211,153,0.1),rgba(6,2,24,0.92))', border:'1px solid rgba(52,211,153,0.18)', textAlign:'center' }}>
            <div style={{ fontSize:26, marginBottom:9 }}>🚀</div>
            <p style={{ color:'#6ee7b7', fontSize:13, fontWeight:700, marginBottom:12 }}>
              {teamUnlocked ? 'Talk to Your AI Team' : 'Continue Building'}
            </p>
            <button onClick={() => navigate('/agents')} className="btn-primary" style={{ fontSize:12, padding:'9px 18px', width:'100%', justifyContent:'center' }}>
              <Users size={13} /> {teamUnlocked ? 'Open AI Team' : 'Meet AI Team'}
            </button>
          </div>
        </div>
      </div>

      <style>{`@media(max-width:768px){.dash-grid{grid-template-columns:1fr!important}}`}</style>
    </div>
  )
}
