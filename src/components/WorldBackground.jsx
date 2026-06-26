import { useEffect, useRef } from 'react'

export default function WorldBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let raf
    let t = 0

    const resize = () => {
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    // ── Stars ────────────────────────────────────────
    const stars = Array.from({ length: 280 }, () => ({
      x: Math.random(),
      y: Math.random() * 0.65,          // only in sky area
      r: Math.random() * 1.8 + 0.3,
      twinkle: Math.random() * 0.02 + 0.005,
      offset: Math.random() * Math.PI * 2,
      color: Math.random() > 0.88
        ? (Math.random() > 0.5 ? '#fde68a' : '#bae6fd')
        : '#ffffff',
    }))

    // ── Shooting stars ───────────────────────────────
    const makeShoot = () => ({
      x: Math.random() * 0.7 + 0.05,
      y: Math.random() * 0.35 + 0.02,
      len: Math.random() * 140 + 60,
      speed: Math.random() * 7 + 5,
      progress: 0,
      angle: Math.PI / 5 + (Math.random() - 0.5) * 0.3,
      wait: Math.floor(Math.random() * 500 + 80),
      waited: 0,
      phase: 'wait',
    })
    const shoots = Array.from({ length: 5 }, makeShoot)

    // ── Sand particles ───────────────────────────────
    const grains = Array.from({ length: 80 }, () => ({
      x: Math.random(),
      y: 0.72 + Math.random() * 0.28,
      r: Math.random() * 1.6 + 0.4,
      speed: Math.random() * 0.0008 + 0.0003,
      drift: (Math.random() - 0.5) * 0.0005,
      alpha: Math.random() * 0.4 + 0.1,
    }))

    // ── Camel silhouettes ────────────────────────────
    const camels = [
      { x: 0.1,  size: 0.07, speed: 0.00008,  dir: 1  },
      { x: 0.75, size: 0.05, speed: 0.00005,  dir: -1 },
    ]

    function drawCamel(cx, cy, size, flip) {
      const s = size
      ctx.save()
      if (flip) { ctx.translate(cx * 2, 0); ctx.scale(-1, 1) }
      ctx.fillStyle = 'rgba(100,60,20,0.55)'
      // Body
      ctx.beginPath()
      ctx.ellipse(cx, cy, s*1.5, s*0.6, 0, 0, Math.PI*2)
      ctx.fill()
      // Hump 1
      ctx.beginPath()
      ctx.ellipse(cx - s*0.3, cy - s*0.75, s*0.45, s*0.5, -0.2, 0, Math.PI*2)
      ctx.fill()
      // Hump 2
      ctx.beginPath()
      ctx.ellipse(cx + s*0.4, cy - s*0.65, s*0.35, s*0.42, 0.2, 0, Math.PI*2)
      ctx.fill()
      // Neck + head
      ctx.beginPath()
      ctx.fillRect(cx - s*0.9, cy - s*1.4, s*0.25, s*0.9)
      ctx.beginPath()
      ctx.ellipse(cx - s*0.82, cy - s*1.5, s*0.28, s*0.22, -0.3, 0, Math.PI*2)
      ctx.fill()
      // Legs
      ;[-0.9,-0.45,0.45,0.9].forEach((ox,i) => {
        const legWobble = Math.sin(t*0.04 + i*Math.PI*0.5) * (i%2===0?4:0)
        ctx.fillRect(cx+ox*s, cy+s*0.3, s*0.18, s*0.8 + legWobble)
      })
      ctx.restore()
    }

    // ── Dune path helper ─────────────────────────────
    function dunePath(w, h, yBase, amplitude, freq, phaseOff) {
      ctx.beginPath()
      ctx.moveTo(0, h)
      for (let x = 0; x <= w; x += 3) {
        const y = yBase + Math.sin((x / w) * Math.PI * freq + phaseOff + t*0.003) * amplitude
                        + Math.sin((x / w) * Math.PI * (freq*1.7) + phaseOff*1.3 + t*0.002) * amplitude*0.4
        ctx.lineTo(x, y)
      }
      ctx.lineTo(w, h)
      ctx.closePath()
    }

    const draw = () => {
      t++
      const w = canvas.width
      const h = canvas.height

      ctx.clearRect(0, 0, w, h)

      // ── Sky gradient ─────────────────────────────
      const skyGrad = ctx.createLinearGradient(0, 0, 0, h * 0.72)
      skyGrad.addColorStop(0,    '#010008')
      skyGrad.addColorStop(0.25, '#05001a')
      skyGrad.addColorStop(0.55, '#0d0030')
      skyGrad.addColorStop(0.75, '#1a0048')
      skyGrad.addColorStop(1,    '#2d0060')
      ctx.fillStyle = skyGrad
      ctx.fillRect(0, 0, w, h * 0.72)

      // ── Horizon aurora glow ───────────────────────
      const hY = h * 0.62
      const auroraGrad = ctx.createRadialGradient(w*0.5, hY, 0, w*0.5, hY, w*0.65)
      auroraGrad.addColorStop(0,   'rgba(255,120,30,0.22)')
      auroraGrad.addColorStop(0.25,'rgba(220,60,120,0.14)')
      auroraGrad.addColorStop(0.5, 'rgba(120,30,200,0.08)')
      auroraGrad.addColorStop(1,   'transparent')
      ctx.fillStyle = auroraGrad
      ctx.fillRect(0, hY - h*0.3, w, h*0.55)

      // Pulse the glow
      const pulse = 0.5 + 0.5 * Math.sin(t * 0.012)
      const auroraGrad2 = ctx.createRadialGradient(w*0.5, hY, 0, w*0.5, hY, w*0.4)
      auroraGrad2.addColorStop(0,   `rgba(255,160,50,${0.08 + pulse*0.06})`)
      auroraGrad2.addColorStop(0.4, `rgba(200,50,150,${0.04 + pulse*0.03})`)
      auroraGrad2.addColorStop(1,   'transparent')
      ctx.fillStyle = auroraGrad2
      ctx.fillRect(0, hY - h*0.25, w, h*0.45)

      // ── Moon ─────────────────────────────────────
      const moonX = w * 0.82
      const moonY = h * 0.12 + Math.sin(t * 0.008) * 4
      const moonR  = Math.min(w, h) * 0.04
      // Glow
      const mGlow = ctx.createRadialGradient(moonX, moonY, 0, moonX, moonY, moonR*4)
      mGlow.addColorStop(0,   'rgba(255,240,180,0.18)')
      mGlow.addColorStop(0.4, 'rgba(255,220,120,0.07)')
      mGlow.addColorStop(1,   'transparent')
      ctx.fillStyle = mGlow
      ctx.beginPath()
      ctx.arc(moonX, moonY, moonR*4, 0, Math.PI*2)
      ctx.fill()
      // Moon face
      const mFace = ctx.createRadialGradient(moonX-moonR*0.2, moonY-moonR*0.2, 0, moonX, moonY, moonR)
      mFace.addColorStop(0,   '#fff9e6')
      mFace.addColorStop(0.6, '#fde68a')
      mFace.addColorStop(1,   '#f59e0b')
      ctx.fillStyle = mFace
      ctx.beginPath()
      ctx.arc(moonX, moonY, moonR, 0, Math.PI*2)
      ctx.fill()
      // Crescent shadow
      ctx.fillStyle = 'rgba(10,0,30,0.35)'
      ctx.beginPath()
      ctx.arc(moonX + moonR*0.3, moonY - moonR*0.1, moonR*0.82, 0, Math.PI*2)
      ctx.fill()

      // ── Stars ─────────────────────────────────────
      stars.forEach(s => {
        const bri = 0.3 + 0.7 * Math.sin(t * s.twinkle + s.offset)
        const x = s.x * w
        const y = s.y * h
        ctx.beginPath()
        ctx.arc(x, y, s.r, 0, Math.PI*2)
        ctx.fillStyle = s.color
        ctx.globalAlpha = bri
        ctx.fill()
        if (s.r > 1.3 && bri > 0.8) {
          ctx.strokeStyle = s.color
          ctx.globalAlpha = bri * 0.45
          ctx.lineWidth = 0.5
          ctx.beginPath()
          ctx.moveTo(x - s.r*3, y); ctx.lineTo(x + s.r*3, y)
          ctx.moveTo(x, y - s.r*3); ctx.lineTo(x, y + s.r*3)
          ctx.stroke()
        }
      })
      ctx.globalAlpha = 1

      // ── Shooting stars ─────────────────────────────
      shoots.forEach((s, i) => {
        if (s.phase === 'wait') {
          s.waited++
          if (s.waited >= s.wait) { s.phase = 'fly'; s.progress = 0 }
          return
        }
        s.progress += s.speed
        const hx = s.x * w + Math.cos(s.angle) * s.progress
        const hy = s.y * h + Math.sin(s.angle) * s.progress
        const tx = s.x * w + Math.cos(s.angle) * Math.max(0, s.progress - s.len)
        const ty = s.y * h + Math.sin(s.angle) * Math.max(0, s.progress - s.len)
        const sg = ctx.createLinearGradient(tx, ty, hx, hy)
        sg.addColorStop(0, 'rgba(255,255,255,0)')
        sg.addColorStop(0.5,'rgba(200,170,255,0.7)')
        sg.addColorStop(1, 'rgba(255,255,255,0.95)')
        ctx.beginPath(); ctx.moveTo(tx,ty); ctx.lineTo(hx,hy)
        ctx.strokeStyle = sg; ctx.lineWidth = 1.8; ctx.globalAlpha = 1; ctx.stroke()
        if (s.progress > s.len + 600) shoots[i] = makeShoot()
      })

      // ── Dune layers ────────────────────────────────
      // Far dune (darker, smaller)
      dunePath(w, h, h * 0.69, h * 0.025, 3, 0)
      const farDune = ctx.createLinearGradient(0, h*0.67, 0, h)
      farDune.addColorStop(0, '#3d2200')
      farDune.addColorStop(0.3,'#5c3500')
      farDune.addColorStop(1,  '#2a1800')
      ctx.fillStyle = farDune; ctx.fill()

      // Mid dune
      dunePath(w, h, h * 0.73, h * 0.04, 2.5, 1.4)
      const midDune = ctx.createLinearGradient(0, h*0.71, 0, h)
      midDune.addColorStop(0, '#7a4a10')
      midDune.addColorStop(0.2,'#a06020')
      midDune.addColorStop(1,  '#3d2000')
      ctx.fillStyle = midDune; ctx.fill()

      // Near dune (brighter, lit by horizon)
      dunePath(w, h, h * 0.78, h * 0.055, 2, 0.8)
      const nearDune = ctx.createLinearGradient(0, h*0.76, 0, h)
      nearDune.addColorStop(0, '#c47820')
      nearDune.addColorStop(0.1,'#b86010')
      nearDune.addColorStop(0.4,'#8a4510')
      nearDune.addColorStop(1,  '#3a1c00')
      ctx.fillStyle = nearDune; ctx.fill()

      // Foreground sand floor
      const sandFloor = ctx.createLinearGradient(0, h*0.84, 0, h)
      sandFloor.addColorStop(0, '#d4882a')
      sandFloor.addColorStop(0.05,'#c07020')
      sandFloor.addColorStop(0.3, '#8a4812')
      sandFloor.addColorStop(1,   '#2a1400')
      ctx.fillRect(0, h*0.84, w, h*0.16)
      // Apply gradient over the rect
      ctx.fillStyle = sandFloor
      ctx.fillRect(0, h*0.84, w, h*0.16)

      // Sand ripples
      ctx.strokeStyle = 'rgba(255,200,100,0.07)'
      ctx.lineWidth = 1
      for (let i = 0; i < 8; i++) {
        const ry = h * (0.86 + i * 0.018) + Math.sin(t*0.005 + i) * 2
        ctx.beginPath()
        ctx.moveTo(0, ry)
        ctx.bezierCurveTo(w*0.25, ry-4, w*0.75, ry+4, w, ry)
        ctx.stroke()
      }

      // ── Camels ────────────────────────────────────
      camels.forEach(cam => {
        cam.x += cam.speed * cam.dir
        if (cam.x > 1.15) cam.dir = -1
        if (cam.x < -0.15) cam.dir = 1
        const cx = cam.x * w
        const cy = h * 0.82
        const sz = cam.size * Math.min(w, h)
        drawCamel(cx, cy, sz, cam.dir < 0)
      })

      // ── Sand particles drifting up ──────────────────
      ctx.globalAlpha = 1
      grains.forEach(g => {
        g.y -= g.speed
        g.x += g.drift
        if (g.y < 0.55) { g.y = 0.88 + Math.random()*0.12; g.x = Math.random() }
        const px = g.x * w
        const py = g.y * h
        ctx.beginPath()
        ctx.arc(px, py, g.r, 0, Math.PI*2)
        ctx.fillStyle = `rgba(220,170,80,${g.alpha * (g.y < 0.75 ? (g.y-0.55)/0.2 : 1)})`
        ctx.fill()
      })

      ctx.globalAlpha = 1
      raf = requestAnimationFrame(draw)
    }

    draw()
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', width: '100%', height: '100%' }}
    />
  )
}
