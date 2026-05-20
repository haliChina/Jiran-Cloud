import { QuantumLayout } from '@/components/layout/QuantumLayout'
import { HeroSection } from '@/components/sections/HeroSection'
import { FeaturesSection } from '@/components/sections/FeaturesSection'
import { PricingSection } from '@/components/sections/PricingSection'
import { AdvantagesSection } from '@/components/sections/AdvantagesSection'
import { ProcessSection } from '@/components/sections/ProcessSection'
import { FAQSection } from '@/components/sections/FAQSection'
import { CTASection } from '@/components/sections/CTASection'

function App() {
  return (
    <QuantumLayout>
      <HeroSection />
      <FeaturesSection />
      <PricingSection />
      <AdvantagesSection />
      <ProcessSection />
      <FAQSection />
      <CTASection />
    </QuantumLayout>
  )
}

export default App
