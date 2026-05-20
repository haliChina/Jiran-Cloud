import { useEffect } from 'react'
import { motion, useMotionValue, useTransform, animate } from 'framer-motion'

interface CountUpProps {
  to: number
  from?: number
  duration?: number
  delay?: number
  suffix?: string
  prefix?: string
  className?: string
}

export function CountUp({ to, from = 0, duration = 1.5, delay = 0, suffix = '', prefix = '', className }: CountUpProps) {
  const count = useMotionValue(from)
  const rounded = useTransform(count, (latest) => {
    if (Number.isInteger(to)) return String(Math.round(latest))
    return String(latest.toFixed(1))
  })

  useEffect(() => {
    const controls = animate(count, to, {
      duration,
      delay,
      ease: 'easeOut',
    })
    return controls.stop
  }, [count, to, duration, delay])

  return (
    <span className={className}>
      {prefix}
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  )
}
