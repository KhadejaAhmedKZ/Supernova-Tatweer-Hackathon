import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { getFirstActionResult } from '../data/mockData'

const STEPS = [
  { label: 'Understanding your idea...',      emoji: '💡', dur: 850 },
  { label: 'Checking market potential...',     emoji: '📊', dur: 900 },
  { label: 'Building founder profile...',      emoji: '👤', dur: 800 },
  { label: 'Assessing business readiness...',  emoji: '🎯', dur: 900 },
  { label: 'Consulting AI specialists...',     emoji: '🤖', dur: 950 },
  { label: 'Generating your first action...',  emoji: '⚡', dur: 700 },
]

export default function AnalysisLoading() {
  const navigate     = useNavigate()
  const { session, saveResult, fullForm } = useApp()
  const [current, setCurrent] = useState(0)
  const [done,    setDone]    = useState([])
  const cancelRef = useRef(false)   // prevents setState after unmount

  useEffect(() => {
    cancelRef.current = false

    // Guard: already has result → skip animation, go straight to results
    if (session.result) {
      navigate('/results', { replace: true })
      return
    }

    // Guard: no form data → send back to start
    if (!session.idea?.idea && !session.about?.name) {
      navigate('/start', { replace: true })
      return
    }

    const timeouts = []

    const runStep = (idx) => {
      if (cancelRef.current) return

      setCurrent(idx)

      const t1 = setTimeout(() => {
        if (cancelRef.current) return

        setDone(d => [...d, idx])
        const next = idx + 1

        if (next >= STEPS.length) {
          // All steps done — compute result and navigate
          const result = getFirstActionResult(fullForm)
          saveResult(result)

          const t2 = setTimeout(() => {
            if (!cancelRef.current) navigate('/results', { replace: true })
          }, 450)
          timeouts.push(t2)
        } else {
          const t2 = setTimeout(() => runStep(next), 100)
          timeouts.push(t2)
        }
      }, STEPS[idx].dur)

      timeouts.push(t1)
    }

    // Small initial delay so the page renders first
    const t0 = setTimeout(() => runStep(0), 250)
    timeouts.push(t0)

    return () => {
      cancelRef.current = true
      timeouts.forEach(clearTimeout)
    }
  }, []) // intentionally empty — runs once on mount

  const progress = Math.round((done.length / STEPS.length) * 100)

  return (
    <div style={{ display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', minHeight:'70vh', textAlign:'center', padding:'0 20px' }}>

      <div style={{ fontSize:80, marginBottom:28, filter:'drop-shadow(0 0 40px rgba(245,158,11,0.5))', animation:'floatY 2s ease-in-out infinite', display:'inline-block' }}>
        🧠
      </div>

      <h2 className="gradient-text" style={{ fontSize:26, fontWeight:800, letterSpacing:'-0.02em', marginBottom:8 }}>
        Analyzing Your Idea...
      </h2>
      <p style={{ color:'rgba(253,230,138,0.4)', fontSize:14, marginBottom:36 }}>
        Your AI co-founders are reviewing your startup
      </p>

      {/* Progress bar */}
      <div style={{ width:260, height:4, borderRadius:99, background:'rgba(255,255,255,0.06)', marginBottom:36, overflow:'hidden' }}>
        <div style={{
          height:'100%', borderRadius:99,
          background:'linear-gradient(90deg,#c47010,#f59e0b,#fbbf24)',
          width:`${progress}%`,
          transition:'width 0.6s ease',
          boxShadow:'0 0 12px rgba(245,158,11,0.5)',
        }} />
      </div>

      {/* Step list */}
      <div style={{ display:'flex', flexDirection:'column', gap:10, width:'100%', maxWidth:380, textAlign:'left' }}>
        {STEPS.map((s, i) => {
          const isDone   = done.includes(i)
          const isActive = current === i && !isDone

          return (
            <div key={i} style={{
              display:'flex', alignItems:'center', gap:14,
              padding:'11px 16px', borderRadius:14, transition:'all 0.4s',
              background: isDone   ? 'rgba(52,211,153,0.07)'
                        : isActive ? 'rgba(245,158,11,0.1)'
                        : 'rgba(255,255,255,0.02)',
              border:    isDone   ? '1px solid rgba(52,211,153,0.2)'
                       : isActive ? '1px solid rgba(245,158,11,0.25)'
                       : '1px solid rgba(255,255,255,0.04)',
              opacity: (i > current && !isDone) ? 0.3 : 1,
            }}>
              <span style={{ fontSize:20, flexShrink:0, display:'inline-block',
                animation: isActive ? 'floatY 1s ease-in-out infinite' : 'none' }}>
                {isDone ? '✅' : s.emoji}
              </span>
              <span style={{ fontSize:13, fontWeight:500,
                color: isDone ? '#6ee7b7' : isActive ? '#fde68a' : '#475569' }}>
                {s.label}
              </span>
              {isActive && (
                <div style={{ marginLeft:'auto', width:15, height:15, borderRadius:'50%',
                  border:'2px solid rgba(245,158,11,0.3)', borderTopColor:'#f59e0b',
                  animation:'spin 0.8s linear infinite', flexShrink:0 }} />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
