/* Education.jsx — Education history with animated SGPA/CGPA line graph */
import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { education, sgpaData, cgpaData } from '../utils/data'
import styles from './Education.module.css'

gsap.registerPlugin(ScrollTrigger)

/* ---- Graph constants ---- */
const GRAPH_W = 700
const GRAPH_H = 320
const PAD = { top: 30, right: 40, bottom: 50, left: 60 }
const PLOT_W = GRAPH_W - PAD.left - PAD.right
const PLOT_H = GRAPH_H - PAD.top - PAD.bottom
const Y_MIN = 6.5
const Y_MAX = 10

function yPos(val) {
  return PAD.top + PLOT_H - ((val - Y_MIN) / (Y_MAX - Y_MIN)) * PLOT_H
}
function xPos(i, total) {
  return PAD.left + (i / (total - 1)) * PLOT_W
}

/* Build SVG path string from data points */
function buildPath(data, key) {
  return data
    .map((d, i) => {
      const x = xPos(i, data.length)
      const y = yPos(d[key])
      return `${i === 0 ? 'M' : 'L'} ${x} ${y}`
    })
    .join(' ')
}

/* Build area fill path */
function buildArea(data, key) {
  const line = buildPath(data, key)
  const lastX = xPos(data.length - 1, data.length)
  const firstX = xPos(0, data.length)
  return `${line} L ${lastX} ${PAD.top + PLOT_H} L ${firstX} ${PAD.top + PLOT_H} Z`
}

