import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, MapPin, Zap, ArrowRight, ChevronDown, ChevronUp, Star, TrendingUp, Target, AlertTriangle, CheckCircle, Lightbulb } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { getMarketData, marketCategories, alQuaaBusinesses } from '../data/mockData'
import VoiceMic from '../components/VoiceMic'

const radii = [5, 10, 25]

function ScoreBar({ label, score, color }) {
  return (
    <div style={{ marginBottom:12 }}>
      <div style={{ display:'flex', justifyContent:'space-between', marginBottom:5 }}>
        <span style={{ color:'rgba(253,230,138,0.6)', fontSize:12, fontWeight:600 }}>{label}</span>
        <span style={{ color, fontSize:12, fontWeight:800 }}>{score}</span>
      </div>
      <div style={{ height:6, borderRadius:99, background:'rgba(255,255,255,0.06)', overflow:'hidden' }}>
        <div style={{ height:'100%', borderRadius:99, width:`${score}%`, background:`linear-gradient(90deg,${color}88,${color})`, transition:'width 1s ease', boxShadow:`0 0 8px ${color}55` }} />
      </div>
    </div>
  )
}

function BusinessCard({ biz }) {
  const [open, setOpen] = useState(false)
  const stars = Array.from({ length:5 }, (_,i) => i < Math.floor(biz.rating) ? '★' : '☆')
  return (
    <div style={{ borderRadius:18, overflow:'hidden', background:'rgba(6,2,24,0.88)', border:'1px solid rgba(255,210,80,0.15)', transition:'all 0.3s' }}
      onMouseEnter={e => e.currentTarget.style.borderColor='rgba(245,158,11,0.35)'}
      onMouseLeave={e => e.currentTarget.style.borderColor='rgba(255,210,80,0.15)'}>
      {/* Header */}
      <div style={{ padding:'18px 20px' }}>
        <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', gap:12, marginBottom:12 }}>
          <div style={{ display:'flex', gap:12, alignItems:'flex-start' }}>
            <div style={{ width:46, height:46, borderRadius:14, background:'rgba(245,158,11,0.12)', border:'1px solid rgba(245,158,11,0.2)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:24, flexShrink:0 }}>
              {biz.emoji}
            </div>
            <div>
              <h3 style={{ color:'#fef9ee', fontWeight:800, fontSize:15, marginBottom:3 }}>{biz.name}</h3>
              <p style={{ color:'rgba(253,230,138,0.5)', fontSize:12 }}>{biz.type}</p>
            </div>
          </div>
          <span style={{ fontSize:11, fontWeight:700, padding:'4px 10px', borderRadius:99,
            background: biz.status==='Growing'?'rgba(52,211,153,0.12)':biz.status==='Established'?'rgba(129,140,248,0.12)':'rgba(251,191,36,0.12)',
            color: biz.status==='Growing'?'#34d399':biz.status==='Established'?'#818cf8':'#fbbf24',
            border: `1px solid ${biz.status==='Growing'?'rgba(52,211,153,0.25)':biz.status==='Established'?'rgba(129,140,248,0.25)':'rgba(251,191,36,0.25)'}`,
            flexShrink:0
          }}>{biz.status}</span>
        </div>
        <div style={{ display:'flex', gap:16, flexWrap:'wrap' }}>
          <div style={{ display:'flex', alignItems:'center', gap:5 }}>
            <span style={{ color:'#fbbf24', fontSize:13 }}>{stars.join('')}</span>
            <span style={{ color:'#fde68a', fontSize:12, fontWeight:700 }}>{biz.rating}</span>
          </div>
          <span style={{ color:'rgba(253,230,138,0.4)', fontSize:12 }}>📍 {biz.distance}</span>
          <span style={{ color:'rgba(253,230,138,0.4)', fontSize:12 }}>🏛️ {biz.years} years</span>
          <span style={{ color:'rgba(253,230,138,0.4)', fontSize:12 }}>💵 {biz.priceRange}</span>
        </div>
      </div>

      {/* Actions */}
      <div style={{ padding:'0 20px 14px', display:'flex', gap:8 }}>
        <button onClick={() => setOpen(!open)} style={{ flex:1, padding:'9px 0', borderRadius:10, fontSize:12, fontWeight:600, cursor:'pointer', transition:'all 0.2s', background:'rgba(245,158,11,0.1)', border:'1px solid rgba(245,158,11,0.2)', color:'#fde68a', display:'flex', alignItems:'center', justifyContent:'center', gap:5 }}>
          {open ? <ChevronUp size={13}/> : <ChevronDown size={13}/>} {open ? 'Less' : 'View Details'}
        </button>
      </div>

      {/* Expanded details */}
      {open && (
        <div style={{ padding:'0 20px 20px', borderTop:'1px solid rgba(255,210,80,0.08)' }} className="animate-fade-up">
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12, marginTop:16 }}>
            <div style={{ padding:14, borderRadius:12, background:'rgba(52,211,153,0.07)', border:'1px solid rgba(52,211,153,0.15)' }}>
              <p style={{ color:'#34d399', fontSize:11, fontWeight:700, textTransform:'uppercase', marginBottom:8 }}>✓ Strengths</p>
              {biz.strengths.map((s,i) => <p key={i} style={{ color:'#e8e0d0', fontSize:12, marginBottom:4 }}>• {s}</p>)}
            </div>
            <div style={{ padding:14, borderRadius:12, background:'rgba(251,146,60,0.07)', border:'1px solid rgba(251,146,60,0.15)' }}>
              <p style={{ color:'#fb923c', fontSize:11, fontWeight:700, textTransform:'uppercase', marginBottom:8 }}>✗ Weaknesses</p>
              {biz.weaknesses.map((w,i) => <p key={i} style={{ color:'#e8e0d0', fontSize:12, marginBottom:4 }}>• {w}</p>)}
            </div>
          </div>
          <div style={{ marginTop:12, padding:14, borderRadius:12, background:'rgba(129,140,248,0.07)', border:'1px solid rgba(129,140,248,0.15)' }}>
            <p style={{ color:'#a78bfa', fontSize:11, fontWeight:700, textTransform:'uppercase', marginBottom:6 }}>💡 What You Can Learn</p>
            <p style={{ color:'#e8e0d0', fontSize:13, lineHeight:1.7 }}>{biz.learning}</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default function MarketDiscovery() {
  const navigate = useNavigate()
  const { session } = useApp()
  const [form, setForm] = useState({
    idea: session.idea?.idea || '',
    category: 'All',
    location: session.about?.location || "Al Qua'a, Al Ain",
    radius: 10,
  })
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [loadStep, setLoadStep] = useState(0)

  const loadSteps = [
    'Scanning nearby businesses...',
    'Analyzing competition levels...',
    'Identifying market gaps...',
    'Calculating opportunity scores...',
    'Generating AI insights...',
  ]

  const analyze = () => {
    setLoading(true); setData(null); setLoadStep(0)
    let i = 0
    const iv = setInterval(() => { i++; setLoadStep(i); if (i >= loadSteps.length-1) clearInterval(iv) }, 600)
    setTimeout(() => {
      setData(getMarketData(form.idea, form.category === 'All' ? null : form.category, form.location, form.radius))
      setLoading(false)
    }, 3200)
  }

  const card = { background:'rgba(6,2,24,0.88)', backdropFilter:'blur(20px)', border:'1px solid rgba(255,210,80,0.15)', borderRadius:18 }

  return (
    <div style={{ maxWidth:900, margin:'0 auto' }} className="animate-fade-up">
      {/* Header */}
      <div style={{ marginBottom:28 }}>
        <div style={{ display:'inline-flex', alignItems:'center', gap:8, padding:'6px 16px', borderRadius:99, background:'rgba(245,158,11,0.12)', border:'1px solid rgba(245,158,11,0.25)', fontSize:11, fontWeight:700, color:'#fde68a', textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:14 }}>
          <span style={{ width:6, height:6, borderRadius:'50%', background:'#f59e0b', animation:'pulseGlow 2s infinite', display:'inline-block' }} />
          Market Discovery AI
        </div>
        <h1 style={{ fontSize:28, fontWeight:800, color:'#fef9ee', letterSpacing:'-0.02em', marginBottom:8 }}>Explore Your Market</h1>
        <p style={{ color:'rgba(253,230,138,0.5)', fontSize:14, lineHeight:1.7 }}>
          Discover nearby businesses, competition levels, and untapped opportunities before you invest a single dirham.
        </p>
      </div>

      {/* Search Form */}
      <div style={{ ...card, padding:24, marginBottom:24 }}>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14, marginBottom:14 }}>
          <div>
            <label style={{ display:'block', color:'rgba(253,230,138,0.6)', fontSize:12, fontWeight:600, marginBottom:7 }}>💡 Business Idea</label>
            <VoiceMic onTranscript={t => setForm(f=>({...f,idea:t}))} placeholder="Or speak your idea..." />
            <input className="input-field" placeholder="e.g. Camel milk chocolate..." value={form.idea} onChange={e=>setForm(f=>({...f,idea:e.target.value}))} />
          </div>
          <div>
            <label style={{ display:'block', color:'rgba(253,230,138,0.6)', fontSize:12, fontWeight:600, marginBottom:7 }}>📂 Category</label>
            <select className="input-field" value={form.category} onChange={e=>setForm(f=>({...f,category:e.target.value}))}>
              <option value="All">All Categories</option>
              {marketCategories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label style={{ display:'block', color:'rgba(253,230,138,0.6)', fontSize:12, fontWeight:600, marginBottom:7 }}>📍 Location</label>
            <VoiceMic onTranscript={t => setForm(f=>({...f,location:t}))} placeholder="Speak your location..." />
            <input className="input-field" placeholder="e.g. Al Qua'a, Al Ain" value={form.location} onChange={e=>setForm(f=>({...f,location:e.target.value}))} />
          </div>
          <div>
            <label style={{ display:'block', color:'rgba(253,230,138,0.6)', fontSize:12, fontWeight:600, marginBottom:7 }}>📡 Search Radius</label>
            <div style={{ display:'flex', gap:8 }}>
              {radii.map(r => (
                <button key={r} onClick={()=>setForm(f=>({...f,radius:r}))} style={{ flex:1, padding:'11px 0', borderRadius:10, fontSize:13, fontWeight:700, cursor:'pointer', transition:'all 0.2s', border:'none',
                  background: form.radius===r ? 'linear-gradient(135deg,#c47010,#f59e0b)' : 'rgba(6,2,24,0.9)',
                  color: form.radius===r ? '#1a0a00' : 'rgba(253,230,138,0.4)',
                  border: `1px solid ${form.radius===r?'rgba(245,158,11,0.5)':'rgba(255,210,80,0.12)'}`,
                }}>
                  {r} km
                </button>
              ))}
            </div>
          </div>
        </div>
        <button onClick={analyze} disabled={!form.idea.trim() || loading} className="btn-primary" style={{ width:'100%', justifyContent:'center', padding:'14px', opacity:form.idea.trim()?1:0.4 }}>
          <Search size={16} /> Discover My Market <ArrowRight size={15} />
        </button>
      </div>

      {/* Loading */}
      {loading && (
        <div style={{ ...card, padding:40, textAlign:'center', marginBottom:24 }}>
          <div style={{ fontSize:56, marginBottom:20, animation:'floatY 1.5s ease-in-out infinite', display:'inline-block' }}>🔍</div>
          <h3 style={{ color:'#fde68a', fontSize:18, fontWeight:700, marginBottom:24 }}>Analyzing Your Market...</h3>
          <div style={{ display:'flex', flexDirection:'column', gap:10, maxWidth:360, margin:'0 auto' }}>
            {loadSteps.map((s,i) => (
              <div key={i} style={{ display:'flex', alignItems:'center', gap:10, padding:'10px 14px', borderRadius:12, transition:'all 0.4s',
                background: i <= loadStep ? 'rgba(245,158,11,0.08)' : 'rgba(255,255,255,0.02)',
                border: `1px solid ${i <= loadStep ? 'rgba(245,158,11,0.2)' : 'rgba(255,255,255,0.04)'}`,
                opacity: i > loadStep+1 ? 0.3 : 1,
              }}>
                <span style={{ fontSize:16 }}>{i < loadStep ? '✅' : i === loadStep ? '⏳' : '○'}</span>
                <span style={{ color: i <= loadStep ? '#fde68a' : 'rgba(253,230,138,0.3)', fontSize:13 }}>{s}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Results */}
      {data && !loading && (
        <div style={{ display:'flex', flexDirection:'column', gap:20 }} className="animate-fade-up">

          {/* Market Overview */}
          <div style={{ padding:'22px 24px', borderRadius:20, background:'linear-gradient(135deg,rgba(200,112,16,0.15),rgba(6,2,24,0.9))', border:'1px solid rgba(245,158,11,0.25)', display:'flex', flexWrap:'wrap', gap:20, alignItems:'center' }}>
            <div style={{ flex:1 }}>
              <p style={{ color:'rgba(253,230,138,0.5)', fontSize:11, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:8 }}>Market Overview — {form.location} ({form.radius} km)</p>
              <h2 style={{ color:'#fef9ee', fontSize:20, fontWeight:800, marginBottom:4 }}>{data.count} Similar Businesses Found</h2>
              <p style={{ color:'rgba(253,230,138,0.45)', fontSize:13 }}>Avg rating {data.avgRating}/5 · Competition: <span style={{ color:data.competitionColor, fontWeight:700 }}>{data.competitionLevel}</span></p>
            </div>
            <div style={{ display:'flex', gap:12 }}>
              {[
                { label:'Opportunity', value:`${data.scores.overall}%`, color:'#34d399' },
                { label:'Demand', value:`${data.scores.demand}%`, color:'#f59e0b' },
                { label:'Competition', value:`${data.scores.competition}%`, color:data.competitionColor },
              ].map(({ label, value, color }) => (
                <div key={label} style={{ textAlign:'center', padding:'14px 18px', borderRadius:14, background:'rgba(6,2,24,0.7)', border:'1px solid rgba(255,210,80,0.12)' }}>
                  <p style={{ color:'rgba(253,230,138,0.4)', fontSize:10, textTransform:'uppercase', fontWeight:600, marginBottom:4 }}>{label}</p>
                  <p style={{ color, fontSize:22, fontWeight:900 }}>{value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Opportunity Scores */}
          <div style={{ ...card, padding:22 }}>
            <p style={{ color:'#fde68a', fontSize:12, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:18 }}>📊 Opportunity Scores</p>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'0 32px' }}>
              <ScoreBar label="Demand Score"      score={data.scores.demand}      color="#f59e0b" />
              <ScoreBar label="Competition Score" score={data.scores.competition}  color={data.competitionColor} />
              <ScoreBar label="Innovation Score"  score={data.scores.innovation}   color="#a78bfa" />
              <ScoreBar label="Location Score"    score={data.scores.location}     color="#34d399" />
            </div>
            <div style={{ marginTop:16, paddingTop:16, borderTop:'1px solid rgba(255,210,80,0.08)', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
              <p style={{ color:'rgba(253,230,138,0.5)', fontSize:12, fontWeight:600 }}>Overall Opportunity Score</p>
              <p style={{ color: data.scores.overall>=75?'#34d399':data.scores.overall>=55?'#fbbf24':'#fb923c', fontSize:26, fontWeight:900 }}>{data.scores.overall}%</p>
            </div>
          </div>

          {/* Nearby Businesses */}
          <div>
            <p style={{ color:'rgba(253,230,138,0.5)', fontSize:11, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:14 }}>📍 Nearby Similar Businesses</p>
            <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
              {data.businesses.map(biz => <BusinessCard key={biz.id} biz={biz} />)}
            </div>
          </div>

          {/* Competitive Gap Analysis */}
          <div style={{ ...card, padding:22 }}>
            <p style={{ color:'#fb923c', fontSize:12, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:18 }}>⚡ Competitive Gap Analysis</p>
            <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
              {data.gaps.map((gap,i) => (
                <div key={i} style={{ padding:16, borderRadius:14, background:'rgba(251,146,60,0.07)', border:'1px solid rgba(251,146,60,0.18)' }}>
                  <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:8 }}>
                    <Lightbulb size={14} style={{ color:'#fb923c' }} />
                    <p style={{ color:'#fb923c', fontSize:12, fontWeight:700 }}>{gap.title}</p>
                  </div>
                  <p style={{ color:'#e8e0d0', fontSize:13, lineHeight:1.7 }}>{gap.opportunity}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Untapped Opportunities */}
          <div style={{ ...card, padding:22 }}>
            <p style={{ color:'#34d399', fontSize:12, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:14 }}>🌟 Untapped Opportunities in {form.location}</p>
            {data.untappedOpportunities.map((op,i) => (
              <div key={i} style={{ display:'flex', gap:10, marginBottom:10, color:'#e8e0d0', fontSize:13, lineHeight:1.7 }}>
                <span style={{ color:'#34d399', fontWeight:700, flexShrink:0 }}>→</span>{op}
              </div>
            ))}
          </div>

          {/* Suggested Differentiators */}
          <div style={{ ...card, padding:22 }}>
            <p style={{ color:'#a78bfa', fontSize:12, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:14 }}>💜 How to Stand Out</p>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(200px,1fr))', gap:10 }}>
              {data.differentiators.map((d,i) => (
                <div key={i} style={{ padding:'12px 14px', borderRadius:12, background:'rgba(139,92,246,0.07)', border:'1px solid rgba(139,92,246,0.15)', display:'flex', gap:8, alignItems:'flex-start' }}>
                  <CheckCircle size={13} style={{ color:'#a78bfa', marginTop:2, flexShrink:0 }} />
                  <p style={{ color:'#e8e0d0', fontSize:12, lineHeight:1.6 }}>{d}</p>
                </div>
              ))}
            </div>
          </div>

          {/* AI Recommendation */}
          <div style={{ padding:28, borderRadius:20, background:`linear-gradient(135deg,${data.recommendation.color}12,rgba(6,2,24,0.95))`, border:`2px solid ${data.recommendation.color}35`, boxShadow:`0 0 40px ${data.recommendation.color}10` }}>
            <p style={{ color:data.recommendation.color, fontSize:11, fontWeight:800, textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:12 }}>🤖 AI Recommendation</p>
            <h2 style={{ color:'#fef9ee', fontSize:22, fontWeight:900, marginBottom:12 }}>{data.recommendation.verdict}</h2>
            <p style={{ color:'#e8e0d0', fontSize:14, lineHeight:1.8 }}>{data.recommendation.reason}</p>
            <div style={{ marginTop:20, display:'flex', gap:12, flexWrap:'wrap' }}>
              <button onClick={() => navigate('/start')} className="btn-primary" style={{ padding:'12px 24px' }}>
                <Zap size={15} /> Start My Journey
              </button>
              <button onClick={() => setData(null)} className="btn-secondary" style={{ padding:'12px 20px' }}>
                <Search size={15} /> New Search
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
