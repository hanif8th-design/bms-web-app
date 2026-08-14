// Owns typed registration state and exposes a clean future API integration boundary.
import { useRef, useState, type FormEvent } from 'react'
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
  firstName: '',
  lastName: '',
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
  const formRef = useRef<HTMLFormElement>(null)
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
      // Move keyboard and screen-reader users directly to the first problem.
      requestAnimationFrame(() => {
        formRef.current
          ?.querySelector<HTMLElement>('[aria-invalid="true"]')
          ?.focus()
      })
      return
    }

    // Future Django integration boundary: submit `values` to the real endpoint here.
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
          <RegistrationFormField
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
          <RegistrationFormField
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
