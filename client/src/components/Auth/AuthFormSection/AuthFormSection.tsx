// Supplies the independently scrollable form pane shared by authentication flows.
import type { ReactNode } from 'react'
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
      <div className={styles.formContent}>{children}</div>
    </section>
  )
}
