import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';
import collegeLogo from '../assets/logo/college.png';
import ieeeLogo from '../assets/logo/ieee_cs.png';

const Navbar = () => {
    const [isMobileMenuActive, setIsMobileMenuActive] = useState(false);
    const location = useLocation();
    const isHomePage = location.pathname === '/';

    const getPath = (hash) => {
        return isHomePage ? hash : `/${hash}`;
    };

    // Toggle body class to blur the page content when menu is open
    useEffect(() => {
        if (isMobileMenuActive) {
            document.body.classList.add('menu-open');
        } else {
            document.body.classList.remove('menu-open');
        }
        return () => document.body.classList.remove('menu-open');
    }, [isMobileMenuActive]);

    return (
        <>
            {/* Full-screen blur overlay — sits above page content, below the header+menu */}
            <div
                className={`menu-blur-overlay ${isMobileMenuActive ? 'active' : ''}`}
                onClick={() => setIsMobileMenuActive(false)}
            />

            <header className="header">
                <div className="logo-container">
                    <Link to="/" onClick={() => setIsMobileMenuActive(false)}>
                        <img src={collegeLogo} className="logo-left" alt="College Logo" />
                    </Link>
                    <img src={ieeeLogo} className="logo-right" alt="IEEE CS Logo" />
                </div>

                <nav className={`navbar ${isMobileMenuActive ? 'active' : ''}`} aria-label="Main Navigation">
                    <Link to="/" onClick={() => setIsMobileMenuActive(false)}>Home</Link>
                    <a href={getPath('#about')} onClick={() => setIsMobileMenuActive(false)}>About Us</a>
                    <Link to="/team" className={location.pathname === '/team' ? 'active' : ''} onClick={() => setIsMobileMenuActive(false)}>Our Team</Link>
                    <a href={getPath('#events')} onClick={() => setIsMobileMenuActive(false)}>Events & Gallery</a>
                    <Link to="/contact" className={location.pathname === '/contact' ? 'active' : ''} onClick={() => setIsMobileMenuActive(false)}>Contact Us</Link>
                </nav>

                <button
                    className="mobile-menu-btn"
                    aria-label="Open menu"
                    onClick={() => setIsMobileMenuActive(!isMobileMenuActive)}
                >
                    <i className={`fas ${isMobileMenuActive ? 'fa-times' : 'fa-bars'}`}></i>
                </button>
            </header>
        </>
    );
};

export default Navbar;
