// EventGallery.jsx
import React, { useEffect, useState, useMemo } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Navbar from "./Navbar";
import "./event.css";

// === IMAGE IMPORTS ====================================================

// DVP talk
import event1 from "../assets/events/event1.JPG";
import event2 from "../assets/events/DCP1.JPG";
import event3 from "../assets/events/DCP2.JPG";
import event4 from "../assets/events/DCP3.JPG";
import event5 from "../assets/events/DCP4.JPG";
import event6 from "../assets/events/DCP5.JPG";
import event7 from "../assets/events/DCP6.JPG";
import event8 from "../assets/events/DCP7.JPG";

// Prompt IQ workshop
import promptIq from "../assets/events/prompt-iq.JPG";
import promptIq1 from "../assets/events/PIq1.JPG";
import promptIq2 from "../assets/events/PIq2.JPEG";
import promptIq3 from "../assets/events/PIq3.JPEG";
import promptIq4 from "../assets/events/PIq4.JPEG";
import promptIq5 from "../assets/events/PIq5.JPEG";
import promptIq6 from "../assets/events/PIq6.JPEG";
import promptIq7 from "../assets/events/PIq7.JPEG";

// Replica
import replica from "../assets/events/replica.JPG";

// Alumni lecture
import alumniLecture from "../assets/events/alumnilecture.JPG";
import alumniLecture2 from "../assets/events/Al2.JPG";
import alumniLecture3 from "../assets/events/Al3.JPG";
import alumniLecture4 from "../assets/events/Al4.JPG";
import alumniLecture5 from "../assets/events/Al5.JPG";
import alumniLecture6 from "../assets/events/Al6.JPG";
import alumniLecture7 from "../assets/events/Al7.JPG";

// Streamlit workshop
import streamlit from "../assets/events/streamlit.jpg";
import streamlit1 from "../assets/events/sl1.jpg";
import streamlit2 from "../assets/events/sl2.jpg";
import streamlit3 from "../assets/events/sl3.jpg";
import streamlit4 from "../assets/events/sl4.jpg";
import streamlit5 from "../assets/events/sl5.jpg";
import streamlit6 from "../assets/events/sl6.jpg";
import streamlit7 from "../assets/events/sl7.jpg";

// Techtopia
import techtopia from "../assets/events/techtopia.png";
import techtopia1 from "../assets/events/Tech1.jpg";
import techtopia2 from "../assets/events/Tech2.jpg";
import techtopia3 from "../assets/events/Tech3.jpg";
import techtopia4 from "../assets/events/Tech4.jpg";
import techtopia5 from "../assets/events/Tech5.jpg";
import techtopia6 from "../assets/events/Tech6.jpg";

// Tech-a-twist
import techATwist from "../assets/events/tech-a-twist.JPG";
import techATwist1 from "../assets/events/Techatwist1.JPG";
import techATwist2 from "../assets/events/Techatwist2.JPG";
import techATwist3 from "../assets/events/Techatwist3.JPG";
import techATwist4 from "../assets/events/Techatwist4.jpg";
import techATwist5 from "../assets/events/Techatwist5.jpg";

// XYNTRA
import xyntra from "../assets/events/xyntra.JPG";
import xyntra1 from "../assets/events/XYNTRA1.png";
import xyntra2 from "../assets/events/XYNTRA2.png";
import xyntra3 from "../assets/events/XYNTRA3.png";
import xyntra4 from "../assets/events/Xyntra1.JPG";
import xyntra5 from "../assets/events/Xyntra2.JPG";
import xyntra6 from "../assets/events/Xyntra3.JPG";
import xyntra7 from "../assets/events/Xyntra4.JPG";
import xyntra8 from "../assets/events/Xyntra5.JPG";
import xyntra9 from "../assets/events/Xyntra6.JPG";
import xyntra0 from "../assets/events/Xyntra7.JPG";

// ICCDS
import iccds from "../assets/events/ICCDS.JPG";
import iccds1 from "../assets/events/ICCDS1.JPG";
import iccds2 from "../assets/events/ICCDS2.JPG";
import iccds3 from "../assets/events/ICCDS3.JPG";
import iccds4 from "../assets/events/ICCDS4.JPG";
import iccds5 from "../assets/events/ICCDS5.JPG";
import iccds6 from "../assets/events/ICCDS6.JPG";
import iccds7 from "../assets/events/ICCDS7.JPG";
import iccds8 from "../assets/events/ICCDS8.JPG";
import iccds9 from "../assets/events/ICCDS9.JPG";
import iccds10 from "../assets/events/ICCDS10.JPG";
import iccds11 from "../assets/events/ICCDS11.JPG";

