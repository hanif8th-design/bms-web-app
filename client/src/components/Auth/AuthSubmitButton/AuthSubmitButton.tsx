// Provides the consistent primary action used by authentication forms.
import { RiArrowRightLine, RiLoader4Line } from '@remixicon/react'
import styles from './AuthSubmitButton.module.css'

interface AuthSubmitButtonProps {
  disabled?: boolean
  isPending?: boolean
  label: string
  pendingLabel?: string
}

export function AuthSubmitButton({
  disabled = false,
  isPending = false,
  label,
  pendingLabel = label,
}: AuthSubmitButtonProps) {
  return (
    <button
      aria-busy={isPending}
      className={styles.submitButton}
      disabled={disabled || isPending}
      type="submit"
    >
      <span>{isPending ? pendingLabel : label}</span>
      {isPending ? (
        <RiLoader4Line
          aria-hidden="true"
          className={styles.pendingIcon}
          size={18}
        />
      ) : (
        <RiArrowRightLine aria-hidden="true" size={18} />
      )}
    </button>
  )
}
