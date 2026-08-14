// Supplies consistent labeling, input markup, descriptions, and inline errors.
import type {
  ChangeEventHandler,
  FocusEventHandler,
  HTMLInputAutoCompleteAttribute,
  HTMLInputTypeAttribute,
  ReactNode,
} from 'react'
import { RegistrationFieldMessage } from '../RegistrationFieldMessage/RegistrationFieldMessage'
import styles from './RegistrationFormField.module.css'

interface RegistrationFormFieldProps {
  autoComplete: HTMLInputAutoCompleteAttribute
  belowInput?: ReactNode
  describedBy?: string
  endAdornment?: ReactNode
  error?: string
  id: string
  label: string
  name: string
  onBlur: FocusEventHandler<HTMLInputElement>
  onChange: ChangeEventHandler<HTMLInputElement>
  placeholder?: string
  type?: HTMLInputTypeAttribute
  value: string
}

export function RegistrationFormField({
  autoComplete,
  belowInput,
  describedBy,
  endAdornment,
  error,
  id,
  label,
  name,
  onBlur,
  onChange,
  placeholder,
  type = 'text',
  value,
}: RegistrationFormFieldProps) {
  const errorId = `${id}-error`
  const inputDescription = [describedBy, error ? errorId : undefined]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={styles.field}>
      <label className={styles.label} htmlFor={id}>
        {label}
      </label>
      <div className={styles.inputShell}>
        <input
          aria-describedby={inputDescription || undefined}
          aria-invalid={Boolean(error)}
          autoComplete={autoComplete}
          className={`${styles.input} ${endAdornment ? styles.withAdornment : ''}`}
          id={id}
          name={name}
          onBlur={onBlur}
          onChange={onChange}
          placeholder={placeholder}
          type={type}
          value={value}
        />
        {endAdornment}
      </div>
      {belowInput}
      {error ? (
        <RegistrationFieldMessage id={errorId} message={error} />
      ) : null}
    </div>
  )
}
