import { HeroSection } from '../../components/HeroSection/HeroSection'
import { PublicNavbar } from '../../components/PublicNavbar/PublicNavbar'

export function HomePage() {
  return (
    <>
      <PublicNavbar />
      <main>
        <HeroSection />
      </main>
    </>
  )
}
