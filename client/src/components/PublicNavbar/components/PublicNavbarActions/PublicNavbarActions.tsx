import { RiLoginBoxLine, RiUserAddLine } from '@remixicon/react'
import { NavLink } from 'react-router-dom'
import { publicNavbarActions } from '../../publicNavbarNavigation'
import type { PublicNavbarPresentation } from '../../publicNavbar.types'
import styles from './PublicNavbarActions.module.css'

const actionIcons = {
  login: RiLoginBoxLine,
  register: RiUserAddLine,
}

interface PublicNavbarActionsProps {
  onNavigate?: () => void
  presentation: PublicNavbarPresentation
}

export function PublicNavbarActions({
  onNavigate,
  presentation,
}: PublicNavbarActionsProps) {
  return (
    <div
      aria-label="Account actions"
      className={`${styles.actions} ${styles[presentation]}`}
      data-navbar-animation-item={presentation === 'desktop' ? '' : undefined}
      role="group"
    >
      {publicNavbarActions.map((action) => {
        const ActionIcon = actionIcons[action.icon]

        return (
          <NavLink
            className={({ isActive }) =>
              `${styles.action} ${styles[action.variant]} ${isActive ? styles.activeAction : ''}`
            }
            key={action.to}
            onClick={onNavigate}
            to={action.to}
          >
            <ActionIcon aria-hidden="true" className={styles.actionIcon} size={20} />
            <span>{action.label}</span>
          </NavLink>
        )
      })}
    </div>
  )
}
