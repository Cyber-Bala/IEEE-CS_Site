import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import collegeLogo from '../assets/logo/college.png';
import ieeeLogo from '../assets/logo/ieee_cs.png';

const ICCDSNav = () => {
    const [scrolled, setScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const isHome = location.pathname === '/iccds2026' || location.pathname === '/iccds2026/';

    useEffect(() => {
        const fn = () => setScrolled(window.scrollY > 40);
        window.addEventListener('scroll', fn);
        return () => window.removeEventListener('scroll', fn);
    }, []);

    const scrollTo = (id) => {
        setIsMenuOpen(false);
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

    return (
        <header className={`iccds-hdr ${scrolled ? 'scrolled' : ''} ${isMenuOpen ? 'menu-open' : ''}`}>
            <div className="iccds-hdr-left">
                <img src={collegeLogo} alt="REC" className="iccds-hdr-logo" onClick={() => navigate('/iccds2026')} style={{ cursor: 'pointer' }} />
                <div className="iccds-hdr-divider" />
                <img src={ieeeLogo} alt="IEEE CS" className="iccds-hdr-logo" onClick={() => navigate('/iccds2026')} style={{ cursor: 'pointer' }} />
                <div className="iccds-hdr-divider" />
                <div className="iccds-hdr-brand" onClick={() => navigate('/iccds2026')} style={{ cursor: 'pointer' }}>
                    <span className="iccds-hdr-brand-name">ICCDS 2026</span>
                    <span className="iccds-hdr-brand-sub">IEEE Conference</span>
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
                <button onClick={() => { setIsMenuOpen(false); navigate('/iccds2026/publisher'); }}>Publisher</button>
                <button onClick={() => { setIsMenuOpen(false); window.open('https://rajalakshmi.org/iccds2025', '_blank'); }}>Past Editions</button>
                <button onClick={() => { setIsMenuOpen(false); navigate('/iccds2026/registration'); }} 
                    className={`iccds-hdr-cta ${location.pathname.includes('registration') ? 'active' : ''}`}>
                    Registration
                </button>
            </nav>
        </header>
    );
};

export default ICCDSNav;
