import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, ArrowLeft, User, Lightbulb, DollarSign, CheckCircle } from 'lucide-react'
import { useApp } from '../context/AppContext'
import VoiceMic from '../components/VoiceMic'

const TOTAL = 3

const stepConfig = [
  { icon: User,        color: '#f59e0b', label: 'About You',      emoji: '👤' },
  { icon: Lightbulb,  color: '#fb923c', label: 'Your Idea',       emoji: '💡' },
  { icon: DollarSign, color: '#34d399', label: 'Your Resources',  emoji: '💰' },
]

const founderRoles = [
  { value:'student',    label:'🎓 Student'      },
  { value:'housewife',  label:'🏠 Housewife'    },
  { value:'retired',    label:'👴 Retired'       },
  { value:'farmer',     label:'🌿 Farmer'       },
  { value:'freelancer', label:'💻 Freelancer'   },
  { value:'employee',   label:'👔 Employee'     },
  { value:'unemployed', label:'🔍 Unemployed'   },
]

const businessStages = [
  { value:'idea',       label:'💡 Just an idea',             desc:'I have not started yet' },
  { value:'testing',    label:'🧪 Testing the idea',         desc:'I am gathering feedback' },
  { value:'selling',    label:'🛒 Already selling',          desc:'I have made some sales' },
  { value:'customers',  label:'🤝 Have first customers',     desc:'People are buying from me' },
  { value:'registered', label:'📋 Registered business',      desc:'I have a trade licence' },
  { value:'growing',    label:'📈 Looking to grow',          desc:'I want to scale up' },
]

function StepBar({ step }) {
  return (
    <div style={{ display:'flex', alignItems:'center', gap:0, marginBottom:36 }}>
      {stepConfig.map((s, i) => (
        <div key={i} style={{ display:'flex', alignItems:'center', flex: i < TOTAL-1 ? 1 : 'none' }}>
          <div style={{
            width:42, height:42, borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', fontSize:18, flexShrink:0,
            background: i < step ? 'linear-gradient(135deg,#c47010,#f59e0b)' : i === step ? 'rgba(245,158,11,0.15)' : 'rgba(255,255,255,0.04)',
            border: i === step ? '2px solid rgba(245,158,11,0.6)' : i < step ? '2px solid transparent' : '2px solid rgba(255,255,255,0.08)',
            transition:'all 0.3s',
            boxShadow: i === step ? '0 0 20px rgba(245,158,11,0.35)' : 'none',
          }}>
            {i < step ? <CheckCircle size={18} style={{ color:'white' }} /> : s.emoji}
          </div>
          {i < TOTAL-1 && (
            <div style={{ flex:1, height:2, margin:'0 8px', borderRadius:99, background: i < step ? 'linear-gradient(90deg,#c47010,#f59e0b)' : 'rgba(255,255,255,0.07)', transition:'all 0.4s' }} />
          )}
        </div>
      ))}
    </div>
  )
}

function ChoiceGrid({ options, value, onChange, cols = 2 }) {
  return (
    <div style={{ display:'grid', gridTemplateColumns:`repeat(${cols},1fr)`, gap:10 }}>
      {options.map(opt => {
        const selected = value === opt.value
        return (
          <button key={opt.value} onClick={() => onChange(opt.value)} style={{
            padding: opt.desc ? '14px 12px' : '12px', borderRadius:14, cursor:'pointer', transition:'all 0.2s', textAlign:'left', border:'none',
            background: selected ? 'linear-gradient(135deg,rgba(245,158,11,0.2),rgba(200,112,16,0.15))' : 'rgba(6,2,24,0.85)',
            border: selected ? '1.5px solid rgba(245,158,11,0.55)' : '1.5px solid rgba(255,210,80,0.12)',
            boxShadow: selected ? '0 0 16px rgba(245,158,11,0.2)' : 'none',
          }}>
            <p style={{ color: selected ? '#fde68a' : '#e2d9c8', fontWeight:600, fontSize:13 }}>{opt.label}</p>
            {opt.desc && <p style={{ color:'rgba(253,230,138,0.4)', fontSize:11, marginTop:3 }}>{opt.desc}</p>}
          </button>
        )
      })}
    </div>
  )
}

