// Provides the independently scrollable login pane on the left side of the page.
import { RegistrationBackNavigation } from '../RegistrationFormSection/components/RegistrationBackNavigation/RegistrationBackNavigation'
import { LoginForm } from './components/LoginForm/LoginForm'
import { LoginHeader } from './components/LoginHeader/LoginHeader'
import styles from './LoginFormSection.module.css'

export function LoginFormSection() {
  return (
    <section className={styles.formSection} aria-labelledby="login-heading">
      <div className={styles.formContent}>
        <RegistrationBackNavigation />
        <LoginHeader />
        <LoginForm />
      </div>
    </section>
  )
}
