// Provides an obvious, keyboard-accessible route back to the public home page.
import { RiArrowLeftLine } from '@remixicon/react'
import { Link } from 'react-router-dom'
import styles from './RegistrationBackNavigation.module.css'

export function RegistrationBackNavigation() {
  return (
    <Link className={styles.backLink} data-register-animation-item to="/">
      <RiArrowLeftLine aria-hidden="true" size={18} />
      <span>Back</span>
    </Link>
  )
}
