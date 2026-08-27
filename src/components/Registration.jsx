import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:8000';

export default function Registration() {
  const [searchParams] = useSearchParams();
  const eventSlug = searchParams.get('event');

  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);

  // Registration Type: 'individual', 'create_team', or 'join_team'
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

  // Fetch events on mount
  useEffect(() => {
    fetch(`${API_BASE}/api/events/`)
      .then(res => res.json())
      .then(data => {
        setEvents(data.events || []);
        if (eventSlug && data.events) {
          const matched = data.events.find(e => e.slug === eventSlug);
          if (matched) {
            setSelectedEvent(matched);
            if (matched.team_size_max > 1) {
              setRegistrationType('create_team');
            } else {
              setRegistrationType('individual');
            }
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

    // Automatically switch registration mode if team event
    if (event && event.team_size_max > 1) {
      setRegistrationType('create_team');
    } else {
      setRegistrationType('individual');
    }
  };

  const getAmount = () => {
    if (!selectedEvent) return '—';
    if (registrationType === 'join_team' && selectedEvent.is_per_team) {
      return '₹0.00';
    }
    if (formData.is_ieee_member) {
      return `₹${selectedEvent.fee_ieee_member}`;
    }
    return `₹${selectedEvent.fee_non_ieee}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedEvent) {
      setError('Please select an event');
      return;
    }

    setSubmitting(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch(`${API_BASE}/api/register/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          event_id: selectedEvent.id,
          registration_type: registrationType
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setResult(data);
        // Reset form
        setFormData({
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

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto', fontFamily: 'sans-serif', background: '#ffffff', color: '#000000', minHeight: '100vh' }}>
      <h1 style={{ color: '#000' }}>XYPHER'26 Registration (TEST PAGE)</h1>

      {result && (
        <div style={{ border: '2px solid green', padding: '20px', marginBottom: '20px', background: '#e6ffe6', color: '#000', borderRadius: '8px' }}>
          <h2 style={{ color: '#1a7a1a', margin: '0 0 10px 0' }}>✅ Registration Complete!</h2>
          <p>Your registration has been successfully submitted.</p>
          <hr style={{ border: '1px solid #b3e6b3', margin: '10px 0' }} />

          {result.registration.registration_type === 'create_team' && (
            <div style={{ padding: '15px', background: '#d4edda', borderRadius: '4px', margin: '15px 0', border: '1px solid #c3e6cb' }}>
              <h3 style={{ margin: '0 0 5px 0', color: '#155724' }}>Your Team Code: <span style={{ fontSize: '24px', letterSpacing: '2px' }}>{result.registration.team_code}</span></h3>
              <p style={{ margin: 0, color: '#155724' }}>Team Name: <strong>{result.registration.team_name}</strong></p>
              <p style={{ margin: '5px 0 0 0', color: '#155724', fontSize: '14px' }}>Share this code with your team members so they can join!</p>
            </div>
          )}

          {result.registration.registration_type === 'join_team' && (
            <div style={{ padding: '15px', background: '#d1ecf1', borderRadius: '4px', margin: '15px 0', border: '1px solid #bee5eb' }}>
              <p style={{ margin: '0 0 10px 0', color: '#0c5460', fontSize: '16px' }}>You have successfully joined the team: <strong>{result.registration.team_name}</strong></p>

              {result.registration.team_members && result.registration.team_members.length > 0 && (
                <div style={{ background: 'rgba(255,255,255,0.5)', padding: '10px', borderRadius: '4px' }}>
                  <h4 style={{ margin: '0 0 8px 0', color: '#0c5460' }}>Team Members ({result.registration.team_members.length}):</h4>
                  <ul style={{ margin: 0, paddingLeft: '20px', color: '#0c5460' }}>
                    {result.registration.team_members.map((member, index) => (
                      <li key={index} style={{ marginBottom: '4px' }}>
                        {member.name} {member.role === 'Leader' && <span style={{ fontSize: '12px', background: '#0c5460', color: 'white', padding: '2px 6px', borderRadius: '10px', marginLeft: '5px' }}>Leader</span>}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          <p><strong>Registration ID:</strong> {result.registration.id}</p>
          <p><strong>Name:</strong> {result.registration.name}</p>
          <p><strong>Event:</strong> {result.registration.event}</p>
          <p><strong>Amount:</strong> ₹{result.registration.amount}</p>
          <p><strong>Payment Status:</strong> {result.registration.payment_status}</p>
          <p style={{ color: '#666', fontSize: '12px', marginTop: '10px' }}>
            💳 PayPal payment integration coming soon. For now, payment status is &quot;pending&quot;.
          </p>
          <button
            onClick={() => setResult(null)}
            style={{ marginTop: '10px', padding: '8px 20px', cursor: 'pointer', background: '#1a7a1a', color: '#fff', border: 'none', borderRadius: '4px' }}
          >
            Register Another
          </button>
        </div>
      )}

      {error && (
        <div style={{ border: '2px solid red', padding: '15px', marginBottom: '20px', background: '#ffe6e6' }}>
          <strong>❌ Error:</strong> {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {/* Event Selection */}
        <div style={{ marginBottom: '15px' }}>
          <label><strong>Event: *</strong></label><br />
          <select
            value={selectedEvent?.id || ''}
            onChange={handleEventChange}
            required
            style={{ width: '100%', padding: '8px' }}
          >
            <option value="">-- Select an Event --</option>
            {events.map(ev => (
              <option key={ev.id} value={ev.id}>
                {ev.name} (Day {ev.day}) — IEEE: ₹{ev.fee_ieee_member} | Non-IEEE: ₹{ev.fee_non_ieee}
                {ev.is_per_team ? ' per team' : ' per person'}
              </option>
            ))}
          </select>
        </div>

        {/* Event details preview */}
        {selectedEvent && (
          <div style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '15px', background: '#f9f9f9', color: '#000' }}>
            <strong>Selected: {selectedEvent.name}</strong>
            <p>{selectedEvent.description}</p>
            <p>Team size: {selectedEvent.team_size_min}–{selectedEvent.team_size_max} members</p>
            <p>Duration: {selectedEvent.duration_hours} hours</p>
            <p>Prize Pool: ₹{selectedEvent.prize_pool}</p>
          </div>
        )}

        {/* Team Type Selection (Only for team events) */}
        {selectedEvent && selectedEvent.team_size_max > 1 && (
          <div style={{ marginBottom: '15px', padding: '10px', border: '1px solid #007bff', borderRadius: '4px', background: '#f8f9fa' }}>
            <strong>Team Options: *</strong><br />
            <div style={{ marginTop: '10px' }}>
              <label style={{ marginRight: '20px', cursor: 'pointer' }}>
                <input
                  type="radio"
                  name="registrationType"
                  value="create_team"
                  checked={registrationType === 'create_team'}
                  onChange={() => setRegistrationType('create_team')}
                />
                {' '}Create a New Team
              </label>
              <label style={{ cursor: 'pointer' }}>
                <input
                  type="radio"
                  name="registrationType"
                  value="join_team"
                  checked={registrationType === 'join_team'}
                  onChange={() => setRegistrationType('join_team')}
                />
                {' '}Join an Existing Team
              </label>
            </div>
          </div>
        )}

        {/* Team Name Input (If Creating) */}
        {registrationType === 'create_team' && (
          <div style={{ marginBottom: '10px' }}>
            <label>Team Name: *</label><br />
            <input
              type="text"
              name="team_name"
              value={formData.team_name}
              onChange={handleChange}
              required
              style={{ width: '100%', padding: '8px' }}
              placeholder="Enter an awesome team name"
            />
          </div>
        )}

        {/* Team Code Input (If Joining) */}
        {registrationType === 'join_team' && (
          <div style={{ marginBottom: '10px' }}>
            <label>Team Code: *</label><br />
            <input
              type="text"
              name="team_code"
              value={formData.team_code}
              onChange={(e) => setFormData(prev => ({ ...prev, team_code: e.target.value.toUpperCase() }))}
              required
              style={{ width: '100%', padding: '8px', fontSize: '18px', letterSpacing: '2px' }}
              placeholder="e.g. A8X2B9"
            />
            <small style={{ color: 'gray' }}>Ask your team leader for this code.</small>
          </div>
        )}

        {/* Personal Details */}
        <hr style={{ margin: '20px 0', border: 'none', borderTop: '1px solid #eee' }} />

        <div style={{ marginBottom: '10px' }}>
          <label>Your Name: *</label><br />
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '8px' }}
          />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label>Email: *</label><br />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '8px' }}
          />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label>College Name: *</label><br />
          <input
            type="text"
            name="college_name"
            value={formData.college_name}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '8px' }}
          />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label>Department: *</label><br />
          <input
            type="text"
            name="department"
            value={formData.department}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '8px' }}
          />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label>Year: *</label><br />
          <select
            name="year"
            value={formData.year}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '8px' }}
          >
            <option value="">-- Select Year --</option>
            <option value="1">1st Year</option>
            <option value="2">2nd Year</option>
            <option value="3">3rd Year</option>
            <option value="4">4th Year</option>
          </select>
        </div>

        {/* IEEE Member */}
        <div style={{ marginBottom: '10px' }}>
          <label>
            <input
              type="checkbox"
              name="is_ieee_member"
              checked={formData.is_ieee_member}
              onChange={handleChange}
            />
            {' '}Are you an IEEE Member?
          </label>
        </div>

        {/* IEEE ID - shown only if member */}
        {formData.is_ieee_member && (
          <div style={{ marginBottom: '10px' }}>
            <label>IEEE ID: *</label><br />
            <input
              type="text"
              name="ieee_id"
              value={formData.ieee_id}
              onChange={handleChange}
              required
              style={{ width: '100%', padding: '8px' }}
            />
          </div>
        )}

        {/* Amount Preview */}
        <div style={{ marginBottom: '15px', padding: '10px', background: '#f0f0f0', border: '1px solid #ddd', color: '#000' }}>
          <strong>Amount to Pay: {getAmount()}</strong>

          {selectedEvent && selectedEvent.is_per_team && registrationType === 'create_team' && (
            <span style={{ color: 'gray' }}> (per team — you pay for the whole team)</span>
          )}
          {selectedEvent && selectedEvent.is_per_team && registrationType === 'join_team' && (
            <span style={{ color: 'green', fontWeight: 'bold' }}> (free to join — team leader pays)</span>
          )}
          {selectedEvent && !selectedEvent.is_per_team && (
            <span style={{ color: 'gray' }}> (per participant)</span>
          )}

          <br />
          <small style={{ color: 'gray' }}>
            💳 PayPal payment integration coming soon. Registration will be saved with &quot;pending&quot; status.
          </small>
        </div>

        <button
          type="submit"
          disabled={submitting}
          style={{ padding: '10px 30px', fontSize: '16px', cursor: 'pointer', background: '#007bff', color: '#fff', border: 'none', borderRadius: '4px' }}
        >
          {submitting ? 'Submitting...' : 'Register'}
        </button>
      </form>
    </div>
  );
}
