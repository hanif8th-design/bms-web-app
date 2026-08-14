// Composes login-specific content inside the shared authentication shell.
import { AuthBackNavigation } from '../../components/Auth/AuthBackNavigation/AuthBackNavigation'
import { AuthFormSection } from '../../components/Auth/AuthFormSection/AuthFormSection'
import { AuthHeader } from '../../components/Auth/AuthHeader/AuthHeader'
import { AuthPageLayout } from '../../components/Auth/AuthPageLayout/AuthPageLayout'
import { LoginForm } from '../../components/LoginFormSection/components/LoginForm/LoginForm'

export function LoginPage() {
  return (
    <AuthPageLayout>
      <AuthFormSection labelledBy="login-heading">
        <AuthBackNavigation />
        <AuthHeader
          description="Sign in to your BMS workspace to manage your operations and team."
          headingId="login-heading"
          title="Welcome back"
        />
        <LoginForm />
      </AuthFormSection>
    </AuthPageLayout>
  )
}
