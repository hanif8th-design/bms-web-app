import type { ComponentPropsWithoutRef } from 'react'
import styles from './Container.module.css'

export type ContainerProps = ComponentPropsWithoutRef<'div'>

/** Keeps page content centered and safely inset at every viewport width. */
export function Container({ className, ...props }: ContainerProps) {
  const containerClassName = [styles.container, className]
    .filter(Boolean)
    .join(' ')

  return <div className={containerClassName} {...props} />
}
