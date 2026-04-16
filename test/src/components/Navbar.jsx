// src/components/Navbar.jsx
import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import collegeLogo from "../logo/college.png"
import ieeeCsLogo from "../logo/ieee_cs.png"

function Navbar({ forceScrolled, onBack }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [internalScrolled, setInternalScrolled] = useState(false)
  const [logoVisible, setLogoVisible] = useState(false)
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)
  const isScrolled = forceScrolled ?? internalScrolled;
  
  const location = useLocation()
  const navigate = useNavigate()
  const { isAuthenticated, user, logout } = useAuth()
  const isSpecialPage = ["/events", "/login", "/signup", "/register"].some(
    (path) => location.pathname.startsWith(path)
  )

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    const handleScroll = () => {
      setInternalScrolled(window.scrollY > 20)
      // Home page: wait for hero logo to start disappearing (approx 300px)
      // Other pages: show immediately or after 20px
      setLogoVisible(location.pathname !== "/" || window.scrollY > 300)
    }
    
    window.addEventListener("resize", handleResize)
    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    
    return () => {
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [location.pathname])

  const menuItems = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Events", href: "/events" }, // route
    { label: "FAQ", href: "#faq" },
  ]

  const handleNavClick = (e, href) => {
    e.preventDefault()

    // Events → route
    if (href === "/events") {
      navigate("/events")
      setIsMenuOpen(false)
      return
    }

    // Hash links
    if (href.startsWith("#")) {
      if (location.pathname === "/") {
        const id = href.slice(1)
        const target = document.getElementById(id)
        if (target) {
          target.scrollIntoView({ behavior: "smooth", block: "start" })
        }
      } else {
        // Navigate to home; HomePage.jsx will handle the scroll via useEffect
        navigate("/")
        // Small delay to ensure hash is processed if needed,
        // though HomePage.jsx check is sturdier.
        window.location.hash = href
      }
      setIsMenuOpen(false)
      return
    }

    setIsMenuOpen(false)
  }

  const scrollToHero = () => {
    const hero = document.getElementById("hero")
    if (hero) {
      hero.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  const handleBackInternal = () => {
    if (onBack) {
      onBack();
      return;
    }
    navigate("/", { replace: false })
    setTimeout(scrollToHero, 50)
  }

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-40 px-6 md:px-12 transition-all duration-300 ${
          isScrolled
            ? "py-6 bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-[#fafaf9]/10"
            : "py-10 bg-transparent"
        }`}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsMenuOpen(true)}
              className="group flex items-center gap-3 text-[#fafaf9] hover:text-[#c9a227] transition-colors"
            >
              <div className="flex flex-col gap-[6px]">
                <span className="block w-6 h-[2px] bg-current group-hover:w-5 transition-all" />
                <span className="block w-6 h-[2px] bg-current" />
                <span className="block w-4 h-[2px] bg-current group-hover:w-6 transition-all" />
              </div>
              <span className="text-sm tracking-[0.2em] uppercase hidden md:block">
                Menu
              </span>
            </button>

            {isSpecialPage && (
              <button
                onClick={handleBackInternal}
                className="flex items-center gap-2 text-[#fafaf9]/60 hover:text-[#c9a227] transition-colors pl-4 border-l border-[#fafaf9]/20"
              >
                <span className="text-xl leading-none">&larr;</span>
                <span className="text-sm tracking-[0.2em] uppercase hidden md:block">
                  Back
                </span>
              </button>
            )}
          </div>

          {/* Center: XYPHER'26 Brand Logo - Appears only on depth scroll on Home, or always on sub-pages */}
          {!["/login", "/signup"].includes(location.pathname) && (
            <div className="absolute left-1/2 -translate-x-1/2">
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{
                  opacity: (forceScrolled || logoVisible) ? 1 : 0,
                  y: (forceScrolled || logoVisible) ? 0 : -10,
                }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                style={{ pointerEvents: (forceScrolled || logoVisible) ? "auto" : "none" }}
              >
                <Link
                  to="/"
                  onClick={() => setTimeout(scrollToHero, 50)}
                  className="flex items-center gap-1 group"
                >
                  <span className="font-display text-3xl md:text-5xl font-bold text-[#fafaf9] tracking-widest transition-all group-hover:text-primary group-hover:drop-shadow-[0_0_10px_rgba(201,162,39,0.3)]">
                    XYPHER
                  </span>
                  <span className="font-display text-3xl md:text-5xl font-bold text-primary tracking-widest drop-shadow-[0_0_8px_rgba(201,162,39,0.2)]">
                    ’26
                  </span>
                </Link>
              </motion.div>
            </div>
          )}

          {/* Right side: Partner Logos - Dynamic swap on mobile, always visible on desktop */}
          <div className="flex items-center gap-4 md:gap-8">
            {!["/login", "/signup"].includes(location.pathname) && (
              <motion.div 
                className="flex items-center gap-4 md:gap-6"
                animate={{
                  opacity: (isMobile && (forceScrolled || logoVisible)) ? 0 : 1,
                  pointerEvents: (isMobile && (forceScrolled || logoVisible)) ? "none" : "auto"
                }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src={collegeLogo}
                  alt="College logo"
                  className="h-8 md:h-12 w-auto object-contain transition-opacity"
                />
                <img
                  src={ieeeCsLogo}
                  alt="IEEE CS logo"
                  className="h-8 md:h-10 w-auto object-contain transition-opacity"
                />
              </motion.div>
            )}
            <div className="hidden md:flex items-center gap-4">
              {/* Optional: Add user profile or additional actions here */}
            </div>
          </div>
        </div>
      </motion.nav>

      {/* 3/4 screen side menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Dimmed backdrop but still clickable to close */}
            <motion.div
              className="fixed inset-0 z-40 bg-black/40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setIsMenuOpen(false)}
            />

            {/* Left panel: 3/4 width on desktop, full on small screens */}
            <motion.div
              key="side-menu"
              className="fixed inset-y-0 left-0 z-50 w-[80%] sm:w-[70%] md:w-[60%] lg:w-[55%] bg-[#0a0a0a]"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Grid background */}
              <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage:
                      "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
                    backgroundSize: "80px 80px",
                  }}
                />
              </div>

              {/* Close button */}
              <button
                onClick={() => setIsMenuOpen(false)}
                className="absolute top-6 left-6 flex items-center gap-3 text-[#fafaf9] hover:text-[#c9a227] transition-colors z-10"
              >
                <div className="relative w-6 h-6">
                  <span className="absolute top-1/2 left-0 w-6 h-[2px] bg-current rotate-45" />
                  <span className="absolute top-1/2 left-0 w-6 h-[2px] bg-current -rotate-45" />
                </div>
                <span className="text-sm tracking-[0.2em] uppercase hidden md:block">
                  Close
                </span>
              </button>

              {/* Menu content */}
              <div className="h-full flex flex-col justify-center px-12 md:px-16 lg:px-20 relative">
                <div className="space-y-2">
                  {menuItems.map((item, i) => (
                    <div key={item.label} className="overflow-hidden">
                      <motion.a
                        href={item.href}
                        onClick={(e) => handleNavClick(e, item.href)}
                        className="group flex items-center gap-6 py-3"
                        initial={{ y: 80, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 80, opacity: 0 }}
                        transition={{
                          duration: 0.6,
                          delay: i * 0.08,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                      >
                        <span className="text-[#c9a227] text-sm tracking-widest font-medium opacity-50 group-hover:opacity-100 transition-opacity">
                          0{i + 1}
                        </span>
                        <span className="font-display font-medium text-[12vw] sm:text-[8vw] md:text-[5vw] text-[#fafaf9] leading-none tracking-tight group-hover:text-[#c9a227] transition-colors duration-300">
                          {item.label}
                        </span>
                        <motion.div
                          className="h-[2px] bg-[#c9a227] origin-left hidden md:block"
                          initial={{ width: 0 }}
                          whileHover={{ width: 80 }}
                          transition={{ duration: 0.4 }}
                        />
                      </motion.a>
                    </div>
                  ))}
                </div>


              </div>

              {/* Mobile Partner Logos inside Menu */}
              <div className="md:hidden absolute bottom-24 left-12 flex items-center gap-6">
                <img
                  src={collegeLogo}
                  alt="College logo"
                  className="h-8 w-auto object-contain opacity-60"
                />
                <img
                  src={ieeeCsLogo}
                  alt="IEEE CS logo"
                  className="h-8 w-auto object-contain opacity-60"
                />
              </div>

              {/* Large decorative XYPHER */}
              <div className="absolute bottom-6 right-4 md:bottom-8 md:right-8 pointer-events-none select-none opacity-[0.03]">
                <span className="font-display text-[18vw] sm:text-[14vw] md:text-[10vw] lg:text-[8vw] text-[#fafaf9] tracking-[0.2em] leading-none">
                  XYPHER
                </span>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar