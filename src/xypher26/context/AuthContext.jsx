import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const AuthContext = createContext(null);
const API_BASE = '';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [tokens, setTokens] = useState(() => {
    const saved = localStorage.getItem('auth_tokens');
    return saved ? JSON.parse(saved) : null;
  });
  const [loading, setLoading] = useState(true);

  // Save tokens to localStorage whenever they change
  useEffect(() => {
    if (tokens) {
      localStorage.setItem('auth_tokens', JSON.stringify(tokens));
    } else {
      localStorage.removeItem('auth_tokens');
    }
  }, [tokens]);

  // Fetch user profile on mount if tokens exist
  useEffect(() => {
    if (tokens?.access) {
      fetchProfile();
    } else {
      setLoading(false);
    }
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await authFetch('/api/auth/profile/');
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
      } else {
        // Token might be expired, try refresh
        const refreshed = await refreshToken();
        if (refreshed) {
          const res2 = await fetch(`${API_BASE}/api/auth/profile/`, {
            headers: { 'Authorization': `Bearer ${refreshed}` },
          });
          if (res2.ok) {
            const data2 = await res2.json();
            setUser(data2.user);
          } else {
            logout();
          }
        } else {
          logout();
        }
      }
    } catch {
      logout();
    } finally {
      setLoading(false);
    }
  };

  const refreshToken = async () => {
    if (!tokens?.refresh) return null;
    try {
      const res = await fetch(`${API_BASE}/api/auth/refresh/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refresh: tokens.refresh }),
      });
      if (res.ok) {
        const data = await res.json();
        const newTokens = { ...tokens, access: data.access };
        setTokens(newTokens);
        return data.access;
      }
    } catch {}
    return null;
  };

  const authFetch = useCallback(async (url, options = {}) => {
    if (!tokens?.access) throw new Error('Not authenticated');
    const headers = {
      ...options.headers,
      'Authorization': `Bearer ${tokens.access}`,
    };
    return fetch(`${API_BASE}${url}`, { ...options, headers });
  }, [tokens]);

  const signup = async (formData) => {
    const res = await fetch(`${API_BASE}/api/auth/signup/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    return res.json().then(data => ({ ...data, ok: res.ok, status: res.status }));
  };

  const verifyEmail = async (email, code) => {
    const res = await fetch(`${API_BASE}/api/auth/verify-email/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, code }),
    });
    const data = await res.json();
    if (res.ok && data.tokens) {
      setTokens(data.tokens);
      setUser(data.user);
    }
    return { ...data, ok: res.ok };
  };

  const resendVerification = async (email) => {
    const res = await fetch(`${API_BASE}/api/auth/resend-verification/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
    return res.json().then(data => ({ ...data, ok: res.ok }));
  };

  const login = async (email, password) => {
    const res = await fetch(`${API_BASE}/api/auth/login/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (res.ok && data.tokens) {
      setTokens(data.tokens);
      setUser(data.user);
    }
    return { ...data, ok: res.ok, status: res.status };
  };

  const logout = useCallback(() => {
    setTokens(null);
    setUser(null);
    localStorage.removeItem('auth_tokens');
  }, []);

  const updateProfile = async (profileData) => {
    const res = await authFetch('/api/auth/profile/', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(profileData),
    });
    const data = await res.json();
    if (res.ok) {
      setUser(data.user);
    }
    return { ...data, ok: res.ok };
  };

  const value = {
    user,
    tokens,
    loading,
    login,
    signup,
    verifyEmail,
    resendVerification,
    logout,
    authFetch,
    updateProfile,
    isAuthenticated: !!user && !!tokens,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}

export default AuthContext;
