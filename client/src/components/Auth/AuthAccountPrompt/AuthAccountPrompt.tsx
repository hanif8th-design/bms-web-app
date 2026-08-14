// Renders the shared secondary navigation prompt below authentication forms.
import { Link } from 'react-router-dom'
import styles from './AuthAccountPrompt.module.css'

interface AuthAccountPromptProps {
  linkLabel: string
  prompt: string
  to: string
}

export function AuthAccountPrompt({
  linkLabel,
  prompt,
  to,
}: AuthAccountPromptProps) {
  return (
    <p className={styles.prompt}>
      {prompt} <Link to={to}>{linkLabel}</Link>
    </p>
  )
}
