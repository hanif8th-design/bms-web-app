import type { RefObject } from 'react'
import { gsap, useGSAP } from '../lib/gsap'

const copySelector = '[data-solution-animation-copy]'
const connectorSelector = '[data-solution-animation-connector]'
const hubSelector = '[data-solution-animation-hub]'
const moduleSelector = '[data-solution-animation-module]'

/** Reveals the connected system in a short, ordered sequence on first view. */
export function useUnifiedSolutionAnimation(
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
            copySelector,
            sectionElement,
          )
          const connectorPaths = gsap.utils.toArray<SVGPathElement>(
            connectorSelector,
            sectionElement,
          )
          const hub = sectionElement.querySelector<HTMLElement>(hubSelector)
          const modules = gsap.utils.toArray<HTMLElement>(
            moduleSelector,
            sectionElement,
          )

          gsap.set(copyItems, { autoAlpha: 0, y: 12 })
          gsap.set(modules, { autoAlpha: 0, y: 10 })
          gsap.set(connectorPaths, {
            strokeDasharray: 1,
            strokeDashoffset: 1,
          })
          if (hub) {
            gsap.set(hub, { autoAlpha: 0, scale: 0.96 })
          }

          const playEntrance = () => {
            const timeline = gsap.timeline({
              defaults: { ease: 'power2.out' },
            })

            timeline.to(copyItems, {
              autoAlpha: 1,
              clearProps: 'opacity,visibility,transform',
              duration: 0.42,
              stagger: 0.07,
              y: 0,
            })

            if (hub) {
              timeline.to(
                hub,
                {
                  autoAlpha: 1,
                  clearProps: 'opacity,visibility,transform',
                  duration: 0.42,
                  scale: 1,
                },
                0.08,
              )
            }

            timeline
              .to(
                connectorPaths,
                {
                  clearProps: 'stroke-dasharray,stroke-dashoffset',
                  duration: 0.46,
                  stagger: 0.035,
                  strokeDashoffset: 0,
                },
                0.22,
              )
              .to(
                modules,
                {
                  autoAlpha: 1,
                  clearProps: 'opacity,visibility,transform',
                  duration: 0.38,
                  stagger: 0.05,
                  y: 0,
                },
                0.28,
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
