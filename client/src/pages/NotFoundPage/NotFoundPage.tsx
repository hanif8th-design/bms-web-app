import { useEffect } from 'react'
import { NotFoundSection } from '../../components/NotFoundSection/NotFoundSection'
import styles from './NotFoundPage.module.css'

/** Composes the route-level not-found content. */
export function NotFoundPage() {
  useEffect(() => {
    const previousDocumentTitle = document.title
    document.title = 'Page Not Found | BMS'

    return () => {
      document.title = previousDocumentTitle
    }
  }, [])

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <NotFoundSection />
      </main>
    </div>
  )
}
