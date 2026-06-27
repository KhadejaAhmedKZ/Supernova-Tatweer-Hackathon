import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ArrowRight, RotateCcw, Users, CheckCircle,
  Brain, MapPin, Zap, AlertTriangle, Star, Map,
} from 'lucide-react'
import { useApp } from '../context/AppContext'
import {
  getStrengthsWeaknesses, getConfidenceMeter,
  getWhyAIChose, getTodaysMission, getSuccessProbability,
} from '../data/mockData'
import ScoreCard     from '../components/ScoreCard'
import DecisionButton, { variants } from '../components/DecisionButton'
import VideoExplainer from '../components/VideoExplainer'

export default function Results() {
  const navigate = useNavigate()
  const { session, saveDecision, improveIdea, resetSession } = useApp()
  const { about, idea, resources, result, decision } = session

  const [picked, setPicked] = useState(decision || null)
  const [decisionMsg, setDecisionMsg] = useState(decision ? variants[decision]?.message : null)

  // Guard: no result yet
  if (!result) {
    return (
      <div style={{ textAlign:'center', padding:'60px 0' }} className="animate-fade-up">
        <div style={{ fontSize:56, marginBottom:16 }}>🔍</div>
        <h2 style={{ color:'#fef9ee', fontWeight:800, fontSize:22, marginBottom:8 }}>No analysis yet</h2>
        <p style={{ color:'rgba(253,230,138,0.4)', marginBottom:24, fontSize:14 }}>
          Complete the Idea Engine to see your results.
        </p>
        <button onClick={() => navigate('/start')} className="btn-primary" style={{ margin:'0 auto' }}>
          <Zap size={16} /> Start Analysis
        </button>
      </div>
    )
  }

  const sw      = getStrengthsWeaknesses(session)
  const cm      = getConfidenceMeter(session)
  const reasons = getWhyAIChose(session)
  const mission = getTodaysMission(result)
  const sp      = getSuccessProbability(session, result)

  const handleDecision = (type) => {
    setPicked(type)
    setDecisionMsg(variants[type]?.message)
    saveDecision(type)

    if (type === 'continue') {
      setTimeout(() => navigate('/dashboard'), 1400)
    }
    if (type === 'improve') {
      // Only clear result — form stays pre-filled
      improveIdea()
      setTimeout(() => navigate('/start'), 1400)
    }
    // pause and stop stay on this page with a message
  }

  const handleReset = () => {
    if (window.confirm('Start a completely new idea? Your current progress will be cleared.')) {
      resetSession()
      navigate('/start')
    }
  }

  const card = {
    background: 'rgba(6,2,24,0.88)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255,210,80,0.15)',
    borderRadius: 18,
  }

  return (
    <div style={{ maxWidth: 800, margin: '0 auto' }} className="animate-fade-up">

      {/* ── Founder Profile ─────────────────────────── */}
      <div style={{ padding:'20px 24px', borderRadius:20, marginBottom:18, display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:14, background:'linear-gradient(135deg,rgba(200,112,16,0.14),rgba(6,2,24,0.92))', border:'1px solid rgba(245,158,11,0.22)' }}>
        <div style={{ display:'flex', alignItems:'center', gap:14 }}>
          <div style={{ fontSize:40 }}>👤</div>
          <div>
            <p style={{ color:'rgba(253,230,138,0.5)', fontSize:11, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:5 }}>
              Founder Profile
            </p>
            <h2 style={{ color:'#fef9ee', fontSize:17, fontWeight:800, marginBottom:6 }}>
              {about?.name || 'Founder'}
              {about?.role ? ` · ${about.role.charAt(0).toUpperCase()+about.role.slice(1)}` : ''}
              {about?.stage ? ` · ${about.stage.charAt(0).toUpperCase()+about.stage.slice(1)} stage` : ''}
            </h2>
            <div style={{ display:'flex', flexWrap:'wrap', gap:7 }}>
              {[
                about?.location && `📍 ${about.location}`,
                resources?.budget && `💵 AED ${resources.budget}`,
                resources?.time && `⏱️ ${resources.time} hrs/week`,
                resources?.experience && `📚 ${resources.experience.charAt(0).toUpperCase()+resources.experience.slice(1)}`,
              ].filter(Boolean).map((t, i) => (
                <span key={i} style={{ fontSize:11, color:'rgba(253,230,138,0.6)', background:'rgba(255,255,255,0.05)', padding:'3px 9px', borderRadius:99, border:'1px solid rgba(255,210,80,0.1)' }}>
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
        <button onClick={handleReset} className="btn-ghost" style={{ fontSize:11, color:'rgba(253,230,138,0.25)' }}>
          <RotateCcw size={12} /> New idea
        </button>
      </div>

      {/* ── Business Summary ────────────────────────── */}
      <div style={{ ...card, padding:22, marginBottom:16 }}>
        <div>
          <p style={{ color:'#818cf8', fontSize:11, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:8, display:'flex', alignItems:'center', gap:6 }}>
            <Brain size={12} /> Business Summary
          </p>
          <p style={{ color:'#e8e0d0', fontSize:13, lineHeight:1.8 }}>{result.ideaSummary}</p>
        </div>
        <div style={{ marginTop:16, paddingTop:16, borderTop:'1px solid rgba(255,210,80,0.08)' }}>
          <p style={{ color:'#34d399', fontSize:11, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:8, display:'flex', alignItems:'center', gap:6 }}>
            <MapPin size={12} /> Community Fit — Al Qua'a
          </p>
          <p style={{ color:'#e8e0d0', fontSize:13, lineHeight:1.8 }}>{result.communityFit}</p>
        </div>
      </div>

      {/* ── Scores ──────────────────────────────────── */}
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:10, marginBottom:12 }}>
        <p className="score-label">Startup Scores</p>
        <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
          <VideoExplainer topic="readiness"    color="#f59e0b" />
          <VideoExplainer topic="riskScore"    color="#fb923c" />
          <VideoExplainer topic="communityFit" color="#a78bfa" />
        </div>
      </div>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(140px,1fr))', gap:12, marginBottom:18 }}>
        <ScoreCard label="Readiness"     score={result.readinessScore}    color="#f59e0b" />
        <ScoreCard label="Risk Score"    score={result.riskScore}         color="#fb923c" />
        <ScoreCard label="Confidence"    score={result.confidenceScore}   color="#34d399" />
        <ScoreCard label="Community Fit" score={result.communityFitScore} color="#a78bfa" />
      </div>

      {/* ── AI Confidence Meter ─────────────────────── */}
      <div style={{ ...card, padding:22, marginBottom:16 }}>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:14 }}>
          <p style={{ color:'#fde68a', fontSize:12, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.08em' }}>
            🤖 AI Confidence Meter
          </p>
          <span style={{ fontSize:20, fontWeight:900, color: cm.confidence >= 75 ? '#34d399' : cm.confidence >= 50 ? '#fbbf24' : '#fb923c' }}>
            {cm.confidence}%
          </span>
        </div>
        <div style={{ height:5, borderRadius:99, background:'rgba(255,255,255,0.06)', marginBottom:14, overflow:'hidden' }}>
          <div style={{ height:'100%', borderRadius:99, width:`${cm.confidence}%`, transition:'width 1.2s ease',
            background: cm.confidence >= 75 ? 'linear-gradient(90deg,#34d399,#4ade80)' : 'linear-gradient(90deg,#f59e0b,#fbbf24)',
            boxShadow: `0 0 10px ${cm.confidence >= 75 ? 'rgba(52,211,153,0.4)' : 'rgba(245,158,11,0.4)'}`,
          }} />
        </div>
        <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
          {cm.checks.map((c, i) => (
            <div key={i} style={{ display:'flex', alignItems:'center', gap:8, fontSize:12, color: c.passed ? '#e8e0d0' : 'rgba(253,230,138,0.25)' }}>
              <span style={{ color: c.passed ? '#34d399' : '#fb923c', fontWeight:700, flexShrink:0 }}>{c.passed ? '✓' : '✗'}</span>
              {c.label}
            </div>
          ))}
        </div>
      </div>

      {/* ── Strengths & Weaknesses ───────────────────── */}
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14, marginBottom:16 }}>
        <div style={{ padding:18, borderRadius:16, background:'rgba(52,211,153,0.06)', border:'1px solid rgba(52,211,153,0.18)' }}>
          <p style={{ color:'#34d399', fontSize:11, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:10 }}>✓ Strengths</p>
          {sw.strengths.map((s,i) => (
            <div key={i} style={{ display:'flex', gap:8, color:'#e8e0d0', fontSize:12, marginBottom:6, lineHeight:1.5 }}>
              <span style={{ color:'#34d399', flexShrink:0 }}>✦</span>{s}
            </div>
          ))}
        </div>
        <div style={{ padding:18, borderRadius:16, background:'rgba(251,146,60,0.06)', border:'1px solid rgba(251,146,60,0.18)' }}>
          <p style={{ color:'#fb923c', fontSize:11, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:10 }}>✗ Weaknesses</p>
          {sw.weaknesses.map((w,i) => (
            <div key={i} style={{ display:'flex', gap:8, color:'#e8e0d0', fontSize:12, marginBottom:6, lineHeight:1.5 }}>
              <span style={{ color:'#fb923c', flexShrink:0 }}>✦</span>{w}
            </div>
          ))}
        </div>
      </div>

      {/* ── TODAY'S MISSION ─────────────────────────── */}
      <div style={{ padding:26, borderRadius:20, marginBottom:16, background:'linear-gradient(135deg,rgba(245,158,11,0.14),rgba(6,2,24,0.92))', border:'2px solid rgba(245,158,11,0.3)', boxShadow:'0 0 40px rgba(245,158,11,0.08)' }}>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:14, flexWrap:'wrap', gap:8 }}>
          <p style={{ color:'#fbbf24', fontSize:11, fontWeight:800, textTransform:'uppercase', letterSpacing:'0.1em' }}>⚡ Today's Mission</p>
          <VideoExplainer topic="firstAction" color="#fbbf24" />
        </div>
        <p style={{ color:'#fef9ee', fontSize:19, fontWeight:800, lineHeight:1.35, marginBottom:16, letterSpacing:'-0.01em' }}>
          {result.firstAction}
        </p>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:10, marginBottom:16 }}>
          {[
            { label:'Est. Time', value:mission.time,       icon:'⏱️' },
            { label:'Difficulty', value:mission.difficulty, icon:'🎯' },
            { label:'Impact',    value:mission.impact,      icon:'💥' },
          ].map(({ label, value, icon }) => (
            <div key={label} style={{ padding:'11px 8px', borderRadius:12, background:'rgba(6,2,24,0.6)', border:'1px solid rgba(245,158,11,0.18)', textAlign:'center' }}>
              <div style={{ fontSize:15, marginBottom:3 }}>{icon}</div>
              <p style={{ color:'rgba(253,230,138,0.4)', fontSize:10, fontWeight:600, textTransform:'uppercase', marginBottom:2 }}>{label}</p>
              <p style={{ color:'#fde68a', fontSize:12, fontWeight:700 }}>{value}</p>
            </div>
          ))}
        </div>
        <div style={{ display:'flex', alignItems:'center', gap:8, padding:'9px 13px', borderRadius:11, background:'rgba(245,158,11,0.08)', border:'1px solid rgba(245,158,11,0.18)' }}>
          <Star size={13} style={{ color:'#fbbf24', flexShrink:0 }} />
          <p style={{ color:'#fde68a', fontSize:12, fontWeight:600 }}>Reward: {mission.reward}</p>
        </div>
      </div>

      {/* ── Why AI Chose This ────────────────────────── */}
      <div style={{ ...card, padding:22, marginBottom:16 }}>
        <p style={{ color:'#a78bfa', fontSize:12, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:12 }}>
          🤔 Why AI Chose This Recommendation
        </p>
        <div style={{ display:'flex', flexDirection:'column', gap:8, marginBottom:12 }}>
          {reasons.map((r,i) => (
            <div key={i} style={{ display:'flex', gap:10, color:'#e8e0d0', fontSize:13, lineHeight:1.7 }}>
              <span style={{ color:'#a78bfa', fontWeight:700, flexShrink:0 }}>•</span>{r}
            </div>
          ))}
        </div>
        <div style={{ display:'flex', alignItems:'center', gap:8, padding:'9px 13px', borderRadius:11, background:'rgba(139,92,246,0.08)', border:'1px solid rgba(139,92,246,0.2)' }}>
          <span style={{ color:'#a78bfa', fontSize:12, fontWeight:700 }}>AI Confidence:</span>
          <span style={{ color:'#fde68a', fontSize:13, fontWeight:800 }}>{cm.confidence}%</span>
        </div>
      </div>

      {/* ── Success Probability ──────────────────────── */}
      <div style={{ ...card, padding:22, marginBottom:16 }}>
        <p style={{ color:'#34d399', fontSize:12, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:14 }}>
          📈 Success Probability
        </p>
        <div style={{ display:'flex', gap:24, marginBottom:14, flexWrap:'wrap', alignItems:'center' }}>
          <div style={{ textAlign:'center' }}>
            <p style={{ color:'rgba(253,230,138,0.4)', fontSize:10, marginBottom:3, textTransform:'uppercase', fontWeight:600 }}>Current</p>
            <p style={{ color:'#fbbf24', fontSize:30, fontWeight:900 }}>{sp.current}%</p>
          </div>
          <div style={{ color:'rgba(255,255,255,0.2)', fontSize:18 }}>→</div>
          <div style={{ textAlign:'center' }}>
            <p style={{ color:'rgba(253,230,138,0.4)', fontSize:10, marginBottom:3, textTransform:'uppercase', fontWeight:600 }}>Can reach</p>
            <p style={{ color:'#34d399', fontSize:30, fontWeight:900 }}>{sp.potential}%</p>
          </div>
        </div>
        {sp.improvements.length > 0 && (
          <div>
            <p style={{ color:'rgba(253,230,138,0.4)', fontSize:11, fontWeight:600, textTransform:'uppercase', marginBottom:8 }}>If you:</p>
            {sp.improvements.map((imp,i) => (
              <div key={i} style={{ display:'flex', alignItems:'center', gap:8, fontSize:12, color:'#e8e0d0', marginBottom:6 }}>
                <span style={{ color:'#34d399' }}>✓</span>
                {imp.action}
                <span style={{ marginLeft:'auto', color:'#34d399', fontSize:11, fontWeight:700 }}>+{imp.boost}%</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── Steps ───────────────────────────────────── */}
      <div style={{ ...card, padding:22, marginBottom:16 }}>
        <p className="score-label" style={{ marginBottom:16 }}>Step-by-Step Instructions</p>
        <ol style={{ listStyle:'none', margin:0, padding:0, display:'flex', flexDirection:'column', gap:12 }}>
          {result.steps.map((step, i) => (
            <li key={i} style={{ display:'flex', gap:13, alignItems:'flex-start' }}>
              <div style={{ width:26, height:26, borderRadius:'50%', flexShrink:0, marginTop:1,
                background:'rgba(245,158,11,0.14)', border:'1px solid rgba(245,158,11,0.28)',
                display:'flex', alignItems:'center', justifyContent:'center',
                fontSize:11, fontWeight:800, color:'#f59e0b' }}>
                {i + 1}
              </div>
              <p style={{ color:'#e8e0d0', fontSize:13, lineHeight:1.8 }}>{step}</p>
            </li>
          ))}
        </ol>
      </div>

      {/* ── After action ─────────────────────────────── */}
      <div style={{ padding:18, borderRadius:16, marginBottom:16, background:'rgba(52,211,153,0.06)', border:'1px solid rgba(52,211,153,0.18)', display:'flex', gap:12 }}>
        <CheckCircle size={15} style={{ color:'#34d399', marginTop:2, flexShrink:0 }} />
        <div>
          <p style={{ color:'#34d399', fontSize:11, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:5 }}>
            After You Complete This Step
          </p>
          <p style={{ color:'#e8e0d0', fontSize:13, lineHeight:1.75 }}>{result.afterAction}</p>
        </div>
      </div>

      {/* ── Market Discovery CTA ─────────────────────── */}
      <div style={{ padding:20, borderRadius:18, marginBottom:16, background:'linear-gradient(135deg,rgba(129,140,248,0.1),rgba(6,2,24,0.9))', border:'1px solid rgba(129,140,248,0.22)', display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:14 }}>
        <div>
          <p style={{ color:'#a78bfa', fontSize:11, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:4 }}>🗺️ Market Discovery AI</p>
          <p style={{ color:'#fef9ee', fontWeight:700, fontSize:14, marginBottom:2 }}>Who else is doing this near you?</p>
          <p style={{ color:'rgba(253,230,138,0.4)', fontSize:12 }}>See competitors, gaps, and untapped opportunities in Al Qua'a.</p>
        </div>
        <button onClick={() => navigate('/market-discovery')} className="btn-primary" style={{ flexShrink:0, padding:'10px 20px', fontSize:13 }}>
          <Map size={14} /> Explore My Market <ArrowRight size={13} />
        </button>
      </div>

      {/* ── Decision Buttons ─────────────────────────── */}
      <p className="score-label" style={{ marginBottom:14 }}>What do you want to do next?</p>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(130px,1fr))', gap:12, marginBottom:16 }}>
        {['continue', 'improve', 'pause', 'stop'].map(type => (
          <DecisionButton key={type} type={type} selected={picked} onSelect={handleDecision} />
        ))}
      </div>

      {(picked || decisionMsg) && (
        <div style={{ padding:18, borderRadius:14, background:'rgba(6,2,24,0.9)', border:'1px solid rgba(255,210,80,0.15)' }} className="animate-fade-up">
          <p style={{ color:'#e8e0d0', fontSize:13, lineHeight:1.8 }}>
            <span style={{ color:'#fde68a', fontWeight:700 }}>Bedaya AI: </span>
            {decisionMsg}
          </p>
          {picked === 'continue' && (
            <button onClick={() => navigate('/dashboard')} className="btn-primary" style={{ marginTop:14 }}>
              <Users size={14} /> Go to My Dashboard <ArrowRight size={14} />
            </button>
          )}
          {picked === 'improve' && (
            <p style={{ color:'rgba(253,230,138,0.4)', fontSize:12, marginTop:8 }}>
              ↩ Sending you back to the form with your answers pre-filled...
            </p>
          )}
          {picked === 'stop' && (
            <div style={{ marginTop:12, display:'flex', gap:10 }}>
              <button onClick={() => navigate('/')} className="btn-secondary" style={{ fontSize:13, padding:'10px 18px' }}>
                Return Home
              </button>
              <button onClick={() => { resetSession(); navigate('/start') }} className="btn-ghost" style={{ fontSize:13 }}>
                Restart Journey
              </button>
            </div>
          )}
          {picked === 'pause' && (
            <div style={{ marginTop:12, display:'flex', gap:10 }}>
              <button onClick={() => navigate('/')} className="btn-secondary" style={{ fontSize:13, padding:'10px 18px' }}>
                Exit for Now
              </button>
              <p style={{ color:'rgba(253,230,138,0.4)', fontSize:12, alignSelf:'center' }}>
                Your progress is saved. Come back anytime.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
