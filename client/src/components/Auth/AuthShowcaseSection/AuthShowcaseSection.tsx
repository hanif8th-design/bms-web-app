// Presents the shared brand visual and product benefits beside authentication forms.
import { RiCheckLine } from '@remixicon/react'
import bmsLogo from '../../../assets/logo/logo.svg'
import { Container } from '../../layout/Container/Container'
import { AuthBenefits } from './components/AuthBenefits/AuthBenefits'
import styles from './AuthShowcaseSection.module.css'

const showcaseHeadingId = 'auth-showcase-heading'

export function AuthShowcaseSection() {
  return (
    <section
      className={styles.showcaseSection}
      aria-labelledby={showcaseHeadingId}
    >
      <Container className={styles.showcaseContainer}>
        <div className={styles.showcaseContent}>
          <div className={styles.brand} data-auth-animation-showcase-item>
            <img alt="BuSiWare" className={styles.logo} src={bmsLogo} />
            <span className={styles.brandDivider} />
            <span className={styles.brandTagline}>Clarity for growing teams</span>
          </div>
          <header
            className={styles.showcaseHeader}
            data-auth-animation-showcase-item
          >
            <p className={styles.eyebrow}>
              <span aria-hidden="true" className={styles.eyebrowMark} />
              Business management, simplified
            </p>
            <h2 className={styles.heading} id={showcaseHeadingId}>
              A clearer view of your whole business.
            </h2>
            <p className={styles.description}>
              Bring your people, performance, and day-to-day operations into
              one focused workspace.
            </p>
          </header>
          <AuthBenefits />
          <div className={styles.closingNote} data-auth-animation-showcase-item>
            <span aria-hidden="true" className={styles.checkIcon}>
              <RiCheckLine size={18} />
            </span>
            <p>
              <strong>One connected workspace</strong>
              <span>Less switching, more time for the work that matters.</span>
            </p>
          </div>
        </div>
      </Container>
    </section>
  )
}
