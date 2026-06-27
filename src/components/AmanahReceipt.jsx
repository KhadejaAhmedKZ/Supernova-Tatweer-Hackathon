import { AGENT_PERMISSIONS } from '../security/alAmanah'

export default function AmanahReceipt({ agentId }) {
  const perms = AGENT_PERMISSIONS[agentId]
  if (!perms) return null

  const card = {
    background: 'rgba(6,2,24,0.88)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(245,158,11,0.25)',
    borderRadius: 16,
    padding: 18,
    marginBottom: 16,
  }

  const chip = (color, bg, border, strike) => ({
    display: 'inline-flex',
    alignItems: 'center',
    padding: '4px 10px',
    borderRadius: 99,
    fontSize: 11,
    fontWeight: 600,
    background: bg,
    color,
    border: `1px solid ${border}`,
    textDecoration: strike ? 'line-through' : 'none',
  })

  return (
    <div style={card} className="animate-fade-up">
      {/* Header */}
      <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:14 }}>
        <span style={{ fontSize:20 }}>🤝</span>
        <div>
          <p style={{ color:'#fbbf24', fontWeight:800, fontSize:11, textTransform:'uppercase', letterSpacing:'0.08em', margin:0 }}>
            Al-Amanah — الأمانة
          </p>
          <p style={{ color:'rgba(253,230,138,0.45)', fontSize:11, margin:'2px 0 0 0' }}>
            What this agent sees before answering you
          </p>
        </div>
      </div>

      {/* Shared */}
      <div style={{ marginBottom:12 }}>
        <p style={{ color:'#34d399', fontSize:11, fontWeight:700, marginBottom:7 }}>✓ Shared with this agent</p>
        <div style={{ display:'flex', flexWrap:'wrap', gap:6 }}>
          {perms.permitted.map(f => (
            <span key={f} style={chip('#86efac', 'rgba(52,211,153,0.1)', 'rgba(52,211,153,0.25)', false)}>
              {f}
            </span>
          ))}
        </div>
      </div>

      {/* Withheld */}
      <div style={{ marginBottom:12 }}>
        <p style={{ color:'rgba(253,230,138,0.4)', fontSize:11, fontWeight:700, marginBottom:7 }}>✗ Withheld from this agent</p>
        <div style={{ display:'flex', flexWrap:'wrap', gap:6 }}>
          {perms.withheld.map(f => (
            <span key={f} style={chip('rgba(148,163,184,0.55)', 'rgba(30,30,40,0.5)', 'rgba(100,100,120,0.25)', true)}>
              {f}
            </span>
          ))}
        </div>
      </div>

      {/* Reason */}
      <p style={{ color:'rgba(253,230,138,0.5)', fontSize:11, lineHeight:1.6, paddingTop:12, borderTop:'1px solid rgba(245,158,11,0.12)', margin:0 }}>
        {perms.reason}
      </p>
    </div>
  )
}
