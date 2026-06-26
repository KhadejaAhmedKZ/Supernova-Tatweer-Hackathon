import { useState, useEffect } from 'react'
import { Presentation, Send, RotateCcw, CheckCircle } from 'lucide-react'
import { getBoardOpinions } from '../data/mockData'
import BoardOpinionCard from '../components/BoardOpinionCard'
import SectionHeader from '../components/SectionHeader'

const examples = [
  'I want to add delivery to my dessert business.',
  'I want to launch an Instagram page.',
  'I want to hire a part-time helper.',
  'I want to sell at the Al Ain Oasis market.',
  'I want to buy equipment worth AED 3000.',
]

const finalRec = {
  verdict: 'Wait',
  verdictColor: '#f59e0b',
  score: '7 / 10',
  reason:
    'This is a reasonable idea but the timing matters. Three of five advisors recommend waiting until your core product has consistent demand. One advisor says proceed now, and one says improve first. The board recommends: validate your core product for 30 more days, then revisit this decision with real sales data.',
}

export default function BoardMeeting() {
  const [pitch, setPitch] = useState('')
  const [opinions, setOpinions] = useState([])
  const [visibleCount, setVisibleCount] = useState(0)
  const [showFinal, setShowFinal] = useState(false)
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const startMeeting = () => {
    if (!pitch.trim()) return
    setLoading(true)
    setSubmitted(true)
    setOpinions([])
    setVisibleCount(0)
    setShowFinal(false)

    setTimeout(() => {
      setOpinions(getBoardOpinions(pitch))
      setLoading(false)
    }, 1000)
  }

  useEffect(() => {
    if (opinions.length === 0) return
    let count = 0
    const interval = setInterval(() => {
      count++
      setVisibleCount(count)
      if (count >= opinions.length) {
        clearInterval(interval)
        setTimeout(() => setShowFinal(true), 600)
      }
    }, 900)
    return () => clearInterval(interval)
  }, [opinions])

  const reset = () => {
    setPitch('')
    setOpinions([])
    setVisibleCount(0)
    setShowFinal(false)
    setSubmitted(false)
    setLoading(false)
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-fade-up">
      <SectionHeader
        tag="AI Board Meeting"
        title="Pitch to Your Board"
        subtitle="Submit any business decision. All five AI advisors will debate it and deliver a final recommendation."
      />

      {/* Pitch form */}
      {!submitted && (
        <div className="glass p-6 space-y-5">
          <div>
            <label className="block text-sm font-semibold text-slate-300 mb-2">
              🎤 What business feature or decision do you want to pitch?
            </label>
            <textarea
              className="input-field resize-none"
              rows={3}
              placeholder="e.g. I want to add delivery to my dessert business..."
              value={pitch}
              onChange={(e) => setPitch(e.target.value)}
            />
          </div>

          <div>
            <p className="text-xs text-slate-500 mb-3">Example pitches:</p>
            <div className="flex flex-wrap gap-2">
              {examples.map((ex) => (
                <button
                  key={ex}
                  onClick={() => setPitch(ex)}
                  className="text-xs px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/8 transition-all"
                >
                  {ex}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={startMeeting}
            disabled={!pitch.trim()}
            className="btn-primary w-full justify-center py-4 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <Presentation size={18} />
            Call the Board to Order
            <Send size={16} />
          </button>
        </div>
      )}

      {/* Pitch recap */}
      {submitted && (
        <div
          className="rounded-2xl p-5 border"
          style={{ background: 'rgba(99,102,241,0.08)', borderColor: 'rgba(99,102,241,0.2)' }}
        >
          <p className="text-xs font-semibold uppercase tracking-wider text-indigo-400 mb-2">Your Pitch</p>
          <p className="text-white font-medium">{pitch}</p>
          <button onClick={reset} className="btn-ghost text-xs mt-3">
            <RotateCcw size={12} /> New pitch
          </button>
        </div>
      )}

      {/* Loading state */}
      {loading && (
        <div className="flex flex-col items-center gap-4 py-10">
          <div className="text-5xl animate-pulse-slow">🏛️</div>
          <p className="text-slate-400">The board is convening...</p>
        </div>
      )}

      {/* Agent opinions */}
      {opinions.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="h-px flex-1 bg-white/6" />
            <p className="text-xs text-slate-500 uppercase tracking-widest">Board Opinions</p>
            <div className="h-px flex-1 bg-white/6" />
          </div>
          {opinions.map((item, i) => (
            <BoardOpinionCard
              key={item.agent.id}
              item={item}
              index={i}
              visible={i < visibleCount}
            />
          ))}
        </div>
      )}

      {/* Final recommendation */}
      {showFinal && (
        <div
          className="rounded-2xl p-6 border animate-fade-up"
          style={{
            background: 'linear-gradient(135deg, rgba(245,158,11,0.08), rgba(245,158,11,0.04))',
            borderColor: 'rgba(245,158,11,0.25)',
          }}
        >
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle size={18} className="text-amber-400" />
            <p className="text-amber-400 font-bold text-sm uppercase tracking-wider">Board's Final Recommendation</p>
          </div>

          <div className="flex items-center gap-4 mb-4 flex-wrap">
            <div>
              <p className="text-xs text-slate-500 mb-1">Decision</p>
              <p className="text-2xl font-black" style={{ color: finalRec.verdictColor }}>
                {finalRec.verdict}
              </p>
            </div>
            <div className="h-10 w-px bg-white/10" />
            <div>
              <p className="text-xs text-slate-500 mb-1">Board Score</p>
              <p className="text-2xl font-black text-white">{finalRec.score}</p>
            </div>
          </div>

          <p className="text-slate-200 leading-relaxed">{finalRec.reason}</p>
        </div>
      )}
    </div>
  )
}
