import { useNavigate } from 'react-router-dom'
import {
  Rocket, Zap, Users, Shield, Presentation, TrendingUp,
  ArrowRight, CheckCircle, Star, MapPin, LayoutDashboard,
  Brain, Target, Lightbulb
} from 'lucide-react'
import Navbar from '../components/Navbar'

const stats = [
  { value: '500+', label: 'Founders Helped' },
  { value: '92%', label: 'Found First Action' },
  { value: 'AED 0', label: 'Cost to Start' },
  { value: '< 5 min', label: 'To Your First Step' },
]

const features = [
  {
    icon: Zap,
    color: '#6366f1',
    colorLight: 'rgba(99,102,241,0.12)',
    title: 'Idea-to-First-Action Engine',
    desc: 'Enter your idea and receive one clear, low-risk first step — tailored to your budget and location.',
  },
  {
    icon: Shield,
    color: '#ef4444',
    colorLight: 'rgba(239,68,68,0.12)',
    title: 'Failure Prevention AI',
    desc: 'Describe your next decision. Bedaya AI tells you the risk and a safer alternative before you spend.',
  },
  {
    icon: Users,
    color: '#8b5cf6',
    colorLight: 'rgba(139,92,246,0.12)',
    title: 'AI Startup Team',
    desc: 'Five expert advisors — strategy, finance, marketing, legal, and growth — available anytime.',
  },
  {
    icon: Presentation,
    color: '#f59e0b',
    colorLight: 'rgba(245,158,11,0.12)',
    title: 'AI Board Meeting',
    desc: 'Pitch any business decision. All five agents debate it and deliver a final recommendation.',
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
    <div className="min-h-screen bg-navy-950 text-slate-200">
      <Navbar />

      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center overflow-hidden pt-16">
        {/* Background glow blobs */}
        <div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)' }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 70%)' }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(79,70,229,0.06) 0%, transparent 70%)' }}
        />

        <div className="section-wrap relative z-10 py-20">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-sm font-medium mb-8">
              <MapPin size={14} />
              Built for Al Qua'a, Al Ain, UAE
              <Star size={12} className="text-yellow-400 fill-yellow-400" />
            </div>

            {/* Headline */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-tight mb-6">
              <span className="text-white">Your</span>{' '}
              <span className="gradient-text">AI Co-Founder</span>
              <br />
              <span className="text-white text-4xl sm:text-5xl lg:text-6xl font-bold">for First-Time Entrepreneurs</span>
            </h1>

            {/* Tagline */}
            <p className="text-xl text-slate-400 mb-4 max-w-2xl mx-auto leading-relaxed">
              You have an idea. You have a skill. But you do not know the first step.
            </p>
            <p className="text-lg text-slate-300 mb-12 max-w-xl mx-auto">
              Bedaya AI moves you from{' '}
              <span className="text-white font-semibold">"I have an idea"</span>
              {' '}to{' '}
              <span className="gradient-text font-semibold">"I know my first action."</span>
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <button onClick={() => navigate('/first-action')} className="btn-primary text-base px-8 py-4">
                <Rocket size={18} />
                Start Your First Step
                <ArrowRight size={18} />
              </button>
              <button onClick={() => navigate('/dashboard')} className="btn-secondary text-base px-8 py-4">
                <LayoutDashboard size={18} />
                View Dashboard
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto">
              {stats.map(({ value, label }) => (
                <div key={label} className="glass rounded-2xl p-4 text-center">
                  <div className="text-2xl font-bold gradient-text">{value}</div>
                  <div className="text-xs text-slate-500 mt-1">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Problem ─────────────────────────────────────────────── */}
      <section className="py-24 border-t border-white/6">
        <div className="section-wrap">
          <div className="max-w-3xl mx-auto text-center">
            <div className="tag bg-red-500/10 border border-red-500/20 text-red-400 text-xs uppercase tracking-widest mb-6">
              The Problem
            </div>
            <h2 className="text-4xl font-bold text-white mb-6">
              Great ideas die in the gap between{' '}
              <span className="text-slate-500">"I want to start"</span>
              {' '}and{' '}
              <span className="gradient-text">"I actually started."</span>
            </h2>
            <p className="text-lg text-slate-400 leading-relaxed mb-10">
              Most first-time founders in rural communities have real skills and real ideas. But without knowing what to do first — what is required, what it costs, whether it will work — they never begin. The plan stays in their head. The business never happens.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { emoji: '😰', text: 'Do not know what first step to take' },
                { emoji: '💸', text: 'Fear of wasting money on the wrong thing' },
                { emoji: '🤷', text: 'No mentor or expert to ask for guidance' },
              ].map(({ emoji, text }) => (
                <div key={text} className="glass p-5 text-center">
                  <div className="text-3xl mb-3">{emoji}</div>
                  <p className="text-slate-300 text-sm">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Solution ────────────────────────────────────────────── */}
      <section className="py-24 border-t border-white/6">
        <div className="section-wrap">
          <div className="text-center mb-14">
            <div className="tag bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs uppercase tracking-widest mb-6">
              The Solution
            </div>
            <h2 className="text-4xl font-bold text-white mb-4">
              One clear step. Not a business plan.
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Bedaya AI does not overwhelm you. It finds the one low-risk action that moves you forward — based on your idea, your location, and your budget.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map(({ icon: Icon, color, colorLight, title, desc }) => (
              <div key={title} className="glass-hover p-6">
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: colorLight }}
                >
                  <Icon size={20} style={{ color }} />
                </div>
                <h3 className="font-bold text-white mb-2">{title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Built for Al Qua'a ──────────────────────────────────── */}
      <section className="py-24 border-t border-white/6">
        <div className="section-wrap">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="tag bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs uppercase tracking-widest mb-6">
                Built for Al Qua'a
              </div>
              <h2 className="text-4xl font-bold text-white mb-4">
                Your community.{' '}
                <span className="gradient-text">Your ideas.</span>
              </h2>
              <p className="text-slate-400 text-lg leading-relaxed mb-6">
                Al Qua'a is one of the UAE's most unique communities — rich in culture, agricultural heritage, and natural beauty. Bedaya AI is built to serve founders here, with examples, pricing in AED, and advice rooted in the reality of rural life.
              </p>
              <ul className="space-y-3">
                {[
                  'Business examples using local resources like camel milk',
                  'Pricing advice in AED based on community purchasing power',
                  'Opportunities that exist specifically for rural UAE founders',
                  'No assumptions about internet speed, tech experience, or capital',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-slate-300">
                    <CheckCircle size={16} className="text-emerald-400 mt-0.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
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

      {/* ── Principles ──────────────────────────────────────────── */}
      <section className="py-24 border-t border-white/6">
        <div className="section-wrap max-w-3xl mx-auto text-center">
          <div className="tag bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs uppercase tracking-widest mb-6">
            Our Promise
          </div>
          <h2 className="text-4xl font-bold text-white mb-10">
            We are on your side.
          </h2>
          <div className="space-y-4">
            {principles.map((p) => (
              <div key={p} className="glass-hover flex items-center gap-4 px-6 py-4 text-left">
                <Star size={16} className="text-violet-400 flex-shrink-0" />
                <p className="text-slate-200 font-medium">{p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────────── */}
      <section className="py-24 border-t border-white/6">
        <div className="section-wrap max-w-2xl mx-auto text-center">
          <div
            className="rounded-3xl p-12 relative overflow-hidden border border-indigo-500/20"
            style={{ background: 'linear-gradient(135deg, rgba(79,70,229,0.15), rgba(124,58,237,0.15))' }}
          >
            <div
              className="absolute inset-0 rounded-3xl pointer-events-none"
              style={{ background: 'radial-gradient(circle at 50% 0%, rgba(99,102,241,0.2), transparent 60%)' }}
            />
            <div className="relative z-10">
              <div className="text-5xl mb-4">🌟</div>
              <h2 className="text-4xl font-bold text-white mb-4">Ready to take your first step?</h2>
              <p className="text-slate-400 text-lg mb-8">
                It takes less than 5 minutes. No registration. No cost. Just your first real move.
              </p>
              <button
                onClick={() => navigate('/first-action')}
                className="btn-primary text-lg px-10 py-5"
              >
                <Rocket size={20} />
                Start Your First Step
                <ArrowRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/6 py-8 text-center text-slate-600 text-sm">
        <div className="section-wrap">
          🌟 Bedaya AI – Your AI Co-Founder · Built for Al Qua'a, Al Ain, UAE · Hackathon Demo
        </div>
      </footer>
    </div>
  )
}

