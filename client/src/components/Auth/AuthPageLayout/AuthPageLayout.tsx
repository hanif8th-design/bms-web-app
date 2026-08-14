// Provides the shared animated split-screen shell for login and registration pages.
import { useRef, type ReactNode } from 'react'
import { useAuthPageAnimation } from '../../../hooks/useAuthPageAnimation'
import { AuthShowcaseSection } from '../AuthShowcaseSection/AuthShowcaseSection'
import styles from './AuthPageLayout.module.css'

interface AuthPageLayoutProps {
  children: ReactNode
}

export function AuthPageLayout({ children }: AuthPageLayoutProps) {
  const pageRef = useRef<HTMLElement>(null)

  useAuthPageAnimation(pageRef)

  return (
    <main className={styles.authPage} ref={pageRef}>
      {children}
      <AuthShowcaseSection />
    </main>
  )
}
