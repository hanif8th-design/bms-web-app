// Composes the two primary sections of the public account-registration page.
import { RegistrationFormSection } from '../../components/RegistrationFormSection/RegistrationFormSection'
import { RegistrationShowcaseSection } from '../../components/RegistrationShowcaseSection/RegistrationShowcaseSection'
import styles from './RegisterPage.module.css'

export function RegisterPage() {
  return (
    <main className={styles.registerPage}>
      <RegistrationFormSection />
      <RegistrationShowcaseSection />
    </main>
  )
}
