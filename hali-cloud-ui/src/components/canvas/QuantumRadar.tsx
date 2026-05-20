import { useEffect, useRef } from 'react'

interface RadarNode {
  angle: number
  dist: number
  size: number
  phase: number
  speed: number
}

export function QuantumRadar() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')!
    if (!ctx) return

    const size = 280
    const dpr = Math.min(window.devicePixelRatio, 2)
    canvas.width = size * dpr
    canvas.height = size * dpr
    canvas.style.width = `${size}px`
    canvas.style.height = `${size}px`
    ctx.scale(dpr, dpr)

    const cx = size / 2
    const cy = size / 2
    const radius = size * 0.42

    const nodes: RadarNode[] = Array.from({ length: 8 }, () => ({
      angle: Math.random() * Math.PI * 2,
      dist: 0.2 + Math.random() * 0.7,
      size: 3 + Math.random() * 4,
      phase: Math.random() * Math.PI * 2,
      speed: 0.5 + Math.random() * 1.5,
    }))

    let sweepAngle = 0
    let animId: number

    function animate() {
      ctx.clearRect(0, 0, size, size)

      for (let i = 1; i <= 4; i++) {
        const r = radius * (i / 4)
        ctx.beginPath()
        ctx.arc(cx, cy, r, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(110, 231, 255, ${0.06 + i * 0.02})`
        ctx.lineWidth = 1
        ctx.stroke()
      }

      ctx.beginPath()
      ctx.moveTo(cx - radius, cy)
      ctx.lineTo(cx + radius, cy)
      ctx.moveTo(cx, cy - radius)
      ctx.lineTo(cx, cy + radius)
      ctx.strokeStyle = 'rgba(110, 231, 255, 0.08)'
      ctx.lineWidth = 1
      ctx.stroke()

      sweepAngle += 0.015

      const gradient = ctx.createConicGradient(sweepAngle, cx, cy)
      gradient.addColorStop(0, 'rgba(110, 231, 255, 0.35)')
      gradient.addColorStop(0.15, 'rgba(110, 231, 255, 0.05)')
      gradient.addColorStop(0.2, 'transparent')
      gradient.addColorStop(1, 'transparent')

      ctx.beginPath()
      ctx.arc(cx, cy, radius, 0, Math.PI * 2)
      ctx.fillStyle = gradient
      ctx.fill()

      for (const node of nodes) {
        const nx = cx + Math.cos(node.angle) * radius * node.dist
        const ny = cy + Math.sin(node.angle) * radius * node.dist

        const pulse = Math.sin(Date.now() * 0.003 * node.speed + node.phase) * 0.5 + 0.5
        const alpha = 0.3 + pulse * 0.7

        ctx.beginPath()
        ctx.arc(nx, ny, node.size + pulse * 3, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(110, 231, 255, ${alpha * 0.15})`
        ctx.fill()

        ctx.beginPath()
        ctx.arc(nx, ny, node.size * 0.6, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(200, 240, 255, ${alpha})`
        ctx.fill()

        ctx.beginPath()
        ctx.arc(nx, ny, node.size + pulse * 8, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(110, 231, 255, ${alpha * 0.2})`
        ctx.lineWidth = 1
        ctx.stroke()
      }

      ctx.beginPath()
      ctx.arc(cx, cy, 3, 0, Math.PI * 2)
      ctx.fillStyle = 'rgba(110, 231, 255, 0.8)'
      ctx.fill()

      animId = requestAnimationFrame(animate)
    }

    animate()

    return () => cancelAnimationFrame(animId)
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="mx-auto"
      aria-hidden="true"
    />
  )
}
