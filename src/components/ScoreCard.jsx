export default function ScoreCard({ label, score, color, icon, description }) {
  const size = 88
  const radius = 34
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (score / 100) * circumference

  return (
    <div className="glass p-5 flex flex-col items-center text-center gap-3 hover:border-white/20 transition-all duration-300">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="rgba(255,255,255,0.06)"
            strokeWidth={6}
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={6}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            style={{ transition: 'stroke-dashoffset 1.2s ease' }}
          />
        </svg>
        <div
          className="absolute inset-0 flex flex-col items-center justify-center"
          style={{ color }}
        >
          <span className="text-xl font-bold">{score}</span>
          {icon && <span className="text-xs mt-0.5">{icon}</span>}
        </div>
      </div>
      <div>
        <div className="text-white font-semibold text-sm">{label}</div>
        {description && (
          <div className="text-slate-500 text-xs mt-1 leading-snug">{description}</div>
        )}
      </div>
    </div>
  )
}
