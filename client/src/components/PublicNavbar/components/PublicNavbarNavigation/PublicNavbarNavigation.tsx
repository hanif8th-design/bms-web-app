import { publicNavbarNavigation } from '../../publicNavbarNavigation'
import type { PublicNavbarPresentation } from '../../publicNavbar.types'
import { PublicNavbarDropdown } from '../PublicNavbarDropdown/PublicNavbarDropdown'
import { PublicNavbarLink } from '../PublicNavbarLink/PublicNavbarLink'
import styles from './PublicNavbarNavigation.module.css'

interface PublicNavbarNavigationProps {
  onNavigate?: () => void
  presentation: PublicNavbarPresentation
}

export function PublicNavbarNavigation({
  onNavigate,
  presentation,
}: PublicNavbarNavigationProps) {
  return (
    <nav
      aria-label={presentation === 'desktop' ? 'Primary navigation' : 'Mobile navigation'}
      className={`${styles.navigation} ${styles[presentation]}`}
      data-navbar-animation-item={presentation === 'desktop' ? '' : undefined}
    >
      <ul className={styles.navigationList}>
        {publicNavbarNavigation.map((navigationItem) => (
          <li className={styles.navigationItem} key={navigationItem.to}>
            {navigationItem.kind === 'dropdown' ? (
              <PublicNavbarDropdown
                item={navigationItem}
                onNavigate={onNavigate}
                presentation={presentation}
              />
            ) : (
              <PublicNavbarLink
                item={navigationItem}
                onNavigate={onNavigate}
              />
            )}
          </li>
        ))}
      </ul>
    </nav>
  )
}
