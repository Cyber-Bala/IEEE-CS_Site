import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Navbar from "./Navbar";

const EventDetail = ({ event, onBack }) => {
  const navigate = useNavigate();
  const { isAuthenticated, authFetch } = useAuth();
  const [userRegistration, setUserRegistration] = useState(null);
  const [loadingReg, setLoadingReg] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const fetchMyRegistrations = async () => {
      if (!isAuthenticated) return;
      setLoadingReg(true);
      try {
        const res = await authFetch('/api/auth/my-registrations/');
        if (res.ok) {
          const data = await res.json();
          // Match by slug for precision
          const matchedReg = data.registrations.find(r => r.event_slug === event.slug);
          setUserRegistration(matchedReg);
        }
      } catch (err) {
        console.error("Error fetching registrations:", err);
      } finally {
        setLoadingReg(false);
      }
    };

    fetchMyRegistrations();
  }, [isAuthenticated, event, authFetch]);

  // Lock body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-50 bg-background overflow-y-auto overflow-x-hidden isolate"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      onScroll={(e) => setIsScrolled(e.currentTarget.scrollTop > 20)}>

      {/* Layer 0: Background gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_hsl(45_40%_10%)_0%,_hsl(45_20%_4%)_70%)] z-0" />

      {/* Layer 20: Content container */}
      <div className="relative z-20 w-full min-h-full">
        {/* Navbar replaces Top bar */}
        <Navbar forceScrolled={isScrolled} onBack={onBack} />

        {/* Main layout */}
        <div className="flex flex-col lg:flex-row pt-32 pb-12">
          {/* Left: Scrollable content column */}
          <div className="flex-1 lg:pr-12">
            {/* Hero section */}
            <div className="flex flex-col items-center px-6 md:px-16 pt-8 pb-12">
              {/* Hexagon icon */}
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="mb-6">

                <div className="relative">
                  <div className="flex items-center gap-4">
                    <div className="h-px w-12 bg-gradient-to-r from-transparent to-primary/50" />
                    <span className="text-primary/50 text-xs">◆</span>
                    <div className="w-14 h-14 border-2 border-primary/50 flex items-center justify-center rotate-45">
                      <div className="w-10 h-10 border border-primary/30 flex items-center justify-center bg-[#0d0d0d]">
                        <span className="-rotate-45 text-primary text-lg">✦</span>
                      </div>
                    </div>
                    <span className="text-primary/50 text-xs">◆</span>
                    <div className="h-px w-12 bg-gradient-to-l from-transparent to-primary/50" />
                  </div>
                </div>
              </motion.div>

              {/* Title */}
              <motion.h1
                className="font-cinzel text-4xl md:text-6xl font-bold text-foreground text-glow text-center mb-6"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}>
                {event.detailTitle}
              </motion.h1>

              {/* Description */}
              <motion.p
                className="font-display text-muted-foreground text-center text-lg md:text-xl leading-relaxed max-w-3xl mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55, duration: 0.5 }}>
                {event.detailDescription}
              </motion.p>

              {/* Details Grid */}
              {event.details && (
                <motion.div
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-4xl mb-10"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.65, duration: 0.5 }}>
                  {event.details.map((detail, idx) => (
                    <div key={idx} className="flex flex-col border border-primary/20 bg-[#070707] p-4 rounded-sm border-glow">
                      <span className="font-display text-sm uppercase tracking-widest text-primary/70 mb-1">{detail.label}</span>
                      <span className="font-display text-base md:text-xl text-foreground font-medium">{detail.value}</span>
                    </div>
                  ))}
                </motion.div>
              )}

              {/* Tagline */}
              {event.detailTagline && (
                <motion.p
                  className="font-display text-primary italic text-lg mb-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.75, duration: 0.5 }}>
                  {event.detailTagline}
                </motion.p>
              )}

              {/* Scroll down indicator */}
              <motion.div
                className="flex flex-col items-center gap-2 mb-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 0.5 }}>
                <span className="text-muted-foreground/60 text-xs uppercase tracking-[0.2em]">Scroll down for details & registration</span>
                <motion.div
                  animate={{ y: [0, 6, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary/50">
                    <path d="M12 5v14M5 12l7 7 7-7" />
                  </svg>
                </motion.div>
              </motion.div>
            </div>

            {/* Content sections - left aligned, full width */}
            <div className="px-6 md:px-16 pb-12">

              {/* About the Event */}
              {event.about && (
                <motion.div
                  className="w-full max-w-4xl mb-10"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.5 }}>
                  <h3 className="font-cinzel text-3xl lg:text-4xl text-primary font-bold mb-6 flex items-center gap-3">
                    <span className="w-8 h-px bg-primary/50" />
                    About the Event
                  </h3>
                  <ul className="space-y-4">
                    {event.about.map((point, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <span className="text-primary/60 mt-1.5 text-sm">◆</span>
                        <span className="text-muted-foreground text-base md:text-lg leading-relaxed">{point}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}

              {/* Event Flow / Timeline */}
              {event.eventFlow && (
                <motion.div
                  className="w-full max-w-4xl mb-10"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.85, duration: 0.5 }}>
                  <h3 className="font-cinzel text-3xl lg:text-4xl text-primary font-bold mb-6 flex items-center gap-3">
                    <span className="w-8 h-px bg-primary/50" />
                    Event Flow
                  </h3>
                  <div className="relative border-l border-primary/20 ml-2 space-y-2">
                    {event.eventFlow.map((step, idx) => (
                      <div key={idx} className="relative pl-8 pb-8 last:pb-0">
                        <div className="absolute left-[-6px] top-1.5 w-3 h-3 rounded-full bg-primary/70 border border-primary/40" />
                        <p className="text-primary/80 text-sm uppercase tracking-widest font-mono mb-1.5">{step.time}</p>
                        <p className="text-foreground font-semibold text-lg md:text-xl">{step.phase}</p>
                        <p className="text-muted-foreground text-base md:text-lg mt-1">{step.desc}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Rules */}
              {event.rules && (
                <motion.div
                  className="w-full max-w-4xl mb-10"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9, duration: 0.5 }}>
                  <h3 className="font-cinzel text-3xl lg:text-4xl text-primary font-bold mb-6 flex items-center gap-3">
                    <span className="w-8 h-px bg-primary/50" />
                    Rules
                  </h3>
                  <ol className="space-y-3">
                    {event.rules.map((rule, idx) => (
                      <li key={idx} className="flex items-start gap-4">
                        <span className="text-primary/50 font-mono text-sm mt-1 min-w-[1.5rem] text-right">{String(idx + 1).padStart(2, '0')}</span>
                        <span className="text-muted-foreground text-base md:text-lg leading-relaxed">{rule}</span>
                      </li>
                    ))}
                  </ol>
                </motion.div>
              )}

              {/* Prizes */}
              {event.prizes && (
                <motion.div
                  className="w-full max-w-4xl mb-10"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.95, duration: 0.5 }}>
                  <h3 className="font-cinzel text-3xl lg:text-4xl text-primary font-bold mb-6 flex items-center gap-3">
                    <span className="w-8 h-px bg-primary/50" />
                    Prizes
                  </h3>
                  <div className="flex flex-wrap gap-6">
                    {event.prizes.map((prize, idx) => (
                      <div key={idx} className="flex-1 min-w-[160px] border border-primary/30 bg-[#070707] p-6 rounded-sm border-glow text-center">
                        <span className="text-primary text-sm uppercase tracking-widest font-display block mb-3">{prize.place}</span>
                        <span className="text-foreground text-3xl md:text-4xl font-bold font-display">{prize.amount}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Registration Status */}
              {userRegistration && (
                <motion.div
                  className="w-full max-w-4xl mb-10 p-6 border border-primary/40 bg-[#0d0d0d] rounded-lg border-glow"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7 }}>

                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <h3 className="font-cinzel text-xl text-primary font-bold">Registration Confirmed</h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <p className="text-primary/60 text-xs uppercase tracking-widest mb-1">Status</p>
                      <p className="text-foreground font-semibold flex items-center gap-2 text-lg">
                        {userRegistration.payment_status === 'completed' ? 'Paid' : 'Payment Pending'}
                        {userRegistration.payment_status === 'completed' ?
                          <span className="text-green-500 text-sm">✓</span> :
                          <span className="text-yellow-500 text-sm">!</span>
                        }
                      </p>
                    </div>

                    {userRegistration.team && (
                      <>
                        <div>
                          <p className="text-primary/60 text-xs uppercase tracking-widest mb-1">Team Name</p>
                          <p className="text-foreground font-semibold text-lg">{userRegistration.team.name}</p>
                        </div>
                        <div>
                          <p className="text-primary/60 text-xs uppercase tracking-widest mb-1">Invite Code</p>
                          <p className="text-primary font-mono font-bold tracking-wider text-xl">{userRegistration.team.code}</p>
                        </div>
                        <div className="sm:col-span-2">
                          <p className="text-primary/60 text-xs uppercase tracking-widest mb-3">Team Members ({userRegistration.team.member_count}/{userRegistration.team.max_size})</p>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {userRegistration.team.members.map((member, i) => (
                              <div key={i} className="flex items-center justify-between p-3 bg-[#0a0a0a] border border-primary/10 rounded">
                                <span className="text-base text-foreground/90">{member.name}</span>
                                <span className={`text-xs px-2 py-0.5 rounded border ${member.role === 'Leader' ? 'border-primary/50 text-primary' : 'border-muted-foreground/30 text-muted-foreground'}`}>
                                  {member.role}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </motion.div>
              )}

              {/* Buttons */}
              <motion.div
                className="flex flex-wrap items-center justify-center gap-4 mt-6 pb-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}>

                {!userRegistration && (
                <button
                  onClick={() => {
                    if (event.registrationLink && event.registrationLink !== '#') {
                      window.open(event.registrationLink, '_blank');
                    } else {
                      alert("Registration for this specific event will open shortly. Stay tuned!");
                    }
                  }}
                  className="flex items-center gap-3 bg-primary text-black px-10 py-3 rounded-full font-display uppercase tracking-[0.2em] text-sm hover:brightness-110 transition-all font-bold shadow-[0_0_20px_rgba(201,162,39,0.3)]">
                  Register Now
                </button>
                )}

                <button
                  className="flex items-center gap-3 border border-primary/30 text-primary/70 px-8 py-3 rounded-full font-display uppercase tracking-[0.2em] text-sm hover:bg-primary/10 hover:text-primary transition-all font-bold"
                  onClick={onBack}>
                  Close
                </button>
              </motion.div>
            </div>
          </div>

          {/* Right: Card column - Static at top */}
          <div className="hidden lg:block w-[400px] shrink-0 pt-32 pr-4 z-20">
            <motion.div
              className="flex items-start justify-center"
              initial={{ x: 100, opacity: 0, rotate: -8 }}
              animate={{ x: 0, opacity: 1, rotate: 4 }}
              transition={{ delay: 0.2, duration: 0.8, ease: [0.23, 1, 0.32, 1] }}>

              <div className="w-80 h-[440px] relative rounded-lg border border-primary/40 bg-[#0d0d0d] overflow-hidden border-glow shadow-2xl">
                <div className="absolute top-4 left-4 w-6 h-6 border-t border-l border-primary/60" />
                <div className="absolute top-4 right-4 w-6 h-6 border-t border-r border-primary/60" />
                <div className="absolute bottom-4 left-4 w-6 h-6 border-b border-l border-primary/60" />
                <div className="absolute bottom-4 right-4 w-6 h-6 border-b border-r border-primary/60" />
                <div className="absolute inset-5 border border-primary/20 rounded" />

                <div className="absolute top-8 left-1/2 -translate-x-1/2 w-44 h-16">
                  <svg viewBox="0 0 160 60" className="w-full h-full opacity-25">
                    <path d="M20,55 Q80,5 140,55" fill="none" stroke="hsl(45, 80%, 60%)" strokeWidth="0.8" />
                    <path d="M35,50 Q80,15 125,50" fill="none" stroke="hsl(45, 80%, 60%)" strokeWidth="0.5" />
                  </svg>
                </div>

                <div className="absolute top-1 left-1/2 -translate-x-1/2">
                  <div className="bg-[#0d0d0d] border border-primary/50 px-5 py-2 mt-1">
                    <span className="font-cinzel text-xl text-primary font-bold">{event.number}</span>
                  </div>
                </div>

                <div className="absolute top-20 left-1/2 -translate-x-1/2">
                  <div className="border border-primary/50 overflow-hidden w-44 h-24">
                    {event.image && (
                      <img src={event.image} alt={event.label} className="w-full h-full object-cover" />
                    )}
                  </div>
                </div>

                <div className="absolute inset-0 flex flex-col items-center justify-center px-5 pt-10">
                  <h3 className="font-cinzel text-base text-foreground font-bold mb-2 text-center text-glow-black">
                    {event.title}
                  </h3>
                  <p className="font-display text-muted-foreground text-center text-xs leading-relaxed">
                    {event.description}
                  </p>
                </div>

                <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-primary/10 to-transparent" />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default EventDetail;
