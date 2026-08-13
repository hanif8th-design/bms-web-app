import { NavLink } from 'react-router-dom'
import type { PublicNavbarLinkItem } from '../../publicNavbar.types'
import styles from './PublicNavbarLink.module.css'

interface PublicNavbarLinkProps {
  item: PublicNavbarLinkItem
  onNavigate?: () => void
}

export function PublicNavbarLink({ item, onNavigate }: PublicNavbarLinkProps) {
  return (
    <NavLink
      className={({ isActive }) =>
        `${styles.navigationLink} ${isActive ? styles.activeNavigationLink : ''}`
      }
      end={item.end}
      onClick={onNavigate}
      to={item.to}
    >
      {item.label}
    </NavLink>
  )
}
