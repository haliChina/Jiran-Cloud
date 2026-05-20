import { useEffect, useRef } from 'react'

interface Cell {
  active: boolean
  phase: number
  speed: number
  type: 'default' | 'hot' | 'watch'
}

export function NodeMatrix() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')!
    if (!ctx) return

    const cols = 7
    const rows = 6
    const cellSize = 28
    const gap = 7
    const totalW = cols * (cellSize + gap) - gap
    const totalH = rows * (cellSize + gap) - gap

    const dpr = Math.min(window.devicePixelRatio, 2)
    canvas.width = totalW * dpr
    canvas.height = totalH * dpr
    canvas.style.width = `${totalW}px`
    canvas.style.height = `${totalH}px`
    ctx.scale(dpr, dpr)

    const cells: Cell[] = Array.from({ length: cols * rows }, (_, i) => ({
      active: false,
      phase: Math.random() * Math.PI * 2,
      speed: 0.5 + Math.random() * 2,
      type: (i % 7 === 0 || i % 5 === 0) ? 'hot' : (i % 11 === 0 ? 'watch' : 'default'),
    }))

    let cursor = 0
    let animId: number
    let lastPulse = 0

    function animate() {
      const now = Date.now()
      ctx.clearRect(0, 0, totalW, totalH)

      if (now - lastPulse > 1300) {
        cells.forEach(c => { c.active = false; c.type = 'default' })
        for (let i = 0; i < 7; i++) {
          const idx = (cursor + i * 5) % cells.length
          cells[idx].active = true
          cells[idx].type = i % 2 === 0 ? 'hot' : 'watch'
        }
        cursor = (cursor + 3) % cells.length
        lastPulse = now
      }

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const i = row * cols + col
          const cell = cells[i]
          const x = col * (cellSize + gap)
          const y = row * (cellSize + gap)

          const pulse = Math.sin(now * 0.002 * cell.speed + cell.phase) * 0.5 + 0.5

          ctx.beginPath()
          ctx.roundRect(x, y, cellSize, cellSize, 7)

          if (cell.type === 'hot') {
            ctx.fillStyle = `rgba(110, 231, 255, ${0.15 + pulse * 0.15})`
            ctx.strokeStyle = `rgba(110, 231, 255, ${0.2 + pulse * 0.15})`
          } else if (cell.type === 'watch') {
            ctx.fillStyle = `rgba(0, 255, 178, ${0.1 + pulse * 0.1})`
            ctx.strokeStyle = `rgba(0, 255, 178, ${0.15 + pulse * 0.1})`
          } else {
            ctx.fillStyle = `rgba(255, 255, 255, ${0.03 + pulse * 0.02})`
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.06)'
          }

          ctx.fill()
          ctx.lineWidth = 1
          ctx.stroke()

          if (cell.active) {
            const dotAlpha = pulse * 0.8
            ctx.beginPath()
            ctx.arc(x + cellSize / 2, y + cellSize / 2, 2.5, 0, Math.PI * 2)
            ctx.fillStyle = `rgba(240, 244, 248, ${dotAlpha})`
            ctx.fill()
          }
        }
      }

      animId = requestAnimationFrame(animate)
    }

    animate()

    return () => cancelAnimationFrame(animId)
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
    />
  )
}
