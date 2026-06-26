import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, ArrowLeft, User, Lightbulb, DollarSign, CheckCircle } from 'lucide-react'
import { useApp } from '../context/AppContext'

const TOTAL = 3

const stepConfig = [
  { icon: User,        color: '#818cf8', label: 'About You',       emoji: '👤' },
  { icon: Lightbulb,  color: '#fb923c', label: 'Your Idea',        emoji: '💡' },
  { icon: DollarSign, color: '#34d399', label: 'Your Resources',   emoji: '💰' },
]

function StepBar({ step }) {
  return (
    <div style={{ display:'flex', alignItems:'center', gap:0, marginBottom:40 }}>
      {stepConfig.map((s, i) => (
        <div key={i} style={{ display:'flex', alignItems:'center', flex: i < TOTAL-1 ? 1 : 'none' }}>
          <div style={{
            width:40, height:40, borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', fontSize:18, flexShrink:0,
            background: i < step ? 'linear-gradient(135deg,#7c3aed,#4f46e5)' : i === step ? 'rgba(139,92,246,0.2)' : 'rgba(255,255,255,0.05)',
            border: i === step ? '2px solid rgba(139,92,246,0.6)' : i < step ? '2px solid transparent' : '2px solid rgba(255,255,255,0.08)',
            transition:'all 0.3s',
            boxShadow: i === step ? '0 0 20px rgba(139,92,246,0.4)' : 'none',
          }}>
            {i < step ? <CheckCircle size={18} style={{ color:'white' }} /> : s.emoji}
          </div>
          {i < TOTAL-1 && (
            <div style={{ flex:1, height:2, margin:'0 8px', borderRadius:99, background: i < step ? 'linear-gradient(90deg,#7c3aed,#4f46e5)' : 'rgba(255,255,255,0.07)', transition:'all 0.4s' }} />
          )}
        </div>
      ))}
    </div>
  )
}

