import { createContext, useContext, useEffect, useState } from 'react'

const Ctx = createContext(null)

const USERS_KEY   = 'bedaya_users'
const CURRENT_KEY = 'bedaya_current_user'

// SHA-256 hash via Web Crypto API — no library needed
const sha256 = async (text) => {
  const encoded = new TextEncoder().encode(text)
  const buf     = await crypto.subtle.digest('SHA-256', encoded)
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2,'0')).join('')
}

const readUsers = () => {
  try { return JSON.parse(localStorage.getItem(USERS_KEY) || '{}') }
  catch { return {} }
}

const writeUsers = (users) => {
  try { localStorage.setItem(USERS_KEY, JSON.stringify(users)) } catch {}
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem(CURRENT_KEY) || 'null') }
    catch { return null }
  })

  useEffect(() => {
    try {
      if (currentUser) localStorage.setItem(CURRENT_KEY, JSON.stringify(currentUser))
      else             localStorage.removeItem(CURRENT_KEY)
    } catch {}
  }, [currentUser])

  // ── Sign up ──────────────────────────────────────
  const signup = async (name, email, password) => {
    const normalised = email.trim().toLowerCase()
    if (!name?.trim())      return { ok:false, error:'Please enter your name' }
    if (!normalised)        return { ok:false, error:'Please enter your email' }
    if (!password || password.length < 6) return { ok:false, error:'Password must be at least 6 characters' }

    const users = readUsers()
    if (users[normalised]) return { ok:false, error:'An account with this email already exists' }

    const hash = await sha256(password)
    users[normalised] = {
      name: name.trim(),
      email: normalised,
      passwordHash: hash,
      createdAt: new Date().toISOString(),
    }
    writeUsers(users)

    const user = { name: name.trim(), email: normalised }
    setCurrentUser(user)
    return { ok:true, user }
  }

  // ── Log in ───────────────────────────────────────
  const login = async (email, password) => {
    const normalised = email.trim().toLowerCase()
    const users = readUsers()
    const record = users[normalised]
    if (!record)            return { ok:false, error:'No account with this email' }

    const hash = await sha256(password)
    if (hash !== record.passwordHash) return { ok:false, error:'Wrong password' }

    const user = { name: record.name, email: record.email }
    setCurrentUser(user)
    return { ok:true, user }
  }

  // ── Log out ──────────────────────────────────────
  const logout = () => setCurrentUser(null)

  const isLoggedIn = !!currentUser

  return (
    <Ctx.Provider value={{ currentUser, isLoggedIn, signup, login, logout }}>
      {children}
    </Ctx.Provider>
  )
}

export const useAuth = () => {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useAuth must be inside AuthProvider')
  return ctx
}
