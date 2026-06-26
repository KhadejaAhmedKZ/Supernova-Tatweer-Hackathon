import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, RotateCcw, Users, CheckCircle, Target, Brain, MapPin, Zap, TrendingUp, AlertTriangle } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { getStrengthsWeaknesses } from '../data/mockData'
import ScoreCard from '../components/ScoreCard'
import DecisionButton, { variants } from '../components/DecisionButton'

export default function Results() {
  const navigate = useNavigate()
  const { session, saveDecision, resetSession } = useApp()
  const { about, idea, resources, result, decision } = session

  const [picked, setPicked] = useState(decision || null)

  if (!result) {
    return (
      <div style={{ textAlign:'center', padding:'60px 0' }}>
        <div style={{ fontSize:48, marginBottom:16 }}>🔍</div>
        <h2 style={{ color:'white', fontWeight:700, marginBottom:8 }}>No analysis yet</h2>
        <p style={{ color:'#64748b', marginBottom:24 }}>Complete the onboarding first to see your results.</p>
        <button onClick={() => navigate('/start')} className="btn-primary" style={{ margin:'0 auto' }}>
          <Zap size={16} /> Start Analysis
        </button>
      </div>
    )
  }

  const sw = getStrengthsWeaknesses(session)

  const handleDecision = (type) => {
    setPicked(type)
    saveDecision(type)
    if (type === 'continue') setTimeout(() => navigate('/dashboard'), 1400)
    if (type === 'improve')  setTimeout(() => { resetSession(); navigate('/start') }, 1400)
    if (type === 'pause')    setTimeout(() => navigate('/'), 1400)
    if (type === 'stop')     setTimeout(() => navigate('/'), 1400)
  }

  return (
    <div style={{ maxWidth:780, margin:'0 auto' }} className="animate-fade-up">

      {/* Founder profile banner */}
      <div style={{ padding:'24px 28px', borderRadius:20, marginBottom:24, display:'flex', flexWrap:'wrap', gap:20, alignItems:'center', background:'linear-gradient(135deg, rgba(124,58,237,0.12), rgba(79,70,229,0.08))', border:'1px solid rgba(139,92,246,0.2)' }}>
        <div style={{ fontSize:48 }}>👤</div>
        <div style={{ flex:1 }}>
          <p style={{ color:'#a78bfa', fontSize:12, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:6 }}>Founder Profile</p>
          <h2 style={{ color:'white', fontSize:20, fontWeight:800, marginBottom:4 }}>
            {about?.name || 'Founder'} · {resources?.experience === 'beginner' ? '🌱 Beginner' : resources?.experience === 'some' ? '🌿 Some Experience' : '🌳 Experienced'}
          </h2>
          <div style={{ display:'flex', flexWrap:'wrap', gap:12 }}>
            {[
              about?.location && `📍 ${about.location}`,
              resources?.budget && `💵 AED ${resources.budget} budget`,
              resources?.time && `⏱️ ${resources.time} hrs/week`,
              idea?.type && `📦 ${idea.type.charAt(0).toUpperCase()+idea.type.slice(1)}`,
            ].filter(Boolean).map((item, i) => (
              <span key={i} style={{ fontSize:12, color:'#94a3b8', background:'rgba(255,255,255,0.06)', padding:'4px 10px', borderRadius:99 }}>{item}</span>
            ))}
          </div>
        </div>
        <button onClick={() => { resetSession(); navigate('/start') }} className="btn-ghost" style={{ fontSize:12, color:'#475569' }}>
          <RotateCcw size={13} /> New idea
        </button>
      </div>

      {/* AI Summary */}
      <div className="glass" style={{ padding:24, marginBottom:20 }}>
        <p style={{ color:'#818cf8', fontSize:12, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:12, display:'flex', alignItems:'center', gap:6 }}>
          <Brain size={13} /> Business Summary
        </p>
        <p style={{ color:'#cbd5e1', lineHeight:1.8, fontSize:14 }}>{result.ideaSummary}</p>
        <div style={{ marginTop:16, paddingTop:16, borderTop:'1px solid rgba(255,255,255,0.06)' }}>
          <p style={{ color:'#34d399', fontSize:12, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:8, display:'flex', alignItems:'center', gap:6 }}>
            <MapPin size={12} /> Community Fit – Al Qua'a
          </p>
          <p style={{ color:'#94a3b8', lineHeight:1.8, fontSize:13 }}>{result.communityFit}</p>
        </div>
      </div>

      {/* Scores */}
      <p style={{ color:'#475569', fontSize:11, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:12 }}>Your Startup Scores</p>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(140px,1fr))', gap:12, marginBottom:20 }}>
        <ScoreCard label="Business Readiness" score={result.readinessScore}    color="#818cf8" />
        <ScoreCard label="Risk Score"          score={result.riskScore}         color="#fb923c" />
        <ScoreCard label="Confidence"          score={result.confidenceScore}   color="#34d399" />
        <ScoreCard label="Community Fit"       score={result.communityFitScore} color="#c084fc" />
      </div>

      {/* Strengths & Weaknesses */}
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16, marginBottom:20 }}>
        <div style={{ padding:20, borderRadius:18, background:'rgba(52,211,153,0.06)', border:'1px solid rgba(52,211,153,0.15)' }}>
          <p style={{ color:'#34d399', fontSize:12, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:12, display:'flex', alignItems:'center', gap:6 }}>
            <CheckCircle size={13} /> Strengths
          </p>
          <ul style={{ listStyle:'none', margin:0, padding:0, display:'flex', flexDirection:'column', gap:8 }}>
            {sw.strengths.map((s,i) => (
              <li key={i} style={{ display:'flex', alignItems:'flex-start', gap:8, color:'#cbd5e1', fontSize:13 }}>
                <span style={{ color:'#34d399', marginTop:2 }}>✦</span>{s}
              </li>
            ))}
          </ul>
        </div>
        <div style={{ padding:20, borderRadius:18, background:'rgba(251,146,60,0.06)', border:'1px solid rgba(251,146,60,0.15)' }}>
          <p style={{ color:'#fb923c', fontSize:12, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:12, display:'flex', alignItems:'center', gap:6 }}>
            <AlertTriangle size={13} /> Weaknesses
          </p>
          <ul style={{ listStyle:'none', margin:0, padding:0, display:'flex', flexDirection:'column', gap:8 }}>
            {sw.weaknesses.map((w,i) => (
              <li key={i} style={{ display:'flex', alignItems:'flex-start', gap:8, color:'#cbd5e1', fontSize:13 }}>
                <span style={{ color:'#fb923c', marginTop:2 }}>✦</span>{w}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* FIRST ACTION */}
      <div style={{ padding:28, borderRadius:20, marginBottom:20, background:'linear-gradient(135deg, rgba(99,102,241,0.14), rgba(124,58,237,0.1))', border:'2px solid rgba(139,92,246,0.3)', boxShadow:'0 0 40px rgba(139,92,246,0.1)' }}>
        <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:16 }}>
          <div style={{ width:32, height:32, borderRadius:10, background:'rgba(139,92,246,0.3)', display:'flex', alignItems:'center', justifyContent:'center' }}>
            <Zap size={16} style={{ color:'#a78bfa' }} />
          </div>
          <p style={{ color:'#a78bfa', fontSize:12, fontWeight:800, textTransform:'uppercase', letterSpacing:'0.1em' }}>Your #1 First Action</p>
        </div>
        <p style={{ color:'white', fontSize:20, fontWeight:800, lineHeight:1.3, letterSpacing:'-0.01em', marginBottom:16 }}>
          {result.firstAction}
        </p>
        <div style={{ background:'rgba(255,255,255,0.05)', borderRadius:14, padding:16, marginBottom:16 }}>
          <p style={{ color:'#94a3b8', fontSize:13, lineHeight:1.7 }}>
            <span style={{ color:'white', fontWeight:600 }}>Why this matters: </span>{result.whyItMatters}
          </p>
        </div>
        <ol style={{ listStyle:'none', margin:0, padding:0, display:'flex', flexDirection:'column', gap:10 }}>
          {result.steps.map((step, i) => (
            <li key={i} style={{ display:'flex', alignItems:'flex-start', gap:12 }}>
              <div style={{ width:26, height:26, borderRadius:'50%', background:'rgba(139,92,246,0.2)', border:'1px solid rgba(139,92,246,0.3)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:11, fontWeight:700, color:'#a78bfa', flexShrink:0, marginTop:2 }}>
                {i+1}
              </div>
              <p style={{ color:'#cbd5e1', fontSize:13, lineHeight:1.7 }}>{step}</p>
            </li>
          ))}
        </ol>
      </div>

      {/* After action */}
      <div style={{ padding:18, borderRadius:16, marginBottom:28, background:'rgba(52,211,153,0.06)', border:'1px solid rgba(52,211,153,0.18)', display:'flex', alignItems:'flex-start', gap:12 }}>
        <CheckCircle size={16} style={{ color:'#34d399', marginTop:2, flexShrink:0 }} />
        <div>
          <p style={{ color:'#34d399', fontSize:11, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:6 }}>After You Complete This Step</p>
          <p style={{ color:'#cbd5e1', fontSize:13, lineHeight:1.7 }}>{result.afterAction}</p>
        </div>
      </div>

      {/* Decision buttons */}
      <p style={{ color:'#475569', fontSize:11, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:14 }}>What do you want to do next?</p>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(130px,1fr))', gap:12, marginBottom:20 }}>
        {['continue','improve','pause','stop'].map(type => (
          <DecisionButton key={type} type={type} selected={picked} onSelect={handleDecision} />
        ))}
      </div>

      {picked && (
        <div style={{ padding:18, borderRadius:16, background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)' }} className="animate-fade-up">
          <p style={{ color:'#94a3b8', fontSize:13, lineHeight:1.7 }}>
            <span style={{ color:'white', fontWeight:600 }}>Bedaya AI: </span>{variants[picked].message}
          </p>
          {picked === 'continue' && (
            <button onClick={() => navigate('/dashboard')} className="btn-primary" style={{ marginTop:16 }}>
              <Users size={15} /> Go to My Dashboard <ArrowRight size={15} />
            </button>
          )}
        </div>
      )}
    </div>
  )
}
