import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useSpring, useInView } from 'framer-motion';
import { ExternalLink, Shield, FileText, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './ICCDS.css';
import GlassBackground from './GlassBackground';
import collegeLogo from '../assets/logo/college.png';
import ieeeLogo from '../assets/logo/ieee_cs.png';

/* ── SlideReveal ─────────────────────────────────────────────────── */
const SlideReveal = ({ children, className, delay = 0 }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-60px' });
    return (
        <motion.div ref={ref} className={className}
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
        >{children}</motion.div>
    );
};

/* ══════════════════════════════════════════════════════════════════ */
const ICCDSRegistration = () => {
    const [scrolled, setScrolled] = useState(false);
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        const fn = () => setScrolled(window.scrollY > 40);
        window.addEventListener('scroll', fn);
        return () => window.removeEventListener('scroll', fn);
    }, []);

    return (
        <div className="iccds-page">
            <GlassBackground />
            <motion.div className="iccds-scroll-progress" style={{ scaleX }} />

            {/* ═══ HEADER ═══ */}
            <header className={`iccds-hdr ${scrolled ? 'scrolled' : ''}`}>
                <div className="iccds-hdr-left">
                    <img src={collegeLogo} alt="Rajalakshmi Engineering College" className="iccds-hdr-logo" />
                    <div className="iccds-hdr-divider" />
                    <img src={ieeeLogo} alt="IEEE Computer Society" className="iccds-hdr-logo" />
                    <div className="iccds-hdr-divider" />
                    <div className="iccds-hdr-brand">
                        <span className="iccds-hdr-brand-name">ICCDS 2026</span>
                        <span className="iccds-hdr-brand-sub">IEEE Conference</span>
                    </div>
                </div>
                <nav className="iccds-hdr-nav">
                    <button onClick={() => navigate('/iccds2026')}>
                        <ArrowLeft size={14} style={{ marginRight: 4, verticalAlign: 'middle' }} /> Back to Home
                    </button>
                </nav>
            </header>

            <main>
                {/* ═══ REGISTRATION HERO ═══ */}
                <section className="iccds-reg-hero">
                    <div className="iccds-hero-bg-pattern" />
                    <div className="iccds-container">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <span className="iccds-sect-label">Register</span>
                            <h1 className="iccds-reg-page-title">Registration Guidelines</h1>
                            <p className="iccds-reg-page-sub">3rd International Conference on Computing & Data Science (ICCDS-2026)</p>
                        </motion.div>
                    </div>
                </section>

                {/* ═══ REGISTRATION FEE ═══ */}
                <section className="iccds-sect">
                    <div className="iccds-container">
                        <SlideReveal>
                            <h3 className="iccds-reg-subtitle">Registration Fee</h3>
                            <div className="iccds-reg-table-wrap">
                                <table className="iccds-reg-table">
                                    <thead>
                                        <tr>
                                            <th></th>
                                            <th></th>
                                            <th className="iccds-reg-th-highlight">Indian Author</th>
                                            <th className="iccds-reg-th-highlight">Foreign Author</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td rowSpan={3} className="iccds-reg-category">IEEE Member</td>
                                            <td>Student</td>
                                            <td>INR 8,000</td>
                                            <td>USD 175</td>
                                        </tr>
                                        <tr>
                                            <td>Academic / Industry</td>
                                            <td>INR 8,500</td>
                                            <td>USD 200</td>
                                        </tr>
                                        <tr>
                                            <td>Listener</td>
                                            <td>INR 2,000</td>
                                            <td>USD 85</td>
                                        </tr>
                                        <tr>
                                            <td rowSpan={3} className="iccds-reg-category iccds-reg-category-alt">Non-IEEE Member</td>
                                            <td>Student</td>
                                            <td>INR 8,500</td>
                                            <td>USD 200</td>
                                        </tr>
                                        <tr>
                                            <td>Academic / Industry</td>
                                            <td>INR 9,000</td>
                                            <td>USD 225</td>
                                        </tr>
                                        <tr>
                                            <td>Listener</td>
                                            <td>INR 2,500</td>
                                            <td>USD 100</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <p className="iccds-reg-note">⚠ Note: Registration amount for not presented papers will not be refunded strictly.</p>
                        </SlideReveal>

                        {/* Bank Details */}
                        <SlideReveal delay={0.1}>
                            <div className="iccds-reg-bank">
                                <h3 className="iccds-reg-subtitle">Bank Account Details</h3>
                                
                                <div style={{ padding: '40px 0', textAlign: 'center' }}>
                                    <h4 style={{ color: 'var(--purple)', fontFamily: 'Outfit, sans-serif', fontSize: '1.5rem', fontWeight: 700, margin: 0 }}>Registration Will Open Soon</h4>
                                    <p style={{ color: 'var(--text-secondary)', marginTop: '8px' }}>Please check back later for bank account details and payment forms.</p>
                                </div>

                                {/* HIDING UNTIL REGISTRATION OPENS
                                <div className="iccds-bank-grid">
                                    {[
                                        { label: 'Account Name', value: 'REC-IEEE STUDENT' },
                                        { label: 'Account Number', value: '145201000016416' },
                                        { label: 'Bank Name', value: 'INDIAN OVERSEAS BANK' },
                                        { label: 'IFSC', value: 'IOBA0001452' },
                                        { label: 'Branch Code', value: '001452' },
                                    ].map(item => (
                                        <div key={item.label} className="iccds-bank-item">
                                            <span className="iccds-bank-label">{item.label}</span>
                                            <span className="iccds-bank-value">{item.value}</span>
                                        </div>
                                    ))}
                                </div>
                                <p className="iccds-reg-form-note">
                                    * Fill the form below after successful completion of the transaction<br />
                                    <a href="https://forms.gle/oUKEL2CpTkm4NqL68" target="_blank" rel="noopener noreferrer">Click here to fill the form</a>
                                </p>
                                */}
                            </div>
                        </SlideReveal>

                        {/* ═══ COPYRIGHT & CRC ═══ */}
                        <SlideReveal>
                            <div className="iccds-guideline-block">
                                <div className="iccds-guideline-icon"><Shield size={24} /></div>
                                <h3>Copyright Form</h3>
                                <ul className="iccds-guideline-list">
                                    <li>Each paper registration must be accompanied by an IEEE copyright form. This will ensure the widest possible protection and dissemination of information under copyright laws</li>
                                    <li>One author may sign on behalf of all of the authors of a particular paper. In this case, the author signs and accepts responsibility for releasing the material on behalf of any and all co-authors</li>
                                    <li>Modified forms are not acceptable</li>
                                    <li>The Title of the Contribution (i.e., paper title) and the List of Authors should exactly match the title and the list of authors of the paper</li>
                                </ul>
                            </div>
                        </SlideReveal>

                        <SlideReveal delay={0.1}>
                            <div className="iccds-guideline-block" style={{ marginTop: '28px' }}>
                                <div className="iccds-guideline-icon"><FileText size={24} /></div>
                                <h3>Camera Ready Copy (CRC)</h3>
                                <ul className="iccds-guideline-list">
                                    <li>Camera Ready papers shall have a maximum length of 8 pages for regular papers.</li>
                                    <li>All authors need to follow the IEEE format for the CRC preparation of their papers. The CRC should be submitted both in .doc/.docx and PDF. If your CRC of the paper is not as per the guidelines prescribed by IEEE, then it will not be considered for publishing in IEEE Digital Xplore.</li>
                                </ul>
                            </div>
                        </SlideReveal>
                    </div>
                </section>

                {/* ═══ FOOTER ═══ */}
                <footer className="iccds-footer">
                    <div className="iccds-container">
                        <div className="iccds-footer-top">
                            <div className="iccds-footer-brand">
                                <div className="iccds-footer-logos">
                                    <img src={collegeLogo} alt="REC" />
                                    <img src={ieeeLogo} alt="IEEE CS" />
                                </div>
                                <p className="iccds-footer-tagline">
                                    3rd International Conference on Computing and Data Science (ICCDS-2026)
                                </p>
                            </div>
                            <div className="iccds-footer-cols">
                                <div className="iccds-footer-col">
                                    <h6>Venue</h6>
                                    <p>Rajalakshmi Engineering College<br />Rajalakshmi Nagar, Thandalam<br />Chennai – 602105, Tamil Nadu, India</p>
                                </div>
                                <div className="iccds-footer-col">
                                    <h6>Contact</h6>
                                    <p>Dr. N. Duraimurugan — 9944915267<br />Dr. K. Ananthajothi — 9994075769<br />iccds@rajalakshmi.edu.in</p>
                                </div>
                            </div>
                        </div>
                        <div className="iccds-footer-bar">
                            © {new Date().getFullYear()} ICCDS · Rajalakshmi Engineering College · All rights reserved
                        </div>
                    </div>
                </footer>
            </main>
        </div>
    );
};

export default ICCDSRegistration;
