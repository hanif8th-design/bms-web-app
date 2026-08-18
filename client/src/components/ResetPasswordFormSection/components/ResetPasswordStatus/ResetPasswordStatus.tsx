import { RiArrowRightLine } from '@remixicon/react'
import { Link } from 'react-router-dom'
import {
  AuthFormFeedback,
  type AuthFormFeedbackProps,
} from '../../../Auth/AuthFormFeedback/AuthFormFeedback'
import styles from './ResetPasswordStatus.module.css'

interface ResetPasswordStatusProps {
  actionLabel: string
  message: string
  to: string
  tone: AuthFormFeedbackProps['tone']
}

export function ResetPasswordStatus({
  actionLabel,
  message,
  to,
  tone,
}: ResetPasswordStatusProps) {
  return (
    <div className={styles.status} data-auth-animation-item>
      <AuthFormFeedback message={message} tone={tone} />
      <Link className={styles.action} replace to={to}>
        <span>{actionLabel}</span>
        <RiArrowRightLine aria-hidden="true" size={18} />
      </Link>
    </div>
  )
}
