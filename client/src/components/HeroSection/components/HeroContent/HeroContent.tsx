import { HeroActions } from '../HeroActions/HeroActions'
import styles from './HeroContent.module.css'

interface HeroContentProps {
  headingId: string
}

/** Owns the hero's marketing message and action hierarchy. */
export function HeroContent({ headingId }: HeroContentProps) {
  return (
    <div className={styles.heroContent}>
      <h1
        className={styles.headline}
        data-hero-animation-item
        id={headingId}
      >
        See Your Entire Business Clearly.
      </h1>
      <p className={styles.subheading} data-hero-animation-item>
        Track every sale, stock movement, payment, expense, and branch without
        switching between different systems.
      </p>
      <HeroActions />
    </div>
  )
}
