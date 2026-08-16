// Returns users to the page that opened the authentication flow.
import { RiArrowLeftLine } from '@remixicon/react'
import { useNavigate } from 'react-router-dom'
import styles from './AuthBackNavigation.module.css'

export function AuthBackNavigation() {
  const navigate = useNavigate()

  return (
    <button
      className={styles.backLink}
      data-auth-animation-item
      onClick={() => navigate(-1)}
      type="button"
    >
      <RiArrowLeftLine aria-hidden="true" size={18} />
      <span>Back</span>
    </button>
  )
}
