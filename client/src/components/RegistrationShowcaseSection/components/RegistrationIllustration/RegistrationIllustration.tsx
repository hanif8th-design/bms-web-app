// Uses the closest available local brand asset inside the reference's visual frame.
import bmsLogo from '../../../../assets/logo/logo.svg'
import styles from './RegistrationIllustration.module.css'

export function RegistrationIllustration() {
  return (
    <div
      className={styles.illustration}
      data-register-animation-illustration
      aria-hidden="true"
    >
      <div className={styles.logoSurface}>
        <img className={styles.logo} src={bmsLogo} alt="" />
      </div>
    </div>
  )
}
