// Owns login state, client-side validation, and the future authentication boundary.
import { useRef, useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { AuthAccountPrompt } from '../../../Auth/AuthAccountPrompt/AuthAccountPrompt'
import { AuthFormField } from '../../../Auth/AuthFormField/AuthFormField'
import { AuthPasswordField } from '../../../Auth/AuthPasswordField/AuthPasswordField'
import { AuthSubmitButton } from '../../../Auth/AuthSubmitButton/AuthSubmitButton'
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
  const formRef = useRef<HTMLFormElement>(null)
  const validationErrors = validateLoginForm(values)

  const visibleError = (fieldName: LoginFormFieldName) =>
    touchedFields[fieldName] || hasSubmitted
      ? validationErrors[fieldName]
      : undefined

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
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setHasSubmitted(true)

    if (Object.values(validationErrors).some(Boolean)) {
      requestAnimationFrame(() => {
        formRef.current
          ?.querySelector<HTMLElement>('[aria-invalid="true"]')
          ?.focus()
      })
      return
    }

    // Future Django integration boundary: authenticate `values` here.
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
          label="WORK EMAIL"
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
            label="PASSWORD"
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
      <AuthSubmitButton label="Sign In to Dashboard" />
      <AuthAccountPrompt
        linkLabel="Create account"
        prompt="Don't have an account?"
        to="/register"
      />
    </form>
  )
}
