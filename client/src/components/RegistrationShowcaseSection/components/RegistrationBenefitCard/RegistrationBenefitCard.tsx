// Renders one concise business benefit with a matching Remix outline icon.
import type { RegistrationBenefit } from '../../registrationBenefits'
import styles from './RegistrationBenefitCard.module.css'

interface RegistrationBenefitCardProps {
  benefit: RegistrationBenefit
}

export function RegistrationBenefitCard({
  benefit,
}: RegistrationBenefitCardProps) {
  const BenefitIcon = benefit.icon

  return (
    <li className={styles.card} data-auth-animation-benefit>
      <div className={styles.iconContainer} aria-hidden="true">
        <BenefitIcon size={20} />
      </div>
      <h2 className={styles.title}>{benefit.title}</h2>
      <p className={styles.description}>{benefit.description}</p>
    </li>
  )
}
