import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import { spring } from '@/theme/tokens'

const faqs = [
  { q: 'Hali Cloud 是什么？', a: 'Hali Cloud 是面向云端服务、自动化配置、状态监控与账号管理的平台首页，用命令中心式布局呈现服务入口与套餐信息。' },
  { q: '页面里的状态数据是真实接口吗？', a: '本首页不请求接口，首屏数据用于视觉展示与产品表达。真实业务状态应以登录后的平台页面为准。' },
  { q: '购买套餐从哪里进入？', a: '所有套餐按钮都会进入注册入口。已有账号的用户可以通过登录入口返回平台继续操作。' },
  { q: '手机端是否可用？', a: '页面在手机端会重排为卡片流，导航、价格、FAQ 与流程区域都会避免横向滚动。' },
  { q: '为什么设计成命令中心？', a: '因为该平台强调状态、配置、任务与入口。命令中心式设计能更直接地表达稳定、清晰和可观察。' },
  { q: '是否需要下载额外资源？', a: '不需要。我们提供网页端，不使用外部资源。' },
]

function FAQItem({ q, a, isOpen, onToggle }: { q: string; a: string; isOpen: boolean; onToggle: () => void }) {
  return (
    <motion.div
      layout
      className="rounded-[22px] border border-quantum-border bg-quantum-panel overflow-hidden hover:border-quantum-border-strong transition-colors duration-300"
    >
      <motion.button
        layout
        onClick={onToggle}
        className="w-full flex justify-between items-center gap-5 p-5 text-left font-semibold tracking-tight"
      >
        <span>{q}</span>
        <motion.span
          animate={{ rotate: isOpen ? 135 : 0 }}
          transition={{ ...spring.bouncy, duration: 0.3 }}
          className="flex-shrink-0 w-7 h-7 rounded-full border border-quantum-border bg-quantum-panel grid place-items-center text-white/60"
          style={{
            background: isOpen ? 'rgba(110,231,255,0.08)' : undefined,
            borderColor: isOpen ? 'rgba(110,231,255,0.25)' : undefined,
            boxShadow: isOpen ? '0 0 20px rgba(110,231,255,0.1)' : undefined,
          }}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <line x1="6" y1="0" x2="6" y2="12" stroke="currentColor" strokeWidth="1.5" />
            <line x1="0" y1="6" x2="12" y2="6" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </motion.span>
      </motion.button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ ...spring.smooth, duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="px-5 pb-5 text-quantum-muted leading-[1.8] text-sm">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const { ref, isVisible } = useScrollAnimation()

  return (
    <section id="faq" className="py-20 px-5">
      <div ref={ref} className="max-w-shell mx-auto">
        <div className="grid lg:grid-cols-[0.7fr_1fr] gap-7 items-end mb-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={isVisible ? { opacity: 1, y: 0 } : {}} transition={spring.gentle}>
            <p className="text-quantum-faint text-xs tracking-[0.18em] uppercase mb-3">FAQ</p>
            <h2 className="text-[clamp(2rem,5vw,3.6rem)] leading-[0.98] tracking-[-0.06em] font-display font-extrabold">
              常见问题，用清楚的方式回答。
            </h2>
          </motion.div>
          <motion.p initial={{ opacity: 0, y: 15 }} animate={isVisible ? { opacity: 1, y: 0 } : {}} transition={{ ...spring.gentle, delay: 0.15 }} className="text-quantum-muted leading-[1.9] text-[0.9rem] max-w-[650px]">
            保持信息透明，减少用户在购买前的疑问，也让页面整体更像一个稳定的服务系统。
          </motion.p>
        </div>

        <div className="grid sm:grid-cols-2 gap-3.5">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ ...spring.gentle, delay: 0.1 + i * 0.08 }}
            >
              <FAQItem
                q={faq.q}
                a={faq.a}
                isOpen={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? null : i)}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
