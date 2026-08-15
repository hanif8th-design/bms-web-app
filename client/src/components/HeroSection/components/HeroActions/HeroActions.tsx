import { Link } from 'react-router-dom'
import styles from './HeroActions.module.css'

/** Renders the hero's router-aware primary and secondary actions. */
export function HeroActions() {
  return (
    <div
      aria-label="Get started"
      className={styles.actions}
      data-hero-animation-item
      role="group"
    >
      <Link className={`${styles.action} ${styles.primaryAction}`} to="/register">
        Start Free Trial
      </Link>
      <Link className={`${styles.action} ${styles.secondaryAction}`} to="/features">
        See how it works
      </Link>
    </div>
  )
}
