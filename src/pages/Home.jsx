/* Home.jsx — Hero section with GSAP text animations */
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { personal } from '../utils/data'
import styles from './Home.module.css'

export default function Home() {
  const sectionRef  = useRef(null)
  const nameRef     = useRef(null)
  const tagRef      = useRef(null)
  const aboutRef    = useRef(null)
  const btnsRef     = useRef(null)
  const badgesRef   = useRef(null)
  const orbRef      = useRef(null)
  const orb2Ref     = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.4 })

      /* Split name into characters for stagger reveal */
      const nameEl = nameRef.current
      const nameText = nameEl.innerText
      nameEl.innerHTML = nameText
        .split('')
        .map(ch => ch === ' '
          ? '<span style="display:inline-block;width:0.35em"> </span>'
          : `<span class="char" style="display:inline-block;overflow:hidden"><span style="display:inline-block">${ch}</span></span>`
        )
        .join('')

      const chars = nameEl.querySelectorAll('.char span')

      /* Animate each character from below */
      tl.fromTo(chars,
        { y: '110%', opacity: 0 },
        { y: '0%', opacity: 1, duration: 0.7, stagger: 0.04, ease: 'power4.out' }
      )
      .fromTo(tagRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' },
        '-=0.3'
      )
      .fromTo(aboutRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' },
        '-=0.3'
      )
      .fromTo(btnsRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out' },
        '-=0.3'
      )
      .fromTo(badgesRef.current.children,
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, stagger: 0.1, duration: 0.4, ease: 'back.out(1.4)' },
        '-=0.2'
      )

      /* Floating orb animations */
      gsap.to(orbRef.current, {
        y: -30,
        x: 15,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })
      gsap.to(orb2Ref.current, {
        y: 20,
        x: -20,
        duration: 5.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 1,
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const scrollTo = (id) => {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="home" className={`${styles.home} page-section`} ref={sectionRef}>
      {/* Background orbs */}
      <div className={styles.orb1} ref={orbRef}  />
      <div className={styles.orb2} ref={orb2Ref} />

      <div className="container">
        <div className={styles.inner}>
          {/* Left — text content */}
          <div className={styles.textSide}>
            <span className={styles.greeting}>Hello, I'm</span>

            {/* Name — animated char by char */}
            <h1 className={styles.name} ref={nameRef}>{personal.name}</h1>

            {/* Tagline */}
            <p className={styles.tagline} ref={tagRef}>
              <span className={styles.accentWord}>Full-Stack</span> Developer
              <span className={styles.dot}>·</span> Cloud Enthusiast
              <span className={styles.dot}>·</span> DSA Solver
            </p>

            {/* About paragraph */}
            <p className={styles.about} ref={aboutRef}>{personal.about}</p>

            {/* CTA buttons */}
            <div className={styles.buttons} ref={btnsRef}>
              <button
                className="btn-primary"
                onClick={() => scrollTo('#projects')}
              >
                View Projects
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </button>
              <button
                className="btn-outline"
                onClick={() => scrollTo('#contact')}
              >
                Get In Touch
              </button>
            </div>

            {/* Quick stats badges */}
            <div className={styles.badges} ref={badgesRef}>
              <div className={styles.badge}>
                <span className={styles.badgeNum}>60+</span>
                <span className={styles.badgeLbl}>Platform Users</span>
              </div>
              {/* <div className={styles.badge}>
                <span className={styles.badgeNum}>500+</span>
                <span className={styles.badgeLbl}>Visits & growing</span>
              </div> */}
              <div className={styles.badge}>
                <span className={styles.badgeNum}>600+</span>
                <span className={styles.badgeLbl}>DSA Problems</span>
              </div>
              <div className={styles.badge}>
                <span className={styles.badgeNum}>8.09</span>
                <span className={styles.badgeLbl}>Current CGPA</span>
              </div>
              <div className={styles.badge}>
                <span className={styles.badgeNum}>2+</span>
                <span className={styles.badgeLbl}>Live Projects</span>
              </div>
            </div>
          </div>

          {/* Right — decorative visual */}
          <div className={styles.visualSide}>
            <div className={styles.avatarRing}>
              <div className={styles.avatarInner}>
                <span className={styles.avatarInitials}>AP</span>
              </div>
              {/* Orbit rings */}
              <div className={`${styles.ring} ${styles.ring1}`} />
              <div className={`${styles.ring} ${styles.ring2}`} />
              {/* Floating tech icons */}
              <div className={`${styles.floatIcon} ${styles.fi1}`}>⚡</div>
              <div className={`${styles.floatIcon} ${styles.fi2}`}>🔗</div>
              <div className={`${styles.floatIcon} ${styles.fi3}`}>☁️</div>
              <div className={`${styles.floatIcon} ${styles.fi4}`}>🚀</div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className={styles.scrollIndicator}>
          <div className={styles.scrollLine} />
          <span>Scroll to explore</span>
        </div>
      </div>
    </section>
  )
}
