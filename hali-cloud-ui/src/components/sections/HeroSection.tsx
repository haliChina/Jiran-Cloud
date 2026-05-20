import { motion } from 'framer-motion'
import { MagneticButton } from '@/components/interactive/MagneticButton'
import { TiltCard } from '@/components/interactive/TiltCard'
import { CountUp } from '@/components/interactive/CountUp'
import { QuantumRadar } from '@/components/canvas/QuantumRadar'
import { NodeMatrix } from '@/components/canvas/NodeMatrix'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import { spring } from '@/theme/tokens'

const stagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.04 },
  },
}

const charVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: spring.bouncy },
}

function AnimatedTitle({ text }: { text: string }) {
  return (
    <motion.span variants={stagger} initial="hidden" animate="visible" className="inline-flex flex-wrap">
      {text.split('').map((char, i) => (
        <motion.span key={i} variants={charVariant} className={char === ' ' ? 'w-[0.3em]' : ''}>
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </motion.span>
  )
}

const logMessages = [
  '状态同步完成',
  '云端节点检测正常',
  '配置更新成功',
  '数据监控已刷新',
  '订阅配置面板已就绪',
  '任务队列保持稳定',
]

export function HeroSection() {
  const { ref: heroRef, isVisible: heroVisible } = useScrollAnimation()

  return (
    <section id="overview" className="min-h-screen pt-32 pb-16 px-5">
      <div ref={heroRef} className="max-w-shell mx-auto grid lg:grid-cols-[0.88fr_1.12fr] gap-7 items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={heroVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ ...spring.gentle, duration: 0.8 }}
          className="py-6"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, ...spring.bouncy }}
            className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full border border-quantum-border bg-quantum-panel text-[11px] tracking-[0.12em] uppercase text-quantum-muted mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-quantum-green shadow-[0_0_8px_rgba(0,255,178,0.6)] animate-pulse" />
            JiranDaigua
          </motion.div>

          <h1 className="text-[clamp(2.8rem,7vw,5.8rem)] leading-[0.9] tracking-[-0.07em] font-display font-black max-w-[740px]">
            <AnimatedTitle text="Hali云，把" />
            <span className="text-transparent [-webkit-text-stroke:1px_rgba(240,244,248,0.5)]">
              客户服务
            </span>
            <AnimatedTitle text="放在首位。" />
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="mt-6 max-w-[590px] text-quantum-muted text-[clamp(0.9rem,1.7vw,1.1rem)] leading-[1.9]"
          >
            Hali Cloud 面向QQ云端用户，提供自动化配置、快速管理与账号切换，把分散的操作入口整合成清晰、稳定、可管理的服务平台。
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="mt-6 grid grid-cols-3 max-w-[620px] rounded-3xl overflow-hidden border border-quantum-border bg-quantum-panel"
          >
            {[
              { value: 'normal', label: '服务状态' },
              { value: '24h', label: '在线' },
              { value: '99%', label: '任务成功率' },
            ].map((item, i) => (
              <div key={i} className={`p-4 ${i < 2 ? 'border-r border-quantum-border' : ''}`}>
                <strong className="block text-lg font-display font-bold tracking-tight">
                  {item.value === '99%' ? <CountUp to={99} suffix="%" duration={2} delay={1} /> : item.value}
                </strong>
                <small className="block mt-1 text-quantum-faint text-xs">{item.label}</small>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="flex flex-wrap gap-3 mt-8"
          >
            <MagneticButton href="https://hali.dgw.wtf/user/reg.php" className="h-11 px-6 rounded-full border border-white/50 text-sm font-bold text-quantum-bg bg-gradient-to-b from-white to-[#b9d5ff] shadow-[0_8px_24px_rgba(110,231,255,0.2)]">
              注册
            </MagneticButton>
            <MagneticButton href="https://hali.dgw.wtf/user/login.php" className="h-11 px-6 rounded-full border border-quantum-border text-sm font-semibold text-quantum-text/80 bg-quantum-panel hover:bg-quantum-panel-strong transition-colors">
              返回控制台
            </MagneticButton>
            <MagneticButton href="https://shop.userhali.com/?category=jiran" className="h-11 px-6 rounded-full border border-quantum-border text-sm font-semibold text-quantum-text/80 bg-quantum-panel hover:bg-quantum-panel-strong transition-colors">
              购买链接
            </MagneticButton>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={heroVisible ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.3, ...spring.gentle }}
          className="relative"
        >
          <TiltCard className="min-h-[610px] rounded-[36px] border border-quantum-border-strong bg-gradient-to-b from-white/[0.07] to-white/[0.02] shadow-[0_24px_80px_rgba(0,0,0,0.5)] overflow-hidden p-3.5" tiltRange={6}>
            <div className="relative h-full min-h-[582px] grid grid-cols-3 grid-rows-[88px_1fr_150px] gap-3 z-10">
              <div className="col-span-1 row-span-1 rounded-3xl border border-quantum-border bg-[rgba(3,5,8,0.6)] backdrop-blur-xl overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-b from-white/[0.05] to-transparent pointer-events-none" />
                <div className="relative z-10 p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[11px] tracking-[0.14em] uppercase text-quantum-muted font-semibold">状态</span>
                    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-quantum-panel border border-quantum-border text-[10px] text-quantum-muted">
                      <span className="w-1.5 h-1.5 rounded-full bg-quantum-green shadow-[0_0_6px_rgba(0,255,178,0.6)]" />
                      正常
                    </span>
                  </div>
                  <div className="text-2xl font-display font-extrabold tracking-tight">状态正常</div>
                  <div className="mt-2 text-xs text-quantum-muted">安全洞察：找回密码服务已被加入人机验证</div>
                </div>
              </div>

              <div className="col-span-1 row-span-2 rounded-3xl border border-quantum-border-strong bg-gradient-to-b from-white/[0.06] to-white/[0.02] overflow-hidden">
                <div className="h-full flex flex-col">
                  <div className="flex justify-between items-center px-4 py-3 border-b border-quantum-border bg-white/[0.02] text-[11px] tracking-[0.12em] uppercase text-quantum-muted">
                    <span>Hali Cloud</span>
                    <span className="flex gap-1.5">
                      {[0,1,2].map(i => <span key={i} className="w-1.5 h-1.5 rounded-full bg-white/30" />)}
                    </span>
                  </div>
                  <div className="flex-1 flex items-center justify-center p-4">
                    <QuantumRadar />
                  </div>
                  <div className="grid grid-cols-3 border-t border-quantum-border bg-white/[0.02]">
                    {[
                      { value: '128', label: '今日任务队列' },
                      { value: '99.9%', label: '任务成功率' },
                      { value: '02.4s', label: '状态刷新延迟' },
                    ].map((item, i) => (
                      <div key={i} className={`p-3 ${i < 2 ? 'border-r border-quantum-border' : ''}`}>
                        <strong className="block text-base font-display font-bold tracking-tight">{item.value}</strong>
                        <small className="text-quantum-faint text-[10px]">{item.label}</small>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="col-span-1 row-span-1 rounded-3xl border border-quantum-border bg-[rgba(3,5,8,0.6)] backdrop-blur-xl overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-b from-white/[0.05] to-transparent pointer-events-none" />
                <div className="relative z-10 p-4">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-[11px] tracking-[0.14em] uppercase text-quantum-muted font-semibold">节点状态</span>
                    <span className="text-[11px] text-quantum-faint">42 在线</span>
                  </div>
                  <NodeMatrix />
                </div>
              </div>

              <div className="col-span-1 row-span-1 rounded-3xl border border-quantum-border bg-[rgba(3,5,8,0.6)] backdrop-blur-xl overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-b from-white/[0.05] to-transparent pointer-events-none" />
                <div className="relative z-10 p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[11px] tracking-[0.14em] uppercase text-quantum-muted font-semibold">订阅</span>
                    <span className="text-[10px] text-quantum-faint">快速入口</span>
                  </div>
                  <div className="grid gap-1.5 mt-1">
                    {[
                      { name: 'QQ云端', price: '¥3 起', sub: '基础云端配置', href: 'https://shop.userhali.com/products/16' },
                      { name: 'QQ代挂', price: '¥5 起', sub: '持续在线配置', href: 'https://shop.userhali.com/products/15' },
                      { name: '空间秒赞', price: '¥1', sub: '限购一次月卡', href: 'https://hali.dgw.wtf/user/reg.php', hot: true },
                    ].map((item, i) => (
                      <a key={i} href={item.href} className={`flex items-center justify-between gap-2 px-3 py-2 rounded-xl border transition-all duration-200 hover:translate-x-0.5 ${item.hot ? 'bg-quantum-blue/[0.08] border-quantum-blue/20 hover:border-quantum-blue/40' : 'bg-quantum-panel border-quantum-border hover:border-quantum-border-strong'}`}>
                        <div>
                          <span className="text-xs text-quantum-text/70">{item.name}</span>
                          <small className="block text-quantum-faint text-[9px]">{item.sub}</small>
                        </div>
                        <b className="text-base font-display font-bold tracking-tight">{item.price}</b>
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              <div className="col-span-2 row-span-1 rounded-3xl border border-quantum-border bg-[rgba(3,5,8,0.6)] backdrop-blur-xl overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-b from-white/[0.05] to-transparent pointer-events-none" />
                <div className="relative z-10 p-4">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-[11px] tracking-[0.14em] uppercase text-quantum-muted font-semibold">Logs</span>
                    <span className="text-[10px] text-quantum-faint font-mono">{new Date().toLocaleTimeString('zh-CN', { hour12: false })}</span>
                  </div>
                  <div className="grid gap-1">
                    {logMessages.slice(0, 4).map((msg, i) => (
                      <div key={i} className="flex items-center gap-3 px-2 py-1.5 rounded-lg hover:bg-white/[0.02] transition-colors">
                        <span className="w-1.5 h-1.5 rounded-full bg-quantum-green shadow-[0_0_6px_rgba(0,255,178,0.5)]" />
                        <span className="text-[10px] text-quantum-faint font-mono w-10">{String(i + 1).padStart(2, '0')}:0{i * 6 + 2}</span>
                        <span className="text-xs text-quantum-text/80 flex-1">{msg}</span>
                        <em className="not-italic text-[9px] text-quantum-green bg-quantum-green/10 px-1.5 py-0.5 rounded">{i === 0 ? 'DONE' : 'OK'}</em>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.08] to-transparent -translate-x-full animate-[scan_7s_ease-in-out_infinite] opacity-25" />
            </div>
          </TiltCard>
        </motion.div>
      </div>
    </section>
  )
}
