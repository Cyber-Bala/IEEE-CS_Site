import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useInView, useMotionValue, useSpring, animate } from 'framer-motion';
import { Mail, Calendar, MapPin, ExternalLink, ArrowRight, ChevronDown, Award, Globe, Users } from 'lucide-react';
import './ICCDS.css';
import GlassBackground from './GlassBackground';
import collegeLogo from '../assets/logo/college.png';
import ieeeLogo from '../assets/logo/ieee_cs.png';

/* ── Word Blur Reveal ────────────────────────────────────────────── */
const BlurReveal = ({ text, className, delay = 0 }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-60px' });
    return (
        <p ref={ref} className={className}>
            {text.split(' ').map((word, i) => (
                <motion.span key={i}
                    initial={{ opacity: 0, filter: 'blur(8px)', y: 10 }}
                    animate={isInView ? { opacity: 1, filter: 'blur(0px)', y: 0 } : {}}
                    transition={{ duration: 0.5, delay: delay + i * 0.03, ease: [0.16, 1, 0.3, 1] }}
                    style={{ display: 'inline-block', marginRight: '0.28em' }}
                >{word}</motion.span>
            ))}
        </p>
    );
};

/* ── Slide Reveal ────────────────────────────────────────────────── */
const SlideReveal = ({ children, className, delay = 0 }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-60px' });
    return (
        <motion.div ref={ref} className={className}
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
        >{children}</motion.div>
    );
};

/* ── Counter ─────────────────────────────────────────────────────── */
const Counter = ({ to, suffix = '', label }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
    const count = useMotionValue(0);
    const spring = useSpring(count, { stiffness: 50, damping: 18 });
    const [val, setVal] = useState(0);
    useEffect(() => { if (isInView) animate(count, to, { duration: 2.5, ease: [0.16, 1, 0.3, 1] }); }, [isInView]);
    useEffect(() => spring.on('change', v => setVal(Math.round(v))), [spring]);
    return (
        <div ref={ref} className="iccds-counter">
            <span className="iccds-counter-val">{val}{suffix}</span>
            <span className="iccds-counter-lbl">{label}</span>
        </div>
    );
};

/* ── Splash Screen ───────────────────────────────────────────────── */
const SplashScreen = ({ onComplete }) => {
    const [yearCount, setYearCount] = useState(2020);
    const [phase, setPhase] = useState(0); 
    const ease = [0.16, 1, 0.3, 1];

    useEffect(() => {
        const t1 = setTimeout(() => setPhase(1), 200);
        const t2 = setTimeout(() => {
            let y = 2020;
            const interval = setInterval(() => {
                y++;
                setYearCount(y);
                if (y >= 2026) clearInterval(interval);
            }, 55);
        }, 350);
        const t3 = setTimeout(() => setPhase(2), 1500);
        const t4 = setTimeout(onComplete, 2000);
        return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
    }, [onComplete]);

    return (
        <motion.div className="iccds-splash-wrapper" exit={{ opacity: 0 }} transition={{ duration: 0.8 }}>
            <div className="iccds-splash-center">
                <motion.div 
                    className="iccds-splash-logos"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: phase >= 1 ? 1 : 0, y: phase >= 1 ? 0 : 10 }}
                    transition={{ duration: 0.8 }}
                >
                    <img src={collegeLogo} alt="REC" />
                    <span className="iccds-splash-x">×</span>
                    <img src={ieeeLogo} alt="IEEE" />
                </motion.div>

                <motion.div 
                    className="iccds-splash-main"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: phase >= 1 ? 1 : 0 }}
                    transition={{ duration: 1, ease }}
                >
                    <h1 className="iccds-splash-title">ICCDS</h1>
                    <div className="iccds-splash-year-box">
                        <span className="iccds-splash-year">{yearCount}</span>
                    </div>
                </motion.div>

                <motion.div 
                    className="iccds-splash-line-box"
                    initial={{ width: 0 }}
                    animate={{ width: phase >= 1 ? 200 : 0 }}
                    transition={{ duration: 1.2, ease }}
                >
                    <div className="iccds-splash-line-inner" />
                </motion.div>

                <motion.p 
                    className="iccds-splash-sub"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: phase >= 1 ? 1 : 0, y: phase >= 1 ? 0 : 5 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                >
                    International Conference on Computing & Data Science
                </motion.p>
            </div>
            
            {/* Reveal overlays */}
            <motion.div className="iccds-splash-overlay top" exit={{ y: '-100%' }} transition={{ duration: 1, ease }} />
            <motion.div className="iccds-splash-overlay bot" exit={{ y: '100%' }} transition={{ duration: 1, ease }} />
        </motion.div>
    );
};

