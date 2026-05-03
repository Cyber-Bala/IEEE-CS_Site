import { useState, useRef } from "react"
import { motion, useInView } from "framer-motion"

const faqData = [
  {
    question: "What is XYPHER'26?",
    answer: "XYPHER'26 is a 2-day technical fest organized by the IEEE Computer Society Student Chapter of Rajalakshmi Engineering College, featuring competitions, workshops, and hands-on technical events."
  },
  {
    question: "Who can participate in XYPHER'26?",
    answer: "All undergraduate students from any department and any college are eligible to participate."
  },
  {
    question: "Is the event online or offline?",
    answer: "XYPHER'26 will be conducted in offline mode at Rajalakshmi Engineering College."
  },
  {
    question: "What events are included in the fest?",
    answer: "The fest includes: Capture The Flag (CTF), Building UI Blindfolded, Project Expo, Mystery Tech Auction, Technical Treasure Hunt, App Development, Workshops on Power BI & DevOps."
  },
  {
    question: "What is the team size for events?",
    answer: "Team size varies depending on the event, typically ranging from 2 to 4 members per team."
  },
  {
    question: "What are the registration fees?",
    answer: "Registration fees vary by event: IEEE Members: Lower fees (₹125–₹250 per team), Non-IEEE Participants: ₹150–₹300 per team, Some workshops are free for IEEE members."
  },
  {
    question: "Will there be prizes and certificates?",
    answer: "Yes! Winners will receive cash prizes (up to ₹6000), All participants will receive certificates."
  },
  {
    question: "When will the event take place?",
    answer: "XYPHER'26 is scheduled on 28th & 29th April 2026."
  }
]

function FAQItem({ question, answer, isOpen, onClick, index }) {
  const contentRef = useRef(null)
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="border-b border-white/10"
    >
      <button
        onClick={onClick}
        className="w-full py-6 flex items-center justify-between text-left group"
      >
        <span className="text-lg md:text-xl text-white/90 group-hover:text-white transition-colors duration-300 pr-8">
          {question}
        </span>
        <div className="relative w-6 h-6 flex-shrink-0">
          <motion.span
            className="absolute top-1/2 left-0 w-6 h-[2px] bg-[#c9a227]"
            initial={false}
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          />
          <motion.span
            className="absolute top-1/2 left-0 w-6 h-[2px] bg-[#c9a227]"
            initial={false}
            animate={{ rotate: isOpen ? 180 : 90 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
      </button>
      
      <motion.div
        initial={false}
        animate={{
          height: isOpen ? "auto" : 0,
          opacity: isOpen ? 1 : 0
        }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="overflow-hidden"
      >
        <div ref={contentRef} className="pb-6">
          <p className="text-white/60 leading-relaxed max-w-3xl">
            {answer}
          </p>
        </div>
      </motion.div>
    </motion.div>
  )
}

function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null)
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section 
      ref={sectionRef}
      id="faq" 
      className="relative py-32 md:py-40 bg-[#0a0a0a]"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <motion.div
          className="absolute -right-40 top-1/4 w-80 h-80 rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(201, 162, 39, 0.03) 0%, transparent 70%)"
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.8, 0.5]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="max-w-4xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-4 mb-6"
          >
            <span className="text-[#c9a227] text-sm tracking-widest font-light">04</span>
            <div className="w-12 h-px bg-[#c9a227]" />
            <span className="text-white/50 text-sm tracking-widest uppercase">FAQ</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-display tracking-tight text-white"
          >
            Frequently Asked
            <br />
            <span className="text-white/30">Questions</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-white/50 text-lg max-w-xl"
          >
            Everything you need to know about Xypher&apos;26
          </motion.p>
        </div>

        {/* FAQ List */}
        <div className="relative">
          {/* Glass effect card */}
          <div className="absolute inset-0 bg-white/[0.02] rounded-2xl backdrop-blur-sm border border-white/5" />
          
          <div className="relative px-6 md:px-10">
            {faqData.map((faq, index) => (
              <FAQItem
                key={index}
                question={faq.question}
                answer={faq.answer}
                isOpen={openIndex === index}
                onClick={() => handleToggle(index)}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default FAQSection