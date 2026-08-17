// Owns typed registration state and exposes a clean future API integration boundary.
import { useRef, useState, type FormEvent } from 'react'
import { AuthAccountPrompt } from '../../../Auth/AuthAccountPrompt/AuthAccountPrompt'
import { AuthFormField } from '../../../Auth/AuthFormField/AuthFormField'
import { AuthFormFeedback } from '../../../Auth/AuthFormFeedback/AuthFormFeedback'
import { AuthPasswordField } from '../../../Auth/AuthPasswordField/AuthPasswordField'
import { AuthSubmitButton } from '../../../Auth/AuthSubmitButton/AuthSubmitButton'
import {
  AccountsApiError,
  registerAccount,
} from '../../../../api/accounts'
import { PasswordStrengthIndicator } from '../PasswordStrengthIndicator/PasswordStrengthIndicator'
import { TermsAgreement } from '../TermsAgreement/TermsAgreement'
import type {
  RegistrationFormErrors,
  RegistrationFormFieldName,
  RegistrationFormValues,
} from '../../registrationForm.types'
import styles from './RegistrationForm.module.css'

const initialValues: RegistrationFormValues = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
  agreeToTerms: false,
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

interface SubmissionFeedback {
  message: string
  tone: 'error' | 'success'
}

const apiFieldMap: Partial<Record<string, RegistrationFormFieldName>> = {
  email: 'email',
  first_name: 'firstName',
  last_name: 'lastName',
  password: 'password',
}

function readApiErrorMessage(value: unknown): string | undefined {
  if (typeof value === 'string') {
    return value
  }

  if (Array.isArray(value)) {
    for (const item of value) {
      const message = readApiErrorMessage(item)
      if (message) {
        return message
      }
    }
  }

  return undefined
}

function mapApiErrors(details: unknown): {
  fieldErrors: RegistrationFormErrors
  formError?: string
} {
  const fieldErrors: RegistrationFormErrors = {}
  let formError: string | undefined

  if (!details || typeof details !== 'object' || Array.isArray(details)) {
    return { fieldErrors }
  }

  for (const [apiFieldName, value] of Object.entries(details)) {
    const message = readApiErrorMessage(value)
    if (!message) {
      continue
    }

    const formFieldName = apiFieldMap[apiFieldName]
    if (formFieldName) {
      fieldErrors[formFieldName] = message
    } else if (!formError) {
      formError = message
    }
  }

  return { fieldErrors, formError }
}

function validateRegistrationForm(
  values: RegistrationFormValues,
): RegistrationFormErrors {
  const errors: RegistrationFormErrors = {}

  if (!values.firstName.trim()) {
    errors.firstName = 'Enter your first name.'
  } else if (values.firstName.trim().length < 2) {
    errors.firstName = 'First name must be at least 2 characters.'
  }

  if (!values.lastName.trim()) {
    errors.lastName = 'Enter your last name.'
  } else if (values.lastName.trim().length < 2) {
    errors.lastName = 'Last name must be at least 2 characters.'
  }

  if (!values.email.trim()) {
    errors.email = 'Enter your work email.'
  } else if (!emailPattern.test(values.email.trim())) {
    errors.email = 'Enter a valid work email address.'
  }

  if (!values.password) {
    errors.password = 'Create a password.'
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
    errors.confirmPassword = 'Confirm your password.'
  } else if (values.confirmPassword !== values.password) {
    errors.confirmPassword = 'Passwords do not match.'
  }

  if (!values.agreeToTerms) {
    errors.agreeToTerms = 'Accept the Terms of Service and Privacy Policy.'
  }

  return errors
}

