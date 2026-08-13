import { useEffect, useRef, useState } from 'react'
import { PublicNavbarActions } from './components/PublicNavbarActions/PublicNavbarActions'
import { PublicNavbarBrand } from './components/PublicNavbarBrand/PublicNavbarBrand'
import { PublicNavbarMenuToggle } from './components/PublicNavbarMenuToggle/PublicNavbarMenuToggle'
import { PublicNavbarMobileMenu } from './components/PublicNavbarMobileMenu/PublicNavbarMobileMenu'
import { PublicNavbarNavigation } from './components/PublicNavbarNavigation/PublicNavbarNavigation'
import styles from './PublicNavbar.module.css'
import { usePublicNavbarAnimation } from './usePublicNavbarAnimation'

const mobileMenuId = 'public-navbar-mobile-menu'

/** Assembles the public website's brand, navigation, and account actions. */
export function PublicNavbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const navbarRef = useRef<HTMLElement>(null)
  const menuToggleRef = useRef<HTMLButtonElement>(null)

  usePublicNavbarAnimation(navbarRef)

  const closeMobileMenu = (restoreToggleFocus = false) => {
    setIsMobileMenuOpen(false)
    if (restoreToggleFocus) {
      menuToggleRef.current?.focus()
    }
  }

  // While the off-canvas menu is open, scrolling stays within the menu itself.
  useEffect(() => {
    if (!isMobileMenuOpen) {
      return
    }

    const previousBodyOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = previousBodyOverflow
    }
  }, [isMobileMenuOpen])

  // Closing at the desktop breakpoint prevents an invisible menu from locking scroll.
  useEffect(() => {
    const desktopMediaQuery = window.matchMedia('(min-width: 1180px)')
    const closeAtDesktopBreakpoint = (event: MediaQueryListEvent) => {
      if (event.matches) {
        closeMobileMenu()
      }
    }

    desktopMediaQuery.addEventListener('change', closeAtDesktopBreakpoint)
    return () =>
      desktopMediaQuery.removeEventListener('change', closeAtDesktopBreakpoint)
  }, [])

  // Escape and outside-pointer handling mirror the dropdown's dismiss behaviour.
  useEffect(() => {
    if (!isMobileMenuOpen) {
      return
    }

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        closeMobileMenu(true)
      }
    }

    document.addEventListener('keydown', closeOnEscape)
    return () => document.removeEventListener('keydown', closeOnEscape)
  }, [isMobileMenuOpen])

  return (
    <header className={styles.publicNavbar} ref={navbarRef}>
      <div className={styles.navbarInner}>
        <PublicNavbarBrand onNavigate={() => closeMobileMenu()} />
        <PublicNavbarNavigation presentation="desktop" />
        <PublicNavbarActions presentation="desktop" />
        <PublicNavbarMenuToggle
          controlsId={mobileMenuId}
          isOpen={isMobileMenuOpen}
          onToggle={() => setIsMobileMenuOpen((currentIsOpen) => !currentIsOpen)}
          toggleRef={menuToggleRef}
        />
      </div>
      <PublicNavbarMobileMenu
        id={mobileMenuId}
        isOpen={isMobileMenuOpen}
        onBackdropClick={() => closeMobileMenu(true)}
        onNavigate={() => closeMobileMenu(true)}
      />
    </header>
  )
}
