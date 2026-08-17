// Presents the shared brand visual and product benefits beside authentication forms.
import { Container } from '../../layout/Container/Container'
import { AuthBenefits } from './components/AuthBenefits/AuthBenefits'
import { AuthIllustration } from './components/AuthIllustration/AuthIllustration'
import styles from './AuthShowcaseSection.module.css'

export function AuthShowcaseSection() {
  return (
    <section
      className={styles.showcaseSection}
      aria-label="Business management benefits"
    >
      <Container className={styles.showcaseContainer}>
        <div className={styles.showcaseContent}>
          <AuthIllustration />
          <AuthBenefits />
        </div>
      </Container>
    </section>
  )
}
