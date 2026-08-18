import type { RefObject } from 'react'
import { gsap, useGSAP } from '../lib/gsap'

const copyItemSelector = '[data-problem-animation-copy]'
const cardSelector = '[data-problem-animation-card]'

/** Reveals the problem story once, when the below-the-fold section enters view. */
export function useProblemSectionAnimation(
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
        '(prefers-reduced-motion: no-preference)',
        () => {
          const copyItems = gsap.utils.toArray<HTMLElement>(
            copyItemSelector,
            sectionElement,
          )
          const cards = gsap.utils.toArray<HTMLElement>(
            cardSelector,
            sectionElement,
          )

          gsap.set([...copyItems, ...cards], {
            autoAlpha: 0,
            y: 14,
          })

          const playEntrance = () => {
            gsap
              .timeline({ defaults: { ease: 'power2.out' } })
              .to(copyItems, {
                autoAlpha: 1,
                clearProps: 'opacity,visibility,transform',
                duration: 0.45,
                stagger: 0.07,
                y: 0,
              })
              .to(
                cards,
                {
                  autoAlpha: 1,
                  clearProps: 'opacity,visibility,transform',
                  duration: 0.42,
                  stagger: 0.06,
                  y: 0,
                },
                0.14,
              )
          }

          if (!('IntersectionObserver' in window)) {
            playEntrance()
            return
          }

          const observer = new IntersectionObserver(
            ([entry]) => {
              if (!entry?.isIntersecting) {
                return
              }

              observer.disconnect()
              playEntrance()
            },
            { rootMargin: '0px 0px -12% 0px', threshold: 0.15 },
          )

          observer.observe(sectionElement)
          return () => observer.disconnect()
        },
      )

      return () => motionPreference.revert()
    },
    { scope: sectionRef },
  )
}
