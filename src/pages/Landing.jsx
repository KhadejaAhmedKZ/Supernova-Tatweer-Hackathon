import { useNavigate } from 'react-router-dom'
import {
  Rocket, Zap, Users, Shield, Presentation, TrendingUp,
  ArrowRight, CheckCircle, Star, MapPin, LayoutDashboard, ChevronRight
} from 'lucide-react'
import Navbar from '../components/Navbar'
import StarField from '../components/StarField'

const stats = [
  { value: '500+', label: 'Founders Guided', emoji: '🚀' },
  { value: '92%',  label: 'Found First Action', emoji: '🎯' },
  { value: 'AED 0', label: 'Cost to Start', emoji: '💡' },
  { value: '< 5 min', label: 'To First Step', emoji: '⚡' },
]

const features = [
  { icon: Zap,          color: '#818cf8', glow: 'rgba(129,140,248,0.25)', bg: 'rgba(129,140,248,0.1)', title: 'Idea Engine',         desc: 'Get one clear, low-risk first step tailored to your idea and budget.',     to: '/first-action'       },
  { icon: Shield,       color: '#fb923c', glow: 'rgba(251,146,60,0.25)',  bg: 'rgba(251,146,60,0.1)',  title: 'Failure Prevention',  desc: 'Know the risks before spending a single dirham.',                          to: '/failure-prevention' },
  { icon: Users,        color: '#c084fc', glow: 'rgba(192,132,252,0.25)', bg: 'rgba(192,132,252,0.1)', title: 'AI Startup Team',     desc: 'Five expert advisors — strategy, finance, marketing, legal, growth.',      to: '/agents'             },
  { icon: Presentation, color: '#34d399', glow: 'rgba(52,211,153,0.25)',  bg: 'rgba(52,211,153,0.1)',  title: 'AI Board Meeting',    desc: 'Pitch any decision. All five agents debate and give a final verdict.',    to: '/board-meeting'      },
]

const localIdeas = [
  { emoji: '🐪', label: 'Camel Milk Chocolate',   color: '#fb923c' },
  { emoji: '🌙', label: 'Stargazing Tourism',      color: '#818cf8' },
  { emoji: '☕', label: 'Desert Coffee Truck',     color: '#fbbf24' },
  { emoji: '🚛', label: 'Rural Grocery Delivery',  color: '#34d399' },
  { emoji: '🌿', label: 'Farm Equipment Rental',   color: '#4ade80' },
  { emoji: '📸', label: 'Night Photography Tours', color: '#c084fc' },
  { emoji: '🍯', label: 'Local Handmade Products', color: '#fb923c' },
  { emoji: '🍮', label: 'Homemade Desserts',       color: '#f472b6' },
]

const principles = [
  { text: 'You do not need to know everything today.',           emoji: '🌱' },
  { text: 'Your first step should be small and safe.',           emoji: '👣' },
  { text: 'Testing before spending is smart.',                   emoji: '🧪' },
  { text: 'One small action beats a perfect plan.',              emoji: '⚡' },
  { text: "Stopping is not failure — it's learning.",            emoji: '💪' },
]

