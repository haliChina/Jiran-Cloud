import { useEffect, useRef } from 'react'
import { useReducedMotion } from '@/hooks/useReducedMotion'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  life: number
  maxLife: number
}

export function QuantumField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const reduced = useReducedMotion()
  const mouseRef = useRef({ x: 0, y: 0 })
  const particlesRef = useRef<Particle[]>([])

  useEffect(() => {
    if (reduced) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')!
    if (!ctx) return

    let width = window.innerWidth
    let height = window.innerHeight
    const dpr = Math.min(window.devicePixelRatio, 2)

    canvas.width = width * dpr
    canvas.height = height * dpr
    canvas.style.width = `${width}px`
    canvas.style.height = `${height}px`
    ctx.scale(dpr, dpr)

    const PARTICLE_COUNT = Math.min(180, Math.floor(width * height / 8000))
    const NOISE_SCALE = 0.003
    const NOISE_SPEED = 0.0004

    function createParticle(): Particle {
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        vx: 0,
        vy: 0,
        life: 0,
        maxLife: 200 + Math.random() * 300,
      }
    }

    particlesRef.current = Array.from({ length: PARTICLE_COUNT }, createParticle)

    let time = 0
    let animId: number

    function noise2D(x: number, y: number): number {
      const n = Math.sin(x * 12.9898 + y * 78.233) * 43758.5453
      return n - Math.floor(n)
    }

    function smoothNoise(x: number, y: number): number {
      const ix = Math.floor(x)
      const iy = Math.floor(y)
      const fx = x - ix
      const fy = y - iy
      const sx = fx * fx * (3 - 2 * fx)
      const sy = fy * fy * (3 - 2 * fy)
      const n00 = noise2D(ix, iy)
      const n10 = noise2D(ix + 1, iy)
      const n01 = noise2D(ix, iy + 1)
      const n11 = noise2D(ix + 1, iy + 1)
      const nx0 = n00 * (1 - sx) + n10 * sx
      const nx1 = n01 * (1 - sx) + n11 * sx
      return nx0 * (1 - sy) + nx1 * sy
    }

    function getAngle(x: number, y: number): number {
      const n1 = smoothNoise(x * NOISE_SCALE + time, y * NOISE_SCALE)
      const n2 = smoothNoise(x * NOISE_SCALE, y * NOISE_SCALE + time * 0.7)
      return (n1 + n2) * Math.PI * 4
    }

    function animate() {
      time += NOISE_SPEED
      ctx.fillStyle = 'rgba(3, 4, 8, 0.08)'
      ctx.fillRect(0, 0, width, height)

      const mx = mouseRef.current.x
      const my = mouseRef.current.y

      for (const p of particlesRef.current) {
        const angle = getAngle(p.x, p.y)

        let fx = Math.cos(angle) * 0.8
        let fy = Math.sin(angle) * 0.8

        const dx = p.x - mx
        const dy = p.y - my
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 200 && dist > 0) {
          const force = (200 - dist) / 200 * 2
          fx += (dx / dist) * force
          fy += (dy / dist) * force
        }

        p.vx = p.vx * 0.92 + fx * 0.08
        p.vy = p.vy * 0.92 + fy * 0.08
        p.x += p.vx
        p.y += p.vy
        p.life++

        if (p.life > p.maxLife || p.x < -20 || p.x > width + 20 || p.y < -20 || p.y > height + 20) {
          p.x = Math.random() * width
          p.y = Math.random() * height
          p.vx = 0
          p.vy = 0
          p.life = 0
          p.maxLife = 200 + Math.random() * 300
        }

        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy)
        const alpha = Math.min(1, speed * 0.5) * (1 - p.life / p.maxLife) * 0.6

        const hue = 190 + speed * 20
        ctx.beginPath()
        ctx.arc(p.x, p.y, 1 + speed * 0.3, 0, Math.PI * 2)
        ctx.fillStyle = `hsla(${hue}, 90%, 70%, ${alpha})`
        ctx.fill()
      }

      animId = requestAnimationFrame(animate)
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }

    const handleResize = () => {
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.scale(dpr, dpr)
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    window.addEventListener('resize', handleResize)

    animate()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleResize)
    }
  }, [reduced])

  if (reduced) return null

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0"
      aria-hidden="true"
    />
  )
}
