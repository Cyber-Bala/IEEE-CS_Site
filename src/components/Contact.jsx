import React, { useEffect, useRef } from "react";
import emailjs from "@emailjs/browser";
import AOS from "aos";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "aos/dist/aos.css";
import "./Contact.css";
import Navbar from "./Navbar";

const CyberInput = ({ label, name, type = "text", placeholder, required, isTextarea, rows }) => {
  return (
    <div className="form-group">
      <div className="input-container">
        {isTextarea ? (
          <textarea
            name={name}
            className="holo-input holo-textarea"
            placeholder=" "
            rows={rows || 6}
            required={required}
          />
        ) : (
          <input
            type={type}
            name={name}
            className="holo-input"
            placeholder=" "
            required={required}
          />
        )}
        <label className="input-label" data-text={label}>{label}</label>
        <div className="input-border" />
        <div className="input-glow" />
        <div className="input-scanline" />
        <div className="input-corners">
          <span className="corner corner-tl" />
          <span className="corner corner-tr" />
          <span className="corner corner-bl" />
          <span className="corner corner-br" />
        </div>
        <div className="input-data-stream">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="stream-bar" style={{ "--i": i }} />
          ))}
        </div>
      </div>
    </div>
  );
};

const Contact = () => {
  const formRef = useRef();

  useEffect(() => {
    window.scrollTo(0, 0);

    emailjs.init("vx7EqDeI8_u-c6K-2");

    AOS.init({
      duration: 1000,
      easing: "ease-out-back",
      once: true
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const submitButton = document.getElementById("submitButton");
    const buttonText = document.getElementById("buttonText");
    const buttonLoading = document.getElementById("buttonLoading");
    const statusMessage = document.getElementById("statusMessage");

    buttonText.style.display = "none";
    buttonLoading.style.display = "block";
    submitButton.disabled = true;
    statusMessage.style.display = "none";

    emailjs
      .sendForm("service_w8id5ps", "template_gyc608n", formRef.current)
      .then(() => {
        statusMessage.textContent =
          "Message sent successfully! We will get back to you soon.";
        statusMessage.className = "status-message status-success";
        statusMessage.style.display = "block";
        formRef.current.reset();
      })
      .catch(() => {
        statusMessage.textContent =
          "Failed to send message. Please try again later.";
        statusMessage.className = "status-message status-error";
        statusMessage.style.display = "block";
      })
      .finally(() => {
        buttonText.style.display = "block";
        buttonLoading.style.display = "none";
        submitButton.disabled = false;
      });
  };

  return (
    <div className="contact-page">
      <Navbar />

      <section className="contact-hero">
        <div className="cyber-grid"></div>
        <div className="hero-noise"></div>

        <div className="hero-content" data-aos="zoom-out">
          <h1 className="glitch-text">
            <span>CONTACT</span>
            <span>IEEE CS</span>
          </h1>

          <p className="hero-subtitle">
            Have questions or want to collaborate?<br /> Drop us a message.
          </p>

          
           <a href="#contact-main" className="btn-join-cyber" style={{ margin: "50px" }}>
  <span className="btn-text">SEND MESSAGE</span>
</a>

          <div className="social-links" data-aos="fade-up" data-aos-delay="500">
            <span className="social-label">// REACH US ON</span>
            <div className="social-icons">
              <a href="https://instagram.com/YOUR_HANDLE" target="_blank" rel="noopener noreferrer" className="social-icon-btn" aria-label="Instagram">
                <span className="social-icon-inner">
                  <i className="fab fa-instagram"></i>
                </span>
                <span className="social-icon-glow"></span>
              </a>
              <a href="https://wa.me/91XXXXXXXXXX" target="_blank" rel="noopener noreferrer" className="social-icon-btn" aria-label="WhatsApp">
                <span className="social-icon-inner">
                  <i className="fab fa-whatsapp"></i>
                </span>
                <span className="social-icon-glow"></span>
              </a>
              <a href="mailto:ieeecs@example.com" className="social-icon-btn" aria-label="Email">
                <span className="social-icon-inner">
                  <i className="fas fa-envelope"></i>
                </span>
                <span className="social-icon-glow"></span>
              </a>
            </div>
          </div>
        </div>
        <a href="#contact-main" className="hero-scroll-indicator">
          <div className="mouse-icon">
            <div className="wheel"></div>
            <div className="arrow-pulse"><i className="fas fa-chevron-down"></i></div>
          </div>
        </a>
      </section>

      <section className="contact-section" id="contact-main">
        <div className="contact-container" data-aos="fade-up">
          <h2 className="contact-heading">
            <i className="fas fa-envelope"></i>
            <span className="heading-text-wrap">
              <span className="heading-base">&nbsp;Contact Us&nbsp;</span>
              <span aria-hidden="true" className="heading-fill">&nbsp;Contact Us&nbsp;</span>
            </span>
          </h2>

          <p style={{paddingBottom:"50px"}}>
            We'd love to hear from you. <br />
            Fill out the form below and we'll get back to you soon.
          </p>

          <form
            ref={formRef}
            onSubmit={handleSubmit}
            id="contactForm"
            className="contact-form"
          >
            <CyberInput label="Full Name" name="name" type="text" required />
            <CyberInput label="Email Address" name="email" type="email" required />
            <CyberInput label="Your Message" name="message" isTextarea rows={6} required />

            <div className="hero-actions">
              <button type="submit" className="btn-join-cyber" id="submitButton">
                <span className="btn-text" id="buttonText">SEND MESSAGE</span>
                <span id="buttonLoading" style={{ display: "none" }}>
                  <i className="fas fa-spinner fa-spin"></i> SENDING...
                </span>
                <span className="btn-glitch"></span>
              </button>
            </div>

            <div
              id="statusMessage"
              className="status-message"
              style={{ display: "none" }}
            ></div>
          </form>
        </div>
      </section>

      <footer className="copyright-footer">
        © 2025 IEEE Computer Society — Rajalakshmi Engineering College
      </footer>
    </div>
  );
};

export default Contact;