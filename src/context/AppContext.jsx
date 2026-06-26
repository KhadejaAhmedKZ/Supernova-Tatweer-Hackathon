import { createContext, useContext, useState, useEffect } from 'react'

const AppContext = createContext(null)
const KEY = 'bedaya_ai_v2'

export const STAGES = [
  { id: 'idea',         label: 'Idea Submitted',         emoji: '💡' },
  { id: 'analysis',     label: 'Analysis Completed',      emoji: '🧠' },
  { id: 'first-action', label: 'First Action Generated',  emoji: '⚡' },
  { id: 'validation',   label: 'Market Validation',       emoji: '🔍' },
  { id: 'registration', label: 'Business Registration',   emoji: '📋' },
  { id: 'launch',       label: 'Business Launch',         emoji: '🚀' },
  { id: 'growth',       label: 'Growth',                  emoji: '📈' },
]

const defaults = {
  // Step 1 — About you
  about: null,          // { name, age, location, occupation }
  // Step 2 — Business idea
  idea: null,           // { idea, inspiration, customers, type }
  // Step 3 — Resources
  resources: null,      // { budget, time, experience, hasCustomers, concern }
  // Results
  result: null,
  decision: null,       // continue | improve | pause | stop
  teamUnlocked: false,
  // Progress
  completedStages: [],
  // History
  boardHistory: [],
  riskHistory: [],
  agentHistory: {},     // { agentId: [{ question, response }] }
}

export function AppProvider({ children }) {
  const [session, setSession] = useState(() => {
    try { return { ...defaults, ...JSON.parse(localStorage.getItem(KEY) || '{}') } }
    catch { return defaults }
  })

  useEffect(() => {
    try { localStorage.setItem(KEY, JSON.stringify(session)) } catch {}
  }, [session])

  const patch = (updates) => setSession(s => ({ ...s, ...updates }))

  const saveAbout     = (about)     => { patch({ about }); markStage() }
  const saveIdea      = (idea)      => patch({ idea })
  const saveResources = (resources) => patch({ resources })

  const saveResult = (result) => {
    patch({ result, completedStages: addStage(session.completedStages, 'idea', 'analysis', 'first-action') })
  }

  const saveDecision = (decision) => {
    patch({
      decision,
      teamUnlocked: session.teamUnlocked || decision === 'continue',
    })
  }

  const markStage = (stageId) => {
    if (!stageId) return
    patch({ completedStages: addStage(session.completedStages, stageId) })
  }

  const saveBoardPitch = (pitch, opinions, final) => {
    patch({
      boardHistory: [{ pitch, opinions, final, date: new Date().toISOString() }, ...session.boardHistory].slice(0, 10),
    })
  }

  const saveRiskCheck = (decision, analysis) => {
    patch({
      riskHistory: [{ decision, analysis, date: new Date().toISOString() }, ...session.riskHistory].slice(0, 10),
    })
  }

  const saveAgentChat = (agentId, question, response) => {
    const prev = session.agentHistory[agentId] || []
    patch({
      agentHistory: {
        ...session.agentHistory,
        [agentId]: [{ question, response, date: new Date().toISOString() }, ...prev].slice(0, 5),
      },
    })
  }

  const resetSession = () => {
    setSession(defaults)
    localStorage.removeItem(KEY)
  }

  const hasStarted = !!(session.about || session.idea || session.result)
  const fullForm = {
    idea: session.idea?.idea || '',
    location: session.about?.location || '',
    budget: session.resources?.budget || '',
    time: session.resources?.time || '',
    customers: session.idea?.customers || '',
    concern: session.resources?.concern || '',
  }

  return (
    <AppContext.Provider value={{
      session, patch,
      saveAbout, saveIdea, saveResources, saveResult, saveDecision,
      markStage, saveBoardPitch, saveRiskCheck, saveAgentChat,
      resetSession, hasStarted, fullForm,
    }}>
      {children}
    </AppContext.Provider>
  )
}

function addStage(current = [], ...ids) {
  return [...new Set([...current, ...ids])]
}

export const useApp = () => {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be inside AppProvider')
  return ctx
}
