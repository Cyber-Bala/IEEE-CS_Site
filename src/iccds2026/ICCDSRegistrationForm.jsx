import React, { useEffect, useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import {
    User, Users, Mail, Phone, Building2, Globe, CreditCard, Shield, FileText,
    Upload, CheckCircle2, ChevronRight, ChevronLeft, ArrowRight,
    Loader2, AlertCircle, X, Banknote, Download, Copy, Check, Plus, Trash2,
    Search, KeyRound, ExternalLink, BadgeCheck, IdCard, Info
} from 'lucide-react';
import './ICCDS.css';
import GlassBackground from './GlassBackground';
import ICCDSNav from './ICCDSNav';
import collegeLogo from '../assets/logo/college.png';

/* ─── Constants ──────────────────────────────────────────────────── */
const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:8000';

const AUTHOR_STEPS = [
    { id: 1, label: 'Personal Info', icon: User },
    { id: 2, label: 'Team Members', icon: Users },
    { id: 3, label: 'Paper & Files', icon: FileText },
    { id: 4, label: 'Review & Pay', icon: CreditCard },
    { id: 5, label: 'Confirmation', icon: CheckCircle2 },
];

const LISTENER_STEPS = [
    { id: 1, label: 'Personal Info', icon: User },
    { id: 4, label: 'Review & Pay', icon: CreditCard },
    { id: 5, label: 'Confirmation', icon: CheckCircle2 },
];

const HONORIFIC_OPTIONS = [
    { value: 'Mr.', label: 'Mr.' },
    { value: 'Ms.', label: 'Ms.' },
    { value: 'Mrs.', label: 'Mrs.' },
    { value: 'Dr.', label: 'Dr.' },
    { value: 'Prof.', label: 'Prof.' },
];

const FEE_SCHEDULE = {
    ieee_student:      { INR: 8500, USD: 175, label: 'IEEE Member - Student Author' },
    ieee_academic:     { INR: 9000, USD: 200, label: 'IEEE Member - Academic / Industry Author' },
    ieee_listener:     { INR: 2000, USD: 85,  label: 'IEEE Member - Listener' },
    non_ieee_student:  { INR: 9000, USD: 200, label: 'Non-IEEE Member - Student Author' },
    non_ieee_academic: { INR: 9500, USD: 225, label: 'Non-IEEE Member - Academic / Industry Author' },
    non_ieee_listener: { INR: 2500, USD: 100, label: 'Non-IEEE Member - Listener' },
};



const BANK_DETAILS = [
    { label: 'Account Name', value: 'REC-IEEE STUDENT' },
    { label: 'Account Number', value: '145201000016416' },
    { label: 'Bank Name', value: 'INDIAN OVERSEAS BANK' },
    { label: 'IFSC Code', value: 'IOBA0001452' },
    { label: 'Branch Code', value: '001452' },
];

const isListener = (cat) => cat?.includes('listener');
const isIEEE = (cat) => cat?.startsWith('ieee_');
const isStudent = (cat) => cat?.includes('student');

/* ─── Shared Animated Wrapper ────────────────────────────────────── */
const StepMotion = ({ children, direction }) => (
    <motion.div
        initial={{ opacity: 0, x: direction > 0 ? 60 : -60 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: direction > 0 ? -60 : 60 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="iccds-rf-step-inner"
    >
        {children}
    </motion.div>
);

/* ─── File Drop Zone Component ───────────────────────────────────── */
const FileDropZone = ({ id, label, accept, required, file, onFile, hint }) => {
    const [isDragging, setIsDragging] = useState(false);
    const inputRef = useRef(null);

    const handleDrop = useCallback((e) => {
        e.preventDefault();
        setIsDragging(false);
        const droppedFile = e.dataTransfer.files[0];
        if (droppedFile) onFile(droppedFile);
    }, [onFile]);

    return (
        <div
            className={`iccds-rf-dropzone ${isDragging ? 'dragging' : ''} ${file ? 'has-file' : ''}`}
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            onClick={() => inputRef.current?.click()}
        >
            <input
                ref={inputRef}
                id={id}
                type="file"
                accept={accept}
                onChange={(e) => onFile(e.target.files[0])}
                style={{ display: 'none' }}
            />
            {file ? (
                <div className="iccds-rf-dropzone-file">
                    <CheckCircle2 size={20} className="iccds-rf-dropzone-check" />
                    <span className="iccds-rf-dropzone-filename">{file.name}</span>
                    <span className="iccds-rf-dropzone-size">
                        {(file.size / (1024 * 1024)).toFixed(2)} MB
                    </span>
                    <button
                        type="button"
                        className="iccds-rf-dropzone-remove"
                        onClick={(e) => { e.stopPropagation(); onFile(null); }}
                    >
                        <X size={14} />
                    </button>
                </div>
            ) : (
                <div className="iccds-rf-dropzone-empty">
                    <Upload size={24} />
                    <span className="iccds-rf-dropzone-label">
                        {label} {required && <span className="iccds-rf-required">*</span>}
                    </span>
                    <span className="iccds-rf-dropzone-hint">{hint || 'Drag & drop or click to browse'}</span>
                </div>
            )}
        </div>
    );
};

/* ═══════════════════════════════════════════════════════════════════ */
/*                    MAIN REGISTRATION COMPONENT                     */
/* ═══════════════════════════════════════════════════════════════════ */
const AUTHOR_ROLE_TYPES = [
    { value: 'student',  label: 'Student Author',            icon: '🎓' },
    { value: 'academic', label: 'Academic / Industry Author', icon: '🏛️' },
];

const LISTENER_ROLE_TYPES = [
    { value: 'listener', label: 'Listener (Attendee)',       icon: '🎧' },
];

const ICCDSRegistrationForm = () => {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

    /* ── State ── */
    const [currentStep, setCurrentStep] = useState(0); // Start at Step 0 (Paper ID Verification)
    const [direction, setDirection] = useState(1);
    const [errors, setErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);
    const [apiError, setApiError] = useState('');
    const [registrationResult, setRegistrationResult] = useState(null);
    const [copiedField, setCopiedField] = useState(null);

    // Step 0: Paper ID Verification
    const [verifyPaperId, setVerifyPaperId] = useState('');
    const [paperVerified, setPaperVerified] = useState(false);
    const [verifying, setVerifying] = useState(false);
    const [verifyError, setVerifyError] = useState('');

    // Step 1: Personal Info
    const [form, setForm] = useState({
        honorific: 'Mr.', name: '', email: '', phone: '', author_phone: '',
        institution: '', country: '',
        category: '', currency: 'INR', ieee_id_card: '',
    });

    // IEEE membership toggle + role selection (drives `form.category`)
    const [isIeeeMember, setIsIeeeMember] = useState(null); // null = not yet chosen
    const [roleType, setRoleType] = useState('');            // 'student' | 'academic' | 'listener'

    // Derive category from membership + role and sync to form
    const derivedCategory = (isIeeeMember !== null && roleType)
        ? `${isIeeeMember ? 'ieee' : 'non_ieee'}_${roleType}`
        : '';

    useEffect(() => {
        if (derivedCategory && derivedCategory !== form.category) {
            setForm(prev => ({ ...prev, category: derivedCategory }));
            if (errors.category) setErrors(prev => { const e = { ...prev }; delete e.category; return e; });
        }
    }, [derivedCategory]);

    // When user toggles IEEE membership off, clear the IEEE ID
    useEffect(() => {
        if (isIeeeMember === false) {
            setForm(prev => ({ ...prev, ieee_id_card: '' }));
        }
    }, [isIeeeMember]);

    // Step 2: Team Members
    const EMPTY_MEMBER = { name: '', email: '', institution: '' };
    const [teamMembers, setTeamMembers] = useState([{ ...EMPTY_MEMBER }]);

    const addTeamMember = () => {
        if (teamMembers.length < 10) {
            setTeamMembers(prev => [...prev, { ...EMPTY_MEMBER }]);
        }
    };

    const removeTeamMember = (index) => {
        setTeamMembers(prev => prev.filter((_, i) => i !== index));
        // Clear any related errors
        setErrors(prev => {
            const e = { ...prev };
            Object.keys(e).forEach(k => { if (k.startsWith(`member_${index}_`)) delete e[k]; });
            return e;
        });
    };

    const updateTeamMember = (index, key, val) => {
        setTeamMembers(prev => prev.map((m, i) => i === index ? { ...m, [key]: val } : m));
        const errKey = `member_${index}_${key}`;
        if (errors[errKey]) setErrors(prev => { const e = { ...prev }; delete e[errKey]; return e; });
    };

    // Step 3: Paper & Files
    const [paper, setPaper] = useState({ paper_id: '', paper_title: '', paper_abstract: '' });
    const [files, setFiles] = useState({
        crc_docx: null, copyright_form: null,
        ieee_proof: null, student_proof: null,
        primary_id_proof: null,
    });

    // Step 4: Payment
    const [paymentMethod, setPaymentMethod] = useState('');
    const [receiptFile, setReceiptFile] = useState(null);
    const [receiptUploading, setReceiptUploading] = useState(false);

    useEffect(() => { window.scrollTo(0, 0); }, []);

    /* ── Helpers ── */
    const updateForm = (key, val) => {
        setForm(prev => ({ ...prev, [key]: val }));
        if (errors[key]) setErrors(prev => { const e = { ...prev }; delete e[key]; return e; });
    };
    const updatePaper = (key, val) => {
        setPaper(prev => ({ ...prev, [key]: val }));
        if (errors[key]) setErrors(prev => { const e = { ...prev }; delete e[key]; return e; });
    };
    const updateFile = (key, file) => {
        setFiles(prev => ({ ...prev, [key]: file }));
        if (errors[key]) setErrors(prev => { const e = { ...prev }; delete e[key]; return e; });
    };

    const fee = FEE_SCHEDULE[form.category]?.[form.currency] || 0;
    const feeDisplay = form.currency === 'INR'
        ? `₹${fee.toLocaleString('en-IN')}`
        : `$${fee}`;

    const copyToClipboard = (text, field) => {
        navigator.clipboard.writeText(text);
        setCopiedField(field);
        setTimeout(() => setCopiedField(null), 2000);
    };

    const isListenerFlow = roleType === 'listener' || isListener(form.category);
    const activeSteps = isListenerFlow ? LISTENER_STEPS : AUTHOR_STEPS;

    /* ── Paper ID Verification (Step 0) ── */
    const handleVerifyPaper = async () => {
        const trimmed = verifyPaperId.trim();
        if (!trimmed) {
            setVerifyError('Please enter your Paper ID.');
            return;
        }
        setVerifying(true);
        setVerifyError('');
        try {
            const res = await fetch(`${API_BASE}/api/iccds/verify-paper/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ paper_id: trimmed }),
            });
            const data = await res.json();
            if (data.success) {
                setPaperVerified(true);
                setPaper(prev => ({ ...prev, paper_id: trimmed }));
                if (!roleType || roleType === 'listener') {
                    setRoleType('student');
                }
                setDirection(1);
                setCurrentStep(1);
                window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
                setVerifyError(data.error || 'Paper ID not found.');
            }
        } catch (err) {
            setVerifyError('Network error. Please try again.');
        } finally {
            setVerifying(false);
        }
    };

    const handleListenerSkip = () => {
        setPaperVerified(false);
        setRoleType('listener');
        setPaper({ paper_id: '', paper_title: '', paper_abstract: '' });
        setDirection(1);
        setCurrentStep(1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    /* ── Validation ── */
    const validateStep1 = () => {
        const errs = {};
        if (!form.honorific) errs.honorific = 'Please select a title';
        if (!form.name.trim()) errs.name = 'Name is required';
        if (!form.email.trim()) errs.email = 'Email is required';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Invalid email format';
        if (!form.phone.trim()) errs.phone = 'Phone is required';
        if (!form.institution.trim()) errs.institution = 'Institution is required';
        if (!form.country.trim()) errs.country = 'Country is required';
        if (isIeeeMember === null) errs.ieee_member = 'Please select your IEEE membership status';
        if (!roleType) errs.category = 'Please select your registration type';
        if (!form.category) errs.category = 'Registration category is required';
        if (isIeeeMember && !form.ieee_id_card.trim()) errs.ieee_id_card = 'IEEE Membership ID is required';
        setErrors(errs);
        return Object.keys(errs).length === 0;
    };

    const validateStep2 = () => {
        if (isListenerFlow) return true;
        const errs = {};
        // Validate each team member that has any data filled in
        teamMembers.forEach((member, i) => {
            const hasAnyData = member.name.trim() || member.email.trim() || member.institution.trim();
            if (hasAnyData) {
                if (!member.name.trim()) errs[`member_${i}_name`] = 'Name is required';
                if (!member.email.trim()) errs[`member_${i}_email`] = 'Email is required';
                else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(member.email)) errs[`member_${i}_email`] = 'Invalid email';
                if (!member.institution.trim()) errs[`member_${i}_institution`] = 'Institution is required';
            }
        });
        setErrors(errs);
        return Object.keys(errs).length === 0;
    };

    const validateStep3 = () => {
        if (isListenerFlow) return true;
        const errs = {};
        if (!paper.paper_id.trim()) errs.paper_id = 'Paper ID is required';
        if (!paper.paper_title.trim()) errs.paper_title = 'Paper title is required';
        if (!files.crc_docx) errs.crc_docx = 'Camera-Ready DOCX is required';
        if (!files.copyright_form) errs.copyright_form = 'Copyright form is required';
        if (!files.primary_id_proof) errs.primary_id_proof = 'Primary ID Verification (Student ID / Staff ID) is required';
        setErrors(errs);
        return Object.keys(errs).length === 0;
    };

    /* ── Navigation ── */
    const goNext = () => {
        if (currentStep === 1 && !validateStep1()) return;
        if (currentStep === 2 && !validateStep2()) return;
        if (currentStep === 3 && !validateStep3()) return;
        setDirection(1);
        if (currentStep === 1 && isListenerFlow) {
            setCurrentStep(4); // Directly skip to review & pay for listener
        } else {
            setCurrentStep(prev => Math.min(prev + 1, 5));
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const goBack = () => {
        setDirection(-1);
        if (currentStep === 4 && isListenerFlow) {
            setCurrentStep(1); // Go back directly to personal info for listener
        } else {
            setCurrentStep(prev => Math.max(prev - 1, 1));
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    /* ── Submit Registration ── */
    const handleSubmit = async () => {
        setSubmitting(true);
        setApiError('');

        const formData = new FormData();
        // Contact fields
        Object.entries(form).forEach(([k, v]) => formData.append(k, v));
        // Team members
        const validMembers = teamMembers.filter(m => m.name.trim() && m.email.trim());
        if (validMembers.length > 0) {
            formData.append('team_members', JSON.stringify(validMembers));
        }
        // Paper fields (if not listener)
        if (!isListener(form.category)) {
            Object.entries(paper).forEach(([k, v]) => formData.append(k, v));
            if (files.crc_docx) formData.append('crc_docx', files.crc_docx);
            if (files.copyright_form) formData.append('copyright_form', files.copyright_form);
        }
        // Optional proofs
        if (files.ieee_proof) formData.append('ieee_proof', files.ieee_proof);
        if (files.student_proof) formData.append('student_proof', files.student_proof);
        // Mandatory primary ID proof
        if (files.primary_id_proof) formData.append('primary_id_proof', files.primary_id_proof);
        // Payment screenshot
        if (receiptFile) formData.append('payment_screenshot', receiptFile);

        try {
            const res = await fetch(`${API_BASE}/api/iccds/register/`, {
                method: 'POST',
                body: formData,
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || 'Registration failed');

            setRegistrationResult(data.registration);
            setDirection(1);
            setCurrentStep(5);
        } catch (err) {
            setApiError(err.message);
        } finally {
            setSubmitting(false);
        }
    };

    /* ── Payment Handlers ── */
    const handleOnlinePayment = async () => {
        if (form.currency === 'INR') {
            // Razorpay flow placeholder
            setApiError('Razorpay integration coming soon. Use bank transfer for now.');
        } else {
            // Stripe flow placeholder
            setApiError('Stripe/PayPal integration coming soon. Use bank transfer for now.');
        }
    };

    const handleReceiptUpload = async () => {
        if (!receiptFile || !registrationResult?.id) return;
        setReceiptUploading(true);
        setApiError('');

        const formData = new FormData();
        formData.append('registration_id', registrationResult.id);
        formData.append('receipt', receiptFile);

        try {
            const res = await fetch(`${API_BASE}/api/iccds/payment/upload-receipt/`, {
                method: 'POST',
                body: formData,
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || 'Upload failed');

            setRegistrationResult(prev => ({ ...prev, status: 'Pending Admin Verification (Bank Transfer)' }));
        } catch (err) {
            setApiError(err.message);
        } finally {
            setReceiptUploading(false);
        }
    };

    /* ═══════════════════════════════════════════════════════════════ */
    /*                        STEP RENDERERS                          */
    /* ═══════════════════════════════════════════════════════════════ */

    /* ── STEP 0: Paper ID Verification ── */
    const renderStep0 = () => (
        <StepMotion direction={direction}>
            <div className="iccds-rf-card">
                <div style={{ textAlign: 'center', marginBottom: 8 }}>
                    <motion.div
                        initial={{ scale: 0 }} animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                        style={{ display: 'inline-flex', padding: 20, borderRadius: '50%', background: 'linear-gradient(135deg, rgba(0,102,204,0.15), rgba(79,70,229,0.15))', marginBottom: 16 }}
                    >
                        <KeyRound size={40} style={{ color: '#4db8ff' }} />
                    </motion.div>
                </div>
                <h2 className="iccds-rf-card-title" style={{ justifyContent: 'center' }}>
                    <Search size={22} /> Paper ID Verification
                </h2>
                <p className="iccds-rf-card-desc" style={{ textAlign: 'center', maxWidth: 500, margin: '0 auto 24px' }}>
                    Please enter your Paper ID to proceed with registration. Your Paper ID can be found in your paper acceptance / submission confirmation.
                </p>

                <div className="iccds-rf-field iccds-rf-field-full" style={{ maxWidth: 450, margin: '0 auto' }}>
                    <label htmlFor="rf-verify-paper-id">Paper ID <span className="iccds-rf-required">*</span></label>
                    <div className="iccds-rf-input-wrap">
                        <FileText size={16} className="iccds-rf-input-icon" />
                        <input
                            id="rf-verify-paper-id" type="text"
                            placeholder="e.g. ICCDS-2026-001"
                            value={verifyPaperId}
                            onChange={e => { setVerifyPaperId(e.target.value); setVerifyError(''); }}
                            onKeyDown={e => { if (e.key === 'Enter') handleVerifyPaper(); }}
                            className={verifyError ? 'error' : ''}
                            autoFocus
                        />
                    </div>
                </div>

                {/* Error popup */}
                <AnimatePresence>
                    {verifyError && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}
                            className="iccds-rf-alert error"
                            style={{ maxWidth: 500, margin: '16px auto 0' }}
                        >
                            <AlertCircle size={18} />
                            <span>{verifyError}</span>
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className="iccds-rf-actions-center" style={{ marginTop: 24, gap: 12, flexDirection: 'column', alignItems: 'center' }}>
                    <motion.button
                        className="iccds-rf-btn primary"
                        onClick={handleVerifyPaper}
                        disabled={verifying}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        {verifying ? (
                            <><Loader2 size={18} className="spin" /> Verifying...</>
                        ) : (
                            <><Search size={18} /> Verify Paper ID</>
                        )}
                    </motion.button>

                    <button
                        type="button"
                        className="iccds-rf-btn secondary"
                        onClick={handleListenerSkip}
                        style={{ fontSize: '0.85rem' }}
                    >
                        Register as Listener (no paper) <ArrowRight size={16} />
                    </button>
                </div>
            </div>
        </StepMotion>
    );

    /* ── STEP 1: Personal Info ── */
    const renderStep1 = () => {
        const availableRoles = isListenerFlow ? LISTENER_ROLE_TYPES : AUTHOR_ROLE_TYPES;

        return (
            <StepMotion direction={direction}>
                <div className="iccds-rf-card">
                    <h2 className="iccds-rf-card-title">
                        <User size={22} /> {isListenerFlow ? 'Listener Information' : 'Personal Information'}
                    </h2>
                    <p className="iccds-rf-card-desc">
                        {isListenerFlow
                            ? 'Provide your contact details to register as a Conference Listener'
                            : 'Provide your contact and author registration details'}
                    </p>

                    {/* Banner indicating Registration Mode */}
                    {isListenerFlow ? (
                        <div className="iccds-rf-alert info" style={{ marginBottom: 20 }}>
                            <CheckCircle2 size={18} />
                            <span>
                                <strong>Listener Registration:</strong> You are registering to attend the conference as a Listener. No paper submission or team members required.
                            </span>
                        </div>
                    ) : paperVerified ? (
                        <div className="iccds-rf-alert info" style={{ marginBottom: 20 }}>
                            <FileText size={18} />
                            <span>
                                <strong>Author Registration:</strong> Paper ID <code>{paper.paper_id}</code> verified successfully.
                            </span>
                        </div>
                    ) : null}

                    <div className="iccds-rf-grid">
                        {/* Title / Honorific */}
                        <div className="iccds-rf-field">
                            <label htmlFor="rf-honorific">Title <span className="iccds-rf-required">*</span></label>
                            <div className="iccds-rf-input-wrap">
                                <BadgeCheck size={16} className="iccds-rf-input-icon" />
                                <select id="rf-honorific" value={form.honorific}
                                    onChange={e => updateForm('honorific', e.target.value)}
                                    className={errors.honorific ? 'error' : ''}>
                                    {HONORIFIC_OPTIONS.map(opt => (
                                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                                    ))}
                                </select>
                            </div>
                            {errors.honorific && <span className="iccds-rf-error">{errors.honorific}</span>}
                        </div>

                        {/* Name */}
                        <div className="iccds-rf-field">
                            <label htmlFor="rf-name">Full Name <span className="iccds-rf-required">*</span></label>
                            <div className="iccds-rf-input-wrap">
                                <User size={16} className="iccds-rf-input-icon" />
                                <input id="rf-name" type="text" placeholder="John Doe"
                                    value={form.name} onChange={e => updateForm('name', e.target.value)}
                                    className={errors.name ? 'error' : ''} />
                            </div>
                            {errors.name && <span className="iccds-rf-error">{errors.name}</span>}
                        </div>

                        {/* Email */}
                        <div className="iccds-rf-field">
                            <label htmlFor="rf-email">Email Address <span className="iccds-rf-required">*</span></label>
                            <div className="iccds-rf-input-wrap">
                                <Mail size={16} className="iccds-rf-input-icon" />
                                <input id="rf-email" type="email" placeholder="john@university.edu"
                                    value={form.email} onChange={e => updateForm('email', e.target.value)}
                                    className={errors.email ? 'error' : ''} />
                            </div>
                            {errors.email && <span className="iccds-rf-error">{errors.email}</span>}
                        </div>

                        {/* Phone */}
                        <div className="iccds-rf-field">
                            <label htmlFor="rf-phone">Phone Number <span className="iccds-rf-required">*</span></label>
                            <div className="iccds-rf-input-wrap">
                                <Phone size={16} className="iccds-rf-input-icon" />
                                <input id="rf-phone" type="tel" placeholder="+91 9876543210"
                                    value={form.phone} onChange={e => updateForm('phone', e.target.value)}
                                    className={errors.phone ? 'error' : ''} />
                            </div>
                            {errors.phone && <span className="iccds-rf-error">{errors.phone}</span>}
                        </div>

                        {/* Author Contact Number - Only for Authors */}
                        {!isListenerFlow && (
                            <div className="iccds-rf-field">
                                <label htmlFor="rf-author-phone">Author Contact Number</label>
                                <div className="iccds-rf-input-wrap">
                                    <Phone size={16} className="iccds-rf-input-icon" />
                                    <input id="rf-author-phone" type="tel" placeholder="+91 9876543210 (if different)"
                                        value={form.author_phone} onChange={e => updateForm('author_phone', e.target.value)} />
                                </div>
                                <span className="iccds-rf-hint-text">Leave blank if same as phone number above</span>
                            </div>
                        )}

                        {/* Institution */}
                        <div className="iccds-rf-field">
                            <label htmlFor="rf-institution">Institution / Organization <span className="iccds-rf-required">*</span></label>
                            <div className="iccds-rf-input-wrap">
                                <Building2 size={16} className="iccds-rf-input-icon" />
                                <input id="rf-institution" type="text" placeholder="Rajalakshmi Engineering College"
                                    value={form.institution} onChange={e => updateForm('institution', e.target.value)}
                                    className={errors.institution ? 'error' : ''} />
                            </div>
                            {errors.institution && <span className="iccds-rf-error">{errors.institution}</span>}
                        </div>

                        {/* Country */}
                        <div className="iccds-rf-field">
                            <label htmlFor="rf-country">Country <span className="iccds-rf-required">*</span></label>
                            <div className="iccds-rf-input-wrap">
                                <Globe size={16} className="iccds-rf-input-icon" />
                                <input id="rf-country" type="text" placeholder="India"
                                    value={form.country} onChange={e => {
                                        updateForm('country', e.target.value);
                                        // Auto-set currency based on country
                                        if (e.target.value.toLowerCase() === 'india') updateForm('currency', 'INR');
                                        else if (e.target.value.trim()) updateForm('currency', 'USD');
                                    }}
                                    className={errors.country ? 'error' : ''} />
                            </div>
                            {errors.country && <span className="iccds-rf-error">{errors.country}</span>}
                        </div>

                        {/* Currency */}
                        <div className="iccds-rf-field">
                            <label htmlFor="rf-currency">Currency</label>
                            <div className="iccds-rf-input-wrap">
                                <Banknote size={16} className="iccds-rf-input-icon" />
                                <select id="rf-currency" value={form.currency}
                                    onChange={e => updateForm('currency', e.target.value)}>
                                    <option value="INR">₹ INR (Indian Rupee)</option>
                                    <option value="USD">$ USD (US Dollar)</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* ── IEEE Membership Toggle ── */}
                    <div className="iccds-rf-field iccds-rf-field-full">
                        <label>Are you an IEEE Member? <span className="iccds-rf-required">*</span></label>
                        <div className="iccds-rf-ieee-toggle">
                            <button
                                type="button"
                                className={`iccds-rf-toggle-btn yes ${isIeeeMember === true ? 'active' : ''}`}
                                onClick={() => { setIsIeeeMember(true); if (errors.ieee_member) setErrors(prev => { const e = { ...prev }; delete e.ieee_member; return e; }); }}
                            >
                                <Shield size={18} />
                                <span>Yes, I'm an IEEE Member</span>
                            </button>
                            <button
                                type="button"
                                className={`iccds-rf-toggle-btn no ${isIeeeMember === false ? 'active' : ''}`}
                                onClick={() => { setIsIeeeMember(false); if (errors.ieee_member) setErrors(prev => { const e = { ...prev }; delete e.ieee_member; return e; }); }}
                            >
                                <X size={18} />
                                <span>No</span>
                            </button>
                        </div>
                        {errors.ieee_member && <span className="iccds-rf-error">{errors.ieee_member}</span>}
                    </div>

                    {/* ── IEEE Member ID (only when Yes) ── */}
                    <AnimatePresence>
                        {isIeeeMember === true && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }}
                                className="iccds-rf-field iccds-rf-field-full"
                                style={{ overflow: 'hidden' }}
                            >
                                <label htmlFor="rf-ieee-id">IEEE Membership ID <span className="iccds-rf-required">*</span></label>
                                <div className="iccds-rf-input-wrap">
                                    <Shield size={16} className="iccds-rf-input-icon" />
                                    <input id="rf-ieee-id" type="text" placeholder="12345678"
                                        value={form.ieee_id_card} onChange={e => updateForm('ieee_id_card', e.target.value)}
                                        className={errors.ieee_id_card ? 'error' : ''} />
                                </div>
                                {errors.ieee_id_card && <span className="iccds-rf-error">{errors.ieee_id_card}</span>}
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* ── Registration Type (role) ── */}
                    {isIeeeMember !== null && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                            className="iccds-rf-field iccds-rf-field-full"
                        >
                            <label>
                                {isListenerFlow ? 'Listener Registration Category' : 'Author Registration Type'} <span className="iccds-rf-required">*</span>
                                <span className="iccds-rf-member-badge" style={{
                                    marginLeft: 10,
                                    background: isIeeeMember
                                        ? 'linear-gradient(135deg, rgba(0,102,204,0.15), rgba(0,102,204,0.05))'
                                        : 'linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02))',
                                    color: isIeeeMember ? '#4db8ff' : 'rgba(255,255,255,0.6)',
                                    padding: '3px 10px',
                                    borderRadius: 20,
                                    fontSize: '0.75rem',
                                    fontWeight: 600,
                                }}>
                                    {isIeeeMember ? '✓ IEEE Member Pricing' : 'Non-IEEE Pricing'}
                                </span>
                            </label>
                            <div className="iccds-rf-category-grid">
                                {availableRoles.map(role => {
                                    const catKey = `${isIeeeMember ? 'ieee' : 'non_ieee'}_${role.value}`;
                                    const feeData = FEE_SCHEDULE[catKey];
                                    const isActive = roleType === role.value;
                                    return (
                                        <button
                                            key={role.value} type="button"
                                            className={`iccds-rf-category-btn ${isActive ? 'active' : ''}`}
                                            onClick={() => {
                                                setRoleType(role.value);
                                                if (errors.category) setErrors(prev => { const e = { ...prev }; delete e.category; return e; });
                                            }}
                                        >
                                            <span className="iccds-rf-cat-icon">{role.icon}</span>
                                            <span className="iccds-rf-cat-label">{role.label}</span>
                                            <span className="iccds-rf-cat-fee">
                                                {form.currency === 'INR'
                                                    ? `₹${feeData?.INR?.toLocaleString('en-IN')}`
                                                    : `$${feeData?.USD}`}
                                            </span>
                                        </button>
                                    );
                                })}
                            </div>
                            {errors.category && <span className="iccds-rf-error">{errors.category}</span>}

                            {/* Fee highlight */}
                            <AnimatePresence>
                                {form.category && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}
                                        className="iccds-rf-fee-highlight"
                                    >
                                        <div className="iccds-rf-fee-highlight-inner">
                                            <span className="iccds-rf-fee-highlight-label">
                                                {FEE_SCHEDULE[form.category]?.label}
                                            </span>
                                            <span className="iccds-rf-fee-highlight-amount">
                                                {feeDisplay}
                                            </span>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    )}
                </div>
            </StepMotion>
        );
    };

    /* ── STEP 2: Team Members ── */
    const renderStep2 = () => (
        <StepMotion direction={direction}>
            <div className="iccds-rf-card">
                <h2 className="iccds-rf-card-title">
                    <Users size={22} /> Team Members / Co-Authors
                </h2>
                <p className="iccds-rf-card-desc">
                    Add details of your co-authors or team members. Leave empty if you are the sole author.
                </p>

                {/* Certificate Name Warning */}
                <div className="iccds-rf-alert warning" style={{ marginBottom: 20 }}>
                    <Info size={18} />
                    <span><strong>Important:</strong> Please enter the names correctly. These names will be used to print certificates.</span>
                </div>

                <div className="iccds-rf-team-list">
                    <AnimatePresence>
                        {teamMembers.map((member, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                                className="iccds-rf-team-card"
                            >
                                <div className="iccds-rf-team-card-header">
                                    <div className="iccds-rf-team-card-number">
                                        <User size={14} />
                                        <span>Member {index + 1}</span>
                                    </div>
                                    {teamMembers.length > 1 && (
                                        <button
                                            type="button"
                                            className="iccds-rf-team-remove"
                                            onClick={() => removeTeamMember(index)}
                                            title="Remove member"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    )}
                                </div>

                                <div className="iccds-rf-grid">
                                    {/* Name */}
                                    <div className="iccds-rf-field">
                                        <label htmlFor={`rf-member-name-${index}`}>Full Name</label>
                                        <div className="iccds-rf-input-wrap">
                                            <User size={16} className="iccds-rf-input-icon" />
                                            <input
                                                id={`rf-member-name-${index}`} type="text"
                                                placeholder="Dr. Jane Smith"
                                                value={member.name}
                                                onChange={e => updateTeamMember(index, 'name', e.target.value)}
                                                className={errors[`member_${index}_name`] ? 'error' : ''}
                                            />
                                        </div>
                                        {errors[`member_${index}_name`] && (
                                            <span className="iccds-rf-error">{errors[`member_${index}_name`]}</span>
                                        )}
                                    </div>

                                    {/* Email */}
                                    <div className="iccds-rf-field">
                                        <label htmlFor={`rf-member-email-${index}`}>Email Address</label>
                                        <div className="iccds-rf-input-wrap">
                                            <Mail size={16} className="iccds-rf-input-icon" />
                                            <input
                                                id={`rf-member-email-${index}`} type="email"
                                                placeholder="jane@university.edu"
                                                value={member.email}
                                                onChange={e => updateTeamMember(index, 'email', e.target.value)}
                                                className={errors[`member_${index}_email`] ? 'error' : ''}
                                            />
                                        </div>
                                        {errors[`member_${index}_email`] && (
                                            <span className="iccds-rf-error">{errors[`member_${index}_email`]}</span>
                                        )}
                                    </div>

                                    {/* Institution */}
                                    <div className="iccds-rf-field iccds-rf-field-full">
                                        <label htmlFor={`rf-member-inst-${index}`}>Institution / Organization</label>
                                        <div className="iccds-rf-input-wrap">
                                            <Building2 size={16} className="iccds-rf-input-icon" />
                                            <input
                                                id={`rf-member-inst-${index}`} type="text"
                                                placeholder="University / Organization"
                                                value={member.institution}
                                                onChange={e => updateTeamMember(index, 'institution', e.target.value)}
                                                className={errors[`member_${index}_institution`] ? 'error' : ''}
                                            />
                                        </div>
                                        {errors[`member_${index}_institution`] && (
                                            <span className="iccds-rf-error">{errors[`member_${index}_institution`]}</span>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {/* Add Member Button */}
                {teamMembers.length < 10 && (
                    <motion.button
                        type="button"
                        className="iccds-rf-add-member"
                        onClick={addTeamMember}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <Plus size={18} />
                        <span>Add Another Team Member</span>
                    </motion.button>
                )}

                <p className="iccds-rf-team-hint">
                    You can add up to 10 team members. Members without all fields filled will be skipped.
                </p>
            </div>
        </StepMotion>
    );

    /* ── STEP 3: Paper & Files ── */
    const renderStep3 = () => (
        <StepMotion direction={direction}>
            {isListener(form.category) ? (
                <div className="iccds-rf-card">
                    <h2 className="iccds-rf-card-title">
                        <FileText size={22} /> Listener Registration
                    </h2>
                    <div className="iccds-rf-listener-notice">
                        <CheckCircle2 size={28} />
                        <div>
                            <h3>No paper submission required</h3>
                            <p>As a listener, you can proceed directly to the payment step.</p>
                        </div>
                    </div>

                    {/* Optional proofs */}
                    <div className="iccds-rf-uploads-section">
                        <h3 className="iccds-rf-upload-heading">Optional Documents</h3>
                        <div className="iccds-rf-upload-grid">
                            {isIEEE(form.category) && (
                                <FileDropZone
                                    id="ieee_proof" label="IEEE Membership Proof"
                                    accept=".pdf,.png,.jpg,.jpeg" required={false}
                                    file={files.ieee_proof} onFile={(f) => updateFile('ieee_proof', f)}
                                    hint="PDF, PNG, or JPEG (max 10MB)"
                                />
                            )}
                        </div>
                    </div>
                </div>
            ) : (
                <div className="iccds-rf-card">
                    <h2 className="iccds-rf-card-title">
                        <FileText size={22} /> Paper Details & Document Upload
                    </h2>
                    <p className="iccds-rf-card-desc">
                        Enter your paper details and upload required documents
                    </p>

                    <div className="iccds-rf-grid">
                        <div className="iccds-rf-field">
                            <label htmlFor="rf-paper-id">Paper ID <span className="iccds-rf-required">*</span></label>
                            <div className="iccds-rf-input-wrap">
                                <FileText size={16} className="iccds-rf-input-icon" />
                                <input id="rf-paper-id" type="text" placeholder="ICCDS-2026-001"
                                    value={paper.paper_id} onChange={e => updatePaper('paper_id', e.target.value)}
                                    className={errors.paper_id ? 'error' : ''} />
                            </div>
                            {errors.paper_id && <span className="iccds-rf-error">{errors.paper_id}</span>}
                        </div>

                        <div className="iccds-rf-field">
                            <label htmlFor="rf-paper-title">Paper Title <span className="iccds-rf-required">*</span></label>
                            <div className="iccds-rf-input-wrap">
                                <FileText size={16} className="iccds-rf-input-icon" />
                                <input id="rf-paper-title" type="text" placeholder="Your paper title"
                                    value={paper.paper_title} onChange={e => updatePaper('paper_title', e.target.value)}
                                    className={errors.paper_title ? 'error' : ''} />
                            </div>
                            {errors.paper_title && <span className="iccds-rf-error">{errors.paper_title}</span>}
                        </div>
                    </div>

                    <div className="iccds-rf-field iccds-rf-field-full">
                        <label htmlFor="rf-abstract">Abstract (Optional)</label>
                        <textarea id="rf-abstract" rows={3} placeholder="Brief abstract of your paper..."
                            value={paper.paper_abstract}
                            onChange={e => updatePaper('paper_abstract', e.target.value)} />
                    </div>

                    {/* Required uploads */}
                    <div className="iccds-rf-uploads-section">
                        <h3 className="iccds-rf-upload-heading">Required Documents</h3>

                        <div className="iccds-rf-upload-grid">
                            <div>
                                <FileDropZone
                                    id="crc_docx" label="Camera-Ready Copy (DOCX)"
                                    accept=".doc,.docx" required
                                    file={files.crc_docx} onFile={(f) => updateFile('crc_docx', f)}
                                    hint="Word document, max 10MB"
                                />
                                {errors.crc_docx && <span className="iccds-rf-error">{errors.crc_docx}</span>}
                            </div>
                            <div>
                                {/* IEEE Copyright Form Link Info */}
                                <div className="iccds-rf-alert info" style={{ marginBottom: 12 }}>
                                    <ExternalLink size={16} />
                                    <span>
                                        Please visit the{' '}
                                        <a href="https://www.ieee.org/publications/rights/copyright-main.html" target="_blank" rel="noopener noreferrer" style={{ color: '#4db8ff', textDecoration: 'underline', fontWeight: 600 }}>
                                            IEEE Copyright Form Portal
                                        </a>{' '}
                                        to fill and complete your copyright form. After generating the signed document from IEEE, upload it below.
                                    </span>
                                </div>
                                <FileDropZone
                                    id="copyright_form" label="IEEE Copyright Form (PDF)"
                                    accept=".pdf" required
                                    file={files.copyright_form} onFile={(f) => updateFile('copyright_form', f)}
                                    hint="Signed copyright form, max 10MB"
                                />
                                {errors.copyright_form && <span className="iccds-rf-error">{errors.copyright_form}</span>}
                            </div>
                        </div>
                    </div>

                    {/* Primary ID Verification — MANDATORY */}
                    <div className="iccds-rf-uploads-section">
                        <h3 className="iccds-rf-upload-heading">
                            <IdCard size={20} /> Primary ID Verification <span className="iccds-rf-required">*</span>
                        </h3>
                        <p className="iccds-rf-card-desc" style={{ marginTop: -4, marginBottom: 12 }}>
                            Upload your Student ID or Staff ID card for identity verification. This is mandatory.
                        </p>
                        <div className="iccds-rf-upload-grid">
                            <div>
                                <FileDropZone
                                    id="primary_id_proof" label="Student ID / Staff ID Card"
                                    accept=".pdf,.png,.jpg,.jpeg" required
                                    file={files.primary_id_proof} onFile={(f) => updateFile('primary_id_proof', f)}
                                    hint="PDF, PNG, or JPEG (max 10MB)"
                                />
                                {errors.primary_id_proof && <span className="iccds-rf-error">{errors.primary_id_proof}</span>}
                            </div>
                        </div>
                    </div>

                    {/* Optional proofs */}
                    <div className="iccds-rf-uploads-section">
                        <h3 className="iccds-rf-upload-heading">Optional Proof Documents</h3>
                        <div className="iccds-rf-upload-grid">
                            {isIEEE(form.category) && (
                                <FileDropZone
                                    id="ieee_proof" label="IEEE Membership Proof (Optional)"
                                    accept=".pdf,.png,.jpg,.jpeg" required={false}
                                    file={files.ieee_proof} onFile={(f) => updateFile('ieee_proof', f)}
                                    hint="PDF, PNG, or JPEG (max 10MB)"
                                />
                            )}
                            {isStudent(form.category) && (
                                <FileDropZone
                                    id="student_proof" label="Student ID Proof (Optional)"
                                    accept=".pdf,.png,.jpg,.jpeg" required={false}
                                    file={files.student_proof} onFile={(f) => updateFile('student_proof', f)}
                                    hint="PDF, PNG, or JPEG (max 10MB)"
                                />
                            )}
                        </div>
                    </div>
                </div>
            )}
        </StepMotion>
    );

    /* ── STEP 4: Review & Pay ── */
    const renderStep4 = () => (
        <StepMotion direction={direction}>
            <div className="iccds-rf-card">
                <h2 className="iccds-rf-card-title">
                    <CreditCard size={22} /> {isListenerFlow ? 'Listener Review & Payment' : 'Review & Payment'}
                </h2>
                <p className="iccds-rf-card-desc">
                    {isListenerFlow
                        ? 'Verify your details and complete the conference listener payment'
                        : 'Verify your details and complete your registration payment'}
                </p>

                {/* Summary */}
                <div className="iccds-rf-summary">
                    <div className="iccds-rf-summary-section">
                        <h4>{isListenerFlow ? 'Listener Details' : 'Registrant'}</h4>
                        <div className="iccds-rf-summary-grid">
                            <div><span>Name</span><strong>{form.name}</strong></div>
                            <div><span>Email</span><strong>{form.email}</strong></div>
                            <div><span>Phone</span><strong>{form.phone}</strong></div>
                            <div><span>Institution</span><strong>{form.institution}</strong></div>
                            <div><span>Country</span><strong>{form.country}</strong></div>
                            <div><span>Category</span><strong>{FEE_SCHEDULE[form.category]?.label}</strong></div>
                            {form.ieee_id_card && <div><span>IEEE ID</span><strong>{form.ieee_id_card}</strong></div>}
                        </div>
                    </div>

                    {/* Team Members Summary - Only for Authors */}
                    {!isListenerFlow && teamMembers.some(m => m.name.trim()) && (
                        <div className="iccds-rf-summary-section">
                            <h4>Team Members</h4>
                            <div className="iccds-rf-summary-team">
                                {teamMembers.filter(m => m.name.trim()).map((m, i) => (
                                    <div key={i} className="iccds-rf-summary-team-member">
                                        <span className="iccds-rf-summary-team-num">{i + 1}.</span>
                                        <div>
                                            <strong>{m.name}</strong>
                                            <span>{m.email}</span>
                                            <span>{m.institution}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {!isListenerFlow && (
                        <div className="iccds-rf-summary-section">
                            <h4>Paper</h4>
                            <div className="iccds-rf-summary-grid">
                                <div><span>Paper ID</span><strong>{paper.paper_id}</strong></div>
                                <div><span>Title</span><strong>{paper.paper_title}</strong></div>
                            </div>
                            <div className="iccds-rf-summary-files">
                                {files.crc_docx && <span>📄 {files.crc_docx.name}</span>}
                                {files.copyright_form && <span>📄 {files.copyright_form.name}</span>}
                            </div>
                        </div>
                    )}

                    <div className="iccds-rf-summary-fee">
                        <span>{isListenerFlow ? 'Listener Registration Fee' : 'Registration Fee'}</span>
                        <strong className="iccds-rf-fee-amount">{feeDisplay}</strong>
                    </div>
                </div>

                {/* Bank Account Details */}
                <div className="iccds-rf-bank-section">
                    <h3 className="iccds-rf-upload-heading">
                        <Banknote size={20} /> Bank Account Details
                    </h3>
                    <p className="iccds-rf-bank-instruction">
                        Please transfer <strong>{feeDisplay}</strong> to the following bank account and upload the payment screenshot below.
                    </p>
                    <div className="iccds-rf-bank-details">
                        <div className="iccds-rf-bank-grid">
                            {BANK_DETAILS.map(item => (
                                <div key={item.label} className="iccds-rf-bank-item">
                                    <span className="iccds-rf-bank-label">{item.label}</span>
                                    <div className="iccds-rf-bank-value-row">
                                        <span className="iccds-rf-bank-value">{item.value}</span>
                                        <button
                                            type="button" className="iccds-rf-copy-btn"
                                            onClick={() => copyToClipboard(item.value, item.label)}
                                        >
                                            {copiedField === item.label
                                                ? <Check size={14} />
                                                : <Copy size={14} />}
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Payment Screenshot Upload */}
                <div className="iccds-rf-receipt-upload">
                    <h3 className="iccds-rf-upload-heading">
                        <Upload size={20} /> Upload Payment Screenshot
                    </h3>
                    <p className="iccds-rf-bank-instruction">
                        After completing the bank transfer, upload a screenshot or PDF of your payment confirmation.
                    </p>
                    <FileDropZone
                        id="payment_screenshot" label="Payment Screenshot"
                        accept=".pdf,.png,.jpg,.jpeg" required
                        file={receiptFile} onFile={setReceiptFile}
                        hint="Screenshot or PDF of your payment (max 10MB)"
                    />
                    {errors.payment_screenshot && <span className="iccds-rf-error">{errors.payment_screenshot}</span>}
                </div>

                {/* API Error */}
                {apiError && (
                    <div className="iccds-rf-alert error">
                        <AlertCircle size={18} /> {apiError}
                    </div>
                )}

                {/* Submit Button */}
                <div className="iccds-rf-actions-center">
                    <button
                        className="iccds-rf-btn primary"
                        onClick={handleSubmit}
                        disabled={submitting}
                    >
                        {submitting ? (
                            <><Loader2 size={18} className="spin" /> Submitting...</>
                        ) : (
                            <>Submit Registration <ArrowRight size={18} /></>
                        )}
                    </button>
                </div>
            </div>
        </StepMotion>
    );

    /* ── STEP 5: Confirmation ── */
    const renderStep5 = () => (
        <StepMotion direction={direction}>
            <div className="iccds-rf-card iccds-rf-card-confirm">
                <motion.div
                    className="iccds-rf-confirm-icon"
                    initial={{ scale: 0 }} animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                >
                    <CheckCircle2 size={64} />
                </motion.div>

                <h2 className="iccds-rf-confirm-title">Registration Submitted!</h2>
                <p className="iccds-rf-confirm-desc">
                    Your registration has been received successfully. A confirmation email will be sent to{' '}
                    <strong>{registrationResult?.email}</strong>.
                </p>

                <div className="iccds-rf-confirm-details">
                    <div className="iccds-rf-confirm-row">
                        <span>Registration ID</span>
                        <strong className="iccds-rf-confirm-id">{registrationResult?.id}</strong>
                    </div>
                    <div className="iccds-rf-confirm-row">
                        <span>Name</span>
                        <strong>{registrationResult?.name}</strong>
                    </div>
                    <div className="iccds-rf-confirm-row">
                        <span>Category</span>
                        <strong>{registrationResult?.category}</strong>
                    </div>
                    <div className="iccds-rf-confirm-row">
                        <span>Fee</span>
                        <strong>{registrationResult?.currency === 'INR' ? '₹' : '$'}{registrationResult?.fee_amount}</strong>
                    </div>
                    <div className="iccds-rf-confirm-row">
                        <span>Status</span>
                        <strong className="iccds-rf-status-badge">{registrationResult?.status}</strong>
                    </div>
                </div>

                <div className="iccds-rf-confirm-note">
                    <AlertCircle size={16} />
                    <span>Please save your Registration ID for future reference. If you chose bank transfer, please complete the payment and upload the receipt from the previous step.</span>
                </div>
            </div>
        </StepMotion>
    );

    /* ═══════════════════════════════════════════════════════════════ */
    return (
        <div className="iccds-page">
            <GlassBackground />
            <motion.div className="iccds-scroll-progress" style={{ scaleX }} />
            <ICCDSNav />

            <main>
                {/* ═══ HERO ═══ */}
                <section className="iccds-reg-hero">
                    <div className="iccds-hero-bg-pattern" />
                    <div className="iccds-container">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <h1 className="iccds-reg-page-title">REGISTRATION PORTAL</h1>
                            <p className="iccds-reg-page-sub">
                                3<sup>rd</sup> International Conference on Computing & Data Science (ICCDS-2026)
                            </p>
                        </motion.div>
                    </div>
                </section>

                {/* ═══ STEPPER ═══ */}
                <section className="iccds-sect">
                    <div className="iccds-container">
                        {/* Hide stepper on Step 0 (Paper ID Verification) */}
                        {currentStep > 0 && (
                        <div className="iccds-rf-stepper">
                            {activeSteps.map((step, i) => {
                                const StepIcon = step.icon;
                                const isActive = currentStep === step.id;
                                const isCompleted = currentStep > step.id;
                                return (
                                    <React.Fragment key={step.id}>
                                        <div className={`iccds-rf-step ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}>
                                            <div className="iccds-rf-step-circle">
                                                {isCompleted ? <Check size={18} /> : <StepIcon size={18} />}
                                            </div>
                                            <span className="iccds-rf-step-label">{step.label}</span>
                                        </div>
                                        {i < activeSteps.length - 1 && (
                                            <div className={`iccds-rf-step-line ${isCompleted ? 'completed' : ''}`} />
                                        )}
                                    </React.Fragment>
                                );
                            })}
                        </div>
                        )}

                        {/* ═══ STEP CONTENT ═══ */}
                        <div className="iccds-rf-content">
                            <AnimatePresence mode="wait">
                                {currentStep === 0 && <React.Fragment key="s0">{renderStep0()}</React.Fragment>}
                                {currentStep === 1 && <React.Fragment key="s1">{renderStep1()}</React.Fragment>}
                                {currentStep === 2 && <React.Fragment key="s2">{renderStep2()}</React.Fragment>}
                                {currentStep === 3 && <React.Fragment key="s3">{renderStep3()}</React.Fragment>}
                                {currentStep === 4 && <React.Fragment key="s4">{renderStep4()}</React.Fragment>}
                                {currentStep === 5 && <React.Fragment key="s5">{renderStep5()}</React.Fragment>}
                            </AnimatePresence>
                        </div>

                        {/* ═══ NAV BUTTONS ═══ */}
                        {currentStep >= 1 && currentStep < 5 && (
                            <div className="iccds-rf-nav-buttons">
                                {currentStep > 1 && (
                                    <button className="iccds-rf-btn secondary" onClick={goBack}>
                                        <ChevronLeft size={18} /> Back
                                    </button>
                                )}
                                <div style={{ flex: 1 }} />
                                {currentStep < 4 && (
                                    <button className="iccds-rf-btn primary" onClick={goNext}>
                                        Next <ChevronRight size={18} />
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                </section>

                {/* ═══ FOOTER ═══ */}
                <footer className="iccds-footer">
                    <div className="iccds-container">
                        <div className="iccds-footer-top">
                            <div className="iccds-footer-brand">
                                <div className="iccds-footer-logos">
                                    <img src={collegeLogo} alt="REC" />
                                </div>
                                <p className="iccds-footer-tagline">
                                    3<sup>rd</sup> International Conference on Computing and Data Science (ICCDS-2026)
                                </p>
                            </div>
                            <div className="iccds-footer-cols">
                                <div className="iccds-footer-col">
                                    <h6>Venue</h6>
                                    <p>Rajalakshmi Engineering College<br />Rajalakshmi Nagar, Thandalam<br />Chennai – 602105, Tamil Nadu, India</p>
                                </div>
                                <div className="iccds-footer-col">
                                    <h6>Contact</h6>
                                    <p>Dr. N. Duraimurugan — 9944915267<br />Dr. K. Ananthajothi — 9994075769<br />iccds2026@rajalakshmi.edu.in</p>
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

export default ICCDSRegistrationForm;
