/* Contact.jsx — Split layout: form + 3D animated shape */
import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { personal } from '../utils/data'
import styles from './Contact.module.css'
// testing 
import emailjs from '@emailjs/browser'

gsap.registerPlugin(ScrollTrigger)

/* ---- 3D Floating Shape Component ---- */
function FloatingShape() {
  const shapeRef  = useRef(null)
  const ringRef   = useRef(null)
  const orb1Ref  = useRef(null)
  const orb2Ref  = useRef(null)
  const orb3Ref  = useRef(null)

  useEffect(() => {
    /* Gentle float animation for main shape */
    gsap.to(shapeRef.current, {
      y: -20,
      rotation: 5,
      duration: 3.5,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    })
    /* Ring spin */
    gsap.to(ringRef.current, {
      rotation: 360,
      duration: 12,
      repeat: -1,
      ease: 'none',
    })
    /* Orbiting particles */
    gsap.to(orb1Ref.current, { y: -25, x: 15, duration: 2.2, repeat: -1, yoyo: true, ease: 'sine.inOut' })
    gsap.to(orb2Ref.current, { y: 20, x: -12, duration: 3,   repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 0.5 })
    gsap.to(orb3Ref.current, { y: -15, x: -20, duration: 2.7, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 1 })
  }, [])

  return (
    <div className={styles.shapeScene}>
      {/* Outer orbit ring */}
      <div className={styles.orbitRing} ref={ringRef}>
        <div className={styles.orbitDot} />
      </div>

      {/* Main 3D cube-like shape */}
      <div className={styles.cube} ref={shapeRef}>
        <div className={styles.cubeInner}>
          <span className={styles.cubeIcon}>✉️</span>
          <span className={styles.cubeText}>Let's Talk</span>
        </div>
      </div>

      {/* Floating particles */}
      <div className={`${styles.particle} ${styles.p1}`} ref={orb1Ref}>⚡</div>
      <div className={`${styles.particle} ${styles.p2}`} ref={orb2Ref}>💡</div>
      <div className={`${styles.particle} ${styles.p3}`} ref={orb3Ref}>🚀</div>

      {/* Info cards floating */}
      <div className={styles.infoCard1}>
        <span>📧</span> adityapawar0703@gmail.com
      </div>
      <div className={styles.infoCard2}>
        <span>📍</span> Bhopal, India
      </div>
    </div>
  )
}

/* ---- Main Contact Component ---- */
export default function Contact() {
  const sectionRef = useRef(null)
  const leftRef    = useRef(null)
  const rightRef   = useRef(null)

  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('idle') // idle | sending | sent | error

  /* Scroll entrance animations */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(leftRef.current,
        { x: -50, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', once: true } }
      )
      gsap.fromTo(rightRef.current,
        { x: 50, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.15,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', once: true } }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  // /* Form submit — opens mailto (no backend needed) */
  // const handleSubmit = (e) => {
  //   e.preventDefault()
  //   setStatus('sending')

  //   const subject = encodeURIComponent(`Portfolio Contact from ${form.name}`)
  //   const body    = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`)
  //   const mailto  = `mailto:${personal.email}?subject=${subject}&body=${body}`

  //   setTimeout(() => {
  //     window.location.href = mailto
  //     setStatus('sent')
  //     setForm({ name: '', email: '', message: '' })
  //     setTimeout(() => setStatus('idle'), 4000)
  //   }, 600)
  // }

  // this si trial for emailjs
  

const handleSubmit = (e) => {
  e.preventDefault()
  setStatus('sending')

  emailjs.send(
    import.meta.env.VITE_EMAILJS_SERVICE_ID,
    import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
    {
      name: form.name,
      email: form.email,
      message: form.message,
    },
    import.meta.env.VITE_EMAILJS_PUBLIC_KEY
  )
  .then(() => {
    setStatus('sent')
    setForm({ name: '', email: '', message: '' })

    setTimeout(() => setStatus('idle'), 4000)
  })
  .catch((error) => {
    console.error(error)
    setStatus('error')
  })
}

  const isValid = form.name && form.email && form.message

  return (
    <section id="contact" className={`${styles.section} page-section`} ref={sectionRef}>
      <div className="container">
        <span className="section-label">Get In Touch</span>
        <h2 className="section-title">Contact</h2>
        <div className="accent-line" />

        <div className={styles.grid}>
          {/* LEFT — Contact form */}
          <div className={styles.formSide} ref={leftRef}>
            <p className={styles.intro}>
              Open to <strong>internships</strong>, <strong>full-time roles</strong>, and interesting collaborations.
              Drop me a message — I'll get back to you quickly!
            </p>

            <form className={styles.form} onSubmit={handleSubmit}>
              {/* Name */}
              <div className={styles.field}>
                <label className={styles.label} htmlFor="name">Your Name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  className={styles.input}
                  placeholder="Aditya Pawar"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Email */}
              <div className={styles.field}>
                <label className={styles.label} htmlFor="email">Email Address</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  className={styles.input}
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Message */}
              <div className={styles.field}>
                <label className={styles.label} htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  className={styles.textarea}
                  placeholder="Hi Aditya, I'd love to talk about..."
                  value={form.message}
                  onChange={handleChange}
                  rows={5}
                  required
                />
              </div>

              <button
                type="submit"
                className={styles.submitBtn}
                disabled={!isValid || status === 'sending'}
              >
                {status === 'sending' ? (
                  <span className={styles.sending}>Sending... ⏳</span>
                ) : status === 'sent' ? (
                  <span>Message sent! ✓</span>
                ) : (
                  <>
                    Send Message
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <line x1="22" y1="2" x2="11" y2="13"/>
                      <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                    </svg>
                  </>
                )}
              </button>
            </form>

            {/* Social links */}
            <div className={styles.socials}>
              <a href={personal.github}   target="_blank" rel="noreferrer" className={styles.socialLink}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                </svg>
                GitHub
              </a>
              <a href={personal.linkedin} target="_blank" rel="noreferrer" className={styles.socialLink}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                LinkedIn
              </a>
              <a href={personal.leetcode} target="_blank" rel="noreferrer" className={styles.socialLink}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z"/>
                </svg>
                LeetCode
              </a>
              <a href={`mailto:${personal.email}`} className={styles.socialLink}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
                Email
              </a>
            </div>
          </div>

          {/* RIGHT — 3D animated element */}
          <div className={styles.visualSide} ref={rightRef}>
            <FloatingShape />
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className={styles.footer}>
        <p>Designed & built by <strong>Aditya Pawar</strong> · 2026</p>
        <p>Full-Stack Developer · Bhopal, India</p>
      </div>
    </section>
  )
}
