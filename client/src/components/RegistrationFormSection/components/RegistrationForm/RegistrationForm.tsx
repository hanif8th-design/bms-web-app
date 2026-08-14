// Owns typed registration state and exposes a clean future API integration boundary.
import { useState, type FormEvent } from 'react'
import { RegistrationFormField } from '../RegistrationFormField/RegistrationFormField'
import { RegistrationPasswordField } from '../RegistrationPasswordField/RegistrationPasswordField'
import { RegistrationSubmitButton } from '../RegistrationSubmitButton/RegistrationSubmitButton'
import { SignInPrompt } from '../SignInPrompt/SignInPrompt'
import { TermsAgreement } from '../TermsAgreement/TermsAgreement'
import type {
  RegistrationFormErrors,
  RegistrationFormFieldName,
  RegistrationFormValues,
} from '../../registrationForm.types'
import styles from './RegistrationForm.module.css'

const initialValues: RegistrationFormValues = {
  fullName: '',
  email: '',
  password: '',
  confirmPassword: '',
  agreeToTerms: false,
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validateRegistrationForm(
  values: RegistrationFormValues,
): RegistrationFormErrors {
  const errors: RegistrationFormErrors = {}

  if (!values.fullName.trim()) {
    errors.fullName = 'Enter your full name.'
  } else if (values.fullName.trim().length < 2) {
    errors.fullName = 'Full name must be at least 2 characters.'
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
  const validationErrors = validateRegistrationForm(values)

  const visibleError = (fieldName: RegistrationFormFieldName) =>
    touchedFields[fieldName] || hasSubmitted
      ? validationErrors[fieldName]
      : undefined

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
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setHasSubmitted(true)

    if (Object.values(validationErrors).some(Boolean)) {
      return
    }

    // Future Django integration boundary: submit `values` to the real endpoint here.
  }

  return (
    <form className={styles.form} noValidate onSubmit={handleSubmit}>
      <div className={styles.fields}>
        <RegistrationFormField
          autoComplete="name"
          error={visibleError('fullName')}
          id="full-name"
          label="Full Name"
          name="fullName"
          onBlur={() => markFieldTouched('fullName')}
          onChange={(event) => updateValue('fullName', event.target.value)}
          placeholder="John Doe"
          value={values.fullName}
        />
        <RegistrationFormField
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
        <RegistrationPasswordField
          error={visibleError('password')}
          id="password"
          label="Password"
          name="password"
          onBlur={() => markFieldTouched('password')}
          onChange={(event) => updateValue('password', event.target.value)}
          placeholder="Enter a secure password"
          showStrength
          value={values.password}
        />
        <RegistrationPasswordField
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
      <RegistrationSubmitButton />
      <SignInPrompt />
    </form>
  )
}
