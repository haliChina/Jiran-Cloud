import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { TiltCard } from '@/components/interactive/TiltCard'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import { spring } from '@/theme/tokens'

type PlanType = 'cloud' | 'managed' | 'like'

const plans: Record<PlanType, {
  tag: string
  title: string
  desc: string
  priceStart: string
  priceLabel: string
  items: { name: string; price: string; sub: string; href: string; premium?: boolean; spotlight?: boolean }[]
  gridCols?: string
}> = {
  cloud: {
    tag: '推荐起步',
    title: 'QQ云端',
    desc: '适合需要QQ机器人的用户，周期灵活，永久卡价格轻量。',
    priceStart: '¥3 起',
    priceLabel: 'QQ Bot Service',
    items: [
      { name: '1 个月', price: '¥3', sub: '30 Days', href: 'https://shop.userhali.com/products/16' },
      { name: '3 个月', price: '¥8', sub: '90 Days', href: 'https://hali.dgw.wtf/user/reg.php' },
      { name: '6 个月', price: '¥15', sub: '180 Days', href: 'https://hali.dgw.wtf/user/reg.php' },
      { name: '12 个月', price: '¥25', sub: '365 Days', href: 'https://hali.dgw.wtf/user/reg.php' },
      { name: '永久卡', price: '¥38', sub: 'Lifetime', href: 'https://hali.dgw.wtf/user/reg.php', premium: true },
    ],
  },
  managed: {
    tag: '持续服务',
    title: 'QQ代挂',
    desc: '适合需要持续在线加经验的用户。',
    priceStart: '¥5 起',
    priceLabel: 'QQ DaiGua',
    items: [
      { name: '1 个月', price: '¥5', sub: '30 Days', href: 'https://shop.userhali.com/products/15' },
      { name: '3 个月', price: '¥13', sub: '90 Days', href: 'https://hali.dgw.wtf/user/reg.php' },
      { name: '6 个月', price: '¥23', sub: '180 Days', href: 'https://hali.dgw.wtf/user/reg.php' },
      { name: '12 个月', price: '¥45', sub: '365 Days', href: 'https://hali.dgw.wtf/user/reg.php' },
      { name: '永久卡', price: '¥258', sub: 'Lifetime', href: 'https://hali.dgw.wtf/user/reg.php', premium: true },
    ],
  },
  like: {
    tag: '特价限购',
    title: '空间秒赞',
    desc: '限购一次的QQ空间秒赞服务，低价、稳定、不掉号。',
    priceStart: '¥1',
    priceLabel: 'Special Access',
    items: [
      { name: '限购一次 特价月卡', price: '¥1', sub: '1 Month / Special Access', href: 'https://hali.dgw.wtf/user/reg.php', spotlight: true },
    ],
    gridCols: 'max-w-[380px]',
  },
}

const tabs = [
  { key: 'cloud' as PlanType, sub: 'QQBot', label: 'QQ云端' },
  { key: 'managed' as PlanType, sub: 'DaiGua', label: 'QQ代挂' },
  { key: 'like' as PlanType, sub: 'Qzone', label: '空间秒赞' },
]

