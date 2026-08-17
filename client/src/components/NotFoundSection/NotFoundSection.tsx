import { RiArrowLeftLine, RiHome4Line } from '@remixicon/react'
import { Link, useNavigate } from 'react-router-dom'
import { Container } from '../layout/Container/Container'
import styles from './NotFoundSection.module.css'

const notFoundHeadingId = 'not-found-heading'

/** Presents a simple recovery path when a public route cannot be found. */
export function NotFoundSection() {
  const navigate = useNavigate()

  return (
    <section
      aria-labelledby={notFoundHeadingId}
      className={styles.section}
    >
      <Container className={styles.content}>
        <p className={styles.eyebrow}>
          <span aria-hidden="true" className={styles.statusDot} />
          Page not found
        </p>
        <p aria-hidden="true" className={styles.errorCode}>
          404
        </p>
        <h1 className={styles.heading} id={notFoundHeadingId}>
          This page isn&apos;t available.
        </h1>
        <p className={styles.description}>
          The link may be broken, or the page may have been moved. Let&apos;s get
          you back to somewhere useful.
        </p>
        <div aria-label="Page recovery" className={styles.actions} role="group">
          <Link className={`${styles.action} ${styles.primaryAction}`} to="/">
            <RiHome4Line aria-hidden="true" size={20} />
            Back to home
          </Link>
          <button
            className={`${styles.action} ${styles.secondaryAction}`}
            onClick={() => navigate(-1)}
            type="button"
          >
            <RiArrowLeftLine aria-hidden="true" size={20} />
            Go back
          </button>
        </div>
      </Container>
    </section>
  )
}
