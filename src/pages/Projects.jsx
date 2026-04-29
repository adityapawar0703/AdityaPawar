/* Projects.jsx — Project cards with 3D tilt hover effects */
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { projects } from '../utils/data'
import styles from './Projects.module.css'

gsap.registerPlugin(ScrollTrigger)

/* ---- 3D Tilt Card Component ---- */
function ProjectCard({ project, index }) {
  const cardRef = useRef(null)

  /* 3D tilt on mouse move */
  const handleMouseMove = (e) => {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const rotateX = ((y - centerY) / centerY) * -10
    const rotateY = ((x - centerX) / centerX) * 10

    gsap.to(card, {
      rotateX, rotateY,
      scale: 1.02,
      duration: 0.3,
      ease: 'power2.out',
      transformPerspective: 800,
    })

    /* Move shine */
    const shine = card.querySelector(`.${styles.shine}`)
    if (shine) {
      gsap.to(shine, {
        opacity: 1,
        x: (x / rect.width) * 100 - 50,
        y: (y / rect.height) * 100 - 50,
        duration: 0.3,
      })
    }
  }

  const handleMouseLeave = () => {
    const card = cardRef.current
    if (!card) return
    gsap.to(card, {
      rotateX: 0, rotateY: 0,
      scale: 1,
      duration: 0.5,
      ease: 'power3.out',
      transformPerspective: 800,
    })
    const shine = card.querySelector(`.${styles.shine}`)
    if (shine) gsap.to(shine, { opacity: 0, duration: 0.3 })
  }

  return (
    <div
      ref={cardRef}
      className={styles.card}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ '--card-color': project.color }}
    >
      {/* Shine overlay */}
      <div className={styles.shine} />

      {/* Top bar with color accent */}
      <div className={styles.cardTop}>
        <div className={styles.cardTopBar} style={{ background: project.color }} />
        <div className={styles.cardTopRight}>
          {project.users && (
            <span className={styles.usersBadge}>👥 {project.users} users</span>
          )}
        </div>
      </div>

      {/* Card content */}
      <div className={styles.cardBody}>
        <div>
          <span className={styles.cardSub}>{project.subtitle}</span>
          <h3 className={styles.cardTitle}>{project.title}</h3>
          <p className={styles.cardDesc}>{project.description}</p>

          {/* Highlights */}
          <ul className={styles.highlights}>
            {project.highlights.map((h, i) => (
              <li key={i} className={styles.highlightItem}>
                <span className={styles.checkmark} style={{ color: project.color }}>✓</span>
                {h}
              </li>
            ))}
          </ul>
        </div>

        {/* Tech stack */}
        <div className={styles.techRow}>
          {project.tech.map(t => (
            <span key={t} className={styles.techTag}>{t}</span>
          ))}
        </div>

        {/* Links */}
        <div className={styles.cardLinks}>
          <a
            href={project.live}
            target="_blank"
            rel="noreferrer"
            className={styles.linkBtn}
            style={{ background: project.color }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
              <polyline points="15 3 21 3 21 9"/>
              <line x1="10" y1="14" x2="21" y2="3"/>
            </svg>
            Live Demo
          </a>
          <a
            href={project.github}
            target="_blank"
            rel="noreferrer"
            className={styles.linkBtnOutline}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
            </svg>
            GitHub
          </a>
        </div>
      </div>
    </div>
  )
}

export default function Projects() {
  const sectionRef = useRef(null)
  const headerRef  = useRef(null)
  const gridRef    = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* Animate section header */
      gsap.fromTo(headerRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.7,
          scrollTrigger: { trigger: headerRef.current, start: 'top 85%', once: true },
        }
      )
      /* Animate cards staggered */
      const cards = gridRef.current?.querySelectorAll(`.${styles.card}`)
      if (cards) {
        gsap.fromTo(cards,
          { y: 50, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.7, stagger: 0.2, ease: 'power3.out',
            scrollTrigger: { trigger: gridRef.current, start: 'top 80%', once: true },
          }
        )
      }
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="projects" className={`${styles.section} page-section`} ref={sectionRef}>
      <div className="container">
        <div ref={headerRef}>
          <span className="section-label">What I've Built</span>
          <h2 className="section-title">Projects</h2>
          <div className="accent-line" />
          <p className="section-subtitle">
            Production-grade applications serving real users — built with modern stacks and deployed on cloud infrastructure.
          </p>
        </div>

        <div className={styles.grid} ref={gridRef}>
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
