import { useRef } from "react"
import { motion, useInView } from "framer-motion"

const footerLinks = {
  events: {
    title: "Events",
    links: ["CTF", "Workshops", "Competitions", "Technical Events"]
  },
  support: {
    title: "Support",
    links: ["FAQ"]
  }
}

const socialLinks = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/xypher_fest/",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    )
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/company/ieee-computer-society-rec/posts/?feedView=all",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    )
  }
]

function Footer() {
  const footerRef = useRef(null)
  const isInView = useInView(footerRef, { once: true, margin: "-100px" })

  return (
    <footer 
      ref={footerRef}
      className="relative bg-[#0a0a0a] border-t border-white/5"
    >
      {/* Top gradient line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#c9a227]/30 to-transparent" />

      <div className="max-w-6xl mx-auto px-6 md:px-12 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-8">
          {/* Brand Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="lg:col-span-1"
          >
            <div className="flex items-baseline gap-1 mb-6">
              <span className="text-3xl font-display tracking-tight text-white">XYPHER</span>
              <span className="text-xl font-display text-[#c9a227]">'26</span>
            </div>
            <p className="text-white/40 leading-relaxed max-w-sm mb-8">
              Where innovation meets excellence. Join us for the most anticipated technical fest of 2026.
            </p>
            
            {/* Social Links */}
            <div className="flex items-center gap-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.1 + index * 0.05 }}
                  whileHover={{ scale: 1.1, color: "#c9a227" }}
                  className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:border-[#c9a227]/50 hover:text-[#c9a227] transition-colors duration-300"
                  aria-label={social.name}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Middle Space - COUNTDOWNSTARTS */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-1 flex items-center justify-center"
          >
            <div className="text-center">
              <motion.div
                className="text-lg md:text-xl font-medium text-[#c9a227] tracking-wider uppercase"
                animate={{
                  opacity: [0.4, 1, 0.4],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                COUNT DOWN STARTED
              </motion.div>
              <div className="flex items-center justify-center mt-2">
                <motion.span
                  className="text-[#c9a227] text-sm md:text-base font-mono tracking-widest"
                  animate={{
                    opacity: [0, 1, 0, 1, 0],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  .....
                </motion.span>
              </div>
            </div>
          </motion.div>

          {/* Events & Support Columns - Right Side */}
          <div className="lg:col-span-1 flex flex-row gap-12 justify-end">
            {Object.entries(footerLinks).map(([key, section], sectionIndex) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 + sectionIndex * 0.1 }}
              >
                <h4 className="text-white text-sm tracking-widest uppercase mb-6">
                  {section.title}
                </h4>
                <ul className="space-y-4">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      {key === "events" ? (
                        <span className="text-white/40 text-sm">{link}</span>
                      ) : (
                        <a
                          href={link === "FAQ" ? "#faq" : "#"}
                          className="text-white/40 hover:text-white transition-colors duration-300 text-sm relative group"
                        >
                          {link}
                          <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#c9a227] group-hover:w-full transition-all duration-300" />
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 pt-8 border-t border-white/5"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/30 text-sm">
              &copy; 2026 Xypher. All rights reserved.
            </p>
            
            <div className="flex items-center gap-8">
              <a href="#" className="text-white/30 hover:text-white/60 text-sm transition-colors">
                
              </a>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Large background text */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden pointer-events-none">
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 0.02 } : {}}
          transition={{ duration: 1 }}
          className="text-[20vw] font-display text-white leading-none text-center select-none"
          style={{ transform: "translateY(30%)" }}
        >
          XYPHER
        </motion.div>
      </div>
    </footer>
  )
}

export default Footer