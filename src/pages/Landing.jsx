import { useNavigate } from 'react-router-dom'
import { Rocket, Zap, Users, Shield, Presentation, TrendingUp, ArrowRight, CheckCircle, MapPin, LayoutDashboard, ChevronRight } from 'lucide-react'
import Navbar from '../components/Navbar'
import WorldBackground from '../components/WorldBackground'

const stats = [
  { value: '500+', label: 'Founders Guided',  emoji: '🚀' },
  { value: '92%',  label: 'Found First Action',emoji: '🎯' },
  { value: 'AED 0',label: 'Cost to Start',     emoji: '💡' },
  { value: '< 5m', label: 'To Your First Step',emoji: '⚡' },
]

const features = [
  { icon: Zap,          color: '#f59e0b', glow:'rgba(245,158,11,0.3)',  title: 'Idea Engine',        desc: 'Enter your idea — get one clear, low-risk first step instantly.',      to: '/start'              },
  { icon: Shield,       color: '#f472b6', glow:'rgba(244,114,182,0.3)', title: 'Failure Prevention', desc: 'Know every risk before spending a single dirham.',                     to: '/failure-prevention' },
  { icon: Users,        color: '#a78bfa', glow:'rgba(167,139,250,0.3)', title: 'AI Startup Team',    desc: 'Five expert advisors — strategy, finance, marketing, legal, growth.', to: '/agents'             },
  { icon: Presentation, color: '#34d399', glow:'rgba(52,211,153,0.3)',  title: 'AI Board Meeting',   desc: 'All five agents debate your decision. Chairman gives final verdict.',  to: '/board-meeting'      },
]

const localIdeas = [
  { emoji:'🐪', label:'Camel Milk Chocolate',   color:'#f59e0b' },
  { emoji:'🌙', label:'Stargazing Tourism',      color:'#a78bfa' },
  { emoji:'☕', label:'Desert Coffee Truck',     color:'#fbbf24' },
  { emoji:'🚛', label:'Rural Grocery Delivery',  color:'#34d399' },
  { emoji:'🌿', label:'Farm Equipment Rental',   color:'#4ade80' },
  { emoji:'📸', label:'Night Photography Tours', color:'#c084fc' },
  { emoji:'🍯', label:'Local Handmade Products', color:'#fb923c' },
  { emoji:'🍮', label:'Homemade Desserts',       color:'#f472b6' },
]

const principles = [
  { text:'You do not need to know everything today.',   emoji:'🌱' },
  { text:'Your first step should be small and safe.',   emoji:'👣' },
  { text:'Testing before spending is smart.',           emoji:'🧪' },
  { text:'One small action beats a perfect plan.',      emoji:'⚡' },
  { text:"Stopping is not failure — it's learning.",    emoji:'💪' },
]

const S = ({ children, style }) => <span style={style}>{children}</span>

