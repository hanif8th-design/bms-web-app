export interface PasswordResetRequest {
  newPassword: string
  token: string
  uid: string
}

/**
 * Temporary client-only boundary for the future password-reset API request.
 * Replace the delay with the backend call when that endpoint becomes available.
 */
export async function submitPasswordReset(
  request: PasswordResetRequest,
): Promise<void> {
  if (!request.uid || !request.token || !request.newPassword) {
    throw new Error('The password reset request is incomplete.')
  }

  await new Promise<void>((resolve) => {
    window.setTimeout(resolve, 650)
  })
}
