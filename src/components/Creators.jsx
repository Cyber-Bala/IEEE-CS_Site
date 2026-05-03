import React, { useEffect } from 'react';
import Navbar from './Navbar';
import './Creators.css';
import AOS from 'aos';
import 'aos/dist/aos.css';

// Import images from team assets
import balamurugan from '../assets/team/balamurugan.jpg';
import mettu from '../assets/team/mettu.jpg';
import kaviarasi from '../assets/team/kaviarasi.png';
import venkat from '../assets/team/venkat.jpg';
import gokulanand from '../assets/team/gokulanand.jpg';

const CreatorCard = ({ name, role, image, github, linkedin, delay }) => (
    <div className="creator-card-modern" data-aos="fade-up" data-aos-delay={delay}>
        <div className="card-outer">
            <div className="creator-img-wrap">
                <img src={image} alt={name} />
                <div className="img-overlay"></div>
            </div>
            <div className="creator-details">
                <h3>{name}</h3>
                <p className="creator-role">{role}</p>
                <div className="creator-social-links">
                    <a href={github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                        <i className="fab fa-github"></i>
                    </a>
                    <a href={linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                        <i className="fab fa-linkedin"></i>
                    </a>
                </div>
            </div>
        </div>
    </div>
);

const Creators = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
        AOS.init({
            duration: 1000,
            easing: 'ease-out-back',
            once: true
        });
    }, []);

    const creatorData = [
        {
            name: "Gokul Anand",
            role: "Web Master",
            image: gokulanand,
            github: "https://github.com/gokulanand-p",
            linkedin: "https://www.linkedin.com/in/gokul-anand-p-01b4a1258/",
            delay: "50"
        },
        {
            name: "Balamurugan S",
            role: "Developer",
            image: balamurugan,
            github: "https://github.com/Cyber-Bala",
            linkedin: "https://www.linkedin.com/in/balamurugan-s-18229732b/",
            delay: "100"
        },
        {
            name: "Mettu Mani Chandhan",
            role: "Developer",
            image: mettu,
            github: "https://github.com/Batman7mani",
            linkedin: "https://www.linkedin.com/in/mettu-mani-chandhan-sai-993b5b32a/",
            delay: "200"
        },
        {
            name: "Kaviarasi M",
            role: "Developer",
            image: kaviarasi,
            github: "https://github.com/Kaviarasi18",
            linkedin: "https://www.linkedin.com/in/kaviarasi-m-16170132b",
            delay: "300"
        },
        {
            name: "Venkat Prashad A",
            role: "Developer",
            image: venkat,
            github: "https://github.com/V3NK47XD",
            linkedin: "https://www.linkedin.com/in/v3nk47/",
            delay: "400"
        }
    ];

    return (
        <div className="creators-page">
            <Navbar />

            <section className="creators-hero">
                <div className="hero-glow"></div>
                <div className="hero-content" data-aos="fade-down">
                    <span className="eyebrow">SYSTEM ARCHITECTS</span>
                    <h1 className="title">Website Creators</h1>
                    <div className="title-underline"></div>
                    <p className="subtitle">
                        The creative minds behind the digital face of IEEE CS REC.
                        Engineering innovation, pixel by pixel.
                    </p>
                </div>
            </section>

            <main className="creators-main">
                <div className="creators-grid-modern">
                    {creatorData.map((creator, index) => (
                        <CreatorCard key={index} {...creator} />
                    ))}
                </div>
            </main>

            <footer className="creators-footer">
                <p>&copy; 2026 IEEE Computer Society — Rajalakshmi Engineering College</p>
            </footer>
        </div>
    );
};

export default Creators;
