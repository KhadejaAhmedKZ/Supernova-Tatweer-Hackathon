import { useState, useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { Rocket, LayoutDashboard, Zap, Users, Shield, Presentation, TrendingUp, Menu, X } from 'lucide-react'

const navItems = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/start', label: 'Idea Engine', icon: Zap },
  { to: '/agents', label: 'AI Team', icon: Users },
  { to: '/failure-prevention', label: 'Risk Check', icon: Shield },
  { to: '/board-meeting', label: 'Board', icon: Presentation },
  { to: '/opportunities', label: 'Opportunities', icon: TrendingUp },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled
          ? 'rgba(5,8,16,0.85)'
          : 'rgba(5,8,16,0.6)',
        backdropFilter: 'blur(20px) saturate(180%)',
        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
        borderBottom: scrolled
          ? '1px solid rgba(255,255,255,0.07)'
          : '1px solid transparent',
        boxShadow: scrolled ? '0 1px 40px rgba(0,0,0,0.4)' : 'none',
      }}
    >
      <div className="section-wrap flex items-center justify-between h-16">
        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-2.5 group shrink-0">
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
            style={{
              background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
              boxShadow: '0 4px 14px rgba(99,102,241,0.4)',
            }}
          >
            <Rocket size={15} className="text-white" />
          </div>
          <span className="font-bold text-white text-base tracking-tight">
            Bedaya{' '}
            <span className="gradient-text">AI</span>
          </span>
        </NavLink>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-0.5">
          {navItems.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `nav-link ${isActive ? 'active' : ''}`
              }
            >
              <Icon size={14} />
              {label}
            </NavLink>
          ))}
        </nav>

        {/* CTA */}
        <NavLink
          to="/welcome"
          className="hidden lg:inline-flex btn-primary py-2 px-4 text-xs"
        >
          <Zap size={13} />
          Start My First Step
        </NavLink>

        {/* Mobile toggle */}
        <button
          className="lg:hidden p-2 rounded-xl text-slate-400 hover:text-white transition-colors"
          style={{ background: open ? 'rgba(255,255,255,0.08)' : 'transparent' }}
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div
          className="lg:hidden px-4 pb-4 pt-2 animate-fade-up"
          style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
        >
          <div className="space-y-1">
            {navItems.map(({ to, label, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-indigo-500/12 text-indigo-300 border border-indigo-500/20'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`
                }
              >
                <Icon size={16} />
                {label}
              </NavLink>
            ))}
          </div>
          <NavLink
            to="/welcome"
            onClick={() => setOpen(false)}
            className="btn-primary w-full justify-center mt-3"
          >
            <Zap size={15} />
            Start My First Step
          </NavLink>
        </div>
      )}
    </header>
  )
}
