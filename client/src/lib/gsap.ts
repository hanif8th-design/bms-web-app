import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

// Register once so every website animation shares the same React-safe setup.
gsap.registerPlugin(useGSAP)

export { gsap, useGSAP }
