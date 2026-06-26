import { useNavigate } from 'react-router-dom'
import { Zap, Users, Shield, Presentation, TrendingUp, ArrowRight, CheckCircle, Clock, Activity, AlertCircle } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { opportunities } from '../data/mockData'
import ScoreCard from '../components/ScoreCard'
import SectionHeader from '../components/SectionHeader'

const quickLinks = [
  { to: '/first-action',       icon: Zap,         label: 'Idea Engine',    color: '#6366f1', desc: 'Analyze your startup idea' },
  { to: '/agents',             icon: Users,        label: 'AI Team',        color: '#8b5cf6', desc: '5 expert advisors' },
  { to: '/failure-prevention', icon: Shield,       label: 'Risk Check',     color: '#ef4444', desc: 'Avoid beginner mistakes' },
  { to: '/board-meeting',      icon: Presentation, label: 'Board Meeting',  color: '#f59e0b', desc: 'Multi-agent debate' },
  { to: '/opportunities',      icon: TrendingUp,   label: 'Opportunities',  color: '#10b981', desc: 'Grants, funding & events' },
]

export default function Dashboard() {
  const navigate = useNavigate()
  const { session, resetSession } = useApp()
  const { form, result, decision, teamUnlocked } = session

  const hasIdea = result && form

  // Empty state — no idea submitted yet
  if (!hasIdea) return (
    <div className="space-y-8 animate-fade-up">
      <SectionHeader tag="Dashboard" title="Welcome, Founder" subtitle="Your command centre — start by analyzing your business idea." />

      <div className="glass p-10 flex flex-col items-center text-center gap-5">
        <div className="text-5xl">🌟</div>
        <div>
          <h2 className="text-xl font-bold text-white mb-2">No idea analyzed yet</h2>
          <p className="text-slate-400 text-sm max-w-sm">
            Go to the Idea Engine, enter your business idea, and your dashboard will fill with your scores, first action, and progress.
          </p>
        </div>
        <button onClick={() => navigate('/first-action')} className="btn-primary group">
          <Zap size={16} />
          Analyze My Idea
          <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      <div>
        <p className="score-label mb-4">Quick Access</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {quickLinks.map(({ to, icon: Icon, label, color, desc }) => (
            <button key={to} onClick={() => navigate(to)} className="glass-hover p-4 text-left flex flex-col gap-3 group">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                style={{ background: `${color}18`, border: `1px solid ${color}20` }}>
                <Icon size={16} style={{ color }} />
              </div>
              <div>
                <p className="text-white font-semibold text-sm">{label}</p>
                <p className="text-slate-500 text-xs mt-0.5">{desc}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )

  const statusColor = decision === 'continue' ? '#10b981' : decision === 'pause' ? '#f59e0b' : decision === 'stop' ? '#ef4444' : '#6366f1'
  const statusLabel = decision === 'continue' ? 'In Progress' : decision === 'pause' ? 'Paused' : decision === 'stop' ? 'Stopped' : 'Ready to Act'

  return (
    <div className="space-y-8 animate-fade-up">
      <div className="flex items-start justify-between flex-wrap gap-4">
        <SectionHeader
          tag="Dashboard"
          title="Your Startup Progress"
          subtitle={`Working on: ${form.idea}`}
        />
        <button onClick={() => { if (confirm('Reset your session and start a new idea?')) resetSession() }}
          className="btn-ghost text-xs text-slate-600 hover:text-red-400">
          Reset session
        </button>
      </div>

      {/* Scores */}
      <div>
        <p className="score-label mb-4">Startup Scores</p>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <ScoreCard label="Business Readiness" score={result.readinessScore}    color="#6366f1" description="Ready to test" />
          <ScoreCard label="Community Fit"       score={result.communityFitScore} color="#10b981" description="Strong local demand" />
          <ScoreCard label="Risk Level"          score={result.riskScore}         color="#ef4444" description="Manageable risk" />
          <ScoreCard label="Confidence"          score={result.confidenceScore}   color="#8b5cf6" description="Good starting point" />
        </div>
      </div>

      {/* Status cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* First action */}
        <div className="glass p-6 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Activity size={14} style={{ color: statusColor }} />
              <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">First Action</p>
            </div>
            <span className="tag text-xs" style={{ background: `${statusColor}15`, color: statusColor, border: `1px solid ${statusColor}25` }}>
              <Clock size={10} /> {statusLabel}
            </span>
          </div>
          <p className="text-white font-semibold leading-relaxed text-sm">{result.firstAction}</p>
          <button onClick={() => navigate('/first-action')} className="btn-primary text-sm py-2.5 group self-start">
            <Zap size={14} /> View Full Analysis
            <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* AI Team */}
        <div className="glass p-6 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Users size={14} className={teamUnlocked ? 'text-emerald-400' : 'text-slate-500'} />
              <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">AI Team</p>
            </div>
            <span className="tag text-xs" style={{
              background: teamUnlocked ? 'rgba(16,185,129,0.1)' : 'rgba(255,255,255,0.05)',
              color: teamUnlocked ? '#10b981' : '#64748b',
              border: `1px solid ${teamUnlocked ? 'rgba(16,185,129,0.2)' : 'rgba(255,255,255,0.08)'}`,
            }}>
              {teamUnlocked ? <><CheckCircle size={10} /> Unlocked</> : '🔒 Locked'}
            </span>
          </div>
          {teamUnlocked ? (
            <>
              <p className="text-white font-semibold mb-1 text-sm">All 5 advisors ready for <span className="gradient-text">{form.idea.slice(0, 30)}{form.idea.length > 30 ? '...' : ''}</span></p>
              <p className="text-slate-500 text-xs">Strategist · Finance · Marketing · Legal · Growth</p>
              <button onClick={() => navigate('/agents')} className="btn-primary text-sm py-2.5 self-start">
                <Users size={14} /> Ask Your Advisors
              </button>
            </>
          ) : (
            <>
              <p className="text-slate-400 text-sm">Complete the Idea Engine and click <strong className="text-white">Continue</strong> to unlock your AI team.</p>
              <button onClick={() => navigate('/first-action')} className="btn-secondary text-sm py-2.5 self-start">
                <Zap size={14} /> Go to Idea Engine
              </button>
            </>
          )}
        </div>
      </div>

      {/* Your details */}
      <div className="glass p-6">
        <p className="score-label mb-4">Your Startup Details</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
          {[
            { label: 'Location',  value: form.location || 'Not set' },
            { label: 'Budget',    value: form.budget ? `AED ${form.budget}` : 'Not set' },
            { label: 'Hours/Week', value: form.hours ? `${form.hours} hrs` : 'Not set' },
            { label: 'Sales Mode', value: form.sellMode || 'Not set' },
          ].map(({ label, value }) => (
            <div key={label} className="rounded-xl p-3" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
              <p className="text-slate-600 text-xs uppercase tracking-wider font-semibold mb-1">{label}</p>
              <p className="text-white font-medium text-sm capitalize">{value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Recommended opportunity */}
      <div className="glass p-6">
        <p className="score-label mb-4">Recommended Opportunity</p>
        <div className="flex items-start gap-4">
          <div className="w-11 h-11 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
            style={{ background: `${opportunities[0].color}18`, border: `1px solid ${opportunities[0].color}20` }}>
            {opportunities[0].emoji}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-white mb-1 text-sm">{opportunities[0].title}</h3>
            <p className="text-slate-400 text-sm leading-relaxed">{opportunities[0].whyItHelps}</p>
            <button onClick={() => navigate('/opportunities')} className="btn-ghost text-sm mt-3 px-0 text-indigo-400 hover:text-indigo-300">
              View all opportunities <ArrowRight size={13} className="inline ml-1" />
            </button>
          </div>
        </div>
      </div>

      {/* Quick links */}
      <div>
        <p className="score-label mb-4">Quick Access</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {quickLinks.map(({ to, icon: Icon, label, color, desc }) => (
            <button key={to} onClick={() => navigate(to)} className="glass-hover p-4 text-left flex flex-col gap-3 group">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                style={{ background: `${color}18`, border: `1px solid ${color}20` }}>
                <Icon size={16} style={{ color }} />
              </div>
              <div>
                <p className="text-white font-semibold text-sm">{label}</p>
                <p className="text-slate-500 text-xs mt-0.5">{desc}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
