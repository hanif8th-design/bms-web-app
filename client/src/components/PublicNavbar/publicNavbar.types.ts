export interface PublicNavbarLinkItem {
  kind: 'link'
  label: string
  to: string
  end?: boolean
}

export interface PublicNavbarDropdownItem {
  kind: 'dropdown'
  label: string
  to: string
  children: PublicNavbarLinkItem[]
}

export type PublicNavbarNavigationItem =
  | PublicNavbarLinkItem
  | PublicNavbarDropdownItem

export type PublicNavbarActionVariant = 'secondary' | 'primary'
export type PublicNavbarActionIcon = 'login' | 'register'

export interface PublicNavbarActionItem {
  icon: PublicNavbarActionIcon
  label: string
  to: string
  variant: PublicNavbarActionVariant
}

export type PublicNavbarPresentation = 'desktop' | 'mobile'
