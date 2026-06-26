import { STAGES } from '../context/AppContext'

export default function ProgressTimeline({ completedStages = [] }) {
  return (
    <div style={{ display:'flex', flexDirection:'column', gap:0 }}>
      {STAGES.map((stage, i) => {
        const done   = completedStages.includes(stage.id)
        const active = !done && completedStages.length === i
        return (
          <div key={stage.id} style={{ display:'flex', alignItems:'stretch', gap:0 }}>
            {/* Line + dot column */}
            <div style={{ display:'flex', flexDirection:'column', alignItems:'center', width:40, flexShrink:0 }}>
              {/* Dot */}
              <div style={{
                width:36, height:36, borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', fontSize:16, flexShrink:0, zIndex:1, transition:'all 0.4s',
                background: done ? 'linear-gradient(135deg,#7c3aed,#4f46e5)' : active ? 'rgba(139,92,246,0.2)' : 'rgba(255,255,255,0.04)',
                border: done ? '2px solid transparent' : active ? '2px solid rgba(139,92,246,0.5)' : '2px solid rgba(255,255,255,0.08)',
                boxShadow: active ? '0 0 16px rgba(139,92,246,0.4)' : done ? '0 0 12px rgba(124,58,237,0.3)' : 'none',
              }}>
                {done ? '✓' : stage.emoji}
              </div>
              {/* Connecting line */}
              {i < STAGES.length - 1 && (
                <div style={{ width:2, flex:1, minHeight:28, marginTop:2, background: done ? 'linear-gradient(180deg,#7c3aed,rgba(124,58,237,0.2))' : 'rgba(255,255,255,0.05)', transition:'all 0.4s' }} />
              )}
            </div>

            {/* Content */}
            <div style={{ paddingLeft:14, paddingBottom: i < STAGES.length-1 ? 24 : 0, paddingTop:6 }}>
              <p style={{
                fontSize:14, fontWeight:600, lineHeight:1.4, marginBottom:2,
                color: done ? 'white' : active ? '#c4b5fd' : '#334155',
                transition:'color 0.3s',
              }}>
                {stage.label}
              </p>
              {done && <span style={{ fontSize:11, color:'#34d399', fontWeight:600 }}>Completed ✓</span>}
              {active && <span style={{ fontSize:11, color:'#a78bfa', fontWeight:600 }}>In Progress...</span>}
              {!done && !active && <span style={{ fontSize:11, color:'#1e293b' }}>Locked</span>}
            </div>
          </div>
        )
      })}
    </div>
  )
}