// === DATA =============================================================

// Per‑event photo sets
const EVENT_PHOTOS = {
  1: [event1, event2, event3, event4, event5, event6, event7, event8],
  2: [promptIq, promptIq1, promptIq2, promptIq3, promptIq4, promptIq5, promptIq6, promptIq7],
  3: [replica],
  4: [alumniLecture, alumniLecture2, alumniLecture3, alumniLecture4, alumniLecture5, alumniLecture6, alumniLecture7],
  5: [streamlit, streamlit1, streamlit2, streamlit3, streamlit4, streamlit5, streamlit6, streamlit7],
  6: [techtopia, techtopia1, techtopia2, techtopia3, techtopia4, techtopia5, techtopia6],
  7: [techATwist, techATwist1, techATwist2, techATwist3, techATwist4, techATwist5],
  8: [xyntra, xyntra1, xyntra2, xyntra3, xyntra4, xyntra5, xyntra6, xyntra7, xyntra8, xyntra9, xyntra0],
  9: [iccds, iccds1, iccds2, iccds3, iccds4, iccds5, iccds6, iccds7, iccds8, iccds9, iccds10, iccds11]
};

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
    upcoming: false
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
    upcoming: false
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
    upcoming: false
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
    upcoming: false
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
    upcoming: false
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
    upcoming: false
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
    upcoming: false
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
    upcoming: false
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
    upcoming: false
  }
];

const FILTERS = [
  { key: "all", label: "All Events" },
  { key: "workshop", label: "Workshops" },
  { key: "talk", label: "Talks" },
  { key: "competition", label: "Competitions" }
];

// subtle unique rotation per index (kept but clamped)
const getRandomRotation = (index) => {
  const seed = (index + 3) * 7919;
  const val = ((seed % 9) - 4); // -4 to 4 degrees, small
  return val;
};

const eventIntroClass = (event) => {
  if (!event) return "eg-photo-intro-generic";
  switch (event.category) {
    case "workshop":
      return "eg-photo-intro-workshop";
    case "talk":
      return "eg-photo-intro-talk";
    case "competition":
      return "eg-photo-intro-competition";
    default:
      return "eg-photo-intro-generic";
  }
};

