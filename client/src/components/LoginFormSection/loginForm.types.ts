// Defines typed state and validation fields for the frontend login form.
export interface LoginFormValues {
  email: string
  password: string
}

export type LoginFormFieldName = keyof LoginFormValues

export type LoginFormErrors = Partial<Record<LoginFormFieldName, string>>
