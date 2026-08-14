import { RiArrowRightLine } from '@remixicon/react'
import { Link } from 'react-router-dom'
import type { NotFoundNavigationItem } from '../../notFoundNavigation'
import styles from './NotFoundNavigationCard.module.css'

interface NotFoundNavigationCardProps {
  navigationItem: NotFoundNavigationItem
}

/** Makes the complete recovery card one descriptive internal link target. */
export function NotFoundNavigationCard({
  navigationItem,
}: NotFoundNavigationCardProps) {
  return (
    <Link
      className={styles.card}
      data-not-found-card=""
      to={navigationItem.path}
    >
      <span className={styles.copy}>
        <span className={styles.title}>{navigationItem.title}</span>
        <span className={styles.description}>{navigationItem.description}</span>
      </span>
      <span className={styles.arrow}>
        <RiArrowRightLine aria-hidden="true" size={20} />
      </span>
    </Link>
  )
}
