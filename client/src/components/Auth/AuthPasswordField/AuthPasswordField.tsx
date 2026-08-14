// Adds a shared accessible visibility control to authentication password inputs.
import { RiEyeLine, RiEyeOffLine } from '@remixicon/react'
import {
  useState,
  type ChangeEventHandler,
  type FocusEventHandler,
  type HTMLInputAutoCompleteAttribute,
  type ReactNode,
} from 'react'
import { AuthFormField } from '../AuthFormField/AuthFormField'
import styles from './AuthPasswordField.module.css'

interface AuthPasswordFieldProps {
  autoComplete: HTMLInputAutoCompleteAttribute
  belowInput?: ReactNode
  describedBy?: string
  error?: string
  id: string
  label: string
  name: string
  onBlur: FocusEventHandler<HTMLInputElement>
  onChange: ChangeEventHandler<HTMLInputElement>
  placeholder?: string
  value: string
}

export function AuthPasswordField({
  autoComplete,
  belowInput,
  describedBy,
  error,
  id,
  label,
  name,
  onBlur,
  onChange,
  placeholder,
  value,
}: AuthPasswordFieldProps) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
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
    <AuthFormField
      autoComplete={autoComplete}
      belowInput={belowInput}
      describedBy={describedBy}
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
