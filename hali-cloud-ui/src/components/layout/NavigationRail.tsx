import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion'
import { MagneticButton } from '@/components/interactive/MagneticButton'
import { cn } from '@/lib/utils'

const navLinks = [
  { label: '概览', href: '#overview' },
  { label: '功能', href: '#features' },
  { label: '价格', href: '#pricing' },
  { label: '优势', href: '#advantages' },
  { label: 'FAQ', href: '#faq' },
  { label: '购买', href: 'https://shop.userhali.com/?category=jiran' },
]

export function NavigationRail() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setIsScrolled(latest > 50)
  })

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  return (
    <>
      <motion.header
        className={cn(
          'fixed z-50 top-4 left-1/2 -translate-x-1/2 w-[min(1180px,calc(100%-28px))]',
          'grid grid-cols-[auto_1fr_auto] items-center gap-4',
          'px-4 py-2.5 rounded-full',
          'border transition-colors duration-300',
          isScrolled
            ? 'bg-quantum-bg/90 border-quantum-border-strong backdrop-blur-xl shadow-lg shadow-black/30'
            : 'bg-quantum-bg/60 border-quantum-border backdrop-blur-lg'
        )}
      >
        <a href="#overview" className="flex items-center gap-2.5 min-w-max">
          <span className="w-8 h-8 rounded-lg overflow-hidden border border-quantum-border-strong shadow-[0_0_20px_rgba(110,231,255,0.15)]">
            <img src="https://img.xn--6krz1l.xn--io0a7i/i/2026/05/16/6a07913c1806f.jpg" alt="" className="w-full h-full object-cover" />
          </span>
          <span className="font-display text-sm font-bold tracking-wide">Hali Cloud</span>
        </a>

        <nav className="hidden md:flex justify-center items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-xs text-quantum-muted hover:text-white px-3 py-2 rounded-full transition-colors duration-200 hover:bg-white/[0.06]"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-2">
          <MagneticButton
            href="https://hali.dgw.wtf/user/login.php"
            className="h-9 px-4 rounded-full border border-quantum-border text-xs font-semibold text-quantum-text/80 bg-quantum-panel hover:bg-quantum-panel-strong transition-colors"
          >
            登录
          </MagneticButton>
          <MagneticButton
            href="https://hali.dgw.wtf/user/reg.php"
            className="h-9 px-4 rounded-full border border-white/50 text-xs font-semibold text-quantum-bg bg-gradient-to-b from-white to-[#b9d5ff] shadow-[0_8px_24px_rgba(110,231,255,0.2)]"
          >
            注册
          </MagneticButton>
        </div>

        <button
          className="md:hidden w-9 h-9 rounded-full border border-quantum-border bg-quantum-panel flex items-center justify-center relative overflow-hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="展开导航"
        >
          <div className="flex flex-col gap-[5px]">
            <motion.span
              className="block w-4 h-[1.5px] bg-white/80 origin-center"
              animate={mobileOpen ? { rotate: 45, y: 3.25 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.25 }}
            />
            <motion.span
              className="block w-4 h-[1.5px] bg-white/80 origin-center"
              animate={mobileOpen ? { rotate: -45, y: -3.25 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.25 }}
            />
          </div>
        </button>
      </motion.header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed z-40 inset-0 top-20 bg-quantum-bg/95 backdrop-blur-xl p-4 md:hidden"
          >
            <nav className="grid grid-cols-2 gap-2">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="text-center py-3 rounded-xl bg-quantum-panel border border-quantum-border text-sm text-quantum-muted hover:text-white transition-colors"
                >
                  {link.label}
                </motion.a>
              ))}
            </nav>
            <div className="flex gap-2 mt-4">
              <a href="https://hali.dgw.wtf/user/login.php" className="flex-1 py-3 rounded-xl border border-quantum-border text-center text-sm font-semibold bg-quantum-panel">登录</a>
              <a href="https://hali.dgw.wtf/user/reg.php" className="flex-1 py-3 rounded-xl border border-white/40 text-center text-sm font-semibold text-quantum-bg bg-gradient-to-b from-white to-[#b9d5ff]">注册</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
