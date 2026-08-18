import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { AuthBackNavigation } from '../../components/Auth/AuthBackNavigation/AuthBackNavigation'
import { AuthFormSection } from '../../components/Auth/AuthFormSection/AuthFormSection'
import { AuthHeader } from '../../components/Auth/AuthHeader/AuthHeader'
import { AuthPageLayout } from '../../components/Auth/AuthPageLayout/AuthPageLayout'
import { ResetPasswordForm } from '../../components/ResetPasswordFormSection/components/ResetPasswordForm/ResetPasswordForm'
import { ResetPasswordStatus } from '../../components/ResetPasswordFormSection/components/ResetPasswordStatus/ResetPasswordStatus'

const resetParameterPattern = /^[A-Za-z0-9_-]+$/

function isValidResetParameter(value: string | undefined): value is string {
  return Boolean(
    value && value.length <= 1024 && resetParameterPattern.test(value),
  )
}

export function ResetPasswordPage() {
  const { token, uid } = useParams<'uid' | 'token'>()
  const [isSuccessful, setIsSuccessful] = useState(false)
  const hasValidLink =
    isValidResetParameter(uid) && isValidResetParameter(token)

  const title = !hasValidLink
    ? 'Invalid reset link'
    : isSuccessful
      ? 'Password updated'
      : 'Create a new password'

  const description = !hasValidLink
    ? 'Request a new link to continue resetting your password.'
    : isSuccessful
      ? 'Your account is ready to use again.'
      : 'Choose a secure password that you do not use elsewhere.'

  return (
    <AuthPageLayout>
      <AuthFormSection labelledBy="reset-password-heading">
        <AuthBackNavigation />
        <AuthHeader
          description={description}
          headingId="reset-password-heading"
          title={title}
        />

        {!hasValidLink ? (
          <ResetPasswordStatus
            actionLabel="Request New Reset Link"
            message="This password reset link is invalid or has expired."
            to="/forgot-password"
            tone="error"
          />
        ) : isSuccessful ? (
          <ResetPasswordStatus
            actionLabel="Go to Sign In"
            message="Password reset successfully. You can now sign in with your new password."
            to="/login"
            tone="success"
          />
        ) : (
          <ResetPasswordForm
            onSuccess={() => setIsSuccessful(true)}
            token={token}
            uid={uid}
          />
        )}
      </AuthFormSection>
    </AuthPageLayout>
  )
}
