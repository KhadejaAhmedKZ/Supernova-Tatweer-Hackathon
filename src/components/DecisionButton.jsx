const variants = {
  continue: {
    label: 'Continue',
    emoji: '▶',
    bg: 'rgba(16,185,129,0.12)',
    border: 'rgba(16,185,129,0.3)',
    color: '#10b981',
    hoverBg: 'rgba(16,185,129,0.2)',
    message: "Great. Supernova will now unlock the AI startup team. Your next step is to work with your advisors.",
  },
  improve: {
    label: 'Improve',
    emoji: '✏️',
    bg: 'rgba(99,102,241,0.12)',
    border: 'rgba(99,102,241,0.3)',
    color: '#6366f1',
    hoverBg: 'rgba(99,102,241,0.2)',
    message: "Let's improve the idea before spending money. Return to the form and refine your answers.",
  },
  pause: {
    label: 'Pause',
    emoji: '⏸',
    bg: 'rgba(245,158,11,0.12)',
    border: 'rgba(245,158,11,0.3)',
    color: '#f59e0b',
    hoverBg: 'rgba(245,158,11,0.2)',
    message: "Your idea is saved. You can return later. Life gets busy — that is completely fine.",
  },
  stop: {
    label: 'Stop',
    emoji: '⏹',
    bg: 'rgba(239,68,68,0.12)',
    border: 'rgba(239,68,68,0.3)',
    color: '#ef4444',
    hoverBg: 'rgba(239,68,68,0.2)',
    message: "Stopping is not failure. You learned before wasting money. That is the smart founder's move.",
  },
}

export default function DecisionButton({ type, onSelect, selected }) {
  const v = variants[type]
  const isSelected = selected === type

  return (
    <button
      onClick={() => onSelect(type)}
      className="flex flex-col items-center gap-2 p-4 rounded-2xl border transition-all duration-200 w-full"
      style={{
        background: isSelected ? v.hoverBg : v.bg,
        borderColor: isSelected ? v.color : v.border,
        boxShadow: isSelected ? `0 0 16px ${v.color}30` : 'none',
        transform: isSelected ? 'translateY(-2px)' : 'none',
      }}
    >
      <span className="text-2xl">{v.emoji}</span>
      <span className="text-sm font-semibold" style={{ color: v.color }}>{v.label}</span>
    </button>
  )
}

export { variants }
