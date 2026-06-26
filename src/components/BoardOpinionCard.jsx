const voteConfig = {
  'Proceed Now':  { color:'#34d399', bg:'rgba(52,211,153,0.12)',  border:'rgba(52,211,153,0.3)'  },
  'Wait':         { color:'#fbbf24', bg:'rgba(251,191,36,0.12)',  border:'rgba(251,191,36,0.3)'  },
  'Improve First':{ color:'#818cf8', bg:'rgba(129,140,248,0.12)', border:'rgba(129,140,248,0.3)' },
}

export default function BoardOpinionCard({ item, index, visible }) {
  const { agent, question, opinion, vote } = item
  const vc = voteConfig[vote] || voteConfig['Wait']

  if (!visible) return (
    <div style={{ padding:18, borderRadius:18, opacity:0.2, filter:'blur(1px)', background:'rgba(6,2,24,0.6)', border:'1px solid rgba(255,255,255,0.05)', display:'flex', alignItems:'center', gap:12 }}>
      <div style={{ width:36, height:36, borderRadius:12, background:agent.colorLight || `${agent.color}18`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:18 }}>{agent.emoji}</div>
      <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
        <div style={{ width:100, height:10, borderRadius:99, background:'rgba(255,255,255,0.08)' }} />
        <div style={{ width:60,  height:8,  borderRadius:99, background:'rgba(255,255,255,0.05)' }} />
      </div>
    </div>
  )

  return (
    <div style={{ padding:22, borderRadius:18, background:`linear-gradient(135deg,${agent.color}0a,rgba(6,2,24,0.92))`, border:`1px solid ${agent.color}28`, backdropFilter:'blur(20px)' }}
      className="animate-fade-up">
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:12, marginBottom:12 }}>
        <div style={{ display:'flex', alignItems:'center', gap:12 }}>
          <div style={{ width:40, height:40, borderRadius:12, flexShrink:0, display:'flex', alignItems:'center', justifyContent:'center', fontSize:20, background:`linear-gradient(135deg,${agent.color}22,${agent.color}0a)`, border:`1px solid ${agent.color}25` }}>{agent.emoji}</div>
          <div>
            <p style={{ fontWeight:800, color:'#fef9ee', fontSize:14 }}>{agent.name}</p>
            <p style={{ color:'rgba(253,230,138,0.45)', fontSize:11 }}>{agent.role}</p>
          </div>
        </div>
        <span style={{ fontSize:11, fontWeight:700, padding:'4px 12px', borderRadius:99, background:vc.bg, color:vc.color, border:`1px solid ${vc.border}` }}>{vote}</span>
      </div>
      <p style={{ color:agent.color, fontSize:11, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.07em', marginBottom:8 }}>{question}</p>
      <p style={{ color:'#e8e0d0', fontSize:13, lineHeight:1.8 }}>{opinion}</p>
    </div>
  )
}
