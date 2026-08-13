import type {
  PublicNavbarActionItem,
  PublicNavbarNavigationItem,
} from './publicNavbar.types'

// A single navigation source keeps desktop and mobile destinations in sync.
export const publicNavbarNavigation: PublicNavbarNavigationItem[] = [
  {
    kind: 'link',
    label: 'Home',
    to: '/',
    end: true,
  },
  {
    kind: 'dropdown',
    label: 'Features',
    to: '/features',
    children: [
      {
        kind: 'link',
        label: 'Point of Sale',
        to: '/features/point-of-sale',
      },
      {
        kind: 'link',
        label: 'Inventory',
        to: '/features/inventory',
      },
      {
        kind: 'link',
        label: 'Customer Credit',
        to: '/features/customer-credit',
      },
      {
        kind: 'link',
        label: 'Purchasing',
        to: '/features/purchasing',
      },
      {
        kind: 'link',
        label: 'Manufacturing',
        to: '/features/manufacturing',
      },
      {
        kind: 'link',
        label: 'Reports',
        to: '/features/reports',
      },
    ],
  },
  {
    kind: 'link',
    label: 'Business Types',
    to: '/business-types',
  },
  {
    kind: 'link',
    label: 'Pricing',
    to: '/pricing',
  },
  {
    kind: 'link',
    label: 'About',
    to: '/about',
  },
]

export const publicNavbarActions: PublicNavbarActionItem[] = [
  {
    icon: 'login',
    label: 'Log In',
    to: '/login',
    variant: 'secondary',
  },
  {
    icon: 'register',
    label: 'Register',
    to: '/register',
    variant: 'primary',
  },
]
