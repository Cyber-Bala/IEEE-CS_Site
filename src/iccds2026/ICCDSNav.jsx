import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import collegeLogo from '../assets/logo/college.png';

const ICCDSNav = () => {
    const [scrolled, setScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isPastEditionsOpen, setIsPastEditionsOpen] = useState(false);
    const pastEditionsRef = useRef(null);
    const navigate = useNavigate();
    const location = useLocation();
    const isHome = location.pathname === '/iccds2026' || location.pathname === '/iccds2026/';

    useEffect(() => {
        const fn = () => setScrolled(window.scrollY > 40);
        window.addEventListener('scroll', fn);
        return () => window.removeEventListener('scroll', fn);
    }, []);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (pastEditionsRef.current && !pastEditionsRef.current.contains(e.target)) {
                setIsPastEditionsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const scrollTo = (id) => {
        setIsMenuOpen(false);
        setIsPastEditionsOpen(false);
        if (!isHome) {
            navigate('/iccds2026');
            setTimeout(() => {
                const el = document.getElementById(id);
                if (el) el.scrollIntoView({ behavior: 'smooth' });
            }, 100);
        } else {
            const el = document.getElementById(id);
            if (el) el.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const pastEditions = [
        { label: 'ICCDS 2025', url: 'https://ieeexplore.ieee.org/xpl/conhome/11208896/proceeding' },
        { label: 'ICCDS 2024', url: 'https://ieeexplore.ieee.org/xpl/conhome/10560061/proceeding' },
    ];

    return (
        <header className={`iccds-hdr ${scrolled ? 'scrolled' : ''} ${isMenuOpen ? 'menu-open' : ''}`}>
            <div className="iccds-hdr-left">
                <img src={collegeLogo} alt="REC" className="iccds-hdr-logo" onClick={() => navigate('/iccds2026')} style={{ cursor: 'pointer' }} />
                <div className="iccds-hdr-divider" />
                <div className="iccds-hdr-brand" onClick={() => navigate('/iccds2026')} style={{ cursor: 'pointer' }}>
                    <span className="iccds-hdr-brand-name">ICCDS 2026</span>
                </div>
            </div>

            <button className="iccds-mobile-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            <nav className={`iccds-hdr-nav ${isMenuOpen ? 'mobile-show' : ''}`}>
                <button onClick={() => isHome ? scrollTo('home') : navigate('/iccds2026')}>Home</button>
                {['about', 'topics', 'timeline', 'committee', 'speakers'].map(s => (
                    <button key={s} onClick={() => scrollTo(s)}>
                        {s === 'topics' ? 'Call for Papers' : s === 'speakers' ? 'Speakers' : s.charAt(0).toUpperCase() + s.slice(1)}
                    </button>
                ))}
                 <button onClick={() => { setIsMenuOpen(false); navigate('/iccds2026/paper-submission'); }}>Paper Submission</button>

                 {/* Past Editions Dropdown */}
                 <div className="iccds-dropdown" ref={pastEditionsRef}>
                    <button
                        className="iccds-dropdown-trigger"
                        onClick={() => setIsPastEditionsOpen(!isPastEditionsOpen)}
                    >
                        Past Editions <ChevronDown size={14} className={`iccds-dropdown-chevron ${isPastEditionsOpen ? 'open' : ''}`} />
                    </button>
                    <div className={`iccds-dropdown-menu ${isPastEditionsOpen ? 'show' : ''}`}>
                        {pastEditions.map((edition) => (
                            <a
                                key={edition.label}
                                href={edition.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="iccds-dropdown-item"
                                onClick={() => { setIsPastEditionsOpen(false); setIsMenuOpen(false); }}
                            >
                                {edition.label}
                            </a>
                        ))}
                    </div>
                 </div>

                <button onClick={() => { setIsMenuOpen(false); navigate('/iccds2026/registration'); }} 
                    className={`iccds-hdr-cta ${location.pathname.includes('registration') ? 'active' : ''}`}>
                    Registration
                </button>
            </nav>
        </header>
    );
};

export default ICCDSNav;
