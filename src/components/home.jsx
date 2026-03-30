import React, { useEffect, useState, useRef, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Particles from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import './home.css';
import Navbar from './Navbar';

import heroBg from '../assets/background.png';
import ieeeLogo from '../assets/logo/ieee_cs.png';
import recLogo from '../assets/logo/college.png';
import iccds from '../assets/events/ICCDS.JPG';
import techtopia from '../assets/events/techtopia.png';
import xyntra from '../assets/events/xyntra.JPG';
import promptIq from '../assets/events/prompt-iq.JPG';

/* ─── Animated stat counter sub-component (rules-of-hooks safe) ─── */
const StatCounter = ({ target, suffix, label, start }) => {
    const [count, setCount] = useState(0);
    useEffect(() => {
        if (!start) return;
        let startTime = null;
        const duration = 1800;
        const step = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            setCount(Math.floor(progress * target));
            if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
    }, [start, target]);

    return (
        <div className="stat-item">
            <span className="stat-num">{count}{suffix}</span>
            <span className="stat-label">{label}</span>
        </div>
    );
};

/* ─── Data ─── */
const stats = [
    { value: 12, suffix: '+', label: 'Annual Events' },
    { value: 45, suffix: '+', label: 'Active Members' },
    { value: 6, suffix: '+', label: 'Years Active' },
    { value: 25, suffix: '+', label: 'Workshops' },
];

const featuredEvents = [
    {
        image: techtopia,
        tag: 'Flagship',
        title: 'Techtopia',
        desc: 'Our mega annual tech event — competitions, exhibitions, and industry talks all under one roof.',
    },
    {
        image: xyntra,
        tag: 'Competition',
        title: 'XYNTRA 2.0',
        desc: 'A high-stakes technical quiz and debugging challenge pushing students beyond their limits.',
    },
    {
        image: promptIq,
        tag: 'Workshop',
        title: 'Prompt IQ',
        desc: 'Hands-on AI prompt engineering training — learn to speak the language of large language models.',
    },
];

const pillars = [
    { icon: 'fas fa-code', title: 'Technical Skills', desc: 'Workshops, hackathons and live projects to make you industry-ready.' },
    { icon: 'fas fa-users', title: 'Strong Community', desc: 'A network of 45+ driven students who push each other to excel.' },
    { icon: 'fas fa-globe', title: 'Global Access', desc: "Direct connection to IEEE's worldwide professional network." },
];

const domains = [
    { icon: 'fas fa-globe', title: 'Web Team', desc: 'Develop and maintain responsive websites and web platforms for seamless user experiences.' },
    { icon: 'fas fa-calendar-alt', title: 'Event Management', desc: 'Plan, organize, and execute events efficiently, ensuring smooth coordination and engagement.' },
    { icon: 'fas fa-bullhorn', title: 'Public Relations', desc: 'Handle communications, outreach, and build strong relationships with external audiences.' },
    { icon: 'fas fa-paint-brush', title: 'Design Team', desc: 'Create visually compelling graphics, branding, and design assets for various platforms.' },
    { icon: 'fas fa-photo-video', title: 'Media Team', desc: 'Capture, edit, and produce high-quality photos and videos for promotions and documentation.' },
    { icon: 'fas fa-pen-nib', title: 'Content Team', desc: 'Write, curate, and manage engaging content for social media, blogs, and campaigns.' },
    { icon: 'fas fa-robot', title: 'ML Team', desc: 'Work on machine learning models, data analysis, and AI-driven solutions.' },
    { icon: 'fas fa-mobile-alt', title: 'App Team', desc: 'Design and develop mobile applications with smooth performance and great user experience.' },
];

const Home = () => {
    const [statsVisible, setStatsVisible] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const statsRef = useRef(null);
    const location = useLocation();
    const particlesInit = useCallback(async (engine) => { await loadSlim(engine); }, []);

    // Close mobile menu on route change
    useEffect(() => { setMobileMenuOpen(false); }, [location]);

    // Lock body scroll when mobile menu is open
    useEffect(() => {
        document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [mobileMenuOpen]);

    useEffect(() => {
        AOS.init({ duration: 900, easing: 'ease-out-quart', once: true, offset: 80 });

        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setStatsVisible(true); },
            { threshold: 0.3 }
        );
        if (statsRef.current) observer.observe(statsRef.current);
        return () => observer.disconnect();
    }, []);

    const particlesOptions = {
        particles: {
            number: { value: 45, density: { enable: true, area: 1000 } },
            color: { value: '#FFA300' },
            shape: { type: 'circle' },
            opacity: { value: 0.22, random: true },
            size: { value: 2, random: true },
            links: { enable: true, distance: 160, color: '#FFA300', opacity: 0.07, width: 1 },
            move: { enable: true, speed: 1.0, direction: 'none', random: true, outModes: 'out' },
        },
        interactivity: {
            events: { onHover: { enable: true, mode: 'grab' }, resize: true },
            modes: { grab: { distance: 150, links: { opacity: 0.25 } } },
        },
        retina_detect: true,
    };

    return (
        <div className="home-wrap">
            <Navbar />

            <div id="particles-js">
                <Particles id="tsparticles" init={particlesInit} options={particlesOptions} />
            </div>

            {/* ══════════════════════════ HERO ══════════════════════════ */}
            <section className="hero-section" id="home">

                {/* ── DESKTOP: right-panel background image ── */}
                <div
                    className="hero-visual-col"
                    data-aos="fade-in"
                    data-aos-duration="2000"
                    style={{ backgroundImage: `url(${heroBg})` }}
                />

                {/* ── MOBILE ONLY: Logo header row ── */}
                <div className="mob-header">
                    <div className="mob-logo-row">
                        <img src={recLogo} alt="Rajalakshmi Engineering College" className="mob-logo mob-logo-rec" />
                        <span className="mob-logo-sep" />
                        <img src={ieeeLogo} alt="IEEE Computer Society" className="mob-logo mob-logo-ieee" />
                    </div>
                    <button
                        className="mob-burger"
                        aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
                        onClick={() => setMobileMenuOpen(p => !p)}
                    >
                        <i className={`fas ${mobileMenuOpen ? 'fa-times' : 'fa-bars'}`} />
                    </button>
                    <span className="mob-header-line" />
                </div>

                {/* ── MOBILE ONLY: Full-screen nav overlay ── */}
                <div className={`mob-overlay${mobileMenuOpen ? ' mob-overlay--open' : ''}`}>
                    <button className="mob-overlay-close" onClick={() => setMobileMenuOpen(false)} aria-label="Close menu">
                        <i className="fas fa-times" />
                    </button>
                    <Link to="/"        className={`mob-nav-link${location.pathname === '/'        ? ' mob-nav-link--active' : ''}`} style={{'--i':1}} onClick={() => setMobileMenuOpen(false)}>Home</Link>
                    <Link to="/about"   className={`mob-nav-link${location.pathname === '/about'   ? ' mob-nav-link--active' : ''}`} style={{'--i':2}} onClick={() => setMobileMenuOpen(false)}>About Us</Link>
                    <Link to="/team"    className={`mob-nav-link${location.pathname === '/team'    ? ' mob-nav-link--active' : ''}`} style={{'--i':3}} onClick={() => setMobileMenuOpen(false)}>Our Team</Link>
                    <Link to="/events"  className={`mob-nav-link${location.pathname === '/events'  ? ' mob-nav-link--active' : ''}`} style={{'--i':4}} onClick={() => setMobileMenuOpen(false)}>Events &amp; Gallery</Link>
                    <Link to="/contact" className={`mob-nav-link${location.pathname === '/contact' ? ' mob-nav-link--active' : ''}`} style={{'--i':5}} onClick={() => setMobileMenuOpen(false)}>Contact Us</Link>
                </div>

                {/* particles sit behind everything */}
                <div className="hero-inner">
                    {/* ── LEFT (desktop) / CENTER (mobile) ── */}
                    <div className="hero-text-col" data-aos="fade-right">
                        <h1 className="hero-heading">
                            BUILD.<br />
                            <span className="hero-glow-text">INNOVATE.</span><br />
                            LEAD.
                        </h1>

                        <p className="hero-line1">
                            Rajalakshmi Engineering College's premier IEEE student chapter.
                        </p>
                        <p className="hero-line2">
                            Empowering the next generation of computing professionals.
                        </p>

                        {/* ── MOBILE ONLY: chip illustration as real img ── */}
                        <img
                            src={heroBg}
                            alt="IEEE CS Tech Illustration"
                            className="mob-chip-img"
                        />

                        <div className="hero-scroll-hint">
                            <span className="scroll-label">SCROLL TO EXPLORE</span>
                            <div className="scroll-mouse">
                                <span className="scroll-dot" />
                            </div>
                        </div>

                        <div className="hero-ctas">
                            <a
                                href="https://www.ieee.org/"
                                className="btn-hero-primary"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Join IEEE Now
                            </a>
                            <Link to="/events" className="btn-hero-secondary">
                                Explore Events
                            </Link>
                        </div>
                    </div>

                    {/* Empty spacer for desktop grid */}
                    <div className="hero-grid-spacer" />
                </div>
            </section>


            {/* ══════════════════════════ PILLARS ══════════════════════════ */}
            <section className="pillars-section">
                <div className="pillars-inner">
                    <span className="section-label" data-aos="fade-up">About the Chapter</span>
                    <h2 className="section-title" data-aos="fade-up" data-aos-delay="80">
                        One Chapter. Endless Opportunities.
                    </h2>
                    <p className="section-sub" data-aos="fade-up" data-aos-delay="140">
                        Founded in 2019 at Rajalakshmi Engineering College, our IEEE CS chapter
                        accelerates the journey from curious student to computing professional.
                    </p>

                    <div className="pillars-grid">
                        {pillars.map((p, i) => (
                            <div className="pillar-card" key={i} data-aos="fade-up" data-aos-delay={i * 120}>
                                <div className="pillar-icon"><i className={p.icon} /></div>
                                <h3>{p.title}</h3>
                                <p>{p.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ══════════════════════════ STATS ══════════════════════════ */}
            <section className="stats-section" ref={statsRef}>
                <div className="stats-inner">
                    {stats.map((s, i) => (
                        <StatCounter key={i} target={s.value} suffix={s.suffix} label={s.label} start={statsVisible} />
                    ))}
                </div>
            </section>

            {/* ══════════════════════════ EVENTS ══════════════════════════ */}
            <section className="events-section" id="events">
                <div className="events-inner">
                    <span className="section-label" data-aos="fade-up">What We Run</span>
                    <h2 className="section-title" data-aos="fade-up" data-aos-delay="80">
                        Events That Define Us
                    </h2>

                    <div className="events-grid">
                        {featuredEvents.map((ev, i) => (
                            <div className="event-tile" key={i} data-aos="fade-up" data-aos-delay={i * 120}>
                                <div className="event-img-wrap">
                                    <img src={ev.image} alt={ev.title} />
                                    <span className="ev-tag">{ev.tag}</span>
                                </div>
                                <div className="event-body">
                                    <h3>{ev.title}</h3>
                                    <p>{ev.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="events-cta-wrap" data-aos="fade-up">
                        <Link to="/events" className="btn-outline-gold">
                            View All Events &nbsp;<i className="fas fa-arrow-right" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* ══════════════════════════ DOMAINS ══════════════════════════ */}
            <section className="domains-section">
                <div className="domains-inner">
                    <span className="section-label" data-aos="fade-up">Tracks We Explore</span>
                    <h2 className="section-title" data-aos="fade-up" data-aos-delay="80">
                        OUR DOMAINS
                    </h2>
                    <p className="section-sub" data-aos="fade-up" data-aos-delay="140">
                        From building technology to managing events and creating impactful content, explore the domains that shape our community.
                    </p>

                    <div className="domains-grid">
                        {domains.map((d, i) => (
                            <div className="domain-card" key={i} data-aos="fade-up" data-aos-delay={i * 80}>
                                <div className="domain-icon"><i className={d.icon} /></div>
                                <h3>{d.title}</h3>
                                <p>{d.desc}</p>
                                <div className="domain-shine" />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ══════════════════════════ FOOTER ══════════════════════════ */}
            <footer className="site-footer" id="contact">
                <div className="footer-inner">
                    {/* Brand */}
                    <div className="footer-brand" data-aos="fade-right">
                        <img src={ieeeLogo} alt="IEEE CS" className="footer-logo" />
                        <p>
                            IEEE Computer Society<br />
                            Rajalakshmi Engineering College<br />
                            Chennai, Tamil Nadu, India
                        </p>
                        <div className="footer-socials">
                            <a href="https://www.instagram.com/ieee_cs_rec" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram" /></a>
                            <a href="#" target="_blank" rel="noopener noreferrer"><i className="fab fa-linkedin" /></a>
                            <a href="https://www.youtube.com/@IEEECSREC" target="_blank" rel="noopener noreferrer"><i className="fab fa-youtube" /></a>
                        </div>
                    </div>

                    {/* Contacts */}
                    <div className="footer-contacts" data-aos="fade-up">
                        <h4>Faculty Coordinators</h4>
                        {[
                            { name: 'Dr. N. Duraimurugan', email: 'duraimurugan.n@rajalakshmi.edu.in' },
                            { name: 'Dr. K. Anandhajothi', email: 'ananthajothi.k@rajalakshmi.edu.in' },
                            { name: 'Dr. S. Vinod Kumar', email: 'vinodkumar.s@rajalakshmi.edu.in' },
                        ].map((c, i) => (
                            <div className="fc-row" key={i}>
                                <strong>{c.name}</strong>
                                <a href={`mailto:${c.email}`}><i className="fas fa-envelope" /> {c.email}</a>
                            </div>
                        ))}
                    </div>

                    {/* CTA */}
                    <div className="footer-cta" data-aos="fade-left">
                        <h4>Ready to level up?</h4>
                        <p>Join the IEEE Computer Society and unlock a global community of professionals, resources, and opportunities.</p>
                        <a href="https://www.ieee.org/" className="btn-primary-gold" target="_blank" rel="noopener noreferrer">
                            Become a Member
                        </a>
                        <Link to="/creators" className="creators-link">
                            Website Creators &nbsp;<i className="fas fa-arrow-right" />
                        </Link>
                    </div>
                </div>

                <div className="footer-bar">
                    &copy; 2026 IEEE Computer Society — Rajalakshmi Engineering College
                </div>
            </footer>
        </div>
    );
};

export default Home;
