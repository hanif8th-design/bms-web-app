import {
  RiArchiveStackLine,
  RiBarChartBoxLine,
  RiBuilding2Line,
  RiDatabase2Line,
  RiLinkM,
  RiShoppingBag3Line,
  RiShoppingCart2Line,
  RiTeamLine,
  RiWallet3Line,
  type RemixiconComponentType,
} from '@remixicon/react'

export interface SolutionModule {
  icon: RemixiconComponentType
  id: string
  label: string
  position: string
  title: string
  value: string
}

export interface SolutionBenefit {
  description: string
  icon: RemixiconComponentType
  id: string
  title: string
}

export const solutionModules: SolutionModule[] = [
  {
    icon: RiShoppingCart2Line,
    id: 'sales',
    label: "Today's sales",
    position: 'salesModule',
    title: 'Sales',
    value: 'Rs. 184,500',
  },
  {
    icon: RiArchiveStackLine,
    id: 'inventory',
    label: 'Low stock',
    position: 'inventoryModule',
    title: 'Inventory',
    value: '8 products',
  },
  {
    icon: RiTeamLine,
    id: 'customers',
    label: 'Receivables',
    position: 'customersModule',
    title: 'Customers',
    value: 'Rs. 126,000',
  },
  {
    icon: RiShoppingBag3Line,
    id: 'purchases',
    label: 'Pending orders',
    position: 'purchasesModule',
    title: 'Purchases',
    value: '4 orders',
  },
  {
    icon: RiWallet3Line,
    id: 'expenses',
    label: 'This month',
    position: 'expensesModule',
    title: 'Expenses',
    value: 'Rs. 82,400',
  },
  {
    icon: RiBuilding2Line,
    id: 'branches',
    label: 'Active locations',
    position: 'branchesModule',
    title: 'Branches',
    value: '3 branches',
  },
  {
    icon: RiBarChartBoxLine,
    id: 'reports',
    label: 'Net profit',
    position: 'reportsModule',
    title: 'Reports',
    value: 'Rs. 310,000',
  },
]

export const solutionBenefits: SolutionBenefit[] = [
  {
    description:
      'A sale automatically affects inventory, customer records, and reporting.',
    icon: RiLinkM,
    id: 'always-connected',
    title: 'Always connected',
  },
  {
    description: 'Everyone works with the same up-to-date business data.',
    icon: RiDatabase2Line,
    id: 'one-source-of-truth',
    title: 'One source of truth',
  },
  {
    description: 'View individual branches or your entire business together.',
    icon: RiBuilding2Line,
    id: 'clear-across-branches',
    title: 'Clear across every branch',
  },
]
