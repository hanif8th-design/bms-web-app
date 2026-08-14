// Provides the consistent primary action used by authentication forms.
import { RiArrowRightLine } from '@remixicon/react'
import styles from './AuthSubmitButton.module.css'

interface AuthSubmitButtonProps {
  label: string
}

export function AuthSubmitButton({ label }: AuthSubmitButtonProps) {
  return (
    <button className={styles.submitButton} type="submit">
      <span>{label}</span>
      <RiArrowRightLine aria-hidden="true" size={18} />
    </button>
  )
}