export default function Onboarding() {
  const navigate = useNavigate()
  const { saveAbout, saveIdea, saveResources, session } = useApp()

  // Pre-fill name from logged-in user if available
  const loggedInName = (() => {
    try { return JSON.parse(localStorage.getItem('bedaya_current_user'))?.name || '' }
    catch { return '' }
  })()

  const [step, setStep] = useState(0)
  const [about, setAbout]     = useState(session.about     || { name:loggedInName, age:'', location:"Al Qua'a, Al Ain", occupation:'', role:'', stage:'' })
  const [idea, setIdea]       = useState(session.idea      || { idea:'', inspiration:'', customers:'', type:'product' })
  const [resources, setResources] = useState(session.resources || { budget:'', time:'', experience:'beginner', hasCustomers:'no', concern:'' })

  const ua = (k,v) => setAbout(f=>({...f,[k]:v}))
  const ui = (k,v) => setIdea(f=>({...f,[k]:v}))
  const ur = (k,v) => setResources(f=>({...f,[k]:v}))

  const next = () => {
    if (step === 0) saveAbout(about)
    if (step === 1) saveIdea(idea)
    if (step < TOTAL-1) setStep(s=>s+1)
    else { saveResources(resources); navigate('/analysis') }
  }

  const canNext = () => {
    if (step === 0) return about.name.trim() && about.location.trim()
    if (step === 1) return idea.idea.trim()
    if (step === 2) return resources.budget.trim()
    return true
  }

  const label = { display:'block', fontSize:13, fontWeight:600, color:'rgba(253,230,138,0.7)', marginBottom:8 }
  const row2  = { display:'grid', gridTemplateColumns:'1fr 1fr', gap:14, marginBottom:20 }

  return (
    <div className="animate-fade-up" style={{ maxWidth:620, margin:'0 auto' }}>
      <div style={{ textAlign:'center', marginBottom:28 }}>
        <h1 style={{ fontSize:26, fontWeight:800, color:'#fef9ee', letterSpacing:'-0.02em', marginBottom:6 }}>
          {stepConfig[step].emoji} {stepConfig[step].label}
        </h1>
        <p style={{ color:'rgba(253,230,138,0.4)', fontSize:13 }}>Step {step+1} of {TOTAL}</p>
      </div>

      <StepBar step={step} />

      {/* ── Step 1: About You ── */}
      {step === 0 && (
        <div className="glass" style={{ padding:28 }}>
          <div style={{ marginBottom:20 }}>
            <label style={label}>👤 Your name <span style={{ color:'#f59e0b' }}>*</span></label>
            <VoiceMic onTranscript={t => ua('name', t)} placeholder="Or tap mic to say your name..." />
            <input className="input-field" placeholder="e.g. Fatima" value={about.name} onChange={e=>ua('name',e.target.value)} />
          </div>

          <div style={row2}>
            <div>
              <label style={label}>🎂 Age (optional)</label>
              <input className="input-field" type="number" placeholder="e.g. 28" value={about.age} onChange={e=>ua('age',e.target.value)} />
            </div>
            <div>
              <label style={label}>📍 Location <span style={{ color:'#f59e0b' }}>*</span></label>
              <input className="input-field" placeholder="Al Qua'a, Al Ain" value={about.location} onChange={e=>ua('location',e.target.value)} />
            </div>
          </div>

          <div style={{ marginBottom:20 }}>
            <label style={label}>👔 I am a...</label>
            <ChoiceGrid options={founderRoles} value={about.role} onChange={v=>ua('role',v)} cols={3} />
          </div>

          <div style={{ marginBottom:4 }}>
            <label style={label}>📊 Where are you today?</label>
            <ChoiceGrid options={businessStages} value={about.stage} onChange={v=>ua('stage',v)} cols={2} />
          </div>
        </div>
      )}

      {/* ── Step 2: Business Idea ── */}
      {step === 1 && (
        <div className="glass" style={{ padding:28 }}>
          <div style={{ marginBottom:20 }}>
            <label style={label}>💡 What is your business idea? <span style={{ color:'#f59e0b' }}>*</span></label>
            <VoiceMic onTranscript={t => ui('idea', t)} placeholder="Or tap mic to speak in Arabic / English" />
            <textarea className="input-field" rows={3} style={{ resize:'none' }}
              placeholder="e.g. I want to sell homemade camel milk chocolate in Al Qua'a..."
              value={idea.idea} onChange={e=>ui('idea',e.target.value)} />
          </div>
          <div style={{ marginBottom:20 }}>
            <label style={label}>✨ What inspired you?</label>
            <VoiceMic onTranscript={t => ui('inspiration', t)} placeholder="Speak your inspiration..." />
            <textarea className="input-field" rows={2} style={{ resize:'none' }}
              placeholder="e.g. I noticed people asking for local food products..."
              value={idea.inspiration} onChange={e=>ui('inspiration',e.target.value)} />
          </div>
          <div style={{ marginBottom:20 }}>
            <label style={label}>👥 Who are your first customers?</label>
            <VoiceMic onTranscript={t => ui('customers', t)} placeholder="Describe your customers..." />
            <input className="input-field" placeholder="e.g. Families, tourists, local shops..."
              value={idea.customers} onChange={e=>ui('customers',e.target.value)} />
          </div>
          <div>
            <label style={label}>📦 Product or service?</label>
            <div style={{ display:'flex', gap:10 }}>
              {['product','service','both'].map(t => (
                <button key={t} onClick={()=>ui('type',t)} style={{
                  flex:1, padding:'11px 0', borderRadius:12, fontSize:13, fontWeight:700, cursor:'pointer', transition:'all 0.2s', border:'none',
                  background: idea.type===t ? 'linear-gradient(135deg,#c47010,#f59e0b)' : 'rgba(6,2,24,0.85)',
                  color: idea.type===t ? '#1a0a00' : 'rgba(253,230,138,0.4)',
                  border: `1.5px solid ${idea.type===t ? 'rgba(245,158,11,0.5)' : 'rgba(255,210,80,0.12)'}`,
                }}>
                  {t.charAt(0).toUpperCase()+t.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── Step 3: Resources ── */}
      {step === 2 && (
        <div className="glass" style={{ padding:28 }}>
          <div style={row2}>
            <div>
              <label style={label}>💵 Budget (AED) <span style={{ color:'#f59e0b' }}>*</span></label>
              <input className="input-field" type="number" placeholder="e.g. 500" value={resources.budget} onChange={e=>ur('budget',e.target.value)} />
            </div>
            <div>
              <label style={label}>⏱️ Hours per week</label>
              <input className="input-field" type="number" placeholder="e.g. 10" value={resources.time} onChange={e=>ur('time',e.target.value)} />
            </div>
          </div>
          <div style={{ marginBottom:20 }}>
            <label style={label}>📚 Experience level</label>
            <div style={{ display:'flex', gap:10 }}>
              {[['beginner','🌱 Beginner'],['some','🌿 Some'],['experienced','🌳 Experienced']].map(([val,lab])=>(
                <button key={val} onClick={()=>ur('experience',val)} style={{
                  flex:1, padding:'11px 0', borderRadius:12, fontSize:12, fontWeight:600, cursor:'pointer', transition:'all 0.2s', border:'none',
                  background: resources.experience===val ? 'linear-gradient(135deg,#c47010,#f59e0b)' : 'rgba(6,2,24,0.85)',
                  color: resources.experience===val ? '#1a0a00' : 'rgba(253,230,138,0.4)',
                  border: `1.5px solid ${resources.experience===val ? 'rgba(245,158,11,0.5)' : 'rgba(255,210,80,0.12)'}`,
                }}>{lab}</button>
              ))}
            </div>
          </div>
          <div style={{ marginBottom:20 }}>
            <label style={label}>🤝 Do you already have customers?</label>
            <div style={{ display:'flex', gap:10 }}>
              {[['no','❌ Not yet'],['maybe','🤔 Maybe'],['yes','✅ Yes']].map(([val,lab])=>(
                <button key={val} onClick={()=>ur('hasCustomers',val)} style={{
                  flex:1, padding:'11px 0', borderRadius:12, fontSize:12, fontWeight:600, cursor:'pointer', transition:'all 0.2s', border:'none',
                  background: resources.hasCustomers===val ? 'linear-gradient(135deg,#c47010,#f59e0b)' : 'rgba(6,2,24,0.85)',
                  color: resources.hasCustomers===val ? '#1a0a00' : 'rgba(253,230,138,0.4)',
                  border: `1.5px solid ${resources.hasCustomers===val ? 'rgba(245,158,11,0.5)' : 'rgba(255,210,80,0.12)'}`,
                }}>{lab}</button>
              ))}
            </div>
          </div>
          <div>
            <label style={label}>😟 Biggest concern</label>
            <VoiceMic onTranscript={t => ur('concern', t)} placeholder="Speak your concern..." />
            <textarea className="input-field" rows={2} style={{ resize:'none' }}
              placeholder="e.g. I don't know if people will buy it..."
              value={resources.concern} onChange={e=>ur('concern',e.target.value)} />
          </div>
        </div>
      )}

      {/* Navigation */}
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginTop:20 }}>
        <button onClick={()=>step===0?navigate('/welcome'):setStep(s=>s-1)} className="btn-secondary" style={{ padding:'12px 22px' }}>
          <ArrowLeft size={16} /> {step===0?'Back':'Previous'}
        </button>
        <button onClick={next} disabled={!canNext()} className="btn-primary"
          style={{ padding:'12px 26px', opacity:canNext()?1:0.4, cursor:canNext()?'pointer':'not-allowed' }}>
          {step===TOTAL-1 ? <>🧠 Analyze My Idea</> : <>Next <ArrowRight size={16} /></>}
        </button>
      </div>
    </div>
  )
}
