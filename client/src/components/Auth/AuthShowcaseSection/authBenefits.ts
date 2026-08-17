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
    description: 'Protected access keeps important business data secure.',
    icon: RiShieldCheckLine,
    id: 'enterprise-security',
    title: 'Secure by design',
  },
  {
    description: 'Fast, dependable workflows keep every team moving.',
    icon: RiSpeedLine,
    id: 'lightning-fast',
    title: 'Built for momentum',
  },
]
