import { ArrowUpRight } from 'lucide-react'

export default function OpportunityCard({ opportunity }) {
  const { emoji, color, title, type, whyItHelps, action } = opportunity
  return (
    <div style={{ display:'flex', flexDirection:'column', gap:14, padding:22, borderRadius:20, transition:'all 0.25s', background:'rgba(6,2,24,0.88)', border:`1px solid rgba(255,210,80,0.15)`, backdropFilter:'blur(20px)' }}
      onMouseEnter={e => { e.currentTarget.style.borderColor=`${color}45`; e.currentTarget.style.background='rgba(30,10,0,0.92)'; e.currentTarget.style.transform='translateY(-3px)'; e.currentTarget.style.boxShadow=`0 12px 36px ${color}18` }}
      onMouseLeave={e => { e.currentTarget.style.borderColor='rgba(255,210,80,0.15)'; e.currentTarget.style.background='rgba(6,2,24,0.88)'; e.currentTarget.style.transform='none'; e.currentTarget.style.boxShadow='none' }}>
      <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', gap:12 }}>
        <div style={{ display:'flex', alignItems:'flex-start', gap:12 }}>
          <div style={{ width:44, height:44, borderRadius:14, flexShrink:0, display:'flex', alignItems:'center', justifyContent:'center', fontSize:22, background:`${color}18`, border:`1px solid ${color}25` }}>
            {emoji}
          </div>
          <div>
            <h3 style={{ fontWeight:800, color:'#fef9ee', fontSize:14, lineHeight:1.3, marginBottom:6 }}>{title}</h3>
            <span style={{ fontSize:11, fontWeight:600, padding:'3px 10px', borderRadius:99, background:`${color}15`, color, border:`1px solid ${color}22` }}>{type}</span>
          </div>
        </div>
        <ArrowUpRight size={16} style={{ color:'rgba(253,230,138,0.25)', flexShrink:0, marginTop:4 }} />
      </div>
      <p style={{ color:'rgba(241,236,224,0.7)', fontSize:13, lineHeight:1.75 }}>{whyItHelps}</p>
      <div style={{ padding:'12px 16px', borderRadius:12, background:`${color}0e`, borderLeft:`3px solid ${color}` }}>
        <p style={{ fontSize:13, lineHeight:1.7, color:'#f1ece0' }}>
          <span style={{ fontWeight:700, color:'#fde68a' }}>Action: </span>{action}
        </p>
      </div>
    </div>
  )
}
