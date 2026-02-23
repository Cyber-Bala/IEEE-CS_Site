import React, { useEffect, useRef } from "react";
import emailjs from "@emailjs/browser";
import AOS from "aos";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "aos/dist/aos.css";
import "./Contact.css";
import Navbar from "./Navbar";

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
            Have questions or want to collaborate?<br/> Drop us a message.
          </p>

          
        </div>
        <a href="#contact-main" className="hero-scroll-indicator">
            <div className="mouse-icon">
              <div className="wheel"></div>
              <div class="arrow-pulse"><i class="fas fa-chevron-down"></i></div>
            </div>
          </a>
      </section>

      <section className="contact-section" id="contact-main">
        <div className="contact-container" data-aos="fade-up">
          <h2>Send Us a Message</h2>

          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="contact-form"
          >
            <div className="form-group">
              <label>Full Name</label>
              <input type="text" name="name" required />
            </div>

            <div className="form-group">
              <label>Email Address</label>
              <input type="email" name="email" required />
            </div>

            <div className="form-group">
              <label>Your Message</label>
              <textarea name="message" rows="6" required></textarea>
            </div>

            <button type="submit" className="btn-submit" id="submitButton">
              <span id="buttonText">Send Message</span>
              <div id="buttonLoading" style={{ display: "none" }}>
                <i className="fas fa-spinner fa-spin"></i> Sending...
              </div>
            </button>

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