// Provides the primary dashboard sign-in action.
import { RiArrowRightLine } from '@remixicon/react'
import styles from './LoginSubmitButton.module.css'

export function LoginSubmitButton() {
  return (
    <button className={styles.submitButton} type="submit">
      <span>Sign In to Dashboard</span>
      <RiArrowRightLine aria-hidden="true" size={18} />
    </button>
  )
}
