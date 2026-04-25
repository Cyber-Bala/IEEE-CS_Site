import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';
import collegeLogo from '../assets/logo/college.png';
import ieeeLogo from '../assets/logo/ieee_cs.png';

const Navbar = () => {
    const [isMobileMenuActive, setIsMobileMenuActive] = useState(false);
    const location = useLocation();
    const headerRef = useRef(null);

    const close = () => setIsMobileMenuActive(false);

    // Dynamically calculate header height to prevent overlaps globally
    useEffect(() => {
        if (!headerRef.current) return;
        const resizeObserver = new ResizeObserver((entries) => {
            const navHeight = entries[0].target.offsetHeight;
            document.documentElement.style.setProperty('--navbar-height', `${navHeight}px`);
        });
        resizeObserver.observe(headerRef.current);
        return () => resizeObserver.disconnect();
    }, []);

    // Lock body scroll when menu is open
    useEffect(() => {
        document.body.style.overflow = isMobileMenuActive ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [isMobileMenuActive]);

    // Close menu on route change
    useEffect(() => { close(); }, [location]);

    // The mobile menu is rendered via a Portal directly into document.body,
    // completely escaping any parent stacking context (backdrop-filter, overflow, transform).
    const mobileMenu = ReactDOM.createPortal(
        <>
            {/* Full-screen frosted glass menu panel */}
            <nav
                className={`mobile-nav ${isMobileMenuActive ? 'mobile-nav--open' : ''}`}
                aria-label="Mobile Navigation"
            >
                {/* Close button */}
                <button className="mobile-nav__close" onClick={close} aria-label="Close menu">
                    <i className="fas fa-times"></i>
                </button>

                <Link to="/" className={location.pathname === '/' ? 'mobile-nav__link active' : 'mobile-nav__link'} style={{ '--i': 1 }} onClick={close}>Home</Link>
                <Link to="/about" className={location.pathname === '/about' ? 'mobile-nav__link active' : 'mobile-nav__link'} style={{ '--i': 2 }} onClick={close}>About Us</Link>
                <Link to="/team" className={location.pathname === '/team' ? 'mobile-nav__link active' : 'mobile-nav__link'} style={{ '--i': 3 }} onClick={close}>Our Team</Link>
                <Link to="/events" className={location.pathname === '/events' ? 'mobile-nav__link active' : 'mobile-nav__link'} style={{ '--i': 4 }} onClick={close}>Events & Gallery</Link>
                <Link to="/contact" className={location.pathname === '/contact' ? 'mobile-nav__link active' : 'mobile-nav__link'} style={{ '--i': 5 }} onClick={close}>Contact Us</Link>
                <Link to="/iccds2026" className={location.pathname === '/iccds2026' ? 'mobile-nav__link active' : 'mobile-nav__link'} style={{ '--i': 6 }} onClick={close}>ICCDS 2026</Link>
            </nav>
        </>,
        document.body
    );

    return (
        <>
            <header className="header" ref={headerRef}>
                <div className="logo-container">
                    <Link to="/" onClick={close}>
                        <img src={collegeLogo} className="logo-left" alt="College Logo" />
                    </Link>
                    <img src={ieeeLogo} className="logo-right" alt="IEEE CS Logo" />
                </div>

                {/* Desktop nav — inline in header */}
                <nav className="navbar" aria-label="Main Navigation">
                    <Link to="/" className={location.pathname === '/' ? 'active' : ''} onClick={close}>Home</Link>
                    <Link to="/about" className={location.pathname === '/about' ? 'active' : ''} onClick={close}>About Us</Link>
                    <Link to="/team" className={location.pathname === '/team' ? 'active' : ''} onClick={close}>Our Team</Link>
                    <Link to="/events" className={location.pathname === '/events' ? 'active' : ''} onClick={close}>Events & Gallery</Link>
                    <Link to="/contact" className={location.pathname === '/contact' ? 'active' : ''} onClick={close}>Contact Us</Link>
                    <Link to="/iccds2026" className={location.pathname === '/iccds2026' ? 'active iccds-nav-highlight' : 'iccds-nav-highlight'} onClick={close}>ICCDS 2026</Link>
                </nav>

                <button
                    className="mobile-menu-btn"
                    aria-label={isMobileMenuActive ? 'Close menu' : 'Open menu'}
                    aria-expanded={isMobileMenuActive}
                    onClick={() => setIsMobileMenuActive(prev => !prev)}
                >
                    <i className={`fas ${isMobileMenuActive ? 'fa-times' : 'fa-bars'}`}></i>
                </button>
            </header>

            {/* Portal: renders outside #root, directly into body */}
            {mobileMenu}
        </>
    );
};

export default Navbar;