export default function Onboarding() {
  const navigate = useNavigate()
  const { saveAbout, saveIdea, saveResources, session } = useApp()

  const [step, setStep] = useState(0)
  const [about, setAbout]       = useState(session.about     || { name:'', age:'', location:"Al Qua'a, Al Ain", occupation:'' })
  const [idea, setIdea]         = useState(session.idea      || { idea:'', inspiration:'', customers:'', type:'product' })
  const [resources, setResources] = useState(session.resources || { budget:'', time:'', experience:'beginner', hasCustomers:'no', concern:'' })

  const ua = (k,v) => setAbout(f=>({...f,[k]:v}))
  const ui = (k,v) => setIdea(f=>({...f,[k]:v}))
  const ur = (k,v) => setResources(f=>({...f,[k]:v}))

  const next = () => {
    if (step === 0) saveAbout(about)
    if (step === 1) saveIdea(idea)
    if (step < TOTAL-1) { setStep(s=>s+1) }
    else {
      saveResources(resources)
      navigate('/analysis')
    }
  }

  const canNext = () => {
    if (step === 0) return about.name.trim() && about.location.trim()
    if (step === 1) return idea.idea.trim()
    if (step === 2) return resources.budget.trim()
    return true
  }

  const fieldStyle = { marginBottom:20 }
  const labelStyle = { display:'block', fontSize:13, fontWeight:600, color:'#94a3b8', marginBottom:8 }

  return (
    <div className="animate-fade-up" style={{ maxWidth:620, margin:'0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom:32, textAlign:'center' }}>
        <h1 style={{ fontSize:28, fontWeight:800, color:'white', letterSpacing:'-0.02em', marginBottom:8 }}>
          {stepConfig[step].emoji} {stepConfig[step].label}
        </h1>
        <p style={{ color:'#64748b', fontSize:14 }}>Step {step+1} of {TOTAL}</p>
      </div>

      <StepBar step={step} />

      {/* Step 1: About You */}
      {step === 0 && (
        <div className="glass" style={{ padding:32 }}>
          <h2 style={{ color:'#c4b5fd', fontSize:13, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:24 }}>Tell us about yourself</h2>
          <div style={fieldStyle}>
            <label style={labelStyle}>👤 Your name <span style={{ color:'#818cf8' }}>*</span></label>
            <input className="input-field" placeholder="e.g. Fatima" value={about.name} onChange={e=>ua('name',e.target.value)} />
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16, marginBottom:20 }}>
            <div>
              <label style={labelStyle}>🎂 Age (optional)</label>
              <input className="input-field" type="number" placeholder="e.g. 28" value={about.age} onChange={e=>ua('age',e.target.value)} />
            </div>
            <div>
              <label style={labelStyle}>📍 Location <span style={{ color:'#818cf8' }}>*</span></label>
              <input className="input-field" placeholder="Al Qua'a, Al Ain" value={about.location} onChange={e=>ua('location',e.target.value)} />
            </div>
          </div>
          <div style={fieldStyle}>
            <label style={labelStyle}>💼 Current occupation</label>
            <input className="input-field" placeholder="e.g. Homemaker, Farmer, Student..." value={about.occupation} onChange={e=>ua('occupation',e.target.value)} />
          </div>
        </div>
      )}

      {/* Step 2: Business Idea */}
      {step === 1 && (
        <div className="glass" style={{ padding:32 }}>
          <h2 style={{ color:'#fdba74', fontSize:13, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:24 }}>Your business idea</h2>
          <div style={fieldStyle}>
            <label style={labelStyle}>💡 What is your business idea? <span style={{ color:'#818cf8' }}>*</span></label>
            <textarea className="input-field" rows={3} style={{ resize:'none' }}
              placeholder="e.g. I want to sell homemade camel milk chocolate in Al Qua'a..."
              value={idea.idea} onChange={e=>ui('idea',e.target.value)} />
          </div>
          <div style={fieldStyle}>
            <label style={labelStyle}>✨ What inspired you?</label>
            <textarea className="input-field" rows={2} style={{ resize:'none' }}
              placeholder="e.g. I noticed people asking for local food products..."
              value={idea.inspiration} onChange={e=>ui('inspiration',e.target.value)} />
          </div>
          <div style={fieldStyle}>
            <label style={labelStyle}>👥 Who are your customers?</label>
            <input className="input-field" placeholder="e.g. Families in Al Qua'a, tourists, local shops..."
              value={idea.customers} onChange={e=>ui('customers',e.target.value)} />
          </div>
          <div style={fieldStyle}>
            <label style={labelStyle}>📦 Product or service?</label>
            <div style={{ display:'flex', gap:10 }}>
              {['product','service','both'].map(t => (
                <button key={t} onClick={() => ui('type',t)} style={{
                  flex:1, padding:'10px 0', borderRadius:12, fontSize:13, fontWeight:600, cursor:'pointer', transition:'all 0.2s', border:'none',
                  background: idea.type===t ? 'linear-gradient(135deg,#7c3aed,#4f46e5)' : 'rgba(255,255,255,0.05)',
                  color: idea.type===t ? 'white' : '#64748b',
                  boxShadow: idea.type===t ? '0 4px 14px rgba(124,58,237,0.35)' : 'none',
                }}>
                  {t.charAt(0).toUpperCase()+t.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Step 3: Resources */}
      {step === 2 && (
        <div className="glass" style={{ padding:32 }}>
          <h2 style={{ color:'#6ee7b7', fontSize:13, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:24 }}>Your resources</h2>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16, marginBottom:20 }}>
            <div>
              <label style={labelStyle}>💵 Starting budget (AED) <span style={{ color:'#818cf8' }}>*</span></label>
              <input className="input-field" type="number" placeholder="e.g. 500" value={resources.budget} onChange={e=>ur('budget',e.target.value)} />
            </div>
            <div>
              <label style={labelStyle}>⏱️ Hours per week</label>
              <input className="input-field" type="number" placeholder="e.g. 10" value={resources.time} onChange={e=>ur('time',e.target.value)} />
            </div>
          </div>
          <div style={fieldStyle}>
            <label style={labelStyle}>📚 Business experience level</label>
            <div style={{ display:'flex', gap:10 }}>
              {[['beginner','🌱 Beginner'],['some','🌿 Some'],['experienced','🌳 Experienced']].map(([val,lab]) => (
                <button key={val} onClick={() => ur('experience',val)} style={{
                  flex:1, padding:'10px 0', borderRadius:12, fontSize:12, fontWeight:600, cursor:'pointer', transition:'all 0.2s', border:'none',
                  background: resources.experience===val ? 'linear-gradient(135deg,#7c3aed,#4f46e5)' : 'rgba(255,255,255,0.05)',
                  color: resources.experience===val ? 'white' : '#64748b',
                }}>
                  {lab}
                </button>
              ))}
            </div>
          </div>
          <div style={fieldStyle}>
            <label style={labelStyle}>🤝 Do you already have customers?</label>
            <div style={{ display:'flex', gap:10 }}>
              {[['no','❌ Not yet'],['maybe','🤔 Maybe'],['yes','✅ Yes']].map(([val,lab]) => (
                <button key={val} onClick={() => ur('hasCustomers',val)} style={{
                  flex:1, padding:'10px 0', borderRadius:12, fontSize:12, fontWeight:600, cursor:'pointer', transition:'all 0.2s', border:'none',
                  background: resources.hasCustomers===val ? 'linear-gradient(135deg,#7c3aed,#4f46e5)' : 'rgba(255,255,255,0.05)',
                  color: resources.hasCustomers===val ? 'white' : '#64748b',
                }}>
                  {lab}
                </button>
              ))}
            </div>
          </div>
          <div style={fieldStyle}>
            <label style={labelStyle}>😟 What is your biggest concern?</label>
            <textarea className="input-field" rows={2} style={{ resize:'none' }}
              placeholder="e.g. I don't know if people will buy it..."
              value={resources.concern} onChange={e=>ur('concern',e.target.value)} />
          </div>
        </div>
      )}

      {/* Navigation */}
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginTop:24 }}>
        <button
          onClick={() => step === 0 ? navigate('/welcome') : setStep(s=>s-1)}
          className="btn-secondary" style={{ padding:'12px 24px' }}>
          <ArrowLeft size={16} /> {step === 0 ? 'Back' : 'Previous'}
        </button>
        <button onClick={next} disabled={!canNext()} className="btn-primary"
          style={{ padding:'12px 28px', opacity: canNext() ? 1 : 0.4, cursor: canNext() ? 'pointer' : 'not-allowed' }}>
          {step === TOTAL-1 ? <>🧠 Analyze My Idea</> : <>Next <ArrowRight size={16} /></>}
        </button>
      </div>
    </div>
  )
}
