import React, { useEffect, useState, useMemo } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Navbar from "./Navbar";
import "./event.css";

// images
import collegeLogo from "../assets/logo/college.png";
import ieeeCsLogo from "../assets/logo/ieee_cs.png";

import event1 from "../assets/events/event1.JPG";
import promptIq from "../assets/events/prompt-iq.JPG";
import replica from "../assets/events/replica.JPG";
import alumniLecture from "../assets/events/alumnilecture.JPG";
import streamlit from "../assets/events/streamlit.jpg";
import techtopia from "../assets/events/techtopia.png";
import techATwist from "../assets/events/tech-a-twist.JPG";
import xyntra from "../assets/events/xyntra.JPG";
import iccds from "../assets/events/ICCDS.JPG";

const EVENTS = [
    {
        id: 1,
        title: "DVP Talk: Intelligent Systems",
        category: "talk",
        date: "29th August 2024",
        time: "2:00 PM - 4:00 PM",
        venue: "2nd Floor, Idea Factory (KS01)",
        description:
            "The DVP Lecture on Intelligent Systems and Smart Applications gave 2nd and 3rd year CSE students valuable insights into new technologies.",
        image: event1,
        upcoming: false,
    },
    {
        id: 2,
        title: "Prompt IQ Workshop",
        category: "workshop",
        date: "22nd February 2025",
        time: "10:00 AM - 1:00 PM",
        venue: "Idea Factory, 2nd Floor",
        description:
            "The workshop introduced students to crafting effective prompts for AI applications, offering a hands-on session led by an industry expert.",
        image: promptIq,
        upcoming: false,
    },
    {
        id: 3,
        title: "Replica Rumble",
        category: "competition",
        date: "3rd September 2024",
        time: "9:00 AM - 5:00 PM",
        venue: "TechLounge Ground Floor",
        description:
            "Replica Rumble challenged students' web development skills while fostering collaboration in this exciting competition.",
        image: replica,
        upcoming: false,
    },
    {
        id: 4,
        title: "Alumni Lecture: Secure Web Apps",
        category: "talk",
        date: "3rd September 2024",
        time: "3:00 PM - 5:00 PM",
        venue: "A309",
        description:
            "The Alumni Lecture on Secure Web Apps with Angular gave students valuable insights into secure coding and web security practices.",
        image: alumniLecture,
        upcoming: false,
    },
    {
        id: 5,
        title: "Streamlit Workshop",
        category: "workshop",
        date: "1st August 2024",
        time: "10:00 AM - 1:00 PM",
        venue: "A309",
        description:
            "Participants gained practical knowledge in using Streamlit to create intuitive UIs and develop interactive applications.",
        image: streamlit,
        upcoming: false,
    },
    {
        id: 6,
        title: "Techtopia 2024",
        category: "competition",
        date: "3rd August 2024",
        time: "9:00 AM - 6:00 PM",
        venue: "IDEA LAB",
        description:
            "Techtopia featured four activities designed to challenge students, foster innovation, and showcase their technical skills.",
        image: techtopia,
        upcoming: false,
    },
    {
        id: 7,
        title: "TECH-A-TWIST",
        category: "competition",
        date: "30th July",
        time: "10:00 AM - 4:00 PM",
        venue: "IDEA LAB",
        description:
            "Tech-A-Twist engaged students through technical and non-technical activities, fostering creativity and teamwork.",
        image: techATwist,
        upcoming: false,
    },
    {
        id: 8,
        title: "XYNTRA 2025",
        category: "competition",
        date: "April 12, 2025",
        time: "8:00 AM - 6:00 PM (36 Hours)",
        venue: "Indoor Auditorium",
        description:
            "A 36-hour international hackathon bringing together innovators, coders, and creators from around the globe to solve real-world challenges.",
        image: xyntra,
        upcoming: false,
    },
    {
        id: 9,
        title: "ICCDS 2025",
        category: "competition",
        date: "Jun 5, 2024",
        time: "10:00 AM - 4:00 PM",
        venue: "MAIN BLOCK",
        description:
            "A premier academic and research event that brings together researchers, industry experts, and students from across the globe.",
        image: iccds,
        upcoming: false,
    },
];

