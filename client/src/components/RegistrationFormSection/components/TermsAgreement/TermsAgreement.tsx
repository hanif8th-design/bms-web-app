// Renders the required terms consent with real internal application links.
import type { ChangeEventHandler, FocusEventHandler } from 'react'
import { Link } from 'react-router-dom'
import { AuthFieldMessage } from '../../../Auth/AuthFieldMessage/AuthFieldMessage'
import styles from './TermsAgreement.module.css'

interface TermsAgreementProps {
  checked: boolean
  error?: string
  onBlur: FocusEventHandler<HTMLInputElement>
  onChange: ChangeEventHandler<HTMLInputElement>
}

export function TermsAgreement({
  checked,
  error,
  onBlur,
  onChange,
}: TermsAgreementProps) {
  const errorId = 'agree-to-terms-error'

  return (
    <div className={styles.agreementField}>
      <div className={styles.agreementRow}>
        <input
          aria-describedby={error ? errorId : undefined}
          aria-invalid={Boolean(error)}
          checked={checked}
          className={styles.checkbox}
          id="agree-to-terms"
          name="agreeToTerms"
          onBlur={onBlur}
          onChange={onChange}
          type="checkbox"
        />
        <label className={styles.label} htmlFor="agree-to-terms">
          I agree to the <Link to="/terms">Terms of Service</Link> and{' '}
          <Link to="/privacy">Privacy Policy</Link>.
        </label>
      </div>
      <AuthFieldMessage id={errorId} message={error} />
    </div>
  )
}
