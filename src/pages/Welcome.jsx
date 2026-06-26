import { useNavigate } from 'react-router-dom'
import { ArrowRight, Lightbulb, Info } from 'lucide-react'
import StarField from '../components/StarField'
import Navbar from '../components/Navbar'

const steps = [
  { emoji: '💡', title: 'Tell us your idea',     desc: 'Share your skill or business idea in simple words.' },
  { emoji: '🧠', title: 'AI analyzes it',        desc: 'Our AI team reviews your idea, budget, and location.' },
  { emoji: '⚡', title: 'Get your first action', desc: 'Receive one clear, low-risk step to take immediately.' },
]

export default function Welcome() {
  const navigate = useNavigate()

  return (
    <div style={{ background: '#04060f', minHeight: '100vh', position: 'relative' }}>
      <StarField />
      <Navbar />

      {/* Ambient glow */}
      <div style={{ position:'fixed', inset:0, zIndex:1, pointerEvents:'none' }}>
        <div style={{ position:'absolute', top:'20%', left:'50%', transform:'translateX(-50%)', width:700, height:400, borderRadius:'50%', background:'radial-gradient(ellipse, rgba(124,58,237,0.12) 0%, transparent 65%)', filter:'blur(60px)' }} />
        <div style={{ position:'absolute', bottom:'10%', right:'10%', width:350, height:350, borderRadius:'50%', background:'radial-gradient(circle, rgba(251,146,60,0.07) 0%, transparent 65%)', filter:'blur(50px)' }} />
      </div>

      <div style={{ position:'relative', zIndex:2, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', minHeight:'100vh', padding:'80px 24px 40px', textAlign:'center' }}>

        {/* Floating emoji */}
        <div style={{ fontSize:64, marginBottom:24, filter:'drop-shadow(0 0 30px rgba(253,230,138,0.5))', animation:'floatY 4s ease-in-out infinite', display:'inline-block' }}>
          🌟
        </div>

        <div className="animate-fade-up" style={{ marginBottom:12 }}>
          <span style={{ display:'inline-flex', alignItems:'center', gap:8, padding:'6px 16px', borderRadius:99, background:'rgba(139,92,246,0.12)', border:'1px solid rgba(139,92,246,0.22)', fontSize:12, color:'#c4b5fd', fontWeight:700, textTransform:'uppercase', letterSpacing:'0.08em' }}>
            <span style={{ width:6, height:6, borderRadius:'50%', background:'#a78bfa', animation:'pulseGlow 2s infinite', display:'inline-block' }} />
            Bedaya AI — Your AI Co-Founder
          </span>
        </div>

        <h1 className="animate-fade-up delay-100" style={{ fontSize:'clamp(30px,5vw,54px)', fontWeight:900, color:'white', lineHeight:1.1, letterSpacing:'-0.03em', marginBottom:16, maxWidth:640 }}>
          Welcome! Let's turn your idea into your{' '}
          <span className="gradient-text">first business step.</span>
        </h1>

        <p className="animate-fade-up delay-200" style={{ color:'#64748b', fontSize:17, maxWidth:500, lineHeight:1.8, marginBottom:56 }}>
          It takes less than 5 minutes. No business experience needed. Just tell us your idea and we'll do the rest.
        </p>

        {/* Steps */}
        <div className="animate-fade-up delay-300" style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))', gap:16, maxWidth:680, width:'100%', marginBottom:48 }}>
          {steps.map(({ emoji, title, desc }, i) => (
            <div key={title} style={{ padding:'28px 20px', borderRadius:20, background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.07)', textAlign:'center', transition:'all 0.3s' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor='rgba(139,92,246,0.3)'; e.currentTarget.style.background='rgba(139,92,246,0.07)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor='rgba(255,255,255,0.07)'; e.currentTarget.style.background='rgba(255,255,255,0.03)' }}>
              <div style={{ fontSize:36, marginBottom:12, animation:`floatY ${3+i*0.5}s ease-in-out infinite ${i*0.4}s`, display:'inline-block' }}>{emoji}</div>
              <p style={{ color:'white', fontWeight:700, fontSize:14, marginBottom:6 }}>{title}</p>
              <p style={{ color:'#64748b', fontSize:12, lineHeight:1.6 }}>{desc}</p>
              <div style={{ width:24, height:2, borderRadius:99, background:'linear-gradient(90deg,#7c3aed,#4f46e5)', margin:'16px auto 0' }} />
            </div>
          ))}
        </div>

        {/* CTA buttons */}
        <div className="animate-fade-up delay-400" style={{ display:'flex', flexWrap:'wrap', gap:16, justifyContent:'center' }}>
          <button onClick={() => navigate('/start')} className="btn-primary" style={{ fontSize:16, padding:'18px 40px', borderRadius:16 }}>
            <span>🚀</span>
            Start My Journey
            <ArrowRight size={18} />
          </button>
          <button onClick={() => navigate('/')} className="btn-secondary" style={{ fontSize:15, padding:'18px 28px', borderRadius:16 }}>
            <Info size={16} />
            Learn More
          </button>
        </div>

        <p className="animate-fade-up delay-500" style={{ marginTop:32, color:'#1e293b', fontSize:12 }}>
          🔒 Your data stays in your browser. We don't store anything on a server.
        </p>
      </div>
    </div>
  )
}
