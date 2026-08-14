// Animates shared field-level validation feedback into and out of auth forms.
import { RiErrorWarningLine } from '@remixicon/react'
import { useRef, useState } from 'react'
import { gsap, useGSAP } from '../../../lib/gsap'
import styles from './AuthFieldMessage.module.css'

interface AuthFieldMessageProps {
  id: string
  message?: string
}

interface DisplayedMessageState {
  displayedMessage?: string
  receivedMessage?: string
}

export function AuthFieldMessage({ id, message }: AuthFieldMessageProps) {
  const regionRef = useRef<HTMLDivElement>(null)
  const messageRef = useRef<HTMLParagraphElement>(null)
  const wasVisibleRef = useRef(false)
  const [messageState, setMessageState] = useState<DisplayedMessageState>({
    displayedMessage: message,
    receivedMessage: message,
  })

  // Preserve resolved text until its exit animation has visually completed.
  if (message !== messageState.receivedMessage) {
    setMessageState({
      displayedMessage: message ?? messageState.displayedMessage,
      receivedMessage: message,
    })
  }

  const displayedMessage = message ?? messageState.displayedMessage

  useGSAP(
    () => {
      const regionElement = regionRef.current
      const messageElement = messageRef.current
      if (!regionElement || !messageElement) {
        return
      }

      const prefersReducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)',
      ).matches

      gsap.killTweensOf([regionElement, messageElement])

      if (prefersReducedMotion) {
        wasVisibleRef.current = Boolean(message)
        gsap.set(regionElement, {
          gridTemplateRows: message ? '1fr' : '0fr',
        })
        gsap.set(messageElement, {
          autoAlpha: message ? 1 : 0,
          clearProps: 'transform',
        })
        return
      }

      // A fractional grid row expands predictably without `height: auto` jumps.
      if (message) {
        if (wasVisibleRef.current) {
          gsap.fromTo(
            messageElement,
            { autoAlpha: 0.55, y: -2 },
            {
              autoAlpha: 1,
              clearProps: 'opacity,visibility,transform,willChange',
              duration: 0.2,
              ease: 'power2.out',
              y: 0,
            },
          )
          return
        }

        wasVisibleRef.current = true
        gsap
          .timeline()
          .set(regionElement, {
            gridTemplateRows: '0fr',
            willChange: 'grid-template-rows',
          })
          .set(messageElement, {
            autoAlpha: 0,
            willChange: 'transform,opacity',
            y: -4,
          })
          .to(
            regionElement,
            {
              duration: 0.42,
              ease: 'power3.out',
              gridTemplateRows: '1fr',
              onComplete: () => {
                gsap.set(regionElement, { clearProps: 'willChange' })
              },
            },
            0,
          )
          .to(
            messageElement,
            {
              autoAlpha: 1,
              clearProps: 'opacity,visibility,transform,willChange',
              duration: 0.3,
              ease: 'power2.out',
              y: 0,
            },
            0.07,
          )
        return
      }

      if (wasVisibleRef.current) {
        wasVisibleRef.current = false
        gsap
          .timeline()
          .to(
            messageElement,
            {
              autoAlpha: 0,
              duration: 0.22,
              ease: 'power2.in',
              willChange: 'transform,opacity',
              y: -3,
            },
            0,
          )
          .to(
            regionElement,
            {
              duration: 0.36,
              ease: 'power2.inOut',
              gridTemplateRows: '0fr',
              willChange: 'grid-template-rows',
            },
            0,
          )
      }
    },
    { dependencies: [message], scope: regionRef },
  )

  return (
    <div className={styles.messageRegion} ref={regionRef}>
      <div className={styles.messageClip}>
        <p
          aria-hidden={!message}
          className={styles.message}
          id={id}
          ref={messageRef}
          role="alert"
        >
          <RiErrorWarningLine
            aria-hidden="true"
            className={styles.icon}
            size={15}
          />
          <span>{displayedMessage ?? ''}</span>
        </p>
      </div>
    </div>
  )
}
