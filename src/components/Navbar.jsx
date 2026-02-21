import React, { useState } from 'react';
import './Navbar.css';
import collegeLogo from '../assets/logo/college.png';
import ieeeLogo from '../assets/logo/ieee_cs.png';

const Navbar = () => {
    const [isMobileMenuActive, setIsMobileMenuActive] = useState(false);

    return (
        <header className="header">
            <div className="logo-container">
                <img src={collegeLogo} className="logo-left" alt="College Logo" />
                <img src={ieeeLogo} className="logo-right" alt="IEEE CS Logo" />
            </div>

            <nav className={`navbar ${isMobileMenuActive ? 'active' : ''}`} aria-label="Main Navigation">
                <a href="#home" onClick={() => setIsMobileMenuActive(false)}>Home</a>
                <a href="#about" onClick={() => setIsMobileMenuActive(false)}>About Us</a>
                <a href="#team" onClick={() => setIsMobileMenuActive(false)}>Our Team</a>
                <a href="#events" onClick={() => setIsMobileMenuActive(false)}>Events & Gallery</a>
                <a href="#contact" onClick={() => setIsMobileMenuActive(false)}>Contact Us</a>
            </nav>

            <button
                className="mobile-menu-btn"
                aria-label="Open menu"
                onClick={() => setIsMobileMenuActive(!isMobileMenuActive)}
            >
                <i className={`fas ${isMobileMenuActive ? 'fa-times' : 'fa-bars'}`}></i>
            </button>
        </header>
    );
};

export default Navbar;
