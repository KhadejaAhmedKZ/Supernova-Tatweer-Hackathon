export const variants = {
  continue: {
    label: 'Continue',
    emoji: '▶',
    color: '#10b981',
    bg: 'rgba(16,185,129,0.08)',
    border: 'rgba(16,185,129,0.2)',
    activeBg: 'rgba(16,185,129,0.18)',
    message: 'Great. Bedaya AI will now unlock the AI startup team. Your next step is to work with your advisors.',
  },
  improve: {
    label: 'Improve',
    emoji: '✏️',
    color: '#6366f1',
    bg: 'rgba(99,102,241,0.08)',
    border: 'rgba(99,102,241,0.2)',
    activeBg: 'rgba(99,102,241,0.18)',
    message: "Let's improve the idea before spending money. Return to the form and refine your answers.",
  },
  pause: {
    label: 'Pause',
    emoji: '⏸',
    color: '#f59e0b',
    bg: 'rgba(245,158,11,0.08)',
    border: 'rgba(245,158,11,0.2)',
    activeBg: 'rgba(245,158,11,0.18)',
    message: 'Your idea is saved. You can return later. Life gets busy — that is completely fine.',
  },
  stop: {
    label: 'Stop',
    emoji: '⏹',
    color: '#ef4444',
    bg: 'rgba(239,68,68,0.08)',
    border: 'rgba(239,68,68,0.2)',
    activeBg: 'rgba(239,68,68,0.18)',
    message: 'Stopping is not failure. You learned before wasting money. That is the smart founder\'s move.',
  },
}

export default function DecisionButton({ type, onSelect, selected }) {
  const v = variants[type]
  const isSelected = selected === type

  return (
    <button
      onClick={() => onSelect(type)}
      className="flex flex-col items-center gap-2.5 p-4 rounded-2xl w-full transition-all duration-200 focus-visible:outline-none"
      style={{
        background: isSelected ? v.activeBg : v.bg,
        border: `1px solid ${isSelected ? v.color : v.border}`,
        boxShadow: isSelected ? `0 0 20px ${v.color}25` : 'none',
        transform: isSelected ? 'translateY(-2px)' : 'none',
      }}
    >
      <span className="text-2xl">{v.emoji}</span>
      <span className="text-sm font-semibold" style={{ color: v.color }}>
        {v.label}
      </span>
    </button>
  )
}
