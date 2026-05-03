import { useRef, useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useNavigate } from "react-router-dom";
import MagneticButton from "./MagneticButton";

function HeroSection() {
  const sectionRef = useRef(null);
  const navigate = useNavigate();
  const scrollProgress = useMotionValue(0);
  const smoothProgress = useSpring(scrollProgress, {
    stiffness: 100,
    damping: 30,
  });

  // Countdown state
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const targetDate = new Date("2026-04-28T09:00:00").getTime();

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const sectionHeight = sectionRef.current.offsetHeight;
      const progress = Math.max(0, Math.min(1, -rect.top / sectionHeight));
      scrollProgress.set(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollProgress]);

  // Countdown timer effect
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor(
            (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
          ),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const videoScale = useTransform(smoothProgress, [0, 1], [1, 1.2]);
  const overlayOpacity = useTransform(smoothProgress, [0, 0.5], [0.4, 0.8]);
  const contentY = useTransform(smoothProgress, [0, 1], [0, 150]);
  const contentOpacity = useTransform(smoothProgress, [0, 0.5], [1, 0]);

  return (
    <section
      ref={sectionRef}
      id="hero"
      style={{ position: "relative" }}
      className="h-screen flex items-center justify-center overflow-hidden bg-[#0a0a0a]"
    >
      {/* Video Background with parallax */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ scale: videoScale }}
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="w-full h-full object-cover"
        >
          <source
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Background-KFUiFypFtVficsU5IZsh8rXRW7rjDr.mp4"
            type="video/mp4"
          />
        </video>

        {/* Dynamic overlay */}
        <motion.div
          className="absolute inset-0 bg-[#0a0a0a]"
          style={{ opacity: overlayOpacity }}
        />

        {/* Bottom gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
      </motion.div>

      {/* Content */}
      <motion.div
        className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 text-center pt-24 md:pt-32"
        style={{ y: contentY, opacity: contentOpacity }}
      >
        {/* Main headline: XYPHER'26 */}
        <motion.h1
          className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-7xl xl:text-8xl font-bold text-[#fafaf9] leading-[0.9] tracking-[-0.02em] flex items-baseline justify-center gap-2"
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          transition={{
            duration: 1,
            ease: [0.22, 1, 0.36, 1],
            delay: 0.2,
          }}
        >
          <span className="tracking-[0.02em]">XYPHER</span>
          <span className="text-[#c9a227] text-4xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl">
            ’26
          </span>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          className="text-base sm:text-lg md:text-xl text-[#fafaf9]/60 max-w-2xl mx-auto mb-4 sm:mb-6 leading-relaxed px-4 tracking-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          Experience two days of groundbreaking technology, visionary speakers,
          and limitless possibilities.
        </motion.p>

        {/* Clean Horizontal Countdown Bar */}
        <motion.div
          className="w-full max-w-4xl mx-auto mb-5 sm:mb-8 px-4"
          initial={{ opacity: 0, scale: 0.9, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          {/* Timer Header */}
          <motion.div
            className="mb-6 sm:mb-8 flex items-center justify-center gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
          >
            <div className="w-2 h-2 bg-[#c9a227]/80 rounded-full animate-pulse" />
            <span className="font-bold text-base sm:text-lg md:text-xl tracking-[0.12em] uppercase text-[#c9a227]/80 font-mono">
              Event Countdown
            </span>
            <div className="w-2 h-2 bg-[#c9a227]/80 rounded-full animate-pulse" />
          </motion.div>

          {/* Timer Cards */}
          <div className="flex items-end justify-center gap-4 sm:gap-6 lg:gap-8">
            {[
              {
                value: timeLeft.days.toString().padStart(2, "0"),
                label: "DAYS",
              },
              {
                value: timeLeft.hours.toString().padStart(2, "0"),
                label: "HRS",
              },
              {
                value: timeLeft.minutes.toString().padStart(2, "0"),
                label: "MIN",
              },
              {
                value: timeLeft.seconds.toString().padStart(2, "0"),
                label: "SEC",
              },
            ].map((item, idx) => (
              <motion.div
                key={item.label}
                className="group flex flex-col items-center min-w-[80px] sm:min-w-[100px]"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  delay: 1.2 + idx * 0.15,
                }}
              >
                <div className="relative bg-black/60 backdrop-blur-xl border border-[#c9a227]/40 rounded-2xl p-5 sm:p-6 shadow-lg group-hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <motion.div
                    className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#fafaf9] mb-2 tracking-tight leading-tight"
                    key={item.value}
                    initial={{ scale: 0.7, opacity: 0, rotateX: 90 }}
                    animate={{ scale: 1, opacity: 1, rotateX: 0 }}
                    transition={{
                      duration: 0.6,
                      type: "spring",
                      bounce: 0.25,
                    }}
                  >
                    {item.value}
                  </motion.div>

                  <motion.span
                    className="text-[10px] sm:text-xs lg:text-sm tracking-[0.2em] uppercase font-mono text-[#fafaf9]/70 group-hover:text-[#c9a227] transition-colors duration-300 leading-tight"
                    whileHover={{ scale: 1.03 }}
                  >
                    {item.label}
                  </motion.span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Event Info */}
        <motion.div
          className="flex items-center justify-center gap-4 sm:gap-6 text-xs sm:text-sm text-[#fafaf9]/50 tracking-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.6 }}
        >
          <span>April 28-29</span>
          <span className="w-px h-3 sm:h-4 bg-[#fafaf9]/20" />
          <span>Rajalakshmi Engineering College</span>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          className="mt-5 sm:mt-6 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.8 }}
        >
          <MagneticButton
            as="button"
            onClick={() => navigate("/events")}
            className="inline-flex items-center justify-center px-8 py-3 bg-[#0a0a0a] border border-[#c9a227]/50 text-[#c9a227] font-display font-bold uppercase tracking-[0.2em] text-sm rounded-full hover:bg-[#c9a227]/10 transition-colors shadow-[0_0_15px_rgba(201,162,39,0.1)] hover:shadow-[0_0_30px_rgba(201,162,39,0.2)]"
          >
            Explore Events
          </MagneticButton>
        </motion.div>
      </motion.div>



      {/* Corner decorations */}
      <div className="absolute top-20 sm:top-24 left-4 sm:left-8 md:left-12 z-10 hidden sm:block">
        <motion.div
          className="text-[9px] sm:text-[10px] tracking-[0.2em] uppercase text-[#fafaf9]/30 font-mono"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          Est. 2026
        </motion.div>
      </div>

      <div className="absolute top-20 sm:top-24 right-4 sm:right-8 md:right-12 z-10 hidden sm:block">
        <motion.div
          className="text-[9px] sm:text-[10px] tracking-[0.2em] uppercase text-[#fafaf9]/30 font-mono"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          Technical Fest
        </motion.div>
      </div>
    </section>
  );
}

export default HeroSection;
