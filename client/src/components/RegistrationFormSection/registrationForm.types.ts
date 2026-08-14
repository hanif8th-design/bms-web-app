// Defines the typed state and validation contract shared by registration controls.
export interface RegistrationFormValues {
  fullName: string
  email: string
  password: string
  confirmPassword: string
  agreeToTerms: boolean
}

export type RegistrationFormFieldName = keyof RegistrationFormValues

export type RegistrationFormErrors = Partial<
  Record<RegistrationFormFieldName, string>
>

export type PasswordStrengthLevel = 'weak' | 'fair' | 'good' | 'strong'
