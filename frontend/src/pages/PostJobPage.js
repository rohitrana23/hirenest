// src/pages/PostJobPage.js — Recruiters use this to post new jobs

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';

const PostJobPage = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: '',
    company: '',
    location: '',
    salary: '',
    keywords: '',
    description: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      // Convert comma-separated keywords string to an array
      const payload = {
        ...form,
        keywords: form.keywords
          ? form.keywords.split(',').map((k) => k.trim()).filter(Boolean)
          : [],
      };
      await api.post('/jobs', payload);
      navigate('/dashboard'); // Go back to dashboard after posting
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to post job');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>Post a New Job</h2>
        <p style={styles.subtitle}>Fill in the details to attract the right candidates</p>

        {error && <div style={styles.error}>{error}</div>}

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.row}>
            <div style={styles.field}>
              <label style={styles.label}>Job Title *</label>
              <input name="title" value={form.title} onChange={handleChange}
                placeholder="e.g. Senior React Developer" required style={styles.input} />
            </div>
            <div style={styles.field}>
              <label style={styles.label}>Company *</label>
              <input name="company" value={form.company} onChange={handleChange}
                placeholder="e.g. Acme Corp" required style={styles.input} />
            </div>
          </div>

          <div style={styles.row}>
            <div style={styles.field}>
              <label style={styles.label}>Location *</label>
              <input name="location" value={form.location} onChange={handleChange}
                placeholder="e.g. Bangalore, Remote" required style={styles.input} />
            </div>
            <div style={styles.field}>
              <label style={styles.label}>Salary (optional)</label>
              <input name="salary" value={form.salary} onChange={handleChange}
                placeholder="e.g. ₹8–12 LPA" style={styles.input} />
            </div>
          </div>

          <label style={styles.label}>
            Keywords (comma-separated)
            <span style={styles.hint}> — helps seekers find your job</span>
          </label>
          <input
            name="keywords"
            value={form.keywords}
            onChange={handleChange}
            placeholder="e.g. React, Node.js, MongoDB, REST API"
            style={styles.input}
          />

          <label style={styles.label}>Job Description *</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Describe the role, responsibilities, requirements..."
            required
            rows={8}
            style={{ ...styles.input, resize: 'vertical' }}
          />

          <div style={styles.btnRow}>
            <button type="button" onClick={() => navigate('/dashboard')} style={styles.cancelBtn}>
              Cancel
            </button>
            <button type="submit" style={styles.submitBtn} disabled={loading}>
              {loading ? 'Posting...' : 'Post Job'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const styles = {
  page: {
    minHeight: '100vh',
    backgroundColor: 'var(--bg)',
    padding: '2rem 1.5rem',
    display: 'flex',
    justifyContent: 'center',
  },
  card: {
    backgroundColor: 'var(--surface)',
    border: '1px solid var(--border)',
    borderRadius: '16px',
    padding: '2.5rem',
    width: '100%',
    maxWidth: '760px',
    height: 'fit-content',
  },
  title: {
    color: 'var(--text)',
    margin: '0 0 0.25rem',
    fontSize: '1.6rem',
  },
  subtitle: {
    color: 'var(--muted)',
    marginBottom: '2rem',
    fontSize: '0.9rem',
  },
  error: {
    backgroundColor: 'rgba(214, 69, 94, 0.12)',
    border: '1px solid var(--danger)',
    color: 'var(--danger)',
    padding: '0.75rem',
    borderRadius: '8px',
    marginBottom: '1rem',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
  },
  row: {
    display: 'flex',
    gap: '1rem',
    flexWrap: 'wrap',
  },
  field: {
    flex: '1 1 200px',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.3rem',
  },
  label: {
    color: 'var(--muted)',
    fontSize: '0.85rem',
    marginTop: '0.25rem',
  },
  hint: {
    color: 'var(--muted)',
    fontSize: '0.8rem',
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
  btnRow: {
    display: 'flex',
    gap: '1rem',
    justifyContent: 'flex-end',
    marginTop: '0.5rem',
  },
  cancelBtn: {
    backgroundColor: 'transparent',
    border: '1px solid var(--border)',
    color: 'var(--muted)',
    padding: '0.75rem 1.5rem',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '0.95rem',
  },
  submitBtn: {
    backgroundColor: 'var(--primary)',
    color: 'var(--text)',
    border: 'none',
    padding: '0.75rem 2rem',
    borderRadius: '8px',
    fontSize: '1rem',
    fontWeight: '700',
    cursor: 'pointer',
  },
};

export default PostJobPage;
