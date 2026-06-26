import { useState, useRef, useEffect, useCallback } from 'react'
import { Mic, MicOff, Volume2 } from 'lucide-react'

const SR = window.SpeechRecognition || window.webkitSpeechRecognition

export default function VoiceMic({ onTranscript, placeholder = 'Speak in Arabic or English...' }) {
  const [listening,   setListening]   = useState(false)
  const [lang,        setLang]        = useState('ar-AE')
  const [transcript,  setTranscript]  = useState('')
  const [error,       setError]       = useState(null)
  const [supported]                   = useState(!!SR)

  // Keep a stable ref to the latest onTranscript so the recognition
  // callback never captures a stale closure
  const onTranscriptRef = useRef(onTranscript)
  useEffect(() => { onTranscriptRef.current = onTranscript }, [onTranscript])

  // One recognition instance, recreated only on lang change
  const recogRef = useRef(null)

  const buildRecognition = useCallback((chosenLang) => {
    if (!SR) return null
    const r = new SR()
    r.continuous     = false
    r.interimResults = true
    r.lang           = chosenLang

    r.onresult = (e) => {
      const text = Array.from(e.results)
        .map(res => res[0].transcript)
        .join('')
      setTranscript(text)
      if (e.results[e.results.length - 1].isFinal) {
        onTranscriptRef.current(text)
        setListening(false)
      }
    }

    r.onerror = (e) => {
      const msg = e.error === 'not-allowed'
        ? 'Microphone permission denied — please allow mic access in your browser'
        : e.error === 'no-speech'
        ? 'No speech detected — try speaking louder'
        : 'Could not hear you — please try again'
      setError(msg)
      setListening(false)
    }

    r.onend = () => setListening(false)
    return r
  }, [])

  // Build on mount and whenever lang changes
  useEffect(() => {
    if (!SR) return
    // Stop any ongoing recognition before replacing
    try { recogRef.current?.abort() } catch (_) {}
    recogRef.current = buildRecognition(lang)
  }, [lang, buildRecognition])

  // Cleanup on unmount
  useEffect(() => {
    return () => { try { recogRef.current?.abort() } catch (_) {} }
  }, [])

  const toggle = () => {
    setError(null)
    if (listening) {
      try { recogRef.current?.stop() } catch (_) {}
      setListening(false)
    } else {
      setTranscript('')
      // Rebuild fresh instance each time to avoid "already started" errors
      recogRef.current = buildRecognition(lang)
      try {
        recogRef.current.start()
        setListening(true)
      } catch (e) {
        setError('Could not start microphone — please try again')
      }
    }
  }

  const switchLang = (l) => {
    if (listening) {
      try { recogRef.current?.abort() } catch (_) {}
      setListening(false)
    }
    setTranscript('')
    setError(null)
    setLang(l)
  }

  if (!supported) return (
    <p style={{ color:'rgba(253,230,138,0.3)', fontSize:12, marginBottom:12 }}>
      🎤 Voice input not supported on this browser. Use Chrome for voice.
    </p>
  )

  return (
    <div style={{ marginBottom:14 }}>
      <div style={{ display:'flex', alignItems:'center', gap:10, flexWrap:'wrap' }}>

        {/* Language toggle */}
        <div style={{ display:'flex', gap:3, padding:3, borderRadius:10, background:'rgba(6,2,24,0.9)', border:'1px solid rgba(255,210,80,0.15)' }}>
          {[['ar-AE','🇦🇪 AR'],['en-US','🇬🇧 EN']].map(([l, label]) => (
            <button key={l} onClick={() => switchLang(l)} style={{
              padding:'5px 11px', borderRadius:7, fontSize:11, fontWeight:700,
              cursor:'pointer', border:'none', transition:'all 0.2s',
              background: lang === l ? 'linear-gradient(135deg,#c47010,#f59e0b)' : 'transparent',
              color:       lang === l ? '#1a0a00' : 'rgba(253,230,138,0.4)',
            }}>
              {label}
            </button>
          ))}
        </div>

        {/* Mic button */}
        <button onClick={toggle} aria-label={listening ? 'Stop listening' : 'Start listening'} style={{
          width:42, height:42, borderRadius:13,
          display:'flex', alignItems:'center', justifyContent:'center',
          cursor:'pointer', border:'none', flexShrink:0, transition:'all 0.25s',
          background: listening
            ? 'linear-gradient(135deg,#ef4444,#dc2626)'
            : 'linear-gradient(135deg,#c47010,#f59e0b)',
          boxShadow: listening
            ? '0 0 0 4px rgba(239,68,68,0.2), 0 4px 14px rgba(239,68,68,0.4)'
            : '0 4px 14px rgba(200,112,16,0.4)',
          transform: listening ? 'scale(1.08)' : 'scale(1)',
        }}>
          {listening
            ? <MicOff size={17} style={{ color:'white' }} />
            : <Mic    size={17} style={{ color:'#1a0a00' }} />
          }
        </button>

        {/* Status text */}
        <span style={{ color: listening ? '#fde68a' : 'rgba(253,230,138,0.4)', fontSize:12, fontWeight: listening ? 600 : 400 }}>
          {listening
            ? (lang === 'ar-AE' ? '🎙 جاري الاستماع...' : '🎙 Listening...')
            : placeholder
          }
        </span>

        {/* Animated dots while listening */}
        {listening && (
          <div style={{ display:'flex', gap:4, marginLeft:4 }}>
            {[0,1,2].map(i => (
              <span key={i} style={{
                width:6, height:6, borderRadius:'50%', background:'#ef4444', display:'inline-block',
                animation:`floatY 0.7s ease-in-out infinite`,
                animationDelay:`${i * 0.18}s`,
              }} />
            ))}
          </div>
        )}
      </div>

      {/* Live transcript box */}
      {transcript && (
        <div style={{
          marginTop:10, padding:'10px 14px', borderRadius:12,
          background:'rgba(245,158,11,0.08)', border:'1px solid rgba(245,158,11,0.22)',
          display:'flex', alignItems:'flex-start', gap:8,
        }} className="animate-fade-in">
          <Volume2 size={13} style={{ color:'#f59e0b', flexShrink:0, marginTop:1 }} />
          <p style={{ color:'#fde68a', fontSize:13, lineHeight:1.5, fontStyle:'italic',
            direction: lang === 'ar-AE' ? 'rtl' : 'ltr' }}>
            "{transcript}"
          </p>
        </div>
      )}

      {/* Error message */}
      {error && (
        <p style={{ color:'#fb923c', fontSize:12, marginTop:8, lineHeight:1.5 }}>⚠️ {error}</p>
      )}
    </div>
  )
}
