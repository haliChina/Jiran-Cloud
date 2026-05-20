import { motion } from 'framer-motion'
import { MagneticButton } from '@/components/interactive/MagneticButton'
import { TypeWriter } from '@/components/interactive/TypeWriter'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import { spring } from '@/theme/tokens'

const terminalLines = [
  'service.status = running',
  'today.online = 24h',
  'task.success = 99%',
  'security.state = normal',
  'zhuang.muhao = true',
]

export function CTASection() {
  const { ref, isVisible } = useScrollAnimation()

  return (
    <>
      <section className="pb-14 px-5">
        <div ref={ref} className="max-w-shell mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={spring.gentle}
            className="min-h-[360px] rounded-[38px] border border-quantum-border-strong bg-gradient-to-b from-white/[0.06] to-white/[0.02] shadow-[0_24px_80px_rgba(0,0,0,0.5)] overflow-hidden relative p-8 grid lg:grid-cols-[1fr_0.76fr] gap-7 items-center"
          >
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.08] to-transparent -translate-x-full animate-[scan_8s_ease-in-out_infinite] opacity-20" />
            </div>

            <div className="relative z-10">
              <p className="text-quantum-faint text-xs tracking-[0.18em] uppercase mb-3">现在开始吧</p>
              <h2 className="text-[clamp(2rem,5vw,3.6rem)] leading-[0.98] tracking-[-0.06em] font-display font-extrabold max-w-[720px]">
                进入 Hali Cloud，把服务配置变成一条清晰指令。
              </h2>
              <p className="mt-5 max-w-[640px] text-quantum-muted leading-[1.9] text-[0.9rem]">
                从注册开始，选择需要的服务与周期。已有账号可直接登录，返回你的平台控制台。
              </p>
              <div className="flex flex-wrap gap-3 mt-8">
                <MagneticButton href="https://hali.dgw.wtf/user/reg.php" className="h-11 px-6 rounded-full border border-white/50 text-sm font-bold text-quantum-bg bg-gradient-to-b from-white to-[#b9d5ff] shadow-[0_8px_24px_rgba(110,231,255,0.2)]">
                  立即注册
                </MagneticButton>
                <MagneticButton href="https://hali.dgw.wtf/user/login.php" className="h-11 px-6 rounded-full border border-quantum-border text-sm font-semibold text-quantum-text/80 bg-quantum-panel hover:bg-quantum-panel-strong transition-colors">
                  已有账号登录
                </MagneticButton>
              </div>
            </div>

            <div className="relative z-10">
              <div className="border border-quantum-border bg-[rgba(3,5,8,0.65)] rounded-[26px] overflow-hidden">
                <div className="h-12 flex justify-between items-center px-4 border-b border-quantum-border text-quantum-faint text-xs">
                  <span>HaliYun</span>
                  <span>准备就绪</span>
                </div>
                <div className="p-4">
                  {isVisible && <TypeWriter lines={terminalLines} speed={30} delay={600} className="space-y-1" />}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <footer className="border-t border-quantum-border py-7 px-5">
        <div className="max-w-shell mx-auto flex justify-between items-center gap-4 flex-wrap text-quantum-faint text-sm">
          <div>&copy; {new Date().getFullYear()} HaliYun. Quantum command center styled landing page.</div>
          <div className="flex gap-3.5 flex-wrap">
            {[
              { label: '概览', href: '#overview' },
              { label: '功能', href: '#features' },
              { label: '价格', href: '#pricing' },
              { label: 'FAQ', href: '#faq' },
              { label: '登录', href: 'https://hali.dgw.wtf/user/login.php' },
              { label: '注册', href: 'https://hali.dgw.wtf/user/reg.php' },
            ].map((link) => (
              <a key={link.href} href={link.href} className="text-quantum-muted hover:text-white transition-colors">{link.label}</a>
            ))}
          </div>
        </div>
      </footer>
    </>
  )
}
