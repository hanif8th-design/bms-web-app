// Maps shared typed benefit data into a semantic card list.
import { authBenefits } from '../../authBenefits'
import { AuthBenefitCard } from '../AuthBenefitCard/AuthBenefitCard'
import styles from './AuthBenefits.module.css'

export function AuthBenefits() {
  return (
    <ul className={styles.benefitList}>
      {authBenefits.map((benefit) => (
        <AuthBenefitCard benefit={benefit} key={benefit.id} />
      ))}
    </ul>
  )
}
