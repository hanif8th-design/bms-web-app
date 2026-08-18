import { HeroSection } from '../../components/HeroSection/HeroSection'
import { ProblemSection } from '../../components/ProblemSection/ProblemSection'
import { TrustSection } from '../../components/TrustSection/TrustSection'

export function HomePage() {
  return (
    <main>
      <HeroSection />
      <TrustSection />
      <ProblemSection />
    </main>
  )
}
