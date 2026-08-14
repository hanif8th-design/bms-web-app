// Provides the registration form's primary action.
import { RiArrowRightLine } from '@remixicon/react'
import styles from './RegistrationSubmitButton.module.css'

export function RegistrationSubmitButton() {
  return (
    <button className={styles.submitButton} type="submit">
      <span>Create Account</span>
      <RiArrowRightLine aria-hidden="true" size={18} />
    </button>
  )
}
