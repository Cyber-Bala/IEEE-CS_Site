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

// Fallback images if events are missing
const eventImages = {
    event1: 'https://via.placeholder.com/800x500?text=DVP+TALK',
    promptIq: 'https://via.placeholder.com/800x500?text=Prompt+IQ',
    replica: 'https://via.placeholder.com/800x500?text=Replica',
    alumniLecture: 'https://via.placeholder.com/800x500?text=Alumni+Lecture'
};

const Home = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [currentGalleryIndex, setCurrentGalleryIndex] = useState(0);

    const missionSlides = [
        {
            id: 'slide1',
            title: 'Our Mission',
            icon: 'fas fa-bullseye',
            content: 'Empowering students to lead in computing innovations through hands-on projects and professional development.',
            list: [
                'Foster technical excellence through workshops and hackathons',
                'Encourage collaboration across disciplines',
                'Promote impactful projects that solve real-world problems',
                'Connect students with industry leaders and opportunities'
            ]
        },
        {
            id: 'slide2',
            title: 'Our Vision',
            icon: 'fas fa-eye',
            content: 'To establish ourselves as the premier hub of creativity and technical leadership in our institution and beyond.',
            list: [
                'Inspire innovation through cutting-edge technologies',
                'Build future leaders in computer science and engineering',
                'Connect with global IEEE communities and resources',
                'Create a culture of continuous learning and growth'
            ]
        },
        {
            id: 'slide3',
            title: 'What We Do',
            icon: 'fas fa-users',
            content: 'We organize a variety of activities to help students grow technically and professionally.',
            list: [
                'Technical workshops and coding competitions',
                'Guest lectures from industry experts',
                'Research paper presentations and publications',
                'Community outreach and social initiatives',
                'Networking events with alumni and professionals'
            ]
        }
    ];

    const gallerySlides = [
        {
            title: 'DVP TALK',
            date: 'January 2024',
            image: eventImages.event1
        },
        {
            title: 'Prompt IQ',
            date: 'February 2024',
            image: eventImages.promptIq
        },
        {
            title: 'Replica',
            date: 'March 2024',
            image: eventImages.replica
        },
        {
            title: 'Alumni Lecture',
            date: 'April 2024',
            image: eventImages.alumniLecture
        }
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

        const missionInterval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % missionSlides.length);
        }, 5000);

        const galleryInterval = setInterval(() => {
            setCurrentGalleryIndex((prev) => (prev + 1) % gallerySlides.length);
        }, 5000);

        return () => {
            clearInterval(missionInterval);
            clearInterval(galleryInterval);
        };
    }, []);

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

    const nextMissionSlide = () => setCurrentSlide((prev) => (prev + 1) % missionSlides.length);
    const prevMissionSlide = () => setCurrentSlide((prev) => (prev - 1 + missionSlides.length) % missionSlides.length);

    const nextGallerySlide = () => setCurrentGalleryIndex((prev) => (prev + 1) % gallerySlides.length);
    const prevGallerySlide = () => setCurrentGalleryIndex((prev) => (prev - 1 + gallerySlides.length) % gallerySlides.length);

    return (
        <div className="home-container">
            <Navbar />

            <div id="particles-js">
                <Particles id="tsparticles" init={particlesInit} options={particlesOptions} />
            </div>

            {/* Hero Section */}
            <section className="hero" id="home">
                <div className="hero-content" data-aos="fade-in">
                    <h1><span>IEEE COMPUTER</span><span>SOCIETY</span></h1>
                    <p>Empowering the next generation of computing professionals through innovation, collaboration, and technical excellence.</p>
                    <a href="https://www.ieee.org/" className="btn-join" target="_blank" rel="noopener noreferrer">Join Us Today</a>
                </div>
            </section>

            {/* Mission & Vision Slider */}
            <section className="mission-slider">
                <div className="slider-container">
                    {missionSlides.map((slide, index) => (
                        <div key={slide.id} className={`slide ${currentSlide === index ? 'active' : ''}`}>
                            <h2><i className={slide.icon}></i> {slide.title}</h2>
                            <p>{slide.content}</p>
                            <ul>
                                {slide.list.map((item, i) => (
                                    <li key={i}>{item}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="slider-controls">
                    <button className="slider-btn prev" onClick={prevMissionSlide}><i className="fas fa-chevron-left"></i> Prev</button>
                    <button className="slider-btn next" onClick={nextMissionSlide}>Next <i className="fas fa-chevron-right"></i></button>
                </div>

                <div className="slider-dots">
                    {missionSlides.map((_, index) => (
                        <span
                            key={index}
                            className={`dot ${currentSlide === index ? 'active' : ''}`}
                            onClick={() => setCurrentSlide(index)}
                        ></span>
                    ))}
                </div>
            </section>

            {/* Events Gallery Section */}
            <section className="events-gallery" id="events">
                <div className="section-header" data-aos="fade-up">
                    <h2><i className="fas fa-images"></i> Past Events Gallery</h2>
                    <p>Relive the memorable moments from our previous events and activities</p>
                </div>

                <div className="gallery-slider" data-aos="fade-up" data-aos-delay="200">
                    <div
                        className="gallery-track"
                        style={{ transform: `translateX(-${currentGalleryIndex * 100}%)` }}
                    >
                        {gallerySlides.map((slide, index) => (
                            <div key={index} className="gallery-slide">
                                <img src={slide.image} alt={slide.title} />
                                <div className="slide-caption">
                                    <h3>{slide.title}</h3>
                                    <p>{slide.date}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="gallery-controls" data-aos="fade-up" data-aos-delay="300">
                    <button className="gallery-prev" onClick={prevGallerySlide}><i className="fas fa-chevron-left"></i></button>
                    <div className="gallery-dots">
                        {gallerySlides.map((_, index) => (
                            <div
                                key={index}
                                className={`gallery-dot ${currentGalleryIndex === index ? 'active' : ''}`}
                                onClick={() => setCurrentGalleryIndex(index)}
                            ></div>
                        ))}
                    </div>
                    <button className="gallery-next" onClick={nextGallerySlide}><i className="fas fa-chevron-right"></i></button>
                </div>

                <div className="view-more-container" data-aos="fade-up" data-aos-delay="400">
                    <a href="#events" className="btn-view-more">View Full Gallery</a>
                </div>
            </section>

            {/* Footer */}
            <footer className="footer" id="contact">
                <h3 data-aos="fade-up">Reach Us</h3>
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
