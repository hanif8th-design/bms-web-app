import { AuthBackNavigation } from '../../components/Auth/AuthBackNavigation/AuthBackNavigation'
import { AuthFormSection } from '../../components/Auth/AuthFormSection/AuthFormSection'
import { AuthHeader } from '../../components/Auth/AuthHeader/AuthHeader'
import { AuthPageLayout } from '../../components/Auth/AuthPageLayout/AuthPageLayout'
import { ForgotPasswordForm } from '../../components/ForgotPasswordFormSection/components/ForgotPasswordForm/ForgotPasswordForm'

export function ForgotPasswordPage() {
  return (
    <AuthPageLayout>
      <AuthFormSection labelledBy="forgot-password-heading">
        <AuthBackNavigation />
        <AuthHeader
          description="Enter the work email associated with your account."
          headingId="forgot-password-heading"
          title="Reset your password"
        />
        <ForgotPasswordForm />
      </AuthFormSection>
    </AuthPageLayout>
  )
}
