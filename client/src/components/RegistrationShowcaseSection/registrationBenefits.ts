// Stores benefit content as typed data so presentation stays reusable and consistent.
import {
  RiShieldCheckLine,
  RiSpeedLine,
  type RemixiconComponentType,
} from '@remixicon/react'

export interface RegistrationBenefit {
  description: string
  icon: RemixiconComponentType
  id: string
  title: string
}

export const registrationBenefits: RegistrationBenefit[] = [
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
