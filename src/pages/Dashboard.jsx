import { useNavigate } from 'react-router-dom'
import { Zap, Users, Shield, Presentation, TrendingUp, ArrowRight, CheckCircle, Clock, Activity } from 'lucide-react'
import { dashboardData } from '../data/mockData'
import ScoreCard from '../components/ScoreCard'
import SectionHeader from '../components/SectionHeader'

const quickLinks = [
  { to: '/first-action',        icon: Zap,          label: 'Idea Engine',        color: '#6366f1', desc: 'Analyze your startup idea' },
  { to: '/agents',              icon: Users,         label: 'AI Team',            color: '#8b5cf6', desc: '5 expert advisors' },
  { to: '/failure-prevention',  icon: Shield,        label: 'Risk Check',         color: '#ef4444', desc: 'Avoid beginner mistakes' },
  { to: '/board-meeting',       icon: Presentation,  label: 'Board Meeting',      color: '#f59e0b', desc: 'Multi-agent debate' },
  { to: '/opportunities',       icon: TrendingUp,    label: 'Opportunities',      color: '#10b981', desc: 'Grants, funding & events' },
]

export default function Dashboard() {
  const navigate = useNavigate()
  const { businessIdea, scores, firstActionStatus, nextAction, aiTeamStatus, recommendedOpportunity } = dashboardData

  return (
    <div className="space-y-8 animate-fade-up">
      <SectionHeader
        tag="Dashboard"
        title="Welcome back, Founder"
        subtitle={`Currently working on: ${businessIdea}`}
      />

      {/* Scores */}
      <div>
        <p className="score-label mb-4">Startup Scores</p>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <ScoreCard label="Business Readiness" score={scores.readiness}    color="#6366f1" description="Ready to test" />
          <ScoreCard label="Community Fit"       score={scores.communityFit} color="#10b981" description="Strong local demand" />
          <ScoreCard label="Risk Level"          score={scores.risk}         color="#ef4444" description="Manageable risk" />
          <ScoreCard label="Confidence"          score={scores.confidence}   color="#8b5cf6" description="Good starting point" />
        </div>
      </div>

      {/* Status cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Next action */}
        <div className="glass p-6 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Activity size={14} className="text-amber-400" />
              <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">Next Action</p>
            </div>
            <span className="tag text-xs" style={{ background: 'rgba(245,158,11,0.1)', color: '#f59e0b', border: '1px solid rgba(245,158,11,0.2)' }}>
              <Clock size={10} />
              {firstActionStatus}
            </span>
          </div>
          <p className="text-white font-semibold leading-relaxed">{nextAction}</p>
          <button onClick={() => navigate('/first-action')} className="btn-primary text-sm py-2.5 group self-start">
            <Zap size={14} />
            Continue in Idea Engine
            <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* AI Team */}
        <div className="glass p-6 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Users size={14} className="text-emerald-400" />
              <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">AI Team</p>
            </div>
            <span className="tag text-xs" style={{ background: 'rgba(16,185,129,0.1)', color: '#10b981', border: '1px solid rgba(16,185,129,0.2)' }}>
              <CheckCircle size={10} />
              {aiTeamStatus}
            </span>
          </div>
          <div>
            <p className="text-white font-semibold mb-1">All 5 advisors are standing by</p>
            <p className="text-slate-500 text-sm">Strategist · Finance · Marketing · Legal · Growth</p>
          </div>
          <button onClick={() => navigate('/agents')} className="btn-secondary text-sm py-2.5 self-start">
            <Users size={14} />
            Meet Your AI Team
          </button>
        </div>
      </div>

      {/* Recommended opportunity */}
      <div
        className="p-6 rounded-2xl"
        style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
      >
        <p className="score-label mb-4">Recommended Opportunity</p>
        <div className="flex items-start gap-4">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
            style={{ background: `${recommendedOpportunity.color}18`, border: `1px solid ${recommendedOpportunity.color}20` }}
          >
            {recommendedOpportunity.emoji}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-white mb-1">{recommendedOpportunity.title}</h3>
            <p className="text-slate-400 text-sm leading-relaxed">{recommendedOpportunity.whyItHelps}</p>
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
            <button
              key={to}
              onClick={() => navigate(to)}
              className="glass-hover p-4 text-left flex flex-col gap-3 group"
            >
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                style={{ background: `${color}18`, border: `1px solid ${color}20` }}
              >
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