const FILTERS = [
    { key: "all", label: "All Events" },
    { key: "workshop", label: "Workshops" },
    { key: "talk", label: "Talks" },
    { key: "competition", label: "Competitions" },
];

export default function EventGallery() {
    const [activeFilter, setActiveFilter] = useState("all");
    const [activeIndex, setActiveIndex] = useState(0);
    const [lightboxEvent, setLightboxEvent] = useState(null);

    useEffect(() => {
        window.scrollTo(0, 0);
        AOS.init({
            duration: 1000,
            easing: "ease-out-back",
            once: true
        });
    }, []);

    const filteredEvents = useMemo(() => {
        if (activeFilter === "all") return EVENTS;
        return EVENTS.filter((e) => e.category === activeFilter);
    }, [activeFilter]);

    useEffect(() => {
        setActiveIndex(0);
    }, [activeFilter]);

    useEffect(() => {
        if (!filteredEvents.length) return;
        const interval = setInterval(() => {
            setActiveIndex((prev) =>
                prev + 1 >= filteredEvents.length ? 0 : prev + 1
            );
        }, 6000);
        return () => clearInterval(interval);
    }, [filteredEvents.length]);

    const currentEvent = filteredEvents[activeIndex] || null;

    const handleDotClick = (index) => setActiveIndex(index);
    const handleThumbClick = (index) => setActiveIndex(index);

    const handleNext = () => {
        if (!filteredEvents.length) return;
        setActiveIndex((prev) =>
            prev + 1 >= filteredEvents.length ? 0 : prev + 1
        );
    };

    const handlePrev = () => {
        if (!filteredEvents.length) return;
        setActiveIndex((prev) =>
            prev - 1 < 0 ? filteredEvents.length - 1 : prev - 1
        );
    };

    return (
        <div className="eg-body">
            <Navbar />

            <section className="eg-hero">
                <div className="cyber-grid"></div>
                <div className="hero-noise"></div>

                <div className="hero-content">
                    <h1 className="glitch-text">
                        <span>EVENT</span>
                        <span> GALLERY</span>
                    </h1>
                    <p className="hero-subtitle">
                        Explore our curated collection of workshops, hackathons, and expert
                        talks hosted by the IEEE Computer Society.
                    </p>

                    <a href="#events-main" className="btn-join-cyber" style={{ marginTop: "40px" }}>
                        <span className="btn-text">BROWSE EVENTS</span>
                    </a>
                </div>
            </section>

            <div id="events-main" className="eg-filters">
                {FILTERS.map((f) => (
                    <button
                        key={f.key}
                        className={
                            "eg-filter-btn " + (activeFilter === f.key ? "active" : "")
                        }
                        onClick={() => setActiveFilter(f.key)}
                    >
                        {f.label}
                    </button>
                ))}
            </div>

            <main className="eg-main">
                <section className="eg-slideshow">
                    {currentEvent ? (
                        <>
                            <div
                                className="eg-slide-bg"
                                style={{ backgroundImage: `url(${currentEvent.image})` }}
                            />
                            <div className="eg-slide-overlay" />
                            <div className="eg-slide-content">
                                <div className="eg-slide-meta">
                                    <span className="eg-pill">
                                        {currentEvent.category.toUpperCase()}
                                    </span>
                                    <span className="eg-pill-soft">
                                        {currentEvent.upcoming ? "UPCOMING" : "PAST EVENT"}
                                    </span>
                                </div>
                                <h2 className="eg-slide-title">{currentEvent.title}</h2>
                                <p className="eg-slide-description">
                                    {currentEvent.description}
                                </p>
                                <div className="eg-slide-info">
                                    <span>
                                        <i className="far fa-calendar" /> {currentEvent.date}
                                    </span>
                                    <span>
                                        <i className="far fa-clock" /> {currentEvent.time}
                                    </span>
                                    <span>
                                        <i className="fas fa-location-dot" /> {currentEvent.venue}
                                    </span>
                                </div>
                                <div className="eg-slide-actions">
                                    <button
                                        className="eg-btn-primary"
                                        onClick={() => setLightboxEvent(currentEvent)}
                                    >
                                        View Full Details
                                    </button>
                                </div>
                            </div>

                            <button className="eg-nav-btn prev" onClick={handlePrev}>
                                <i className="fas fa-chevron-left" />
                            </button>
                            <button className="eg-nav-btn next" onClick={handleNext}>
                                <i className="fas fa-chevron-right" />
                            </button>

                            <div className="eg-dots">
                                {filteredEvents.map((e, idx) => (
                                    <button
                                        key={e.id}
                                        className={
                                            "eg-dot " + (idx === activeIndex ? "active" : "")
                                        }
                                        onClick={() => handleDotClick(idx)}
                                        aria-label={`Go to slide ${idx + 1}`}
                                    />
                                ))}
                            </div>
                        </>
                    ) : (
                        <div className="eg-empty-state">
                            <p>No events found for this category at the moment. Please check back later!</p>
                        </div>
                    )}
                </section>

                <section className="eg-grid-section">
                    <h3 className="eg-section-title">All Moments</h3>
                    <div className="eg-grid">
                        {filteredEvents.map((e, idx) => (
                            <article
                                key={e.id}
                                className={
                                    "eg-card " + (idx === activeIndex ? "eg-card-active" : "")
                                }
                                onClick={() => handleThumbClick(idx)}
                            >
                                <div className="eg-card-img-wrap">
                                    <img
                                        src={e.image}
                                        alt={e.title}
                                        className="eg-card-img"
                                        loading="lazy"
                                    />
                                </div>
                                <div className="eg-card-body">
                                    <div className="eg-card-top">
                                        <span className="eg-card-category">
                                            {e.category.toUpperCase()}
                                        </span>
                                        <span className="eg-card-date">{e.date}</span>
                                    </div>
                                    <h4 className="eg-card-title">{e.title}</h4>
                                    <p className="eg-card-desc">{e.description}</p>
                                </div>
                            </article>
                        ))}
                    </div>
                </section>
            </main>

            {lightboxEvent && (
                <div className="eg-lightbox" onClick={() => setLightboxEvent(null)}>
                    <div
                        className="eg-lightbox-inner"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            className="eg-lightbox-close"
                            onClick={() => setLightboxEvent(null)}
                        >
                            <i className="fas fa-times" />
                        </button>
                        <div className="eg-lightbox-media">
                            <img
                                src={lightboxEvent.image}
                                alt={lightboxEvent.title}
                                className="eg-lightbox-img"
                            />
                        </div>
                        <div className="eg-lightbox-details">
                            <span className="eg-pill">
                                {lightboxEvent.category.toUpperCase()}
                            </span>
                            <h2>{lightboxEvent.title}</h2>
                            <p className="eg-lightbox-text">{lightboxEvent.description}</p>
                            <div className="eg-lightbox-meta">
                                <div>
                                    <span className="eg-meta-label">Date</span>
                                    <span className="eg-meta-value">
                                        {lightboxEvent.date || "TBA"}
                                    </span>
                                </div>
                                <div>
                                    <span className="eg-meta-label">Time</span>
                                    <span className="eg-meta-value">
                                        {lightboxEvent.time || "TBA"}
                                    </span>
                                </div>
                                <div>
                                    <span className="eg-meta-label">Venue</span>
                                    <span className="eg-meta-value">
                                        {lightboxEvent.venue || "TBA"}
                                    </span>
                                </div>
                            </div>
                            <div className="eg-lightbox-footer">
                                {lightboxEvent.upcoming ? (
                                    <a
                                        href="https://forms.gle/fqW2GKM7w2gqeTAK6"
                                        target="_blank"
                                        rel="noreferrer"
                                        className="eg-btn-primary"
                                    >
                                        Register Now
                                    </a>
                                ) : (
                                    <span className="eg-status-closed">
                                        Registration Closed
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <footer className="eg-footer">
                &copy; 2025 IEEE Computer Society — Rajalakshmi Engineering College
            </footer>
        </div>
    );
}
