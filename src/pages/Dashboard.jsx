import { useNavigate } from 'react-router-dom'
import { Zap, Users, Shield, Presentation, TrendingUp, ArrowRight, CheckCircle, Clock } from 'lucide-react'
import { dashboardData, opportunities } from '../data/mockData'
import ScoreCard from '../components/ScoreCard'
import SectionHeader from '../components/SectionHeader'

const quickLinks = [
  { to: '/first-action', icon: Zap, label: 'Idea Engine', color: '#6366f1', colorLight: 'rgba(99,102,241,0.12)', desc: 'Analyze your startup idea' },
  { to: '/agents', icon: Users, label: 'AI Team', color: '#8b5cf6', colorLight: 'rgba(139,92,246,0.12)', desc: '5 expert advisors' },
  { to: '/failure-prevention', icon: Shield, label: 'Risk Check', color: '#ef4444', colorLight: 'rgba(239,68,68,0.12)', desc: 'Avoid beginner mistakes' },
  { to: '/board-meeting', icon: Presentation, label: 'Board Meeting', color: '#f59e0b', colorLight: 'rgba(245,158,11,0.12)', desc: 'Multi-agent debate' },
  { to: '/opportunities', icon: TrendingUp, label: 'Opportunities', color: '#10b981', colorLight: 'rgba(16,185,129,0.12)', desc: 'Grants, funding & events' },
]

export default function Dashboard() {
  const navigate = useNavigate()
  const { businessIdea, scores, firstActionStatus, nextAction, aiTeamStatus, recommendedOpportunity } = dashboardData

  return (
    <div className="space-y-10 animate-fade-up">
      <SectionHeader
        tag="Dashboard"
        title="Welcome back, Founder"
        subtitle={`Currently working on: ${businessIdea}`}
      />

      {/* Score grid */}
      <div>
        <p className="score-label mb-4">Your Startup Scores</p>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <ScoreCard label="Business Readiness" score={scores.readiness} color="#6366f1" description="You are ready to test" />
          <ScoreCard label="Community Fit" score={scores.communityFit} color="#10b981" description="Strong local demand" />
          <ScoreCard label="Risk Level" score={scores.risk} color="#ef4444" description="Manageable risk" />
          <ScoreCard label="Confidence" score={scores.confidence} color="#8b5cf6" description="Good starting point" />
        </div>
      </div>

      {/* Status cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Next action */}
        <div className="glass p-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Next Action</p>
            <span className="tag text-xs ml-auto" style={{ background: 'rgba(245,158,11,0.12)', color: '#f59e0b' }}>
              <Clock size={10} />
              {firstActionStatus}
            </span>
          </div>
          <p className="text-white font-semibold mb-4 leading-relaxed">{nextAction}</p>
          <button onClick={() => navigate('/first-action')} className="btn-primary text-sm py-2">
            <Zap size={14} />
            Continue in Idea Engine
            <ArrowRight size={14} />
          </button>
        </div>

        {/* AI Team status */}
        <div className="glass p-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">AI Team</p>
            <span className="tag text-xs ml-auto" style={{ background: 'rgba(16,185,129,0.12)', color: '#10b981' }}>
              <CheckCircle size={10} />
              {aiTeamStatus}
            </span>
          </div>
          <p className="text-white font-semibold mb-1">All 5 advisors are standing by</p>
          <p className="text-slate-400 text-sm mb-4">Strategist · Finance · Marketing · Legal · Growth</p>
          <button onClick={() => navigate('/agents')} className="btn-secondary text-sm py-2">
            <Users size={14} />
            Meet Your AI Team
          </button>
        </div>
      </div>

      {/* Recommended opportunity */}
      <div className="glass p-6">
        <p className="score-label mb-4">Recommended Opportunity</p>
        <div className="flex items-start gap-4">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
            style={{ background: recommendedOpportunity.colorLight }}
          >
            {recommendedOpportunity.emoji}
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-white">{recommendedOpportunity.title}</h3>
            <p className="text-slate-400 text-sm mt-1 leading-relaxed">{recommendedOpportunity.whyItHelps}</p>
            <button onClick={() => navigate('/opportunities')} className="btn-ghost text-sm mt-3 px-0">
              View all opportunities <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Quick links */}
      <div>
        <p className="score-label mb-4">Quick Access</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {quickLinks.map(({ to, icon: Icon, label, color, colorLight, desc }) => (
            <button
              key={to}
              onClick={() => navigate(to)}
              className="glass-hover p-4 text-left flex flex-col gap-3"
            >
              <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: colorLight }}>
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
