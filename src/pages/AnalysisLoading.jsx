import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { getFirstActionResult } from '../data/mockData'

const steps = [
  { label: 'Understanding your idea...',         emoji: '💡', dur: 900  },
  { label: 'Checking market potential...',        emoji: '📊', dur: 900  },
  { label: 'Building founder profile...',         emoji: '👤', dur: 800  },
  { label: 'Assessing business readiness...',     emoji: '🎯', dur: 900  },
  { label: 'Consulting AI specialists...',        emoji: '🤖', dur: 1000 },
  { label: 'Generating your first action...',     emoji: '⚡', dur: 700  },
]

export default function AnalysisLoading() {
  const navigate = useNavigate()
  const { session, saveResult, fullForm } = useApp()
  const [current, setCurrent] = useState(0)
  const [done, setDone] = useState([])

  useEffect(() => {
    // If already has result, redirect immediately
    if (session.result) { navigate('/results', { replace:true }); return }
    if (!session.idea && !session.about) { navigate('/start', { replace:true }); return }

    let idx = 0
    const tick = () => {
      if (idx >= steps.length) {
        const result = getFirstActionResult(fullForm)
        saveResult(result)
        setTimeout(() => navigate('/results', { replace:true }), 400)
        return
      }
      setCurrent(idx)
      setTimeout(() => {
        setDone(d => [...d, idx])
        idx++
        setTimeout(tick, 120)
      }, steps[idx].dur)
    }
    const t = setTimeout(tick, 300)
    return () => clearTimeout(t)
  }, [])

  const progress = Math.round((done.length / steps.length) * 100)

  return (
    <div style={{ display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', minHeight:'70vh', textAlign:'center' }}>
      {/* Pulsing brain */}
      <div style={{ fontSize:80, marginBottom:32, filter:'drop-shadow(0 0 40px rgba(139,92,246,0.6))', animation:'floatY 2s ease-in-out infinite', display:'inline-block' }}>
        🧠
      </div>

      <h2 className="gradient-text" style={{ fontSize:28, fontWeight:800, letterSpacing:'-0.02em', marginBottom:8 }}>
        Analyzing Your Idea...
      </h2>
      <p style={{ color:'#475569', fontSize:14, marginBottom:40 }}>
        Our AI team is working on your startup profile
      </p>

      {/* Progress bar */}
      <div style={{ width:280, height:4, borderRadius:99, background:'rgba(255,255,255,0.06)', marginBottom:40, overflow:'hidden' }}>
        <div style={{ height:'100%', borderRadius:99, background:'linear-gradient(90deg,#7c3aed,#818cf8,#38bdf8)', transition:'width 0.5s ease', width:`${progress}%`, boxShadow:'0 0 12px rgba(139,92,246,0.6)' }} />
      </div>

      {/* Steps */}
      <div style={{ display:'flex', flexDirection:'column', gap:12, width:'100%', maxWidth:380, textAlign:'left' }}>
        {steps.map((s, i) => {
          const isDone    = done.includes(i)
          const isActive  = current === i && !isDone
          return (
            <div key={i} style={{ display:'flex', alignItems:'center', gap:14, padding:'12px 18px', borderRadius:14, transition:'all 0.4s',
              background: isDone ? 'rgba(52,211,153,0.08)' : isActive ? 'rgba(139,92,246,0.1)' : 'rgba(255,255,255,0.02)',
              border: isDone ? '1px solid rgba(52,211,153,0.2)' : isActive ? '1px solid rgba(139,92,246,0.25)' : '1px solid rgba(255,255,255,0.05)',
              opacity: i > current && !isDone ? 0.3 : 1,
            }}>
              <span style={{ fontSize:22, flexShrink:0, animation: isActive ? 'floatY 1s ease-in-out infinite' : 'none', display:'inline-block' }}>
                {isDone ? '✅' : s.emoji}
              </span>
              <span style={{ fontSize:13, fontWeight:500, color: isDone ? '#6ee7b7' : isActive ? '#c4b5fd' : '#475569' }}>
                {s.label}
              </span>
              {isActive && (
                <div style={{ marginLeft:'auto', width:16, height:16, borderRadius:'50%', border:'2px solid rgba(139,92,246,0.4)', borderTopColor:'#a78bfa', animation:'spin 0.8s linear infinite', flexShrink:0 }} />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
