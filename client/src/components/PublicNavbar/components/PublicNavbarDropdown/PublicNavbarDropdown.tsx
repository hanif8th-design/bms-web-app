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
  item: PublicNavbarDropdownItem
  onNavigate?: () => void
  presentation: PublicNavbarPresentation
}

interface ExpandedMenuMeasurements {
  height: number
  marginBottom: number
  marginTop: number
  paddingBottom: number
  paddingTop: number
}

function measureExpandedMenu(
  menuElement: HTMLUListElement,
): ExpandedMenuMeasurements {
  const computedStyles = window.getComputedStyle(menuElement)

  return {
    height: menuElement.scrollHeight,
    marginBottom: Number.parseFloat(computedStyles.marginBottom) || 0,
    marginTop: Number.parseFloat(computedStyles.marginTop) || 0,
    paddingBottom: Number.parseFloat(computedStyles.paddingBottom) || 0,
    paddingTop: Number.parseFloat(computedStyles.paddingTop) || 0,
  }
}

export function PublicNavbarDropdown({
  item,
  onNavigate,
  presentation,
}: PublicNavbarDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isMenuRendered, setIsMenuRendered] = useState(false)
  const dropdownId = useId()
  const dropdownContainerRef = useRef<HTMLDivElement>(null)
  const menuRef = useRef<HTMLUListElement>(null)
  const expandedMenuMeasurementsRef =
    useRef<ExpandedMenuMeasurements | null>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([])
  const location = useLocation()
  const isDropdownTriggerActive =
    presentation === 'desktop'
      ? location.pathname.startsWith(item.to)
      : location.pathname === item.to

  useGSAP(
    () => {
      const menuElement = menuRef.current
      const prefersReducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)',
      ).matches

      if (presentation !== 'mobile' || !menuElement) {
        return
      }

      if (prefersReducedMotion) {
        if (!isOpen) {
          setIsMenuRendered(false)
        }
        return
      }

      gsap.killTweensOf(menuElement)

      if (isOpen) {
        const isFreshMenu = menuElement.style.height === ''

        if (isFreshMenu || !expandedMenuMeasurementsRef.current) {
          expandedMenuMeasurementsRef.current = measureExpandedMenu(menuElement)
        }

        const expandedMenuMeasurements = expandedMenuMeasurementsRef.current

        // A fresh menu starts collapsed; an interrupted close resumes in place.
        if (isFreshMenu) {
          gsap.set(menuElement, {
            autoAlpha: 0,
            height: 0,
            marginBottom: 0,
            marginTop: 0,
            overflow: 'hidden',
            paddingBottom: 0,
            paddingTop: 0,
            y: -6,
          })
        }

        gsap.set(menuElement, { pointerEvents: 'auto' })
        gsap.to(menuElement, {
          autoAlpha: 1,
          clearProps:
            'height,marginBottom,marginTop,opacity,overflow,paddingBottom,paddingTop,pointerEvents,transform,visibility,willChange',
          duration: 0.32,
          ease: 'power2.out',
          height: expandedMenuMeasurements.height,
          marginBottom: expandedMenuMeasurements.marginBottom,
          marginTop: expandedMenuMeasurements.marginTop,
          paddingBottom: expandedMenuMeasurements.paddingBottom,
          paddingTop: expandedMenuMeasurements.paddingTop,
          willChange: 'height,transform,opacity',
          y: 0,
        })
        return
      }

      // Keep the accordion mounted until the exit animation fully completes.
      gsap.to(menuElement, {
        autoAlpha: 0,
        duration: 0.26,
        ease: 'power2.inOut',
        height: 0,
        marginBottom: 0,
        marginTop: 0,
        onComplete: () => setIsMenuRendered(false),
        overflow: 'hidden',
        paddingBottom: 0,
        paddingTop: 0,
        pointerEvents: 'none',
        willChange: 'height,transform,opacity',
        y: -6,
      })
    },
    {
      dependencies: [isMenuRendered, isOpen, presentation],
      scope: dropdownContainerRef,
    },
  )

  const closeDropdown = useCallback(
    (restoreTriggerFocus = false) => {
      setIsOpen(false)

      const shouldAnimateClose =
        presentation === 'mobile' &&
        !window.matchMedia('(prefers-reduced-motion: reduce)').matches

      if (!shouldAnimateClose) {
        setIsMenuRendered(false)
      }

      if (restoreTriggerFocus) {
        triggerRef.current?.focus()
      }
    },
    [presentation],
  )

  const openDropdown = () => {
    setIsMenuRendered(true)
    setIsOpen(true)
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
        closeDropdown()
      }
    }

    document.addEventListener('pointerdown', closeOnOutsidePointer)
    return () => document.removeEventListener('pointerdown', closeOnOutsidePointer)
  }, [closeDropdown, isOpen])

  // Escape consistently closes the menu and returns focus to its trigger.
  useEffect(() => {
    if (!isOpen) {
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
  }, [closeDropdown, isOpen])

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
      closeDropdown()
    }
  }

  const handleDropdownNavigation = () => {
    closeDropdown()
    onNavigate?.()
  }

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

      {isMenuRendered ? (
        <ul
          aria-hidden={!isOpen}
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
      ) : null}
    </div>
  )
}