export default function Landing() {
  const navigate = useNavigate()

  const cardBase = {
    background: 'rgba(5,0,20,0.55)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    border: '1px solid rgba(255,190,60,0.12)',
    borderRadius: 20,
    transition: 'all 0.3s ease',
    cursor: 'pointer',
  }

  return (
    <div style={{ background:'#010008', minHeight:'100vh', position:'relative' }}>
      <WorldBackground />
      <Navbar />

      {/* ── HERO ───────────────────────────────────────── */}
      <section style={{ position:'relative', zIndex:10, minHeight:'100vh', display:'flex', alignItems:'center', paddingTop:64 }}>
        <div className="section-wrap" style={{ paddingTop:56, paddingBottom:200, textAlign:'center' }}>

          {/* Floating decorations */}
          <div className="float" style={{ position:'absolute', top:90, right:'7%', fontSize:64, filter:'drop-shadow(0 0 28px rgba(253,230,138,0.6))', '--fdur':'6s', '--fdelay':'0s', lineHeight:1 }}>🌙</div>
          <div className="float" style={{ position:'absolute', top:180, left:'5%', fontSize:48, filter:'drop-shadow(0 0 18px rgba(255,160,50,0.5))', '--fdur':'5s', '--fdelay':'0.8s', lineHeight:1 }}>✨</div>
          <div className="float" style={{ position:'absolute', top:'55%', right:'4%', fontSize:28, color:'rgba(253,230,138,0.4)', '--fdur':'4s', '--fdelay':'1.5s' }}>✦</div>
          <div className="float" style={{ position:'absolute', top:'40%', left:'8%', fontSize:22, color:'rgba(253,230,138,0.3)', '--fdur':'3.5s', '--fdelay':'0.4s' }}>✦</div>

          {/* Location badge */}
          <div className="animate-fade-up" style={{ marginBottom:24 }}>
            <span style={{ display:'inline-flex', alignItems:'center', gap:8, padding:'8px 20px', borderRadius:99, background:'rgba(200,100,10,0.15)', border:'1px solid rgba(255,180,50,0.25)', fontSize:13, color:'#fde68a', fontWeight:600 }}>
              <MapPin size={13} />
              Al Qua'a, Al Ain, UAE 🇦🇪
              <span style={{ width:7, height:7, borderRadius:'50%', background:'#4ade80', display:'inline-block' }} className="pulse-glow" />
            </span>
          </div>

          {/* Headline */}
          <h1 className="animate-fade-up delay-100" style={{ fontSize:'clamp(38px,7vw,80px)', fontWeight:900, lineHeight:1.05, letterSpacing:'-0.03em', marginBottom:20 }}>
            <span className="gradient-text">Your AI Co-Founder</span>
            <br />
            <span style={{ color:'#fef3c7', fontSize:'0.68em', fontWeight:700 }}>for First-Time Entrepreneurs</span>
          </h1>

          <p className="animate-fade-up delay-200" style={{ fontSize:18, color:'rgba(253,230,138,0.5)', maxWidth:540, margin:'0 auto 12px', lineHeight:1.75 }}>
            You have an idea. You have a skill. But you don't know the first step.
          </p>
          <p className="animate-fade-up delay-300" style={{ fontSize:16, color:'rgba(255,240,200,0.75)', maxWidth:440, margin:'0 auto 48px', lineHeight:1.75 }}>
            Bedaya AI moves you from{' '}
            <em style={{ color:'#fde68a', fontStyle:'normal', fontWeight:700 }}>"I have an idea"</em>
            {' '}to{' '}
            <span className="gradient-text" style={{ fontWeight:800 }}>"I know my first action."</span>
          </p>

          {/* CTAs */}
          <div className="animate-fade-up delay-400" style={{ display:'flex', flexWrap:'wrap', gap:16, justifyContent:'center', marginBottom:64 }}>
            <button onClick={() => navigate('/welcome')} className="btn-primary" style={{ fontSize:16, padding:'16px 36px', borderRadius:16 }}>
              <Rocket size={20} />
              Start Your First Step
              <ArrowRight size={18} />
            </button>
            <button onClick={() => navigate('/dashboard')} className="btn-secondary" style={{ fontSize:15, padding:'16px 28px', borderRadius:16 }}>
              <LayoutDashboard size={17} />
              Dashboard
            </button>
          </div>

          {/* Stats */}
          <div className="animate-fade-up delay-500" style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(130px,1fr))', gap:16, maxWidth:600, margin:'0 auto' }}>
            {stats.map(({ value, label, emoji }) => (
              <div key={label} className="stat-card" style={{ textAlign:'center' }}>
                <div style={{ fontSize:24, marginBottom:6 }}>{emoji}</div>
                <div className="gradient-text-sand" style={{ fontSize:26, fontWeight:900, marginBottom:4 }}>{value}</div>
                <div style={{ fontSize:11, color:'rgba(253,230,138,0.4)', fontWeight:500 }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROBLEM ─────────────────────────────────────── */}
      <section style={{ position:'relative', zIndex:10, padding:'120px 0 80px', borderTop:'1px solid rgba(255,180,50,0.06)' }}>
        <div className="section-wrap" style={{ textAlign:'center' }}>
          <div className="badge animate-fade-up" style={{ marginBottom:20, background:'rgba(239,68,68,0.1)', color:'#fca5a5', borderColor:'rgba(239,68,68,0.2)' }}>
            😰 The Problem
          </div>
          <h2 className="animate-fade-up delay-100" style={{ fontSize:'clamp(26px,4vw,44px)', fontWeight:800, color:'#fef3c7', marginBottom:16, letterSpacing:'-0.02em', lineHeight:1.2 }}>
            Great ideas die in the gap between<br />
            <span style={{ color:'rgba(253,230,138,0.3)' }}>"I want to start"</span>
            {' '}and{' '}
            <span className="gradient-text">"I actually started."</span>
          </h2>
          <p className="animate-fade-up delay-200" style={{ color:'rgba(253,230,138,0.35)', fontSize:16, maxWidth:500, margin:'0 auto 48px', lineHeight:1.8 }}>
            Most first-time founders in communities like Al Qua'a have real skills and real ideas — but without knowing what to do first, they never begin.
          </p>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))', gap:16 }}>
            {[
              { emoji:'😰', text:"Don't know the first step", color:'#f87171' },
              { emoji:'💸', text:'Fear of wasting money',     color:'#fb923c' },
              { emoji:'🤷', text:'No mentor to ask',          color:'#c084fc' },
            ].map(({ emoji, text, color }, i) => (
              <div key={text} className={`animate-fade-up delay-${(i+2)*100}`}
                style={{ ...cardBase, padding:'32px 24px', textAlign:'center', borderColor:`${color}18`,
                  onMouseEnter: undefined }}>
                <div style={{ fontSize:40, marginBottom:14, filter:`drop-shadow(0 0 14px ${color}66)` }}>{emoji}</div>
                <p style={{ color:'rgba(255,240,200,0.7)', fontSize:14, lineHeight:1.7 }}>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ────────────────────────────────────── */}
      <section style={{ position:'relative', zIndex:10, padding:'80px 0', borderTop:'1px solid rgba(255,180,50,0.06)' }}>
        <div className="section-wrap">
          <div style={{ textAlign:'center', marginBottom:48 }}>
            <div className="badge animate-fade-up" style={{ marginBottom:16, background:'rgba(52,211,153,0.1)', color:'#6ee7b7', borderColor:'rgba(52,211,153,0.2)' }}>
              ✨ The Solution
            </div>
            <h2 className="animate-fade-up delay-100" style={{ fontSize:'clamp(26px,4vw,40px)', fontWeight:800, color:'#fef3c7', letterSpacing:'-0.02em' }}>
              One clear step. Not a business plan.
            </h2>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(240px,1fr))', gap:16 }}>
            {features.map(({ icon:Icon, color, glow, title, desc, to }, i) => (
              <button key={title} onClick={() => navigate(to)}
                className={`animate-fade-up delay-${(i+1)*100}`}
                style={{ ...cardBase, padding:28, textAlign:'left', display:'flex', flexDirection:'column', gap:14, border:`1px solid rgba(255,190,60,0.1)` }}
                onMouseEnter={e => { e.currentTarget.style.borderColor=`${color}35`; e.currentTarget.style.background='rgba(20,5,0,0.65)'; e.currentTarget.style.transform='translateY(-3px)'; e.currentTarget.style.boxShadow=`0 12px 36px ${glow}` }}
                onMouseLeave={e => { e.currentTarget.style.borderColor='rgba(255,190,60,0.1)'; e.currentTarget.style.background='rgba(5,0,20,0.55)'; e.currentTarget.style.transform='none'; e.currentTarget.style.boxShadow='none' }}>
                <div style={{ width:48, height:48, borderRadius:14, background:`${color}18`, border:`1px solid ${color}25`, display:'flex', alignItems:'center', justifyContent:'center', boxShadow:`0 0 20px ${glow}` }}>
                  <Icon size={22} style={{ color }} />
                </div>
                <div>
                  <h3 style={{ fontWeight:700, color:'#fde68a', marginBottom:8, fontSize:15 }}>{title}</h3>
                  <p style={{ color:'rgba(253,230,138,0.4)', fontSize:13, lineHeight:1.7 }}>{desc}</p>
                </div>
                <div style={{ display:'flex', alignItems:'center', gap:4, fontSize:12, fontWeight:600, color, marginTop:'auto' }}>
                  Explore <ChevronRight size={13} />
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── AL QUA'A ─────────────────────────────────────── */}
      <section style={{ position:'relative', zIndex:10, padding:'80px 0', borderTop:'1px solid rgba(255,180,50,0.06)' }}>
        <div className="section-wrap">
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:56, alignItems:'center' }} className="resp-2col">
            <div className="animate-fade-up">
              <div className="badge" style={{ marginBottom:20, background:'rgba(251,146,60,0.1)', color:'#fdba74', borderColor:'rgba(251,146,60,0.2)' }}>
                🐪 Built for Al Qua'a
              </div>
              <h2 style={{ fontSize:'clamp(24px,3.5vw,38px)', fontWeight:800, color:'#fef3c7', lineHeight:1.2, letterSpacing:'-0.02em', marginBottom:18 }}>
                Your community.{' '}<span className="gradient-text">Your ideas.</span>
              </h2>
              <p style={{ color:'rgba(253,230,138,0.4)', fontSize:15, lineHeight:1.8, marginBottom:24 }}>
                Al Qua'a sits under some of the UAE's darkest skies — perfect for stargazing tourism. Rich in agriculture and cultural heritage. Bedaya AI is built for founders here.
              </p>
              <ul style={{ listStyle:'none', margin:0, padding:0, display:'flex', flexDirection:'column', gap:10 }}>
                {['Pricing advice in AED based on community purchasing power','Business examples using local resources like camel milk','UAE-specific grants and funding for rural founders','Night sky tourism guidance for Al Qua\'a\'s unique assets'].map((t,i) => (
                  <li key={i} style={{ display:'flex', alignItems:'flex-start', gap:10, color:'rgba(255,240,200,0.65)', fontSize:13 }}>
                    <CheckCircle size={14} style={{ color:'#4ade80', marginTop:2, flexShrink:0 }} />{t}
                  </li>
                ))}
              </ul>
            </div>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }}>
              {localIdeas.map(({ emoji, label, color }, i) => (
                <div key={label}
                  className={`animate-fade-up delay-${Math.min(i+1,6)*100}`}
                  style={{ ...cardBase, padding:'20px 14px', textAlign:'center', borderColor:`${color}15` }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor=`${color}40`; e.currentTarget.style.background='rgba(20,5,0,0.65)'; e.currentTarget.style.transform='translateY(-3px)' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor=`${color}15`; e.currentTarget.style.background='rgba(5,0,20,0.55)'; e.currentTarget.style.transform='none' }}>
                  <div className="float" style={{ fontSize:30, marginBottom:10, filter:`drop-shadow(0 0 10px ${color}55)`, '--fdur':`${3.5+i*0.4}s`, '--fdelay':`${i*0.3}s` }}>
                    {emoji}
                  </div>
                  <p style={{ fontSize:11, color:'rgba(253,230,138,0.4)', lineHeight:1.4, fontWeight:500 }}>{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── STARGAZING STRIP ─────────────────────────────── */}
      <section style={{ position:'relative', zIndex:10, padding:'64px 0', borderTop:'1px solid rgba(255,180,50,0.06)', borderBottom:'1px solid rgba(255,180,50,0.06)' }}>
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(135deg, rgba(60,0,120,0.25), rgba(20,0,80,0.2), rgba(80,20,0,0.15))' }} />
        <div className="section-wrap" style={{ position:'relative', zIndex:1, textAlign:'center' }}>
          <div className="float" style={{ fontSize:48, marginBottom:14, filter:'drop-shadow(0 0 30px rgba(253,230,138,0.55))' }}>🌙</div>
          <h3 style={{ fontSize:22, fontWeight:700, color:'#fef3c7', marginBottom:10 }}>
            Al Qua'a has some of the{' '}
            <span className="gradient-text-sky">darkest skies in the UAE</span>
          </h3>
          <p style={{ color:'rgba(253,230,138,0.35)', fontSize:14, maxWidth:480, margin:'0 auto 24px' }}>
            Perfect for stargazing tourism, night photography, and astronomical experiences. Bedaya AI helps you turn that natural treasure into a real business.
          </p>
          <div style={{ display:'flex', justifyContent:'center', gap:20, flexWrap:'wrap', fontSize:30 }}>
            {['⭐','🌟','✨','💫','🔭','🌌','🌠','⭐','✦','🌙'].map((s,i) => (
              <span key={i} className="float" style={{ '--fdur':`${2.2+i*0.4}s`, '--fdelay':`${i*0.22}s`, filter:'drop-shadow(0 0 8px rgba(253,230,138,0.45))' }}>{s}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRINCIPLES ───────────────────────────────────── */}
      <section style={{ position:'relative', zIndex:10, padding:'80px 0', borderTop:'1px solid rgba(255,180,50,0.06)' }}>
        <div className="section-wrap" style={{ maxWidth:680, margin:'0 auto', textAlign:'center' }}>
          <div className="badge animate-fade-up" style={{ marginBottom:20, background:'rgba(167,139,250,0.1)', color:'#c4b5fd', borderColor:'rgba(167,139,250,0.2)' }}>
            💜 Our Promise
          </div>
          <h2 className="animate-fade-up delay-100" style={{ fontSize:'clamp(26px,4vw,38px)', fontWeight:800, color:'#fef3c7', marginBottom:40, letterSpacing:'-0.02em' }}>
            We are on your side.
          </h2>
          <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
            {principles.map(({ text, emoji }, i) => (
              <div key={text}
                className={`animate-fade-up delay-${(i+1)*100}`}
                style={{ display:'flex', alignItems:'center', gap:16, padding:'16px 22px', borderRadius:16, ...cardBase, textAlign:'left', cursor:'default' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor='rgba(253,230,138,0.25)'; e.currentTarget.style.background='rgba(80,40,0,0.4)'; e.currentTarget.style.transform='translateX(4px)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor='rgba(255,190,60,0.12)'; e.currentTarget.style.background='rgba(5,0,20,0.55)'; e.currentTarget.style.transform='none' }}>
                <span style={{ fontSize:22, flexShrink:0 }}>{emoji}</span>
                <p style={{ color:'rgba(255,240,200,0.7)', fontWeight:500, fontSize:14 }}>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────── */}
      <section style={{ position:'relative', zIndex:10, padding:'80px 0 200px', borderTop:'1px solid rgba(255,180,50,0.06)' }}>
        <div className="section-wrap" style={{ maxWidth:640, margin:'0 auto', textAlign:'center' }}>
          <div style={{ position:'relative', borderRadius:28, padding:'60px 40px', background:'linear-gradient(135deg, rgba(180,100,10,0.18), rgba(120,60,0,0.14), rgba(60,0,120,0.12))', border:'1px solid rgba(255,180,50,0.2)', overflow:'hidden' }}>
            <div style={{ position:'absolute', top:'-30%', left:'50%', transform:'translateX(-50%)', width:400, height:200, background:'radial-gradient(ellipse, rgba(200,120,20,0.25), transparent 70%)', filter:'blur(30px)', pointerEvents:'none' }} />
            <div style={{ position:'absolute', top:16, right:24, fontSize:24, opacity:0.6 }} className="float">🌟</div>
            <div style={{ position:'absolute', bottom:16, left:24, fontSize:20, opacity:0.5 }} className="float" style={{ '--fdelay':'1.5s', position:'absolute', bottom:16, left:24, fontSize:20, opacity:0.5 }}>✨</div>
            <div style={{ position:'relative', zIndex:1 }}>
              <div style={{ fontSize:56, marginBottom:18, filter:'drop-shadow(0 0 30px rgba(253,230,138,0.55))' }} className="float">🌟</div>
              <h2 style={{ fontSize:'clamp(24px,4vw,36px)', fontWeight:800, color:'#fef3c7', marginBottom:14, letterSpacing:'-0.02em' }}>
                Ready to take your first step?
              </h2>
              <p style={{ color:'rgba(253,230,138,0.4)', fontSize:15, marginBottom:32, lineHeight:1.75 }}>
                Less than 5 minutes. No registration. No cost.<br />Just your first real move toward your dream.
              </p>
              <button onClick={() => navigate('/welcome')} className="btn-primary" style={{ fontSize:16, padding:'18px 44px', borderRadius:16, margin:'0 auto' }}>
                <Rocket size={20} />
                Start Your First Step
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ position:'relative', zIndex:10, borderTop:'1px solid rgba(255,180,50,0.06)', padding:'24px 0', textAlign:'center' }}>
        <p style={{ color:'rgba(255,200,100,0.15)', fontSize:12 }}>
          🌟 Bedaya AI · Al Qua'a, Al Ain, UAE · Tatweer Hackathon 2026 · 🐪 🌙 ✨
        </p>
      </footer>

      <style>{`
        @media (max-width: 768px) { .resp-2col { grid-template-columns: 1fr !important; } }
      `}</style>
    </div>
  )
}
