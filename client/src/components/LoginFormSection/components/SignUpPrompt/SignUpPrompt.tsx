// Directs users without credentials to the account-registration route.
import { Link } from 'react-router-dom'
import styles from './SignUpPrompt.module.css'

export function SignUpPrompt() {
  return (
    <p className={styles.prompt}>
      Don&apos;t have an account? <Link to="/register">Create account</Link>
    </p>
  )
}
