export default function SectionHeader({ tag, title, subtitle, center = false }) {
  return (
    <div className={`mb-10 animate-fade-up ${center ? 'text-center' : ''}`}>
      {tag && (
        <div className={`inline-flex items-center gap-2 mb-4 ${center ? 'mx-auto' : ''}`}>
          <div
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest"
            style={{
              background: 'rgba(99,102,241,0.12)',
              border: '1px solid rgba(99,102,241,0.22)',
              color: '#a5b4fc',
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full animate-pulse"
              style={{ background: '#818cf8' }}
            />
            {tag}
          </div>
        </div>
      )}
      <h1 className="text-3xl sm:text-4xl font-bold text-white leading-tight tracking-tight">
        {title}
      </h1>
      {subtitle && (
        <p className="mt-3 text-slate-400 text-base sm:text-lg leading-relaxed max-w-2xl" style={center ? { margin: '12px auto 0' } : {}}>
          {subtitle}
        </p>
      )}
    </div>
  )
}
