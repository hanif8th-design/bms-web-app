import type { RefObject } from 'react'
import { gsap, useGSAP } from '../lib/gsap'

const panelSelector = '[data-not-found-panel]'
const numberSelector = '[data-not-found-number]'
const verticalNumberPartSelector =
  '[data-not-found-number-part="left-stem"], [data-not-found-number-part="right-stem"]'
const horizontalNumberPartSelector =
  '[data-not-found-number-part="crossbar"]'
const copySelector = '[data-not-found-copy]'
const cardSelector = '[data-not-found-card]'
const arrowSelector = '[data-not-found-arrow]'
const ellipsisSelector = '[data-not-found-ellipsis]'
const errorCodeSelector = '[data-not-found-error-code]'

/**
 * Directs the 404 entrance, ambient loops, and pointer depth as one scoped scene.
 * Every animation is omitted when the operating system requests reduced motion.
 */
export function useNotFoundAnimation(
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
          mediumScreen: '(max-width: 1179px)',
          motionAllowed: '(prefers-reduced-motion: no-preference)',
          smallScreen: '(max-width: 767px)',
        },
        (animationContext) => {
          const { mediumScreen, motionAllowed, smallScreen } =
            animationContext.conditions as {
              mediumScreen: boolean
              motionAllowed: boolean
              smallScreen: boolean
            }

          if (!motionAllowed) {
            return
          }

          const numberTravel = smallScreen ? 28 : mediumScreen ? 64 : 120
          const numberRotation = smallScreen ? 2 : mediumScreen ? 4 : 7
          const numberScale = smallScreen ? 0.92 : mediumScreen ? 0.88 : 0.8
          const panelRotation = smallScreen ? 0 : mediumScreen ? -4 : -10
          const panelScaleX = smallScreen ? 0.82 : mediumScreen ? 0.72 : 0.62
          const panelScaleY = smallScreen ? 0.16 : mediumScreen ? 0.12 : 0.08
          const copyBlur = smallScreen ? 4 : mediumScreen ? 7 : 10
          const copyTravel = smallScreen ? 12 : mediumScreen ? 18 : 24
          const cardTravel = smallScreen ? 20 : mediumScreen ? 34 : 52
          const cardRotation = smallScreen ? -4 : mediumScreen ? -8 : -12
          const ambientTravel = smallScreen ? 2 : mediumScreen ? 4 : 8

          const panel = sectionElement.querySelector<HTMLElement>(panelSelector)
          const numbers = gsap.utils.toArray<HTMLElement>(
            numberSelector,
            sectionElement,
          )
          const animatedNumbers = mediumScreen ? [] : numbers
          const verticalNumberParts = gsap.utils.toArray<HTMLElement>(
            verticalNumberPartSelector,
            sectionElement,
          )
          const animatedVerticalNumberParts = mediumScreen
            ? []
            : verticalNumberParts
          const horizontalNumberParts = gsap.utils.toArray<HTMLElement>(
            horizontalNumberPartSelector,
            sectionElement,
          )
          const animatedHorizontalNumberParts = mediumScreen
            ? []
            : horizontalNumberParts
          const copyItems = gsap.utils.toArray<HTMLElement>(
            copySelector,
            sectionElement,
          )
          const cards = gsap.utils.toArray<HTMLElement>(
            cardSelector,
            sectionElement,
          )
          const arrows = gsap.utils.toArray<HTMLElement>(
            arrowSelector,
            sectionElement,
          )
          const animatedArrows = smallScreen ? [] : arrows
          const ellipses = gsap.utils.toArray<HTMLElement>(
            ellipsisSelector,
            sectionElement,
          )
          const errorCode =
            sectionElement.querySelector<HTMLElement>(errorCodeSelector)

          const entranceTimeline = gsap.timeline({
            defaults: { ease: 'power3.out' },
          })

          entranceTimeline
            .fromTo(
              sectionElement,
              { backgroundColor: 'var(--color-primary-active)' },
              {
                backgroundColor: 'var(--color-primary)',
                clearProps: 'backgroundColor',
                duration: 0.9,
              },
            )
            .fromTo(
              animatedNumbers,
              {
                autoAlpha: 0,
                rotation: (index) =>
                  index === 0 ? -numberRotation : numberRotation,
                scale: numberScale,
                willChange: 'transform,opacity',
                x: (index) =>
                  index === 0 ? -numberTravel : numberTravel,
              },
              {
                autoAlpha: 1,
                clearProps: 'opacity,visibility,willChange',
                duration: 1.05,
                rotation: 0,
                scale: 1,
                stagger: 0.08,
                x: 0,
              },
              0.05,
            )
            .fromTo(
              animatedVerticalNumberParts,
              { scaleY: 0, transformOrigin: 'bottom center' },
              {
                duration: 0.78,
                ease: 'expo.out',
                scaleY: 1,
                stagger: 0.06,
              },
              0.14,
            )
            .fromTo(
              animatedHorizontalNumberParts,
              { scaleX: 0, transformOrigin: 'center left' },
              {
                duration: 0.7,
                ease: 'back.out(1.7)',
                scaleX: 1,
                stagger: 0.12,
              },
              0.34,
            )

          if (panel) {
            entranceTimeline.fromTo(
              panel,
              {
                autoAlpha: 0,
                borderRadius: 999,
                rotationY: panelRotation,
                scaleX: panelScaleX,
                scaleY: panelScaleY,
                transformPerspective: 1200,
                willChange: 'transform,opacity',
              },
              {
                autoAlpha: 1,
                borderRadius: 'var(--radius-xl)',
                clearProps: 'borderRadius,opacity,visibility,willChange',
                duration: 1.15,
                ease: 'expo.out',
                rotationY: 0,
                scaleX: 1,
                scaleY: 1,
              },
              0.12,
            )
          }

          entranceTimeline
            .fromTo(
              copyItems,
              {
                autoAlpha: 0,
                filter: `blur(${copyBlur}px)`,
                willChange: 'transform,opacity,filter',
                y: copyTravel,
              },
              {
                autoAlpha: 1,
                clearProps: 'opacity,visibility,transform,filter,willChange',
                duration: 0.62,
                filter: 'blur(0px)',
                stagger: 0.1,
                y: 0,
              },
              0.66,
            )
            .fromTo(
              cards,
              {
                autoAlpha: 0,
                rotationX: cardRotation,
                scale: 0.94,
                transformOrigin: 'center top',
                transformPerspective: 800,
                willChange: 'transform,opacity',
                x: cardTravel,
              },
              {
                autoAlpha: 1,
                clearProps: 'opacity,visibility,transform,transformOrigin,willChange',
                duration: 0.64,
                ease: 'back.out(1.45)',
                rotationX: 0,
                scale: 1,
                stagger: 0.12,
                x: 0,
              },
              0.84,
            )
            .fromTo(
              animatedArrows,
              {
                autoAlpha: 0,
                rotation: (index) => (index === 0 ? -70 : 70),
                scale: 0,
                willChange: 'transform,opacity',
              },
              {
                autoAlpha: 1,
                clearProps: 'opacity,visibility,willChange',
                duration: 0.9,
                ease: 'elastic.out(1, 0.45)',
                rotation: 0,
                scale: 1,
                stagger: 0.16,
              },
              0.72,
            )

          if (errorCode) {
            entranceTimeline.fromTo(
              errorCode,
              { rotation: -8, scale: 0.45 },
              {
                duration: 0.85,
                ease: 'elastic.out(1, 0.45)',
                rotation: 0,
                scale: 1,
              },
              0.68,
            )

            gsap.to(errorCode, {
              delay: 1.7,
              duration: 1.4,
              ease: 'sine.inOut',
              repeat: -1,
              scale: mediumScreen ? 1.035 : 1.02,
              yoyo: true,
            })
          }

          // Alternating loops keep the large pieces alive without shifting layout.
          gsap.to(animatedNumbers, {
            delay: 1.5,
            duration: 2.8,
            ease: 'sine.inOut',
            repeat: -1,
            stagger: 0.35,
            y: (index) =>
              index === 0 ? -ambientTravel : ambientTravel,
            yoyo: true,
          })

          gsap.to(animatedArrows, {
            delay: 1.35,
            duration: 1.15,
            ease: 'sine.inOut',
            repeat: -1,
            rotation: (index) => (index === 0 ? 7 : -7),
            scale: 1.08,
            stagger: 0.18,
            y: (index) => (index === 0 ? 10 : -10),
            yoyo: true,
          })

          gsap.fromTo(
            ellipses,
            { opacity: 0.35 },
            {
              delay: 1.45,
              duration: 0.7,
              ease: 'sine.inOut',
              opacity: 1,
              repeat: -1,
              stagger: 0.2,
              yoyo: true,
            },
          )

          if (
            !panel ||
            mediumScreen ||
            !window.matchMedia('(pointer: fine)').matches
          ) {
            return
          }

          const rotatePanelX = gsap.quickTo(panel, 'rotationX', {
            duration: 0.55,
            ease: 'power3.out',
          })
          const rotatePanelY = gsap.quickTo(panel, 'rotationY', {
            duration: 0.55,
            ease: 'power3.out',
          })
          const shiftLeftNumber = numbers[0]
            ? gsap.quickTo(numbers[0], 'x', {
                duration: 0.65,
                ease: 'power3.out',
              })
            : undefined
          const shiftRightNumber = numbers[1]
            ? gsap.quickTo(numbers[1], 'x', {
                duration: 0.65,
                ease: 'power3.out',
              })
            : undefined

          const respondToPointer = (event: PointerEvent) => {
            const sectionBounds = sectionElement.getBoundingClientRect()
            const normalizedX =
              (event.clientX - sectionBounds.left) / sectionBounds.width - 0.5
            const normalizedY =
              (event.clientY - sectionBounds.top) / sectionBounds.height - 0.5

            rotatePanelX(normalizedY * -4)
            rotatePanelY(normalizedX * 5)
            shiftLeftNumber?.(normalizedX * -12)
            shiftRightNumber?.(normalizedX * 12)
          }

          const resetPointerDepth = () => {
            rotatePanelX(0)
            rotatePanelY(0)
            shiftLeftNumber?.(0)
            shiftRightNumber?.(0)
          }

          sectionElement.addEventListener('pointermove', respondToPointer)
          sectionElement.addEventListener('pointerleave', resetPointerDepth)

          return () => {
            sectionElement.removeEventListener('pointermove', respondToPointer)
            sectionElement.removeEventListener('pointerleave', resetPointerDepth)
          }
        },
      )

      return () => motionPreference.revert()
    },
    { scope: sectionRef },
  )
}
