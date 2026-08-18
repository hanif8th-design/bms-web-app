import { useRef, useState, type FormEvent } from 'react'
import { submitPasswordReset } from '../../../../api/passwordReset'
import { AuthFormFeedback } from '../../../Auth/AuthFormFeedback/AuthFormFeedback'
import { AuthPasswordField } from '../../../Auth/AuthPasswordField/AuthPasswordField'
import { AuthSubmitButton } from '../../../Auth/AuthSubmitButton/AuthSubmitButton'
import { PasswordStrengthIndicator } from '../../../RegistrationFormSection/components/PasswordStrengthIndicator/PasswordStrengthIndicator'
import type {
  ResetPasswordFormErrors,
  ResetPasswordFormFieldName,
  ResetPasswordFormValues,
} from '../../resetPasswordForm.types'
import styles from './ResetPasswordForm.module.css'

interface ResetPasswordFormProps {
  onSuccess: () => void
  token: string
  uid: string
}

const initialValues: ResetPasswordFormValues = {
  confirmPassword: '',
  password: '',
}

function validateResetPasswordForm(
  values: ResetPasswordFormValues,
): ResetPasswordFormErrors {
  const errors: ResetPasswordFormErrors = {}

  if (!values.password) {
    errors.password = 'Enter a new password.'
  } else if (
    values.password.length < 8 ||
    !/[a-z]/.test(values.password) ||
    !/[A-Z]/.test(values.password) ||
    !/\d/.test(values.password)
  ) {
    errors.password =
      'Use 8+ characters with uppercase, lowercase, and a number.'
  }

  if (!values.confirmPassword) {
    errors.confirmPassword = 'Confirm your new password.'
  } else if (values.confirmPassword !== values.password) {
    errors.confirmPassword = 'Passwords do not match.'
  }

  return errors
}

export function ResetPasswordForm({
  onSuccess,
  token,
  uid,
}: ResetPasswordFormProps) {
  const [values, setValues] =
    useState<ResetPasswordFormValues>(initialValues)
  const [touchedFields, setTouchedFields] = useState<
    Partial<Record<ResetPasswordFormFieldName, boolean>>
  >({})
  const [hasSubmitted, setHasSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submissionError, setSubmissionError] = useState<string | null>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const validationErrors = validateResetPasswordForm(values)
  const passwordHelpId = 'reset-password-requirements'
  const passwordStrengthId = 'reset-password-strength'

  const visibleError = (fieldName: ResetPasswordFormFieldName) =>
    touchedFields[fieldName] || hasSubmitted
      ? validationErrors[fieldName]
      : undefined

  const markFieldTouched = (fieldName: ResetPasswordFormFieldName) => {
    setTouchedFields((currentFields) => ({
      ...currentFields,
      [fieldName]: true,
    }))
  }

  const updateValue = <FieldName extends ResetPasswordFormFieldName>(
    fieldName: FieldName,
    value: ResetPasswordFormValues[FieldName],
  ) => {
    setValues((currentValues) => ({
      ...currentValues,
      [fieldName]: value,
    }))
    setSubmissionError(null)
  }

  const focusFirstInvalidField = () => {
    requestAnimationFrame(() => {
      formRef.current
        ?.querySelector<HTMLElement>('[aria-invalid="true"]')
        ?.focus()
    })
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (isSubmitting) {
      return
    }

    setHasSubmitted(true)
    setSubmissionError(null)

    if (Object.values(validationErrors).some(Boolean)) {
      focusFirstInvalidField()
      return
    }

    setIsSubmitting(true)

    try {
      await submitPasswordReset({
        newPassword: values.password,
        token,
        uid,
      })
      setValues(initialValues)
      onSuccess()
    } catch {
      setSubmissionError(
        'Your password could not be reset. Please try again or request a new link.',
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form
      className={styles.form}
      data-auth-animation-item
      noValidate
      onSubmit={handleSubmit}
      ref={formRef}
    >
      <div className={styles.fields}>
        <AuthPasswordField
          autoComplete="new-password"
          belowInput={
            <div className={styles.passwordHelp}>
              <PasswordStrengthIndicator
                id={passwordStrengthId}
                password={values.password}
              />
              <p className={styles.requirements} id={passwordHelpId}>
                Use at least 8 characters with uppercase, lowercase, and a
                number.
              </p>
            </div>
          }
          describedBy={`${passwordStrengthId} ${passwordHelpId}`}
          error={visibleError('password')}
          id="new-password"
          label="New Password"
          name="password"
          onBlur={() => markFieldTouched('password')}
          onChange={(event) => updateValue('password', event.target.value)}
          placeholder="Enter your new password"
          value={values.password}
        />

        <AuthPasswordField
          autoComplete="new-password"
          error={visibleError('confirmPassword')}
          id="confirm-new-password"
          label="Confirm New Password"
          name="confirmPassword"
          onBlur={() => markFieldTouched('confirmPassword')}
          onChange={(event) =>
            updateValue('confirmPassword', event.target.value)
          }
          placeholder="Re-enter your new password"
          value={values.confirmPassword}
        />
      </div>

      {submissionError ? (
        <AuthFormFeedback message={submissionError} tone="error" />
      ) : null}

      <AuthSubmitButton
        isPending={isSubmitting}
        label="Reset Password"
        pendingLabel="Resetting Password..."
      />
    </form>
  )
}
