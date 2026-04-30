// src/pages/RegisterPage.js

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { useAuth } from '../context/AuthContext';

const RegisterPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'seeker', // Default role
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const { data } = await api.post('/auth/register', form);
      login(data);           // Save user info + token to context & localStorage
      navigate('/dashboard'); // Redirect to dashboard
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>Join HireNest</h2>
        <p style={styles.subtitle}>Create your account to get started</p>

        {error && <div style={styles.error}>{error}</div>}

        <form onSubmit={handleSubmit} style={styles.form}>
          <label style={styles.label}>Full Name</label>
          <input
            name="name"
            type="text"
            placeholder="Jane Smith"
            value={form.name}
            onChange={handleChange}
            required
            style={styles.input}
          />

          <label style={styles.label}>Email</label>
          <input
            name="email"
            type="email"
            placeholder="jane@example.com"
            value={form.email}
            onChange={handleChange}
            required
            style={styles.input}
          />

          <label style={styles.label}>Password</label>
          <input
            name="password"
            type="password"
            placeholder="Min 6 characters"
            value={form.password}
            onChange={handleChange}
            required
            style={styles.input}
          />

          <label style={styles.label}>I am a...</label>
          <div style={styles.roleGroup}>
            {['seeker', 'recruiter'].map((r) => (
              <label
                key={r}
                style={{
                  ...styles.roleOption,
                  ...(form.role === r ? styles.roleSelected : {}),
                }}
              >
                <input
                  type="radio"
                  name="role"
                  value={r}
                  checked={form.role === r}
                  onChange={handleChange}
                  style={{ display: 'none' }}
                />
                {r === 'seeker' ? 'Job Seeker' : 'Recruiter'}
              </label>
            ))}
          </div>

          <button type="submit" style={styles.btn} disabled={loading}>
            {loading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

        <p style={styles.footer}>
          Already have an account?{' '}
          <Link to="/login" style={styles.link}>Log in</Link>
        </p>
      </div>
    </div>
  );
};

const styles = {
  page: {
    minHeight: '100vh',
    backgroundColor: 'var(--bg)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2rem',
  },
  card: {
    backgroundColor: 'var(--surface)',
    borderRadius: '16px',
    padding: '2.5rem',
    width: '100%',
    maxWidth: '420px',
    border: '1px solid var(--border)',
  },
  title: {
    color: 'var(--text)',
    margin: '0 0 0.25rem',
    fontSize: '1.8rem',
    textAlign: 'center',
  },
  subtitle: {
    color: 'var(--muted)',
    textAlign: 'center',
    marginBottom: '1.5rem',
    fontSize: '0.9rem',
  },
  error: {
    backgroundColor: 'rgba(214, 69, 94, 0.12)',
    border: '1px solid var(--danger)',
    color: 'var(--danger)',
    padding: '0.75rem',
    borderRadius: '8px',
    marginBottom: '1rem',
    fontSize: '0.9rem',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  label: {
    color: 'var(--muted)',
    fontSize: '0.85rem',
    marginTop: '0.5rem',
  },
  input: {
    backgroundColor: 'var(--bg)',
    border: '1px solid var(--border)',
    borderRadius: '8px',
    padding: '0.75rem 1rem',
    color: 'var(--text)',
    fontSize: '0.95rem',
    outline: 'none',
    width: '100%',
    boxSizing: 'border-box',
  },
  roleGroup: {
    display: 'flex',
    gap: '0.75rem',
    marginTop: '0.25rem',
  },
  roleOption: {
    flex: 1,
    padding: '0.75rem',
    border: '1px solid var(--border)',
    borderRadius: '8px',
    color: 'var(--muted)',
    cursor: 'pointer',
    textAlign: 'center',
    fontSize: '0.9rem',
    transition: 'all 0.2s',
  },
  roleSelected: {
    borderColor: 'var(--primary)',
    color: 'var(--primary)',
    backgroundColor: 'var(--surface-alt)',
  },
  btn: {
    marginTop: '1rem',
    backgroundColor: 'var(--primary)',
    color: 'var(--text)',
    border: 'none',
    padding: '0.85rem',
    borderRadius: '8px',
    fontSize: '1rem',
    fontWeight: '700',
    cursor: 'pointer',
  },
  footer: {
    textAlign: 'center',
    color: 'var(--muted)',
    marginTop: '1.5rem',
    fontSize: '0.9rem',
  },
  link: {
    color: 'var(--primary)',
    textDecoration: 'none',
    fontWeight: '600',
  },
};

export default RegisterPage;
