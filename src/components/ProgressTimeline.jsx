import { JOURNEY_STAGES } from '../context/AppContext'

export default function ProgressTimeline({ completedStages = [] }) {
  const reached = new Set(completedStages)

  return (
    <div>
      <p style={{ fontSize:11, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.1em', color:'rgba(253,230,138,0.4)', marginBottom:18 }}>
        Founder Journey
      </p>

      <div style={{ position:'relative' }}>
        {/* Vertical line track */}
        <div style={{ position:'absolute', left:19, top:20, bottom:0, width:2, background:'rgba(255,210,80,0.07)', borderRadius:99 }} />

        {/* Filled progress line */}
        {reached.size > 0 && (
          <div style={{
            position:'absolute', left:19, top:20, width:2, borderRadius:99,
            background:'linear-gradient(180deg,#f59e0b,#34d399)',
            height:`${((reached.size - 1) / (JOURNEY_STAGES.length - 1)) * 100}%`,
            transition:'height 0.6s ease',
          }} />
        )}

        <div style={{ display:'flex', flexDirection:'column', gap:0 }}>
          {JOURNEY_STAGES.map((stage, i) => {
            const done   = reached.has(stage.id)
            const active = !done && (
              i === 0 ||
              JOURNEY_STAGES.slice(0, i).every(s => reached.has(s.id))
            )

            return (
              <div key={stage.id} style={{ display:'flex', alignItems:'center', gap:14, paddingBottom: i < JOURNEY_STAGES.length - 1 ? 18 : 0 }}>
                {/* Dot */}
                <div style={{
                  width:38, height:38, borderRadius:'50%', flexShrink:0, zIndex:1,
                  display:'flex', alignItems:'center', justifyContent:'center', fontSize:17,
                  transition:'all 0.4s',
                  background: done   ? `linear-gradient(135deg,${stage.id==='grow'?'#34d399':'#f59e0b'},${stage.id==='grow'?'#4ade80':'#fbbf24'})`
                             : active ? 'rgba(245,158,11,0.15)'
                             : 'rgba(6,2,24,0.9)',
                  border: done   ? '2px solid transparent'
                         : active ? '2px solid rgba(245,158,11,0.5)'
                         : '2px solid rgba(255,255,255,0.07)',
                  boxShadow: done   ? '0 0 12px rgba(245,158,11,0.3)'
                            : active ? '0 0 16px rgba(245,158,11,0.25)'
                            : 'none',
                }}>
                  {done ? '✓' : stage.emoji}
                </div>

                {/* Label */}
                <div>
                  <p style={{
                    fontSize:13, fontWeight:700, margin:0, lineHeight:1.3,
                    color: done ? '#fef9ee' : active ? '#fde68a' : 'rgba(255,255,255,0.2)',
                    transition:'color 0.3s',
                  }}>
                    {stage.label}
                  </p>
                  <p style={{
                    fontSize:10, fontWeight:600, marginTop:2,
                    color: done ? '#34d399' : active ? '#f59e0b' : 'rgba(255,255,255,0.1)',
                  }}>
                    {done ? '✓ Completed' : active ? '● In Progress' : '○ Locked'}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Progress summary */}
      <div style={{ marginTop:18, paddingTop:14, borderTop:'1px solid rgba(255,210,80,0.08)' }}>
        <div style={{ display:'flex', justifyContent:'space-between', marginBottom:6 }}>
          <span style={{ color:'rgba(253,230,138,0.4)', fontSize:11 }}>Overall Progress</span>
          <span style={{ color:'#fde68a', fontSize:11, fontWeight:700 }}>
            {reached.size} / {JOURNEY_STAGES.length} stages
          </span>
        </div>
        <div style={{ height:4, borderRadius:99, background:'rgba(255,255,255,0.05)', overflow:'hidden' }}>
          <div style={{
            height:'100%', borderRadius:99,
            background:'linear-gradient(90deg,#f59e0b,#34d399)',
            width:`${(reached.size / JOURNEY_STAGES.length) * 100}%`,
            transition:'width 0.8s ease',
          }} />
        </div>
      </div>
    </div>
  )
}
