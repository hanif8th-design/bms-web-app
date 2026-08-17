import { RiCheckboxCircleLine, RiErrorWarningLine } from '@remixicon/react'
import styles from './AuthFormFeedback.module.css'

export interface AuthFormFeedbackProps {
  message: string
  tone: 'error' | 'success'
}

/** Announces request-level authentication feedback below the form fields. */
export function AuthFormFeedback({
  message,
  tone,
}: AuthFormFeedbackProps) {
  return (
    <div
      aria-live="polite"
      className={`${styles.feedback} ${
        tone === 'success' ? styles.successFeedback : styles.errorFeedback
      }`}
      role={tone === 'error' ? 'alert' : 'status'}
    >
      {tone === 'success' ? (
        <RiCheckboxCircleLine aria-hidden="true" size={18} />
      ) : (
        <RiErrorWarningLine aria-hidden="true" size={18} />
      )}
      <span>{message}</span>
    </div>
  )
}
