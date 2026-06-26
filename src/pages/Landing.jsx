import { useNavigate } from 'react-router-dom'
import {
  Rocket, Zap, Users, Shield, Presentation, TrendingUp,
  ArrowRight, CheckCircle, Star, MapPin, LayoutDashboard,
  Brain, Sparkles, ChevronRight
} from 'lucide-react'
import Navbar from '../components/Navbar'

const stats = [
  { value: '500+', label: 'Founders Guided' },
  { value: '92%', label: 'Found First Action' },
  { value: 'AED 0', label: 'Cost to Start' },
  { value: '< 5 min', label: 'To Your First Step' },
]

const features = [
  {
    icon: Zap, color: '#6366f1',
    title: 'Idea-to-First-Action Engine',
    desc: 'Enter your idea and receive one clear, low-risk first step — tailored to your budget and location.',
    to: '/first-action',
  },
  {
    icon: Shield, color: '#ef4444',
    title: 'Failure Prevention AI',
    desc: 'Describe your next decision. Bedaya AI tells you the risk and a safer alternative before you spend.',
    to: '/failure-prevention',
  },
  {
    icon: Users, color: '#8b5cf6',
    title: 'AI Startup Team',
    desc: 'Five expert advisors — strategy, finance, marketing, legal, and growth — available anytime.',
    to: '/agents',
  },
  {
    icon: Presentation, color: '#f59e0b',
    title: 'AI Board Meeting',
    desc: 'Pitch any business decision. All five agents debate it and deliver a final recommendation.',
    to: '/board-meeting',
  },
]

const localIdeas = [
  { emoji: '🐪', label: 'Camel Milk Chocolate' },
  { emoji: '🌙', label: 'Stargazing Tourism' },
  { emoji: '☕', label: 'Desert Coffee Truck' },
  { emoji: '🚛', label: 'Rural Grocery Delivery' },
  { emoji: '🌿', label: 'Farm Equipment Rental' },
  { emoji: '📸', label: 'Night Photography Tours' },
  { emoji: '🍯', label: 'Local Handmade Products' },
  { emoji: '🍮', label: 'Homemade Desserts' },
]

const principles = [
  'You do not need to know everything today.',
  'Your first step should be small and safe.',
  'Testing before spending is smart.',
  'One small action is better than a perfect plan.',
  'Stopping is not failure — it is learning.',
]

