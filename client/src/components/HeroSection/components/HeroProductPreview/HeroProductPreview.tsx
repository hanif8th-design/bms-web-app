import dashboardImage from '../../../../assets/hero/dashboard.png'
import styles from './HeroProductPreview.module.css'

/** Presents the current product visual without coupling image treatment to the hero layout. */
export function HeroProductPreview() {
  return (
    <figure className={styles.preview} data-hero-animation-preview>
      <img
        alt="BMS account creation screen with enterprise security and performance features"
        className={styles.dashboardImage}
        fetchPriority="high"
        height={603}
        src={dashboardImage}
        width={1053}
      />
    </figure>
  )
}
