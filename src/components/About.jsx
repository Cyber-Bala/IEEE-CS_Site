import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';
import Navbar from './Navbar';
import './about.css';

// ✅ IMPORT IMAGES FROM SRC
import collegeLogo from '../assets/logo/college.png';
import ieeeLogo from '../assets/logo/ieee_cs.png';
import recCollegeImg from '../assets/logo/rec college.jpg';
import iccdsImg from '../assets/events/ICCDS.JPG';

gsap.registerPlugin(ScrollTrigger, TextPlugin);

const About = () => {
    const [showScrollTop, setShowScrollTop] = useState(false);

    const mainRef = useRef(null);
    const heroRef = useRef(null);
    const heroTitleRef = useRef(null);
    const storyRef = useRef(null);
    const impactRef = useRef(null);
    const cultureRef = useRef(null);
    const teamRef = useRef(null);
    const joinRef = useRef(null);
    const scrollTopRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // ===== HERO ENTRANCE + PARALLAX =====
            if (heroRef.current && heroTitleRef.current) {
                const tlHero = gsap.timeline({ defaults: { ease: 'power3.out' } });

                tlHero
                    .fromTo(
                        heroRef.current,
                        { opacity: 0, y: 40 },
                        { opacity: 1, y: 0, duration: 0.9 }
                    )
                    .fromTo(
                        heroTitleRef.current,
                        { y: 80, opacity: 0, scale: 0.9, letterSpacing: '0.6em' },
                        {
                            y: 0,
                            opacity: 1,
                            scale: 1,
                            letterSpacing: '0.35em',
                            duration: 1.2,
                            ease: 'power4.out',
                        },
                        '-=0.5'
                    )
                    .fromTo(
                        heroRef.current.querySelectorAll(".heroSubtitle, .divider"),
                        { opacity: 0, y: 30 },
                        {
                            opacity: 1,
                            y: 0,
                            duration: 0.8,
                            stagger: 0.15,
                        },
                        '-=0.4'
                    );
            }

            if (heroRef.current) {
                gsap.to(heroRef.current, {
                    yPercent: -8,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: heroRef.current,
                        start: 'top top',
                        end: 'bottom top',
                        scrub: true,
                    },
                });
            }

            // ===== HERO TITLE: shine + breathing scale =====
            if (heroTitleRef.current) {
                const title = heroTitleRef.current;

                gsap.to(title, {
                    scale: 1.04,
                    duration: 2.2,
                    ease: 'sine.inOut',
                    yoyo: true,
                    repeat: -1,
                });
            }

            // Utility: subtle parallax + skew for section images
            const parallaxImage = (el, triggerEl, offset = 20) => {
                if (!el || !triggerEl) return;

                gsap.fromTo(
                    el,
                    { y: offset, skewY: 2, opacity: 0.7 },
                    {
                        y: -offset,
                        skewY: 0,
                        opacity: 1,
                        ease: 'power2.out',
                        scrollTrigger: {
                            trigger: triggerEl,
                            start: 'top 80%',
                            end: 'bottom top',
                            scrub: true,
                        },
                    }
                );
            };

            // ===== STORY =====
            if (storyRef.current) {
                const textEls = storyRef.current.querySelectorAll('h2, p');
                const img = storyRef.current.querySelector(".sectionImage img");

                gsap.fromTo(
                    textEls,
                    { opacity: 0, y: 60 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 1,
                        stagger: 0.25,
                        scrollTrigger: {
                            trigger: storyRef.current,
                            start: 'top 80%',
                            toggleActions: 'play none none reverse',
                        },
                    }
                );

                if (img) {
                    gsap.fromTo(
                        img,
                        { scale: 1.05, opacity: 0, x: 40 },
                        {
                            scale: 1,
                            opacity: 1,
                            x: 0,
                            duration: 1.2,
                            ease: 'power3.out',
                            scrollTrigger: {
                                trigger: storyRef.current,
                                start: 'top 80%',
                            },
                        }
                    );
                    parallaxImage(img, storyRef.current, 18);
                }
            }

            // ===== IMPACT =====
            if (impactRef.current) {
                const textEls = impactRef.current.querySelectorAll('h2, p');
                const img = impactRef.current.querySelector(".sectionImage img");

                gsap.fromTo(
                    textEls,
                    { opacity: 0, x: -60 },
                    {
                        opacity: 1,
                        x: 0,
                        duration: 1,
                        stagger: 0.25,
                        scrollTrigger: {
                            trigger: impactRef.current,
                            start: 'top 80%',
                        },
                    }
                );

                if (img) {
                    gsap.fromTo(
                        img,
                        { scale: 0.95, opacity: 0, x: -40 },
                        {
                            scale: 1,
                            opacity: 1,
                            x: 0,
                            duration: 1.2,
                            ease: 'back.out(1.7)',
                            scrollTrigger: {
                                trigger: impactRef.current,
                                start: 'top 80%',
                            },
                        }
                    );
                    parallaxImage(img, impactRef.current, 16);
                }
            }

            // ===== CULTURE =====
            if (cultureRef.current) {
                const textEls = cultureRef.current.querySelectorAll('h2, p');
                const img = cultureRef.current.querySelector(".sectionImage img");

                gsap.fromTo(
                    textEls,
                    { opacity: 0, y: 60 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 1,
                        stagger: 0.25,
                        scrollTrigger: {
                            trigger: cultureRef.current,
                            start: 'top 80%',
                        },
                    }
                );

                if (img) {
                    gsap.fromTo(
                        img,
                        { scale: 1.03, opacity: 0, y: 40 },
                        {
                            scale: 1,
                            opacity: 1,
                            y: 0,
                            duration: 1.1,
                            ease: 'power3.out',
                            scrollTrigger: {
                                trigger: cultureRef.current,
                                start: 'top 80%',
                            },
                        }
                    );
                    parallaxImage(img, cultureRef.current, 14);
                }
            }

            // ===== TEAM (Interactive cards) =====
            if (teamRef.current) {
                const members = teamRef.current.querySelectorAll(".teamMember");

                gsap.fromTo(
                    members,
                    { opacity: 0, y: 80, scale: 0.9, rotationX: 15 },
                    {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        rotationX: 0,
                        duration: 0.8,
                        stagger: 0.12,
                        ease: 'back.out(1.7)',
                        scrollTrigger: {
                            trigger: teamRef.current,
                            start: 'top 85%',
                        },
                    }
                );

                members.forEach((member) => {
                    const onMove = (e) => {
                        const rect = member.getBoundingClientRect();
                        const relX = e.clientX - rect.left;
                        const relY = e.clientY - rect.top;
                        const moveX = (relX - rect.width / 2) / 12;
                        const moveY = (relY - rect.height / 2) / 12;

                        gsap.to(member, {
                            rotationY: moveX,
                            rotationX: -moveY,
                            y: -16,
                            scale: 1.03,
                            boxShadow: '0 26px 80px rgba(0,0,0,0.85)',
                            borderColor: 'rgba(255,163,0,0.8)',
                            duration: 0.3,
                            ease: 'power3.out',
                        });
                    };

                    const onLeave = () => {
                        gsap.to(member, {
                            rotationY: 0,
                            rotationX: 0,
                            y: 0,
                            scale: 1,
                            boxShadow: '0 20px 55px rgba(0,0,0,0.7)',
                            borderColor: 'rgba(255,163,0,0.1)',
                            duration: 0.4,
                            ease: 'power2.out',
                        });
                    };

                    member.addEventListener('mousemove', onMove);
                    member.addEventListener('mouseleave', onLeave);

                    ScrollTrigger.addEventListener('refreshInit', () => {
                        member.removeEventListener('mousemove', onMove);
                        member.removeEventListener('mouseleave', onLeave);
                    });
                });
            }

            // ===== JOIN =====
            if (joinRef.current) {
                gsap.fromTo(
                    joinRef.current.querySelectorAll('h2, p'),
                    { opacity: 0, y: 60 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 1,
                        stagger: 0.2,
                        scrollTrigger: {
                            trigger: joinRef.current,
                            start: 'top 85%',
                        },
                    }
                );

                const btn = joinRef.current.querySelector(".btnJoin");
                if (btn) {
                    gsap.fromTo(
                        btn,
                        { scale: 0.88, opacity: 0, rotation: 5 },
                        {
                            scale: 1,
                            opacity: 1,
                            rotation: 0,
                            duration: 0.8,
                            ease: 'back.out(1.7)',
                            scrollTrigger: {
                                trigger: joinRef.current,
                                start: 'top 85%',
                            },
                        }
                    );
                }
            }

            // ===== SCROLL TOP visibility =====
            const handleScroll = () => {
                if (window.scrollY > 500) {
                    setShowScrollTop(true);
                } else {
                    setShowScrollTop(false);
                }
            };
            window.addEventListener('scroll', handleScroll);

            ScrollTrigger.refresh();

            return () => {
                window.removeEventListener('scroll', handleScroll);
            };
        }, mainRef);

        return () => {
            ctx.revert();
        };
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="aboutPage" ref={mainRef}>
            <Navbar />
            {/* Hero Section */}
            <section className="pageHero" ref={heroRef}>
                <h1
                    ref={heroTitleRef}
                    className="heroTitle"
                >
                    ABOUT US
                </h1>
                <p className="heroSubtitle">
                    Discover the journey, achievements, and culture of the IEEE Computer Society at
                    Rajalakshmi Engineering College.
                </p>
                <div className="divider"></div>
            </section>

            <main>
                {/* Story Section */}
                <section
                    className="contentSection storySection"
                    id="story"
                    ref={storyRef}
                >
                    <div className="sectionContainer">
                        <div className="sectionText">
                            <h2>Our Journey</h2>
                            <p>
                                The IEEE Computer Society at Rajalakshmi Engineering College is more than just
                                a student chapter - it's a thriving ecosystem where technology meets
                                innovation. We empower students to transform theoretical knowledge into
                                practical solutions through immersive workshops, hackathons, and industry
                                partnerships.
                            </p>
                            <p>
                                Since our inception in 2010, we've evolved into a premier technical
                                community, consistently pushing boundaries and setting benchmarks in
                                student-led technological innovation.
                            </p>
                        </div>
                        <div className="sectionImage">
                            <img src={recCollegeImg} alt="Our Journey" />
                        </div>
                    </div>
                </section>

                {/* Impact Section */}
                <section
                    className="contentSection impactSection"
                    id="impact"
                    ref={impactRef}
                >
                    <div className="sectionContainer">
                        <div className="sectionImage">
                            <img src={iccdsImg} alt="Our Achievements" />
                        </div>
                        <div className="sectionText">
                            <h2>Our Achievements</h2>
                            <p>
                                Our initiatives have created ripples of change, transforming students into
                                industry-ready professionals and innovative thinkers. We measure our success
                                not just in numbers, but in the growth stories of our members.
                            </p>
                            <p>
                                With 750+ students trained in emerging technologies, 150+ successful career
                                placements, and 75+ award-winning projects, we've established ourselves
                                as a launchpad for technological excellence.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Culture Section */}
                <section
                    className="contentSection cultureSection"
                    id="culture"
                    ref={cultureRef}
                >
                    <div className="sectionContainer">
                        <div className="sectionText">
                            <h2>Our Ethos</h2>
                            <p>
                                At our core, we believe in the power of collaborative innovation. Our culture
                                celebrates diversity, encourages curiosity, and fosters a growth mindset where
                                every member contributes to our collective success.
                            </p>
                            <p>
                                We've created an inclusive environment where beginners and experts alike
                                can thrive. Through peer learning sessions and mentorship programs, we ensure
                                continuous knowledge exchange and skill development.
                            </p>
                        </div>
                        <div className="sectionImage">
                            <img
                                src="https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1470&q=80"
                                alt="Our Community"
                            />
                        </div>
                    </div>
                </section>

                {/* Team Section */}
                <section className="teamSection" id="team" ref={teamRef}>
                    <h2 className="sectionTitle">Our Core Team</h2>
                    <p
                        style={{
                            textAlign: 'center',
                            maxWidth: '800px',
                            margin: '0 auto 40px',
                            opacity: 1,
                            transform: 'none',
                            color: 'rgba(255,255,255,0.85)',
                        }}
                    >
                        For any queries, feel free to contact our team members directly
                    </p>
                    <div className="teamGrid">
                        <div className="teamMember">
                            <h3>Gokulasarathy P S</h3>
                            <p>Chairman</p>
                            <div className="contactNumber">
                                <i className="fas fa-phone"></i>
                                <a href="tel:+919940013827">+91 9940013827</a>
                            </div>
                        </div>
                        <div className="teamMember">
                            <h3>Himeshwar N</h3>
                            <p>Secretary</p>
                            <div className="contactNumber">
                                <i className="fas fa-phone"></i>
                                <a href="tel:+919361575441">+91 9361575441</a>
                            </div>
                        </div>
                        <div className="teamMember">
                            <h3>Gokul Anand B</h3>
                            <p>Webmaster</p>
                            <div className="contactNumber">
                                <i className="fas fa-phone"></i>
                                <a href="tel:+918015105047">+91 8015105047</a>
                            </div>
                        </div>
                        <div className="teamMember">
                            <h3>Srivarshini</h3>
                            <p>Treasurer</p>
                            <div className="contactNumber">
                                <i className="fas fa-phone"></i>
                                <a href="tel:+916369088909">+91 6369088909</a>
                            </div>
                        </div>
                        <div className="teamMember">
                            <h3>Jayadharshini</h3>
                            <p>PR Lead</p>
                            <div className="contactNumber">
                                <i className="fas fa-phone"></i>
                                <a href="tel:+916374531117">+91 6374531117</a>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Join Section */}
                <section
                    className="contentSection joinSection"
                    id="join"
                    ref={joinRef}
                >
                    <div className="joinContent">
                        <h2>Join Our Tech Revolution</h2>
                        <p>
                            Become part of a dynamic community that's shaping the future of technology.
                            Whether you're a student looking to grow, a professional seeking to mentor, or
                            an alum wanting to give back, your journey starts here.
                        </p>
                        <a href="https://www.ieee.org/" target="_blank" rel="noopener noreferrer" className="btnJoin">
                            Become a Member
                        </a>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="footer">
                © 2025 IEEE Computer Society — Rajalakshmi Engineering College
            </footer>

            {/* Scroll Top */}
            <button
                ref={scrollTopRef}
                className={`scrollTop ${showScrollTop ? 'scrollTopVisible' : ''
                    }`}
                onClick={scrollToTop}
                aria-label="Scroll to top"
            >
                <i className="fas fa-arrow-up" />
            </button>
        </div>
    );
};

export default About;
