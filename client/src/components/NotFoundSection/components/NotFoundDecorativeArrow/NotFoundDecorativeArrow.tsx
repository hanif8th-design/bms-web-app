import { RiCornerLeftUpFill, RiCornerRightDownFill } from '@remixicon/react'
import styles from './NotFoundDecorativeArrow.module.css'

interface NotFoundDecorativeArrowProps {
  placement: 'left' | 'right'
}

/** Adds secondary directional cues without repeating information for screen readers. */
export function NotFoundDecorativeArrow({
  placement,
}: NotFoundDecorativeArrowProps) {
  const ArrowIcon =
    placement === 'left' ? RiCornerRightDownFill : RiCornerLeftUpFill

  return (
    <span
      aria-hidden="true"
      className={`${styles.arrow} ${styles[placement]}`}
      data-not-found-arrow={placement}
    >
      <ArrowIcon className={styles.icon} />
    </span>
  )
}
