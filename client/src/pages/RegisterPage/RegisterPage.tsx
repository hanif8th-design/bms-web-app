// Composes the two primary sections of the public account-registration page.
import { useRef } from 'react'
import { RegistrationFormSection } from '../../components/RegistrationFormSection/RegistrationFormSection'
import { RegistrationShowcaseSection } from '../../components/RegistrationShowcaseSection/RegistrationShowcaseSection'
import { useRegisterPageAnimation } from '../../hooks/useRegisterPageAnimation'
import styles from './RegisterPage.module.css'

export function RegisterPage() {
  const pageRef = useRef<HTMLElement>(null)

  useRegisterPageAnimation(pageRef)

  return (
    <main className={styles.registerPage} ref={pageRef}>
      <RegistrationFormSection />
      <RegistrationShowcaseSection />
    </main>
  )
}
