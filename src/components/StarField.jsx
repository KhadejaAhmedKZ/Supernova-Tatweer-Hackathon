import { useEffect, useRef } from 'react'

export default function StarField() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    const resize = () => {
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    // Generate stars
    const stars = Array.from({ length: 220 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.6 + 0.2,
      twinkleSpeed: Math.random() * 0.015 + 0.005,
      twinkleOffset: Math.random() * Math.PI * 2,
      color: Math.random() > 0.85
        ? (Math.random() > 0.5 ? '#fde68a' : '#bae6fd')   // gold or icy blue accent stars
        : '#ffffff',
    }))

    // Shooting stars pool
    const shoots = Array.from({ length: 4 }, () => makeShoot(canvas))
    function makeShoot(c) {
      return {
        x: Math.random() * c.width * 0.7 + c.width * 0.1,
        y: Math.random() * c.height * 0.4,
        len: Math.random() * 120 + 60,
        speed: Math.random() * 6 + 4,
        angle: Math.PI / 5 + Math.random() * 0.3,
        alpha: 0,
        phase: 'wait',
        waitFor: Math.random() * 400 + 60,
        waited: 0,
        progress: 0,
      }
    }

    let raf
    let t = 0

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      t++

      // Draw stars
      stars.forEach(s => {
        const bri = 0.45 + 0.55 * Math.sin(t * s.twinkleSpeed + s.twinkleOffset)
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
        ctx.fillStyle = s.color
        ctx.globalAlpha = bri
        ctx.fill()

        // Tiny cross sparkle for bigger stars
        if (s.r > 1.2 && bri > 0.85) {
          ctx.strokeStyle = s.color
          ctx.globalAlpha = bri * 0.5
          ctx.lineWidth = 0.5
          ctx.beginPath()
          ctx.moveTo(s.x - s.r * 3, s.y)
          ctx.lineTo(s.x + s.r * 3, s.y)
          ctx.moveTo(s.x, s.y - s.r * 3)
          ctx.lineTo(s.x, s.y + s.r * 3)
          ctx.stroke()
        }
      })

      // Draw shooting stars
      shoots.forEach((s, i) => {
        if (s.phase === 'wait') {
          s.waited++
          if (s.waited >= s.waitFor) { s.phase = 'in'; s.progress = 0 }
          return
        }

        s.progress += s.speed
        const head = { x: s.x + Math.cos(s.angle) * s.progress, y: s.y + Math.sin(s.angle) * s.progress }
        const tail = { x: s.x + Math.cos(s.angle) * Math.max(0, s.progress - s.len), y: s.y + Math.sin(s.angle) * Math.max(0, s.progress - s.len) }

        const grad = ctx.createLinearGradient(tail.x, tail.y, head.x, head.y)
        grad.addColorStop(0, 'rgba(255,255,255,0)')
        grad.addColorStop(0.6, 'rgba(200,180,255,0.6)')
        grad.addColorStop(1, 'rgba(255,255,255,0.95)')

        ctx.beginPath()
        ctx.moveTo(tail.x, tail.y)
        ctx.lineTo(head.x, head.y)
        ctx.strokeStyle = grad
        ctx.lineWidth = 1.5
        ctx.globalAlpha = 1
        ctx.stroke()

        if (s.progress > s.len + 500) {
          shoots[i] = makeShoot(canvas)
        }
      })

      ctx.globalAlpha = 1
      raf = requestAnimationFrame(draw)
    }

    draw()
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}
    />
  )
}
