import { motion, useScroll, useSpring } from 'framer-motion'

export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] z-[120] origin-left"
      style={{
        scaleX,
        background: 'linear-gradient(90deg, #00FFB2, #6EE7FF, #fff)',
        boxShadow: '0 0 20px rgba(110,231,255,0.4)',
      }}
    />
  )
}
