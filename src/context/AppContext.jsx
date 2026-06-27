import { createContext, useContext, useState, useEffect } from 'react'

const AppContext = createContext(null)
const STORAGE_KEY = 'bedaya_ai_v3'

// Journey stages — matches ProgressTimeline
export const JOURNEY_STAGES = [
  { id: 'dream',      label: 'Dream',       emoji: '🌱' },
  { id: 'idea',       label: 'Idea',        emoji: '💡' },
  { id: 'plan',       label: 'Plan',        emoji: '📋' },
  { id: 'validate',   label: 'Validate',    emoji: '🧪' },
  { id: 'first-sale', label: 'First Sale',  emoji: '🛒' },
  { id: 'license',    label: 'License',     emoji: '📄' },
  { id: 'launch',     label: 'Launch',      emoji: '🚀' },
  { id: 'grow',       label: 'Grow',        emoji: '📈' },
]

const defaults = {
  about:            null,   // { name, age, location, role, stage }
  idea:             null,   // { idea, inspiration, customers, type }
  resources:        null,   // { budget, time, experience, hasCustomers, concern }
  result:           null,
  decision:         null,   // continue | improve | pause | stop
  teamUnlocked:     false,
  completedStages:  [],     // array of JOURNEY_STAGES ids
  boardHistory:     [],
  riskHistory:      [],
  agentHistory:     {},
  notifications:    [],
}

export function AppProvider({ children }) {
  const [session, setSession] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
      return { ...defaults, ...saved }
    } catch {
      return defaults
    }
  })

  // Persist every change to localStorage
  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(session)) } catch {}
  }, [session])

  const patch = (updates) => setSession(s => ({ ...s, ...updates }))

  // ── Onboarding saves ───────────────────────────────────────────────────
  const saveAbout = (about) => {
    patch({
      about,
      completedStages: unique([...session.completedStages, 'dream']),
    })
  }

  const saveIdea = (idea) => {
    patch({
      idea,
      completedStages: unique([...session.completedStages, 'dream', 'idea']),
    })
  }

  const saveResources = (resources) => {
    patch({
      resources,
      completedStages: unique([...session.completedStages, 'dream', 'idea', 'plan']),
    })
  }

  // ── Analysis result ────────────────────────────────────────────────────
  const saveResult = (result) => {
    patch({
      result,
      decision: null,
      completedStages: unique([...session.completedStages, 'dream', 'idea', 'plan', 'validate']),
    })
  }

  // ── Decision (Continue / Improve / Pause / Stop) ───────────────────────
  const saveDecision = (decision) => {
    const newStages = decision === 'continue'
      ? unique([...session.completedStages, 'first-sale'])
      : session.completedStages

    patch({
      decision,
      teamUnlocked: session.teamUnlocked || decision === 'continue',
      completedStages: newStages,
    })
  }

  // ── Improve: clear result only, keep form data ────────────────────────
  const improveIdea = () => {
    patch({ result: null, decision: null })
  }

  // ── Manual stage unlock (for future use) ─────────────────────────────
  const unlockStage = (stageId) => {
    patch({ completedStages: unique([...session.completedStages, stageId]) })
  }

  // ── Board meetings ─────────────────────────────────────────────────────
  const saveBoardPitch = (pitch, opinions, final) => {
    patch({
      boardHistory: [
        { pitch, opinions, final, date: new Date().toISOString() },
        ...session.boardHistory,
      ].slice(0, 10),
    })
  }

  // ── Risk checks ────────────────────────────────────────────────────────
  const saveRiskCheck = (decision, analysis) => {
    patch({
      riskHistory: [
        { decision, analysis, date: new Date().toISOString() },
        ...session.riskHistory,
      ].slice(0, 10),
    })
  }

  // ── Agent conversations ────────────────────────────────────────────────
  const saveAgentChat = (agentId, question, response) => {
    const prev = session.agentHistory[agentId] || []
    patch({
      agentHistory: {
        ...session.agentHistory,
        [agentId]: [
          { question, response, date: new Date().toISOString() },
          ...prev,
        ].slice(0, 5),
      },
    })
  }

  // ── Add a notification ─────────────────────────────────────────────────
  const addNotification = (text, type = 'info') => {
    const id = Date.now()
    patch({
      notifications: [
        { id, text, type, date: new Date().toISOString(), read: false },
        ...session.notifications,
      ].slice(0, 20),
    })
  }

  const markNotificationRead = (id) => {
    patch({
      notifications: session.notifications.map(n => n.id === id ? { ...n, read: true } : n),
    })
  }

  // ── Full reset ─────────────────────────────────────────────────────────
  const resetSession = () => {
    setSession(defaults)
    try { localStorage.removeItem(STORAGE_KEY) } catch {}
  }

  // ── Computed helpers ───────────────────────────────────────────────────
  const hasStarted = !!(session.about || session.idea || session.result)
  const hasResult  = !!session.result
  const isUnlocked = session.teamUnlocked

  // Flat form object for getFirstActionResult()
  const fullForm = {
    idea:      session.idea?.idea      || '',
    location:  session.about?.location || "Al Qua'a, Al Ain",
    budget:    session.resources?.budget || '',
    time:      session.resources?.time   || '',
    customers: session.idea?.customers   || '',
    concern:   session.resources?.concern || '',
  }

  const unreadCount = session.notifications.filter(n => !n.read).length

  return (
    <AppContext.Provider value={{
      session,
      patch,
      saveAbout,
      saveIdea,
      saveResources,
      saveResult,
      saveDecision,
      improveIdea,
      unlockStage,
      saveBoardPitch,
      saveRiskCheck,
      saveAgentChat,
      addNotification,
      markNotificationRead,
      resetSession,
      hasStarted,
      hasResult,
      isUnlocked,
      fullForm,
      unreadCount,
    }}>
      {children}
    </AppContext.Provider>
  )
}

function unique(arr) {
  return [...new Set(arr)]
}

export const useApp = () => {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used inside AppProvider')
  return ctx
}
