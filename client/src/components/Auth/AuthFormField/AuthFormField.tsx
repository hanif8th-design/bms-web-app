// Supplies shared labeling, input markup, descriptions, and animated errors.
import type {
  ChangeEventHandler,
  FocusEventHandler,
  HTMLInputAutoCompleteAttribute,
  HTMLInputTypeAttribute,
  ReactNode,
} from 'react'
import { AuthFieldMessage } from '../AuthFieldMessage/AuthFieldMessage'
import styles from './AuthFormField.module.css'

interface AuthFormFieldProps {
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

export function AuthFormField({
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
}: AuthFormFieldProps) {
  const errorId = `${id}-error`
  const inputDescription = [describedBy, error ? errorId : undefined]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={`${styles.field} ${error ? styles.invalidField : ''}`}>
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
      <AuthFieldMessage id={errorId} message={error} />
    </div>
  )
}
