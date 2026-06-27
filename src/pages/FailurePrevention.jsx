import { useState } from 'react'
import { Shield, Send, RotateCcw, History } from 'lucide-react'
import { getRiskAnalysis } from '../data/mockData'
import { useApp } from '../context/AppContext'
import RiskAlert from '../components/RiskAlert'
import SectionHeader from '../components/SectionHeader'
import VoiceMic from '../components/VoiceMic'

const EXAMPLES = [
  'I want to spend AED 5000 on branding.',
  'I want to register the business before testing.',
  'I want to add delivery to my business.',
  'I want to sell homemade food online.',
  'I want to hire an employee.',
]

const card = {
  background: 'rgba(6,2,24,0.88)',
  backdropFilter: 'blur(20px)',
  border: '1px solid rgba(255,210,80,0.15)',
  borderRadius: 18,
}

export default function FailurePrevention() {
  const { session, saveRiskCheck } = useApp()
  const [text,        setText]       = useState('')
  const [result,      setResult]     = useState(null)
  const [loading,     setLoading]    = useState(false)
  const [showHistory, setShowHistory] = useState(false)

  const analyze = () => {
    const trimmed = text.trim()
    if (!trimmed) return
    setLoading(true)
    setResult(null)
    setTimeout(() => {
      const analysis = getRiskAnalysis(trimmed)
      setResult(analysis)
      saveRiskCheck(trimmed, analysis)
      setLoading(false)
    }, 1200)
  }

  const reset = () => { setText(''); setResult(null) }

  const pick = (ex) => { setText(ex); setResult(null) }

  return (
    <div style={{ maxWidth: 640, margin: '0 auto' }} className="animate-fade-up">

      {/* Header */}
      <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', flexWrap:'wrap', gap:12, marginBottom:28 }}>
        <SectionHeader
          tag="Failure Prevention AI"
          title="Check Before You Decide"
          subtitle="Describe any business decision — Bedaya AI will warn you about risks before you spend."
        />
        {session.riskHistory.length > 0 && (
          <button onClick={() => setShowHistory(s => !s)} className="btn-ghost" style={{ fontSize:12, flexShrink:0 }}>
            <History size={13} /> Past checks ({session.riskHistory.length})
          </button>
        )}
      </div>

      {/* History panel */}
      {showHistory && session.riskHistory.length > 0 && (
        <div style={{ ...card, padding:18, marginBottom:20 }} className="animate-fade-up">
          <p className="score-label" style={{ marginBottom:12 }}>Previous Risk Checks</p>
          <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
            {session.riskHistory.map((item, i) => (
              <button key={i}
                onClick={() => { setText(item.decision); setResult(item.analysis); setShowHistory(false) }}
                style={{ display:'flex', alignItems:'center', justifyContent:'space-between', gap:10, padding:'10px 14px', borderRadius:12, background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,210,80,0.08)', cursor:'pointer', textAlign:'left', transition:'all 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.borderColor='rgba(245,158,11,0.25)'}
                onMouseLeave={e => e.currentTarget.style.borderColor='rgba(255,210,80,0.08)'}>
                <span style={{ color:'#e8e0d0', fontSize:13, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{item.decision}</span>
                <span style={{ fontSize:11, fontWeight:700, flexShrink:0, padding:'3px 9px', borderRadius:99,
                  background: item.analysis.riskLevel==='High'?'rgba(251,146,60,0.12)':item.analysis.riskLevel==='Medium'?'rgba(245,158,11,0.12)':'rgba(52,211,153,0.12)',
                  color: item.analysis.riskLevel==='High'?'#fb923c':item.analysis.riskLevel==='Medium'?'#fbbf24':'#34d399',
                }}>{item.analysis.riskLevel}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input card */}
      <div style={{ ...card, padding:24, marginBottom:20 }}>

        {/* Voice mic */}
        <VoiceMic
          onTranscript={t => setText(t)}
          placeholder="Speak your decision in Arabic or English..."
        />

        {/* Label */}
        <label style={{ display:'block', color:'rgba(253,230,138,0.7)', fontSize:13, fontWeight:600, marginBottom:8 }}>
          🤔 What decision are you thinking about?
        </label>

        {/* Textarea */}
        <textarea
          style={{ width:'100%', borderRadius:14, padding:'12px 16px', fontSize:14, color:'#fef9ee', background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,200,80,0.25)', outline:'none', resize:'none', fontFamily:'inherit', transition:'border-color 0.2s', marginBottom:16 }}
          rows={3}
          placeholder="e.g. I want to spend AED 5000 on branding before testing my idea..."
          value={text}
          onChange={e => setText(e.target.value)}
          onFocus={e => e.target.style.borderColor='rgba(245,158,11,0.6)'}
          onBlur={e => e.target.style.borderColor='rgba(255,200,80,0.25)'}
          onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); analyze() } }}
        />

        {/* Example chips */}
        <p style={{ color:'rgba(253,230,138,0.3)', fontSize:11, fontWeight:600, textTransform:'uppercase', letterSpacing:'0.07em', marginBottom:10 }}>
          Or try an example:
        </p>
        <div style={{ display:'flex', flexWrap:'wrap', gap:8, marginBottom:18 }}>
          {EXAMPLES.map(ex => (
            <button key={ex} onClick={() => pick(ex)} style={{
              fontSize:11, padding:'5px 12px', borderRadius:99, cursor:'pointer', transition:'all 0.2s', border:'none',
              background: text === ex ? 'rgba(245,158,11,0.18)' : 'rgba(255,255,255,0.04)',
              border: text === ex ? '1px solid rgba(245,158,11,0.4)' : '1px solid rgba(255,210,80,0.1)',
              color: text === ex ? '#fde68a' : 'rgba(253,230,138,0.35)',
            }}>
              {ex}
            </button>
          ))}
        </div>

        {/* Buttons */}
        <div style={{ display:'flex', gap:10 }}>
          <button
            onClick={analyze}
            disabled={!text.trim() || loading}
            className="btn-primary"
            style={{ flex:1, justifyContent:'center', opacity: text.trim() && !loading ? 1 : 0.4, cursor: text.trim() && !loading ? 'pointer' : 'not-allowed' }}>
            {loading
              ? <><span style={{ width:15, height:15, border:'2px solid rgba(0,0,0,0.2)', borderTopColor:'#1a0a00', borderRadius:'50%', animation:'spin 0.8s linear infinite', display:'inline-block' }} /> Analyzing...</>
              : <><Shield size={15} /> Analyze Risk <Send size={13} /></>
            }
          </button>
          {(result || text) && (
            <button onClick={reset} className="btn-secondary" style={{ padding:'12px 16px', flexShrink:0 }}>
              <RotateCcw size={15} />
            </button>
          )}
        </div>
      </div>

      {/* Result */}
      {result && (
        <div className="animate-fade-up">
          <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:16 }}>
            <div style={{ height:1, flex:1, background:'rgba(255,210,80,0.08)' }} />
            <p style={{ color:'rgba(253,230,138,0.3)', fontSize:11, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.08em' }}>AI Risk Analysis</p>
            <div style={{ height:1, flex:1, background:'rgba(255,210,80,0.08)' }} />
          </div>
          <RiskAlert analysis={result} />
        </div>
      )}

      <p style={{ textAlign:'center', color:'rgba(255,255,255,0.1)', fontSize:12, fontStyle:'italic', marginTop:24 }}>
        "Testing before spending is smart. One small action is better than a perfect plan."
      </p>
    </div>
  )
}
