// Coordinates the registration page's subtle, reduced-motion-safe entrance sequence.
import type { RefObject } from 'react'
import { gsap, useGSAP } from '../lib/gsap'

const formItemSelector = '[data-register-animation-item]'
const illustrationSelector = '[data-register-animation-illustration]'
const benefitSelector = '[data-register-animation-benefit]'

export function useRegisterPageAnimation(
  pageRef: RefObject<HTMLElement | null>,
) {
  useGSAP(
    () => {
      const pageElement = pageRef.current
      if (!pageElement) {
        return
      }

      const motionPreference = gsap.matchMedia()

      // Small transforms keep the entrance polished without delaying interaction.
      motionPreference.add(
        '(prefers-reduced-motion: no-preference)',
        () => {
          const formItems = gsap.utils.toArray<HTMLElement>(
            formItemSelector,
            pageElement,
          )
          const illustration = pageElement.querySelector<HTMLElement>(
            illustrationSelector,
          )
          const benefits = gsap.utils.toArray<HTMLElement>(
            benefitSelector,
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

          if (illustration) {
            timeline.fromTo(
              illustration,
              {
                autoAlpha: 0,
                scale: 0.985,
                willChange: 'transform,opacity',
                y: 8,
              },
              {
                autoAlpha: 1,
                clearProps: 'opacity,visibility,transform,willChange',
                duration: 0.52,
                scale: 1,
                y: 0,
              },
              0.08,
            )
          }

          timeline.fromTo(
            benefits,
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