export default function EventGallery() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxEvent, setLightboxEvent] = useState(null);

  const [photoViewerEvent, setPhotoViewerEvent] = useState(null);
  const [photoIntroDone, setPhotoIntroDone] = useState(false);
  const [photoCycleIndex, setPhotoCycleIndex] = useState(0);
  const [photoGridTransform, setPhotoGridTransform] = useState({
    rotateX: 16,
    rotateY: -10
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    AOS.init({
      duration: 700,
      easing: "ease-out-cubic",
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

  // auto slideshow
  useEffect(() => {
    if (!filteredEvents.length) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) =>
        prev + 1 >= filteredEvents.length ? 0 : prev + 1
      );
    }, 7000);
    return () => clearInterval(interval);
  }, [filteredEvents.length]);

  const currentEvent = filteredEvents[activeIndex] || null;

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

  const openPhotoViewer = (eventObj) => {
    setPhotoViewerEvent(eventObj);
    setPhotoIntroDone(false);
    setPhotoCycleIndex(0);
    setPhotoGridTransform({ rotateX: 16, rotateY: -10 });
  };

  // auto cycle photos only after intro
  useEffect(() => {
    if (!photoViewerEvent || !photoIntroDone) return;
    const photos = EVENT_PHOTOS[photoViewerEvent.id] || [
      photoViewerEvent.image
    ];
    if (!photos.length) return;

    const interval = setInterval(() => {
      setPhotoCycleIndex((prev) =>
        prev + 1 >= photos.length ? 0 : prev + 1
      );
    }, 3500);
    return () => clearInterval(interval);
  }, [photoViewerEvent, photoIntroDone]);

  const currentPhotoSrc =
    photoViewerEvent &&
    (EVENT_PHOTOS[photoViewerEvent.id] || [photoViewerEvent.image])[
      photoCycleIndex
    ];

  const handlePhotoMouseMove = (e) => {
    if (!photoViewerEvent) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    const rotateY = (x - 0.5) * 14;
    const rotateX = (0.5 - y) * 14;

    setPhotoGridTransform({
      rotateX,
      rotateY
    });
  };

  // keyboard navigation inside viewer
  useEffect(() => {
    if (!photoViewerEvent) return;
    const handler = (e) => {
      if (e.key === "Escape") {
        setPhotoViewerEvent(null);
        return;
      }
      if (!photoIntroDone) {
        // hitting any key exits intro fast
        setPhotoIntroDone(true);
        return;
      }

      const photos =
        EVENT_PHOTOS[photoViewerEvent.id] || [photoViewerEvent.image];
      if (!photos.length) return;

      if (e.key === "ArrowRight") {
        setPhotoCycleIndex((prev) =>
          prev + 1 >= photos.length ? 0 : prev + 1
        );
      }
      if (e.key === "ArrowLeft") {
        setPhotoCycleIndex((prev) =>
          prev - 1 < 0 ? photos.length - 1 : prev - 1
        );
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [photoViewerEvent, photoIntroDone]);

  return (
    <div className="eg-body">
      <Navbar />

      {/* HERO */}
      <section className="eg-hero">
        <div className="cyber-grid" />
        <div className="hero-noise" />

        <div className="hero-content" data-aos="fade-up">
          <h1 className="glitch-text">
            <span>EVENT</span>
            <span> GALLERY</span>
          </h1>
          <p className="hero-subtitle">
            Explore our curated collection of workshops, hackathons, and expert
            talks hosted by the IEEE Computer Society.
          </p>

          <a
            href="#events-main"
            className="btn-join-cyber"
            style={{ marginTop: "40px" }}
          >
            <span className="btn-text">BROWSE EVENTS</span>
          </a>
        </div>
      </section>

      {/* FILTERS */}
      <div id="events-main" className="eg-filters" data-aos="fade-up">
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

      {/* MAIN */}
      <main className="eg-main">
        {/* SLIDESHOW */}
        <section
          className="eg-slideshow eg-slide-animate"
          key={currentEvent ? currentEvent.id : "empty"}
          data-aos="fade-up"
        >
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
                  <button
                    className="eg-btn-ghost"
                    onClick={() => openPhotoViewer(currentEvent)}
                  >
                    View Photo Dump
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
                    onClick={() => setActiveIndex(idx)}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
            </>
          ) : (
            <div className="eg-empty-state">
              <p>
                No events found for this category at the moment. Please check
                back later!
              </p>
            </div>
          )}
        </section>

        {/* GRID OF EVENTS */}
        <section className="eg-grid-section" data-aos="fade-up">
          <h3 className="eg-section-title">All Moments</h3>
          <div className="eg-grid">
            {filteredEvents.map((e, idx) => (
              <article
                key={e.id}
                className={
                  "eg-card" +
                  (idx === activeIndex ? " eg-card-active" : "") +
                  " eg-card-animate"
                }
                onClick={() => {
                  setActiveIndex(idx);
                  openPhotoViewer(e);
                }}
                style={{ "--eg-card-index": idx }}
              >
                <div className="eg-card-img-wrap">
                  <img
                    src={e.image}
                    alt={e.title}
                    className="eg-card-img"
                    loading="lazy"
                  />
                  <div className="eg-card-img-overlay" />
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

      {/* LIGHTBOX (SINGLE POSTER IMAGE) */}
      {lightboxEvent && (
        <div className="eg-lightbox" onClick={() => setLightboxEvent(null)}>
          <div
            className="eg-lightbox-inner eg-lightbox-animate"
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
                  <span className="eg-status-closed">Registration Closed</span>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* IMMERSIVE PHOTO VIEWER */}
      {photoViewerEvent && (
        <div
          className="eg-photo-viewer"
          onClick={() => {
            setPhotoViewerEvent(null);
          }}
        >
          <div
            className="eg-photo-viewer-inner"
            onClick={(e) => e.stopPropagation()}
            onMouseMove={handlePhotoMouseMove}
          >
            <button
              className="eg-lightbox-close eg-photo-viewer-close"
              onClick={() => setPhotoViewerEvent(null)}
            >
              <i className="fas fa-times" />
            </button>

            {/* reactive grid bg */}
            <div
              className="eg-photo-bg-grid"
              style={{
                transform: `perspective(900px) rotateX(${photoGridTransform.rotateX}deg) rotateY(${photoGridTransform.rotateY}deg)`
              }}
            />
            <div className="eg-photo-bg-noise" />

            {/* EVENT-SPECIFIC INTRO (FULLSCREEN) */}
            {!photoIntroDone && (
              <div
                className={
                  "eg-photo-intro-full " + eventIntroClass(photoViewerEvent)
                }
                onAnimationEnd={() => setPhotoIntroDone(true)}
                onClick={() => setPhotoIntroDone(true)} // tap to skip
              >
                <div className="eg-photo-intro-left">
                  <span className="eg-pill eg-photo-intro-tag">
                    {photoViewerEvent.category.toUpperCase()}
                  </span>
                  <h2 className="eg-photo-intro-title">
                    {photoViewerEvent.title}
                  </h2>
                  <p className="eg-photo-intro-meta">
                    {photoViewerEvent.date} • {photoViewerEvent.venue}
                  </p>
                  <p className="eg-photo-intro-desc">
                    {photoViewerEvent.description}
                  </p>
                  <div className="eg-photo-intro-hint">
                    <span className="eg-photo-intro-dot" />
                    <span>
                      Immersive recap loading. Tap or press any key to enter.
                    </span>
                  </div>
                </div>
                <div className="eg-photo-intro-right">
                  <div className="eg-photo-intro-preview">
                    <img
                      src={
                        (EVENT_PHOTOS[photoViewerEvent.id] ||
                          [photoViewerEvent.image])[0]
                      }
                      alt={photoViewerEvent.title}
                    />
                    <div className="eg-photo-intro-scrim" />
                  </div>
                </div>
              </div>
            )}

            {/* BINGE-WORTHY FLOW */}
            {photoIntroDone && (
              <div className="eg-photo-immersive-layout">
                {/* LEFT: header + main photo + progress */}
                <div className="eg-photo-main-column">
                  <header className="eg-photo-header">
                    <div className="eg-photo-header-text">
                      <span className="eg-pill eg-photo-header-pill">
                        {photoViewerEvent.category.toUpperCase()}
                      </span>
                      <h2 className="eg-photo-header-title">
                        {photoViewerEvent.title}
                      </h2>
                      <p className="eg-photo-header-sub">
                        {photoViewerEvent.date} • {photoViewerEvent.venue}
                      </p>
                    </div>
                    <div className="eg-photo-header-count">
                      <span className="eg-photo-count-current">
                        {photoCycleIndex + 1}
                      </span>
                      <span className="eg-photo-count-divider">/</span>
                      <span className="eg-photo-count-total">
                        {(EVENT_PHOTOS[photoViewerEvent.id] ||
                          [photoViewerEvent.image]).length}
                      </span>
                    </div>
                  </header>

                  <div
                    className="eg-photo-main-frame"
                    onClick={() => {
                      const photos =
                        EVENT_PHOTOS[photoViewerEvent.id] ||
                        [photoViewerEvent.image];
                      setPhotoCycleIndex((prev) =>
                        prev + 1 >= photos.length ? 0 : prev + 1
                      );
                    }}
                  >
                    <div className="eg-photo-main-parallax">
                      <img
                        src={currentPhotoSrc}
                        alt={photoViewerEvent.title}
                        className="eg-photo-main-img"
                        key={currentPhotoSrc}
                      />
                    </div>
                    <div className="eg-photo-main-hint">
                      Click or press → to jump to next • ← to go back
                    </div>
                  </div>

                  <div className="eg-photo-progress">
                    <div
                      className="eg-photo-progress-bar"
                      style={{
                        width: `${
                          ((photoCycleIndex + 1) /
                            (EVENT_PHOTOS[photoViewerEvent.id] ||
                              [photoViewerEvent.image]).length) * 100
                        }%`
                      }}
                    />
                  </div>
                </div>

                {/* RIGHT: vertical film-strip */}
                <aside className="eg-photo-strip-column">
                  <div className="eg-photo-strip-header">
                    <span className="eg-photo-strip-label">Photo reel</span>
                    <span className="eg-photo-strip-hint">
                      Scroll & pick any frame
                    </span>
                  </div>
                  <div className="eg-photo-strip-scroll">
                    {(EVENT_PHOTOS[photoViewerEvent.id] ||
                      [photoViewerEvent.image]
                    ).map((src, idx) => {
                      const rotation = getRandomRotation(idx);
                      const active = idx === photoCycleIndex;
                      return (
                        <button
                          key={idx}
                          className={
                            "eg-photo-strip-item" +
                            (active ? " eg-photo-strip-item-active" : "")
                          }
                          style={{
                            transform: `rotate(${rotation}deg)`
                          }}
                          onClick={() => setPhotoCycleIndex(idx)}
                        >
                          <div className="eg-photo-strip-img-wrap">
                            <img src={src} alt="" loading="lazy" />
                          </div>
                          <span className="eg-photo-strip-index">
                            {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </aside>
              </div>
            )}
          </div>
        </div>
      )}

      <footer className="eg-footer">
        &copy; 2025 IEEE Computer Society — Rajalakshmi Engineering College
      </footer>
    </div>
  );
}