import { useRef } from "react"
import { motion, useInView } from "framer-motion"

import logoSquare from "../assets/IEEECS Logo - Square.png"

function CommunityPartners() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" })

  return (
    <section
      ref={sectionRef}
      id="partners"
      className="relative py-20 md:py-24 bg-[#0a0a0a] overflow-hidden"
    >
      {/* Top line */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* Ambient glow */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(201,162,39,0.04) 0%, transparent 60%)",
        }}
        animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="max-w-4xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="mb-10 md:mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-4 mb-6"
          >
            <span className="text-[#c9a227] text-sm tracking-widest font-light">03</span>
            <div className="w-12 h-px bg-[#c9a227]" />
            <span className="text-white/50 text-sm tracking-widest uppercase">Partners</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-display tracking-tight text-white"
          >
            Community
            <br />
            <span className="text-white/30">Partners</span>
          </motion.h2>
        </div>

        {/* Partner card — horizontal layout */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative group rounded-2xl border border-white/[0.06] hover:border-[#c9a227]/20 transition-all duration-700 overflow-hidden"
          style={{
            background: "linear-gradient(135deg, rgba(255,255,255,0.02) 0%, rgba(201,162,39,0.015) 100%)",
          }}
        >
          {/* Top accent */}
          <motion.div
            className="absolute top-0 left-0 right-0 h-px"
            style={{
              background: "linear-gradient(90deg, transparent, rgba(201,162,39,0.3), transparent)",
            }}
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 1.2, delay: 0.4 }}
          />

          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10 p-6 md:p-8">
            {/* Circle logo */}
            <div className="relative flex-shrink-0">
              {/* Gold ring */}
              <motion.div
                className="absolute -inset-2 rounded-full"
                style={{
                  background: "conic-gradient(from 0deg, rgba(201,162,39,0.25), transparent 40%, rgba(201,162,39,0.15), transparent 80%, rgba(201,162,39,0.25))",
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
              />

              {/* Glow */}
              <motion.div
                className="absolute -inset-4 rounded-full blur-xl bg-[#c9a227]/8"
                animate={{ opacity: [0.3, 0.5, 0.3] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />

              {/* Logo */}
              <div className="relative w-28 h-28 md:w-32 md:h-32 rounded-full overflow-hidden border-2 border-white/10 group-hover:border-[#c9a227]/30 transition-colors duration-500 bg-white/95">
                <img
                  src={logoSquare}
                  alt="IEEE Computer Society - SSN Student Branch Chapter"
                  className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>

            {/* Info */}
            <div className="text-center md:text-left flex-1">
              <h3 className="font-display text-2xl md:text-3xl tracking-wide text-white/90 group-hover:text-white transition-colors duration-300">
                IEEE Computer Society
              </h3>
              <p className="text-[#c9a227]/60 text-sm tracking-[0.15em] uppercase mt-1">
                SSN Student Branch Chapter
              </p>
              <p className="text-white/40 text-sm md:text-base leading-relaxed mt-3 max-w-md">
                Driving innovation through technology education, competitions, and a thriving community of student developers.
              </p>
            </div>


          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default CommunityPartners
