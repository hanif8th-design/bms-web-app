// Coordinates subtle, reduced-motion-safe entrances shared by authentication pages.
import type { RefObject } from 'react'
import { gsap, useGSAP } from '../lib/gsap'

const formItemSelector = '[data-auth-animation-item]'
const showcaseItemSelector = '[data-auth-animation-showcase-item]'

export function useAuthPageAnimation(
  pageRef: RefObject<HTMLElement | null>,
) {
  useGSAP(
    () => {
      const pageElement = pageRef.current
      if (!pageElement) {
        return
      }

      const motionPreference = gsap.matchMedia()

      // Small transforms keep page entry polished without delaying interaction.
      motionPreference.add(
        '(prefers-reduced-motion: no-preference)',
        () => {
          const formItems = gsap.utils.toArray<HTMLElement>(
            formItemSelector,
            pageElement,
          )
          const showcaseItems = gsap.utils.toArray<HTMLElement>(
            showcaseItemSelector,
            pageElement,
          )

          const timeline = gsap.timeline({
            defaults: { ease: 'power2.out' },
          })

          timeline.fromTo(
            formItems,
            { autoAlpha: 0, willChange: 'transform,opacity', y: 12 },
            {
              autoAlpha: 1,
              clearProps: 'opacity,visibility,transform,willChange',
              duration: 0.42,
              stagger: 0.07,
              y: 0,
            },
          )

          timeline.fromTo(
            showcaseItems,
            { autoAlpha: 0, willChange: 'transform,opacity', y: 10 },
            {
              autoAlpha: 1,
              clearProps: 'opacity,visibility,transform,willChange',
              duration: 0.38,
              stagger: 0.08,
              y: 0,
            },
            0.22,
          )
        },
      )

      return () => motionPreference.revert()
    },
    { scope: pageRef },
  )
}
