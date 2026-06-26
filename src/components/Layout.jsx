import { Outlet, useLocation } from 'react-router-dom'
import Navbar from './Navbar'
import WorldBackground from './WorldBackground'

export default function Layout() {
  const location = useLocation()

  return (
    <div style={{ minHeight: '100vh', background: '#010008', position: 'relative' }}>
      <WorldBackground />
      <Navbar />

      <main style={{ paddingTop: 64, minHeight: '100vh', position: 'relative', zIndex: 10 }}>
        <div className="section-wrap world-content" style={{ paddingTop: 48, paddingBottom: 120 }}>
          <Outlet key={location.pathname} />
        </div>
      </main>

      {/* Sand footer strip */}
      <footer style={{ position: 'relative', zIndex: 10, borderTop: '1px solid rgba(255,190,60,0.08)', padding: '20px 0' }}>
        <div className="section-wrap world-content" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 22, height: 22, borderRadius: 7, background: 'linear-gradient(135deg,#c47010,#e8900a)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11 }}>✦</div>
            <span style={{ color: 'rgba(253,230,138,0.35)', fontSize: 12, fontWeight: 700, letterSpacing: '0.05em' }}>BEDAYA AI</span>
          </div>
          <p style={{ color: 'rgba(255,200,100,0.18)', fontSize: 11 }}>
            Al Qua'a, Al Ain, UAE · Tatweer Hackathon 2026 · 🐪 🌙 ✨
          </p>
        </div>
      </footer>
    </div>
  )
}
