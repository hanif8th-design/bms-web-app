// Adds an accessible visibility toggle and optional strength feedback to a password input.
import { useState, type ChangeEventHandler, type FocusEventHandler } from 'react'
import { RiEyeLine, RiEyeOffLine } from '@remixicon/react'
import { PasswordStrengthIndicator } from '../PasswordStrengthIndicator/PasswordStrengthIndicator'
import { RegistrationFormField } from '../RegistrationFormField/RegistrationFormField'
import styles from './RegistrationPasswordField.module.css'

interface RegistrationPasswordFieldProps {
  error?: string
  id: string
  label: string
  name: string
  onBlur: FocusEventHandler<HTMLInputElement>
  onChange: ChangeEventHandler<HTMLInputElement>
  placeholder?: string
  showStrength?: boolean
  value: string
}

export function RegistrationPasswordField({
  error,
  id,
  label,
  name,
  onBlur,
  onChange,
  placeholder,
  showStrength = false,
  value,
}: RegistrationPasswordFieldProps) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const strengthId = `${id}-strength`
  const VisibilityIcon = isPasswordVisible ? RiEyeOffLine : RiEyeLine

  // A real button keeps the visibility control keyboard operable and announced.
  const visibilityControl = (
    <button
      aria-label={`${isPasswordVisible ? 'Hide' : 'Show'} ${label.toLowerCase()}`}
      className={styles.visibilityButton}
      onClick={() => setIsPasswordVisible((isVisible) => !isVisible)}
      type="button"
    >
      <VisibilityIcon aria-hidden="true" size={19} />
    </button>
  )

  return (
    <RegistrationFormField
      autoComplete="new-password"
      belowInput={
        showStrength ? (
          <PasswordStrengthIndicator id={strengthId} password={value} />
        ) : undefined
      }
      describedBy={showStrength ? strengthId : undefined}
      endAdornment={visibilityControl}
      error={error}
      id={id}
      label={label}
      name={name}
      onBlur={onBlur}
      onChange={onChange}
      placeholder={placeholder}
      type={isPasswordVisible ? 'text' : 'password'}
      value={value}
    />
  )
}
