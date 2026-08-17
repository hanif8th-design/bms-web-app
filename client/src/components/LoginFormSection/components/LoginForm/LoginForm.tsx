// Owns login state, client-side validation, and the future authentication boundary.
import { useRef, useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { AuthAccountPrompt } from '../../../Auth/AuthAccountPrompt/AuthAccountPrompt'
import { AuthFormField } from '../../../Auth/AuthFormField/AuthFormField'
import { AuthFormFeedback } from '../../../Auth/AuthFormFeedback/AuthFormFeedback'
import { AuthPasswordField } from '../../../Auth/AuthPasswordField/AuthPasswordField'
import { AuthSubmitButton } from '../../../Auth/AuthSubmitButton/AuthSubmitButton'
import { AccountsApiError, loginAccount } from '../../../../api/accounts'
import type {
  LoginFormErrors,
  LoginFormFieldName,
  LoginFormValues,
} from '../../loginForm.types'
import styles from './LoginForm.module.css'

const initialValues: LoginFormValues = {
  email: '',
  password: '',
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

interface SubmissionFeedback {
  message: string
  tone: 'error' | 'success'
}

const apiFieldMap: Partial<Record<string, LoginFormFieldName>> = {
  email: 'email',
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

function mapApiFieldErrors(details: unknown): LoginFormErrors {
  const fieldErrors: LoginFormErrors = {}

  if (!details || typeof details !== 'object' || Array.isArray(details)) {
    return fieldErrors
  }

  for (const [apiFieldName, value] of Object.entries(details)) {
    const formFieldName = apiFieldMap[apiFieldName]
    const message = readApiErrorMessage(value)
    if (formFieldName && message) {
      fieldErrors[formFieldName] = message
    }
  }

  return fieldErrors
}

function validateLoginForm(values: LoginFormValues): LoginFormErrors {
  const errors: LoginFormErrors = {}

  if (!values.email.trim()) {
    errors.email = 'Enter your work email.'
  } else if (!emailPattern.test(values.email.trim())) {
    errors.email = 'Enter a valid work email address.'
  }

  // Login accepts existing password policies; the server will verify credentials.
  if (!values.password) {
    errors.password = 'Enter your password.'
  }

  return errors
}

export function LoginForm() {
  const [values, setValues] = useState<LoginFormValues>(initialValues)
  const [touchedFields, setTouchedFields] = useState<
    Partial<Record<LoginFormFieldName, boolean>>
  >({})
  const [hasSubmitted, setHasSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [serverErrors, setServerErrors] = useState<LoginFormErrors>({})
  const [submissionFeedback, setSubmissionFeedback] =
    useState<SubmissionFeedback | null>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const validationErrors = validateLoginForm(values)

  const visibleError = (fieldName: LoginFormFieldName) =>
    serverErrors[fieldName] ??
    (touchedFields[fieldName] || hasSubmitted
      ? validationErrors[fieldName]
      : undefined)

  const markFieldTouched = (fieldName: LoginFormFieldName) => {
    setTouchedFields((currentFields) => ({
      ...currentFields,
      [fieldName]: true,
    }))
  }

  const updateValue = <FieldName extends LoginFormFieldName>(
    fieldName: FieldName,
    value: LoginFormValues[FieldName],
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
      focusFirstInvalidField()
      return
    }

    setIsSubmitting(true)

    try {
      const response = await loginAccount({
        email: values.email.trim().toLowerCase(),
        password: values.password,
      })

      setValues((currentValues) => ({
        ...currentValues,
        password: '',
      }))
      setTouchedFields({})
      setHasSubmitted(false)
      setSubmissionFeedback({
        message: response.user.first_name
          ? `Welcome back, ${response.user.first_name}. Sign-in was successful.`
          : 'Sign-in was successful.',
        tone: 'success',
      })
    } catch (error) {
      if (error instanceof AccountsApiError) {
        const fieldErrors = mapApiFieldErrors(error.details)
        const hasFieldErrors = Object.keys(fieldErrors).length > 0

        setServerErrors(fieldErrors)
        setSubmissionFeedback({
          message:
            error.status === 401
              ? 'Email or password is incorrect.'
              : error.status === 429
                ? 'Too many sign-in attempts. Please try again later.'
                : hasFieldErrors
                  ? 'Please review the highlighted fields and try again.'
                  : 'Sign-in could not be completed. Please try again.',
          tone: 'error',
        })

        if (hasFieldErrors) {
          focusFirstInvalidField()
        }
      } else {
        setSubmissionFeedback({
          message:
            'Unable to reach the sign-in service. Check your connection and try again.',
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
        <AuthFormField
          autoComplete="email"
          error={visibleError('email')}
          id="login-email"
          label="Work Email"
          name="email"
          onBlur={() => markFieldTouched('email')}
          onChange={(event) => updateValue('email', event.target.value)}
          placeholder="name@company.com"
          type="email"
          value={values.email}
        />
        <div className={styles.passwordField}>
          <AuthPasswordField
            autoComplete="current-password"
            error={visibleError('password')}
            id="login-password"
            label="Password"
            name="password"
            onBlur={() => markFieldTouched('password')}
            onChange={(event) => updateValue('password', event.target.value)}
            placeholder="Enter your password"
            value={values.password}
          />
          <Link className={styles.forgotLink} to="/forgot-password">
            Forgot?
          </Link>
        </div>
      </div>
      {submissionFeedback ? (
        <AuthFormFeedback
          message={submissionFeedback.message}
          tone={submissionFeedback.tone}
        />
      ) : null}
      <AuthSubmitButton
        isPending={isSubmitting}
        label="Sign In to Dashboard"
        pendingLabel="Signing in..."
      />
      <AuthAccountPrompt
        linkLabel="Create account"
        prompt="Don't have an account?"
        to="/register"
      />
    </form>
  )
}
