import {
  RiArchiveDrawerLine,
  RiBookOpenLine,
  RiBuilding2Line,
  RiFileChartLine,
  RiFileExcel2Line,
  RiReceiptLine,
  type RemixiconComponentType,
} from '@remixicon/react'

export interface ProblemItem {
  description: string
  icon: RemixiconComponentType
  id: string
  title: string
}

export const problemItems: ProblemItem[] = [
  {
    description: 'Daily sales recorded here',
    icon: RiReceiptLine,
    id: 'point-of-sale',
    title: 'POS',
  },
  {
    description: 'Stock updates kept here',
    icon: RiFileExcel2Line,
    id: 'spreadsheets',
    title: 'Spreadsheets',
  },
  {
    description: 'Customer balances written here',
    icon: RiBookOpenLine,
    id: 'credit-notebook',
    title: 'Credit Notebook / Khata',
  },
  {
    description: 'Physical counts updated here',
    icon: RiArchiveDrawerLine,
    id: 'inventory-sheets',
    title: 'Inventory Sheets',
  },
  {
    description: 'Each location keeps its own files',
    icon: RiBuilding2Line,
    id: 'branch-records',
    title: 'Branch Records',
  },
  {
    description: 'Summaries compiled by hand',
    icon: RiFileChartLine,
    id: 'manual-reports',
    title: 'Manual Reports',
  },
]

export const problemPainPoints = [
  'Hard to confirm real stock levels',
  'Customer balances are easy to miss',
  'Comparing branches takes manual work',
]