export default function Education() {
  const sectionRef  = useRef(null)
  const graphRef    = useRef(null)
  const pathRef     = useRef(null)
  const areaRef     = useRef(null)
  const dotsRef     = useRef([])
  const cardsRef    = useRef([])

  const [mode, setMode] = useState('sgpa') // 'sgpa' | 'cgpa'
  const [tooltip, setTooltip] = useState(null)
  const [animated, setAnimated] = useState(false)

  const data   = mode === 'sgpa' ? sgpaData : cgpaData
  const key    = mode === 'sgpa' ? 'sgpa' : 'cgpa'
  const linePath = buildPath(data, key)
  const areaPath = buildArea(data, key)

  /* Animate graph path on scroll (once) */
  useEffect(() => {
    const trigger = ScrollTrigger.create({
      trigger: graphRef.current,
      start: 'top 80%',
      once: true,
      onEnter: () => {
        setAnimated(true)

        /* Animate line draw */
        const pathEl = pathRef.current
        if (!pathEl) return
        const len = pathEl.getTotalLength?.() || 800
        gsap.fromTo(pathEl,
          { strokeDasharray: len, strokeDashoffset: len },
          { strokeDashoffset: 0, duration: 1.8, ease: 'power3.inOut' }
        )
        /* Fade in area */
        gsap.fromTo(areaRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 1, delay: 0.6 }
        )
        /* Pop dots */
        gsap.fromTo(dotsRef.current,
          { scale: 0, transformOrigin: 'center' },
          { scale: 1, stagger: 0.12, duration: 0.4, ease: 'back.out(2)', delay: 0.3 }
        )
      },
    })
    return () => trigger.kill()
  }, [])

  /* Re-animate on mode switch */
  useEffect(() => {
    if (!animated) return
    const pathEl = pathRef.current
    if (!pathEl) return
    const len = pathEl.getTotalLength?.() || 800
    gsap.fromTo(pathEl,
      { strokeDasharray: len, strokeDashoffset: len },
      { strokeDashoffset: 0, duration: 1.2, ease: 'power3.inOut' }
    )
    gsap.fromTo(areaRef.current, { opacity: 0 }, { opacity: 1, duration: 0.8, delay: 0.3 })
    gsap.fromTo(dotsRef.current,
      { scale: 0 },
      { scale: 1, stagger: 0.08, duration: 0.35, ease: 'back.out(2)', delay: 0.2 }
    )
  }, [mode])

  /* Animate education cards on scroll */
  useEffect(() => {
    cardsRef.current.forEach((card, i) => {
      if (!card) return
      gsap.fromTo(card,
        { x: -40, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.6, ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 88%',
            once: true,
          },
          delay: i * 0.1,
        }
      )
    })
  }, [])

  /* Y axis tick marks */
  const yTicks = [7, 7.5, 8, 8.5, 9, 9.5, 10]

  const currentVal = mode === 'sgpa' ? data[data.length - 1].sgpa : data[data.length - 1].cgpa

  return (
    <section id="education" className={`${styles.section} page-section`} ref={sectionRef}>
      <div className="container">

        {/* Section header */}
        <span className="section-label">Academic Journey</span>
        <h2 className="section-title">Education</h2>
        <div className="accent-line" />

        {/* Education cards */}
        <div className={styles.cards}>
          {education.map((edu, i) => (
            <div
              key={i}
              className={`${styles.card} ${edu.current ? styles.cardHighlight : ''}`}
              ref={el => cardsRef.current[i] = el}
            >
              <div className={styles.cardLeft}>
                <div className={styles.cardDot} />
                <div className={styles.cardLine} />
              </div>
              <div className={styles.cardRight}>
                <div className={styles.cardHeader}>
                  <h3 className={styles.degree}>{edu.degree}</h3>
                  {edu.current && <span className={styles.currentBadge}>Current</span>}
                </div>
                <p className={styles.institution}>{edu.institution}, {edu.location}</p>
                <div className={styles.cardMeta}>
                  <span className={styles.period}>📅 {edu.period}</span>
                  <span className={styles.grade}>
                    {edu.current ? '🎓' : '📊'} {edu.current ? 'CGPA' : 'Score'}: <strong>{edu.cgpa}</strong>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ---- GRAPH SECTION ---- */}
        <div className={styles.graphSection} ref={graphRef}>
          <div className={styles.graphHeader}>
            <div>
              <h3 className={styles.graphTitle}>Academic Performance</h3>
              <p className={styles.graphSub}>
                {mode === 'sgpa' ? 'Semester Grade Point Average' : 'Cumulative GPA'} — B.Tech CSE
              </p>
            </div>

            {/* Toggle SGPA / CGPA */}
            <div className={styles.toggle}>
              <button
                className={`${styles.toggleBtn} ${mode === 'sgpa' ? styles.toggleActive : ''}`}
                onClick={() => setMode('sgpa')}
              >
                SGPA
              </button>
              <button
                className={`${styles.toggleBtn} ${mode === 'cgpa' ? styles.toggleActive : ''}`}
                onClick={() => setMode('cgpa')}
              >
                CGPA
              </button>
            </div>
          </div>

          {/* Current value pill */}
          <div className={styles.currentPill}>
            <span className={styles.pillLabel}>Latest {mode.toUpperCase()}</span>
            <span className={styles.pillValue}>{currentVal.toFixed(2)}</span>
            <span className={styles.pillSem}>Sem 7</span>
          </div>

          {/* SVG Line Graph */}
          <div className={styles.graphWrap}>
            <svg
              viewBox={`0 0 ${GRAPH_W} ${GRAPH_H}`}
              className={styles.svg}
              aria-label={`${mode.toUpperCase()} line graph`}
            >
              <defs>
                {/* Gradient for area fill */}
                <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%"   stopColor="var(--graph-line)" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="var(--graph-line)" stopOpacity="0" />
                </linearGradient>
                {/* Glow filter */}
                <filter id="glow">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Y axis grid lines */}
              {yTicks.map(tick => (
                <g key={tick}>
                  <line
                    x1={PAD.left} y1={yPos(tick)}
                    x2={PAD.left + PLOT_W} y2={yPos(tick)}
                    stroke="var(--graph-grid)"
                    strokeWidth="1"
                    strokeDasharray="4 4"
                  />
                  <text
                    x={PAD.left - 10} y={yPos(tick) + 4}
                    textAnchor="end"
                    fontSize="11"
                    fill="var(--text-muted)"
                    fontFamily="DM Sans"
                  >
                    {tick}
                  </text>
                </g>
              ))}

              {/* X axis labels */}
              {data.map((d, i) => (
                <text
                  key={i}
                  x={xPos(i, data.length)}
                  y={GRAPH_H - 14}
                  textAnchor="middle"
                  fontSize="11"
                  fill="var(--text-muted)"
                  fontFamily="DM Sans"
                >
                  {d.sem}
                </text>
              ))}

              {/* Axis lines */}
              <line
                x1={PAD.left} y1={PAD.top}
                x2={PAD.left} y2={PAD.top + PLOT_H}
                stroke="var(--border-strong)" strokeWidth="1"
              />
              <line
                x1={PAD.left} y1={PAD.top + PLOT_H}
                x2={PAD.left + PLOT_W} y2={PAD.top + PLOT_H}
                stroke="var(--border-strong)" strokeWidth="1"
              />

              {/* Area fill */}
              <path
                ref={areaRef}
                d={areaPath}
                fill="url(#areaGrad)"
                opacity="0"
              />

              {/* Main line */}
              <path
                ref={pathRef}
                d={linePath}
                fill="none"
                stroke="var(--graph-line)"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                filter="url(#glow)"
                style={{ transition: 'd 0.6s ease' }}
              />

              {/* Data points (circles) */}
              {data.map((d, i) => (
                <g key={i}>
                  {/* Outer pulse ring */}
                  <circle
                    cx={xPos(i, data.length)}
                    cy={yPos(d[key])}
                    r={tooltip?.i === i ? 16 : 0}
                    fill="var(--graph-line)"
                    opacity="0.15"
                    style={{ transition: 'r 0.2s ease' }}
                  />
                  {/* Hit area */}
                  <circle
                    cx={xPos(i, data.length)}
                    cy={yPos(d[key])}
                    r={18}
                    fill="transparent"
                    style={{ cursor: 'pointer' }}
                    onMouseEnter={() => setTooltip({ i, d })}
                    onMouseLeave={() => setTooltip(null)}
                  />
                  {/* Dot */}
                  <circle
                    ref={el => dotsRef.current[i] = el}
                    cx={xPos(i, data.length)}
                    cy={yPos(d[key])}
                    r={tooltip?.i === i ? 8 : 6}
                    fill="var(--graph-dot)"
                    stroke="var(--bg-primary)"
                    strokeWidth="3"
                    filter="url(#glow)"
                    style={{ cursor: 'pointer', transition: 'r 0.15s ease' }}
                    onMouseEnter={() => setTooltip({ i, d })}
                    onMouseLeave={() => setTooltip(null)}
                  />
                  {/* Tooltip */}
                  {tooltip?.i === i && (
                    <g>
                      <rect
                        x={xPos(i, data.length) - 36}
                        y={yPos(d[key]) - 44}
                        width="72"
                        height="30"
                        rx="6"
                        fill="var(--bg-card)"
                        stroke="var(--border)"
                        strokeWidth="1"
                      />
                      <text
                        x={xPos(i, data.length)}
                        y={yPos(d[key]) - 22}
                        textAnchor="middle"
                        fontSize="12"
                        fontWeight="700"
                        fill="var(--graph-line)"
                        fontFamily="Syne"
                      >
                        {d[key]}
                      </text>
                    </g>
                  )}
                </g>
              ))}
            </svg>
          </div>

          {/* Legend */}
          <div className={styles.graphLegend}>
            <div className={styles.legendItem}>
              <div className={styles.legendDot} />
              <span>{mode === 'sgpa' ? 'Semester GPA' : 'Cumulative GPA'}</span>
            </div>
            <div className={styles.legendNote}>
              📈 Consistent upward trend — highest in Sem 7
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
