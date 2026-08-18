export interface ResetPasswordFormValues {
  confirmPassword: string
  password: string
}

export type ResetPasswordFormFieldName = keyof ResetPasswordFormValues

export type ResetPasswordFormErrors = Partial<
  Record<ResetPasswordFormFieldName, string>
>
