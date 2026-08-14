// Calculates and communicates a clear client-side password-strength estimate.
import type { PasswordStrengthLevel } from '../../registrationForm.types'
import styles from './PasswordStrengthIndicator.module.css'

interface PasswordStrengthIndicatorProps {
  id: string
  password: string
}

interface PasswordStrengthResult {
  activeSegments: number
  label: string
  level: PasswordStrengthLevel
}

const strengthClassByLevel: Record<PasswordStrengthLevel, string> = {
  weak: styles.weak,
  fair: styles.fair,
  good: styles.good,
  strong: styles.strong,
}

// Length and character variety provide an understandable estimate, not a server guarantee.
function calculatePasswordStrength(password: string): PasswordStrengthResult {
  const score = [
    password.length >= 8,
    password.length >= 12,
    /[a-z]/.test(password) && /[A-Z]/.test(password),
    /\d/.test(password) && /[^A-Za-z0-9]/.test(password),
  ].filter(Boolean).length

  if (score <= 1) {
    return { activeSegments: 1, label: 'Weak', level: 'weak' }
  }

  if (score === 2) {
    return { activeSegments: 2, label: 'Fair', level: 'fair' }
  }

  if (score === 3) {
    return { activeSegments: 3, label: 'Good', level: 'good' }
  }

  return { activeSegments: 4, label: 'Strong', level: 'strong' }
}

export function PasswordStrengthIndicator({
  id,
  password,
}: PasswordStrengthIndicatorProps) {
  const strength = calculatePasswordStrength(password)
  const statusText = password
    ? `Password Strength: ${strength.label}`
    : 'Password Strength'

  return (
    <div
      className={`${styles.indicator} ${strengthClassByLevel[strength.level]}`}
      id={id}
      aria-live="polite"
    >
      <div className={styles.segments} aria-hidden="true">
        {[0, 1, 2, 3].map((segmentIndex) => (
          <span
            className={
              password && segmentIndex < strength.activeSegments
                ? styles.activeSegment
                : styles.segment
            }
            key={segmentIndex}
          />
        ))}
      </div>
      <span className={styles.label}>{statusText}</span>
    </div>
  )
}
