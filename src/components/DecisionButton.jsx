export const variants = {
  continue: { label:'Continue', emoji:'▶', color:'#34d399', bg:'rgba(52,211,153,0.1)',  activeBg:'rgba(52,211,153,0.22)', border:'rgba(52,211,153,0.25)', message:"Great. Bedaya AI will now unlock the AI startup team. Your next step is to work with your advisors." },
  improve:  { label:'Improve',  emoji:'✏️', color:'#818cf8', bg:'rgba(129,140,248,0.1)', activeBg:'rgba(129,140,248,0.22)',border:'rgba(129,140,248,0.25)',message:"Let's improve the idea before spending money. Return to the form and refine your answers." },
  pause:    { label:'Pause',    emoji:'⏸', color:'#fbbf24', bg:'rgba(251,191,36,0.1)',  activeBg:'rgba(251,191,36,0.22)', border:'rgba(251,191,36,0.25)', message:"Your idea is saved. You can return later. Life gets busy — that is completely fine." },
  stop:     { label:'Stop',     emoji:'⏹', color:'#f87171', bg:'rgba(248,113,113,0.1)', activeBg:'rgba(248,113,113,0.22)',border:'rgba(248,113,113,0.25)',message:"Stopping is not failure. You learned before wasting money. That is the smart founder's move." },
}

export default function DecisionButton({ type, onSelect, selected }) {
  const v = variants[type]
  const active = selected === type
  return (
    <button onClick={() => onSelect(type)}
      style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:10, padding:'18px 12px', borderRadius:18, width:'100%', cursor:'pointer', transition:'all 0.2s', border:`1px solid ${active ? v.color : v.border}`,
        background: active ? v.activeBg : v.bg,
        boxShadow: active ? `0 0 20px ${v.color}30` : 'none',
        transform: active ? 'translateY(-2px)' : 'none' }}>
      <span style={{ fontSize:26 }}>{v.emoji}</span>
      <span style={{ fontSize:13, fontWeight:700, color: active ? v.color : `${v.color}cc` }}>{v.label}</span>
    </button>
  )
}
