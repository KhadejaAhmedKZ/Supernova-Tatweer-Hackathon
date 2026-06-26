export default function ScoreCard({ label, score, color, description }) {
  const size = 96
  const radius = 36
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (score / 100) * circumference

  return (
    <div
      className="flex flex-col items-center text-center gap-3 p-5 rounded-2xl transition-all duration-300 hover:-translate-y-1"
      style={{
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.07)',
      }}
    >
      <div className="relative" style={{ width: size, height: size }}>
        {/* Track */}
        <svg
          width={size}
          height={size}
          style={{ transform: 'rotate(-90deg)', position: 'absolute', inset: 0 }}
        >
          <circle
            cx={size / 2} cy={size / 2} r={radius}
            fill="none"
            stroke="rgba(255,255,255,0.05)"
            strokeWidth={5}
          />
          <circle
            cx={size / 2} cy={size / 2} r={radius}
            fill="none"
            stroke={color}
            strokeWidth={5}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            style={{
              transition: 'stroke-dashoffset 1.2s cubic-bezier(0.4,0,0.2,1)',
              filter: `drop-shadow(0 0 6px ${color}88)`,
            }}
          />
        </svg>

        {/* Center value */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center"
        >
          <span className="text-2xl font-bold" style={{ color }}>
            {score}
          </span>
          <span className="text-slate-600 text-xs mt-0.5">/ 100</span>
        </div>
      </div>

      <div>
        <p className="text-white font-semibold text-sm">{label}</p>
        {description && (
          <p className="text-slate-500 text-xs mt-0.5 leading-snug">{description}</p>
        )}
      </div>
    </div>
  )
}
