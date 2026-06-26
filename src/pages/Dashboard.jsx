import { useNavigate } from 'react-router-dom'
import { Zap, Users, Shield, Presentation, TrendingUp, ArrowRight, RotateCcw, Activity } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { opportunities } from '../data/mockData'
import ScoreCard from '../components/ScoreCard'
import ProgressTimeline from '../components/ProgressTimeline'

const quickLinks = [
  { to:'/results',           icon:Zap,          label:'My Results',       color:'#818cf8', desc:'View your analysis' },
  { to:'/agents',            icon:Users,         label:'AI Team',          color:'#c084fc', desc:'5 expert advisors' },
  { to:'/failure-prevention',icon:Shield,        label:'Risk Check',       color:'#fb923c', desc:'Avoid mistakes' },
  { to:'/board-meeting',     icon:Presentation,  label:'Board Meeting',    color:'#34d399', desc:'Multi-agent debate' },
  { to:'/opportunities',     icon:TrendingUp,    label:'Opportunities',    color:'#fbbf24', desc:'Grants & funding' },
]

export default function Dashboard() {
  const navigate = useNavigate()
  const { session, resetSession } = useApp()
  const { about, idea, result, decision, teamUnlocked, completedStages, boardHistory, riskHistory } = session

  if (!result) return (
    <div className="animate-fade-up" style={{ textAlign:'center', padding:'60px 0' }}>
      <div style={{ fontSize:64, marginBottom:20, animation:'floatY 4s ease-in-out infinite', display:'inline-block' }}>🌟</div>
      <h2 style={{ color:'white', fontSize:24, fontWeight:800, marginBottom:12 }}>Start your journey</h2>
      <p style={{ color:'#64748b', fontSize:15, maxWidth:380, margin:'0 auto 28px', lineHeight:1.7 }}>
        Complete the Idea Engine to unlock your personal business dashboard.
      </p>
      <button onClick={() => navigate('/welcome')} className="btn-primary" style={{ margin:'0 auto' }}>
        <Zap size={16} /> Begin My Journey <ArrowRight size={16} />
      </button>
    </div>
  )

  const statusColor = decision === 'continue' ? '#34d399' : decision === 'pause' ? '#fbbf24' : decision === 'stop' ? '#fb923c' : '#818cf8'
  const statusLabel = decision === 'continue' ? 'In Progress' : decision === 'pause' ? 'Paused' : decision === 'stop' ? 'Stopped' : 'Ready'

  return (
    <div className="animate-fade-up" style={{ display:'flex', flexDirection:'column', gap:20 }}>

      {/* Welcome banner */}
      <div style={{ padding:'24px 28px', borderRadius:20, background:'linear-gradient(135deg, rgba(124,58,237,0.14), rgba(79,70,229,0.08))', border:'1px solid rgba(139,92,246,0.2)', display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:16 }}>
        <div>
          <p style={{ color:'#a78bfa', fontSize:12, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:6 }}>Business Dashboard</p>
          <h1 style={{ color:'white', fontSize:22, fontWeight:800, marginBottom:4, letterSpacing:'-0.02em' }}>
            Welcome back{about?.name ? `, ${about.name}` : ''} 👋
          </h1>
          <p style={{ color:'#64748b', fontSize:13 }}>
            Working on: <span style={{ color:'#cbd5e1', fontWeight:600 }}>{idea?.idea?.slice(0,60)}{idea?.idea?.length > 60 ? '...' : ''}</span>
          </p>
        </div>
        <div style={{ display:'flex', gap:10, alignItems:'center', flexWrap:'wrap' }}>
          <span style={{ padding:'6px 14px', borderRadius:99, fontSize:12, fontWeight:700, background:`${statusColor}15`, color:statusColor, border:`1px solid ${statusColor}25` }}>
            ● {statusLabel}
          </span>
          <button onClick={() => { if (confirm('Reset and start a new idea?')) resetSession(); navigate('/welcome') }} className="btn-ghost" style={{ fontSize:12, color:'#334155' }}>
            <RotateCcw size={12} /> New idea
          </button>
        </div>
      </div>

      {/* Main grid */}
      <div style={{ display:'grid', gridTemplateColumns:'1fr 300px', gap:20 }} className="dashboard-grid">

        {/* Left column */}
        <div style={{ display:'flex', flexDirection:'column', gap:20 }}>

          {/* Scores */}
          <div className="glass" style={{ padding:24 }}>
            <p style={{ color:'#475569', fontSize:11, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:16 }}>Business Scores</p>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:12 }}>
              <ScoreCard label="Readiness"     score={result.readinessScore}    color="#818cf8" />
              <ScoreCard label="Confidence"    score={result.confidenceScore}   color="#34d399" />
              <ScoreCard label="Risk Level"    score={result.riskScore}         color="#fb923c" />
              <ScoreCard label="Community Fit" score={result.communityFitScore} color="#c084fc" />
            </div>
          </div>

          {/* First action */}
          <div style={{ padding:22, borderRadius:18, background:'linear-gradient(135deg, rgba(99,102,241,0.1), rgba(124,58,237,0.07))', border:'1px solid rgba(139,92,246,0.22)' }}>
            <p style={{ color:'#a78bfa', fontSize:11, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:10 }}>⚡ Current First Action</p>
            <p style={{ color:'white', fontSize:15, fontWeight:700, lineHeight:1.5, marginBottom:16 }}>{result.firstAction}</p>
            <button onClick={() => navigate('/results')} className="btn-primary" style={{ fontSize:13, padding:'10px 20px' }}>
              View Full Analysis <ArrowRight size={14} />
            </button>
          </div>

          {/* Recent AI Advice */}
          {(boardHistory.length > 0 || riskHistory.length > 0) && (
            <div className="glass" style={{ padding:22 }}>
              <p style={{ color:'#475569', fontSize:11, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:16 }}>Recent AI Advice</p>
              <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
                {riskHistory.slice(0,2).map((r,i) => (
                  <div key={i} style={{ padding:'12px 14px', borderRadius:12, background:'rgba(251,146,60,0.07)', border:'1px solid rgba(251,146,60,0.15)' }}>
                    <p style={{ color:'#fdba74', fontSize:11, fontWeight:700, marginBottom:4 }}>🛡️ Risk Check</p>
                    <p style={{ color:'#94a3b8', fontSize:12, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{r.decision}</p>
                    <p style={{ color:r.analysis.riskLevel==='High'?'#fb923c':r.analysis.riskLevel==='Medium'?'#fbbf24':'#34d399', fontSize:11, fontWeight:600, marginTop:4 }}>{r.analysis.riskLevel} Risk</p>
                  </div>
                ))}
                {boardHistory.slice(0,1).map((b,i) => (
                  <div key={i} style={{ padding:'12px 14px', borderRadius:12, background:'rgba(52,211,153,0.07)', border:'1px solid rgba(52,211,153,0.15)' }}>
                    <p style={{ color:'#6ee7b7', fontSize:11, fontWeight:700, marginBottom:4 }}>🏛️ Board Meeting</p>
                    <p style={{ color:'#94a3b8', fontSize:12, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{b.pitch}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Recommended opportunity */}
          <div className="glass" style={{ padding:22 }}>
            <p style={{ color:'#475569', fontSize:11, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:14 }}>Recommended Opportunity</p>
            <div style={{ display:'flex', gap:14, alignItems:'flex-start' }}>
              <div style={{ width:44, height:44, borderRadius:14, background:`${opportunities[0].color}18`, border:`1px solid ${opportunities[0].color}20`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:22, flexShrink:0 }}>
                {opportunities[0].emoji}
              </div>
              <div>
                <p style={{ color:'white', fontWeight:700, fontSize:14, marginBottom:4 }}>{opportunities[0].title}</p>
                <p style={{ color:'#64748b', fontSize:12, lineHeight:1.6, marginBottom:10 }}>{opportunities[0].whyItHelps}</p>
                <button onClick={() => navigate('/opportunities')} className="btn-ghost" style={{ fontSize:12, color:'#818cf8', padding:'0' }}>
                  View all opportunities <ArrowRight size={12} style={{ display:'inline' }} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right column — Timeline + quick links */}
        <div style={{ display:'flex', flexDirection:'column', gap:20 }}>
          {/* Progress Timeline */}
          <div className="glass" style={{ padding:24 }}>
            <p style={{ color:'#475569', fontSize:11, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:20 }}>Progress Timeline</p>
            <ProgressTimeline completedStages={completedStages} />
          </div>

          {/* Quick links */}
          <div className="glass" style={{ padding:22 }}>
            <p style={{ color:'#475569', fontSize:11, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:14 }}>Quick Access</p>
            <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
              {quickLinks.map(({ to, icon:Icon, label, color, desc }) => (
                <button key={to} onClick={() => navigate(to)}
                  style={{ display:'flex', alignItems:'center', gap:12, padding:'12px 14px', borderRadius:14, background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.06)', cursor:'pointer', textAlign:'left', transition:'all 0.2s' }}
                  onMouseEnter={e => { e.currentTarget.style.background=`${color}0c`; e.currentTarget.style.borderColor=`${color}25` }}
                  onMouseLeave={e => { e.currentTarget.style.background='rgba(255,255,255,0.03)'; e.currentTarget.style.borderColor='rgba(255,255,255,0.06)' }}>
                  <div style={{ width:34, height:34, borderRadius:10, background:`${color}18`, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                    <Icon size={15} style={{ color }} />
                  </div>
                  <div>
                    <p style={{ color:'white', fontWeight:600, fontSize:13 }}>{label}</p>
                    <p style={{ color:'#475569', fontSize:11 }}>{desc}</p>
                  </div>
                  <ArrowRight size={13} style={{ color:'#334155', marginLeft:'auto' }} />
                </button>
              ))}
            </div>
          </div>

          {/* Continue journey */}
          <div style={{ padding:20, borderRadius:18, background:'linear-gradient(135deg, rgba(52,211,153,0.08), rgba(16,185,129,0.05))', border:'1px solid rgba(52,211,153,0.15)', textAlign:'center' }}>
            <div style={{ fontSize:28, marginBottom:10 }}>🚀</div>
            <p style={{ color:'#6ee7b7', fontSize:13, fontWeight:700, marginBottom:8 }}>Continue Building</p>
            <button onClick={() => navigate('/agents')} className="btn-primary" style={{ fontSize:12, padding:'10px 20px', width:'100%', justifyContent:'center' }}>
              Talk to AI Team
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .dashboard-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  )
}
