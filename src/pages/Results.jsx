import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, RotateCcw, Users, CheckCircle, Target, Brain, MapPin, Zap, AlertTriangle, TrendingUp, Clock, Star } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { getStrengthsWeaknesses, getConfidenceMeter, getWhyAIChose, getTodaysMission, getSuccessProbability } from '../data/mockData'
import ScoreCard from '../components/ScoreCard'
import DecisionButton, { variants } from '../components/DecisionButton'

const stageLabel = {
  idea:'Just an idea', testing:'Testing', selling:'Selling', customers:'Has customers', registered:'Registered', growing:'Growing'
}
const roleLabel = {
  student:'Student', housewife:'Housewife', retired:'Retired', farmer:'Farmer', freelancer:'Freelancer', employee:'Employee', unemployed:'Job seeker'
}

export default function Results() {
  const navigate = useNavigate()
  const { session, saveDecision, resetSession } = useApp()
  const { about, idea, resources, result, decision } = session
  const [picked, setPicked] = useState(decision || null)

  if (!result) return (
    <div style={{ textAlign:'center', padding:'60px 0' }}>
      <div style={{ fontSize:48, marginBottom:16 }}>🔍</div>
      <h2 style={{ color:'#fef9ee', fontWeight:700, marginBottom:8 }}>No analysis yet</h2>
      <p style={{ color:'rgba(253,230,138,0.4)', marginBottom:24 }}>Complete the onboarding to see your results.</p>
      <button onClick={() => navigate('/start')} className="btn-primary" style={{ margin:'0 auto' }}>
        <Zap size={16} /> Start Analysis
      </button>
    </div>
  )

  const sw      = getStrengthsWeaknesses(session)
  const cm      = getConfidenceMeter(session)
  const reasons = getWhyAIChose(session)
  const mission = getTodaysMission(result)
  const sp      = getSuccessProbability(session, result)

  const handleDecision = (type) => {
    setPicked(type); saveDecision(type)
    if (type === 'continue') setTimeout(() => navigate('/dashboard'), 1400)
    if (type === 'improve')  setTimeout(() => { resetSession(); navigate('/start') }, 1400)
    if (type === 'pause')    setTimeout(() => navigate('/'), 1400)
    if (type === 'stop')     setTimeout(() => navigate('/'), 1400)
  }

  const card = { background:'rgba(6,2,24,0.88)', backdropFilter:'blur(20px)', border:'1px solid rgba(255,210,80,0.15)', borderRadius:18 }

  return (
    <div style={{ maxWidth:800, margin:'0 auto' }} className="animate-fade-up">

      {/* ── Founder Profile Banner ─────────────── */}
      <div style={{ padding:'22px 26px', borderRadius:20, marginBottom:20, display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:14, background:'linear-gradient(135deg,rgba(200,112,16,0.15),rgba(6,2,24,0.9))', border:'1px solid rgba(245,158,11,0.25)' }}>
        <div style={{ display:'flex', alignItems:'center', gap:14 }}>
          <div style={{ fontSize:42 }}>👤</div>
          <div>
            <p style={{ color:'rgba(253,230,138,0.5)', fontSize:11, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:5 }}>Founder Profile</p>
            <h2 style={{ color:'#fef9ee', fontSize:18, fontWeight:800, marginBottom:6 }}>
              {about?.name || 'Founder'}{about?.role ? ` · ${roleLabel[about.role] || about.role}` : ''}
            </h2>
            <div style={{ display:'flex', flexWrap:'wrap', gap:8 }}>
              {[
                about?.stage && `📊 ${stageLabel[about.stage] || about.stage}`,
                about?.location && `📍 ${about.location}`,
                resources?.budget && `💵 AED ${resources.budget}`,
                resources?.experience && `📚 ${resources.experience.charAt(0).toUpperCase()+resources.experience.slice(1)}`,
              ].filter(Boolean).map((t,i) => (
                <span key={i} style={{ fontSize:11, color:'rgba(253,230,138,0.6)', background:'rgba(255,255,255,0.06)', padding:'3px 10px', borderRadius:99, border:'1px solid rgba(255,210,80,0.12)' }}>{t}</span>
              ))}
            </div>
          </div>
        </div>
        <button onClick={() => { resetSession(); navigate('/start') }} className="btn-ghost" style={{ fontSize:11, color:'rgba(253,230,138,0.3)' }}>
          <RotateCcw size={12} /> New idea
        </button>
      </div>

      {/* ── AI Summary ─────────────────────────── */}
      <div style={{ ...card, padding:22, marginBottom:16 }}>
        {[
          { icon:Brain,  color:'#818cf8', label:'Business Summary',         text:result.ideaSummary   },
          { icon:MapPin, color:'#34d399', label:"Community Fit – Al Qua'a", text:result.communityFit  },
        ].map(({ icon:Icon, color, label, text }, i) => (
          <div key={label} style={ i>0 ? { marginTop:16, paddingTop:16, borderTop:'1px solid rgba(255,210,80,0.08)' } : {}}>
            <p style={{ color, fontSize:11, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:8, display:'flex', alignItems:'center', gap:6 }}>
              <Icon size={12} /> {label}
            </p>
            <p style={{ color:'#e8e0d0', fontSize:13, lineHeight:1.8 }}>{text}</p>
          </div>
        ))}
      </div>

      {/* ── Scores ─────────────────────────────── */}
      <p className="score-label" style={{ marginBottom:12 }}>Startup Scores</p>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(140px,1fr))', gap:12, marginBottom:20 }}>
        <ScoreCard label="Readiness"     score={result.readinessScore}    color="#f59e0b" />
        <ScoreCard label="Risk Score"    score={result.riskScore}         color="#fb923c" />
        <ScoreCard label="Confidence"    score={result.confidenceScore}   color="#34d399" />
        <ScoreCard label="Community Fit" score={result.communityFitScore} color="#a78bfa" />
      </div>

      {/* ── AI Confidence Meter ─────────────────── */}
      <div style={{ ...card, padding:22, marginBottom:16 }}>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:16 }}>
          <p style={{ color:'#fde68a', fontSize:12, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.08em' }}>🤖 AI Confidence Meter</p>
          <span style={{ fontSize:22, fontWeight:900, color: cm.confidence >= 75 ? '#34d399' : cm.confidence >= 50 ? '#fbbf24' : '#fb923c' }}>{cm.confidence}%</span>
        </div>
        <div style={{ height:6, borderRadius:99, background:'rgba(255,255,255,0.06)', marginBottom:14, overflow:'hidden' }}>
          <div style={{ height:'100%', borderRadius:99, width:`${cm.confidence}%`, background:`linear-gradient(90deg, ${cm.confidence>=75?'#34d399':'#fbbf24'}, ${cm.confidence>=75?'#4ade80':'#f59e0b'})`, transition:'width 1.2s ease', boxShadow:`0 0 10px ${cm.confidence>=75?'rgba(52,211,153,0.5)':'rgba(245,158,11,0.4)'}` }} />
        </div>
        <div style={{ display:'flex', flexDirection:'column', gap:7 }}>
          {cm.checks.map((c,i) => (
            <div key={i} style={{ display:'flex', alignItems:'center', gap:8, fontSize:12, color: c.passed ? '#e8e0d0' : 'rgba(253,230,138,0.3)' }}>
              <span style={{ color: c.passed ? '#34d399' : '#fb923c', flexShrink:0 }}>{c.passed ? '✓' : '✗'}</span>
              {c.label}
            </div>
          ))}
        </div>
      </div>

      {/* ── Strengths & Weaknesses ───────────────── */}
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14, marginBottom:16 }}>
        {[
          { label:'Strengths', items:sw.strengths, color:'#34d399', bg:'rgba(52,211,153,0.07)', border:'rgba(52,211,153,0.2)', icon:'✓' },
          { label:'Weaknesses', items:sw.weaknesses, color:'#fb923c', bg:'rgba(251,146,60,0.07)', border:'rgba(251,146,60,0.2)', icon:'✗' },
        ].map(({ label, items, color, bg, border, icon }) => (
          <div key={label} style={{ padding:18, borderRadius:16, background:bg, border:`1px solid ${border}` }}>
            <p style={{ color, fontSize:11, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:10 }}>{icon} {label}</p>
            {items.map((s,i) => (
              <div key={i} style={{ display:'flex', gap:8, color:'#e8e0d0', fontSize:12, marginBottom:7 }}>
                <span style={{ color, flexShrink:0, marginTop:1 }}>✦</span>{s}
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* ── TODAY'S MISSION ──────────────────────── */}
      <div style={{ padding:24, borderRadius:20, marginBottom:16, background:'linear-gradient(135deg,rgba(245,158,11,0.15),rgba(200,112,16,0.1))', border:'2px solid rgba(245,158,11,0.35)', boxShadow:'0 0 40px rgba(245,158,11,0.1)' }}>
        <p style={{ color:'#fbbf24', fontSize:11, fontWeight:800, textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:12 }}>⚡ Today's Mission</p>
        <p style={{ color:'#fef9ee', fontSize:20, fontWeight:800, lineHeight:1.3, marginBottom:18, letterSpacing:'-0.01em' }}>{mission.mission}</p>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:10, marginBottom:18 }}>
          {[
            { label:'Est. Time', value:mission.time,       icon:'⏱️' },
            { label:'Difficulty', value:mission.difficulty, icon:'🎯' },
            { label:'Impact',    value:mission.impact,      icon:'💥' },
          ].map(({ label, value, icon }) => (
            <div key={label} style={{ padding:'12px 10px', borderRadius:12, background:'rgba(6,2,24,0.6)', border:'1px solid rgba(245,158,11,0.2)', textAlign:'center' }}>
              <div style={{ fontSize:16, marginBottom:4 }}>{icon}</div>
              <p style={{ color:'rgba(253,230,138,0.45)', fontSize:10, fontWeight:600, textTransform:'uppercase', marginBottom:3 }}>{label}</p>
              <p style={{ color:'#fde68a', fontSize:13, fontWeight:700 }}>{value}</p>
            </div>
          ))}
        </div>
        <div style={{ padding:'10px 14px', borderRadius:12, background:'rgba(245,158,11,0.1)', border:'1px solid rgba(245,158,11,0.2)', display:'flex', alignItems:'center', gap:8 }}>
          <Star size={14} style={{ color:'#fbbf24', flexShrink:0 }} />
          <p style={{ color:'#fde68a', fontSize:12, fontWeight:600 }}>Reward: {mission.reward}</p>
        </div>
      </div>

      {/* ── Why AI Chose This ────────────────────── */}
      <div style={{ ...card, padding:22, marginBottom:16 }}>
        <p style={{ color:'#a78bfa', fontSize:12, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:14 }}>🤔 Why AI Chose This Recommendation</p>
        <div style={{ display:'flex', flexDirection:'column', gap:8, marginBottom:14 }}>
          {reasons.map((r,i) => (
            <div key={i} style={{ display:'flex', gap:10, color:'#e8e0d0', fontSize:13, lineHeight:1.6 }}>
              <span style={{ color:'#a78bfa', fontWeight:700, flexShrink:0 }}>•</span>{r}
            </div>
          ))}
        </div>
        <div style={{ display:'flex', alignItems:'center', gap:8, padding:'10px 14px', borderRadius:12, background:'rgba(139,92,246,0.08)', border:'1px solid rgba(139,92,246,0.2)' }}>
          <span style={{ color:'#a78bfa', fontSize:13, fontWeight:700 }}>AI Confidence:</span>
          <span style={{ color:'#fde68a', fontSize:13, fontWeight:800 }}>{cm.confidence}%</span>
        </div>
      </div>

      {/* ── Success Probability ──────────────────── */}
      <div style={{ ...card, padding:22, marginBottom:16 }}>
        <p style={{ color:'#34d399', fontSize:12, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:14 }}>📈 Success Probability</p>
        <div style={{ display:'flex', gap:24, marginBottom:16, flexWrap:'wrap' }}>
          <div style={{ textAlign:'center' }}>
            <p style={{ color:'rgba(253,230,138,0.4)', fontSize:11, marginBottom:4 }}>Current</p>
            <p style={{ color:'#fbbf24', fontSize:32, fontWeight:900 }}>{sp.current}%</p>
          </div>
          <div style={{ display:'flex', alignItems:'center', color:'rgba(255,255,255,0.2)', fontSize:20 }}>→</div>
          <div style={{ textAlign:'center' }}>
            <p style={{ color:'rgba(253,230,138,0.4)', fontSize:11, marginBottom:4 }}>Can reach</p>
            <p style={{ color:'#34d399', fontSize:32, fontWeight:900 }}>{sp.potential}%</p>
          </div>
        </div>
        {sp.improvements.length > 0 && (
          <div>
            <p style={{ color:'rgba(253,230,138,0.4)', fontSize:11, fontWeight:600, textTransform:'uppercase', marginBottom:8 }}>If you:</p>
            {sp.improvements.map((imp,i) => (
              <div key={i} style={{ display:'flex', alignItems:'center', gap:8, fontSize:13, color:'#e8e0d0', marginBottom:6 }}>
                <span style={{ color:'#34d399' }}>✓</span> {imp.action}
                <span style={{ marginLeft:'auto', color:'#34d399', fontSize:12, fontWeight:700 }}>+{imp.boost}%</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── Step by step ─────────────────────────── */}
      <div style={{ ...card, padding:22, marginBottom:16 }}>
        <p className="score-label" style={{ marginBottom:16 }}>Step-by-Step Instructions</p>
        <ol style={{ listStyle:'none', margin:0, padding:0, display:'flex', flexDirection:'column', gap:12 }}>
          {result.steps.map((step, i) => (
            <li key={i} style={{ display:'flex', gap:14, alignItems:'flex-start' }}>
              <div style={{ width:26, height:26, borderRadius:'50%', background:'rgba(245,158,11,0.15)', border:'1px solid rgba(245,158,11,0.3)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:11, fontWeight:800, color:'#f59e0b', flexShrink:0, marginTop:2 }}>{i+1}</div>
              <p style={{ color:'#e8e0d0', fontSize:13, lineHeight:1.75 }}>{step}</p>
            </li>
          ))}
        </ol>
      </div>

      {/* ── After action ─────────────────────────── */}
      <div style={{ padding:18, borderRadius:16, marginBottom:24, background:'rgba(52,211,153,0.07)', border:'1px solid rgba(52,211,153,0.2)', display:'flex', gap:12 }}>
        <CheckCircle size={16} style={{ color:'#34d399', marginTop:2, flexShrink:0 }} />
        <div>
          <p style={{ color:'#34d399', fontSize:11, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:6 }}>After You Complete This Step</p>
          <p style={{ color:'#e8e0d0', fontSize:13, lineHeight:1.75 }}>{result.afterAction}</p>
        </div>
      </div>

      {/* ── Explore Market CTA ──────────────────── */}
      <div style={{ padding:22, borderRadius:18, marginBottom:16, background:'linear-gradient(135deg,rgba(129,140,248,0.1),rgba(6,2,24,0.9))', border:'1px solid rgba(129,140,248,0.25)', display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:14 }}>
        <div>
          <p style={{ color:'#a78bfa', fontSize:12, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:5 }}>🗺️ Market Discovery AI</p>
          <p style={{ color:'#fef9ee', fontWeight:700, fontSize:15, marginBottom:3 }}>Who else is doing this near you?</p>
          <p style={{ color:'rgba(253,230,138,0.4)', fontSize:12 }}>See competitors, gaps, and untapped opportunities in Al Qua'a.</p>
        </div>
        <button onClick={() => navigate('/market-discovery')} className="btn-primary" style={{ flexShrink:0, padding:'11px 22px', fontSize:13 }}>
          Explore My Market <ArrowRight size={14} />
        </button>
      </div>

      {/* ── Decision buttons ─────────────────────── */}
      <p className="score-label" style={{ marginBottom:14 }}>What do you want to do next?</p>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(130px,1fr))', gap:12, marginBottom:16 }}>
        {['continue','improve','pause','stop'].map(type => (
          <DecisionButton key={type} type={type} selected={picked} onSelect={handleDecision} />
        ))}
      </div>
      {picked && (
        <div style={{ padding:18, borderRadius:14, background:'rgba(6,2,24,0.9)', border:'1px solid rgba(255,210,80,0.15)' }} className="animate-fade-up">
          <p style={{ color:'#e8e0d0', fontSize:13, lineHeight:1.75 }}>
            <span style={{ color:'#fde68a', fontWeight:700 }}>Bedaya AI: </span>{variants[picked].message}
          </p>
          {picked === 'continue' && (
            <button onClick={() => navigate('/dashboard')} className="btn-primary" style={{ marginTop:14 }}>
              <Users size={14} /> Go to My Dashboard <ArrowRight size={14} />
            </button>
          )}
        </div>
      )}
    </div>
  )
}
