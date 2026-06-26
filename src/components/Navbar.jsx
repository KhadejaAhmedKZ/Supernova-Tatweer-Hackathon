import { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { Rocket, LayoutDashboard, Zap, Users, Shield, Presentation, TrendingUp, Menu, X } from 'lucide-react'

const navItems = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/first-action', label: 'Idea Engine', icon: Zap },
  { to: '/agents', label: 'AI Team', icon: Users },
  { to: '/failure-prevention', label: 'Failure Prevention', icon: Shield },
  { to: '/board-meeting', label: 'Board Meeting', icon: Presentation },
  { to: '/opportunities', label: 'Opportunities', icon: TrendingUp },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const location = useLocation()

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/6 bg-navy-900/80 backdrop-blur-xl">
      <div className="section-wrap flex items-center justify-between h-16">
        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-glow-sm">
            <Rocket size={16} className="text-white" />
          </div>
          <span className="font-bold text-white text-lg tracking-tight">
            Super<span className="gradient-text">nova</span>
          </span>
        </NavLink>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-indigo-500/15 text-indigo-300 border border-indigo-500/20'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`
              }
            >
              <Icon size={15} />
              {label}
            </NavLink>
          ))}
        </nav>

        {/* CTA */}
        <NavLink
          to="/first-action"
          className="hidden lg:inline-flex btn-primary text-sm py-2 px-4"
        >
          <Zap size={15} />
          Start My First Step
        </NavLink>

        {/* Mobile toggle */}
        <button
          className="lg:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden border-t border-white/6 bg-navy-900/95 backdrop-blur-xl px-4 py-4 space-y-1">
          {navItems.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-indigo-500/15 text-indigo-300 border border-indigo-500/20'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`
              }
            >
              <Icon size={18} />
              {label}
            </NavLink>
          ))}
          <NavLink
            to="/first-action"
            onClick={() => setOpen(false)}
            className="btn-primary w-full justify-center mt-2"
          >
            <Zap size={16} />
            Start My First Step
          </NavLink>
        </div>
      )}
    </header>
  )
}
