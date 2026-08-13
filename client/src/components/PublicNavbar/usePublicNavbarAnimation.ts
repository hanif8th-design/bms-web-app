import type { RefObject } from 'react'
import { gsap, useGSAP } from '../../lib/gsap'

const navbarAnimationItemSelector = '[data-navbar-animation-item]'

/**
 * Keeps the navbar's GSAP setup scoped, automatically cleaned up, and separate
 * from its navigation behaviour and component assembly.
 */
export function usePublicNavbarAnimation(
  navbarRef: RefObject<HTMLElement | null>,
) {
  useGSAP(
    () => {
      const navbarElement = navbarRef.current
      if (!navbarElement) {
        return
      }

      const motionPreference = gsap.matchMedia()

      // Transform and opacity animation avoids layout shifts and respects OS settings.
      motionPreference.add(
        '(prefers-reduced-motion: no-preference)',
        () => {
          const navbarItems = gsap.utils.toArray<HTMLElement>(
            navbarAnimationItemSelector,
            navbarElement,
          )

          gsap
            .timeline({ defaults: { ease: 'power2.out' } })
            .fromTo(
              navbarElement,
              { y: -12, willChange: 'transform' },
              {
                clearProps: 'transform,willChange',
                duration: 0.45,
                y: 0,
              },
            )
            .fromTo(
              navbarItems,
              { autoAlpha: 0, willChange: 'transform,opacity', y: -8 },
              {
                autoAlpha: 1,
                clearProps: 'opacity,visibility,transform,willChange',
                duration: 0.3,
                stagger: 0.06,
                y: 0,
              },
              '-=0.25',
            )
        },
      )

      return () => motionPreference.revert()
    },
    { scope: navbarRef },
  )
}
