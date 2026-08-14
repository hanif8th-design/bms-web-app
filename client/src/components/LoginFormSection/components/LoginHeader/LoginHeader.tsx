// Introduces returning users to the BMS workspace login flow.
import styles from './LoginHeader.module.css'

export function LoginHeader() {
  return (
    <header className={styles.header} data-auth-animation-item>
      <h1 className={styles.title} id="login-heading">
        Welcome back
      </h1>
      <p className={styles.description}>
        Sign in to your BMS workspace to manage your operations and team.
      </p>
    </header>
  )
}
