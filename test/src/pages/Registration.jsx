import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Registration.css';

const API_BASE = '';

export default function Registration() {
  const { user, tokens, isAuthenticated, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const eventSlug = searchParams.get('event');

  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [registrationType, setRegistrationType] = useState('individual');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    college_name: '',
    department: '',
    year: '',
    is_ieee_member: false,
    ieee_id: '',
    team_name: '',
    team_code: '',
  });

  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate('/login');
    }
  }, [authLoading, isAuthenticated, navigate]);

  // Auto-fill from user profile
  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        name: `${user.first_name} ${user.last_name}`.trim(),
        email: user.email,
        college_name: user.college_name || prev.college_name,
        department: user.department || prev.department,
        year: user.year || prev.year,
        is_ieee_member: user.is_ieee_member || prev.is_ieee_member,
        ieee_id: user.ieee_id || prev.ieee_id,
      }));
    }
  }, [user]);

  // Fetch events
  useEffect(() => {
    fetch(`${API_BASE}/api/events/`)
      .then(res => res.json())
      .then(data => {
        setEvents(data.events || []);
        if (eventSlug && data.events) {
          const matched = data.events.find(e => e.slug === eventSlug);
          if (matched) {
            setSelectedEvent(matched);
            setRegistrationType(matched.team_size_max > 1 ? 'create_team' : 'individual');
          }
        }
      })
      .catch(err => console.error('Failed to fetch events:', err));
  }, [eventSlug]);

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

  const handleEventChange = (e) => {
    const eventId = parseInt(e.target.value);
    const event = events.find(ev => ev.id === eventId);
    setSelectedEvent(event || null);
    if (event && event.team_size_max > 1) {
      setRegistrationType('create_team');
    } else {
      setRegistrationType('individual');
    }
  };

  const getAmount = () => {
    if (!selectedEvent) return '—';
    if (registrationType === 'join_team' && selectedEvent.is_per_team) return '₹0.00';
    return formData.is_ieee_member ? `₹${selectedEvent.fee_ieee_member}` : `₹${selectedEvent.fee_non_ieee}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedEvent) { setError('Please select an event'); return; }

    setSubmitting(true);
    setError(null);
    setResult(null);

    try {
      const headers = { 'Content-Type': 'application/json' };
      if (tokens?.access) {
        headers['Authorization'] = `Bearer ${tokens.access}`;
      }

      const response = await fetch(`${API_BASE}/api/register/`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          ...formData,
          event_id: selectedEvent.id,
          registration_type: registrationType,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setResult(data);
        setFormData(prev => ({ ...prev, team_name: '', team_code: '' }));
        setSelectedEvent(null);
        setRegistrationType('individual');
      } else {
        setError(data.error || 'Registration failed');
      }
    } catch (err) {
      setError('Network error: ' + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (authLoading) {
    return (
      <div className="reg-page">
        <div className="reg-loader"><div className="reg-loader__spinner"></div></div>
      </div>
    );
  }

  if (!isAuthenticated) return null;

  return (
    <div className="reg-page">
      {/* Top Bar */}
      <header className="reg-topbar">
        <Link to="/events" className="reg-topbar__back">
          BACK TO EVENTS
        </Link>
        <span className="reg-topbar__title">Event Registration</span>
      </header>

      <div className="reg-container">
        {/* Success Result */}
        {result && (
          <div className="reg-success">
            <div className="reg-success__icon">✅</div>
            <h2 className="reg-success__title">Registration Complete!</h2>
            <p className="reg-success__text">Your registration has been submitted successfully.</p>

            {result.registration.registration_type === 'create_team' && (
              <div className="reg-success__team-card">
                <h3>Your Team Code</h3>
                <code className="reg-success__code">{result.registration.team_code}</code>
                <p className="reg-success__team-name">Team: <strong>{result.registration.team_name}</strong></p>
                <p className="reg-success__hint">Share this code with your team members!</p>
              </div>
            )}

            {result.registration.registration_type === 'join_team' && (
              <div className="reg-success__join-card">
                <p>You joined team: <strong>{result.registration.team_name}</strong></p>
                {result.registration.team_members && (
                  <div className="reg-success__members">
                    <h4>Team Members ({result.registration.team_members.length})</h4>
                    {result.registration.team_members.map((m, i) => (
                      <span key={i} className="reg-member-chip">
                        {m.name} {m.role === 'Leader' && '★'}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            )}

            <div className="reg-success__details">
              <p><strong>Registration ID:</strong> {result.registration.id}</p>
              <p><strong>Event:</strong> {result.registration.event}</p>
              <p><strong>Amount:</strong> ₹{result.registration.amount}</p>
              <p><strong>Status:</strong> {result.registration.payment_status}</p>
            </div>

            <div className="reg-success__actions">
              <button className="reg-btn reg-btn--secondary" onClick={() => setResult(null)}>
                REGISTER ANOTHER
              </button>
              <Link to="/events" className="reg-btn reg-btn--primary">
                GO TO EVENTS
              </Link>
            </div>
          </div>
        )}

        {/* Registration Form */}
        {!result && (
          <form onSubmit={handleSubmit} className="reg-form">
            <div className="reg-form__header flex flex-col items-center text-center mb-8">
              <div className="flex items-baseline justify-center gap-2 mb-1">
                <span className="font-display font-medium text-5xl md:text-6xl text-[#fafaf9] tracking-tight">
                  XYPHER
                </span>
                <span className="font-display font-medium text-3xl md:text-4xl text-[#c9a227]">
                  '26
                </span>
              </div>
              <div className="font-cinzel text-2xl md:text-3xl text-[#fafaf9] font-bold tracking-[0.3em] uppercase opacity-80 mb-4">
                Registration
              </div>
              <p className="w-full text-primary/80 font-medium">Logged in as <strong>{user?.first_name} {user?.last_name}</strong></p>
            </div>

            {error && <div className="reg-error">{error}</div>}

            {/* Event Selection */}
            <div className="reg-field">
              <label className="reg-field__label">Select Event *</label>
              <select
                id="reg-event-select"
                className="reg-field__select"
                value={selectedEvent?.id || ''}
                onChange={handleEventChange}
                required
              >
                <option value="">-- Choose an Event --</option>
                {events.map(ev => (
                  <option key={ev.id} value={ev.id}>
                    {ev.name} (Day {ev.day}) — IEEE: ₹{ev.fee_ieee_member} | Non-IEEE: ₹{ev.fee_non_ieee}
                    {ev.is_per_team ? ' per team' : ' per person'}
                  </option>
                ))}
              </select>
            </div>

            {/* Event Preview */}
            {selectedEvent && (
              <div className="reg-event-preview">
                <h3>{selectedEvent.name}</h3>
                <p className="reg-event-preview__desc">{selectedEvent.description}</p>
                <div className="reg-event-preview__meta">
                  <span>{selectedEvent.team_size_min}–{selectedEvent.team_size_max} MEMBERS</span>
                  <span>{selectedEvent.duration_hours} HOURS</span>
                  <span>₹{selectedEvent.prize_pool} PRIZE POOL</span>
                </div>
              </div>
            )}

            {/* Team Options */}
            {selectedEvent && selectedEvent.team_size_max > 1 && (
              <div className="reg-team-options">
                <label className="reg-field__label">Team Options *</label>
                <div className="reg-team-options__btns">
                  <button
                    type="button"
                    className={`reg-team-opt ${registrationType === 'create_team' ? 'reg-team-opt--active' : ''}`}
                    onClick={() => setRegistrationType('create_team')}
                  >
                    CREATE A NEW TEAM
                  </button>
                  <button
                    type="button"
                    className={`reg-team-opt ${registrationType === 'join_team' ? 'reg-team-opt--active' : ''}`}
                    onClick={() => setRegistrationType('join_team')}
                  >
                    JOIN EXISTING TEAM
                  </button>
                </div>
              </div>
            )}

            {registrationType === 'create_team' && (
              <div className="reg-field">
                <label className="reg-field__label">Team Name *</label>
                <input
                  type="text"
                  name="team_name"
                  className="reg-field__input"
                  value={formData.team_name}
                  onChange={handleChange}
                  placeholder="Enter an awesome team name"
                  required
                />
              </div>
            )}

            {registrationType === 'join_team' && (
              <div className="reg-field">
                <label className="reg-field__label">Team Code *</label>
                <input
                  type="text"
                  name="team_code"
                  className="reg-field__input reg-field__input--code"
                  value={formData.team_code}
                  onChange={(e) => setFormData(prev => ({ ...prev, team_code: e.target.value.toUpperCase() }))}
                  placeholder="e.g. A8X2B9"
                  required
                />
                <span className="reg-field__hint">Ask your team leader for this code.</span>
              </div>
            )}

            {/* Personal Details (auto-filled, editable) */}
            <div className="reg-divider"><span>Personal Details</span></div>

            <div className="reg-form__row">
              <div className="reg-field">
                <label className="reg-field__label">Your Name *</label>
                <input type="text" name="name" className="reg-field__input" value={formData.name} onChange={handleChange} required />
              </div>
              <div className="reg-field">
                <label className="reg-field__label">Email *</label>
                <input type="email" name="email" className="reg-field__input" value={formData.email} onChange={handleChange} required />
              </div>
            </div>

            <div className="reg-form__row">
              <div className="reg-field">
                <label className="reg-field__label">College Name *</label>
                <input type="text" name="college_name" className="reg-field__input" value={formData.college_name} onChange={handleChange} required />
              </div>
              <div className="reg-field">
                <label className="reg-field__label">Department *</label>
                <input type="text" name="department" className="reg-field__input" value={formData.department} onChange={handleChange} required />
              </div>
            </div>

            <div className="reg-form__row">
              <div className="reg-field">
                <label className="reg-field__label">Year *</label>
                <select name="year" className="reg-field__select" value={formData.year} onChange={handleChange} required>
                  <option value="">-- Select --</option>
                  <option value="1">1st Year</option>
                  <option value="2">2nd Year</option>
                  <option value="3">3rd Year</option>
                  <option value="4">4th Year</option>
                </select>
              </div>
              <div className="reg-field reg-field--ieee">
                <label className="reg-checkbox">
                  <input type="checkbox" name="is_ieee_member" checked={formData.is_ieee_member} onChange={handleChange} />
                  <span className="reg-checkbox__custom"></span>
                  <span>IEEE Member</span>
                </label>
                {formData.is_ieee_member && (
                  <input type="text" name="ieee_id" className="reg-field__input" value={formData.ieee_id} onChange={handleChange} placeholder="IEEE ID" required />
                )}
              </div>
            </div>

            {/* Amount */}
            <div className="reg-amount">
              <div className="reg-amount__row">
                <span className="reg-amount__label">Amount to Pay:</span>
                <span className="reg-amount__value">{getAmount()}</span>
              </div>
              {selectedEvent && selectedEvent.is_per_team && registrationType === 'create_team' && (
                <p className="reg-amount__note">Per team — you pay for the whole team</p>
              )}
              {selectedEvent && selectedEvent.is_per_team && registrationType === 'join_team' && (
                <p className="reg-amount__note reg-amount__note--free">Free to join — team leader pays</p>
              )}
            </div>

            <button type="submit" className="reg-btn reg-btn--primary reg-btn--full" disabled={submitting}>
              {submitting ? <span className="reg-btn__spinner"></span> : 'Register Now'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
