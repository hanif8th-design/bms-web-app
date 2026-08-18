import { useRef } from 'react'
import { useProblemSectionAnimation } from '../../hooks/useProblemSectionAnimation'
import { Container } from '../layout/Container/Container'
import {
  problemItems,
  problemPainPoints,
  type ProblemItem,
} from './problemItems'
import styles from './ProblemSection.module.css'

const problemHeadingId = 'home-problem-heading'

interface ProblemCardProps {
  index: number
  item: ProblemItem
}

function ProblemCard({ index, item }: ProblemCardProps) {
  const ProblemIcon = item.icon

  return (
    <li className={styles.problemCard} data-problem-animation-card>
      <span aria-hidden="true" className={styles.iconContainer}>
        <ProblemIcon size={22} />
      </span>
      <div className={styles.cardCopy}>
        <h3 className={styles.cardTitle}>{item.title}</h3>
        <p className={styles.cardDescription}>{item.description}</p>
      </div>
      <span aria-hidden="true" className={styles.cardIndex}>
        {String(index + 1).padStart(2, '0')}
      </span>
    </li>
  )
}

/** Frames the fragmented workflows businesses face before BMS is introduced. */
export function ProblemSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useProblemSectionAnimation(sectionRef)

  return (
    <section
      aria-labelledby={problemHeadingId}
      className={styles.problemSection}
      ref={sectionRef}
    >
      <Container className={styles.layout}>
        <div className={styles.copy}>
          <p className={styles.eyebrow} data-problem-animation-copy>
            The problem
          </p>
          <h2
            className={styles.heading}
            data-problem-animation-copy
            id={problemHeadingId}
          >
            Your business data should not live in six different places.
          </h2>
          <p className={styles.description} data-problem-animation-copy>
            Sales in one system, inventory in spreadsheets, customer credit in
            notebooks, branch records somewhere else, and reports prepared
            manually. When your data is scattered, getting a clear picture of
            your business becomes unnecessarily difficult.
          </p>

          <ul className={styles.painList} data-problem-animation-copy>
            {problemPainPoints.map((painPoint) => (
              <li className={styles.painItem} key={painPoint}>
                {painPoint}
              </li>
            ))}
          </ul>
        </div>

        <div
          aria-label="Examples of disconnected business records"
          className={styles.fragmentedVisual}
          role="group"
        >
          <div className={styles.visualHeader} data-problem-animation-copy>
            <div>
              <p className={styles.visualEyebrow}>The fragmented setup</p>
              <p className={styles.visualLabel}>
                Every record lives somewhere else
              </p>
            </div>
            <p className={styles.visualMeta}>Nothing connects</p>
          </div>
          <ul className={styles.cardGrid}>
            {problemItems.map((item, index) => (
              <ProblemCard index={index} item={item} key={item.id} />
            ))}
          </ul>
          <p className={styles.visualSummary} data-problem-animation-copy>
            No single record shows the full picture of the business.
          </p>
        </div>
      </Container>
    </section>
  )
}
