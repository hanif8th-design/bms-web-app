import { RiCheckLine } from '@remixicon/react'
import { useRef } from 'react'
import { useUnifiedSolutionAnimation } from '../../hooks/useUnifiedSolutionAnimation'
import { Container } from '../layout/Container/Container'
import {
  solutionBenefits,
  solutionModules,
  type SolutionBenefit,
  type SolutionModule,
} from './solutionModules'
import styles from './UnifiedSolutionSection.module.css'

const solutionHeadingId = 'home-solution-heading'
const solutionDemoNoteId = 'solution-demo-note'

interface SolutionModuleCardProps {
  module: SolutionModule
}

function SolutionModuleCard({ module }: SolutionModuleCardProps) {
  const ModuleIcon = module.icon

  return (
    <li
      className={`${styles.moduleCard} ${styles[module.position]}`}
      data-solution-animation-module
    >
      <span aria-hidden="true" className={styles.moduleIcon}>
        <ModuleIcon size={19} />
      </span>
      <div className={styles.moduleCopy}>
        <h3 className={styles.moduleTitle}>{module.title}</h3>
        <p className={styles.moduleLabel}>{module.label}</p>
        <p className={styles.moduleValue}>{module.value}</p>
      </div>
    </li>
  )
}

interface SolutionBenefitItemProps {
  benefit: SolutionBenefit
}

function SolutionBenefitItem({ benefit }: SolutionBenefitItemProps) {
  const BenefitIcon = benefit.icon

  return (
    <li className={styles.benefitItem}>
      <span aria-hidden="true" className={styles.benefitIcon}>
        <BenefitIcon size={19} />
      </span>
      <div>
        <h3 className={styles.benefitTitle}>{benefit.title}</h3>
        <p className={styles.benefitDescription}>{benefit.description}</p>
      </div>
    </li>
  )
}

function SolutionConnectors() {
  const connectorPaths = [
    'M 50 43 L 50 15',
    'M 43 45 L 14 24',
    'M 57 45 L 86 24',
    'M 42 54 L 14 66',
    'M 58 54 L 86 66',
    'M 47 58 L 33 87',
    'M 53 58 L 67 87',
  ]

  return (
    <svg
      aria-hidden="true"
      className={styles.connectors}
      preserveAspectRatio="none"
      viewBox="0 0 100 100"
    >
      {connectorPaths.map((path) => (
        <path
          d={path}
          data-solution-animation-connector
          key={path}
          pathLength="1"
          vectorEffect="non-scaling-stroke"
        />
      ))}
    </svg>
  )
}

/** Presents every major operation as part of one shared BMS system. */
export function UnifiedSolutionSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useUnifiedSolutionAnimation(sectionRef)

  return (
    <section
      aria-labelledby={solutionHeadingId}
      className={styles.solutionSection}
      ref={sectionRef}
    >
      <Container className={styles.layout}>
        <div className={styles.copy}>
          <p className={styles.eyebrow} data-solution-animation-copy>
            One connected system
          </p>
          <h2
            className={styles.heading}
            data-solution-animation-copy
            id={solutionHeadingId}
          >
            One connected system for your entire business.
          </h2>
          <p className={styles.description} data-solution-animation-copy>
            Sales, inventory, customers, purchases, expenses, branches, and
            reports stay connected, giving you one clear view of how your
            business is performing.
          </p>

          <ul className={styles.benefitList} data-solution-animation-copy>
            {solutionBenefits.map((benefit) => (
              <SolutionBenefitItem benefit={benefit} key={benefit.id} />
            ))}
          </ul>
        </div>

        <div
          aria-describedby={solutionDemoNoteId}
          aria-label="Seven business modules connected through one BMS system"
          className={styles.systemVisual}
          role="group"
        >
          <SolutionConnectors />

          <div className={styles.centralHub} data-solution-animation-hub>
            <p className={styles.hubTitle}>Your Business</p>
            <p className={styles.hubStatus}>
              <RiCheckLine aria-hidden="true" size={15} />
              All operations connected
            </p>
          </div>

          <ul className={styles.moduleList}>
            {solutionModules.map((module) => (
              <SolutionModuleCard key={module.id} module={module} />
            ))}
          </ul>

          <p className={styles.demoNote} id={solutionDemoNoteId}>
            Illustrative interface data
          </p>
        </div>
      </Container>
    </section>
  )
}
