import { useRef } from 'react'
import { useNotFoundAnimation } from '../../hooks/useNotFoundAnimation'
import { NotFoundDecorativeArrow } from './components/NotFoundDecorativeArrow/NotFoundDecorativeArrow'
import { NotFoundDecorativeNumber } from './components/NotFoundDecorativeNumber/NotFoundDecorativeNumber'
import { NotFoundMessagePanel } from './components/NotFoundMessagePanel/NotFoundMessagePanel'
import styles from './NotFoundSection.module.css'

const notFoundHeadingId = 'not-found-heading'

/** Assembles the decorative 4-panel-4 composition around the usable message. */
export function NotFoundSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useNotFoundAnimation(sectionRef)

  return (
    <section
      aria-labelledby={notFoundHeadingId}
      className={styles.section}
      ref={sectionRef}
    >
      <div className={styles.composition}>
        <div
          className={`${styles.numberPosition} ${styles.leftNumber}`}
          data-not-found-number="left"
        >
          <NotFoundDecorativeNumber />
        </div>

        <NotFoundMessagePanel headingId={notFoundHeadingId} />

        <div
          className={`${styles.numberPosition} ${styles.rightNumber}`}
          data-not-found-number="right"
        >
          <NotFoundDecorativeNumber />
        </div>

        <NotFoundDecorativeArrow placement="left" />
        <NotFoundDecorativeArrow placement="right" />
      </div>
    </section>
  )
}
