/* App.jsx — Root component: assembles all pages in a single-page layout */
import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import { useTheme } from './hooks/useTheme'
import Navbar     from './components/Navbar'
import Home       from './pages/Home'
import Projects   from './pages/Projects'
import Education  from './pages/Education'
import Skills     from './pages/Skills'
import Showcase   from './pages/Showcase'
import Contact    from './pages/Contact'

/* Register GSAP plugins globally */
gsap.registerPlugin(ScrollTrigger)

export default function App() {
  const { theme, toggleTheme } = useTheme()

  /* Configure ScrollTrigger defaults */
  useEffect(() => {
    ScrollTrigger.config({ limitCallbacks: true })
    return () => ScrollTrigger.getAll().forEach(t => t.kill())
  }, [])

  return (
    <>
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <main>
        <Home />
        <Projects />
        <Education />
        <Skills />
        <Showcase />
        <Contact />
      </main>
    </>
  )
}

