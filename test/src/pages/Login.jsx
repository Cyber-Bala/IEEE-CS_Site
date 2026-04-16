import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import './Auth.css';

export default function Login() {
  const { login, verifyEmail, resendVerification } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Verification flow state
  const [needsVerification, setNeedsVerification] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [verificationEmail, setVerificationEmail] = useState('');
  const [verifyLoading, setVerifyLoading] = useState(false);
  const [verifyMessage, setVerifyMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await login(email, password);
      if (result.ok) {
        navigate('/events');
      } else if (result.status === 403 && result.needs_verification) {
        setNeedsVerification(true);
        setVerificationEmail(result.email);
        setVerifyMessage('A verification code has been sent to your email.');
      } else {
        setError(result.error || 'Login failed');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    setError('');
    setVerifyLoading(true);

    try {
      const result = await verifyEmail(verificationEmail, verificationCode);
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
    const result = await resendVerification(verificationEmail);
    if (result.ok) {
      setVerifyMessage('New verification code sent!');
    } else {
      setError(result.error || 'Failed to resend');
    }
  };

  if (needsVerification) {
    return (
      <>
        <Navbar />
        <div className="auth-page">
          <div className="auth-card">
            <div className="auth-card__header">
              <h1 className="auth-card__title">Verify Your Email</h1>
              <p className="auth-card__subtitle">Enter the 6-digit code sent to <strong>{verificationEmail}</strong></p>
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
                {verifyLoading ? <span className="auth-btn__spinner"></span> : 'Verify & Login'}
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

  return (
    <>
      <Navbar />
      <div className="auth-page">
        <div className="auth-card">
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
            <h1 className="auth-card__title">Welcome Back</h1>
            <p className="auth-card__subtitle">Sign in to the IEEE-CS Portal</p>
          </div>

          {error && <div className="auth-message auth-message--error">{error}</div>}

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="auth-field">
              <label className="auth-field__label">Email Address</label>
              <div className="auth-field__wrapper">
                <input
                  id="login-email"
                  type="email"
                  className="auth-field__input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  autoFocus
                />
              </div>
            </div>

            <div className="auth-field">
              <label className="auth-field__label">Password</label>
              <div className="auth-field__wrapper">
                <input
                  id="login-password"
                  type={showPassword ? 'text' : 'password'}
                  className="auth-field__input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
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

            <button type="submit" className="auth-btn" disabled={loading}>
              {loading ? <span className="auth-btn__spinner"></span> : 'Sign In'}
            </button>
          </form>

          <p className="auth-card__footer">
            Don't have an account? <Link to="/signup" className="auth-link">Create Account</Link>
          </p>
        </div>
      </div>
    </>
  );
}
