// Provides consistent keyboard-accessible navigation back to the public home page.
import { RiArrowLeftLine } from '@remixicon/react'
import { Link } from 'react-router-dom'
import styles from './AuthBackNavigation.module.css'

export function AuthBackNavigation() {
  return (
    <Link className={styles.backLink} data-auth-animation-item to="/">
      <RiArrowLeftLine aria-hidden="true" size={18} />
      <span>Back</span>
    </Link>
  )
}
