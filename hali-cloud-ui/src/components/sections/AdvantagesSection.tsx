import { motion } from 'framer-motion'
import { TiltCard } from '@/components/interactive/TiltCard'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import { spring } from '@/theme/tokens'

const advantages = [
  { index: '01', title: '状态可见', desc: '首页即呈现运行状态、任务成功率、最近任务与刷新延迟，可通过/help在QQ 机器人查看。' },
  { index: '02', title: '售后保障', desc: '内置售后QQ群链接，售后无忧。' },
  { index: '03', title: '广告位招租', desc: '广告位招租。' },
  { index: '04', title: '移动友好', desc: '手机端底部Bar适配移动设备，提升用户体验，仿照App逻辑。' },
]

export function AdvantagesSection() {
  const { ref, isVisible } = useScrollAnimation()

  return (
    <section id="advantages" className="py-20 px-5">
      <div ref={ref} className="max-w-shell mx-auto">
        <div className="grid lg:grid-cols-[0.7fr_1fr] gap-7 items-end mb-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={isVisible ? { opacity: 1, y: 0 } : {}} transition={spring.gentle}>
            <p className="text-quantum-faint text-xs tracking-[0.18em] uppercase mb-3">平台优势</p>
            <h2 className="text-[clamp(2rem,5vw,3.6rem)] leading-[0.98] tracking-[-0.06em] font-display font-extrabold">
              克制，但信息密度足够高。
            </h2>
          </motion.div>
          <motion.p initial={{ opacity: 0, y: 15 }} animate={isVisible ? { opacity: 1, y: 0 } : {}} transition={{ ...spring.gentle, delay: 0.15 }} className="text-quantum-muted leading-[1.9] text-[0.9rem] max-w-[650px]">
            Hali Cloud 不追求浮夸表达，而是把服务激活、套餐管理与操作流程做得更直接、更可读。
          </motion.p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {advantages.map((adv, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 25, x: i % 2 === 0 ? -15 : 15 }}
              animate={isVisible ? { opacity: 1, y: 0, x: 0 } : {}}
              transition={{ ...spring.gentle, delay: 0.1 + i * 0.1 }}
            >
              <TiltCard tiltRange={6} className="min-h-[260px] p-5 rounded-[22px] border border-quantum-border bg-gradient-to-b from-white/[0.05] to-white/[0.02] relative overflow-hidden group" glare>
                <span className="absolute right-4 top-3 text-5xl font-display font-black leading-none tracking-[-0.08em] text-white/[0.04]">{adv.index}</span>
                <h3 className="mt-11 text-lg font-display font-semibold tracking-tight">{adv.title}</h3>
                <p className="mt-3 text-quantum-muted leading-[1.8] text-sm">{adv.desc}</p>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