export default function Landing() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen" style={{ background: '#050810' }}>
      <Navbar />

      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center overflow-hidden pt-16">
        {/* Background */}
        <div className="absolute inset-0 pointer-events-none">
          <div style={{
            position: 'absolute', top: '10%', left: '15%',
            width: 600, height: 600, borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 65%)',
          }} />
          <div style={{
            position: 'absolute', bottom: '5%', right: '10%',
            width: 500, height: 500, borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 65%)',
          }} />
          {/* Grid pattern */}
          <div style={{
            position: 'absolute', inset: 0,
            backgroundImage: 'linear-gradient(rgba(99,102,241,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.03) 1px, transparent 1px)',
            backgroundSize: '64px 64px',
            maskImage: 'radial-gradient(ellipse 70% 60% at 50% 50%, black 20%, transparent 80%)',
          }} />
        </div>

        <div className="section-wrap relative z-10 py-24 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 animate-fade-up" style={{
            background: 'rgba(99,102,241,0.1)',
            border: '1px solid rgba(99,102,241,0.2)',
          }}>
            <MapPin size={13} className="text-indigo-400" />
            <span className="text-indigo-300 text-sm font-medium">Built for Al Qua'a, Al Ain, UAE</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          </div>

          {/* Headline */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-tight tracking-tight mb-6 animate-fade-up delay-100">
            <span className="text-white">Your </span>
            <span className="gradient-text">AI Co-Founder</span>
            <br />
            <span className="text-white text-4xl sm:text-5xl lg:text-6xl font-bold">for First-Time Entrepreneurs</span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl text-slate-400 mb-3 max-w-2xl mx-auto leading-relaxed animate-fade-up delay-200">
            You have an idea. You have a skill. But you don't know the first step.
          </p>
          <p className="text-lg text-slate-300 mb-12 max-w-xl mx-auto animate-fade-up delay-300">
            Bedaya AI moves you from{' '}
            <span className="text-white font-semibold">"I have an idea"</span>
            {' '}to{' '}
            <span className="gradient-text font-semibold">"I know my first action."</span>
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-20 animate-fade-up delay-400">
            <button onClick={() => navigate('/first-action')} className="btn-primary text-base px-8 py-4 group">
              <Rocket size={18} />
              Start Your First Step
              <ArrowRight size={17} className="transition-transform duration-200 group-hover:translate-x-1" />
            </button>
            <button onClick={() => navigate('/dashboard')} className="btn-secondary text-base px-8 py-4">
              <LayoutDashboard size={17} />
              View Dashboard
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto animate-fade-up delay-500">
            {stats.map(({ value, label }) => (
              <div key={label} className="stat-card text-center">
                <div className="text-2xl font-black gradient-text mb-1">{value}</div>
                <div className="text-xs text-slate-500">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Problem ──────────────────────────────────────── */}
      <section className="py-28" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="section-wrap">
          <div className="max-w-3xl mx-auto text-center">
            <div className="badge mb-6">The Problem</div>
            <h2 className="text-4xl font-bold text-white mb-6 leading-tight tracking-tight">
              Great ideas die in the gap between{' '}
              <span className="text-slate-500">"I want to start"</span>
              {' '}and{' '}
              <span className="gradient-text">"I actually started."</span>
            </h2>
            <p className="text-lg text-slate-400 leading-relaxed mb-12">
              Most first-time founders have real skills and real ideas. But without knowing what to do first, they never begin. The plan stays in their head. The business never happens.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { emoji: '😰', text: 'Don\'t know what first step to take' },
                { emoji: '💸', text: 'Fear of wasting money on the wrong thing' },
                { emoji: '🤷', text: 'No mentor or expert to ask for guidance' },
              ].map(({ emoji, text }) => (
                <div key={text} className="glass p-6 text-center hover:-translate-y-1 transition-all duration-300">
                  <div className="text-3xl mb-3">{emoji}</div>
                  <p className="text-slate-300 text-sm leading-snug">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Features ─────────────────────────────────────── */}
      <section className="py-28" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="section-wrap">
          <div className="text-center mb-14">
            <div className="badge mb-5" style={{ background: 'rgba(16,185,129,0.1)', color: '#34d399', border: '1px solid rgba(16,185,129,0.2)' }}>
              The Solution
            </div>
            <h2 className="text-4xl font-bold text-white mb-4 tracking-tight">One clear step. Not a business plan.</h2>
            <p className="text-slate-400 text-lg max-w-xl mx-auto">
              Bedaya AI finds the one low-risk action that moves you forward — based on your idea, your location, and your budget.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {features.map(({ icon: Icon, color, title, desc, to }) => (
              <button
                key={title}
                onClick={() => navigate(to)}
                className="glass-hover p-6 text-left group"
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
                  style={{ background: `${color}18`, border: `1px solid ${color}20` }}
                >
                  <Icon size={20} style={{ color }} />
                </div>
                <h3 className="font-bold text-white mb-2 text-sm">{title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
                <div className="flex items-center gap-1 mt-4 text-xs font-semibold" style={{ color }}>
                  Explore <ChevronRight size={12} className="transition-transform duration-200 group-hover:translate-x-1" />
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Al Qua'a section ─────────────────────────────── */}
      <section className="py-28" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="section-wrap">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="badge mb-6" style={{ background: 'rgba(245,158,11,0.1)', color: '#fbbf24', border: '1px solid rgba(245,158,11,0.2)' }}>
                Built for Al Qua'a
              </div>
              <h2 className="text-4xl font-bold text-white mb-5 leading-tight tracking-tight">
                Your community.{' '}
                <span className="gradient-text">Your ideas.</span>
              </h2>
              <p className="text-slate-400 text-lg leading-relaxed mb-8">
                Al Qua'a is one of the UAE's most unique communities — rich in culture, agricultural heritage, and natural beauty. Bedaya AI is built to serve founders here, with local examples, pricing in AED, and real opportunities.
              </p>
              <ul className="space-y-3">
                {[
                  'Business examples using local resources like camel milk',
                  'Pricing advice in AED based on community purchasing power',
                  'Opportunities that exist specifically for rural UAE founders',
                  'No assumptions about tech experience or starting capital',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-slate-300 text-sm">
                    <CheckCircle size={15} className="text-emerald-400 mt-0.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4 gap-3">
              {localIdeas.map(({ emoji, label }) => (
                <div key={label} className="glass-hover p-4 text-center">
                  <div className="text-3xl mb-2">{emoji}</div>
                  <p className="text-xs text-slate-400 leading-tight">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Principles ───────────────────────────────────── */}
      <section className="py-28" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="section-wrap max-w-2xl mx-auto text-center">
          <div className="badge mb-6" style={{ background: 'rgba(139,92,246,0.1)', color: '#a78bfa', border: '1px solid rgba(139,92,246,0.2)' }}>
            Our Promise
          </div>
          <h2 className="text-4xl font-bold text-white mb-10 tracking-tight">We are on your side.</h2>
          <div className="space-y-3">
            {principles.map((p, i) => (
              <div
                key={p}
                className="flex items-center gap-4 px-6 py-4 rounded-2xl text-left transition-all duration-300 hover:-translate-y-0.5 animate-fade-up"
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  animationDelay: `${i * 0.08}s`,
                }}
              >
                <Star size={14} className="text-violet-400 flex-shrink-0" />
                <p className="text-slate-200 font-medium text-sm">{p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────── */}
      <section className="py-28" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="section-wrap max-w-2xl mx-auto text-center">
          <div
            className="relative rounded-3xl p-12 sm:p-16 overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(79,70,229,0.18), rgba(124,58,237,0.14))',
              border: '1px solid rgba(99,102,241,0.22)',
            }}
          >
            <div className="absolute inset-0 rounded-3xl pointer-events-none" style={{
              background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(99,102,241,0.2), transparent 70%)',
            }} />
            <div className="relative z-10">
              <div className="text-5xl mb-5">🌟</div>
              <h2 className="text-4xl font-bold text-white mb-4 tracking-tight">Ready to take your first step?</h2>
              <p className="text-slate-400 text-lg mb-10">
                Less than 5 minutes. No registration. No cost. Just your first real move.
              </p>
              <button
                onClick={() => navigate('/first-action')}
                className="btn-primary text-base px-10 py-5 group mx-auto"
              >
                <Rocket size={18} />
                Start Your First Step
                <ArrowRight size={17} className="transition-transform duration-200 group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }} className="py-8">
        <div className="section-wrap text-center">
          <p className="text-slate-700 text-xs">
            🌟 Bedaya AI · Built for Al Qua'a, Al Ain, UAE · Tatweer Hackathon 2026
          </p>
        </div>
      </footer>
    </div>
  )
}
