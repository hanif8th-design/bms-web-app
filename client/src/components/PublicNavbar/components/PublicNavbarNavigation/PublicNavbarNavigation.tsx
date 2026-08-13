import { publicNavbarNavigation } from '../../publicNavbarNavigation'
import type { PublicNavbarPresentation } from '../../publicNavbar.types'
import { PublicNavbarDropdown } from '../PublicNavbarDropdown/PublicNavbarDropdown'
import { PublicNavbarLink } from '../PublicNavbarLink/PublicNavbarLink'
import styles from './PublicNavbarNavigation.module.css'

interface PublicNavbarNavigationProps {
  isMobileFeaturesOpen?: boolean
  onNavigate?: () => void
  onMobileFeaturesOpenChange?: (isOpen: boolean) => void
  presentation: PublicNavbarPresentation
}

export function PublicNavbarNavigation({
  isMobileFeaturesOpen,
  onNavigate,
  onMobileFeaturesOpenChange,
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
                controlledIsOpen={
                  presentation === 'mobile' ? isMobileFeaturesOpen : undefined
                }
                item={navigationItem}
                onNavigate={onNavigate}
                onOpenChange={
                  presentation === 'mobile'
                    ? onMobileFeaturesOpenChange
                    : undefined
                }
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
