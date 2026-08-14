// Uses the closest available local brand asset in the shared showcase frame.
import bmsLogo from '../../../../../assets/logo/logo.svg'
import styles from './AuthIllustration.module.css'

export function AuthIllustration() {
  return (
    <div
      className={styles.illustration}
      data-auth-animation-illustration
      aria-hidden="true"
    >
      <div className={styles.logoSurface}>
        <img className={styles.logo} src={bmsLogo} alt="" />
      </div>
    </div>
  )
}
