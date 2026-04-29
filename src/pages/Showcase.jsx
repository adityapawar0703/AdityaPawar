/* Showcase.jsx — TV-like interactive showcase with iframe switching */
import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { showcase } from '../utils/data'
import styles from './Showcase.module.css'

gsap.registerPlugin(ScrollTrigger)

export default function Showcase() {
  const sectionRef  = useRef(null)
  const tvRef       = useRef(null)
  const screenRef   = useRef(null)
  const headerRef   = useRef(null)
  const [current, setCurrent]   = useState(0)
  const [loading, setLoading]   = useState(true)
  const [direction, setDirection] = useState(1) // 1 = right, -1 = left

  const currentItem = showcase[current]
  const previewImage = currentItem.image

  /* Entrance animation */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headerRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, scrollTrigger: { trigger: headerRef.current, start: 'top 85%', once: true } }
      )
      gsap.fromTo(tvRef.current,
        { y: 60, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: tvRef.current, start: 'top 80%', once: true } }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  /* Switch content with slide animation */
  const switchTo = (index, dir = 1) => {
    if (index === current) return
    setDirection(dir)
    const screen = screenRef.current
    if (!screen) { setCurrent(index); return; }

    gsap.to(screen, {
      x: dir * -60,
      opacity: 0,
      duration: 0.3,
      ease: 'power2.in',
      onComplete: () => {
        setCurrent(index)
        setLoading(true)
        gsap.fromTo(screen,
          { x: dir * 60, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.4, ease: 'power3.out' }
        )
      },
    })
  }

  const prev = () => switchTo((current - 1 + showcase.length) % showcase.length, -1)
  const next = () => switchTo((current + 1) % showcase.length, 1)

  /* Keyboard navigation */
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowLeft')  prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [current])

  return (
    <section id="showcase" className={`${styles.section} page-section`} ref={sectionRef}>
      <div className="container">
        <div ref={headerRef}>
          <span className="section-label">Interactive</span>
          <h2 className="section-title">Showcase</h2>
          <div className="accent-line" />
          <p className="section-subtitle">
            Explore my profiles and live projects below — use the arrows or keyboard ← → to navigate.
          </p>
        </div>

        {/* TV Container */}
        <div className={styles.tvWrapper} ref={tvRef}>

          {/* TV frame */}
          <div className={styles.tv}>
            {/* TV top bar */}
            <div className={styles.tvBar}>
              <div className={styles.tvDots}>
                <span /><span /><span />
              </div>
              <div className={styles.tvUrl}>
                <span className={styles.tvUrlIcon}>🌐</span>
                <span className={styles.tvUrlText}>{currentItem.url}</span>
              </div>
              <div className={styles.tvBadge} style={{ color: currentItem.color }}>
                {currentItem.icon} {currentItem.label}
              </div>
            </div>

            {/* Screen area */}
            <div className={styles.screenWrap}>
              {/* Loading overlay */}
              {loading && (
                <div className={styles.loadingOverlay}>
                  <div className={styles.loadingSpinner} style={{ borderTopColor: currentItem.color }} />
                  <span style={{ color: currentItem.color }}>Loading {currentItem.label}...</span>
                </div>
              )}

              <div ref={screenRef} className={styles.screen}>
                {currentItem.iframe ? (
                  <iframe
                    key={currentItem.id}
                    src={currentItem.url}
                    title={currentItem.label}
                    className={styles.iframe}
                    onLoad={() => setLoading(false)}
                    onError={() => setLoading(false)}
                    sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                  />
                ) : (
                  <img
                    key={currentItem.id}
                    src={previewImage}
                    alt={`${currentItem.label} preview`}
                    className={styles.previewImage}
                    loading="lazy"
                    onLoad={() => setLoading(false)}
                    onError={() => setLoading(false)}
                  />
                )}
              </div>
            </div>

            {/* TV bottom info bar */}
            <div className={styles.tvFooter}>
              <div className={styles.footerInfo}>
                <span className={styles.footerIcon} style={{ color: currentItem.color }}>
                  {currentItem.icon}
                </span>
                <div>
                  <div className={styles.footerTitle}>{currentItem.label}</div>
                  <div className={styles.footerDesc}>{currentItem.description}</div>
                </div>
              </div>
              <a
                href={currentItem.url}
                target="_blank"
                rel="noreferrer"
                className={styles.openBtn}
                style={{ background: currentItem.color }}
              >
                Open ↗
              </a>
            </div>
          </div>

          {/* Left arrow */}
          <button className={`${styles.arrow} ${styles.arrowLeft}`} onClick={prev} aria-label="Previous">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M15 18l-6-6 6-6"/>
            </svg>
          </button>

          {/* Right arrow */}
          <button className={`${styles.arrow} ${styles.arrowRight}`} onClick={next} aria-label="Next">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M9 18l6-6-6-6"/>
            </svg>
          </button>
        </div>

        {/* Dot navigation */}
        <div className={styles.dots}>
          {showcase.map((item, i) => (
            <button
              key={item.id}
              className={`${styles.dot} ${i === current ? styles.dotActive : ''}`}
              onClick={() => switchTo(i, i > current ? 1 : -1)}
              style={i === current ? { background: item.color } : {}}
              aria-label={`Switch to ${item.label}`}
            />
          ))}
        </div>

        {/* Thumbnail strip */}
        <div className={styles.thumbStrip}>
          {showcase.map((item, i) => (
            <button
              key={item.id}
              className={`${styles.thumb} ${i === current ? styles.thumbActive : ''}`}
              onClick={() => switchTo(i, i > current ? 1 : -1)}
              style={i === current ? { borderColor: item.color } : {}}
            >
              <span className={styles.thumbIcon}>{item.icon}</span>
              <span className={styles.thumbLabel}>{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
