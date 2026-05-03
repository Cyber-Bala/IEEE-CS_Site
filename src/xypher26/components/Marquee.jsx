import { motion } from "framer-motion"

const items = [
  "FlagHunt",
  "UI Whisper",
  "Xhibit",
  "Data Prism",
  "Bid & Build",
  "LogiX",
  "App-o-calypse",
  "Code2Cloud",
]

function Marquee() {
  return (
    <div className="relative overflow-hidden py-8 bg-[#111] border-y border-[#222]">
      <div className="flex">
        <motion.div
          className="flex shrink-0"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            duration: 30,
            ease: "linear",
            repeat: Infinity,
          }}
        >
          {[...items, ...items].map((item, index) => (
            <div key={index} className="flex items-center shrink-0 px-8">
              <span className="font-display text-lg md:text-2xl font-bold text-white/10 tracking-wider whitespace-nowrap">
                {item}
              </span>
              <span className="ml-8 w-2 h-2 bg-[#c9a227]/30 rotate-45" />
            </div>
          ))}
        </motion.div>
        <motion.div
          className="flex shrink-0"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            duration: 30,
            ease: "linear",
            repeat: Infinity,
          }}
        >
          {[...items, ...items].map((item, index) => (
            <div key={index} className="flex items-center shrink-0 px-8">
              <span className="font-display text-lg md:text-2xl font-bold text-white/10 tracking-wider whitespace-nowrap">
                {item}
              </span>
              <span className="ml-8 w-2 h-2 bg-[#c9a227]/30 rotate-45" />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}

export default Marquee
