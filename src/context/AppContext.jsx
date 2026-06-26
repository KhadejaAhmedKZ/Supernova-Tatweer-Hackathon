import { createContext, useContext, useState, useEffect } from 'react'

const AppContext = createContext(null)

const STORAGE_KEY = 'bedaya_ai_session'

const defaultSession = {
  // Form data the user filled in
  form: null,
  // The AI analysis result
  result: null,
  // Which decision the user picked (continue/improve/pause/stop)
  decision: null,
  // Whether the AI team has been unlocked
  teamUnlocked: false,
  // Board meeting pitches history
  boardHistory: [],
  // Risk checks history
  riskHistory: [],
}

export function AppProvider({ children }) {
  const [session, setSession] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      return saved ? JSON.parse(saved) : defaultSession
    } catch {
      return defaultSession
    }
  })

  // Persist to localStorage whenever session changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(session))
    } catch {
      // storage full or unavailable — continue silently
    }
  }, [session])

  const saveResult = (form, result) => {
    setSession(s => ({ ...s, form, result, decision: null }))
  }

  const saveDecision = (decision) => {
    setSession(s => ({
      ...s,
      decision,
      teamUnlocked: s.teamUnlocked || decision === 'continue',
    }))
  }

  const saveBoardPitch = (pitch, opinions) => {
    setSession(s => ({
      ...s,
      boardHistory: [{ pitch, opinions, date: new Date().toISOString() }, ...s.boardHistory].slice(0, 5),
    }))
  }

  const saveRiskCheck = (decision, analysis) => {
    setSession(s => ({
      ...s,
      riskHistory: [{ decision, analysis, date: new Date().toISOString() }, ...s.riskHistory].slice(0, 5),
    }))
  }

  const resetSession = () => {
    setSession(defaultSession)
    localStorage.removeItem(STORAGE_KEY)
  }

  return (
    <AppContext.Provider value={{ session, saveResult, saveDecision, saveBoardPitch, saveRiskCheck, resetSession }}>
      {children}
    </AppContext.Provider>
  )
}

export const useApp = () => {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used inside AppProvider')
  return ctx
}
