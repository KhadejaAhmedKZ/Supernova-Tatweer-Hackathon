// Founder Journey — visual stage progression
const JOURNEY = [
  { id:'dream',      label:'Dream',        emoji:'🌱', color:'#a78bfa' },
  { id:'idea',       label:'Idea',         emoji:'💡', color:'#f59e0b' },
  { id:'plan',       label:'Plan',         emoji:'📋', color:'#818cf8' },
  { id:'validate',   label:'Validate',     emoji:'🧪', color:'#34d399' },
  { id:'first-sale', label:'First Sale',   emoji:'🛒', color:'#fb923c' },
  { id:'license',    label:'License',      emoji:'📄', color:'#fbbf24' },
  { id:'launch',     label:'Launch',       emoji:'🚀', color:'#f472b6' },
  { id:'grow',       label:'Grow',         emoji:'📈', color:'#34d399' },
]

// Map app stage IDs to journey IDs
const stageToJourney = {
  'idea':       ['dream','idea'],
  'analysis':   ['dream','idea','plan'],
  'first-action':['dream','idea','plan','validate'],
  'validation': ['dream','idea','plan','validate','first-sale'],
  'registration':['dream','idea','plan','validate','first-sale','license'],
  'launch':     ['dream','idea','plan','validate','first-sale','license','launch'],
  'growth':     JOURNEY.map(j=>j.id),
}

export default function ProgressTimeline({ completedStages = [] }) {
  // determine furthest reached journey stage
  const reached = new Set()
  completedStages.forEach(s => (stageToJourney[s] || []).forEach(j => reached.add(j)))

  return (
    <div>
      <p style={{ fontSize:11, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.1em', color:'rgba(253,230,138,0.4)', marginBottom:20 }}>
        Founder Journey
      </p>

      {/* Journey path */}
      <div style={{ position:'relative', paddingBottom:8 }}>
        {/* Connecting line */}
        <div style={{ position:'absolute', left:20, top:20, bottom:8, width:2, background:'rgba(255,210,80,0.08)', borderRadius:99 }} />
        {/* Progress fill */}
        <div style={{ position:'absolute', left:20, top:20, width:2, borderRadius:99, background:'linear-gradient(180deg,#f59e0b,#34d399)', transition:'height 0.6s ease',
          height: `${(reached.size / JOURNEY.length) * 100}%` }} />

        <div style={{ display:'flex', flexDirection:'column', gap:0 }}>
          {JOURNEY.map((stage, i) => {
            const done   = reached.has(stage.id)
            const active = !done && reached.size === i
            return (
              <div key={stage.id} style={{ display:'flex', alignItems:'center', gap:14, paddingBottom: i < JOURNEY.length-1 ? 18 : 0, position:'relative' }}>
                <div style={{ width:40, height:40, borderRadius:'50%', flexShrink:0, display:'flex', alignItems:'center', justifyContent:'center', fontSize:18, zIndex:1, transition:'all 0.3s',
                  background: done ? `linear-gradient(135deg,${stage.color}40,${stage.color}20)` : active ? 'rgba(245,158,11,0.15)' : 'rgba(6,2,24,0.9)',
                  border: done ? `2px solid ${stage.color}60` : active ? '2px solid rgba(245,158,11,0.5)' : '2px solid rgba(255,255,255,0.06)',
                  boxShadow: done ? `0 0 12px ${stage.color}30` : active ? '0 0 16px rgba(245,158,11,0.3)' : 'none',
                }}>
                  {stage.emoji}
                </div>
                <div style={{ flex:1 }}>
                  <p style={{ fontSize:13, fontWeight:700, color: done ? '#fef9ee' : active ? '#fde68a' : 'rgba(255,255,255,0.2)', transition:'color 0.3s' }}>{stage.label}</p>
                  <p style={{ fontSize:10, color: done ? '#34d399' : active ? '#f59e0b' : 'rgba(255,255,255,0.1)', fontWeight:600, marginTop:1 }}>
                    {done ? '✓ Completed' : active ? '● In Progress' : '○ Locked'}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Progress bar */}
      <div style={{ marginTop:16, paddingTop:16, borderTop:'1px solid rgba(255,210,80,0.08)' }}>
        <div style={{ display:'flex', justifyContent:'space-between', marginBottom:6 }}>
          <span style={{ color:'rgba(253,230,138,0.4)', fontSize:11 }}>Progress</span>
          <span style={{ color:'#fde68a', fontSize:11, fontWeight:700 }}>{reached.size}/{JOURNEY.length} stages</span>
        </div>
        <div style={{ height:4, borderRadius:99, background:'rgba(255,255,255,0.06)', overflow:'hidden' }}>
          <div style={{ height:'100%', borderRadius:99, background:'linear-gradient(90deg,#f59e0b,#34d399)', width:`${(reached.size/JOURNEY.length)*100}%`, transition:'width 0.8s ease' }} />
        </div>
      </div>
    </div>
  )
}
