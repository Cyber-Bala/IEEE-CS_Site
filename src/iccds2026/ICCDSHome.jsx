import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useInView, useMotionValue, useSpring, animate } from 'framer-motion';
import { Mail, Calendar, MapPin, ExternalLink, ArrowRight, ChevronDown, Award, Globe, Users, FileText, Shield, BookOpen } from 'lucide-react';
import './ICCDS.css';
import GlassBackground from './GlassBackground';
import collegeLogo from '../assets/logo/college.png';
import ieeeLogo from '../assets/logo/ieee_cs.png';

/* ── Keynote Speaker Photos ──────────────────────────────────────── */
import photoPadma from './photo/padma_deepika.jpg';
import photoFarha from './photo/farha_haider.jpg';
import photoSriram from './photo/sriram_subramanian.jpg';
import photoArthi from './photo/arthi_nagarajan.jpg';
import photoChandrika from './photo/chandrika_kadirvel_mani.jpg';
import photoAshwini from './photo/ashwini_rajaram.png';
import photoPavithra from './photo/pavithra_gunasekaran.jpg';
import photoNandakumar from './photo/Nandakumar Kuthalaraja.jfif';

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

/* ── Countdown Timer ──────────────────────────────────────────────── */
const EVENT_DATE = new Date('2026-10-23T09:00:00+05:30');

