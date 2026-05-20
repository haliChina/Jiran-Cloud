import { motion } from 'framer-motion'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import { spring } from '@/theme/tokens'

const steps = [
  { num: '01', title: '注册通道', sub: 'INIT USER' },
  { num: '02', title: '选择服务', sub: 'SELECT PLAN' },
  { num: '03', title: '配置订阅', sub: 'CONFIRM' },
  { num: '04', title: '状态观察', sub: 'OBSERVE' },
]

const flowSteps = [
  { num: '01', title: '进入注册通道', desc: '新用户通过注册入口进入平台，完成账号创建后即可继续选择服务。' },
  { num: '02', title: '选择服务类型', desc: '根据需要选择云端服务、代挂服务或秒赞服务，页面内已按类型整理。' },
  { num: '03', title: '确认订阅周期', desc: '按 1 个月、3 个月、6 个月、12 个月或永久卡进行配置，价格直接展示。' },
  { num: '04', title: '查看状态反馈', desc: '服务配置后，用户可回到平台查看账号、状态与相关任务反馈。' },
]

export function ProcessSection() {
  const { ref, isVisible } = useScrollAnimation()

  return (
    <section id="process" className="py-20 px-5">
      <div ref={ref} className="max-w-shell mx-auto">
        <div className="grid lg:grid-cols-[0.7fr_1fr] gap-7 items-end mb-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={isVisible ? { opacity: 1, y: 0 } : {}} transition={spring.gentle}>
            <p className="text-quantum-faint text-xs tracking-[0.18em] uppercase mb-3">操作流程</p>
            <h2 className="text-[clamp(2rem,5vw,3.6rem)] leading-[0.98] tracking-[-0.06em] font-display font-extrabold">
              从进入到配置，像执行一条任务。
            </h2>
          </motion.div>
          <motion.p initial={{ opacity: 0, y: 15 }} animate={isVisible ? { opacity: 1, y: 0 } : {}} transition={{ ...spring.gentle, delay: 0.15 }} className="text-quantum-muted leading-[1.9] text-[0.9rem] max-w-[650px]">
            页面把操作路径拆成四个步骤：进入平台、激活服务、添加账号、完成配置。每一步都尽量明确。
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-4 items-stretch">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ ...spring.gentle, delay: 0.2 }}
            className="rounded-[32px] border border-quantum-border bg-gradient-to-b from-white/[0.04] to-white/[0.02] p-4 min-h-[420px] relative overflow-hidden"
          >
            <div className="h-full grid grid-rows-[auto_1fr_auto] rounded-[28px] border border-quantum-border bg-[linear-gradient(135deg,rgba(3,5,8,0.82),rgba(12,16,24,0.66))] overflow-hidden relative">
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-quantum-blue/[0.08] to-transparent -translate-x-full animate-[scan_6.8s_ease-in-out_infinite] opacity-25" />
              </div>

              <div className="relative z-10 flex justify-between items-center gap-4 px-4 py-3 border-b border-quantum-border text-quantum-muted text-[10px] tracking-[0.13em] uppercase">
                <span>EXECUTE_FLOW</span>
                <b className="font-bold">04 STEPS</b>
              </div>

              <div className="relative z-10 grid gap-3 p-6 place-content-center">
                <span className="absolute left-[46px] top-[34px] bottom-[34px] w-[2px] rounded-full bg-gradient-to-b from-quantum-blue/20 via-quantum-green/40 to-quantum-blue/10 shadow-[0_0_20px_rgba(110,231,255,0.2)]" />
                {steps.map((step, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isVisible ? { opacity: 1, x: i * 10 } : {}}
                    transition={{ ...spring.gentle, delay: 0.4 + i * 0.12 }}
                    className={`relative grid grid-cols-[50px_1fr] gap-3 items-center p-3 rounded-[19px] border ${i === 0 ? 'border-quantum-blue/20 bg-quantum-blue/[0.06]' : 'border-quantum-border bg-quantum-panel'}`}
                    style={{ animationDelay: `${i * 0.35}s` }}
                  >
                    <i className="w-[38px] h-[38px] rounded-[14px] grid place-items-center bg-quantum-blue/[0.08] border border-quantum-blue/15 not-italic font-display font-extrabold tracking-tight text-sm">{step.num}</i>
                    <div>
                      <strong className="block text-sm font-semibold">{step.title}</strong>
                      <small className="block mt-0.5 text-quantum-faint text-[9px] tracking-[0.13em]">{step.sub}</small>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="relative z-10 flex justify-between items-center gap-4 px-4 py-3 border-t border-quantum-border text-quantum-muted text-[10px]">
                <span>快速高效的服务流程</span>
                <em className="not-italic text-quantum-green tracking-[0.14em]">READY</em>
              </div>
            </div>
          </motion.div>

          <div className="grid gap-3">
            {flowSteps.map((step, i) => (
              <motion.article
                key={i}
                initial={{ opacity: 0, x: 20 }}
                animate={isVisible ? { opacity: 1, x: 0 } : {}}
                transition={{ ...spring.gentle, delay: 0.3 + i * 0.12 }}
                className="grid sm:grid-cols-[62px_1fr] gap-4 p-5 rounded-[22px] border border-quantum-border bg-quantum-panel hover:border-quantum-border-strong transition-colors duration-300"
              >
                <div className="w-[50px] h-[50px] rounded-2xl grid place-items-center border border-quantum-border bg-quantum-panel font-display font-extrabold tracking-tight">
                  {step.num}
                </div>
                <div>
                  <h3 className="text-lg font-display font-semibold tracking-tight">{step.title}</h3>
                  <p className="mt-1.5 text-quantum-muted leading-[1.75] text-sm">{step.desc}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
