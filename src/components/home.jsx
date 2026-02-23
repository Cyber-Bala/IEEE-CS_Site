import React, { useEffect, useState, useCallback } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Particles from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import './home.css';
import Navbar from './Navbar';

// Import assets
import collegeLogo from '../assets/logo/college.png';
import ieeeLogo from '../assets/logo/ieee_cs.png';

// Event Assets
import event1 from '../assets/events/event1.JPG';
import promptIq from '../assets/events/prompt-iq.JPG';
import replica from '../assets/events/replica.JPG';
import alumnilecture from '../assets/events/alumnilecture.JPG';
import iccds from '../assets/events/ICCDS.JPG';
import recruitment from '../assets/events/rectrutment.jpg';
import streamlit from '../assets/events/streamlit.jpg';
import techATwist from '../assets/events/tech-a-twist.JPG';
import techtopia from '../assets/events/techtopia.png';
import xyntra from '../assets/events/xyntra.JPG';

const Home = () => {
    const [currentGalleryIndex, setCurrentGalleryIndex] = useState(0);

    const identityCards = [
        {
            id: 'mission',
            title: 'Our Mission',
            icon: 'fas fa-bullseye',
            content: 'Empowering students to lead in computing innovations through hands-on projects and professional development.',
            details: [
                'Foster technical excellence',
                'Encourage collaboration',
                'Real-world problem solving'
            ]
        },
        {
            id: 'vision',
            title: 'Our Vision',
            icon: 'fas fa-eye',
            content: 'To establish ourselves as the premier hub of creativity and technical leadership in our institution and beyond.',
            details: [
                'Inspire technical innovation',
                'Build future leaders',
                'Global IEEE connection'
            ]
        },
        {
            id: 'what-we-do',
            title: 'What We Do',
            icon: 'fas fa-users',
            content: 'We organize a variety of activities to help students grow technically and professionally.',
            details: [
                'Workshops & Hackathons',
                'Industry Guest Lectures',
                'Technical Research'
            ]
        }
    ];

    const gallerySlides = [
        { title: 'XYNTRA 2.0', date: 'January 2024', image: xyntra },
        { title: 'Prompt IQ', date: 'February 2024', image: promptIq },
        { title: 'Replica', date: 'March 2024', image: replica },
        { title: 'ICCDS Conference', date: 'April 2024', image: iccds },
        { title: 'DVP Talk', date: 'May 2024', image: event1 },
        { title: 'Alumni Lecture', date: 'June 2024', image: alumnilecture },
        { title: 'Streamlit Workshop', date: 'July 2024', image: streamlit },
        { title: 'Tech-A-Twist', date: 'August 2024', image: techATwist },
        { title: 'Techtopia', date: 'September 2024', image: techtopia },
        { title: 'Recruitment Drive', date: 'October 2024', image: recruitment }
    ];

    useEffect(() => {
        AOS.init({
            duration: 1000,
            easing: 'ease-out-back',
            once: false,
            mirror: true,
            offset: 120,
            disable: window.innerWidth < 768
        });

        const galleryInterval = setInterval(() => {
            setCurrentGalleryIndex((prev) => (prev + 1) % gallerySlides.length);
        }, 5000);

        return () => {
            clearInterval(galleryInterval);
        };
    }, [gallerySlides.length]);

    const particlesInit = useCallback(async (engine) => {
        await loadSlim(engine);
    }, []);

    const particlesOptions = {
        particles: {
            number: { value: 100, density: { enable: true, area: 800 } },
            color: { value: "#00f3ff" },
            shape: { type: "circle" },
            opacity: { value: 0.5 },
            size: { value: 3, random: true },
            links: { enable: true, distance: 150, color: "#00f3ff", opacity: 0.2, width: 1 },
            move: { enable: true, speed: 3, direction: "none", random: true, straight: false, outModes: "out" }
        },
        interactivity: {
            events: { onHover: { enable: true, mode: "grab" }, onClick: { enable: true, mode: "push" }, resize: true },
            modes: { grab: { distance: 140, links: { opacity: 1 } }, push: { quantity: 4 } }
        },
        retina_detect: true
    };

    const nextGallerySlide = () => setCurrentGalleryIndex((prev) => (prev + 1) % gallerySlides.length);
    const prevGallerySlide = () => setCurrentGalleryIndex((prev) => (prev - 1 + gallerySlides.length) % gallerySlides.length);

    // Touch swipe support for the events section
    const touchStartX = React.useRef(null);
    const handleTouchStart = (e) => {
        touchStartX.current = e.touches[0].clientX;
    };
    const handleTouchEnd = (e) => {
        if (touchStartX.current === null) return;
        const deltaX = e.changedTouches[0].clientX - touchStartX.current;
        if (Math.abs(deltaX) > 50) { // 50px threshold
            if (deltaX < 0) nextGallerySlide(); // swipe left = next
            else prevGallerySlide();             // swipe right = prev
        }
        touchStartX.current = null;
    };

    return (
        <div className="home-container">
            <Navbar />

            <div id="particles-js">
                <Particles id="tsparticles" init={particlesInit} options={particlesOptions} />
            </div>

            {/* Hero Section */}
            <section className="hero" id="home">
                <div className="cyber-grid"></div>
                <div className="hero-noise"></div>

                <div className="hero-hud-decor">
                    <div className="hud-line top"></div>
                    <div className="hud-line bottom"></div>
                    <div className="hud-corner tl"></div>
                    <div className="hud-corner tr"></div>
                    <div className="hud-corner bl"></div>
                    <div className="hud-corner br"></div>
                </div>

                <div className="hero-content" data-aos="zoom-out" data-aos-duration="1500">
                    <div className="hero-glitch-wrapper">
                        <h1 className="glitch-text" data-text="IEEE COMPUTER SOCIETY">
                            <span>IEEE COMPUTER</span><span>SOCIETY</span>
                        </h1>
                    </div>
                    <div className="hero-subtitle-container">
                        <div className="subtitle-line"></div>
                        <p>Empowering the next generation of computing professionals through innovation, collaboration, and technical excellence.</p>
                        <div className="subtitle-line"></div>
                    </div>
                    <div className="hero-actions">
                        <a href="https://www.ieee.org/" className="btn-join-cyber" target="_blank" rel="noopener noreferrer">
                            <span className="btn-text">JOIN US TODAY</span>
                            <span className="btn-glitch"></span>
                        </a>
                    </div>
                </div>
            </section>

            {/* Identity Grid (Mission, Vision, What We Do) */}
            <section className="identity-section" id="about">
                <div className="container">
                    <div className="identity-grid">
                        {identityCards.map((card, index) => (
                            <div
                                key={card.id}
                                className={`identity-card ${card.id}`}
                                data-aos="fade-up"
                                data-aos-delay={index * 200}
                            >
                                <div className="card-inner">
                                    <div className="card-glow"></div>
                                    <div className="icon-box">
                                        <i className={card.icon}></i>
                                    </div>
                                    <h2>{card.title}</h2>
                                    <p>{card.content}</p>
                                    <div className="details-tags">
                                        {card.details.map((detail, i) => (
                                            <span key={i}>{detail}</span>
                                        ))}
                                    </div>
                                    {card.id === 'vision' && <div className="vision-scanline"></div>}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Holographic Past Events Hub */}
            <section className="past-events-hub" id="events">
                <div className="hub-background-glow"></div>
                <div className="section-header" data-aos="fade-up">
                    <div className="header-hud-line"></div>
                    <h2>Past Events</h2>
                </div>

                <div
                    className="hub-container"
                    data-aos="zoom-in"
                    data-aos-delay="200"
                    onTouchStart={handleTouchStart}
                    onTouchEnd={handleTouchEnd}
                    style={{ touchAction: 'pan-y' }}
                >
                    <div className="event-deck">
                        {gallerySlides.map((slide, index) => {
                            const offset = index - currentGalleryIndex;
                            const isActive = index === currentGalleryIndex;
                            const isPrev = index === (currentGalleryIndex - 1 + gallerySlides.length) % gallerySlides.length;
                            const isNext = index === (currentGalleryIndex + 1) % gallerySlides.length;

                            let className = "event-card";
                            if (isActive) className += " active";
                            else if (isPrev) className += " prev";
                            else if (isNext) className += " next";
                            else if (Math.abs(offset) > 1) className += " hidden";

                            return (
                                <div
                                    key={index}
                                    className={className}
                                    onClick={() => setCurrentGalleryIndex(index)}
                                >
                                    <div className="card-hud-frame">
                                        <div className="bracket tl"></div>
                                        <div className="bracket tr"></div>
                                        <div className="bracket bl"></div>
                                        <div className="bracket br"></div>

                                        <div className="card-image-wrapper">
                                            <img src={slide.image} alt={slide.title} />
                                            <div className="image-scanline"></div>
                                            <div className="hologram-flicker"></div>
                                        </div>

                                        <div className="card-info-hud">
                                            <div className="hud-data-top">
                                                <span className="event-date">DAT_LOG: {slide.date}</span>
                                                <span className="event-id">UID_{index.toString().padStart(3, '0')}</span>
                                            </div>
                                            <h3>{slide.title}</h3>
                                            <div className="hud-data-btm">
                                                <div className="data-bar"><div className="fill"></div></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <div className="hub-controls">
                        <button className="hub-nav-btn prev" onClick={prevGallerySlide}>
                            <i className="fas fa-chevron-left"></i>
                        </button>
                        <div className="hub-indicators">
                            {gallerySlides.map((_, index) => (
                                <div
                                    key={index}
                                    className={`hub-dot ${currentGalleryIndex === index ? 'active' : ''}`}
                                    onClick={() => setCurrentGalleryIndex(index)}
                                ></div>
                            ))}
                        </div>
                        <button className="hub-nav-btn next" onClick={nextGallerySlide}>
                            <i className="fas fa-chevron-right"></i>
                        </button>
                    </div>
                </div>

                <div className="view-more-container" data-aos="fade-up" data-aos-delay="100">
                    <a href="#events" className="btn-archive-access">Access Full Archive</a>
                </div>
            </section>

            {/* Footer / Reach Out Section */}
            <footer className="footer" id="contact">
                <div className="footer-hud-grid"></div>
                {/* <div className="footer-metadata">
                    SYS_STATUS: ACTIVE<br />
                    LOC_REF: REC_CHENNAI<br />
                    SEC_AUTH: IEEE_CS_PROTOCOL
                </div> */}

                <div className="section-header" data-aos="fade-up">
                    <div className="header-hud-line"></div>
                    <h3 className="glitch-text" data-text="Reach Out">Reach Out</h3>
                    <p className="footer-subtitle">COMMAND_CENTER: COORDINATE WITH FACULTY REPRESENTATIVES AND SYSTEM ARCHITECTS.</p>
                </div>

                <div className="contact-info">
                    <div className="contact-person" data-aos="fade-up" data-aos-delay="100">
                        <div className="role-tag">FACULTY CO-ORDINATOR</div>
                        <strong>Dr. N. Duraimurugan</strong>
                        <p>Rajalakshmi Engineering College</p>
                        <a href="mailto:duraimurugan.n@rajalakshmi.edu.in" className="email-link">
                            <i className="fas fa-envelope"></i> duraimurugan.n@rajalakshmi.edu.in
                        </a>
                    </div>
                    <div className="contact-person" data-aos="fade-up" data-aos-delay="200">
                        <div className="role-tag">FACULTY CO-ORDINATOR</div>
                        <strong>Dr. K. Anandhajothi</strong>
                        <p>Rajalakshmi Engineering College</p>
                        <a href="mailto:ananthajothi.k@rajalakshmi.edu.in" className="email-link">
                            <i className="fas fa-envelope"></i> ananthajothi.k@rajalakshmi.edu.in
                        </a>
                    </div>
                    <div className="contact-person" data-aos="fade-up" data-aos-delay="300">
                        <div className="role-tag">FACULTY CO-ORDINATOR</div>
                        <strong>Dr. S. Vinod Kumar</strong>
                        <p>Rajalakshmi Engineering College</p>
                        <a href="mailto:vinodkumar.s@rajalakshmi.edu.in" className="email-link">
                            <i className="fas fa-envelope"></i> vinodkumar.s@rajalakshmi.edu.in
                        </a>
                    </div>
                </div>

                <div className="join-us-container" data-aos="fade-up" data-aos-delay="400">
                    <a href="https://www.ieee.org/" className="btn-join-ieee" target="_blank" rel="noopener noreferrer">
                        INITIALIZE_MEMBERSHIP
                    </a>
                </div>

                <div className="social-links" data-aos="fade-up" data-aos-delay="500">
                    <a href="https://www.instagram.com/ieee_cs_rec?utm_source=ig_web_button_share_sheet&igsh=dzM1N2Z5cWRxcnVj" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i></a>
                    <a href="#" target="_blank" rel="noopener noreferrer"><i className="fab fa-linkedin"></i></a>
                    <a href="https://www.youtube.com/@IEEECSREC" target="_blank" rel="noopener noreferrer"><i className="fab fa-youtube"></i></a>
                </div>

                <div className="creators">
                    <h3 className="glitch-text" data-text="Website Creators">Website Creators</h3>
                    <div className="creator-grid">
                        <div className="creator-card" data-aos="fade-up" data-aos-delay="100">
                            <strong>Balamurugan S</strong>
                            <div className="creator-social">
                                <a href="https://github.com/Cyber-Bala" target="_blank" rel="noopener noreferrer"><i className="fab fa-github"></i></a>
                                <a href="https://www.linkedin.com/in/balamurugan-s-18229732b/" target="_blank" rel="noopener noreferrer"><i className="fab fa-linkedin"></i></a>
                            </div>
                        </div>

                        <div className="creator-card" data-aos="fade-up" data-aos-delay="200">
                            <strong>Mettu Mani Chandhan</strong>
                            <div className="creator-social">
                                <a href="https://github.com/Batman7mani" target="_blank" rel="noopener noreferrer"><i className="fab fa-github"></i></a>
                                <a href="https://www.linkedin.com/in/mettu-mani-chandhan-sai-993b5b32a/" target="_blank" rel="noopener noreferrer"><i className="fab fa-linkedin"></i></a>
                            </div>
                        </div>

                        <div className="creator-card" data-aos="fade-up" data-aos-delay="300">
                            <strong>Kaviarasi M</strong>
                            <div className="creator-social">
                                <a href="https://github.com/Kaviarasi18" target="_blank" rel="noopener noreferrer"><i className="fab fa-github"></i></a>
                                <a href="https://www.linkedin.com/in/kaviarasi-m-16170132b" target="_blank" rel="noopener noreferrer"><i className="fab fa-linkedin"></i></a>
                            </div>
                        </div>

                        <div className="creator-card" data-aos="fade-up" data-aos-delay="400">
                            <strong>Venkat Prashad A</strong>
                            <div className="creator-social">
                                <a href="https://github.com/V3NK47XD" target="_blank" rel="noopener noreferrer"><i className="fab fa-github"></i></a>
                                <a href="https://www.linkedin.com/in/v3nk47/" target="_blank" rel="noopener noreferrer"><i className="fab fa-linkedin"></i></a>
                            </div>
                        </div>

                        {/* <div className="creator-card" data-aos="fade-up" data-aos-delay="500">
                            <strong>JAYADHARSHINI M</strong>
                            <div className="creator-social">
                                <a href="https://github.com/Jayadharshini-M" target="_blank" rel="noopener noreferrer"><i className="fab fa-github"></i></a>
                                <a href="https://www.linkedin.com/in/jayadharshini-m-445a90256/" target="_blank" rel="noopener noreferrer"><i className="fab fa-linkedin"></i></a>
                            </div>
                        </div> */}
                    </div>
                </div>
            </footer>

            <div className="copyright-footer">
                &copy; 2025 IEEE Computer Society — Rajalakshmi Engineering College
            </div>
        </div>
    );
};

export default Home;
