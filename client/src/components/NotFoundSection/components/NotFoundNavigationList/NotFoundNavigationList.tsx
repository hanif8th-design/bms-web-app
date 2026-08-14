import { notFoundNavigation } from '../../notFoundNavigation'
import { NotFoundNavigationCard } from '../NotFoundNavigationCard/NotFoundNavigationCard'
import styles from './NotFoundNavigationList.module.css'

/** Presents the recovery destinations as a semantic navigation list. */
export function NotFoundNavigationList() {
  return (
    <nav aria-label="Continue browsing" className={styles.navigation}>
      <ul className={styles.list}>
        {notFoundNavigation.map((navigationItem) => (
          <li className={styles.listItem} key={navigationItem.id}>
            <NotFoundNavigationCard navigationItem={navigationItem} />
          </li>
        ))}
      </ul>
    </nav>
  )
}
