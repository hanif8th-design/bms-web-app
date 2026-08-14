// Presents concise field-level validation feedback with a consistent accessible treatment.
import { RiErrorWarningLine } from '@remixicon/react'
import styles from './RegistrationFieldMessage.module.css'

interface RegistrationFieldMessageProps {
  id: string
  message: string
}

export function RegistrationFieldMessage({
  id,
  message,
}: RegistrationFieldMessageProps) {
  return (
    <p className={styles.message} id={id} role="alert">
      <RiErrorWarningLine
        aria-hidden="true"
        className={styles.icon}
        size={15}
      />
      <span>{message}</span>
    </p>
  )
}
