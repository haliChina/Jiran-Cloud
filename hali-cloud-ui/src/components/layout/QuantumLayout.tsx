import { QuantumField } from '@/components/canvas/QuantumField'
import { NavigationRail } from './NavigationRail'
import { ScrollProgress } from './ScrollProgress'
import { CursorGlow } from '@/components/interactive/CursorGlow'

interface QuantumLayoutProps {
  children: React.ReactNode
}

export function QuantumLayout({ children }: QuantumLayoutProps) {
  return (
    <div className="relative min-h-screen bg-quantum-bg">
      <QuantumField />
      <CursorGlow />
      <ScrollProgress />
      <NavigationRail />
      <main className="relative z-10">
        {children}
      </main>
    </div>
  )
}
