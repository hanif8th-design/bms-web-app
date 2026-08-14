// Composes the login form and shared authentication showcase at the /login route.
import { useRef } from 'react'
import { LoginFormSection } from '../../components/LoginFormSection/LoginFormSection'
import { RegistrationShowcaseSection } from '../../components/RegistrationShowcaseSection/RegistrationShowcaseSection'
import { useAuthPageAnimation } from '../../hooks/useAuthPageAnimation'
import styles from './LoginPage.module.css'

export function LoginPage() {
  const pageRef = useRef<HTMLElement>(null)

  useAuthPageAnimation(pageRef)

  return (
    <main className={styles.loginPage} ref={pageRef}>
      <LoginFormSection />
      <RegistrationShowcaseSection />
    </main>
  )
}
