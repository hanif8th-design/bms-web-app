import { RiCloseLine, RiMenuLine } from '@remixicon/react'
import styles from './PublicNavbarMenuToggle.module.css'

interface PublicNavbarMenuToggleProps {
  controlsId: string
  isOpen: boolean
  onToggle: () => void
  toggleRef: React.RefObject<HTMLButtonElement | null>
}

export function PublicNavbarMenuToggle({
  controlsId,
  isOpen,
  onToggle,
  toggleRef,
}: PublicNavbarMenuToggleProps) {
  return (
    <button
      aria-controls={controlsId}
      aria-expanded={isOpen}
      aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
      className={`${styles.menuToggle} ${isOpen ? styles.openMenuToggle : ''}`}
      data-navbar-animation-item=""
      onClick={onToggle}
      ref={toggleRef}
      type="button"
    >
      {isOpen ? (
        <RiCloseLine aria-hidden="true" className={styles.menuIcon} size={24} />
      ) : (
        <RiMenuLine aria-hidden="true" className={styles.menuIcon} size={24} />
      )}
    </button>
  )
}
