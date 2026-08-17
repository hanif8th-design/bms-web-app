// Renders one shared authentication benefit with a Remix outline icon.
import type { AuthBenefit } from '../../authBenefits'
import styles from './AuthBenefitCard.module.css'

interface AuthBenefitCardProps {
  benefit: AuthBenefit
}

export function AuthBenefitCard({ benefit }: AuthBenefitCardProps) {
  const BenefitIcon = benefit.icon

  return (
    <li className={styles.card} data-auth-animation-showcase-item>
      <div className={styles.iconContainer} aria-hidden="true">
        <BenefitIcon size={20} />
      </div>
      <h2 className={styles.title}>{benefit.title}</h2>
      <p className={styles.description}>{benefit.description}</p>
    </li>
  )
}
