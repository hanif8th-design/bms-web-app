import styles from './NotFoundDecorativeNumber.module.css'

/** Builds the reference's squared-off 4; the message panel announces the error. */
export function NotFoundDecorativeNumber() {
  return (
    <span aria-hidden="true" className={styles.number}>
      <span
        className={styles.leftStem}
        data-not-found-number-part="left-stem"
      />
      <span
        className={styles.crossbar}
        data-not-found-number-part="crossbar"
      />
      <span
        className={styles.rightStem}
        data-not-found-number-part="right-stem"
      />
    </span>
  )
}
