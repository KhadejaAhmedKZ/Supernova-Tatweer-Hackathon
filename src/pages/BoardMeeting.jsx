import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Presentation, Send, RotateCcw, Gavel, History, Zap } from 'lucide-react'
import { getBoardOpinions } from '../data/mockData'
import { useApp } from '../context/AppContext'
import BoardOpinionCard from '../components/BoardOpinionCard'
import SectionHeader from '../components/SectionHeader'

const examples = [
  'I want to add delivery to my dessert business.',
  'I want to launch an Instagram page.',
  'I want to hire a part-time helper.',
  'I want to sell at the Al Ain Oasis market.',
  'I want to buy equipment worth AED 3000.',
]

export default function BoardMeeting() {
  const navigate = useNavigate()
  const { session, saveBoardPitch } = useApp()
  const { form, result, boardHistory } = session

  const [pitch, setPitch] = useState('')
  const [opinions, setOpinions] = useState([])
  const [visibleCount, setVisibleCount] = useState(0)
  const [showFinal, setShowFinal] = useState(false)
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [showHistory, setShowHistory] = useState(false)

  const startMeeting = () => {
    if (!pitch.trim()) return
    setLoading(true); setSubmitted(true)
    setOpinions([]); setVisibleCount(0); setShowFinal(false)
    setTimeout(() => {
      const ops = getBoardOpinions(pitch)
      setOpinions(ops)
      saveBoardPitch(pitch, ops)    // persist to session
      setLoading(false)
    }, 1000)
  }

  useEffect(() => {
    if (!opinions.length) return
    let count = 0
    const interval = setInterval(() => {
      count++; setVisibleCount(count)
      if (count >= opinions.length) { clearInterval(interval); setTimeout(() => setShowFinal(true), 600) }
    }, 950)
    return () => clearInterval(interval)
  }, [opinions])

  const reset = () => { setPitch(''); setOpinions([]); setVisibleCount(0); setShowFinal(false); setSubmitted(false); setLoading(false) }

  if (!result) return (
    <div className="max-w-xl mx-auto text-center py-16 animate-fade-up space-y-5">
      <div className="text-5xl">🏛️</div>
      <h2 className="text-2xl font-bold text-white">Board isn't convened yet</h2>
      <p className="text-slate-400 text-sm leading-relaxed">
        The AI Board Meeting works best once you have submitted your business idea. Your board will debate decisions in the context of your specific startup.
      </p>
      <button onClick={() => navigate('/first-action')} className="btn-primary mx-auto">
        <Zap size={15} /> Analyze My Idea First
      </button>
    </div>
  )

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-fade-up">
      <div className="flex items-start justify-between flex-wrap gap-4">
        <SectionHeader
          tag="AI Board Meeting"
          title="Pitch to Your Board"
          subtitle={form ? `Board context: "${form.idea.slice(0, 60)}${form.idea.length > 60 ? '...' : ''}"` : 'Submit any business decision for a full board debate.'}
        />
        {boardHistory.length > 0 && (
          <button onClick={() => setShowHistory(!showHistory)} className="btn-ghost text-xs text-slate-500">
            <History size={13} /> Past pitches ({boardHistory.length})
          </button>
        )}
      </div>

      {/* Past pitches */}
      {showHistory && boardHistory.length > 0 && (
        <div className="glass p-5 space-y-3 animate-fade-up">
          <p className="score-label">Previous Pitches</p>
          {boardHistory.map((item, i) => (
            <button key={i}
              onClick={() => { setPitch(item.pitch); setOpinions(item.opinions); setVisibleCount(item.opinions.length); setShowFinal(true); setSubmitted(true); setShowHistory(false) }}
              className="w-full text-left p-3 rounded-xl transition-all"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
              <p className="text-slate-300 text-sm truncate">{item.pitch}</p>
            </button>
          ))}
        </div>
      )}

      {/* Pitch form */}
      {!submitted && (
        <div className="glass p-6 space-y-5">
          <div>
            <label className="block text-sm font-semibold text-slate-300 mb-2">
              🎤 What business feature or decision do you want to pitch?
            </label>
            <textarea className="input-field resize-none" rows={3}
              placeholder="e.g. I want to add delivery to my dessert business..."
              value={pitch} onChange={e => setPitch(e.target.value)} />
          </div>
          <div>
            <p className="text-xs text-slate-600 uppercase tracking-widest font-semibold mb-3">Example pitches</p>
            <div className="flex flex-wrap gap-2">
              {examples.map(ex => (
                <button key={ex} onClick={() => setPitch(ex)}
                  className="text-xs px-3 py-1.5 rounded-full transition-all"
                  style={{
                    background: pitch === ex ? 'rgba(99,102,241,0.15)' : 'rgba(255,255,255,0.04)',
                    border: pitch === ex ? '1px solid rgba(99,102,241,0.3)' : '1px solid rgba(255,255,255,0.07)',
                    color: pitch === ex ? '#a5b4fc' : '#64748b',
                  }}>
                  {ex}
                </button>
              ))}
            </div>
          </div>
          <button onClick={startMeeting} disabled={!pitch.trim()}
            className="btn-primary w-full justify-center py-4 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0">
            <Presentation size={16} /> Call the Board to Order <Send size={14} />
          </button>
        </div>
      )}

      {/* Pitch recap */}
      {submitted && (
        <div className="rounded-2xl p-5" style={{ background: 'rgba(99,102,241,0.07)', border: '1px solid rgba(99,102,241,0.18)' }}>
          <p className="text-xs font-semibold uppercase tracking-wider text-indigo-400 mb-2">Your Pitch</p>
          <p className="text-white font-medium">{pitch}</p>
          <button onClick={reset} className="btn-ghost text-xs mt-3 text-slate-500"><RotateCcw size={11} /> New pitch</button>
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div className="flex flex-col items-center gap-4 py-12">
          <div className="text-5xl" style={{ animation: 'pulse 1.5s infinite' }}>🏛️</div>
          <p className="text-slate-400 text-sm">The board is convening...</p>
        </div>
      )}

      {/* Opinions */}
      {opinions.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="h-px flex-1" style={{ background: 'rgba(255,255,255,0.06)' }} />
            <p className="text-xs text-slate-600 uppercase tracking-widest font-semibold">Board Opinions</p>
            <div className="h-px flex-1" style={{ background: 'rgba(255,255,255,0.06)' }} />
          </div>
          {opinions.map((item, i) => (
            <BoardOpinionCard key={item.agent.id} item={item} index={i} visible={i < visibleCount} />
          ))}
        </div>
      )}

      {/* Final recommendation */}
      {showFinal && (
        <div className="rounded-2xl p-6 animate-scale-in"
          style={{ background: 'linear-gradient(135deg,rgba(245,158,11,0.1),rgba(245,158,11,0.05))', border: '1px solid rgba(245,158,11,0.22)', boxShadow: '0 0 40px rgba(245,158,11,0.08)' }}>
          <div className="flex items-center gap-2.5 mb-5">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: 'rgba(245,158,11,0.2)' }}>
              <Gavel size={15} className="text-amber-400" />
            </div>
            <p className="text-amber-400 font-bold text-sm uppercase tracking-wider">Board's Final Recommendation</p>
          </div>
          <div className="flex items-center gap-6 mb-5 flex-wrap">
            <div>
              <p className="text-xs text-slate-600 uppercase tracking-widest font-semibold mb-1">Decision</p>
              <p className="text-3xl font-black text-amber-400">Wait</p>
            </div>
            <div className="h-10 w-px" style={{ background: 'rgba(255,255,255,0.08)' }} />
            <div>
              <p className="text-xs text-slate-600 uppercase tracking-widest font-semibold mb-1">Board Score</p>
              <p className="text-3xl font-black text-white">7 / 10</p>
            </div>
          </div>
          <p className="text-slate-300 leading-relaxed text-sm">
            This is a reasonable idea but timing matters. Three of five advisors recommend waiting until your core product has consistent demand. Validate your core product for 30 more days, then revisit with real sales data.
          </p>
        </div>
      )}
    </div>
  )
}
