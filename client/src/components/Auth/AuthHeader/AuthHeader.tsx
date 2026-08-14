// Renders a consistent heading and supporting description for authentication pages.
import styles from './AuthHeader.module.css'

interface AuthHeaderProps {
  description: string
  headingId: string
  title: string
}

export function AuthHeader({
  description,
  headingId,
  title,
}: AuthHeaderProps) {
  return (
    <header className={styles.header} data-auth-animation-item>
      <h1 className={styles.title} id={headingId}>
        {title}
      </h1>
      <p className={styles.description}>{description}</p>
    </header>
  )
}
