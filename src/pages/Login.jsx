import { useState } from 'react'
import { useNavigate, NavLink } from 'react-router-dom'
import { LogIn, Mail, Lock, ArrowRight, Eye, EyeOff } from 'lucide-react'
import { useAuth } from '../auth/AuthContext'
import WorldBackground from '../components/WorldBackground'
import Navbar from '../components/Navbar'

export default function Login() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [email,    setEmail]    = useState('')
  const [password, setPassword] = useState('')
  const [show,     setShow]     = useState(false)
  const [error,    setError]    = useState(null)
  const [loading,  setLoading]  = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    const res = await login(email, password)
    setLoading(false)
    if (res.ok) navigate('/dashboard')
    else setError(res.error)
  }

  return (
    <div style={{ background:'#010008', minHeight:'100vh', position:'relative' }}>
      <WorldBackground />
      <Navbar />

      <div style={{ position:'relative', zIndex:10, display:'flex', alignItems:'center', justifyContent:'center', minHeight:'100vh', padding:'80px 20px 40px' }}>
        <div style={{ maxWidth:420, width:'100%' }} className="animate-fade-up">

          <div style={{ textAlign:'center', marginBottom:28 }}>
            <div style={{ fontSize:48, marginBottom:14, filter:'drop-shadow(0 0 20px rgba(245,158,11,0.5))' }}>🔐</div>
            <h1 style={{ color:'#fef9ee', fontSize:28, fontWeight:800, marginBottom:6, letterSpacing:'-0.02em' }}>
              Welcome back
            </h1>
            <p style={{ color:'rgba(253,230,138,0.45)', fontSize:14 }}>
              Sign in to continue your founder journey
            </p>
          </div>

          <form onSubmit={submit} style={{ padding:24, borderRadius:20, background:'rgba(6,2,24,0.92)', border:'1px solid rgba(245,158,11,0.25)', backdropFilter:'blur(20px)' }}>

            {/* Email */}
            <div style={{ marginBottom:16 }}>
              <label style={{ display:'flex', alignItems:'center', gap:6, color:'rgba(253,230,138,0.65)', fontSize:12, fontWeight:600, marginBottom:7 }}>
                <Mail size={13} /> Email
              </label>
              <input className="input-field" type="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} required autoFocus />
            </div>

            {/* Password */}
            <div style={{ marginBottom:18 }}>
              <label style={{ display:'flex', alignItems:'center', gap:6, color:'rgba(253,230,138,0.65)', fontSize:12, fontWeight:600, marginBottom:7 }}>
                <Lock size={13} /> Password
              </label>
              <div style={{ position:'relative' }}>
                <input className="input-field" type={show ? 'text' : 'password'} placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} required style={{ paddingRight:42 }} />
                <button type="button" onClick={() => setShow(s => !s)}
                  style={{ position:'absolute', right:10, top:'50%', transform:'translateY(-50%)', background:'none', border:'none', cursor:'pointer', color:'rgba(253,230,138,0.4)', padding:6 }}>
                  {show ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div style={{ padding:'10px 14px', borderRadius:12, background:'rgba(239,68,68,0.1)', border:'1px solid rgba(239,68,68,0.25)', marginBottom:14 }}>
                <p style={{ color:'#fca5a5', fontSize:12, margin:0 }}>⚠ {error}</p>
              </div>
            )}

            <button type="submit" disabled={loading || !email || !password} className="btn-primary"
              style={{ width:'100%', justifyContent:'center', padding:'14px', opacity: (loading || !email || !password) ? 0.5 : 1 }}>
              {loading ? 'Signing in...' : <><LogIn size={15} /> Sign In <ArrowRight size={14} /></>}
            </button>

            <p style={{ textAlign:'center', marginTop:18, color:'rgba(253,230,138,0.45)', fontSize:13 }}>
              Don't have an account?{' '}
              <NavLink to="/signup" style={{ color:'#fbbf24', fontWeight:700, textDecoration:'none' }}>
                Create one
              </NavLink>
            </p>
          </form>

          <p style={{ textAlign:'center', marginTop:18, color:'rgba(255,255,255,0.12)', fontSize:11 }}>
            🔒 Passwords are hashed with SHA-256. Stored only on your device.
          </p>
        </div>
      </div>
    </div>
  )
}
