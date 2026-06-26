import { ShieldCheck, ArrowRight, AlertTriangle } from 'lucide-react'

const cfg = {
  High:   { bg:'rgba(239,68,68,0.12)',   border:'rgba(239,68,68,0.28)',   color:'#f87171', icon:'🚨', label:'High Risk'   },
  Medium: { bg:'rgba(245,158,11,0.12)',  border:'rgba(245,158,11,0.28)',  color:'#fbbf24', icon:'⚠️', label:'Medium Risk' },
  Low:    { bg:'rgba(52,211,153,0.12)',  border:'rgba(52,211,153,0.28)',  color:'#34d399', icon:'✅', label:'Low Risk'    },
}

const card = { background:'rgba(6,2,24,0.9)', backdropFilter:'blur(20px)', borderRadius:16 }

export default function RiskAlert({ analysis }) {
  const c = cfg[analysis.riskLevel] || cfg.Low
  return (
    <div style={{ display:'flex', flexDirection:'column', gap:14 }} className="animate-fade-up">
      <div style={{ display:'flex', alignItems:'center', gap:16, padding:'18px 20px', borderRadius:18, background:c.bg, border:`1px solid ${c.border}` }}>
        <span style={{ fontSize:32 }}>{c.icon}</span>
        <div>
          <p style={{ color:'rgba(255,255,255,0.5)', fontSize:11, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:4 }}>Risk Level</p>
          <p style={{ fontSize:24, fontWeight:900, color:c.color }}>{c.label}</p>
        </div>
      </div>
      {[
        { label:'Possible Mistake',       text:analysis.mistake,   icon:null,       color:'#f87171' },
        { label:'Why It Is Risky',        text:analysis.why,       icon:AlertTriangle, color:'#fbbf24' },
      ].map(({ label, text, icon:Icon, color }) => (
        <div key={label} style={{ ...card, padding:'18px 20px', border:'1px solid rgba(255,210,80,0.15)' }}>
          <div style={{ display:'flex', alignItems:'center', gap:6, marginBottom:8 }}>
            {Icon && <Icon size={13} style={{ color }} />}
            <p style={{ fontSize:11, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.08em', color:'rgba(253,230,138,0.5)' }}>{label}</p>
          </div>
          <p style={{ color:'#f1ece0', fontSize:13, lineHeight:1.75 }}>{text}</p>
        </div>
      ))}
      <div style={{ padding:'18px 20px', borderRadius:16, background:'rgba(52,211,153,0.08)', border:'1px solid rgba(52,211,153,0.25)' }}>
        <div style={{ display:'flex', alignItems:'center', gap:6, marginBottom:8 }}>
          <ShieldCheck size={13} style={{ color:'#34d399' }} />
          <p style={{ fontSize:11, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.08em', color:'#34d399' }}>Safer Alternative</p>
        </div>
        <p style={{ color:'#f1ece0', fontSize:13, lineHeight:1.75 }}>{analysis.safer}</p>
      </div>
      <div style={{ padding:'18px 20px', borderRadius:16, background:'rgba(245,158,11,0.08)', border:'1px solid rgba(245,158,11,0.25)' }}>
        <div style={{ display:'flex', alignItems:'center', gap:6, marginBottom:8 }}>
          <ArrowRight size={13} style={{ color:'#f59e0b' }} />
          <p style={{ fontSize:11, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.08em', color:'#f59e0b' }}>Recommended First Step</p>
        </div>
        <p style={{ color:'#f1ece0', fontSize:13, lineHeight:1.75 }}>{analysis.firstStep}</p>
      </div>
    </div>
  )
}