export default function Landing() {
  const navigate = useNavigate()

  return (
    <div style={{ background: '#04060f', minHeight: '100vh', position: 'relative' }}>
      <StarField />
      <Navbar />

      {/* ── Ambient glow blobs ─────────────────────────────── */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 1, pointerEvents: 'none' }}>
        <div style={{ position:'absolute', top:'5%',  left:'5%',  width:500, height:500, borderRadius:'50%', background:'radial-gradient(circle, rgba(124,58,237,0.12) 0%, transparent 65%)', filter:'blur(40px)' }} />
        <div style={{ position:'absolute', top:'20%', right:'0%', width:400, height:400, borderRadius:'50%', background:'radial-gradient(circle, rgba(56,189,248,0.08) 0%, transparent 65%)', filter:'blur(40px)' }} />
        <div style={{ position:'absolute', bottom:'10%', left:'30%', width:600, height:300, borderRadius:'50%', background:'radial-gradient(ellipse, rgba(251,146,60,0.06) 0%, transparent 70%)', filter:'blur(60px)' }} />
      </div>

      {/* ── HERO ───────────────────────────────────────────── */}
      <section style={{ position:'relative', zIndex:2, minHeight:'100vh', display:'flex', alignItems:'center', paddingTop:80 }}>
        <div className="section-wrap" style={{ paddingTop:48, paddingBottom:80, textAlign:'center' }}>

          {/* Floating moon */}
          <div style={{ position:'absolute', top:100, right:'8%', fontSize:72, lineHeight:1, opacity:0.9, filter:'drop-shadow(0 0 30px rgba(253,230,138,0.5))' }}
            className="float" css={{ '--fdur':'6s' }}>
            🌙
          </div>

          {/* Floating camel */}
          <div style={{ position:'absolute', top:160, left:'6%', fontSize:52, lineHeight:1, filter:'drop-shadow(0 0 16px rgba(251,146,60,0.4))' }}
            className="float" style={{ '--fdur':'5s', '--fdelay':'1s', position:'absolute', top:160, left:'6%', fontSize:52, lineHeight:1, filter:'drop-shadow(0 0 16px rgba(251,146,60,0.4))' }}>
            🐪
          </div>

          {/* Star sparkles */}
          {[
            { top:'15%', left:'20%', size:20, delay:'0.5s' },
            { top:'30%', right:'18%', size:16, delay:'1.2s' },
            { top:'60%', left:'12%', size:14, delay:'0.8s' },
            { top:'70%', right:'10%', size:18, delay:'2s'  },
          ].map((s,i) => (
            <div key={i} style={{ position:'absolute', top:s.top, left:s.left, right:s.right, fontSize:s.size, animationDelay:s.delay, lineHeight:1 }}
              className="float pulse-glow">
              ✦
            </div>
          ))}

          {/* Location badge */}
          <div className="animate-fade-up" style={{ marginBottom:28 }}>
            <span style={{ display:'inline-flex', alignItems:'center', gap:8, padding:'8px 20px', borderRadius:99, background:'rgba(251,146,60,0.1)', border:'1px solid rgba(251,146,60,0.25)', fontSize:13, color:'#fdba74', fontWeight:600 }}>
              <MapPin size={13} />
              Built for Al Qua'a, Al Ain, UAE 🇦🇪
              <span style={{ width:7, height:7, borderRadius:'50%', background:'#34d399', display:'inline-block', animation:'pulseGlow 2s infinite' }} />
            </span>
          </div>

          {/* Headline */}
          <h1 className="animate-fade-up delay-100" style={{ fontSize:'clamp(40px,7vw,80px)', fontWeight:900, lineHeight:1.05, letterSpacing:'-0.03em', marginBottom:24, color:'white' }}>
            Your{' '}
            <span className="gradient-text">AI Co-Founder</span>
            <br />
            <span style={{ fontSize:'0.72em', fontWeight:700, color:'#e2e8f0' }}>
              for First-Time Entrepreneurs
            </span>
          </h1>

          {/* Sub */}
          <p className="animate-fade-up delay-200" style={{ fontSize:18, color:'#94a3b8', maxWidth:560, margin:'0 auto 12px', lineHeight:1.7 }}>
            You have an idea. You have a skill. But you don't know the first step.
          </p>
          <p className="animate-fade-up delay-300" style={{ fontSize:16, color:'#cbd5e1', maxWidth:480, margin:'0 auto 48px', lineHeight:1.7 }}>
            Bedaya AI moves you from{' '}
            <em style={{ color:'white', fontStyle:'normal', fontWeight:600 }}>"I have an idea"</em>
            {' '}to{' '}
            <span className="gradient-text" style={{ fontWeight:700 }}>"I know my first action."</span>
          </p>

          {/* CTAs */}
          <div className="animate-fade-up delay-400" style={{ display:'flex', flexWrap:'wrap', gap:16, justifyContent:'center', marginBottom:72 }}>
            <button onClick={() => navigate('/first-action')} className="btn-primary" style={{ fontSize:16, padding:'16px 32px', borderRadius:16 }}>
              <Rocket size={20} />
              Start Your First Step
              <ArrowRight size={18} />
            </button>
            <button onClick={() => navigate('/dashboard')} className="btn-secondary" style={{ fontSize:16, padding:'16px 32px', borderRadius:16 }}>
              <LayoutDashboard size={18} />
              View Dashboard
            </button>
          </div>

          {/* Stats */}
          <div className="animate-fade-up delay-500" style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(130px,1fr))', gap:16, maxWidth:640, margin:'0 auto' }}>
            {stats.map(({ value, label, emoji }) => (
              <div key={label} className="stat-card">
                <div style={{ fontSize:22, marginBottom:6 }}>{emoji}</div>
                <div className="gradient-text" style={{ fontSize:26, fontWeight:900, marginBottom:4 }}>{value}</div>
                <div style={{ fontSize:11, color:'#64748b', fontWeight:500 }}>{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Desert horizon line */}
        <div style={{ position:'absolute', bottom:0, left:0, right:0, height:2, background:'linear-gradient(90deg, transparent, rgba(251,146,60,0.3), rgba(124,58,237,0.3), transparent)' }} />
      </section>

      {/* ── PROBLEM ────────────────────────────────────────── */}
      <section style={{ position:'relative', zIndex:2, padding:'120px 0', borderTop:'1px solid rgba(255,255,255,0.05)' }}>
        <div className="section-wrap" style={{ textAlign:'center' }}>
          <div className="badge animate-fade-up" style={{ marginBottom:24, background:'rgba(239,68,68,0.12)', color:'#fca5a5', borderColor:'rgba(239,68,68,0.22)' }}>
            😰 The Problem
          </div>
          <h2 className="animate-fade-up delay-100" style={{ fontSize:'clamp(28px,4vw,44px)', fontWeight:800, color:'white', marginBottom:20, letterSpacing:'-0.02em', lineHeight:1.2 }}>
            Great ideas die in the gap between<br />
            <span style={{ color:'#475569' }}>"I want to start"</span>
            {' '}and{' '}
            <span className="gradient-text">"I actually started."</span>
          </h2>
          <p className="animate-fade-up delay-200" style={{ fontSize:17, color:'#64748b', maxWidth:540, margin:'0 auto 56px', lineHeight:1.8 }}>
            Most first-time founders have real skills and real ideas — but without knowing what to do first, they never begin.
          </p>

          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))', gap:20 }}>
            {[
              { emoji:'😰', text:"Don't know what first step to take",    color:'#f87171' },
              { emoji:'💸', text:"Fear of wasting money on the wrong thing", color:'#fb923c' },
              { emoji:'🤷', text:"No mentor or expert to ask for guidance", color:'#c084fc' },
            ].map(({ emoji, text, color }, i) => (
              <div key={text} className={`glass animate-fade-up delay-${(i+2)*100}`}
                style={{ padding:32, textAlign:'center', borderColor:`${color}18` }}>
                <div style={{ fontSize:40, marginBottom:16, filter:`drop-shadow(0 0 14px ${color}66)` }}>{emoji}</div>
                <p style={{ color:'#cbd5e1', fontSize:14, lineHeight:1.7 }}>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ───────────────────────────────────────── */}
      <section style={{ position:'relative', zIndex:2, padding:'120px 0', borderTop:'1px solid rgba(255,255,255,0.05)' }}>
        <div className="section-wrap">
          <div style={{ textAlign:'center', marginBottom:56 }}>
            <div className="badge animate-fade-up" style={{ marginBottom:20, background:'rgba(52,211,153,0.12)', color:'#6ee7b7', borderColor:'rgba(52,211,153,0.22)' }}>
              ✨ The Solution
            </div>
            <h2 className="animate-fade-up delay-100" style={{ fontSize:'clamp(28px,4vw,44px)', fontWeight:800, color:'white', letterSpacing:'-0.02em', lineHeight:1.2 }}>
              One clear step. Not a business plan.
            </h2>
          </div>

          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(240px,1fr))', gap:20 }}>
            {features.map(({ icon: Icon, color, glow, bg, title, desc, to }, i) => (
              <button key={title} onClick={() => navigate(to)}
                className={`glass-hover animate-fade-up delay-${(i+1)*100}`}
                style={{ padding:28, textAlign:'left', display:'flex', flexDirection:'column', gap:16 }}>
                <div style={{ width:48, height:48, borderRadius:14, background:bg, display:'flex', alignItems:'center', justifyContent:'center', boxShadow:`0 0 20px ${glow}`, transition:'all 0.3s' }}>
                  <Icon size={22} style={{ color }} />
                </div>
                <div>
                  <h3 style={{ fontWeight:700, color:'white', marginBottom:8, fontSize:15 }}>{title}</h3>
                  <p style={{ color:'#64748b', fontSize:13, lineHeight:1.7 }}>{desc}</p>
                </div>
                <div style={{ display:'flex', alignItems:'center', gap:4, fontSize:12, fontWeight:600, color, marginTop:'auto' }}>
                  Explore <ChevronRight size={13} />
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── AL QUA'A ────────────────────────────────────────── */}
      <section style={{ position:'relative', zIndex:2, padding:'120px 0', borderTop:'1px solid rgba(255,255,255,0.05)', overflow:'hidden' }}>
        {/* Camel silhouette strip */}
        <div style={{ position:'absolute', bottom:0, left:0, right:0, height:3, background:'linear-gradient(90deg, transparent, rgba(251,146,60,0.4), transparent)' }} />

        <div className="section-wrap">
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:64, alignItems:'center' }} className="responsive-2col">

            <div className="animate-fade-up">
              <div className="badge" style={{ marginBottom:24, background:'rgba(251,146,60,0.12)', color:'#fdba74', borderColor:'rgba(251,146,60,0.22)' }}>
                🐪 Built for Al Qua'a
              </div>
              <h2 style={{ fontSize:'clamp(26px,3.5vw,40px)', fontWeight:800, color:'white', lineHeight:1.2, letterSpacing:'-0.02em', marginBottom:20 }}>
                Your community.{' '}
                <span className="gradient-text-gold">Your ideas.</span>
              </h2>
              <p style={{ color:'#64748b', fontSize:16, lineHeight:1.8, marginBottom:28 }}>
                Al Qua'a is one of the UAE's most unique communities — rich in culture, agriculture, and natural beauty under some of the darkest skies in the country.
              </p>
              <ul style={{ listStyle:'none', margin:0, padding:0, display:'flex', flexDirection:'column', gap:12 }}>
                {[
                  'Business examples using local resources like camel milk',
                  'Pricing advice in AED based on community purchasing power',
                  'Opportunities that exist specifically for rural UAE founders',
                  'Night sky & desert tourism guidance for Al Qua\'a\'s unique assets',
                ].map((item, i) => (
                  <li key={i} style={{ display:'flex', alignItems:'flex-start', gap:10, color:'#cbd5e1', fontSize:14 }}>
                    <CheckCircle size={15} style={{ color:'#34d399', marginTop:2, flexShrink:0 }} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Idea cards grid */}
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
              {localIdeas.map(({ emoji, label, color }, i) => (
                <div key={label}
                  className={`glass-hover animate-fade-up delay-${Math.min(i+1,6)*100}`}
                  style={{ padding:'20px 16px', textAlign:'center', borderColor:`${color}18` }}>
                  <div style={{ fontSize:32, marginBottom:10, filter:`drop-shadow(0 0 10px ${color}55)` }}
                    className="float" style={{ '--fdur':`${3.5+i*0.4}s`, '--fdelay':`${i*0.3}s`, fontSize:32, marginBottom:10, filter:`drop-shadow(0 0 10px ${color}55)` }}>
                    {emoji}
                  </div>
                  <p style={{ fontSize:11, color:'#94a3b8', lineHeight:1.4, fontWeight:500 }}>{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── STARGAZING STRIP ────────────────────────────────── */}
      <section style={{ position:'relative', zIndex:2, padding:'80px 0', background:'linear-gradient(135deg, rgba(99,102,241,0.06), rgba(56,189,248,0.04), rgba(124,58,237,0.06))', borderTop:'1px solid rgba(255,255,255,0.05)', borderBottom:'1px solid rgba(255,255,255,0.05)' }}>
        <div className="section-wrap" style={{ textAlign:'center' }}>
          <div style={{ fontSize:48, marginBottom:16, filter:'drop-shadow(0 0 30px rgba(253,230,138,0.5))' }} className="float">🌙</div>
          <h3 style={{ fontSize:24, fontWeight:700, color:'white', marginBottom:12 }}>
            Al Qua'a has some of the{' '}
            <span className="gradient-text-sky">darkest skies in the UAE</span>
          </h3>
          <p style={{ color:'#64748b', fontSize:15, maxWidth:500, margin:'0 auto 28px' }}>
            Perfect for stargazing tourism, night photography experiences, and astronomical events. Bedaya AI helps you turn that into a real business.
          </p>
          <div style={{ display:'flex', justifyContent:'center', gap:16, flexWrap:'wrap', fontSize:32 }}>
            {['⭐','🌟','✨','💫','🔭','🌌','🌠','⭐'].map((s,i) => (
              <span key={i} className="float" style={{ '--fdur':`${2.5+i*0.5}s`, '--fdelay':`${i*0.25}s`, display:'inline-block', filter:'drop-shadow(0 0 8px rgba(253,230,138,0.4))' }}>{s}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRINCIPLES ─────────────────────────────────────── */}
      <section style={{ position:'relative', zIndex:2, padding:'120px 0', borderTop:'1px solid rgba(255,255,255,0.05)' }}>
        <div className="section-wrap" style={{ maxWidth:700, margin:'0 auto', textAlign:'center' }}>
          <div className="badge animate-fade-up" style={{ marginBottom:20, background:'rgba(192,132,252,0.12)', color:'#e9d5ff', borderColor:'rgba(192,132,252,0.22)' }}>
            💜 Our Promise
          </div>
          <h2 className="animate-fade-up delay-100" style={{ fontSize:'clamp(28px,4vw,40px)', fontWeight:800, color:'white', marginBottom:48, letterSpacing:'-0.02em' }}>
            We are on your side.
          </h2>
          <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
            {principles.map(({ text, emoji }, i) => (
              <div key={text}
                className={`animate-fade-up delay-${(i+1)*100}`}
                style={{ display:'flex', alignItems:'center', gap:16, padding:'18px 24px', borderRadius:16, background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.07)', textAlign:'left', transition:'all 0.3s', cursor:'default' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor='rgba(167,139,250,0.3)'; e.currentTarget.style.background='rgba(139,92,246,0.07)'; e.currentTarget.style.transform='translateX(4px)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor='rgba(255,255,255,0.07)'; e.currentTarget.style.background='rgba(255,255,255,0.03)'; e.currentTarget.style.transform='none' }}
              >
                <span style={{ fontSize:22, flexShrink:0 }}>{emoji}</span>
                <p style={{ color:'#cbd5e1', fontWeight:500, fontSize:15 }}>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────────── */}
      <section style={{ position:'relative', zIndex:2, padding:'120px 0', borderTop:'1px solid rgba(255,255,255,0.05)' }}>
        <div className="section-wrap" style={{ maxWidth:680, margin:'0 auto', textAlign:'center' }}>
          <div style={{ position:'relative', borderRadius:28, padding:'64px 48px', background:'linear-gradient(135deg, rgba(124,58,237,0.18), rgba(79,70,229,0.14), rgba(56,189,248,0.08))', border:'1px solid rgba(139,92,246,0.25)', overflow:'hidden' }}>
            {/* Inner glow */}
            <div style={{ position:'absolute', top:'-30%', left:'50%', transform:'translateX(-50%)', width:400, height:200, background:'radial-gradient(ellipse, rgba(139,92,246,0.25), transparent 70%)', filter:'blur(30px)', pointerEvents:'none' }} />

            {/* Floating elements inside CTA */}
            <div style={{ position:'absolute', top:20, right:24, fontSize:28, opacity:0.7 }} className="float">🌟</div>
            <div style={{ position:'absolute', bottom:20, left:24, fontSize:24, opacity:0.6 }} className="float" style={{ '--fdelay':'1.5s', position:'absolute', bottom:20, left:24, fontSize:24, opacity:0.6 }}>✨</div>

            <div style={{ position:'relative', zIndex:1 }}>
              <div style={{ fontSize:56, marginBottom:20, filter:'drop-shadow(0 0 30px rgba(253,230,138,0.5))' }} className="float">🌟</div>
              <h2 style={{ fontSize:'clamp(26px,4vw,38px)', fontWeight:800, color:'white', marginBottom:16, letterSpacing:'-0.02em' }}>
                Ready to take your first step?
              </h2>
              <p style={{ color:'#94a3b8', fontSize:16, marginBottom:36, lineHeight:1.7 }}>
                Less than 5 minutes. No registration. No cost.<br />Just your first real move toward your dream.
              </p>
              <button onClick={() => navigate('/first-action')} className="btn-primary"
                style={{ fontSize:16, padding:'18px 40px', borderRadius:16, margin:'0 auto' }}>
                <Rocket size={20} />
                Start Your First Step
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ position:'relative', zIndex:2, borderTop:'1px solid rgba(255,255,255,0.04)', padding:'28px 0', textAlign:'center' }}>
        <p style={{ color:'#1e293b', fontSize:12 }}>
          🌟 Bedaya AI · Al Qua'a, Al Ain, UAE · Tatweer Hackathon 2026 · 🐪 🌙 ✨
        </p>
      </footer>

      <style>{`
        @media (max-width: 768px) {
          .responsive-2col { grid-template-columns: 1fr !important; }
        }
        .float { animation: floatY var(--fdur, 4s) ease-in-out infinite var(--fdelay, 0s); display: inline-block; }
      `}</style>
    </div>
  )
}
