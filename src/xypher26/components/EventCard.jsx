import { motion } from "framer-motion";

















const EventCard = ({ event, onSelect }) => {
  const { number, label, title, description, image } = event;

  return (
    <motion.div
      className="w-80 h-[440px] cursor-pointer group"
      onClick={() => onSelect(event)}
      whileHover={{ scale: 1.04, y: -8 }}
      transition={{ duration: 0.3 }}>
      
      <div className="relative w-full h-full rounded-lg border border-primary/40 bg-[#0d0d0d] overflow-hidden border-glow group-hover:card-glow-hover transition-shadow duration-500">
        {/* Corner ornaments */}
        <div className="absolute top-3 left-3 w-6 h-6 border-t border-l border-primary/60" />
        <div className="absolute top-3 right-3 w-6 h-6 border-t border-r border-primary/60" />
        <div className="absolute bottom-3 left-3 w-6 h-6 border-b border-l border-primary/60" />
        <div className="absolute bottom-3 right-3 w-6 h-6 border-b border-r border-primary/60" />

        {/* Inner border */}
        <div className="absolute inset-4 border border-primary/20 rounded" />

        {/* Decorative top arcs */}
        <div className="absolute top-6 left-1/2 -translate-x-1/2 w-40 h-16">
          <svg viewBox="0 0 160 60" className="w-full h-full opacity-30">
            <path d="M20,55 Q80,5 140,55" fill="none" stroke="hsl(45, 80%, 60%)" strokeWidth="0.8" />
            <path d="M35,50 Q80,15 125,50" fill="none" stroke="hsl(45, 80%, 60%)" strokeWidth="0.5" />
          </svg>
        </div>

        {/* Number badge */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2">
          <div className="bg-[#0d0d0d] border border-primary/50 px-5 py-2 mt-1">
            <span className="font-cinzel text-lg text-primary font-bold">{number}</span>
          </div>
        </div>

        {/* Label */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2">
          <div className="border border-primary/50 overflow-hidden w-48 h-28">
            {image && (
              <img src={image} alt={label} className="w-full h-full object-cover" />
            )}
          </div>
        </div>

        {/* Title & description area - repositioned to start below the decorative image */}
        <div className="absolute top-[210px] inset-x-0 bottom-0 flex flex-col items-center px-8">
          <h3 className="font-cinzel text-xl text-foreground font-bold mb-4 text-center text-glow-black uppercase tracking-wider">
            {title}
          </h3>
          <p className="font-display text-muted-foreground text-center text-[14px] leading-relaxed opacity-90 line-clamp-4">
            {description}
          </p>
        </div>

        {/* Bottom indicator: Lengthened Right-pointing Arrow in corner */}
        <div className="absolute bottom-6 right-8">
          <motion.div 
            className="text-primary/70 group-hover:text-primary transition-colors duration-300"
            animate={{ x: 0 }}
            whileHover={{ x: 8 }}
          >
            <svg 
              width="40" 
              height="20" 
              viewBox="0 0 40 20" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="1.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="M5 10H35" />
              <path d="M28 3L35 10L28 17" />
            </svg>
          </motion.div>
        </div>

        {/* Bottom glow */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-primary/5 to-transparent pointer-events-none" />
      </div>
    </motion.div>);

};

export default EventCard;
