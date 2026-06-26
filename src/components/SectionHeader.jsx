export default function SectionHeader({ tag, title, subtitle, center = false }) {
  return (
    <div className={`mb-10 animate-fade-up ${center ? 'text-center' : ''}`}>
      {tag && (
        <div style={{ marginBottom:14, display:'inline-flex', alignItems:'center', gap:8,
          padding:'6px 16px', borderRadius:99,
          background:'rgba(245,158,11,0.15)', border:'1px solid rgba(245,158,11,0.3)',
          fontSize:11, fontWeight:700, color:'#fde68a',
          textTransform:'uppercase', letterSpacing:'0.08em' }}>
          <span style={{ width:6, height:6, borderRadius:'50%', background:'#f59e0b', display:'inline-block', animation:'pulseGlow 2s infinite' }} />
          {tag}
        </div>
      )}
      <h1 style={{ fontSize:'clamp(24px,3.5vw,36px)', fontWeight:800, color:'#fef9ee', lineHeight:1.15, letterSpacing:'-0.02em', marginBottom:10 }}>
        {title}
      </h1>
      {subtitle && (
        <p style={{ color:'rgba(253,230,138,0.6)', fontSize:15, lineHeight:1.75, maxWidth:560, ...(center ? { margin:'0 auto' } : {}) }}>
          {subtitle}
        </p>
      )}
    </div>
  )
}