export function RegistrationForm() {
  // One state object keeps future request serialization explicit and predictable.
  const [values, setValues] = useState<RegistrationFormValues>(initialValues)
  const [touchedFields, setTouchedFields] = useState<
    Partial<Record<RegistrationFormFieldName, boolean>>
  >({})
  const [hasSubmitted, setHasSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [serverErrors, setServerErrors] =
    useState<RegistrationFormErrors>({})
  const [submissionFeedback, setSubmissionFeedback] =
    useState<SubmissionFeedback | null>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const validationErrors = validateRegistrationForm(values)
  const passwordStrengthId = 'password-strength'

  const visibleError = (fieldName: RegistrationFormFieldName) =>
    serverErrors[fieldName] ??
    (touchedFields[fieldName] || hasSubmitted
      ? validationErrors[fieldName]
      : undefined)

  const markFieldTouched = (fieldName: RegistrationFormFieldName) => {
    setTouchedFields((currentFields) => ({
      ...currentFields,
      [fieldName]: true,
    }))
  }

  const updateValue = <FieldName extends RegistrationFormFieldName>(
    fieldName: FieldName,
    value: RegistrationFormValues[FieldName],
  ) => {
    setValues((currentValues) => ({
      ...currentValues,
      [fieldName]: value,
    }))

    setServerErrors((currentErrors) => {
      if (!currentErrors[fieldName]) {
        return currentErrors
      }

      const nextErrors = { ...currentErrors }
      delete nextErrors[fieldName]
      return nextErrors
    })
    setSubmissionFeedback(null)
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
    setServerErrors({})
    setSubmissionFeedback(null)

    if (Object.values(validationErrors).some(Boolean)) {
      // Move keyboard and screen-reader users directly to the first problem.
      focusFirstInvalidField()
      return
    }

    setIsSubmitting(true)

    try {
      const response = await registerAccount({
        email: values.email.trim().toLowerCase(),
        first_name: values.firstName.trim(),
        last_name: values.lastName.trim(),
        password: values.password,
      })

      setValues(initialValues)
      setTouchedFields({})
      setHasSubmitted(false)
      setSubmissionFeedback({ message: response.message, tone: 'success' })
    } catch (error) {
      if (error instanceof AccountsApiError) {
        const { fieldErrors, formError } = mapApiErrors(error.details)
        const hasFieldErrors = Object.keys(fieldErrors).length > 0

        setServerErrors(fieldErrors)
        setSubmissionFeedback({
          message:
            formError ??
            (error.status === 429
              ? 'Too many registration attempts. Please try again later.'
              : hasFieldErrors
                ? 'Please review the highlighted fields and try again.'
                : 'Registration could not be completed. Please try again.'),
          tone: 'error',
        })

        if (hasFieldErrors) {
          focusFirstInvalidField()
        }
      } else {
        setSubmissionFeedback({
          message:
            'Unable to reach the registration service. Check your connection and try again.',
          tone: 'error',
        })
      }
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
        <div className={styles.nameFields}>
          <AuthFormField
            autoComplete="given-name"
            error={visibleError('firstName')}
            id="first-name"
            label="First Name"
            name="firstName"
            onBlur={() => markFieldTouched('firstName')}
            onChange={(event) => updateValue('firstName', event.target.value)}
            placeholder="John"
            value={values.firstName}
          />
          <AuthFormField
            autoComplete="family-name"
            error={visibleError('lastName')}
            id="last-name"
            label="Last Name"
            name="lastName"
            onBlur={() => markFieldTouched('lastName')}
            onChange={(event) => updateValue('lastName', event.target.value)}
            placeholder="Doe"
            value={values.lastName}
          />
        </div>
        <AuthFormField
          autoComplete="email"
          error={visibleError('email')}
          id="work-email"
          label="Work Email"
          name="email"
          onBlur={() => markFieldTouched('email')}
          onChange={(event) => updateValue('email', event.target.value)}
          placeholder="john@company.com"
          type="email"
          value={values.email}
        />
        <AuthPasswordField
          autoComplete="new-password"
          belowInput={
            <PasswordStrengthIndicator
              id={passwordStrengthId}
              password={values.password}
            />
          }
          describedBy={passwordStrengthId}
          error={visibleError('password')}
          id="password"
          label="Password"
          name="password"
          onBlur={() => markFieldTouched('password')}
          onChange={(event) => updateValue('password', event.target.value)}
          placeholder="Enter a secure password"
          value={values.password}
        />
        <AuthPasswordField
          autoComplete="new-password"
          error={visibleError('confirmPassword')}
          id="confirm-password"
          label="Confirm Password"
          name="confirmPassword"
          onBlur={() => markFieldTouched('confirmPassword')}
          onChange={(event) =>
            updateValue('confirmPassword', event.target.value)
          }
          placeholder="Re-enter your password"
          value={values.confirmPassword}
        />
      </div>
      <TermsAgreement
        checked={values.agreeToTerms}
        error={visibleError('agreeToTerms')}
        onBlur={() => markFieldTouched('agreeToTerms')}
        onChange={(event) => updateValue('agreeToTerms', event.target.checked)}
      />
      {submissionFeedback ? (
        <AuthFormFeedback
          message={submissionFeedback.message}
          tone={submissionFeedback.tone}
        />
      ) : null}
      <AuthSubmitButton
        isPending={isSubmitting}
        label="Create Account"
        pendingLabel="Creating account..."
      />
      <AuthAccountPrompt
        linkLabel="Sign in"
        prompt="Already have an account?"
        to="/login"
      />
    </form>
  )
}
