import { Outlet, useLocation } from 'react-router-dom'
import Navbar from './Navbar'

export default function Layout() {
  const location = useLocation()

  return (
    <div className="min-h-screen" style={{ background: '#050810' }}>
      <Navbar />
      <main className="pt-16 min-h-screen">
        <div className="section-wrap py-10 sm:py-12">
          <Outlet key={location.pathname} />
        </div>
      </main>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }} className="py-6">
        <div className="section-wrap flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div
              className="w-5 h-5 rounded-md flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg,#4f46e5,#7c3aed)' }}
            >
              <span className="text-white text-xs">✦</span>
            </div>
            <span className="text-slate-600 text-xs font-medium">Bedaya AI</span>
          </div>
          <p className="text-slate-700 text-xs">
            Built for Al Qua'a, Al Ain, UAE · Tatweer Hackathon 2026
          </p>
        </div>
      </footer>
    </div>
  )
}
