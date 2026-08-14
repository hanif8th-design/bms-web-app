import { NotFoundNavigationList } from '../NotFoundNavigationList/NotFoundNavigationList'
import styles from './NotFoundMessagePanel.module.css'

interface NotFoundMessagePanelProps {
  headingId: string
}

/** Keeps the complete error message usable independently of the decoration. */
export function NotFoundMessagePanel({ headingId }: NotFoundMessagePanelProps) {
  return (
    <div className={styles.panel} data-not-found-panel="">
      <p className={styles.errorLabel} data-not-found-copy="">
        <span
          aria-hidden="true"
          className={styles.ellipsis}
          data-not-found-ellipsis=""
        >
          •••
        </span>
        <span className={styles.errorCode} data-not-found-error-code="">
          404
        </span>{' '}
        <span className={styles.errorWord}>error</span>
        <span
          aria-hidden="true"
          className={styles.ellipsis}
          data-not-found-ellipsis=""
        >
          •••
        </span>
      </p>
      <h1 className={styles.heading} data-not-found-copy="" id={headingId}>
        Sorry, this page could not be found.
      </h1>
      <p className={styles.description} data-not-found-copy="">
        The page may have moved, no longer exists, or the address may be
        incorrect. Use one of these links to continue.
      </p>
      <NotFoundNavigationList />
    </div>
  )
}
