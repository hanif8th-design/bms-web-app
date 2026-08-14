// Points existing users to the internal sign-in route.
import { Link } from 'react-router-dom'
import styles from './SignInPrompt.module.css'

export function SignInPrompt() {
  return (
    <p className={styles.prompt}>
      Already have an account? <Link to="/login">Sign in</Link>
    </p>
  )
}
