import { useRef } from 'react'
import { useHeroSectionAnimation } from '../../hooks/useHeroSectionAnimation'
import { Container } from '../layout/Container/Container'
import { HeroContent } from './components/HeroContent/HeroContent'
import { HeroProductPreview } from './components/HeroProductPreview/HeroProductPreview'
import styles from './HeroSection.module.css'

const heroHeadingId = 'home-hero-heading'

/** Provides the semantic boundary and responsive composition for the Home hero. */
export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useHeroSectionAnimation(sectionRef)

  return (
    <section
      aria-labelledby={heroHeadingId}
      className={styles.heroSection}
      ref={sectionRef}
    >
      <Container className={styles.heroLayout}>
        <HeroContent headingId={heroHeadingId} />
        <HeroProductPreview />
      </Container>
    </section>
  )
}
