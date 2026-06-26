import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'

export default function Layout() {
  return (
    <div className="min-h-screen bg-navy-950">
      <Navbar />
      <main className="pt-16 min-h-screen">
        <div className="section-wrap py-10">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
