import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Presentation, Send, RotateCcw, History, Zap, CheckCircle, XCircle, AlertTriangle } from 'lucide-react'
import { getBoardOpinions, getBoardFinal } from '../data/mockData'
import { useApp } from '../context/AppContext'
import BoardOpinionCard from '../components/BoardOpinionCard'
import SectionHeader from '../components/SectionHeader'
import VoiceMic from '../components/VoiceMic'

const examples = [
  'I want to add delivery to my dessert business.',
  'I want to expand to Abu Dhabi.',
  'I want to launch an Instagram page.',
  'I want to hire a part-time helper.',
  'I want to buy equipment worth AED 3000.',
]

export default function BoardMeeting() {
  const navigate = useNavigate()
  const { session, saveBoardPitch } = useApp()
  const { result, boardHistory } = session

  const [pitch, setPitch]           = useState('')
  const [opinions, setOpinions]     = useState([])
  const [visibleCount, setVisible]  = useState(0)
  const [showFinal, setShowFinal]   = useState(false)
  const [final, setFinal]           = useState(null)
  const [loading, setLoading]       = useState(false)
  const [submitted, setSubmitted]   = useState(false)
  const [showHistory, setShowHistory] = useState(false)
  const [chairmanTyping, setChairmanTyping] = useState(false)

  const startMeeting = () => {
    if (!pitch.trim()) return
    setLoading(true); setSubmitted(true)
    setOpinions([]); setVisible(0); setShowFinal(false); setFinal(null); setChairmanTyping(false)
    setTimeout(() => {
      const ops = getBoardOpinions(pitch)
      setOpinions(ops)
      setLoading(false)
    }, 900)
  }

  useEffect(() => {
    if (!opinions.length) return
    let count = 0
    const interval = setInterval(() => {
      count++; setVisible(count)
      if (count >= opinions.length) {
        clearInterval(interval)
        // Chairman types after all agents
        setTimeout(() => {
          setChairmanTyping(true)
          setTimeout(() => {
            const votes = opinions.map(o => o.vote)
            const f = getBoardFinal(pitch, votes)
            setFinal(f)
            setChairmanTyping(false)
            setShowFinal(true)
            saveBoardPitch(pitch, opinions, f)
          }, 2200)
        }, 800)
      }
    }, 1000)
    return () => clearInterval(interval)
  }, [opinions])

  const reset = () => { setPitch(''); setOpinions([]); setVisible(0); setShowFinal(false); setFinal(null); setSubmitted(false); setLoading(false); setChairmanTyping(false) }

  if (!result) return (
    <div style={{ textAlign:'center', padding:'60px 0' }} className="animate-fade-up">
      <div style={{ fontSize:56, marginBottom:16 }}>🏛️</div>
      <h2 style={{ color:'white', fontSize:22, fontWeight:800, marginBottom:8 }}>Board isn't convened yet</h2>
      <p style={{ color:'#64748b', fontSize:14, maxWidth:360, margin:'0 auto 24px', lineHeight:1.7 }}>
        Complete your business analysis first so the board can debate in context of your specific startup.
      </p>
      <button onClick={() => navigate('/welcome')} className="btn-primary" style={{ margin:'0 auto' }}>
        <Zap size={15} /> Start My Journey
      </button>
    </div>
  )

  return (
    <div style={{ maxWidth:780, margin:'0 auto' }} className="animate-fade-up">
      <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', flexWrap:'wrap', gap:16, marginBottom:32 }}>
        <SectionHeader tag="AI Board Meeting" title="Pitch to Your Board" subtitle={`Context: "${session.idea?.idea?.slice(0,60)}..."`} />
        {boardHistory.length > 0 && (
          <button onClick={() => setShowHistory(!showHistory)} className="btn-ghost" style={{ fontSize:12 }}>
            <History size={13} /> Past pitches ({boardHistory.length})
          </button>
        )}
      </div>

      {/* History panel */}
      {showHistory && (
        <div className="glass" style={{ padding:20, marginBottom:20 }}>
          <p style={{ color:'#475569', fontSize:11, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:14 }}>Previous Pitches</p>
          <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
            {boardHistory.map((item,i) => (
              <button key={i} onClick={() => { setPitch(item.pitch); setOpinions(item.opinions); setVisible(item.opinions.length); setFinal(item.final); setShowFinal(!!item.final); setSubmitted(true); setShowHistory(false) }}
                style={{ padding:'12px 14px', borderRadius:12, background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.06)', textAlign:'left', cursor:'pointer', transition:'all 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.borderColor='rgba(139,92,246,0.3)'}
                onMouseLeave={e => e.currentTarget.style.borderColor='rgba(255,255,255,0.06)'}>
                <p style={{ color:'#cbd5e1', fontSize:13, marginBottom:4, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{item.pitch}</p>
                {item.final && <span style={{ fontSize:11, fontWeight:600, color:item.final.color }}>{item.final.decision}</span>}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Pitch form */}
      {!submitted && (
        <div className="glass" style={{ padding:24, marginBottom:24 }}>
          <label style={{ display:'block', color:'rgba(253,230,138,0.6)', fontSize:13, fontWeight:600, marginBottom:10 }}>
            🎤 What do you want to pitch to the board?
          </label>
          <VoiceMic onTranscript={t => setPitch(t)} placeholder="Or speak your pitch in Arabic / English" />
          <textarea className="input-field" style={{ resize:'none', marginBottom:16 }} rows={3}
            placeholder="e.g. I want to expand to Abu Dhabi..."
            value={pitch} onChange={e => setPitch(e.target.value)} />
          <div style={{ display:'flex', flexWrap:'wrap', gap:8, marginBottom:16 }}>
            {examples.map(ex => (
              <button key={ex} onClick={() => setPitch(ex)}
                style={{ fontSize:11, padding:'5px 12px', borderRadius:99, cursor:'pointer', transition:'all 0.2s',
                  background: pitch===ex ? 'rgba(139,92,246,0.15)' : 'rgba(255,255,255,0.04)',
                  border: pitch===ex ? '1px solid rgba(139,92,246,0.3)' : '1px solid rgba(255,255,255,0.07)',
                  color: pitch===ex ? '#c4b5fd' : '#64748b' }}>
                {ex}
              </button>
            ))}
          </div>
          <button onClick={startMeeting} disabled={!pitch.trim()} className="btn-primary" style={{ width:'100%', justifyContent:'center', padding:'14px', opacity: pitch.trim() ? 1 : 0.4 }}>
            <Presentation size={16} /> Call the Board to Order <Send size={14} />
          </button>
        </div>
      )}

      {/* Pitch recap */}
      {submitted && (
        <div style={{ padding:16, borderRadius:16, marginBottom:20, background:'rgba(139,92,246,0.08)', border:'1px solid rgba(139,92,246,0.2)', display:'flex', alignItems:'center', justifyContent:'space-between', gap:12 }}>
          <p style={{ color:'white', fontSize:14, fontWeight:600 }}>"{pitch}"</p>
          <button onClick={reset} className="btn-ghost" style={{ fontSize:12, flexShrink:0 }}>
            <RotateCcw size={12} /> New pitch
          </button>
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div style={{ textAlign:'center', padding:'48px 0' }}>
          <div style={{ fontSize:48, marginBottom:16, animation:'floatY 1.5s ease-in-out infinite', display:'inline-block' }}>🏛️</div>
          <p style={{ color:'#64748b', fontSize:14 }}>The board is convening...</p>
        </div>
      )}

      {/* Agent opinions */}
      {opinions.length > 0 && (
        <div style={{ display:'flex', flexDirection:'column', gap:12, marginBottom:20 }}>
          <div style={{ display:'flex', alignItems:'center', gap:12 }}>
            <div style={{ height:1, flex:1, background:'rgba(255,255,255,0.06)' }} />
            <p style={{ color:'#334155', fontSize:11, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.1em' }}>Board Opinions</p>
            <div style={{ height:1, flex:1, background:'rgba(255,255,255,0.06)' }} />
          </div>
          {opinions.map((item,i) => (
            <BoardOpinionCard key={item.agent.id} item={item} index={i} visible={i < visibleCount} />
          ))}
        </div>
      )}

      {/* Chairman typing indicator */}
      {chairmanTyping && (
        <div style={{ padding:20, borderRadius:18, background:'rgba(251,191,36,0.08)', border:'1px solid rgba(251,191,36,0.2)', display:'flex', alignItems:'center', gap:14 }} className="animate-fade-up">
          <div style={{ fontSize:32 }}>⚖️</div>
          <div>
            <p style={{ color:'#fbbf24', fontSize:13, fontWeight:700, marginBottom:6 }}>Chairman AI is deliberating...</p>
            <div style={{ display:'flex', gap:4 }}>
              {[0,1,2].map(i => (
                <div key={i} style={{ width:6, height:6, borderRadius:'50%', background:'#fbbf24', animation:`floatY 0.6s ease-in-out infinite ${i*0.2}s` }} />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Final recommendation */}
      {showFinal && final && (
        <div className="animate-scale-in" style={{ padding:28, borderRadius:22, background:`linear-gradient(135deg, ${final.color}12, rgba(255,255,255,0.02))`, border:`2px solid ${final.color}30`, boxShadow:`0 0 40px ${final.color}12` }}>
          {/* Chairman header */}
          <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:20 }}>
            <div style={{ width:48, height:48, borderRadius:14, background:'linear-gradient(135deg,#fbbf24,#f97316)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:22 }}>
              ⚖️
            </div>
            <div>
              <p style={{ color:'#fbbf24', fontSize:11, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.08em' }}>Chairman AI — Final Recommendation</p>
              <p style={{ color:'#64748b', fontSize:12 }}>Based on all board opinions</p>
            </div>
          </div>

          {/* Decision + score */}
          <div style={{ display:'flex', gap:24, marginBottom:20, flexWrap:'wrap' }}>
            <div>
              <p style={{ color:'#64748b', fontSize:11, fontWeight:600, textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:6 }}>Decision</p>
              <p style={{ fontSize:28, fontWeight:900, color:final.color }}>{final.decision}</p>
            </div>
            <div style={{ width:1, background:'rgba(255,255,255,0.08)' }} />
            <div>
              <p style={{ color:'#64748b', fontSize:11, fontWeight:600, textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:6 }}>Overall Score</p>
              <p style={{ fontSize:28, fontWeight:900, color:'white' }}>{final.score} / 100</p>
            </div>
            <div style={{ width:1, background:'rgba(255,255,255,0.08)' }} />
            <div>
              <p style={{ color:'#64748b', fontSize:11, fontWeight:600, textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:6 }}>Risk Level</p>
              <p style={{ fontSize:16, fontWeight:700, color: final.riskLevel==='Low'?'#34d399':final.riskLevel==='Medium'?'#fbbf24':'#fb923c' }}>
                {final.riskLevel === 'Low' ? '🟢' : final.riskLevel === 'Medium' ? '🟡' : '🔴'} {final.riskLevel}
              </p>
            </div>
          </div>

          {/* Reason */}
          <p style={{ color:'#cbd5e1', fontSize:14, lineHeight:1.8, marginBottom:20 }}>{final.reason}</p>

          {/* Pros & Cons */}
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14 }}>
            <div style={{ padding:16, borderRadius:14, background:'rgba(52,211,153,0.07)', border:'1px solid rgba(52,211,153,0.15)' }}>
              <p style={{ color:'#34d399', fontSize:11, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.06em', marginBottom:10 }}>✓ Pros</p>
              {final.pros.map((p,i) => (
                <div key={i} style={{ display:'flex', alignItems:'flex-start', gap:8, color:'#94a3b8', fontSize:13, marginBottom:6 }}>
                  <CheckCircle size={12} style={{ color:'#34d399', marginTop:2, flexShrink:0 }} />{p}
                </div>
              ))}
            </div>
            <div style={{ padding:16, borderRadius:14, background:'rgba(251,146,60,0.07)', border:'1px solid rgba(251,146,60,0.15)' }}>
              <p style={{ color:'#fb923c', fontSize:11, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.06em', marginBottom:10 }}>✗ Cons</p>
              {final.cons.map((c,i) => (
                <div key={i} style={{ display:'flex', alignItems:'flex-start', gap:8, color:'#94a3b8', fontSize:13, marginBottom:6 }}>
                  <XCircle size={12} style={{ color:'#fb923c', marginTop:2, flexShrink:0 }} />{c}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
