// Stores shared authentication benefit content as typed reusable data.
import {
  RiShieldCheckLine,
  RiSpeedLine,
  type RemixiconComponentType,
} from '@remixicon/react'

export interface AuthBenefit {
  description: string
  icon: RemixiconComponentType
  id: string
  title: string
}

export const authBenefits: AuthBenefit[] = [
  {
    description: 'Bank-grade encryption for your data.',
    icon: RiShieldCheckLine,
    id: 'enterprise-security',
    title: 'Enterprise Security',
  },
  {
    description: 'Optimized for speed and reliability.',
    icon: RiSpeedLine,
    id: 'lightning-fast',
    title: 'Lightning Fast',
  },
]
