import { HeroSection } from '../../components/HeroSection/HeroSection'
import { ProblemSection } from '../../components/ProblemSection/ProblemSection'
import { TrustSection } from '../../components/TrustSection/TrustSection'
import { UnifiedSolutionSection } from '../../components/UnifiedSolutionSection/UnifiedSolutionSection'

export function HomePage() {
  return (
    <main>
      <HeroSection />
      <TrustSection />
      <ProblemSection />
      <UnifiedSolutionSection />
    </main>
  )
}