const CountdownTimer = () => {
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    useEffect(() => {
        const tick = () => {
            const now = new Date();
            const diff = EVENT_DATE - now;
            if (diff <= 0) { setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 }); return; }
            setTimeLeft({
                days: Math.floor(diff / (1000 * 60 * 60 * 24)),
                hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((diff / (1000 * 60)) % 60),
                seconds: Math.floor((diff / 1000) % 60),
            });
        };
        tick();
        const id = setInterval(tick, 1000);
        return () => clearInterval(id);
    }, []);
    const pad = (n) => String(n).padStart(2, '0');
    return (
        <div className="iccds-countdown">
            {[{ val: timeLeft.days, label: 'Days' }, { val: timeLeft.hours, label: 'Hours' }, { val: timeLeft.minutes, label: 'Minutes' }, { val: timeLeft.seconds, label: 'Seconds' }].map((item, i) => (
                <React.Fragment key={item.label}>
                    <div className="iccds-countdown-unit">
                        <span className="iccds-countdown-val">{pad(item.val)}</span>
                        <span className="iccds-countdown-lbl">{item.label}</span>
                    </div>
                    {i < 3 && <span className="iccds-countdown-sep">:</span>}
                </React.Fragment>
            ))}
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
        if (!el) return;
        const target = el.offsetTop - 80;
        const start = window.scrollY;
        const distance = Math.abs(target - start);
        // Scale duration with distance: min 0.8s, max 2s
        const duration = Math.min(2, Math.max(0.8, distance / 1200));
        animate(start, target, {
            duration,
            ease: [0.22, 1, 0.36, 1],
            onUpdate: (v) => window.scrollTo(0, v),
        });
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
                    {['about', 'topics', 'timeline', 'committee', 'speakers'].map(s => (
                        <button key={s} onClick={() => scrollTo(s)}>
                            {s === 'topics' ? 'Call for Papers' : s === 'speakers' ? 'Speakers' : s.charAt(0).toUpperCase() + s.slice(1)}
                        </button>
                    ))}
                    <button onClick={() => window.location.href = '/iccds2026/guidelines'}>Guidelines</button>
                    <button onClick={() => window.location.href = '/iccds2026/registration'} className="iccds-hdr-cta">Registration</button>
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
                            <span className="iccds-badge iccds-badge-accent"><Globe size={13} /> Technically Sponsored by IEEE</span>
                        </motion.div>

                        {/* Main conference name */}
                        <motion.div className="iccds-hero-conf-name"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.35, ease }}
                        >
                            <span className="iccds-hero-conf-label iccds-hero-conf-label-lg">3rd International Conference on</span>
                        </motion.div>

                        <motion.h1 className="iccds-hero-title iccds-hero-title-lg"
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: 0.5, ease }}
                        >
                            <span className="iccds-hero-highlight">Computing &<br />Data Science</span>
                        </motion.h1>

                        <motion.div
                            className="iccds-hero-acronym"
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.7, ease }}
                        >
                            (ICCDS-2026)
                        </motion.div>

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
                                    <span className="iccds-info-val">IEEE Xplore (scopus indexed)</span>
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


                    {/* ═══ COUNTDOWN ═══ */}
                </section>
                <section className="iccds-stats">
                    <div className="iccds-container iccds-stats-inner">
                        <CountdownTimer />
                    </div>
                </section>

                {/* ═══ ABOUT ═══ */}
                <section id="about" className="iccds-sect">
                    <div className="iccds-container">
                        <SlideReveal>
                            <span className="iccds-sect-label">About</span>
                            <h2 className="iccds-sect-title">The Conference</h2>
                        </SlideReveal>



                        <motion.div className="iccds-about-grid"
                            initial="hidden" whileInView="visible"
                            viewport={{ once: true, margin: '-60px' }}
                            variants={stagger}
                        >
                            <motion.div variants={fadeUp} className="iccds-about-card">
                                <span className="iccds-about-num">01</span>
                                <h4>About College</h4>
                                <p>Rajalakshmi Engineering College, an Autonomous institution affiliated to Anna University, Chennai, was established in the year 1997 under the aegis of Rajalakshmi Educational Trust whose members have had consummate experience in the fields of education and industry. The College has grown from strength to strength in the last 25 years and progressing towards Excellence in Engineering Education, Research and Development. The College presently offers 19 Undergraduate and 11 Post Graduate programmes.</p>
                            </motion.div>
                            <motion.div variants={fadeUp} className="iccds-about-card">
                                <span className="iccds-about-num">02</span>
                                <h4>About Department</h4>
                                <p>Since its inception in 1997, the Department of Computer Science and Engineering has been continuously making progress in teaching and R&D activities. The Department was recognized as Collaborative Research Centre by Anna University to offer M.S. (by research) and Ph.D. programmes. The Department has entered into an MoU with IBM, Infosys, TCS, Zoho, Virtusa, Pega, Oracle, Wipro, VMWare, UiPath, Dell, Cognizant, AWS, U.S. Technologies and many other renowned software companies for software training and Faculty Development Programmes, besides R&D activities.</p>
                            </motion.div>
                            <motion.div variants={fadeUp} className="iccds-about-card iccds-about-card-highlight">
                                <span className="iccds-about-num">03</span>
                                <h4>About Conference</h4>
                                <p>International Conference on Computing and Data Science (ICCDS-2026) is the platform where academicians and industry research present their contemporary findings so that new inclinations and thoughts on computing and data science can be explored. The key objective is to offer the participants all over the nation to share their ideas and experience with peers. Eminent personalities from various industries have consented to be part of this conference by delivering special lectures on recent advanced topics.</p>
                            </motion.div>
                        </motion.div>
                    </div>
                </section>

                {/* ═══ CALL FOR PAPERS ═══ */}
                <section id="topics" className="iccds-sect iccds-sect-alt">
                    <div className="iccds-container">
                        <SlideReveal>
                            <span className="iccds-sect-label">Research Tracks</span>
                            <h2 className="iccds-sect-title">Call for Papers</h2>
                        </SlideReveal>

                        <SlideReveal delay={0.1}>
                            <div className="iccds-cfp-intro">
                                <p>We solicit original research and technical papers which have not published elsewhere.</p>
                                <p>Paper Submissions will be reviewed and evaluated based on the originality, technical quality and relevance to conference.</p>
                            </div>
                        </SlideReveal>

                        <SlideReveal delay={0.15}>
                            <h3 className="iccds-cfp-topics-heading">TOPICS OF INTEREST INCLUDE, BUT NOT LIMITED TO</h3>
                            <p className="iccds-cfp-topics-sub">Authors are invited to contribute in the conference by submitting the articles in the following areas,</p>
                        </SlideReveal>

                        <motion.div className="iccds-tracks-grid"
                            initial="hidden" whileInView="visible"
                            viewport={{ once: true, margin: '-60px' }}
                            variants={stagger}
                        >
                            {[
                                { title: 'AI & Computing', items: ['Artificial Intelligence', 'Machine Learning', 'Deep Learning', 'Natural language Processing', 'Human Computer Interaction'] },
                                { title: 'Data Science & Analytics', items: ['Data Science', 'Big Data Analytics', 'Medical Image Processing', 'Digital Image Processing'] },
                                { title: 'Cloud & Distributed', items: ['Cloud Computing', 'Distributed Computing', 'Mobile & Pervasive Computing', 'Internet of Things'] },
                                { title: 'Networks & Security', items: ['Virtual Reality & Augmented Reality', 'Information and Data Security', 'Green Computing', 'Smart Networking', 'Adhoc Networks', 'Wireless Sensor Networks', 'Network & Data Security', 'Network Protocols, QOS'] },
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
                                { step: '01', month: 'August', date: 'Aug 15', label: 'Full Paper Submission', icon: <Mail size={22} /> },
                                { step: '02', month: 'September', date: 'Sept 10', label: 'Notification Acceptance', icon: <Award size={22} /> },
                                { step: '03', month: 'September', date: 'Sept 30', label: 'Final Camera Ready Paper', icon: <ArrowRight size={22} /> },
                                { step: '04', month: 'October', date: 'Oct 23–24', label: 'Conference Days', icon: <Globe size={22} />, highlight: true },
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

                        {/* Registration */}
                        <SlideReveal delay={0.3} className="iccds-register-banner">
                            <div className="iccds-register-simple">
                                <div className="iccds-reg-simple-text">
                                    <h3>Registration is Open</h3>
                                    <p>Secure your spot and view the registration guidelines for ICCDS 2026.</p>
                                </div>
                                <button onClick={() => window.location.href = '/iccds2026/registration'} className="iccds-reg-simple-btn">
                                    Register Now <ArrowRight size={18} />
                                </button>
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
                                        { name: 'Mr. Abhay Shankar Meganathan', role: 'Vice Chairman, Rajalakshmi Engineering College' },
                                    ]
                                },
                                {
                                    title: 'Patrons',
                                    members: [
                                        { name: 'Dr. V. Murali Bhaskaran', role: 'Professor, Rajalakshmi Engineering College' },
                                        { name: 'Dr. E.M. Malathy', role: 'HOD, Department of CSE, Rajalakshmi Engineering College' },
                                        { name: 'Dr. J. Manoranjini', role: 'Deputy HOD, Department of CSE, Rajalakshmi Engineering College' },
                                        { name: 'Dr. P. Sakthivel', role: 'Chairman, IEEE Madras Section' },
                                    ]
                                },
                                {
                                    title: 'Convener',
                                    members: [
                                        { name: 'Dr. P. Kumar', role: 'Professor, Department of CSE' },
                                    ]
                                },
                                {
                                    title: 'Coordinators',
                                    members: [
                                        { name: 'Dr. K. Ananthajothi', role: 'Professor, Department of CSE' },
                                        { name: 'Dr. N. Duraimurugan', role: 'Associate Professor, Department of CSE' },
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

                {/* ═══ TECHNICAL COMMITTEE ═══ */}
                <section className="iccds-sect">
                    <div className="iccds-container">
                        <SlideReveal>
                            <span className="iccds-sect-label">Committee</span>
                            <h2 className="iccds-sect-title">Technical Committee</h2>
                        </SlideReveal>
                        <SlideReveal delay={0.15}>
                            <ul className="iccds-committee-list">
                                <li>Dr. V. Nagarajan, Professor, Pondicherry University, Puducherry, India</li>
                                <li>Dr. A. Kandasamy, Professor, National Institute of Technology, Karnataka, India</li>
                                <li>Dr. A. Amuthan, Professor and Associate Dean, Pondicherry Technological University, India</li>
                                <li>Dr. Subhash Chandra Yadav, Professor &amp; Head, Central University of Jharkhand, Ranchi, India</li>
                                <li>Dr. Brojo Kishore Mishra, Professor, NIST Institute of Science and Technology, Berhampur Odisha, India</li>
                                <li>Dr. B. Surendiran, Associate Dean, NIT Puducherry, India</li>
                                <li>Dr. Durgesh Mishra, Director &amp; Campus Director, Symbiosis University of Applied Sciences, India</li>
                            </ul>
                        </SlideReveal>
                    </div>
                </section>

                {/* ═══ ADVISORY COMMITTEE ═══ */}
                <section className="iccds-sect iccds-sect-alt">
                    <div className="iccds-container">
                        <SlideReveal>
                            <span className="iccds-sect-label">Committee</span>
                            <h2 className="iccds-sect-title">Advisory Committee</h2>
                        </SlideReveal>
                        <div className="iccds-advisory-grid">
                            <SlideReveal delay={0.1}>
                                <div className="iccds-advisory-col">
                                    <h4 className="iccds-advisory-heading">International</h4>
                                    <ul className="iccds-committee-list">
                                        <li>Dr. Shuai Li, Associate Professor, Swansea University, UK</li>
                                        <li>Dr. Stephen Olatundeolabiyisi, Professor, LadokeAkintola University, Nigeria</li>
                                        <li>Dr. Joy Long-Zhong Chen, Professor, Brunel University, London</li>
                                        <li>Dr. Neda Azizi, Senior Lecturer, Torrens University, Australia</li>
                                        <li>Bhadrachalam Chitturi, Associate Professor, The University of Texas at Dallas, USA</li>
                                        <li>Yu Xiang, Assistant Professor, The University of Texas at Dallas, USA</li>
                                        <li>John Cole, Senior Lecturer, The University of Texas at Dallas, USA</li>
                                        <li>Dr. Kinshuk, Dean, The University of North Texas, USA</li>
                                        <li>Saif Aldeen Saad Alkadhim, Assistant Lecturer, Xian Jiatong University, Xian, China</li>
                                        <li>Maleika Heenaye-Mamode Khan, Associate Professor, University of Mauritius, Africa</li>
                                        <li>Fatma Sayed Gadelrab, Associate Professor, Helwan University, Cairo, Egypt</li>
                                    </ul>
                                </div>
                            </SlideReveal>
                            <SlideReveal delay={0.2}>
                                <div className="iccds-advisory-col">
                                    <h4 className="iccds-advisory-heading">National</h4>
                                    <ul className="iccds-committee-list">
                                        <li>Dr. Dr.T.shanmuganantham, Vice Chairman(Academics), IEEE Madras Section</li>
                                        <li>Dr. Ramalatha Marimuthu, Vice Chairman (Industry),IEEE Madras Section</li>
                                        <li>Dr. R. Radha, Secretary, IEEE Madras Section  &amp; Principal, SSN College of Engineering, Chennai, India</li>
                                        <li>Dr. S. Brindha, Treasurer, IEEE Madras Section</li>
                                        <li>Dr. M. Palanivelan, IEEE-Student Branch Counsellor, REC</li>
                                        <li>Dr. S. Joseph Gladwin, BigCat Wireless Pvt. Ltd., IIT Madras Research Park, Chennai, India</li>
                                        <li>Dr. R. Murugan, Associate Professor, NIT Silchar, India</li>
                                        <li>Dr. B. Surendiran, Associate Dean, NIT Puducherry, India</li>
                                        <li>Dr. V.D. Ambeth Kumar, Associate Professor, Mizoram University, India</li>
                                        <li>Dr. R. Saminathan, Associate Professor, Annamalai University, India</li>
                                        <li>Dr. M.D. Selvaraj, Associate Professor, IIITDM, Kancheepuram, India</li>
                                        <li>Dr. G. Kumaravelan, Associate Professor, Pondicherry University, Pondicherry, India</li>
                                    </ul>
                                </div>
                            </SlideReveal>
                        </div>
                    </div>
                </section>

                {/* ═══ KEYNOTE SPEAKERS ═══ */}
                <section id="speakers" className="iccds-sect">
                    <div className="iccds-container">
                        <SlideReveal>
                            <span className="iccds-sect-label">Speakers</span>
                            <h2 className="iccds-sect-title">Keynote Speakers</h2>
                        </SlideReveal>
                        <motion.div className="iccds-keynote-grid"
                            initial="hidden" whileInView="visible"
                            viewport={{ once: true, margin: '-60px' }}
                            variants={stagger}
                        >
                            {[
                                { name: 'Padma Deepika N.', role: 'Senior Software Engineer at Apple — Product Integrity Hardware Engineering | Full-Stack Engineer | AI-Enabled Developer Tooling', org: 'Apple', location: 'Austin, Texas, USA', education: 'Anna University Chennai', photo: photoPadma, linkedin: 'https://www.linkedin.com/in/padma-deepika-narayanaswamy-0605/' },
                                { name: 'Vinod Balachandran', role: 'Software Engineer at Microsoft', org: 'Microsoft', location: 'Greater Seattle Area', education: 'UC Davis', photo: null, linkedin: 'https://www.linkedin.com/in/vinod-balachandran/' },
                                { name: 'Farha Haider', role: 'AI ML Developer @ Nokia | MEng @ McMaster University | Machine Learning | ex-Senior Software Engineer @ Tiger Analytics', org: 'Nokia', location: 'Canada', education: 'McMaster University', photo: photoFarha, linkedin: 'https://www.linkedin.com/in/farhahaider/' },
                                { name: 'Sriram Subramanian', role: 'Senior Member of Technical Staff @ Oracle Cloud Infrastructure / OCI', org: 'Oracle', location: 'Issaquah, Washington, USA', education: 'Arizona State University', photo: photoSriram, linkedin: 'https://www.linkedin.com/in/sriramopensource/' },
                                { name: 'Arthi Nagarajan', role: 'Senior Software Engineer at Microsoft', org: 'Microsoft', location: 'Austin, Texas, USA', education: 'Texas State University', photo: photoArthi, linkedin: 'https://www.linkedin.com/in/arthi-nagarajan-1b9b3b94/' },
                                { name: 'Chandrika Kadirvel Mani', role: 'AI Principal Architect @ Google | Leading APAC\'s Agentic AI Revolution | Scaling Multi-Agent Systems & Responsible GenAI Strategy for Google Cloud Enterprise Customers', org: 'Google', location: 'Singapore', education: 'National University of Singapore', photo: photoChandrika, linkedin: 'https://www.linkedin.com/in/chandrikakadirvelmani/' },
                                { name: 'Divyanshi Kothari', role: 'Software Engineer @ Apple | AI & Data Platforms', org: 'Apple', location: 'San Francisco Bay Area', education: '', photo: null, linkedin: 'https://www.linkedin.com/in/divyanshikot/' },
                                { name: 'Ashwini Rajaram', role: 'Applied AI Research | LLMs, RAG, Agentic AI | Master\'s Machine Learning @ UdeM, MILA Quebec AI', org: 'TD', location: 'Greater Montreal Metropolitan Area', education: 'Mila — Quebec Artificial Intelligence Institute', photo: photoAshwini, linkedin: 'https://www.linkedin.com/in/ashwini-r-1910a61aa/' },
                                { name: 'Pavithra Gunasekaran', role: 'MBA (Finance & Marketing) | Aspiring Marketing Strategist | PR Lead @ Yukthi Management Club | Ex-Senior Finance Associate | 3+ Years in Data Analysis & Financial Operations | SEO', org: 'Savancys Inc', location: 'Greater Chennai Area', education: 'Rajalakshmi Engineering College', photo: photoPavithra, linkedin: 'https://www.linkedin.com/in/contact-pavithra-gunasekaran/' },
                                { name: 'Nandakumar Kuthalaraja', role: 'Senior Principal Architect @ Northern Trust | TOGAF Certified Enterprise Architect | MS Candidate @ University of Arizona', org: 'Northern Trust', location: '', education: 'University of Arizona', photo: photoNandakumar, linkedin: '' },
                            ].map((speaker, idx) => (
                                <motion.div key={idx} variants={fadeUp} className="iccds-keynote-card">
                                    <div className="iccds-keynote-avatar">
                                        {speaker.photo ? (
                                            <img src={speaker.photo} alt={speaker.name} className="iccds-keynote-photo" />
                                        ) : (
                                            <Users size={32} />
                                        )}
                                    </div>
                                    <span className="iccds-member-name">{speaker.name}</span>
                                    <span className="iccds-keynote-org">{speaker.org}</span>
                                    <span className="iccds-member-role">{speaker.role}</span>
                                    <a href={speaker.linkedin} target="_blank" rel="noopener noreferrer" className="iccds-keynote-linkedin">
                                        <ExternalLink size={14} /> LinkedIn
                                    </a>
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
                                    3rd International Conference on Computing and Data Science (ICCDS-2026)
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
