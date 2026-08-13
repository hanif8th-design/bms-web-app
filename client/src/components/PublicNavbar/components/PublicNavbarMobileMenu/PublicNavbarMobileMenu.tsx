import { PublicNavbarActions } from '../PublicNavbarActions/PublicNavbarActions'
import { PublicNavbarNavigation } from '../PublicNavbarNavigation/PublicNavbarNavigation'
import styles from './PublicNavbarMobileMenu.module.css'

interface PublicNavbarMobileMenuProps {
  id: string
  isOpen: boolean
  onBackdropClick: () => void
  onNavigate: () => void
}

export function PublicNavbarMobileMenu({
  id,
  isOpen,
  onBackdropClick,
  onNavigate,
}: PublicNavbarMobileMenuProps) {
  if (!isOpen) {
    return null
  }

  return (
    <>
      <button
        aria-label="Close navigation menu"
        className={styles.backdrop}
        onClick={onBackdropClick}
        tabIndex={-1}
        type="button"
      />
      <div className={styles.mobileMenu} id={id}>
        <div className={styles.mobileMenuContent}>
          <PublicNavbarNavigation
            onNavigate={onNavigate}
            presentation="mobile"
          />
          <PublicNavbarActions
            onNavigate={onNavigate}
            presentation="mobile"
          />
        </div>
      </div>
    </>
  )
}
