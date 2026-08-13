import { Link } from 'react-router-dom'
import bmsLogo from '../../../../assets/logo/logo.svg'
import styles from './PublicNavbarBrand.module.css'

interface PublicNavbarBrandProps {
  onNavigate?: () => void
}

export function PublicNavbarBrand({ onNavigate }: PublicNavbarBrandProps) {
  return (
    <Link
      aria-label="BMS home"
      className={styles.brand}
      data-navbar-animation-item=""
      onClick={onNavigate}
      to="/"
    >
      <img
        alt="BMS"
        className={styles.logo}
        height={40}
        src={bmsLogo}
        width={133}
      />
    </Link>
  )
}
