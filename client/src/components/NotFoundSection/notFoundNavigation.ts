export interface NotFoundNavigationItem {
  id: string
  title: string
  description: string
  path: string
}

// Navigation data stays separate so the list and card components only present it.
export const notFoundNavigation: NotFoundNavigationItem[] = [
  {
    id: 'home',
    title: 'Return Home',
    description: 'Go back to the BMS homepage.',
    path: '/',
  },
  {
    id: 'features',
    title: 'Explore Features',
    description: 'Discover tools for sales, inventory, credit and reporting.',
    path: '/features',
  },
  {
    id: 'help-center',
    title: 'Visit Help Center',
    description: 'Find helpful guides and support resources.',
    path: '/help',
  },
]
