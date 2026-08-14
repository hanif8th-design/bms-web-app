// Presents the brand visual and concise product benefits beside the form.
import { RegistrationBenefits } from './components/RegistrationBenefits/RegistrationBenefits'
import { RegistrationIllustration } from './components/RegistrationIllustration/RegistrationIllustration'
import styles from './RegistrationShowcaseSection.module.css'

export function RegistrationShowcaseSection() {
  return (
    <section
      className={styles.showcaseSection}
      aria-label="Business management benefits"
    >
      <div className={styles.showcaseContent}>
        <RegistrationIllustration />
        <RegistrationBenefits />
      </div>
    </section>
  )
}
