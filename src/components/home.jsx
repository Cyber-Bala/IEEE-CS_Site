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

            {/* Footer */}
            <footer className="footer" id="contact">
                <h3 data-aos="fade-up">Reach Out</h3>
                <p data-aos="fade-up" data-aos-delay="100">Rajalakshmi Engineering College</p>
                <p data-aos="fade-up" data-aos-delay="150">An Autonomous Institution Affiliated to Anna University, Chennai</p>
                <p data-aos="fade-up" data-aos-delay="200">Rajalakshmi Nagar, Thandalam, Chennai - 602105</p>

                <div className="contact-info">
                    <div className="contact-person" data-aos="fade-up" data-aos-delay="100">
                        <strong>Dr. N. Duraimurugan</strong>
                        <p>Faculty Co-ordinator</p>
                        <p><i className="fas fa-envelope"></i> duraimurugan.n@rajalakshmi.edu.in</p>
                    </div>
                    <div className="contact-person" data-aos="fade-up" data-aos-delay="200">
                        <strong>Dr. K. Anandhajothi</strong>
                        <p>Faculty Co-ordinator</p>
                        <p><i className="fas fa-envelope"></i> ananthajothi.k@rajalakshmi.edu.in</p>
                    </div>
                    <div className="contact-person" data-aos="fade-up" data-aos-delay="300">
                        <strong>Dr. S. Vinod Kumar</strong>
                        <p>Faculty Co-ordinator</p>
                        <p><i className="fas fa-envelope"></i> vinodkumar.s@rajalakshmi.edu.in</p>
                    </div>
                </div>

                <div className="join-us-container" data-aos="fade-up" data-aos-delay="400">
                    <a href="https://www.ieee.org/" className="btn-join-ieee" target="_blank" rel="noopener noreferrer">Join IEEE</a>
                </div>

                <div className="social-links" data-aos="fade-up" data-aos-delay="500">
                    <a href="https://www.instagram.com/ieee_cs_rec?utm_source=ig_web_button_share_sheet&igsh=dzM1N2Z5cWRxcnVj" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i></a>
                    <a href="#" target="_blank" rel="noopener noreferrer"><i className="fab fa-linkedin"></i></a>
                    <a href="https://www.youtube.com/@IEEECSREC" target="_blank" rel="noopener noreferrer"><i className="fab fa-youtube"></i></a>
                </div>

                <div className="creators">
                    <h3 data-aos="fade-up">Website Creators</h3>
                    <div className="creator-grid">
                        <div className="creator-card" data-aos="fade-up" data-aos-delay="100">
                            <strong>GOKUL ANAND B</strong>
                            <p>Follow me on</p>
                            <div className="creator-social">
                                <a href="#"><i className="fab fa-github"></i></a>
                                <a href="#"><i className="fab fa-linkedin"></i></a>
                            </div>
                        </div>

                        <div className="creator-card" data-aos="fade-up" data-aos-delay="200">
                            <strong>HIMESHWAR N</strong>
                            <p>Follow me on</p>
                            <div className="creator-social">
                                <a href="#"><i className="fab fa-github"></i></a>
                                <a href="#"><i className="fab fa-linkedin"></i></a>
                            </div>
                        </div>

                        <div className="creator-card" data-aos="fade-up" data-aos-delay="300">
                            <strong>ISHWARI RAJMOHAN</strong>
                            <p>Follow me on</p>
                            <div className="creator-social">
                                <a href="#"><i className="fab fa-github"></i></a>
                                <a href="#"><i className="fab fa-linkedin"></i></a>
                            </div>
                        </div>

                        <div className="creator-card" data-aos="fade-up" data-aos-delay="400">
                            <strong>RAMALINGAM S</strong>
                            <p>Follow me on</p>
                            <div className="creator-social">
                                <a href="#"><i className="fab fa-github"></i></a>
                                <a href="#"><i className="fab fa-linkedin"></i></a>
                            </div>
                        </div>

                        <div className="creator-card" data-aos="fade-up" data-aos-delay="500">
                            <strong>JAYADHARSHINI M</strong>
                            <p>Follow me on</p>
                            <div className="creator-social">
                                <a href="#"><i className="fab fa-github"></i></a>
                                <a href="#"><i className="fab fa-linkedin"></i></a>
                            </div>
                        </div>
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
