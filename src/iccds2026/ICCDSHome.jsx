import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useInView, useMotionValue, useSpring, animate } from 'framer-motion';
import { Mail, Calendar, MapPin, ExternalLink, ArrowRight, ChevronDown, Award, Globe, Users, FileText, Shield, BookOpen } from 'lucide-react';
import './ICCDS.css';
import GlassBackground from './GlassBackground';
import collegeLogo from '../assets/logo/college.png';
import ICCDSNav from './ICCDSNav';

/* ── Keynote Speaker Photos ──────────────────────────────────────── */
import photoPadma from './photo/padma_deepika.jpg';
import photoFarha from './photo/farha_haider.jpg';
import photoSriram from './photo/sriram_subramanian.jpg';
import photoArthi from './photo/arthi_nagarajan.jpg';
import photoChandrika from './photo/chandrika_kadirvel_mani.jpg';
import photoAshwini from './photo/ashwini_rajaram.png';
import photoPavithra from './photo/pavithra_gunasekaran.jpg';
import photoNandakumar from './photo/Nandakumar Kuthalaraja.jfif';
import photoSathishkumar from './photo/Dr Sathishkumar.webp';
import photoSumendra from './photo/Dr. Sumendra.jpeg';
import photoGeorge from './photo/George Ghinea.jpg';
import photoJey from './photo/Jeyakesavan.png';
import photoDivyanshi from './photo/Divyanshi Kothari.jfif';
import photoVinod from './photo/Vinod Balachandran.jfif';

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
const EVENT_DATE = new Date('2026-10-09T09:00:00+05:30');

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

            <motion.div className="iccds-splash-overlay top" exit={{ y: '-100%' }} transition={{ duration: 1, ease }} />
            <motion.div className="iccds-splash-overlay bot" exit={{ y: '100%' }} transition={{ duration: 1, ease }} />
        </motion.div>
    );
};

