import { motion } from 'framer-motion'
import { TiltCard } from '@/components/interactive/TiltCard'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import { spring } from '@/theme/tokens'

const orbitCards = [
  { title: '云端服务', desc: '面向常用云端业务，提供清晰的订阅配置入口。' },
  { title: '自动化配置', desc: '减少重复操作，把流程压缩成更稳定的任务链路。' },
  { title: '状态监控', desc: '用状态矩阵与任务日志呈现关键变化，不让用户盲等。' },
  { title: '账号管理', desc: '登录、注册、订阅与服务入口统一收束。' },
]

const capItems = [
  { title: '状态先行', desc: '把"是否运行、是否稳定、是否完成"放在视觉第一层，用户进入页面即可判断平台当前状态。' },
  { title: '订阅透明', desc: '价格系统以配置面板呈现，不用复杂营销话术，只保留时长、价格和入口。' },
  { title: '流程可感知', desc: '注册、选择、配置、查看状态形成闭环，页面像一条小型产品故事线。' },
]

export function FeaturesSection() {
  const { ref, isVisible } = useScrollAnimation()

  return (
    <section id="features" className="py-20 px-5">
      <div ref={ref} className="max-w-shell mx-auto">
        <div className="grid lg:grid-cols-[0.7fr_1fr] gap-7 items-end mb-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={isVisible ? { opacity: 1, y: 0 } : {}} transition={spring.gentle}>
            <p className="text-quantum-faint text-xs tracking-[0.18em] uppercase mb-3">服务能力</p>
            <h2 className="text-[clamp(2rem,5vw,3.6rem)] leading-[0.98] tracking-[-0.06em] font-display font-extrabold">
              服务能力不是硬堆节点，而是清晰的调度和高效的协同机制。
            </h2>
          </motion.div>
          <motion.p initial={{ opacity: 0, y: 15 }} animate={isVisible ? { opacity: 1, y: 0 } : {}} transition={{ ...spring.gentle, delay: 0.15 }} className="text-quantum-muted leading-[1.9] text-[0.9rem] max-w-[650px]">
            从云端服务配置、任务状态观察，到账号管理与任务执行，Hali Cloud 用控制台式的结构降低操作难度，让关键信息始终可见。
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-[1.06fr_0.94fr] gap-4">
          <TiltCard className="min-h-[440px] rounded-[32px] border border-quantum-border-strong bg-gradient-to-b from-white/[0.06] to-white/[0.02] shadow-[0_24px_80px_rgba(0,0,0,0.5)] overflow-hidden relative" tiltRange={8}>
            <div className="absolute left-1/2 top-[56%] -translate-x-1/2 -translate-y-1/2 w-[540px] h-[540px] rounded-full opacity-60 pointer-events-none"
              style={{
                background: 'radial-gradient(circle, rgba(255,255,255,0.08), transparent 8%), repeating-radial-gradient(circle, transparent 0 52px, rgba(255,255,255,0.06) 53px, transparent 54px)',
              }}
            />
            {orbitCards.map((card, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isVisible ? { opacity: 1, scale: 1 } : {}}
                transition={{ ...spring.bouncy, delay: 0.2 + i * 0.1 }}
                className="absolute w-[188px] p-3.5 rounded-2xl border border-quantum-border bg-[rgba(5,8,12,0.75)] backdrop-blur-xl shadow-[0_18px_45px_rgba(0,0,0,0.3)]"
                style={{
                  left: i % 2 === 0 ? '26px' : undefined,
                  right: i % 2 === 1 ? '34px' : undefined,
                  top: i < 2 ? `${28 + i * 48}px` : undefined,
                  bottom: i >= 2 ? `${30 + (i - 2) * 18}px` : undefined,
                }}
              >
                <b className="block text-sm font-semibold">{card.title}</b>
                <small className="block mt-1.5 text-quantum-faint leading-[1.6] text-xs">{card.desc}</small>
              </motion.div>
            ))}
            <div className="absolute left-1/2 top-[53%] -translate-x-1/2 -translate-y-1/2 w-[178px] h-[178px] grid place-items-center text-center rounded-full border border-quantum-border-strong bg-[radial-gradient(circle,rgba(255,255,255,0.1),rgba(255,255,255,0.03)_58%,transparent)] shadow-[inset_0_0_42px_rgba(255,255,255,0.06),0_0_64px_rgba(110,231,255,0.1)]">
              <div>
                <strong className="text-xl font-display font-bold tracking-tight">NextGen Core</strong>
                <span className="block mt-1.5 text-quantum-faint text-[10px] tracking-[0.12em] uppercase">Control Layer</span>
              </div>
            </div>
          </TiltCard>

          <div className="grid gap-4">
            {capItems.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 30 }}
                animate={isVisible ? { opacity: 1, x: 0 } : {}}
                transition={{ ...spring.gentle, delay: 0.3 + i * 0.12 }}
                className="min-h-[134px] p-5 rounded-[22px] border border-quantum-border bg-quantum-panel relative overflow-hidden group hover:border-quantum-border-strong transition-colors duration-300"
              >
                <div className="absolute bottom-4 right-4 w-20 h-20 rounded-full border border-quantum-border opacity-60 pointer-events-none"
                  style={{ background: 'conic-gradient(from 90deg, rgba(255,255,255,0.15), transparent 42%, rgba(110,231,255,0.12), transparent)' }}
                />
                <b className="block text-lg font-display font-semibold tracking-tight">{item.title}</b>
                <p className="mt-2.5 max-w-[440px] text-quantum-muted leading-[1.75] text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
