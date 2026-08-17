// Supplies the independently scrollable form pane shared by authentication flows.
import type { ReactNode } from 'react'
import { Container } from '../../layout/Container/Container'
import styles from './AuthFormSection.module.css'

interface AuthFormSectionProps {
  children: ReactNode
  labelledBy: string
}

export function AuthFormSection({
  children,
  labelledBy,
}: AuthFormSectionProps) {
  return (
    <section className={styles.formSection} aria-labelledby={labelledBy}>
      <Container className={styles.formContainer}>
        <div className={styles.formContent}>{children}</div>
      </Container>
    </section>
  )
}
