import { Outlet, useLocation } from 'react-router-dom'
import Navbar from './Navbar'
import StarField from './StarField'

export default function Layout() {
  const location = useLocation()

  return (
    <div style={{ background: '#04060f', minHeight: '100vh', position: 'relative' }}>
      {/* Subtle star background on inner pages */}
      <StarField />

      {/* Ambient glows */}
      <div style={{ position:'fixed', inset:0, zIndex:1, pointerEvents:'none' }}>
        <div style={{ position:'absolute', top:'-10%', left:'10%',  width:500, height:500, borderRadius:'50%', background:'radial-gradient(circle, rgba(124,58,237,0.08) 0%, transparent 65%)', filter:'blur(60px)' }} />
        <div style={{ position:'absolute', bottom:'0%', right:'10%', width:400, height:400, borderRadius:'50%', background:'radial-gradient(circle, rgba(56,189,248,0.05) 0%, transparent 65%)', filter:'blur(60px)' }} />
        <div style={{ position:'absolute', top:'40%', left:'50%', transform:'translateX(-50%)', width:700, height:200, borderRadius:'50%', background:'radial-gradient(ellipse, rgba(251,146,60,0.04) 0%, transparent 70%)', filter:'blur(40px)' }} />
      </div>

      <Navbar />

      <main style={{ paddingTop:64, minHeight:'100vh', position:'relative', zIndex:2 }}>
        <div className="section-wrap" style={{ paddingTop:48, paddingBottom:80 }}>
          <Outlet key={location.pathname} />
        </div>
      </main>

      <footer style={{ position:'relative', zIndex:2, borderTop:'1px solid rgba(255,255,255,0.04)', padding:'24px 0' }}>
        <div className="section-wrap" style={{ display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:12 }}>
          <div style={{ display:'flex', alignItems:'center', gap:8 }}>
            <div style={{ width:20, height:20, borderRadius:6, background:'linear-gradient(135deg,#7c3aed,#4f46e5)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:10 }}>✦</div>
            <span style={{ color:'#1e293b', fontSize:12, fontWeight:600 }}>Bedaya AI</span>
          </div>
          <p style={{ color:'#1e293b', fontSize:11 }}>
            Al Qua'a, Al Ain, UAE · Tatweer Hackathon 2026 · 🐪 🌙 ✨
          </p>
        </div>
      </footer>
    </div>
  )
}