export function PricingSection() {
  const [activePlan, setActivePlan] = useState<PlanType>('cloud')
  const { ref, isVisible } = useScrollAnimation()
  const activeIndex = tabs.findIndex(t => t.key === activePlan)

  return (
    <section id="pricing" className="py-20 px-5">
      <div ref={ref} className="max-w-shell mx-auto">
        <div className="grid lg:grid-cols-[0.7fr_1fr] gap-7 items-end mb-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={isVisible ? { opacity: 1, y: 0 } : {}} transition={spring.gentle}>
            <p className="text-quantum-faint text-xs tracking-[0.18em] uppercase mb-3">订阅面板</p>
            <h2 className="text-[clamp(2rem,5vw,3.6rem)] leading-[0.98] tracking-[-0.06em] font-display font-extrabold">
              选择适合您的订阅。
            </h2>
          </motion.div>
          <motion.p initial={{ opacity: 0, y: 15 }} animate={isVisible ? { opacity: 1, y: 0 } : {}} transition={{ ...spring.gentle, delay: 0.15 }} className="text-quantum-muted leading-[1.9] text-[0.9rem] max-w-[650px]">
            Hali Cloud 始终致力于为用户提供稳定高效、安全便捷的云服务。并持续对成本进行控制，打造品质稳定，价格亲民的产品。
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ ...spring.gentle, delay: 0.2 }}
          className="rounded-[32px] border border-quantum-border-strong bg-gradient-to-b from-[#070a0f] to-[#040507] shadow-[0_32px_90px_rgba(0,0,0,0.6)] backdrop-blur-xl overflow-hidden"
        >
          <div className="flex justify-between items-center gap-4 px-6 py-4 border-b border-quantum-border bg-white/[0.02] text-quantum-faint text-[10px] tracking-[0.12em] font-mono uppercase">
            <span>查看所有套餐</span>
            <span>多种订阅方案可选</span>
          </div>

          <div className="px-6 pt-6 pb-1">
            <div className="relative grid grid-cols-3 gap-1.5 p-1.5 rounded-2xl border border-white/[0.04] bg-[rgba(2,4,7,0.85)] shadow-[inset_0_3px_12px_rgba(0,0,0,0.8)]">
              <motion.div
                className="absolute top-1.5 bottom-1.5 rounded-[15px] bg-gradient-to-b from-white to-[#c2daff] shadow-[0_8px_24px_rgba(110,231,255,0.25),inset_0_1px_1px_#fff] pointer-events-none z-[1]"
                style={{ width: `calc((100% - 6px) / 3)` }}
                animate={{ x: activeIndex * (100 / 3) + '%' }}
                transition={spring.bouncy}
                layout
              />
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActivePlan(tab.key)}
                  className={`relative z-[2] min-h-[60px] rounded-[15px] flex flex-col justify-center items-center gap-0.5 transition-colors duration-200 ${activePlan === tab.key ? 'text-[#040710]' : 'text-quantum-muted hover:text-white'}`}
                >
                  <span className={`text-[8px] tracking-[0.14em] ${activePlan === tab.key ? 'text-[rgba(4,7,16,0.6)]' : 'text-quantum-faint'}`}>{tab.sub}</span>
                  <b className="text-sm font-bold">{tab.label}</b>
                </button>
              ))}
            </div>
          </div>

          <div className="p-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={activePlan}
                initial={{ opacity: 0, y: 12, scale: 0.985 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -12, scale: 0.985 }}
                transition={spring.bouncy}
              >
                <div className="flex justify-between items-center gap-6 p-6 rounded-2xl bg-gradient-to-r from-white/[0.02] to-transparent border border-white/[0.05]">
                  <div>
                    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-quantum-panel border border-quantum-border text-[10px] text-quantum-muted">
                      <span className="w-1.5 h-1.5 rounded-full bg-quantum-green shadow-[0_0_6px_rgba(0,255,178,0.6)]" />
                      {plans[activePlan].tag}
                    </span>
                    <h3 className="mt-2 text-2xl font-display font-extrabold tracking-tight">{plans[activePlan].title}</h3>
                    <p className="text-quantum-muted text-sm mt-1">{plans[activePlan].desc}</p>
                  </div>
                  <div className="text-right min-w-[150px]">
                    <strong className="block text-3xl font-display font-black tracking-tight text-gradient-blue">{plans[activePlan].priceStart}</strong>
                    <small className="block mt-2 text-quantum-faint text-[9px] tracking-[0.14em] font-mono uppercase">{plans[activePlan].priceLabel}</small>
                  </div>
                </div>

                <div className={`grid gap-3 mt-4 ${plans[activePlan].gridCols || 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-5'}`}>
                  {plans[activePlan].items.map((item, i) => (
                    <TiltCard key={i} tiltRange={4} className="min-h-[140px]">
                      <a
                        href={item.href}
                        className={`block h-full p-5 rounded-2xl border transition-all duration-200 hover:-translate-y-1 ${item.premium ? 'border-quantum-green/20 bg-gradient-to-b from-quantum-green/[0.03] to-white/[0.01] hover:border-quantum-green/40' : item.spotlight ? 'border-quantum-green/20 bg-gradient-to-b from-quantum-green/[0.03] to-white/[0.01] hover:border-quantum-green/40 min-h-[150px]' : 'border-quantum-border bg-white/[0.01] hover:border-quantum-blue/30 hover:bg-white/[0.03]'}`}
                      >
                        <span className="text-sm font-semibold text-quantum-text/70">{item.name}</span>
                        <b className="block text-3xl font-display font-black tracking-tight mt-3 text-white">{item.price}</b>
                        <small className="block mt-1 text-[9px] tracking-[0.06em] text-quantum-faint font-mono">{item.sub}</small>
                      </a>
                    </TiltCard>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
