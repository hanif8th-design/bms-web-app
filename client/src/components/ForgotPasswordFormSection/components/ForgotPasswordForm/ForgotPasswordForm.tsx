import { useRef, useState, type FormEvent } from 'react'
import { AuthAccountPrompt } from '../../../Auth/AuthAccountPrompt/AuthAccountPrompt'
import { AuthFormFeedback } from '../../../Auth/AuthFormFeedback/AuthFormFeedback'
import { AuthFormField } from '../../../Auth/AuthFormField/AuthFormField'
import { AuthSubmitButton } from '../../../Auth/AuthSubmitButton/AuthSubmitButton'
import styles from './ForgotPasswordForm.module.css'

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validateEmail(email: string): string | undefined {
  const normalizedEmail = email.trim()

  if (!normalizedEmail) {
    return 'Enter your work email.'
  }

  if (!emailPattern.test(normalizedEmail)) {
    return 'Enter a valid work email address.'
  }

  return undefined
}

export function ForgotPasswordForm() {
  const [email, setEmail] = useState('')
  const [hasSubmitted, setHasSubmitted] = useState(false)
  const [isTouched, setIsTouched] = useState(false)
  const [showUnavailableMessage, setShowUnavailableMessage] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)
  const emailError = validateEmail(email)
  const visibleEmailError = isTouched || hasSubmitted ? emailError : undefined

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setHasSubmitted(true)
    setShowUnavailableMessage(false)

    if (emailError) {
      requestAnimationFrame(() => {
        formRef.current
          ?.querySelector<HTMLInputElement>('[aria-invalid="true"]')
          ?.focus()
      })
      return
    }

    setShowUnavailableMessage(true)
  }

  return (
    <form
      className={styles.form}
      data-auth-animation-item
      noValidate
      onSubmit={handleSubmit}
      ref={formRef}
    >
      <AuthFormField
        autoComplete="email"
        error={visibleEmailError}
        id="forgot-password-email"
        label="Work Email"
        name="email"
        onBlur={() => setIsTouched(true)}
        onChange={(event) => {
          setEmail(event.target.value)
          setShowUnavailableMessage(false)
        }}
        placeholder="name@company.com"
        type="email"
        value={email}
      />

      {showUnavailableMessage ? (
        <AuthFormFeedback
          message="Password recovery is not connected yet. Please contact your administrator for access."
          tone="error"
        />
      ) : null}

      <AuthSubmitButton label="Send Reset Link" />

      <AuthAccountPrompt
        linkLabel="Back to sign in"
        prompt="Remember your password?"
        to="/login"
      />
    </form>
  )
}
