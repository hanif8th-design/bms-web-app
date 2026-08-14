import { useEffect } from 'react'
import { NotFoundSection } from '../../components/NotFoundSection/NotFoundSection'
import { PublicNavbar } from '../../components/PublicNavbar/PublicNavbar'
import styles from './NotFoundPage.module.css'

/** Composes the public navigation and the route-level not-found content. */
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
      <PublicNavbar />
      <main className={styles.main}>
        <NotFoundSection />
      </main>
    </div>
  )
}
