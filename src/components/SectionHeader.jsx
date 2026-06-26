export default function SectionHeader({ tag, title, subtitle, center = false }) {
  return (
    <div className={`mb-10 animate-fade-up ${center ? 'text-center' : ''}`}>
      {tag && (
        <div style={{ marginBottom:16, display:'inline-flex', alignItems:'center', gap:8,
          padding:'6px 16px', borderRadius:99,
          background:'rgba(139,92,246,0.12)', border:'1px solid rgba(139,92,246,0.22)',
          fontSize:11, fontWeight:700, color:'#c4b5fd', textTransform:'uppercase', letterSpacing:'0.08em' }}>
          <span style={{ width:6, height:6, borderRadius:'50%', background:'#a78bfa', display:'inline-block', animation:'pulseGlow 2s infinite' }} />
          {tag}
        </div>
      )}
      <h1 style={{ fontSize:'clamp(26px,3.5vw,38px)', fontWeight:800, color:'white', lineHeight:1.15, letterSpacing:'-0.02em', marginBottom:12 }}>
        {title}
      </h1>
      {subtitle && (
        <p style={{ color:'#64748b', fontSize:15, lineHeight:1.75, maxWidth:560, ...(center ? { margin:'0 auto' } : {}) }}>
          {subtitle}
        </p>
      )}
    </div>
  )
}
