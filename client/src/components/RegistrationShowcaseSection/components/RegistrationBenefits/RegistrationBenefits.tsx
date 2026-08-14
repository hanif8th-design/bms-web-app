// Maps typed benefit data into a semantic, reusable list of cards.
import { registrationBenefits } from '../../registrationBenefits'
import { RegistrationBenefitCard } from '../RegistrationBenefitCard/RegistrationBenefitCard'
import styles from './RegistrationBenefits.module.css'

export function RegistrationBenefits() {
  return (
    <ul className={styles.benefitList}>
      {registrationBenefits.map((benefit) => (
        <RegistrationBenefitCard benefit={benefit} key={benefit.id} />
      ))}
    </ul>
  )
}
