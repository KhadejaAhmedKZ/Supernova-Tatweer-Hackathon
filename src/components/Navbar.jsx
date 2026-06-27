import { useState, useEffect } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { Rocket, LayoutDashboard, Zap, Users, Shield, Presentation, TrendingUp, Map, Menu, X } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { JOURNEY_STAGES } from '../context/AppContext'

const navItems = [
  { to:'/dashboard',          label:'Dashboard',    icon:LayoutDashboard },
  { to:'/start',              label:'Idea Engine',  icon:Zap             },
  { to:'/market-discovery',   label:'Market AI',    icon:Map             },
  { to:'/agents',             label:'AI Team',      icon:Users           },
  { to:'/failure-prevention', label:'Risk Check',   icon:Shield          },
  { to:'/board-meeting',      label:'Board',        icon:Presentation    },
  { to:'/opportunities',      label:'Opportunities',icon:TrendingUp      },
]

export default function Navbar() {
  const [open,    setOpen]    = useState(false)
  const [scrolled,setScrolled]= useState(false)
  const navigate  = useNavigate()
  const location  = useLocation()
  const { session, hasStarted } = useApp()

  const journeyProgress = session.completedStages?.length || 0
  const journeyTotal    = JOURNEY_STAGES.length
  const progressPct     = Math.round((journeyProgress / journeyTotal) * 100)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', fn, { passive:true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => { setOpen(false) }, [location.pathname])

  return (
    <header style={{
      position:'fixed', top:0, left:0, right:0, zIndex:50,
      backdropFilter:'blur(24px) saturate(180%)',
      WebkitBackdropFilter:'blur(24px) saturate(180%)',
      transition:'all 0.3s ease',
      background: scrolled ? 'rgba(1,0,8,0.9)' : 'rgba(1,0,8,0.65)',
      borderBottom: scrolled ? '1px solid rgba(255,180,50,0.1)' : '1px solid transparent',
      boxShadow: scrolled ? '0 2px 40px rgba(0,0,0,0.6)' : 'none',
    }}>
      <div className="section-wrap" style={{ display:'flex', alignItems:'center', justifyContent:'space-between', height:60 }}>

        {/* Logo */}
        <NavLink to="/" style={{ display:'flex', alignItems:'center', gap:9, textDecoration:'none', flexShrink:0 }}>
          <div style={{ width:32, height:32, borderRadius:10, background:'linear-gradient(135deg,#c47010,#f59e0b)', display:'flex', alignItems:'center', justifyContent:'center', boxShadow:'0 4px 12px rgba(200,112,16,0.4)', transition:'transform 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.transform='scale(1.1)'}
            onMouseLeave={e => e.currentTarget.style.transform='scale(1)'}>
            <span style={{ fontSize:15 }}>🌟</span>
          </div>
          <div>
            <span style={{ fontWeight:800, fontSize:14, letterSpacing:'-0.01em' }}>
              <span style={{ color:'#fde68a' }}>Bedaya</span>{' '}
              <span className="gradient-text-sky">AI</span>
            </span>
            {/* Journey progress bar under logo */}
            {hasStarted && (
              <div style={{ width:60, height:2, borderRadius:99, background:'rgba(255,255,255,0.08)', marginTop:3, overflow:'hidden' }}>
                <div style={{ height:'100%', borderRadius:99, background:'linear-gradient(90deg,#f59e0b,#34d399)', width:`${progressPct}%`, transition:'width 0.5s ease' }} />
              </div>
            )}
          </div>
        </NavLink>

        {/* Desktop nav — only show when user has started */}
        <nav style={{ display:'flex', alignItems:'center', gap:1 }} className="hidden-mobile">
          {navItems.map(({ to, label, icon:Icon }) => (
            <NavLink key={to} to={to}
              className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
              style={{ textDecoration:'none' }}>
              <Icon size={13} />
              {label}
            </NavLink>
          ))}
        </nav>

        {/* CTA — changes based on state */}
        <div className="hidden-mobile">
          {session.result ? (
            <button onClick={() => navigate('/dashboard')} className="btn-primary" style={{ fontSize:12, padding:'8px 16px' }}>
              <LayoutDashboard size={13} /> My Dashboard
            </button>
          ) : (
            <button onClick={() => navigate('/welcome')} className="btn-primary" style={{ fontSize:12, padding:'8px 16px' }}>
              <Zap size={13} /> Start My Journey
            </button>
          )}
        </div>

        {/* Mobile toggle */}
        <button onClick={() => setOpen(!open)}
          style={{ display:'none', padding:8, borderRadius:10, background:open?'rgba(255,180,50,0.1)':'transparent', border:'none', cursor:'pointer', color:'#fde68a' }}
          className="show-mobile"
          aria-label="Toggle menu">
          {open ? <X size={20}/> : <Menu size={20}/>}
        </button>
      </div>

      {/* Journey progress bar — full width, sits under nav */}
      {hasStarted && journeyProgress > 0 && (
        <div style={{ height:2, background:'rgba(255,255,255,0.04)', overflow:'hidden' }}>
          <div style={{ height:'100%', background:'linear-gradient(90deg,#f59e0b,#fbbf24,#34d399)', width:`${progressPct}%`, transition:'width 0.6s ease', boxShadow:'0 0 8px rgba(245,158,11,0.4)' }} />
        </div>
      )}

      {/* Mobile drawer */}
      {open && (
        <div style={{ padding:'8px 16px 16px', borderTop:'1px solid rgba(255,180,50,0.08)', background:'rgba(1,0,8,0.95)', backdropFilter:'blur(24px)', display:'flex', flexDirection:'column', gap:4 }}>
          {navItems.map(({ to, label, icon:Icon }) => (
            <NavLink key={to} to={to}
              className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
              style={{ textDecoration:'none', fontSize:14, padding:'12px 14px' }}>
              <Icon size={16} /> {label}
            </NavLink>
          ))}
          <div style={{ height:1, background:'rgba(255,180,50,0.06)', margin:'8px 0' }} />
          {session.result ? (
            <button onClick={() => navigate('/dashboard')} className="btn-primary" style={{ justifyContent:'center' }}>
              <LayoutDashboard size={15} /> My Dashboard
            </button>
          ) : (
            <button onClick={() => navigate('/welcome')} className="btn-primary" style={{ justifyContent:'center' }}>
              <Zap size={15} /> Start My Journey
            </button>
          )}
        </div>
      )}

      <style>{`
        @media(min-width:1024px){ .show-mobile{display:none!important} }
        @media(max-width:1023px){ .hidden-mobile{display:none!important} .show-mobile{display:flex!important} }
      `}</style>
    </header>
  )
}