/* ══════════════════════════════════════════════════════════════════ */
const ICCDSHome = () => {
    const [showSplash, setShowSplash] = useState(true);
    const [activeAboutTab, setActiveAboutTab] = useState(0);
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
    const ease = [0.16, 1, 0.3, 1];

    useEffect(() => {
        if (showSplash) document.body.style.overflow = 'hidden';
        else document.body.style.overflow = '';
        return () => { document.body.style.overflow = ''; };
    }, [showSplash]);

    const scrollTo = (id) => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
    };

    const stagger = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
    const fadeUp = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease } } };
    const yPar = useTransform(scrollYProgress, [0, 0.25], [0, 100]);

    return (
        <div className="iccds-page">
            <GlassBackground />
            <motion.div className="iccds-scroll-progress" style={{ scaleX }} />

            <AnimatePresence>
                {showSplash && <SplashScreen onComplete={() => setShowSplash(false)} />}
            </AnimatePresence>

            <ICCDSNav />

            <main>
                {/* ═══ HERO ═══ */}
                <section id="home" className="iccds-hero">
                    <div className="iccds-hero-bg-wrapper">
                        <div className="iccds-hero-tech-grid"></div>
                        <div className="iccds-hero-shape iccds-shape-circle"></div>
                        <div className="iccds-hero-shape iccds-shape-square"></div>
                        <div className="iccds-hero-shape iccds-shape-cross">+</div>
                    </div>
                    <motion.div style={{ y: yPar }} className="iccds-hero-inner">

                        {/* Main conference name */}
                        <motion.div className="iccds-hero-conf-name"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.35, ease }}
                        >
                            <span className="iccds-hero-conf-label iccds-hero-conf-label-lg">3<sup>rd</sup> International Conference on</span>
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

                        <motion.div 
                            className="iccds-hero-organizer"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.85, ease }}
                        >
                            Organized by Department of Computer Science and Engineering
                        </motion.div>

                        {/* Moved badges below ICCDS-2026 */}
                        <motion.div className="iccds-hero-badges"
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 1, ease }}
                        >
                            <span className="iccds-badge iccds-badge-record"><Award size={16} /> IEEE Conference Record #69942</span>
                            <span className="iccds-badge iccds-badge-accent"><Globe size={13} /> Technically Sponsored by IEEE Madras Section</span>
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
                                    <span className="iccds-info-val">October 9–10, 2026</span>
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
                            <button onClick={() => scrollTo('timeline')} className="iccds-btn-primary">
                                Important Dates <ArrowRight size={18} />
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
                            <h2 className="iccds-sect-title no-line">ABOUT CONFERENCE</h2>
                        </SlideReveal>

                        <div className="iccds-about-frame-wrapper">
                            <div className="iccds-about-tabs">
                                {['Conference', 'College', 'Department'].map((tab, idx) => (
                                    <button 
                                        key={tab}
                                        className={`iccds-about-tab ${activeAboutTab === idx ? 'active' : ''}`}
                                        onClick={() => setActiveAboutTab(idx)}
                                    >
                                        <span className="iccds-about-tab-num">0{idx + 1}</span>
                                        <span className="iccds-about-tab-text">{tab}</span>
                                        {activeAboutTab === idx && (
                                            <motion.div layoutId="activeTab" className="iccds-about-tab-bg" />
                                        )}
                                    </button>
                                ))}
                            </div>

                            <div className="iccds-about-frame">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={activeAboutTab}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                                        className="iccds-about-content"
                                    >
                                        <div className="iccds-about-content-header">
                                            <span className="iccds-about-content-num">0{activeAboutTab + 1}</span>
                                            <h3>About {activeAboutTab === 0 ? 'Conference' : activeAboutTab === 1 ? 'College' : 'Department'}</h3>
                                        </div>
                                        <p className="iccds-about-text">
                                            {activeAboutTab === 0 && "International Conference on Computing and Data Science (ICCDS-2026) is the platform where academicians and industry research present their contemporary findings so that new inclinations and thoughts on computing and data science can be explored. The key objective is to offer the participants all over the nation to share their ideas and experience with peers. Eminent personalities from various industries have consented to be part of this conference by delivering special lectures on recent advanced topics."}
                                            {activeAboutTab === 1 && "Rajalakshmi Engineering College, an Autonomous institution affiliated to Anna University, Chennai, was established in the year 1997 under the aegis of Rajalakshmi Educational Trust whose members have had consummate experience in the fields of education and industry. The College has grown from strength to strength in the last 25 years and progressing towards Excellence in Engineering Education, Research and Development. The College presently offers 19 Undergraduate and 11 Post Graduate programmes."}
                                            {activeAboutTab === 2 && "Since its inception in 1997, the Department of Computer Science and Engineering has been continuously making progress in teaching and R&D activities. The Department was recognized as Collaborative Research Centre by Anna University to offer M.S. (by research) and Ph.D. programmes. The Department has entered into an MoU with IBM, Infosys, TCS, Zoho, Virtusa, Pega, Oracle, Wipro, VMWare, UiPath, Dell, Cognizant, AWS, U.S. Technologies and many other renowned software companies for software training and Faculty Development Programmes, besides R&D activities."}
                                        </p>
                                        <div className="iccds-about-decoration">
                                            <div className="iccds-about-dot" />
                                            <div className="iccds-about-line" />
                                        </div>
                                    </motion.div>
                                </AnimatePresence>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ═══ CALL FOR PAPERS ═══ */}
                <section id="topics" className="iccds-sect iccds-sect-alt">
                    <div className="iccds-container">
                        <SlideReveal>
                            <h2 className="iccds-sect-title no-line">CALL FOR PAPERS</h2>
                            <p className="iccds-desc" style={{ margin: '0 auto 50px' }}>
                                Original unpublished technical papers, articles, and working papers on topics related to the theme of the conference are invited for presentation and publication. Topics of interest include, but are not limited to:
                            </p>
                        </SlideReveal>

                        <motion.div className="iccds-tracks-grid"
                            initial="hidden" whileInView="visible"
                            viewport={{ once: true, margin: '-60px' }}
                            variants={stagger}
                        >
                            {[
                                { title: 'AI & Computing', icon: <Award size={28} />, items: ['Artificial Intelligence', 'Machine Learning', 'Deep Learning', 'Natural language Processing', 'Human Computer Interaction'] },
                                { title: 'Data Science & Analytics', icon: <Globe size={28} />, items: ['Data Science', 'Big Data Analytics', 'Medical Image Processing', 'Digital Image Processing', 'Virtual Reality & Augmented Reality'] },
                                { title: 'Cloud & Distributed', icon: <Users size={28} />, items: ['Cloud Computing', 'Distributed Computing', 'Mobile & Pervasive Computing', 'Internet of Things', 'Green Computing'] },
                                { title: 'Networks & Security', icon: <Shield size={28} />, items: ['Information and Data Security', 'Smart Networking', 'Adhoc Networks', 'Wireless Sensor Networks', 'Network & Data Security', 'Network Protocols, QOS'] },
                            ].map((track, idx) => (
                                <motion.div key={idx} variants={fadeUp} className="iccds-track-card-new">
                                    <div className="iccds-track-header">
                                        <div className="iccds-track-icon-wrap">
                                            {track.icon}
                                        </div>
                                        <h4>{track.title}</h4>
                                    </div>
                                    <div className="iccds-track-list-wrap">
                                        <ul className="iccds-track-list">
                                            {track.items.map(item => <li key={item}>{item}</li>)}
                                        </ul>
                                    </div>
                                    <div className="iccds-track-number">0{idx + 1}</div>
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
                            <h2 className="iccds-sect-title no-line">IMPORTANT DATES</h2>
                        </SlideReveal>

                        <div className="iccds-timeline-wrapper">
                            {[
                                { step: '01', date: 'Aug 10', label: 'Full Paper Submission', icon: <Mail size={22} /> },
                                { step: '02', date: 'Sept 1', label: 'Acceptance Notification', icon: <Award size={22} /> },
                                { step: '03', date: 'Sept 20', label: 'Registration Closes', icon: <Users size={22} /> },
                                { step: '04', date: 'Sept 20', label: 'Final Camera Ready Paper Submission', icon: <FileText size={22} /> },
                                { step: '05', date: 'Oct 9–10', label: 'Conference Dates', icon: <Globe size={22} />, highlight: true },
                            ].map((item, idx) => (
                                <motion.div key={idx}
                                    className={`iccds-timeline-card ${item.highlight ? 'highlight' : ''}`}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.12 }}
                                >
                                    <div className="iccds-timeline-icon-box">
                                        {item.icon}
                                    </div>
                                    <div className="iccds-timeline-step-num">{item.step}</div>
                                    <div className="iccds-timeline-date">{item.date}</div>
                                    <div className="iccds-timeline-label">{item.label}</div>
                                    {idx < 4 && <div className="iccds-timeline-arrow"><ArrowRight size={16} /></div>}
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
                            <h2 className="iccds-sect-title no-line">COMMITTEE</h2>
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
                                        { name: 'Dr. C.R. Muthukrishnan', role: 'Advisor, Rajalakshmi Institutions' },
                                        { name: 'Dr. S.N. Murugesan', role: 'Principal, Rajalakshmi Engineering College' },
                                        { name: 'Dr. S.P. Srinivasan', role: 'Vice Principal, Rajalakshmi Engineering College' },
                                        { name: 'Dr. K. Malathi', role: 'Dean - Academics, Rajalakshmi Engineering College' },
                                        { name: 'Dr. P. Sakthivel', role: 'Chairman, IEEE Madras Section' },
                                        { name: 'Dr. J. Manoranjini', role: 'HOD, Department of CSE, Rajalakshmi Engineering College' },
                                    ]
                                },
                                {
                                    title: 'Convener',
                                    members: [
                                        { name: 'Dr. P. Kumar', role: 'Professor, Department of CSE' },
                                    ],
                                    coordinators: [
                                        { name: 'Dr. K. Ananthajothi', role: 'Professor, Department of CSE, Rajalakshmi Engineering College' },
                                        { name: 'Dr. N. Duraimurugan', role: 'Associate Professor, Department of CSE, Rajalakshmi Engineering College' },
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
                                    {group.coordinators && (
                                        <>
                                            <div className="iccds-comm-divider" />
                                            <h5>Coordinators</h5>
                                            {group.coordinators.map(m => (
                                                <div key={m.name} className="iccds-member">
                                                    <span className="iccds-member-name">{m.name}</span>
                                                    <span className="iccds-member-role">{m.role}</span>
                                                </div>
                                            ))}
                                        </>
                                    )}
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </section>

                {/* ═══ TECHNICAL COMMITTEE ═══ */}
                <section className="iccds-sect">
                    <div className="iccds-container">
                        <SlideReveal>
                            <h2 className="iccds-sect-title no-line">TECHNICAL COMMITTEE</h2>
                        </SlideReveal>
                        <div className="iccds-comm-frame">
                            <div className="iccds-comm-list-grid">
                                {[
                                    "Dr. V. Nagarajan, Professor, Pondicherry University, Puducherry, India",
                                    "Dr. A. Kandasamy, Professor, National Institute of Technology, Karnataka, India",
                                    "Dr. A. Amuthan, Professor and Associate Dean, Pondicherry Technological University, India",
                                    "Dr. Subhash Chandra Yadav, Professor & Head, Central University of Jharkhand, Ranchi, India",
                                    "Dr. Brojo Kishore Mishra, Professor, NIST Institute of Science and Technology, Berhampur Odisha, India",
                                    "Dr. B. Surendiran, Associate Dean, NIT Puducherry, India",
                                    "Dr. Durgesh Mishra, Director & Campus Director, Symbiosis University of Applied Sciences, India"
                                ].map((name, i) => (
                                    <motion.div key={i} className="iccds-comm-item-simple"
                                        initial={{ opacity: 0, y: 10 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.05 }}
                                    >
                                        <div className="iccds-comm-dot" />
                                        <span>{name}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* ═══ ORGANIZING COMMITTEE ═══ */}
                <section className="iccds-sect iccds-sect-alt">
                    <div className="iccds-container">
                        <SlideReveal>
                            <h2 className="iccds-sect-title no-line">ORGANIZING COMMITTEE</h2>
                        </SlideReveal>
                        <div className="iccds-comm-frame">
                            <div className="iccds-comm-list-grid">
                                {[
                                    "Dr. V. Murali Bhaskaran, Professor, Department of CSE, Rajalakshmi Engineering College",
                                    "Dr. S. Anantha Sivaprakasam, Professor, Department of CSE, Rajalakshmi Engineering College",
                                    "Dr. N. Srinivasan, Professor, Department of CSE, Rajalakshmi Engineering College",
                                    "Dr. R. Sabitha, Professor, Department of CSE, Rajalakshmi Engineering College",
                                    "Dr. P. Muneehswari, Professor, Department of CSE, Rajalakshmi Engineering College",
                                    "Dr. C Parthasarathy, Professor, Department of CSE, Rajalakshmi Engineering College",
                                    "Dr. K. Anand, Professor, Department of CSE, Rajalakshmi Engineering College",
                                    "Dr. Chettiyar Vani Vivekanand, Professor, Department of CSE, Rajalakshmi Engineering College",
                                    "Dr. E.M. Malathy, Professor, Department of CSE, Rajalakshmi Engineering College"
                                ].map((name, i) => (
                                    <motion.div key={i} className="iccds-comm-item-simple"
                                        initial={{ opacity: 0, y: 10 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.05 }}
                                    >
                                        <div className="iccds-comm-dot" />
                                        <span>{name}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* ═══ ADVISORY COMMITTEE ═══ */}
                <section className="iccds-sect">
                    <div className="iccds-container">
                        <SlideReveal>
                            <h2 className="iccds-sect-title no-line">ADVISORY COMMITTEE</h2>
                        </SlideReveal>
                        <div className="iccds-advisory-frame-grid">
                            <SlideReveal delay={0.1} className="iccds-advisory-col-frame">
                                <h4 className="iccds-advisory-subtitle">International</h4>
                                <div className="iccds-advisory-list">
                                    {[
                                        "Dr. Shuai Li, Associate Professor, Swansea University, UK",
                                        "Dr. Stephen Olatundeolabiyisi, Professor, LadokeAkintola University, Nigeria",
                                        "Dr. Joy Long-Zhong Chen, Professor, Brunel University, London",
                                        "Dr. Neda Azizi, Senior Lecturer, Torrens University, Australia",
                                        "Dr. Bhadrachalam Chitturi, Associate Professor, The University of Texas at Dallas, USA",
                                        "Dr. Yu Xiang, Assistant Professor, The University of Texas at Dallas, USA",
                                        "Dr. John Cole, Senior Lecturer, The University of Texas at Dallas, USA",
                                        "Dr. Kinshuk, Dean, The University of North Texas, USA",
                                        "Dr. Saif Aldeen Saad Alkadhim, Assistant Lecturer, Xian Jiatong University, Xian, China",
                                        "Dr. Maleika Heenaye-Mamode Khan, Associate Professor, University of Mauritius, Africa",
                                        "Dr. Fatma Sayed Gadelrab, Associate Professor, Helwan University, Cairo, Egypt"
                                    ].map((name, i) => <div key={i} className="iccds-advisory-item"><span>{name}</span></div>)}
                                </div>
                            </SlideReveal>
                            <SlideReveal delay={0.2} className="iccds-advisory-col-frame">
                                <h4 className="iccds-advisory-subtitle">National</h4>
                                <div className="iccds-advisory-list">
                                    {[
                                        "Dr. T. Shanmuganantham, Vice Chairman(Academics), IEEE Madras Section",
                                        "Dr. Ramalatha Marimuthu, Vice Chairman (Industry), IEEE Madras Section",
                                        "Dr. R. Radha, Secretary, IEEE Madras Section & Principal, SSN College of Engineering, Chennai, India",
                                        "Dr. S. Brindha, Treasurer, IEEE Madras Section",
                                        "Dr. M. Palanivelan, IEEE-Student Branch Counsellor, REC",
                                        "Dr. S. Joseph Gladwin, BigCat Wireless Pvt. Ltd., IIT Madras Research Park, Chennai, India",
                                        "Dr. R. Murugan, Associate Professor, NIT Silchar, India",
                                        "Dr. B. Surendiran, Associate Dean, NIT Puducherry, India",
                                        "Dr. V.D. Ambeth Kumar, Associate Professor, Mizoram University, India",
                                        "Dr. R. Saminathan, Associate Professor, Annamalai University, India",
                                        "Dr. M.D. Selvaraj, Associate Professor, IIITDM, Kancheepuram, India",
                                        "Dr. G. Kumaravelan, Associate Professor, Pondicherry University, Pondicherry, India"
                                    ].map((name, i) => <div key={i} className="iccds-advisory-item"><span>{name}</span></div>)}
                                </div>
                            </SlideReveal>
                        </div>
                    </div>
                </section>

                {/* ═══ REVIEWERS ═══ */}
                <section className="iccds-sect iccds-sect-alt">
                    <div className="iccds-container">
                        <SlideReveal>
                            <h2 className="iccds-sect-title no-line">REVIEWERS</h2>
                        </SlideReveal>
                        <div className="iccds-advisory-frame-grid">
                            <SlideReveal delay={0.1} className="iccds-advisory-col-frame">
                                <h4 className="iccds-advisory-subtitle">International</h4>
                                <div className="iccds-advisory-list" style={{ maxHeight: '500px', overflowY: 'auto', paddingRight: '10px' }}>
                                    {[
                                        "Dr. A. Rajalingam, University of Technology and applied sciences – Shinas, Oman",
                                        "Dr. Hussam Ali, COMSATS University Islamabad (CUI), Pakistan",
                                        "Dr. George Livanos, Technical University of Crete, Greece",
                                        "Dr. Alberto Cano, Virginia Commonwealth University, USA",
                                        "Dr. Bhadrachalam Chitturi, The University of Texas at Dallas",
                                        "Dr. Thar Baker, University of Brighton, UK",
                                        "Dr. Tu N. Nguyen, Kennesaw State University, USA",
                                        "Dr. Dana Petcu, West University of Timisoara, Romania",
                                        "Dr. Utku Kose, Suleyman Demirel University, Turkey",
                                        "Dr. Shahab S Band, National Yunlin University of Science and Technology, Taiwan",
                                        "Dr. Khalid Al-Hussaini, Univ. of Sultan ZainalAbidin (UniSZA), Malaysia",
                                        "Dr. John Cole, The University of Texas at Dallas",
                                        "Dr. Gong Cheng, Northwestern Polytechnical University in Shenzhen, China",
                                        "Dr. Inês Domingues, Instituto Politécnico de Coimbra, Portugal",
                                        "Dr. Abiel Aguilar-González, Polytechnic University of Chiapas, Mexico",
                                        "Dr. Shuai Li, Swansea University, United Kingdom",
                                        "Dr. Mohammed Elmogy, Mansoura University, Egypt",
                                        "Dr. Yu Xiang, The University of Texas at Dallas",
                                        "Dr. Binh P. Nguyen, Victoria University of Wellington (VUW), New Zealand",
                                        "Dr. Karl Andersson, Luleå University of Technology (LTU), Sweden",
                                        "Dr. Azeem Irshad, International Islamic University, Islamabad, Pakistan",
                                        "Dr. Bestoun S. Ahmed, Karlstad University, Sweden",
                                        "Dr. Nima Jafari Navimipour, Islamic Azad University, Tabriz, Iran",
                                        "Dr. Neeraj Mittal, The University of Texas at Dallas",
                                        "Dr. Hong Jiang, The University of Texas at Arlington",
                                        "Dr. Md. Shohel Sayeed, Multimedia University, Malaysia",
                                        "Dr. Joao Manuel R. S. Tavares, Universidade do Porto (FEUP), Portugal",
                                        "Dr. Ibrahiem M.M. El Emary, King Abdulaziz University, Saudi Arabia",
                                        "Dr. A. Paul, Kyungpook National University, South Korea",
                                        "Dr. Dilip Mali, Mekelle University, Ethiopia",
                                        "Dr. Kasun De Zoysa, University of Colombo, Srilanka",
                                        "Dr. Mgr. Silvester Czanner, Liverpool John Moores University, UK",
                                        "Dr. Peter Chapman, Edinburgh Napier University, UK",
                                        "Dr. Martyn Amos, Northumbria University",
                                        "Dr. Nicholas Costen, Manchester Metropolitan University, UK",
                                        "Dr. Kurt Debattista, University of Warwick, United Kingdom",
                                        "Dr. Gheorghita Ghinea, Brunel University, United Kingdom",
                                        "Dr. Celestine Iwendi, Central South University of Forestry and Technology, China",
                                        "Dr. Lipo Wang, Nanyang Technological University, Singapore",
                                        "Dr. You-Wing Leung, Hongkong Baptist University, Hongkong"
                                    ].map((name, i) => <div key={i} className="iccds-advisory-item"><span>{name}</span></div>)}
                                </div>
                            </SlideReveal>
                            <SlideReveal delay={0.2} className="iccds-advisory-col-frame">
                                <h4 className="iccds-advisory-subtitle">National</h4>
                                <div className="iccds-advisory-list" style={{ maxHeight: '500px', overflowY: 'auto', paddingRight: '10px' }}>
                                    {[
                                        "Dr. B. Surendiran, National Institute of Technology, Puducherry",
                                        "Dr. M. Sivabalakrishnan, Vellore Institute of Technology, Chennai",
                                        "Dr. S.P. Chokkalingam, Amrita Vishwa Vidyapeetham, Chennai",
                                        "Dr. S.N. Sangeetha, Bannari Amman Institute of Technology, Erode",
                                        "Dr. M. Mohamed Iqbal, Vellore Institute of Technology, Amaravathi",
                                        "Dr. P. Gururama Senthilvel, Saveetha School of Engineering, Chennai",
                                        "Dr. R. Venkatesan, Karunya Institute of Science and Technology, Coimbatore",
                                        "Dr. M. Subramaniam, Chaitanya Bharathi Institute of Technology, Hyderabad",
                                        "Dr. D. Divya, Jerusalem College of Engineering, Chennai",
                                        "Dr. S. Meera, Vels Institute Science and Technology, Chennai",
                                        "Dr. S. Saravanan, Saveetha School of Engineering, Chennai",
                                        "Dr. S. Udayakumar, Amrita Vishwa Vidyapeetham, Chennai",
                                        "Dr. M. Sangeetha, SRM Institute of Science & Technology, Chennai",
                                        "Dr. S. Jagadeesan, Vellore Institute of Technology",
                                        "Dr. R. Saminathan, Annamalai University, Chidambaram",
                                        "Dr. Kiruthiga Devi M, Dr. M.G.R. Educational and Research Institute, Chennai",
                                        "Dr. Parthasarathy R, Vel Tech Rangarajan Dr. Sagunthala R&D Institute of Science and Technology, Chennai",
                                        "Dr. Bharathi V C, Vellore Institute of Technology, Amaravathi",
                                        "Dr. Santhosh R, Karpagam Academy of Higher Education",
                                        "Dr. S. Nagendra Prabhu, SRM Institute of Science & Technology, Chennai",
                                        "Dr. S. Chakaravarthy, Panimalar College of Engineering, Chennai",
                                        "Dr. C. Govindasamy, Saveetha School of Engineering, Chennai",
                                        "Dr. J. Jayalakshmi, Amrita Vishwa Vidyapeetham, Chennai",
                                        "Dr. M. Kavitha, Vel Tech Rangarajan Dr. Sagunthala R&D Institute of Science and Technology, Chennai",
                                        "Dr. N. Saravanan, Misrimal Navajee Munoth Jain Engineering College, Chennai",
                                        "Dr. K. Sudharson, RMD College of Engineering",
                                        "Dr. Sheela Jayachandran, Vellore Institute of Technology, Amaravathi",
                                        "Dr. A. Moorthy, Easwari Engineering College, Ramapuram",
                                        "Dr. P V Gopirajan, SRM Institute of Science & Technology, Chennai",
                                        "Dr. A. Pandiyaraj, SRM Institute of Science & Technology, Chennai",
                                        "Dr. R. Thiagarajan, Prathyusha Engineering College",
                                        "Dr. A. Senthilselvi, SRM Institute of Science & Technology, Ramapuram",
                                        "Dr. C. Sivasankar, Saveetha Institute of Medical and Technical Sciences",
                                        "Dr. T.R. Ganesh Babu, Muthayammal Engineering College, Namakkal",
                                        "Dr. P. Valarmathie, RMK College of Engineering and Technology",
                                        "Dr. M. Anbarasan, Chennai Institute of Technology",
                                        "Dr. M.C. Babu, Chennai Institute of Technology",
                                        "Dr. G. Nagappan, Saveetha Engineering College",
                                        "Dr. S. Sasikumar, Saveetha Engineering College",
                                        "Dr. B. Muthu Senthil, SRM Valliammai Engineering College",
                                        "Dr. M. Murugan, SRM Valliammai Engineering College",
                                        "Dr. A. Vijayaraj, RMK Engineering College",
                                        "Dr. K. Priya, SRM Institute of Science and Technology, Ramapuram",
                                        "Dr. S. Saravanan, Builder Engineering College",
                                        "Dr. R. Loganathan, Paavai Engineering College",
                                        "Dr. J. Nandha Gopal, Velammal Institute of Technology",
                                        "Dr. A. Anitha Rani, Excel Engineering College",
                                        "Dr. G. Gnana Priya, Ramco Institute of Technology",
                                        "Dr. Pankaj Dadheech, Swami Keshvanand Institute of Technology, Jaipur",
                                        "Dr. R. Gangai Selvi, Agrl. Engg. College & RI",
                                        "Dr. S. Nalini, SRM Institute of Science & Technology, Chennai",
                                        "Dr. Mohit Tiwari, Bharati Vidyapeeth’s College of Engineering, Delhi",
                                        "Dr. E Bhuvaneswari, Chennai Institute of Technology",
                                        "Dr. Prajakta Yawalkar, Christ University",
                                        "Dr. Ambika, St. Francis College",
                                        "Dr. S. Russia, Velalar College of Engineering and Technology, Erode",
                                        "Dr. Payal Bansal, Poornima College of Engineering, Jaipur",
                                        "Dr. G Revathy, SASTRA DEEMED UNIVERSITY",
                                        "Dr. Vaibhav C. Gandhi, Charotar University of Science & Technology",
                                        "Dr. Sabyasachi Pramanik, Haldia Institute of Technology",
                                        "Dr. Ameer Rashed Khan, The New College",
                                        "Dr. Khaja Mannanuddin, SR University",
                                        "Dr. N. Ananthi, Easwari Engineering College, Ramapuram",
                                        "Dr. A. Muthulakshmi, Sathyabama Institute of Science and Technology, Chennai",
                                        "Dr. R. Sivakami, Vellore Institute of Technology, Chennai",
                                        "Dr. G. Subathra, Sathyabama Institute of Science and Technology, Chennai",
                                        "Dr. K. Kalaivani, Vels Institute Science and Technology, Chennai",
                                        "Dr. Rupali Atul Mahajan, Vishwakarma Institute of Information Technology, Pune",
                                        "Dr. Ashutosh Gaur, Mangalmay Institute of Management and Technology",
                                        "Dr. T. Gunasekar, Vel Tech Rangarajan Dr. Sagunthala R&D Institute of Science and Technology, Chennai",
                                        "Dr. J. Raja, Adhiparasakthi Engineering College, Chennai",
                                        "Dr. R. Pitchai, B V Raju Institute of Technology, Telangana",
                                        "Dr. M. Malathi, Adhiparasakthi Engineering College, Chennai",
                                        "Dr. Prashant Kumar Shukla, KL University, Andhra Pradesh",
                                        "Dr. G. Gangadevi, SRM Institute of Science & Technology, Chennai",
                                        "Dr. P. Chinnasamy, MLR Institute of Technology, Hyderabad"
                                    ].map((name, i) => <div key={i} className="iccds-advisory-item"><span>{name}</span></div>)}
                                </div>
                            </SlideReveal>
                        </div>
                    </div>
                </section>

                {/* ═══ KEYNOTE SPEAKERS ═══ */}
                <section id="speakers" className="iccds-sect">
                    <div className="iccds-container">
                        <SlideReveal>
                            <h2 className="iccds-sect-title no-line">KEYNOTE SPEAKERS</h2>
                        </SlideReveal>
                        <motion.div className="iccds-speaker-grid"
                            initial="hidden" whileInView="visible"
                            viewport={{ once: true, margin: '-60px' }}
                            variants={stagger}
                        >
                            {[
                                { name: 'Prof. Dr. George Ghinea', role: 'Professor of Mulsemedia Computing | Director of Research | Department of Computer Science', org: 'Brunel University London', location: 'London, United Kingdom', photo: photoGeorge },
                                { name: 'Dr. Jey Veerasamy', role: 'Director of Center for CS Education & Outreach | Professor of Instruction | UT Dallas CS', org: 'University of Texas at Dallas', location: 'United States of America', photo: photoJey },
                                { name: 'Dr. Sumendra Yogarayan', role: 'Assistant Professor | TTT Certified Trainer | Professional Technologist (Ts.)', org: 'Multimedia University', location: 'Malacca, Malaysia', photo: photoSumendra },
                                { name: 'Padma Deepika N.', role: 'Senior Software Engineer at Apple — Product Integrity Hardware Engineering | Full-Stack Engineer | AI-Enabled Developer Tooling', org: 'Apple', location: 'Austin, Texas, USA', photo: photoPadma },
                                { name: 'Vinod Balachandran', role: 'Software Engineer at Microsoft', org: 'Microsoft', location: 'Greater Seattle Area', photo: photoVinod },
                                { name: 'Farha Haider', role: 'AI ML Developer @ Nokia | MEng @ McMaster University | Machine Learning | ex-Senior Software Engineer @ Tiger Analytics', org: 'Nokia', location: 'Canada', photo: photoFarha },
                                { name: 'Dr. Sathishkumar V E', role: 'Senior Lecturer in Data Science & AI | Healthcare AI, Data Mining, Blockchain & Predictive Modelling | Computer Scientist | Academic Innovator | Journal Editor', org: 'Sunway University', location: 'Subang Jaya, Selangor, Malaysia', photo: photoSathishkumar },
                                { name: 'Sriram Subramanian', role: 'Senior Member of Technical Staff @ Oracle Cloud Infrastructure / OCI', org: 'Oracle', location: 'Issaquah, Washington, USA', photo: photoSriram },
                                { name: 'Arthi Nagarajan', role: 'Senior Software Engineer at Microsoft', org: 'Microsoft', location: 'Austin, Texas, USA', photo: photoArthi },
                                { name: 'Chandrika Kadirvel Mani', role: 'AI Principal Architect @ Google | Leading APAC\'s Agentic AI Revolution | Scaling Multi-Agent Systems & Responsible GenAI Strategy for Google Cloud Enterprise Customers', org: 'Google', location: 'Singapore', photo: photoChandrika },
                                { name: 'Divyanshi Kothari', role: 'Software Engineer @ Apple | AI & Data Platforms', org: 'Apple', location: 'San Francisco Bay Area', photo: photoDivyanshi },
                                { name: 'Ashwini Rajaram', role: 'Applied AI Research | LLMs, RAG, Agentic AI | Master\'s Machine Learning @ UdeM, MILA Quebec AI', org: 'TD', location: 'Montreal, Canada', photo: photoAshwini },
                                { name: 'Pavithra Gunasekaran', role: 'MBA (Finance & Marketing) | Aspiring Marketing Strategist | PR Lead @ Yukthi Management Club | Ex-Senior Finance Associate | 3+ Years in Data Analysis & Financial Operations | SEO', org: 'Savancys Inc', location: 'Chennai, India', photo: photoPavithra },
                                { name: 'Nandakumar Kuthalaraja', role: 'Senior Principal Architect @ Northern Trust | TOGAF Certified Enterprise Architect | MS Candidate @ University of Arizona', org: 'Northern Trust', location: 'USA', photo: photoNandakumar },
                            ].map((speaker, idx) => (
                                <motion.div key={idx} variants={fadeUp} className="iccds-speaker-card full-photo-card">
                                    <div className="iccds-speaker-bg">
                                        {speaker.photo ? (
                                            <img src={speaker.photo} alt={speaker.name} className="iccds-speaker-full-img" />
                                        ) : (
                                            <div className="iccds-speaker-full-placeholder"><Users size={60} /></div>
                                        )}
                                        <div className="iccds-speaker-overlay-base">
                                            <h4>{speaker.name}</h4>
                                            <p className="iccds-speaker-org-tag">{speaker.org}</p>
                                        </div>
                                    </div>
                                    
                                    <div className="iccds-speaker-hover-reveal">
                                        <div className="iccds-speaker-reveal-inner">
                                            <span className="iccds-reveal-label">Expertise</span>
                                            <p className="iccds-speaker-full-role">{speaker.role}</p>
                                            <div className="iccds-speaker-loc-tag">
                                                <MapPin size={12} /> {speaker.location}
                                            </div>
                                        </div>
                                    </div>
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
                                </div>
                                <p className="iccds-footer-tagline">
                                    3<sup>rd</sup> International Conference on Computing and Data Science (ICCDS-2026)
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
