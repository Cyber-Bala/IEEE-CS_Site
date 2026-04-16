// src/pages/HomePage.jsx
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Navbar from "../components/Navbar"
import HeroSection from "../components/HeroSection"
import AboutSection from "../components/AboutSection"
import Marquee from "../components/Marquee"
import FAQSection from "../components/FAQSection"
import Footer from "../components/Footer"
import IntroAnimation from "../components/IntroAnimation"

function HomePage() {
  // check if intro was already shown in this tab
  const hasIntroPlayed =
    typeof window !== "undefined" &&
    window.sessionStorage.getItem("introPlayed") === "true"

  const [introComplete, setIntroComplete] = useState(hasIntroPlayed)
  const [showContent, setShowContent] = useState(hasIntroPlayed)

  useEffect(() => {
    if (hasIntroPlayed) return

    document.body.style.overflow = "hidden"

    const timer = setTimeout(() => {
      setIntroComplete(true)
      document.body.style.overflow = ""
      window.sessionStorage.setItem("introPlayed", "true")
    }, 4000)

    return () => {
      clearTimeout(timer)
      document.body.style.overflow = ""
    }
  }, [hasIntroPlayed])

  useEffect(() => {
    if (introComplete && !showContent) {
      const timer = setTimeout(() => setShowContent(true), 100)
      return () => clearTimeout(timer)
    }
  }, [introComplete, showContent])

  // Handle incoming hash links (scrolling to About, FAQ etc.)
  useEffect(() => {
    if (showContent && window.location.hash) {
      const id = window.location.hash.slice(1)
      const target = document.getElementById(id)
      if (target) {
        // Longer timeout to ensure components are mounted and page-transition is playing
        setTimeout(() => {
          target.scrollIntoView({ behavior: "smooth", block: "start" })
        }, 500)
      }
    }
  }, [showContent])

  return (
    <main className="bg-[#0a0a0a] min-h-screen selection:bg-[#c9a227] selection:text-[#0a0a0a]">
      {/* Intro overlay – only if it has NOT played before */}
      <AnimatePresence>
        {!hasIntroPlayed && !introComplete && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#0a0a0a]"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            style={{ pointerEvents: introComplete ? "none" : "auto" }}
          >
            <IntroAnimation />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main content */}
      {showContent && (
        <motion.div
          initial={{ opacity: hasIntroPlayed ? 1 : 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: hasIntroPlayed ? 0 : 0.8 }}
        >
          <Navbar />
          <HeroSection />
          <Marquee />
          <AboutSection />
          <FAQSection />
          <Footer />
        </motion.div>
      )}
    </main>
  )
}

export default HomePage