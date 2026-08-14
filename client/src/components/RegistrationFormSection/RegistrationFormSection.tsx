// Provides the focused, white registration area on the left side of the page.
import { RegistrationBackNavigation } from './components/RegistrationBackNavigation/RegistrationBackNavigation'
import { RegistrationForm } from './components/RegistrationForm/RegistrationForm'
import { RegistrationHeader } from './components/RegistrationHeader/RegistrationHeader'
import styles from './RegistrationFormSection.module.css'

export function RegistrationFormSection() {
  return (
    <section className={styles.formSection} aria-labelledby="register-heading">
      <div className={styles.formContent}>
        <RegistrationBackNavigation />
        <RegistrationHeader />
        <RegistrationForm />
      </div>
    </section>
  )
}
