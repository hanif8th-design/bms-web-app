// Renders the registration page title and concise supporting copy.
import styles from './RegistrationHeader.module.css'

export function RegistrationHeader() {
  return (
    <header className={styles.header} data-auth-animation-item>
      <h1 id="register-heading" className={styles.title}>
        Create Account
      </h1>
      <p className={styles.description}>
        Start managing your business efficiently.
      </p>
    </header>
  )
}
