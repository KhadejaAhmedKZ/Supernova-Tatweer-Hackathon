import { Routes, Route } from 'react-router-dom'
import { AppProvider } from './context/AppContext'
import { AuthProvider } from './auth/AuthContext'
import Layout from './components/Layout'
import Landing from './pages/Landing'
import Welcome from './pages/Welcome'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Onboarding from './pages/Onboarding'
import AnalysisLoading from './pages/AnalysisLoading'
import Results from './pages/Results'
import Dashboard from './pages/Dashboard'
import Agents from './pages/Agents'
import AgentDetail from './pages/AgentDetail'
import FailurePrevention from './pages/FailurePrevention'
import BoardMeeting from './pages/BoardMeeting'
import Opportunities from './pages/Opportunities'
import MarketDiscovery from './pages/MarketDiscovery'

export default function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route element={<Layout />}>
            <Route path="/start" element={<Onboarding />} />
            <Route path="/analysis" element={<AnalysisLoading />} />
            <Route path="/results" element={<Results />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/agents" element={<Agents />} />
            <Route path="/agents/:agentId" element={<AgentDetail />} />
            <Route path="/failure-prevention" element={<FailurePrevention />} />
            <Route path="/board-meeting" element={<BoardMeeting />} />
            <Route path="/opportunities" element={<Opportunities />} />
            <Route path="/market-discovery" element={<MarketDiscovery />} />
          </Route>
        </Routes>
      </AppProvider>
    </AuthProvider>
  )
}
