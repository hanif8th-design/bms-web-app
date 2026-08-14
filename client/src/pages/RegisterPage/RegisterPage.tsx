// Composes registration-specific content inside the shared authentication shell.
import { AuthBackNavigation } from '../../components/Auth/AuthBackNavigation/AuthBackNavigation'
import { AuthFormSection } from '../../components/Auth/AuthFormSection/AuthFormSection'
import { AuthHeader } from '../../components/Auth/AuthHeader/AuthHeader'
import { AuthPageLayout } from '../../components/Auth/AuthPageLayout/AuthPageLayout'
import { RegistrationForm } from '../../components/RegistrationFormSection/components/RegistrationForm/RegistrationForm'

export function RegisterPage() {
  return (
    <AuthPageLayout>
      <AuthFormSection labelledBy="register-heading">
        <AuthBackNavigation />
        <AuthHeader
          description="Start managing your business efficiently."
          headingId="register-heading"
          title="Create Account"
        />
        <RegistrationForm />
      </AuthFormSection>
    </AuthPageLayout>
  )
}
