import { useState } from 'react'
import { Container } from '../layout/Container/Container'
import { trustLogos, type TrustLogo } from './trustLogos'
import styles from './TrustSection.module.css'

const trustHeadingId = 'home-trust-heading'

interface TrustLogoItemProps {
  logo: TrustLogo
}

function TrustLogoItem({ logo }: TrustLogoItemProps) {
  const [hasImageError, setHasImageError] = useState(false)

  return (
    <li className={styles.logoItem}>
      <div className={styles.logoLockup}>
        {hasImageError ? (
          <span aria-hidden="true" className={styles.fallbackMark}>
            {logo.name.slice(0, 1)}
          </span>
        ) : (
          <img
            alt={`${logo.name} logo, shown as a temporary layout placeholder`}
            className={styles.logoImage}
            decoding="async"
            height="32"
            loading="lazy"
            onError={() => setHasImageError(true)}
            src={logo.src}
          />
        )}
        <span aria-hidden={!hasImageError} className={styles.logoName}>
          {logo.name}
        </span>
      </div>
    </li>
  )
}

/** Displays a replaceable, non-endorsement logo treatment below the home hero. */
export function TrustSection() {
  return (
    <section
      aria-labelledby={trustHeadingId}
      className={styles.trustSection}
    >
      <Container className={styles.content}>
        <h2 className={styles.heading} id={trustHeadingId}>
          Built for modern businesses across industries
        </h2>

        <ul
          aria-label="Temporary company logo examples"
          className={styles.logoList}
        >
          {trustLogos.map((logo) => (
            <TrustLogoItem key={logo.name} logo={logo} />
          ))}
        </ul>

        <p className={styles.disclaimer}>
          Sample logos for layout preview only—not customer or partner
          endorsements.
        </p>
      </Container>
    </section>
  )
}
