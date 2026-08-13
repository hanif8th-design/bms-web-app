import { PublicNavbarActions } from '../PublicNavbarActions/PublicNavbarActions'
import { PublicNavbarNavigation } from '../PublicNavbarNavigation/PublicNavbarNavigation'
import styles from './PublicNavbarMobileMenu.module.css'

interface PublicNavbarMobileMenuProps {
  id: string
  isFeaturesOpen: boolean
  isOpen: boolean
  onBackdropClick: () => void
  onFeaturesOpenChange: (isOpen: boolean) => void
  onNavigate: () => void
}

export function PublicNavbarMobileMenu({
  id,
  isFeaturesOpen,
  isOpen,
  onBackdropClick,
  onFeaturesOpenChange,
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
      <div className={styles.mobileMenu} data-public-navbar-mobile-menu="" id={id}>
        <div className={styles.mobileMenuContent}>
          <PublicNavbarNavigation
            isMobileFeaturesOpen={isFeaturesOpen}
            onNavigate={onNavigate}
            onMobileFeaturesOpenChange={onFeaturesOpenChange}
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
