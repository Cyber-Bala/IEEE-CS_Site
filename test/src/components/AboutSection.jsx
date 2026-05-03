// src/components/AboutSection.jsx
import { useRef, useState, useEffect } from "react"
import { motion, useMotionValue, useSpring, useTransform, useInView } from "framer-motion"
import { useNavigate } from "react-router-dom"
import MagneticButton from "./MagneticButton"

const revealPhrases = [
  "XYPHER’26 is more than just an event—it’s the stage where passion meets possibility.",
  "From mind-bending challenges to high-energy competitions, every moment is designed to push limits and spark brilliance.",
  "Two thrilling days. 8+ dynamic events. One unforgettable experience.",
]

// Removed Mentors & Participants
const stats = [
  { value: "8+", label: "Events" },
  { value: "48H", label: "Fest" },
]

export function AboutSection() {
  const sectionRef = useRef(null)
  const scrollProgress = useMotionValue(0)
  const smoothProgress = useSpring(scrollProgress, { stiffness: 100, damping: 30 })
  const navigate = useNavigate()

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return
      const rect = sectionRef.current.getBoundingClientRect()
      const windowHeight = window.innerHeight
      const sectionHeight = sectionRef.current.offsetHeight
      const progress = Math.max(
        0,
        Math.min(1, (windowHeight - rect.top) / (windowHeight + sectionHeight))
      )
      scrollProgress.set(progress)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()

    return () => window.removeEventListener("scroll", handleScroll)
  }, [scrollProgress])

  const bgY = useTransform(smoothProgress, [0, 1], ["-10%", "10%"])

  const handleGoToEventsPage = (e) => {
    e.preventDefault()
    navigate("/events")
  }

  return (
    <section
      ref={sectionRef}
      id="about"
      style={{ position: "relative" }}
      className="min-h-screen bg-[#0d0d0d] overflow-hidden"
    >
      {/* Background large text */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden"
        style={{ y: bgY }}
      >
        <span className="font-display text-[40vw] sm:text-[35vw] md:text-[30vw] font-bold text-[#fafaf9]/[0.015] select-none whitespace-nowrap">
          XYPHER
        </span>
      </motion.div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-12 pt-20 pb-12 sm:pt-24 sm:pb-16 md:pt-28 md:pb-20 lg:pt-32 lg:pb-24">
        {/* Section indicator */}
        <motion.div
          className="mb-8 sm:mb-10 md:mb-12 lg:mb-16"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex items-center gap-4 sm:gap-6">
            <span className="text-[#c9a227] text-xs sm:text-sm font-mono">01</span>
            <div className="w-8 sm:w-12 h-px bg-[#c9a227]/50" />
            <span className="text-xs sm:text-sm tracking-[0.18em] sm:tracking-[0.24em] uppercase text-[#fafaf9]/50">
              About
            </span>
          </div>
        </motion.div>

        {/* Main reveal text + stats side-by-side */}
        <div className="mb-20 sm:mb-28 md:mb-32 lg:mb-48">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10 lg:gap-16">
            {/* Text block – visually constrained */}
            <div className="flex-1 max-w-2xl">
              {revealPhrases.map((phrase, index) => (
                <RevealText key={index} text={phrase} index={index} />
              ))}
            </div>

            {/* Stats on the right */}
            <div className="w-full lg:w-auto lg:min-w-[220px]">
              {/* Horizontal line */}
              <motion.div
                className="h-px bg-[#fafaf9]/10"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                style={{ transformOrigin: "left" }}
              />
              <div className="grid grid-cols-2 pt-8 sm:pt-12 md:pt-16">
                {stats.map((stat, index) => (
                  <StatItem key={stat.label} stat={stat} index={index} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA section */}
        <motion.div
          className="mt-20 sm:mt-28 md:mt-32 lg:mt-48 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 sm:gap-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="max-w-xl">
            <motion.h3
              className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-[#fafaf9] mb-3 sm:mb-4"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Ready to be part of something extraordinary?
            </motion.h3>
            <motion.p
              className="text-sm sm:text-base md:text-lg text-[#fafaf9]/50 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Join thousands of innovators, creators, and visionaries at the premier
              technical event of 2026.
            </motion.p>
          </div>

          {/* Gold button with stylish animation */}
          <MagneticButton
            as="a"
            href="/events"
            onClick={handleGoToEventsPage}
            className="group inline-flex"
          >
            <motion.button
              type="button"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 18px 45px rgba(201, 162, 39, 0.45)",
              }}
              whileTap={{ scale: 0.96 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="relative overflow-hidden px-8 sm:px-10 py-3 sm:py-3.5 rounded-full
                         bg-[#c9a227] text-[#0d0d0d] text-xs sm:text-sm font-semibold
                         tracking-[0.18em] uppercase flex items-center gap-3 sm:gap-4
                         border border-[#f5e1a3]/40"
            >
              <span className="relative z-10 group-hover:text-[#0a0a0a] transition-colors">
                Explore Events
              </span>

              {/* Shine sweep */}
              <motion.span
                className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent"
                whileHover={{ x: "130%" }}
                transition={{ duration: 0.7, ease: "easeOut" }}
              />

              {/* Right line accent */}
              <motion.span
                className="relative z-10 w-8 sm:w-10 h-px bg-[#0d0d0d]/70"
                whileHover={{ width: 40 }}
                transition={{ duration: 0.25 }}
              />
            </motion.button>
          </MagneticButton>
        </motion.div>
      </div>

      {/* Smooth transition to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-24 sm:h-32 bg-gradient-to-t from-[#0a0a0a] to-transparent" />
    </section>
  )
}

function RevealText({ text, index }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  return (
    <motion.div
      ref={ref}
      className="mb-4 sm:mb-5"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{
        duration: 0.8,
        delay: index * 0.15,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <p className="text-lg sm:text-xl md:text-2xl font-light text-[#fafaf9]/80 leading-relaxed">
        {text}
      </p>
    </motion.div>
  )
}

function StatItem({ stat, index }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })
  const [displayValue, setDisplayValue] = useState("0")

  useEffect(() => {
    if (!isInView) return

    const numericMatch = stat.value.match(/\d+/)
    if (!numericMatch) {
      setDisplayValue(stat.value)
      return
    }

    const target = parseInt(numericMatch[0])
    const suffix = stat.value.replace(/\d+/, "")
    const duration = 1500
    const startTime = Date.now()

    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = Math.floor(target * eased)

      setDisplayValue(current + suffix)

      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        setDisplayValue(stat.value)
      }
    }

    const delay = setTimeout(() => {
      requestAnimationFrame(animate)
    }, index * 150)

    return () => clearTimeout(delay)
  }, [isInView, stat.value, index])

  return (
    <motion.div
      ref={ref}
      className="relative py-6 sm:py-8 md:py-12 pr-4 sm:pr-8 md:pr-12"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      {index > 0 && (
        <div className="absolute left-0 top-6 sm:top-8 bottom-6 sm:bottom-8 w-px bg-[#fafaf9]/10 hidden lg:block" />
      )}

      <div className="lg:pl-8">
        <span className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold block mb-1 sm:mb-2 text-[#c9a227]">
          {displayValue}
        </span>
        <span className="text-xs sm:text-sm tracking-[0.14em] sm:tracking-[0.18em] uppercase text-[#fafaf9]/40">
          {stat.label}
        </span>
      </div>
    </motion.div>
  )
}

export default AboutSection