import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Send, RotateCcw, MessageSquare, CheckCircle, BookOpen } from 'lucide-react'
import { agents, getAgentResponse } from '../data/mockData'
import { useApp } from '../context/AppContext'

export default function AgentDetail() {
  const { agentId } = useParams()
  const navigate = useNavigate()
  const { session, saveAgentChat } = useApp()

  const agent = agents.find(a => a.id === agentId)
  const history = session.agentHistory?.[agentId] || []

  const [question, setQuestion] = useState('')
  const [response, setResponse] = useState(null)
  const [loading, setLoading] = useState(false)
  const [asked, setAsked] = useState(false)

  if (!agent) return (
    <div style={{ textAlign:'center', padding:'60px 0' }}>
      <button onClick={() => navigate('/agents')} className="btn-secondary">← Back to Team</button>
    </div>
  )

  const ask = (q) => {
    const query = q || question
    if (!query.trim()) return
    setLoading(true); setResponse(null); setAsked(true)
    const idea = session.idea?.idea || 'your business idea'
    setTimeout(() => {
      const res = getAgentResponse(agent.id, query, idea, session)
      setResponse(res)
      saveAgentChat(agent.id, query, res)
      setLoading(false)
    }, 1400)
  }

  const suggestionQuestions = {
    strategist: ['What is my business model?', 'What milestones should I hit first?', 'Should I validate before registering?'],
    finance:    ['What should I price my product at?', 'How much will it cost to start?', 'When will I break even?'],
    marketing:  ['What should I name my business?', 'Who are my first customers?', 'How do I launch with no budget?'],
    legal:      ['What license do I need in the UAE?', 'Can I sell food from home legally?', 'When should I register my business?'],
    growth:     ['What funding can I apply for?', 'What events should I attend?', 'How do I scale after my first 10 customers?'],
  }

  const suggestions = suggestionQuestions[agentId] || []

  return (
    <div style={{ maxWidth:700, margin:'0 auto' }} className="animate-fade-up">
      {/* Header */}
      <div style={{ display:'flex', alignItems:'center', gap:16, marginBottom:28 }}>
        <button onClick={() => navigate('/agents')} className="btn-ghost" style={{ padding:'8px 12px' }}>
          <ArrowLeft size={16} /> Back
        </button>
        <div style={{ display:'flex', alignItems:'center', gap:12 }}>
          <div style={{ width:48, height:48, borderRadius:14, background:`linear-gradient(135deg,${agent.color}25,${agent.color}10)`, border:`1px solid ${agent.color}25`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:24, boxShadow:`0 0 20px ${agent.color}25` }}>
            {agent.emoji}
          </div>
          <div>
            <h1 style={{ color:'white', fontSize:20, fontWeight:800, marginBottom:2 }}>{agent.name}</h1>
            <p style={{ color:'#64748b', fontSize:13 }}>{agent.role}</p>
          </div>
        </div>
      </div>

      {/* Capabilities */}
      <div className="glass" style={{ padding:22, marginBottom:20 }}>
        <p style={{ color:'#64748b', fontSize:11, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:12, display:'flex', alignItems:'center', gap:6 }}>
          <BookOpen size={12} /> What I can help with
        </p>
        <div style={{ display:'flex', flexWrap:'wrap', gap:8 }}>
          {agent.capabilities.map((c,i) => (
            <span key={i} style={{ fontSize:12, color:'#94a3b8', background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.07)', padding:'5px 12px', borderRadius:99 }}>{c}</span>
          ))}
        </div>
        {agent.disclaimer && (
          <p style={{ marginTop:14, fontSize:11, color:'#f87171', background:'rgba(239,68,68,0.08)', border:'1px solid rgba(239,68,68,0.15)', padding:'10px 14px', borderRadius:10 }}>
            ⚠️ {agent.disclaimer}
          </p>
        )}
      </div>

      {/* Chat history */}
      {history.length > 0 && (
        <div style={{ marginBottom:20 }}>
          <p style={{ color:'#64748b', fontSize:11, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:12 }}>Previous Conversations</p>
          <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
            {history.map((h,i) => (
              <div key={i} style={{ padding:'14px 16px', borderRadius:14, background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.06)' }}>
                <p style={{ color:'#94a3b8', fontSize:12, fontWeight:600, marginBottom:6 }}>Q: {h.question}</p>
                <p style={{ color:'#64748b', fontSize:12, lineHeight:1.6, overflow:'hidden', display:'-webkit-box', WebkitLineClamp:2, WebkitBoxOrient:'vertical' }}>{h.response}</p>
                <button onClick={() => ask(h.question)} style={{ marginTop:8, fontSize:11, color:agent.color, background:'none', border:'none', cursor:'pointer', padding:0 }}>
                  Ask again →
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Response */}
      {loading && (
        <div style={{ padding:24, borderRadius:18, background:`${agent.color}08`, border:`1px solid ${agent.color}20`, marginBottom:20, display:'flex', alignItems:'center', gap:14 }}>
          <span style={{ fontSize:28, animation:'floatY 1s ease-in-out infinite', display:'inline-block' }}>{agent.emoji}</span>
          <div>
            <p style={{ color:agent.color, fontSize:13, fontWeight:600 }}>{agent.name} is thinking...</p>
            <div style={{ display:'flex', gap:4, marginTop:6 }}>
              {[0,1,2].map(i => (
                <div key={i} style={{ width:6, height:6, borderRadius:'50%', background:agent.color, animation:`floatY 0.6s ease-in-out infinite ${i*0.2}s` }} />
              ))}
            </div>
          </div>
        </div>
      )}

      {response && !loading && (
        <div style={{ padding:24, borderRadius:18, background:`linear-gradient(135deg,${agent.color}0a,rgba(255,255,255,0.02))`, border:`1px solid ${agent.color}22`, marginBottom:20 }} className="animate-fade-up">
          <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:14 }}>
            <span style={{ fontSize:20 }}>{agent.emoji}</span>
            <p style={{ color:agent.color, fontSize:12, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.08em' }}>{agent.name} responds</p>
          </div>
          <p style={{ color:'#e2e8f0', fontSize:14, lineHeight:1.8, whiteSpace:'pre-wrap' }}>{response}</p>
          <div style={{ marginTop:16, display:'flex', gap:10 }}>
            <button onClick={() => ask(question || history[0]?.question)} className="btn-secondary" style={{ fontSize:13, padding:'9px 18px' }}>
              <RotateCcw size={13} /> Ask Again
            </button>
            <button onClick={() => navigate('/agents')} className="btn-ghost" style={{ fontSize:13 }}>
              ← Other Advisors
            </button>
          </div>
        </div>
      )}

      {/* Suggestions */}
      {!asked && (
        <div style={{ marginBottom:20 }}>
          <p style={{ color:'#64748b', fontSize:11, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:12 }}>Suggested questions</p>
          <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
            {suggestions.map((q,i) => (
              <button key={i} onClick={() => { setQuestion(q); ask(q) }}
                style={{ padding:'13px 16px', borderRadius:12, background:'rgba(255,255,255,0.03)', border:`1px solid ${agent.color}20`, color:'#94a3b8', fontSize:13, textAlign:'left', cursor:'pointer', transition:'all 0.2s', display:'flex', alignItems:'center', justifyContent:'space-between' }}
                onMouseEnter={e => { e.currentTarget.style.background=`${agent.color}0c`; e.currentTarget.style.color='white' }}
                onMouseLeave={e => { e.currentTarget.style.background='rgba(255,255,255,0.03)'; e.currentTarget.style.color='#94a3b8' }}>
                {q}
                <Send size={13} style={{ flexShrink:0, marginLeft:8, color:agent.color }} />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Ask input */}
      <div className="glass" style={{ padding:20 }}>
        <p style={{ color:'#64748b', fontSize:12, fontWeight:600, marginBottom:12 }}>
          <MessageSquare size={12} style={{ display:'inline', marginRight:5 }} />
          Ask {agent.name} anything
        </p>
        <div style={{ display:'flex', gap:10 }}>
          <input className="input-field" style={{ flex:1 }}
            placeholder={`e.g. ${suggestions[0] || 'Ask me anything...'}`}
            value={question}
            onChange={e => setQuestion(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') ask() }}
          />
          <button onClick={() => ask()} disabled={!question.trim() || loading}
            className="btn-primary" style={{ padding:'12px 20px', flexShrink:0, opacity: question.trim() ? 1 : 0.4 }}>
            {loading ? <div style={{ width:16, height:16, borderRadius:'50%', border:'2px solid rgba(255,255,255,0.3)', borderTopColor:'white', animation:'spin 0.8s linear infinite' }} /> : <Send size={16} />}
          </button>
        </div>
      </div>
    </div>
  )
}
