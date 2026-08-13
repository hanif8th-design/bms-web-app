import { RiArrowDownSLine } from '@remixicon/react'
import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
} from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { gsap, useGSAP } from '../../../../lib/gsap'
import type {
  PublicNavbarDropdownItem,
  PublicNavbarPresentation,
} from '../../publicNavbar.types'
import styles from './PublicNavbarDropdown.module.css'

interface PublicNavbarDropdownProps {
  controlledIsOpen?: boolean
  item: PublicNavbarDropdownItem
  onNavigate?: () => void
  onOpenChange?: (isOpen: boolean) => void
  presentation: PublicNavbarPresentation
}

export function PublicNavbarDropdown({
  controlledIsOpen,
  item,
  onNavigate,
  onOpenChange,
  presentation,
}: PublicNavbarDropdownProps) {
  const [uncontrolledIsOpen, setUncontrolledIsOpen] = useState(false)
  const isOpen = controlledIsOpen ?? uncontrolledIsOpen
  const dropdownId = useId()
  const dropdownContainerRef = useRef<HTMLDivElement>(null)
  const mobileAccordionRef = useRef<HTMLDivElement>(null)
  const menuRef = useRef<HTMLUListElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([])
  const location = useLocation()
  const isDropdownTriggerActive =
    presentation === 'desktop'
      ? location.pathname.startsWith(item.to)
      : location.pathname === item.to

  const setDropdownOpen = useCallback(
    (nextIsOpen: boolean) => {
      if (controlledIsOpen === undefined) {
        setUncontrolledIsOpen(nextIsOpen)
      }
      onOpenChange?.(nextIsOpen)
    },
    [controlledIsOpen, onOpenChange],
  )

  useGSAP(
    () => {
      const accordionElement = mobileAccordionRef.current
      const menuElement = menuRef.current
      const prefersReducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)',
      ).matches

      if (
        presentation !== 'mobile' ||
        !accordionElement ||
        !menuElement
      ) {
        return
      }

      const computedMenuStyles = window.getComputedStyle(menuElement)
      const expandedHeight =
        menuElement.offsetHeight +
        (Number.parseFloat(computedMenuStyles.marginTop) || 0) +
        (Number.parseFloat(computedMenuStyles.marginBottom) || 0)

      if (prefersReducedMotion) {
        gsap.set(accordionElement, {
          autoAlpha: isOpen ? 1 : 0,
          height: isOpen ? expandedHeight : 0,
          pointerEvents: isOpen ? 'auto' : 'none',
          y: 0,
        })
        return
      }

      // A stable wrapper provides one reversible animation target for every click.
      gsap.to(accordionElement, {
        autoAlpha: isOpen ? 1 : 0,
        duration: isOpen ? 0.34 : 0.28,
        ease: isOpen ? 'power2.out' : 'power2.inOut',
        height: isOpen ? expandedHeight : 0,
        onComplete: () =>
          gsap.set(accordionElement, { clearProps: 'willChange' }),
        overwrite: 'auto',
        pointerEvents: isOpen ? 'auto' : 'none',
        willChange: 'height,transform,opacity',
        y: isOpen ? 0 : -6,
      })
    },
    {
      dependencies: [isOpen, presentation],
      scope: dropdownContainerRef,
    },
  )

  const closeDropdown = useCallback(
    (restoreTriggerFocus = false) => {
      setDropdownOpen(false)

      if (restoreTriggerFocus) {
        triggerRef.current?.focus()
      }
    },
    [setDropdownOpen],
  )

  const openDropdown = () => {
    setDropdownOpen(true)
  }

  const toggleDropdown = () => {
    if (isOpen) {
      closeDropdown()
    } else {
      openDropdown()
    }
  }

  // Pointer events outside the component dismiss the custom menu on mouse and touch.
  useEffect(() => {
    if (!isOpen) {
      return
    }

    const closeOnOutsidePointer = (event: PointerEvent) => {
      if (!dropdownContainerRef.current?.contains(event.target as Node)) {
        const pointerTarget = event.target
        const pointerIsInsideMobileMenu =
          pointerTarget instanceof Element &&
          pointerTarget.closest('[data-public-navbar-mobile-menu]')

        // Closing the side panel itself must not alter its remembered accordion state.
        if (presentation === 'mobile' && !pointerIsInsideMobileMenu) {
          return
        }
        closeDropdown()
      }
    }

    document.addEventListener('pointerdown', closeOnOutsidePointer)
    return () => document.removeEventListener('pointerdown', closeOnOutsidePointer)
  }, [closeDropdown, isOpen, presentation])

  // Escape consistently closes the menu and returns focus to its trigger.
  useEffect(() => {
    if (!isOpen || presentation === 'mobile') {
      return
    }

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        closeDropdown(true)
      }
    }

    document.addEventListener('keydown', closeOnEscape)
    return () => document.removeEventListener('keydown', closeOnEscape)
  }, [closeDropdown, isOpen, presentation])

  const focusDropdownItem = (index: number) => {
    const normalizedIndex =
      (index + item.children.length) % item.children.length
    itemRefs.current[normalizedIndex]?.focus()
  }

  const openAndFocusFirstItem = () => {
    openDropdown()
    window.requestAnimationFrame(() => focusDropdownItem(0))
  }

  const handleTriggerKeyDown = (
    event: ReactKeyboardEvent<HTMLButtonElement>,
  ) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault()
      openAndFocusFirstItem()
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault()
      openDropdown()
      window.requestAnimationFrame(() =>
        focusDropdownItem(item.children.length - 1),
      )
    }
  }

  const handleMenuKeyDown = (event: ReactKeyboardEvent<HTMLUListElement>) => {
    const focusedIndex = itemRefs.current.findIndex(
      (element) => element === document.activeElement,
    )

    if (event.key === 'ArrowDown') {
      event.preventDefault()
      focusDropdownItem(focusedIndex + 1)
    } else if (event.key === 'ArrowUp') {
      event.preventDefault()
      focusDropdownItem(focusedIndex - 1)
    } else if (event.key === 'Home') {
      event.preventDefault()
      focusDropdownItem(0)
    } else if (event.key === 'End') {
      event.preventDefault()
      focusDropdownItem(item.children.length - 1)
    }
  }

  const handleBlur = (event: React.FocusEvent<HTMLDivElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
      const focusIsInsideMobileMenu =
        event.relatedTarget instanceof Element &&
        event.relatedTarget.closest('[data-public-navbar-mobile-menu]')

      if (presentation === 'mobile' && !focusIsInsideMobileMenu) {
        return
      }
      closeDropdown()
    }
  }

  const handleDropdownNavigation = () => {
    // Mobile preserves the expanded state when navigation temporarily closes
    // the side panel; desktop retains its conventional dismiss-on-selection.
    if (presentation === 'desktop') {
      closeDropdown()
    }
    onNavigate?.()
  }

  const dropdownMenu = (
    <ul
      aria-hidden={presentation === 'mobile' && !isOpen}
      aria-label={`${item.label} navigation`}
      className={styles.menu}
      id={dropdownId}
      onKeyDown={handleMenuKeyDown}
      ref={menuRef}
      role="menu"
    >
      {item.children.map((childItem, index) => (
        <li key={childItem.to} role="none">
          <NavLink
            className={({ isActive }) =>
              `${styles.menuLink} ${isActive ? styles.activeMenuLink : ''}`
            }
            onClick={handleDropdownNavigation}
            ref={(element) => {
              itemRefs.current[index] = element
            }}
            role="menuitem"
            tabIndex={isOpen ? undefined : -1}
            to={childItem.to}
          >
            {childItem.label}
          </NavLink>
        </li>
      ))}
    </ul>
  )

  return (
    <div
      className={`${styles.dropdown} ${styles[presentation]}`}
      onBlur={handleBlur}
      ref={dropdownContainerRef}
    >
      <button
        aria-controls={dropdownId}
        aria-expanded={isOpen}
        aria-haspopup="menu"
        className={`${styles.trigger} ${isOpen ? styles.openTrigger : ''} ${isDropdownTriggerActive ? styles.activeTrigger : ''}`}
        onClick={toggleDropdown}
        onKeyDown={handleTriggerKeyDown}
        ref={triggerRef}
        type="button"
      >
        <span>{item.label}</span>
        <RiArrowDownSLine
          aria-hidden="true"
          className={styles.chevron}
          size={20}
        />
      </button>

      {presentation === 'mobile' ? (
        <div className={styles.mobileAccordion} ref={mobileAccordionRef}>
          {dropdownMenu}
        </div>
      ) : isOpen ? (
        dropdownMenu
      ) : null}
    </div>
  )
}
