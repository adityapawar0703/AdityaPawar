/* Skills.jsx — Skills with 3D badge hover effects and category filter */
import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { skills, categoryColors } from '../utils/data'
import styles from './Skills.module.css'

gsap.registerPlugin(ScrollTrigger)

const CATEGORIES = ['All', 'Language', 'Backend', 'Frontend', 'Database', 'Cloud', 'Tools']

/* Individual skill badge with 3D hover */
function SkillBadge({ skill, index }) {
  const badgeRef = useRef(null)
  const colors = categoryColors[skill.category]

  const handleMouseEnter = () => {
    const el = badgeRef.current
    gsap.to(el, {
      scale: 1.12,
      rotateY: 8,
      rotateX: -4,
      duration: 0.3,
      ease: 'power2.out',
      transformPerspective: 600,
      boxShadow: `0 16px 40px ${colors.glow}44, 0 0 0 1px ${colors.border}`,
    })
  }
  const handleMouseLeave = () => {
    const el = badgeRef.current
    gsap.to(el, {
      scale: 1,
      rotateY: 0,
      rotateX: 0,
      duration: 0.4,
      ease: 'elastic.out(1, 0.6)',
      boxShadow: `0 4px 12px rgba(0,0,0,0.08)`,
    })
  }

  return (
    <div
      ref={badgeRef}
      className={styles.badge}
      style={{
        '--badge-bg': colors.bg,
        '--badge-border': colors.border,
        '--badge-glow': colors.glow,
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Icon circle */}
      <div className={styles.badgeIcon} style={{ background: colors.bg, color: colors.glow }}>
        {skill.icon}
      </div>
      <span className={styles.badgeName}>{skill.name}</span>
      <span className={styles.badgeCat}>{skill.category}</span>
    </div>
  )
}

export default function Skills() {
  const sectionRef = useRef(null)
  const gridRef    = useRef(null)
  const headerRef  = useRef(null)
  const [activeCategory, setActiveCategory] = useState('All')

  const filtered = activeCategory === 'All'
    ? skills
    : skills.filter(s => s.category === activeCategory)

  /* Scroll-triggered stagger animation */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headerRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.7,
          scrollTrigger: { trigger: headerRef.current, start: 'top 85%', once: true },
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  /* Animate badges when filter changes */
  useEffect(() => {
    if (!gridRef.current) return
    const badges = gridRef.current.querySelectorAll(`.${styles.badge}`)
    gsap.fromTo(badges,
      { scale: 0.8, opacity: 0, y: 20 },
      { scale: 1, opacity: 1, y: 0, stagger: 0.04, duration: 0.35, ease: 'back.out(1.4)' }
    )
  }, [activeCategory])

  /* Category stats */
  const catCount = CATEGORIES.slice(1).map(cat => ({
    name: cat,
    count: skills.filter(s => s.category === cat).length,
    color: categoryColors[cat]?.glow,
  }))

  return (
    <section id="skills" className={`${styles.section} page-section`} ref={sectionRef}>
      <div className="container">
        <div ref={headerRef}>
          <span className="section-label">Tech Stack</span>
          <h2 className="section-title">Skills</h2>
          <div className="accent-line" />
          <p className="section-subtitle">
            Technologies I work with to build production-grade applications — from frontend to cloud deployment.
          </p>
        </div>

        {/* Category stats bar */}
        <div className={styles.statsBar}>
          {catCount.map(c => (
            <div key={c.name} className={styles.statItem}>
              <div
                className={styles.statDot}
                style={{ background: c.color }}
              />
              <span className={styles.statName}>{c.name}</span>
              <span className={styles.statCount} style={{ color: c.color }}>{c.count}</span>
            </div>
          ))}
        </div>

        {/* Category filter */}
        <div className={styles.filters}>
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              className={`${styles.filterBtn} ${activeCategory === cat ? styles.filterActive : ''}`}
              onClick={() => setActiveCategory(cat)}
              style={activeCategory === cat && cat !== 'All'
                ? { background: categoryColors[cat]?.glow, borderColor: categoryColors[cat]?.glow }
                : {}
              }
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Skills grid */}
        <div className={styles.grid} ref={gridRef}>
          {filtered.map((skill, i) => (
            <SkillBadge key={skill.name} skill={skill} index={i} />
          ))}
        </div>

        {/* Bottom note */}
        <div className={styles.bottomNote}>
          <span className={styles.noteIcon}>⚡</span>
          <span>Solved <strong>500+</strong> DSA problems on LeetCode — Arrays, Graphs, Trees, Linked Lists</span>
        </div>
      </div>
    </section>
  )
}
