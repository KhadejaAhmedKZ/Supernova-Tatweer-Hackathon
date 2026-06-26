export default function ScoreCard({ label, score, color, description }) {
  const size = 96, r = 36
  const circ = 2 * Math.PI * r
  const offset = circ - (score / 100) * circ

  return (
    <div style={{ display:'flex', flexDirection:'column', alignItems:'center', textAlign:'center', gap:12, padding:20, borderRadius:18, background:'rgba(6,2,24,0.9)', border:`1px solid ${color}30`, transition:'all 0.3s' }}
      onMouseEnter={e => { e.currentTarget.style.borderColor=`${color}60`; e.currentTarget.style.transform='translateY(-2px)' }}
      onMouseLeave={e => { e.currentTarget.style.borderColor=`${color}30`; e.currentTarget.style.transform='none' }}>
      <div style={{ position:'relative', width:size, height:size }}>
        <svg width={size} height={size} style={{ transform:'rotate(-90deg)', position:'absolute', inset:0 }}>
          <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth={6} />
          <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={6}
            strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round"
            style={{ transition:'stroke-dashoffset 1.2s ease', filter:`drop-shadow(0 0 6px ${color}88)` }} />
        </svg>
        <div style={{ position:'absolute', inset:0, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center' }}>
          <span style={{ fontSize:22, fontWeight:800, color }} >{score}</span>
          <span style={{ fontSize:10, color:'rgba(255,255,255,0.3)', marginTop:1 }}>/100</span>
        </div>
      </div>
      <div>
        <p style={{ color:'#fef9ee', fontWeight:700, fontSize:13 }}>{label}</p>
        {description && <p style={{ color:'rgba(253,230,138,0.45)', fontSize:11, marginTop:3 }}>{description}</p>}
      </div>
    </div>
  )
}
