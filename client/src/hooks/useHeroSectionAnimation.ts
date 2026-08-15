import type { RefObject } from 'react'
import { gsap, useGSAP } from '../lib/gsap'

const contentItemSelector = '[data-hero-animation-item]'
const previewSelector = '[data-hero-animation-preview]'

/** Coordinates a restrained hero entrance and removes all motion when requested. */
export function useHeroSectionAnimation(
  sectionRef: RefObject<HTMLElement | null>,
) {
  useGSAP(
    () => {
      const sectionElement = sectionRef.current
      if (!sectionElement) {
        return
      }

      const motionPreference = gsap.matchMedia()

      motionPreference.add(
        {
          motionAllowed: '(prefers-reduced-motion: no-preference)',
          stackedLayout: '(max-width: 919px)',
        },
        (animationContext) => {
          const { motionAllowed, stackedLayout } =
            animationContext.conditions as {
              motionAllowed: boolean
              stackedLayout: boolean
            }

          if (!motionAllowed) {
            return
          }

          const contentItems = gsap.utils.toArray<HTMLElement>(
            contentItemSelector,
            sectionElement,
          )
          const preview =
            sectionElement.querySelector<HTMLElement>(previewSelector)

          const entranceTimeline = gsap.timeline({
            defaults: { ease: 'power2.out' },
          })

          entranceTimeline.fromTo(
            contentItems,
            { autoAlpha: 0, willChange: 'transform,opacity', y: 14 },
            {
              autoAlpha: 1,
              clearProps: 'opacity,visibility,transform,willChange',
              duration: 0.5,
              stagger: 0.09,
              y: 0,
            },
          )

          if (preview) {
            entranceTimeline.fromTo(
              preview,
              {
                autoAlpha: 0,
                scale: 0.985,
                willChange: 'transform,opacity',
                x: stackedLayout ? 0 : 24,
                y: stackedLayout ? 18 : 6,
              },
              {
                autoAlpha: 1,
                clearProps: 'opacity,visibility,transform,willChange',
                duration: 0.65,
                scale: 1,
                x: 0,
                y: 0,
              },
              0.12,
            )
          }
        },
      )

      return () => motionPreference.revert()
    },
    { scope: sectionRef },
  )
}

