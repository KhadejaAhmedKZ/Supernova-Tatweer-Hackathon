import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { Rocket, LayoutDashboard, Zap, Users, Shield, Presentation, TrendingUp, Menu, X } from 'lucide-react'

const navItems = [
  { to: '/dashboard',          label: 'Dashboard',    icon: LayoutDashboard },
  { to: '/start',              label: 'Idea Engine',  icon: Zap             },
  { to: '/agents',             label: 'AI Team',      icon: Users           },
  { to: '/failure-prevention', label: 'Risk Check',   icon: Shield          },
  { to: '/board-meeting',      label: 'Board',        icon: Presentation    },
  { to: '/opportunities',      label: 'Opportunities',icon: TrendingUp      },
]

export default function Navbar() {
  const [open, setOpen]       = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const headerStyle = {
    position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
    backdropFilter: 'blur(24px) saturate(180%)',
    WebkitBackdropFilter: 'blur(24px) saturate(180%)',
    transition: 'all 0.3s ease',
    background: scrolled ? 'rgba(1,0,8,0.88)' : 'rgba(1,0,8,0.6)',
    borderBottom: scrolled ? '1px solid rgba(255,180,50,0.1)' : '1px solid transparent',
    boxShadow: scrolled ? '0 2px 40px rgba(0,0,0,0.6)' : 'none',
  }

  return (
    <header style={headerStyle}>
      <div className="section-wrap" style={{ display:'flex', alignItems:'center', justifyContent:'space-between', height:64 }}>

        {/* Logo */}
        <NavLink to="/" style={{ display:'flex', alignItems:'center', gap:10, textDecoration:'none', flexShrink:0 }}>
          <div style={{ width:34, height:34, borderRadius:10, background:'linear-gradient(135deg,#c47010,#e8900a,#f5b030)', display:'flex', alignItems:'center', justifyContent:'center', boxShadow:'0 4px 14px rgba(200,120,10,0.45)', transition:'transform 0.3s' }}
            onMouseEnter={e=>e.currentTarget.style.transform='scale(1.12)'}
            onMouseLeave={e=>e.currentTarget.style.transform='scale(1)'}>
            <span style={{ fontSize:16 }}>🌟</span>
          </div>
          <span style={{ fontWeight:800, fontSize:15, letterSpacing:'-0.01em' }}>
            <span style={{ color:'#fde68a' }}>Bedaya</span>
            {' '}
            <span className="gradient-text-sky">AI</span>
          </span>
        </NavLink>

        {/* Desktop nav */}
        <nav style={{ display:'flex', alignItems:'center', gap:2 }} className="hidden-mobile">
          {navItems.map(({ to, label, icon: Icon }) => (
            <NavLink key={to} to={to}
              className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
              style={{ textDecoration:'none' }}>
              <Icon size={13} />
              {label}
            </NavLink>
          ))}
        </nav>

        {/* CTA */}
        <NavLink to="/welcome" className="btn-primary hidden-mobile" style={{ fontSize:12, padding:'9px 18px', textDecoration:'none' }}>
          <Zap size={13} />
          Start My Journey
        </NavLink>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          style={{ display:'none', padding:8, borderRadius:10, background:open?'rgba(255,180,50,0.1)':'transparent', border:'none', cursor:'pointer', color:'#fde68a' }}
          className="show-mobile"
          aria-label="Toggle menu">
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div style={{ padding:'8px 16px 16px', borderTop:'1px solid rgba(255,180,50,0.08)', display:'flex', flexDirection:'column', gap:4 }}>
          {navItems.map(({ to, label, icon: Icon }) => (
            <NavLink key={to} to={to} onClick={() => setOpen(false)}
              className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
              style={{ textDecoration:'none', fontSize:14 }}>
              <Icon size={16} />
              {label}
            </NavLink>
          ))}
          <NavLink to="/welcome" onClick={() => setOpen(false)} className="btn-primary" style={{ marginTop:8, justifyContent:'center', textDecoration:'none' }}>
            <Zap size={15} /> Start My Journey
          </NavLink>
        </div>
      )}

      <style>{`
        @media (min-width: 1024px) { .show-mobile { display: none !important; } }
        @media (max-width: 1023px) { .hidden-mobile { display: none !important; } .show-mobile { display: flex !important; } }
      `}</style>
    </header>
  )
}