/* ══════════════════════════════════════════════════════════════════ */
const ICCDSHome = () => {
    const [showSplash, setShowSplash] = useState(true);
    const [scrolled, setScrolled] = useState(false);
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
    const ease = [0.16, 1, 0.3, 1];

    useEffect(() => {
        if (showSplash) document.body.style.overflow = 'hidden';
        else document.body.style.overflow = '';
        return () => { document.body.style.overflow = ''; };
    }, [showSplash]);

    useEffect(() => {
        const fn = () => setScrolled(window.scrollY > 40);
        window.addEventListener('scroll', fn);
        return () => window.removeEventListener('scroll', fn);
    }, []);

    const scrollTo = (id) => {
        const el = document.getElementById(id);
        if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' });
    };

    const stagger = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
    const fadeUp = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease } } };
    const yPar = useTransform(scrollYProgress, [0, 0.25], [0, 100]);

    return (
        <div className="iccds-page">
            <GlassBackground />
            <motion.div className="iccds-scroll-progress" style={{ scaleX }} />
            
            {/* ═══ SPLASH SCREEN ═══ */}
            <AnimatePresence>
                {showSplash && <SplashScreen onComplete={() => setShowSplash(false)} />}
            </AnimatePresence>

            {/* ═══ HEADER ═══ */}
            <header className={`iccds-hdr ${scrolled ? 'scrolled' : ''}`}>
                <div className="iccds-hdr-left">
                    <img src={collegeLogo} alt="Rajalakshmi Engineering College" className="iccds-hdr-logo" />
                    <div className="iccds-hdr-divider" />
                    <img src={ieeeLogo} alt="IEEE Computer Society" className="iccds-hdr-logo" />
                    <div className="iccds-hdr-divider" />
                    <div className="iccds-hdr-brand">
                        <span className="iccds-hdr-brand-name">ICCDS 2026</span>
                        <span className="iccds-hdr-brand-sub">IEEE Conference</span>
                    </div>
                </div>
                <nav className="iccds-hdr-nav">
                    {['about', 'topics', 'timeline', 'committee'].map(s => (
                        <button key={s} onClick={() => scrollTo(s)}>
                            {s === 'topics' ? 'Call for Papers' : s.charAt(0).toUpperCase() + s.slice(1)}
                        </button>
                    ))}
                    <button className="iccds-hdr-cta iccds-hdr-cta-soon">Coming Soon</button>
                </nav>
            </header>

            <main>
                {/* ═══ HERO ═══ */}
                <section id="home" className="iccds-hero">
                    <div className="iccds-hero-bg-pattern" />
                    <motion.div style={{ y: yPar }} className="iccds-hero-inner">

                        {/* Top pill badges */}
                        <motion.div className="iccds-hero-badges"
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2, ease }}
                        >
                            <span className="iccds-badge"><Award size={13} /> IEEE Conference Record #64403</span>
                            <span className="iccds-badge iccds-badge-accent"><Globe size={13} /> Scopus Indexed</span>
                        </motion.div>

                        {/* Main conference name */}
                        <motion.div className="iccds-hero-conf-name"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.35, ease }}
                        >
                            <span className="iccds-hero-conf-label">4th International Conference on</span>
                        </motion.div>

                        <motion.h1 className="iccds-hero-title"
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: 0.5, ease }}
                        >
                            <span className="iccds-hero-highlight">Computing &<br />Data Science</span>
                        </motion.h1>

                        {/* Divider line */}
                        <motion.div className="iccds-hero-divider"
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ duration: 1, delay: 0.9, ease }}
                        />

                        {/* Info row — date | venue | publication */}
                        <motion.div className="iccds-hero-info-row"
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 1.1, ease }}
                        >
                            <div className="iccds-hero-info-item">
                                <Calendar size={20} className="iccds-info-icon" />
                                <div>
                                    <span className="iccds-info-lbl">Date</span>
                                    <span className="iccds-info-val">October 23–24, 2026</span>
                                </div>
                            </div>
                            <div className="iccds-hero-info-sep" />
                            <div className="iccds-hero-info-item">
                                <MapPin size={20} className="iccds-info-icon" />
                                <div>
                                    <span className="iccds-info-lbl">Venue</span>
                                    <span className="iccds-info-val">REC, Chennai, India</span>
                                </div>
                            </div>
                            <div className="iccds-hero-info-sep" />
                            <div className="iccds-hero-info-item">
                                <ExternalLink size={20} className="iccds-info-icon" />
                                <div>
                                    <span className="iccds-info-lbl">Published In</span>
                                    <span className="iccds-info-val">IEEE Xplore</span>
                                </div>
                            </div>
                        </motion.div>

                        {/* CTAs */}
                        <motion.div className="iccds-hero-ctas"
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 1.3, ease }}
                        >
                            <button onClick={() => scrollTo('topics')} className="iccds-btn-primary">
                                Explore Tracks <ArrowRight size={18} />
                            </button>
                            <button onClick={() => scrollTo('timeline')} className="iccds-btn-outline">
                                Important Dates
                            </button>
                        </motion.div>

                    </motion.div>

                    <motion.div
                        className="iccds-hero-scroll"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 2, duration: 1 }}
                    >
                        <div className="iccds-scroll-mouse">
                            <div className="iccds-scroll-wheel" />
                        </div>
                        <span>Scroll to Explore</span>
                    </motion.div>


                {/* ═══ STATS ═══ */}
                </section>
                <section className="iccds-stats">
                    <div className="iccds-container iccds-stats-inner">
                        <Counter to={4} suffix="th" label="Edition" />
                        <Counter to={2} label="Days" />
                        <Counter to={50} suffix="+" label="Speakers" />
                        <Counter to={500} suffix="+" label="Expected Delegates" />
                        <Counter to={30} suffix="+" label="Countries" />
                    </div>
                </section>

                {/* ═══ ABOUT ═══ */}
                <section id="about" className="iccds-sect">
                    <div className="iccds-container">
                        <SlideReveal>
                            <span className="iccds-sect-label">About</span>
                            <h2 className="iccds-sect-title">The Conference</h2>
                        </SlideReveal>

                        <BlurReveal
                            text="A premier platform for researchers and practitioners to share innovations in computing, data science, and emerging technologies."
                            className="iccds-desc"
                            delay={0.15}
                        />

                        <motion.div className="iccds-about-grid"
                            initial="hidden" whileInView="visible"
                            viewport={{ once: true, margin: '-60px' }}
                            variants={stagger}
                        >
                            <motion.div variants={fadeUp} className="iccds-about-card">
                                <span className="iccds-about-num">01</span>
                                <h4>Institution</h4>
                                <p>REC — Autonomous, Anna University affiliated, NAAC A++ accredited. 15+ departments, 8000+ students, since 1997.</p>
                            </motion.div>
                            <motion.div variants={fadeUp} className="iccds-about-card">
                                <span className="iccds-about-num">02</span>
                                <h4>Department</h4>
                                <p>CSE Dept — Anna University Collaborative Research Centre with funded projects and international partnerships.</p>
                            </motion.div>
                            <motion.div variants={fadeUp} className="iccds-about-card iccds-about-card-highlight">
                                <span className="iccds-about-num">03</span>
                                <h4>Publication</h4>
                                <p>All accepted papers submitted to IEEE Xplore. Selected papers recommended for Scopus-indexed journals.</p>
                            </motion.div>
                        </motion.div>
                    </div>
                </section>

                {/* ═══ CALL FOR PAPERS — TAG CLOUD STYLE ═══ */}
                <section id="topics" className="iccds-sect iccds-sect-alt">
                    <div className="iccds-container">
                        <SlideReveal>
                            <span className="iccds-sect-label">Research Tracks</span>
                            <h2 className="iccds-sect-title">Call for Papers</h2>
                        </SlideReveal>

                        <motion.div className="iccds-tracks-grid"
                            initial="hidden" whileInView="visible"
                            viewport={{ once: true, margin: '-60px' }}
                            variants={stagger}
                        >
                            {[
                                { title: 'AI & Machine Learning', items: ['Deep Learning', 'NLP', 'Computer Vision', 'Reinforcement Learning'] },
                                { title: 'Data Science', items: ['Big Data Analytics', 'Predictive Modeling', 'Statistical Methods', 'Data Mining'] },
                                { title: 'Next-Gen Computing', items: ['Cloud & Edge', 'Quantum Computing', 'Distributed Systems', 'IoT'] },
                                { title: 'Cyber Security', items: ['Blockchain', 'Network Security', 'Cryptography', 'Privacy'] },
                            ].map((track, idx) => (
                                <motion.div key={idx} variants={fadeUp} className="iccds-track-card">
                                    <div className="iccds-track-icon">
                                        {idx === 0 && <Award size={24} />}
                                        {idx === 1 && <Globe size={24} />}
                                        {idx === 2 && <Users size={24} />}
                                        {idx === 3 && <Mail size={24} />}
                                    </div>
                                    <h4>{track.title}</h4>
                                    <ul>
                                        {track.items.map(item => <li key={item}>{item}</li>)}
                                    </ul>
                                    <div className="iccds-track-glow" />
                                </motion.div>
                            ))}
                        </motion.div>

                        <SlideReveal delay={0.3}>
                            <div className="iccds-submission-info">
                                <div className="iccds-info-item">
                                    <h5>Format</h5>
                                    <p>IEEE 2-column, 6 pages</p>
                                </div>
                                <div className="iccds-info-divider" />
                                <div className="iccds-info-item">
                                    <h5>Portal</h5>
                                    <p>Microsoft CMT</p>
                                </div>
                                <div className="iccds-info-divider" />
                                <div className="iccds-info-item">
                                    <h5>Published In</h5>
                                    <p>IEEE Xplore</p>
                                </div>
                            </div>
                        </SlideReveal>
                    </div>
                </section>

                {/* ═══ IMPORTANT DATES ═══ */}
                <section id="timeline" className="iccds-sect">
                    <div className="iccds-container">
                        <SlideReveal>
                            <span className="iccds-sect-label">Schedule</span>
                            <h2 className="iccds-sect-title">Important Dates</h2>
                        </SlideReveal>

                        <div className="iccds-steps">
                            <div className="iccds-steps-connector" />
                            {[
                                { step: '01', month: 'August', date: 'Aug 15', label: 'Paper Submission', icon: <Mail size={22} /> },
                                { step: '02', month: 'September', date: 'Sep 01', label: 'Acceptance Notification', icon: <Award size={22} /> },
                                { step: '03', month: 'September', date: 'Sep 15', label: 'Camera-Ready Due', icon: <ArrowRight size={22} /> },
                                { step: '04', month: 'September', date: 'Sep 20', label: 'Early Registration', icon: <Calendar size={22} /> },
                                { step: '05', month: 'October', date: 'Oct 23–24', label: 'Conference Day', icon: <Globe size={22} />, highlight: true },
                            ].map((item, idx) => (
                                <motion.div key={idx}
                                    className={`iccds-step-card ${item.highlight ? 'highlight' : ''}`}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.12 }}
                                    whileHover={{ y: -6 }}
                                >
                                    <div className="iccds-step-icon">{item.icon}</div>
                                    <div className="iccds-step-num">{item.step}</div>
                                    <div className="iccds-step-date">{item.date}</div>
                                    <div className="iccds-step-label">{item.label}</div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Registration Opening Soon */}
                        <SlideReveal delay={0.3} className="iccds-register-banner">
                            <div className="iccds-register-inner">
                                <div className="iccds-reg-coming">
                                    <span className="iccds-reg-dot" />
                                    <h3>Registration Will Open Soon</h3>
                                </div>
                                <p className="iccds-reg-sub">Stay tuned — we'll notify you when registration goes live.</p>
                            </div>
                        </SlideReveal>
                    </div>
                </section>

                {/* ═══ COMMITTEE ═══ */}
                <section id="committee" className="iccds-sect iccds-sect-alt">
                    <div className="iccds-container">
                        <SlideReveal>
                            <span className="iccds-sect-label">Leadership</span>
                            <h2 className="iccds-sect-title">Organizing Committee</h2>
                        </SlideReveal>

                        <motion.div className="iccds-comm-grid"
                            initial="hidden" whileInView="visible"
                            viewport={{ once: true, margin: '-60px' }}
                            variants={stagger}
                        >
                            {[
                                {
                                    title: 'Chief Patrons',
                                    members: [
                                        { name: 'Mr. S. Meganathan', role: 'Correspondent, Rajalakshmi Institutions' },
                                        { name: 'Dr. (Mrs). Thangam Meganathan', role: 'Chairperson, Rajalakshmi Institutions' },
                                        { name: 'Mr. Abhay Shankar Meganathan', role: 'Vice Chairman, REC' },
                                    ]
                                },
                                {
                                    title: 'Patrons',
                                    members: [
                                        { name: 'Dr. C.R. Muthukrishnan', role: 'Advisor, Rajalakshmi Institutions' },
                                        { name: 'Dr. S.N. Murugesan', role: 'Principal, REC' },
                                        { name: 'Dr. V. Murali Bhaskaran', role: 'Dean-Academics, REC' },
                                    ]
                                },
                                {
                                    title: 'Convener & Coordinators',
                                    members: [
                                        { name: 'Dr. P. Kumar', role: 'Professor & Head, Dept of CSE' },
                                        { name: 'Dr. K. Ananthajothi', role: 'Professor, Dept of CSE' },
                                        { name: 'Dr. N. Duraimurugan', role: 'Associate Professor, Dept of CSE' },
                                    ]
                                },
                            ].map(group => (
                                <motion.div key={group.title} variants={fadeUp} className="iccds-comm-card">
                                    <h5>{group.title}</h5>
                                    {group.members.map(m => (
                                        <div key={m.name} className="iccds-member">
                                            <span className="iccds-member-name">{m.name}</span>
                                            <span className="iccds-member-role">{m.role}</span>
                                        </div>
                                    ))}
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </section>

                {/* ═══ FOOTER ═══ */}
                <footer className="iccds-footer">
                    <div className="iccds-container">
                        <div className="iccds-footer-top">
                            <div className="iccds-footer-brand">
                                <div className="iccds-footer-logos">
                                    <img src={collegeLogo} alt="REC" />
                                    <img src={ieeeLogo} alt="IEEE CS" />
                                </div>
                                <p className="iccds-footer-tagline">
                                    4th International Conference on Computing and Data Science
                                </p>
                            </div>
                            <div className="iccds-footer-cols">
                                <div className="iccds-footer-col">
                                    <h6>Venue</h6>
                                    <p>Rajalakshmi Engineering College<br />Rajalakshmi Nagar, Thandalam<br />Chennai – 602105, Tamil Nadu, India</p>
                                </div>
                                <div className="iccds-footer-col">
                                    <h6>Contact</h6>
                                    <p>Dr. N. Duraimurugan — 9944915267<br />Dr. K. Ananthajothi — 9994075769<br />iccds@rajalakshmi.edu.in</p>
                                </div>
                            </div>
                        </div>
                        <div className="iccds-footer-bar">
                            © {new Date().getFullYear()} ICCDS · Rajalakshmi Engineering College · All rights reserved
                        </div>
                    </div>
                </footer>
            </main>
        </div>
    );
};

export default ICCDSHome;
