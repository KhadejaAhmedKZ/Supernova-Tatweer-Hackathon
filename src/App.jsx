import { Routes, Route } from 'react-router-dom'
import { AppProvider } from './context/AppContext'
import Layout from './components/Layout'
import Landing from './pages/Landing'
import Dashboard from './pages/Dashboard'
import FirstAction from './pages/FirstAction'
import Agents from './pages/Agents'
import FailurePrevention from './pages/FailurePrevention'
import BoardMeeting from './pages/BoardMeeting'
import Opportunities from './pages/Opportunities'

export default function App() {
  return (
    <AppProvider>
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route element={<Layout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/first-action" element={<FirstAction />} />
        <Route path="/agents" element={<Agents />} />
        <Route path="/failure-prevention" element={<FailurePrevention />} />
        <Route path="/board-meeting" element={<BoardMeeting />} />
        <Route path="/opportunities" element={<Opportunities />} />
      </Route>
    </Routes>
    </AppProvider>
  )
}
