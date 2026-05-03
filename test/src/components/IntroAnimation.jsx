import { useState, useEffect } from "react"
import { motion } from "framer-motion"

function IntroAnimation() {
  const [phase, setPhase] = useState(0)

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 500),
      setTimeout(() => setPhase(2), 1800),
      setTimeout(() => setPhase(3), 2800),
    ]
    return () => timers.forEach(clearTimeout)
  }, [])

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      {/* Cinematic bars */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-[12%] sm:h-[15%] bg-[#0a0a0a] z-20"
        initial={{ y: "-100%" }}
        animate={{ y: phase >= 1 ? 0 : "-100%" }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[12%] sm:h-[15%] bg-[#0a0a0a] z-20"
        initial={{ y: "100%" }}
        animate={{ y: phase >= 1 ? 0 : "100%" }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* Dramatic light sweep */}
      <motion.div
        className="absolute inset-0 z-10"
        initial={{
          background:
            "linear-gradient(90deg, transparent 0%, transparent 100%)",
        }}
        animate={{
          background:
            phase >= 1
              ? [
                  "linear-gradient(90deg, transparent 0%, rgba(201, 162, 39, 0.03) 50%, transparent 100%)",
                  "linear-gradient(90deg, transparent 0%, rgba(201, 162, 39, 0.08) 50%, transparent 100%)",
                  "linear-gradient(90deg, transparent 0%, rgba(201, 162, 39, 0.03) 50%, transparent 100%)",
                ]
              : "linear-gradient(90deg, transparent 0%, transparent 100%)",
        }}
        transition={{ duration: 2, times: [0, 0.5, 1] }}
      />

      {/* Main logo container */}
      <div className="relative z-30 px-4">
        {/* The XYPHER mark */}
        <motion.div
          className="relative"
          initial={{ scale: 1.5, opacity: 0 }}
          animate={{
            scale: phase >= 2 ? 1 : 1.5,
            opacity: phase >= 1 ? 1 : 0,
          }}
          transition={{
            duration: 1.2,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <motion.h1
            className="font-display text-[15vw] sm:text-[12vw] md:text-[10vw] font-bold tracking-widest leading-none flex items-center justify-center gap-2"
          >
            <span
              style={{
                background: "linear-gradient(180deg, #ffffff 0%, #a0a0a0 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              XYPHER
            </span>
            <span
              style={{
                background: "linear-gradient(180deg, #c9a227 0%, #8b6d1b 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
              className="drop-shadow-[0_0_15px_rgba(201,162,39,0.3)]"
            >
              ’26
            </span>
          </motion.h1>
        </motion.div>

        {/* Subtitle reveal */}
        <motion.div
          className="overflow-hidden mt-3 sm:mt-4 md:mt-6"
          initial={{ height: 0 }}
          animate={{ height: phase >= 3 ? "auto" : 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.p
            className="text-center text-xs sm:text-sm md:text-base tracking-[0.2em] sm:tracking-[0.25em] uppercase text-[#fafaf9]/60"
            initial={{ y: 20, opacity: 0 }}
            animate={{
              y: phase >= 3 ? 0 : 20,
              opacity: phase >= 3 ? 1 : 0,
            }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Technical Event Fest
          </motion.p>
        </motion.div>

        {/* Horizontal lines */}
        <motion.div
          className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-[150%] flex items-center justify-center gap-4 sm:gap-8 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: phase >= 2 ? 0.1 : 0 }}
          transition={{ duration: 1 }}
        >
          <motion.div
            className="h-px bg-[#fafaf9] flex-1"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: phase >= 2 ? 1 : 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            style={{ transformOrigin: "right" }}
          />
          <div className="w-[100%]" />
          <motion.div
            className="h-px bg-[#fafaf9] flex-1"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: phase >= 2 ? 1 : 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            style={{ transformOrigin: "left" }}
          />
        </motion.div>
      </div>

      {/* Corner accents */}
      <motion.div
        className="absolute top-[12%] sm:top-[15%] left-4 sm:left-8 md:left-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{
          opacity: phase >= 3 ? 0.5 : 0,
          y: phase >= 3 ? 0 : 20,
        }}
        transition={{ duration: 0.5 }}
      >
        <span className="text-[10px] sm:text-xs tracking-[0.2em] text-[#fafaf9]/40 font-mono">
          APRIL 2026
        </span>
      </motion.div>

      <motion.div
        className="absolute bottom-[12%] sm:bottom-[15%] right-4 sm:right-8 md:right-16"
        initial={{ opacity: 0, y: -20 }}
        animate={{
          opacity: phase >= 3 ? 0.5 : 0,
          y: phase >= 3 ? 0 : -20,
        }}
        transition={{ duration: 0.5 }}
      >
        <span className="text-[10px] sm:text-xs tracking-[0.2em] text-[#fafaf9]/40 font-mono">
          Rajalakshmi Engineering College
        </span>
      </motion.div>
    </div>
  )
}

export default IntroAnimation