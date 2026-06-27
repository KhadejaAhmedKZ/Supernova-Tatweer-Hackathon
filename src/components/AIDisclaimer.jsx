import { AGENT_CONFIDENCE } from '../security/alAmanah'

export default function AIDisclaimer({ agentId }) {
  const conf = AGENT_CONFIDENCE[agentId] || { level: 'medium', label: 'Verify before acting' }
  const isHigh = conf.level === 'high'
  const color  = isHigh ? '#34d399' : '#fbbf24'
  const bg     = isHigh ? 'rgba(52,211,153,0.06)' : 'rgba(251,191,36,0.06)'
  const border = isHigh ? 'rgba(52,211,153,0.18)' : 'rgba(251,191,36,0.18)'

  return (
    <div style={{
      display:'flex', alignItems:'flex-start', gap:10,
      padding:'12px 14px', borderRadius:14, marginTop:14,
      background:bg, border:`1px solid ${border}`,
    }}>
      <span style={{ fontSize:14, marginTop:1, flexShrink:0 }}>{isHigh ? '🟢' : '🟡'}</span>
      <div>
        <p style={{ color, fontSize:11, fontWeight:700, margin:0 }}>
          {isHigh ? 'High confidence' : 'Verify before acting'}
        </p>
        <p style={{ color:'rgba(253,230,138,0.55)', fontSize:11, margin:'2px 0 0 0' }}>
          {conf.label}
        </p>
        <p style={{ color:'rgba(255,255,255,0.3)', fontSize:11, marginTop:6, lineHeight:1.55 }}>
          ⚠ AI guidance is informational. Verify legal and financial decisions with official UAE sources before committing.
        </p>
      </div>
    </div>
  )
}
