import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useSpring, useInView } from 'framer-motion';
import { ExternalLink, Shield, FileText, BookOpen, ArrowLeft } from 'lucide-react';
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
const ICCDSGuidelines = () => {
    const [scrolled, setScrolled] = useState(false);
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
    const navigate = useNavigate();

    useEffect(() => { window.scrollTo(0, 0); }, []);

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
                {/* ═══ GUIDELINES HERO ═══ */}
                <section className="iccds-reg-hero">
                    <div className="iccds-hero-bg-pattern" />
                    <div className="iccds-container">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <span className="iccds-sect-label">Submission</span>
                            <h1 className="iccds-reg-page-title">Paper Submission Guidelines</h1>
                            <p className="iccds-reg-page-sub">3rd International Conference on Computing & Data Science (ICCDS-2026)</p>
                        </motion.div>
                    </div>
                </section>

                {/* ═══ GUIDELINES CONTENT ═══ */}
                <section className="iccds-sect">
                    <div className="iccds-container">
                        <div className="iccds-guidelines-content">
                            {/* GENERAL INFORMATION */}
                            <SlideReveal>
                                <div className="iccds-guideline-block">
                                    <div className="iccds-guideline-icon"><FileText size={24} /></div>
                                    <h3>General Information</h3>
                                    <p>The original unpublished Technical Papers, Articles and Working Papers having maximum length 6 pages on the topics related to the theme of the conference are invited for presentation/publication in the conference proceedings</p>
                                    <p>Kindly ensure that your paper is formatted as per Template (not exceeding 6 pages) single-spaced double-column pages using 10-point size font on 8.5×11 inch pages (IEEE conference style), including authors' affiliations, figures, tables, and references. Additional pages per paper above the 6 pages limit will be charged.</p>
                                    <div className="iccds-guideline-links">
                                        <a href="https://www.ieee.org/conferences/publishing/templates.html" target="_blank" rel="noopener noreferrer" className="iccds-guide-link"><ExternalLink size={14} /> Paper Template</a>
                                        <a href="https://cmt3.research.microsoft.com/ICCDS2025" target="_blank" rel="noopener noreferrer" className="iccds-guide-link"><ExternalLink size={14} /> Paper Submission Portal</a>
                                    </div>
                                    <p>All submissions will undergo a double-blind peer review by the team of peer reviewers based on originality, relevance to the conference theme, technical strength, significance, quality of results, and organization and clarity of presentation of the paper.</p>
                                </div>
                            </SlideReveal>

                            {/* PLAGIARISM */}
                            <SlideReveal delay={0.1}>
                                <div className="iccds-guideline-block iccds-guideline-plagiarism">
                                    <div className="iccds-guideline-icon"><Shield size={24} /></div>
                                    <h3>Plagiarism</h3>
                                    <div className="iccds-plagiarism-highlight">
                                        <p><strong>Acceptable plagiarism range is less than 10% (excluding references) with 0% AI Plagiarism.</strong></p>
                                    </div>
                                    <ul className="iccds-guideline-list">
                                        <li>Plagiarism, image manipulation, and data fabrication are not tolerated.</li>
                                        <li>Plagiarism includes copying research ideas, text, images, or data from another source/research literature, even from the author's own publications without giving any credit to the original source</li>
                                        <li>Text copied from another source must be reused within quotations, and the original source must be referenced. If the design of a research, or the structure or language of the publication, was inspired by previous research, the corresponding works must be explicitly cited.</li>
                                        <li>If you are using any copyrighted material, you should acquire prior permission from the copyright holder.</li>
                                        <li>If plagiarism is detected during the peer review process, the manuscript will be rejected. If plagiarism is detected after publication, we will retract the paper.</li>
                                        <li>Any form of self-plagiarism or plagiarism from others' work(s) should not be there in the article.</li>
                                        <li>If any model / concept / figure / table / data / conclusive comment by any previously published work is used in your article, you should properly cite a reference to the original work.</li>
                                    </ul>
                                    <p className="iccds-guideline-contact">All questions about submissions can be sent as mail to : <a href="mailto:iccds25@rajalakshmi.edu.in">iccds25@rajalakshmi.edu.in</a></p>
                                </div>
                            </SlideReveal>

                            {/* PUBLICATION */}
                            <SlideReveal delay={0.2}>
                                <div className="iccds-guideline-block iccds-guideline-publication">
                                    <div className="iccds-guideline-icon"><BookOpen size={24} /></div>
                                    <h3>Publication</h3>
                                    <p>The accepted and presented papers of ICCDS- 2026 will be forwarded for possible inclusion in the IEEE Digital Xplore after review</p>
                                </div>
                            </SlideReveal>
                        </div>
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

export default ICCDSGuidelines;
