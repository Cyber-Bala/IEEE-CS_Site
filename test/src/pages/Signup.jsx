import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import './Auth.css';

export default function Signup() {
  const { signup, verifyEmail, resendVerification } = useAuth();
  const navigate = useNavigate();

  const [step, setStep] = useState(1); // 1 = form, 2 = verify email
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    confirm_password: '',
    college_name: '',
    department: '',
    year: '',
    is_ieee_member: false,
    ieee_id: '',
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [verifyLoading, setVerifyLoading] = useState(false);
  const [verifyMessage, setVerifyMessage] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    if (name === 'is_ieee_member' && !checked) {
      setFormData(prev => ({ ...prev, ieee_id: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirm_password) {
      setError('Passwords do not match');
      return;
    }
    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    setLoading(true);
    try {
      const result = await signup(formData);
      if (result.ok) {
        setStep(2);
        setVerifyMessage('A verification code has been sent to your email.');
      } else {
        setError(result.error || 'Signup failed');
      }
    } catch (err) {
      console.error('Signup error:', err);
      setError('Network error: ' + (err.message || 'Please try again.'));
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    setError('');
    setVerifyLoading(true);

    try {
      const result = await verifyEmail(formData.email, verificationCode);
      if (result.ok) {
        navigate('/events');
      } else {
        setError(result.error || 'Verification failed');
      }
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setVerifyLoading(false);
    }
  };

  const handleResend = async () => {
    setError('');
    const result = await resendVerification(formData.email);
    if (result.ok) {
      setVerifyMessage('New verification code sent!');
    } else {
      setError(result.error || 'Failed to resend');
    }
  };

  // Step 2: Verification screen
  if (step === 2) {
    return (
      <>
        <Navbar />
        <div className="auth-page">
          <div className="auth-card">
            <div className="auth-card__header">
              <h1 className="auth-card__title">Verify Your Email</h1>
              <p className="auth-card__subtitle">Enter the 6-digit code sent to <strong>{formData.email}</strong></p>
            </div>

            {verifyMessage && <div className="auth-message auth-message--success">{verifyMessage}</div>}
            {error && <div className="auth-message auth-message--error">{error}</div>}

            <form onSubmit={handleVerify} className="auth-form">
              <div className="auth-field">
                <label className="auth-field__label">Verification Code</label>
                <input
                  type="text"
                  className="auth-field__input auth-field__input--code"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  placeholder="000000"
                  maxLength={6}
                  required
                  autoFocus
                />
              </div>

              <button type="submit" className="auth-btn" disabled={verifyLoading || verificationCode.length !== 6}>
                {verifyLoading ? <span className="auth-btn__spinner"></span> : 'Verify & Continue'}
              </button>
            </form>

            <p className="auth-card__footer">
              Didn't receive the code?{' '}
              <button type="button" className="auth-link-btn" onClick={handleResend}>Resend Code</button>
            </p>
          </div>
        </div>
      </>
    );
  }

  // Step 1: Signup form
  return (
    <>
      <Navbar />
      <div className="auth-page">
        <div className="auth-card auth-card--wide">
          {/* Internal Logo */}
          <div className="flex justify-center mb-8">
            <Link to="/" className="flex items-baseline gap-1">
              <span className="font-display font-medium text-4xl text-[#fafaf9] tracking-tight hover:text-[#c9a227] transition-colors">
                XYPHER
              </span>
              <span className="font-display font-medium text-2xl text-[#c9a227]">
                '26
              </span>
            </Link>
          </div>

          <div className="auth-card__header">
            <h1 className="auth-card__title">Create Account</h1>
            <p className="auth-card__subtitle">Join the IEEE-CS Portal</p>
          </div>

          {error && <div className="auth-message auth-message--error">{error}</div>}

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="auth-form__row">
              <div className="auth-field">
                <label className="auth-field__label">First Name *</label>
                <input
                  id="signup-first-name"
                  type="text"
                  name="first_name"
                  className="auth-field__input"
                  value={formData.first_name}
                  onChange={handleChange}
                  placeholder="John"
                  required
                />
              </div>
              <div className="auth-field">
                <label className="auth-field__label">Last Name *</label>
                <input
                  id="signup-last-name"
                  type="text"
                  name="last_name"
                  className="auth-field__input"
                  value={formData.last_name}
                  onChange={handleChange}
                  placeholder="Doe"
                  required
                />
              </div>
            </div>

            <div className="auth-field">
              <label className="auth-field__label">Email Address *</label>
              <div className="auth-field__wrapper">
                <input
                  id="signup-email"
                  type="email"
                  name="email"
                  className="auth-field__input"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  required
                />
              </div>
            </div>

            <div className="auth-form__row">
              <div className="auth-field">
                <label className="auth-field__label">Password *</label>
                <div className="auth-field__wrapper">
                  <input
                    id="signup-password"
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    className="auth-field__input"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Min 8 characters"
                    required
                  />
                  <button
                    type="button"
                    className="auth-field__toggle"
                    onClick={() => setShowPassword(!showPassword)}
                    tabIndex={-1}
                  >
                    {showPassword ? '🙈' : '👁'}
                  </button>
                </div>
              </div>
              <div className="auth-field">
                <label className="auth-field__label">Confirm Password *</label>
                <input
                  id="signup-confirm-password"
                  type="password"
                  name="confirm_password"
                  className="auth-field__input"
                  value={formData.confirm_password}
                  onChange={handleChange}
                  placeholder="Re-enter password"
                  required
                />
              </div>
            </div>

            <div className="auth-divider"><span>College Details</span></div>

            <div className="auth-form__row">
              <div className="auth-field">
                <label className="auth-field__label">College Name</label>
                <input
                  type="text"
                  name="college_name"
                  className="auth-field__input"
                  value={formData.college_name}
                  onChange={handleChange}
                  placeholder="Your college"
                />
              </div>
              <div className="auth-field">
                <label className="auth-field__label">Department</label>
                <input
                  type="text"
                  name="department"
                  className="auth-field__input"
                  value={formData.department}
                  onChange={handleChange}
                  placeholder="e.g. CSE, ECE"
                />
              </div>
            </div>

            <div className="auth-form__row">
              <div className="auth-field">
                <label className="auth-field__label">Year</label>
                <select
                  name="year"
                  className="auth-field__input auth-field__select"
                  value={formData.year}
                  onChange={handleChange}
                >
                  <option value="">-- Select --</option>
                  <option value="1">1st Year</option>
                  <option value="2">2nd Year</option>
                  <option value="3">3rd Year</option>
                  <option value="4">4th Year</option>
                </select>
              </div>
              <div className="auth-field auth-field--checkbox-wrapper">
                <label className="auth-checkbox">
                  <input
                    type="checkbox"
                    name="is_ieee_member"
                    checked={formData.is_ieee_member}
                    onChange={handleChange}
                  />
                  <span className="auth-checkbox__custom"></span>
                  <span className="auth-checkbox__label">IEEE Member</span>
                </label>
                {formData.is_ieee_member && (
                  <input
                    type="text"
                    name="ieee_id"
                    className="auth-field__input auth-field__input--small"
                    value={formData.ieee_id}
                    onChange={handleChange}
                    placeholder="IEEE ID"
                  />
                )}
              </div>
            </div>

            <button type="submit" className="auth-btn" disabled={loading}>
              {loading ? <span className="auth-btn__spinner"></span> : 'Create Account'}
            </button>
          </form>

          <p className="auth-card__footer">
            Already have an account? <Link to="/login" className="auth-link">Sign In</Link>
          </p>
        </div>
      </div>
    </>
  );
}
