export default function SectionHeader({ tag, title, subtitle, center = false }) {
  return (
    <div className={`mb-10 ${center ? 'text-center' : ''}`}>
      {tag && (
        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold uppercase tracking-widest mb-4`}>
          {tag}
        </div>
      )}
      <h2 className="text-3xl sm:text-4xl font-bold text-white leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-slate-400 text-lg leading-relaxed max-w-2xl">
          {subtitle}
        </p>
      )}
    </div>
  )
}
