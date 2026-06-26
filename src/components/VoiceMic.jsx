import { useState, useEffect, useRef } from 'react'
import { Mic, MicOff, Volume2 } from 'lucide-react'

export default function VoiceMic({ onTranscript, placeholder = 'Speak in Arabic or English...' }) {
  const [listening, setListening]   = useState(false)
  const [lang, setLang]             = useState('ar-AE')
  const [transcript, setTranscript] = useState('')
  const [error, setError]           = useState(null)
  const [supported, setSupported]   = useState(true)
  const recogRef = useRef(null)

  useEffect(() => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition
    if (!SR) { setSupported(false); return }

    const r = new SR()
    r.continuous      = false
    r.interimResults  = true
    r.lang            = lang

    r.onresult = (e) => {
      const t = Array.from(e.results).map(res => res[0].transcript).join('')
      setTranscript(t)
      if (e.results[0].isFinal) {
        onTranscript(t)
        setListening(false)
      }
    }
    r.onerror = (e) => {
      setError(e.error === 'not-allowed' ? 'Microphone access denied' : 'Could not hear you — try again')
      setListening(false)
    }
    r.onend = () => setListening(false)

    recogRef.current = r
  }, [lang])

  const toggle = () => {
    setError(null)
    if (listening) {
      recogRef.current?.stop()
      setListening(false)
    } else {
      setTranscript('')
      recogRef.current.lang = lang
      recogRef.current?.start()
      setListening(true)
    }
  }

  if (!supported) return null

  return (
    <div style={{ marginBottom:16 }}>
      {/* Language toggle + mic button */}
      <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:transcript?10:0 }}>
        {/* Lang switch */}
        <div style={{ display:'flex', gap:4, background:'rgba(6,2,24,0.9)', border:'1px solid rgba(255,210,80,0.15)', borderRadius:10, padding:3 }}>
          {[['ar-AE','🇦🇪 AR'],['en-US','🇬🇧 EN']].map(([l,label]) => (
            <button key={l} onClick={() => setLang(l)}
              style={{ padding:'5px 12px', borderRadius:8, fontSize:11, fontWeight:700, cursor:'pointer', border:'none', transition:'all 0.2s',
                background: lang===l ? 'linear-gradient(135deg,#c47010,#f59e0b)' : 'transparent',
                color: lang===l ? '#1a0a00' : 'rgba(253,230,138,0.45)',
              }}>
              {label}
            </button>
          ))}
        </div>

        {/* Mic button */}
        <button onClick={toggle}
          style={{ width:44, height:44, borderRadius:14, display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer', border:'none', flexShrink:0, transition:'all 0.2s',
            background: listening ? 'linear-gradient(135deg,#ef4444,#dc2626)' : 'linear-gradient(135deg,#c47010,#f59e0b)',
            boxShadow: listening ? '0 0 0 4px rgba(239,68,68,0.25), 0 4px 16px rgba(239,68,68,0.4)' : '0 4px 14px rgba(200,112,16,0.45)',
            transform: listening ? 'scale(1.05)' : 'scale(1)',
          }}>
          {listening
            ? <MicOff size={18} style={{ color:'white' }} />
            : <Mic size={18} style={{ color:'#1a0a00' }} />
          }
        </button>

        {/* Hint */}
        <p style={{ color:'rgba(253,230,138,0.45)', fontSize:12 }}>
          {listening ? (lang==='ar-AE' ? '...جاري الاستماع' : 'Listening...') : placeholder}
        </p>

        {/* Pulse ring when listening */}
        {listening && (
          <div style={{ display:'flex', gap:4 }}>
            {[0,1,2].map(i => (
              <div key={i} style={{ width:6, height:6, borderRadius:'50%', background:'#ef4444',
                animation:`floatY 0.6s ease-in-out infinite ${i*0.15}s` }} />
            ))}
          </div>
        )}
      </div>

      {/* Live transcript */}
      {transcript && (
        <div style={{ padding:'10px 14px', borderRadius:12, background:'rgba(245,158,11,0.08)', border:'1px solid rgba(245,158,11,0.2)', display:'flex', alignItems:'center', gap:8 }} className="animate-fade-in">
          <Volume2 size={13} style={{ color:'#f59e0b', flexShrink:0 }} />
          <p style={{ color:'#fde68a', fontSize:13, fontStyle:'italic' }}>"{transcript}"</p>
        </div>
      )}

      {/* Error */}
      {error && (
        <p style={{ color:'#fb923c', fontSize:12, marginTop:6 }}>⚠️ {error}</p>
      )}
    </div>
  )
}
