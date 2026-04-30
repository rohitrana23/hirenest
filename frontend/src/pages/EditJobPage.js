// src/pages/EditJobPage.js — Pre-fills a form to edit an existing job

import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../utils/api';

const EditJobPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: '',
    company: '',
    location: '',
    salary: '',
    keywords: '',
    description: '',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  // Load existing job data to pre-fill the form
  useEffect(() => {
    const fetchJob = async () => {
      try {
        const { data } = await api.get(`/jobs/${id}`);
        setForm({
          title: data.title,
          company: data.company,
          location: data.location,
          salary: data.salary || '',
          keywords: data.keywords?.join(', ') || '',
          description: data.description,
        });
      } catch (err) {
        setError('Failed to load job');
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = {
        ...form,
        keywords: form.keywords
          ? form.keywords.split(',').map((k) => k.trim()).filter(Boolean)
          : [],
      };
      await api.put(`/jobs/${id}`, payload);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update job');
      setSaving(false);
    }
  };

  if (loading) return <div style={{ color: 'var(--muted)', textAlign: 'center', padding: '3rem' }}>Loading...</div>;

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>Edit Job</h2>

        {error && <div style={styles.error}>{error}</div>}

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.row}>
            <div style={styles.field}>
              <label style={styles.label}>Job Title *</label>
              <input name="title" value={form.title} onChange={handleChange} required style={styles.input} />
            </div>
            <div style={styles.field}>
              <label style={styles.label}>Company *</label>
              <input name="company" value={form.company} onChange={handleChange} required style={styles.input} />
            </div>
          </div>

          <div style={styles.row}>
            <div style={styles.field}>
              <label style={styles.label}>Location *</label>
              <input name="location" value={form.location} onChange={handleChange} required style={styles.input} />
            </div>
            <div style={styles.field}>
              <label style={styles.label}>Salary</label>
              <input name="salary" value={form.salary} onChange={handleChange} style={styles.input} />
            </div>
          </div>

          <label style={styles.label}>Keywords (comma-separated)</label>
          <input name="keywords" value={form.keywords} onChange={handleChange} style={styles.input} />

          <label style={styles.label}>Job Description *</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            required
            rows={8}
            style={{ ...styles.input, resize: 'vertical' }}
          />

          <div style={styles.btnRow}>
            <button type="button" onClick={() => navigate('/dashboard')} style={styles.cancelBtn}>
              Cancel
            </button>
            <button type="submit" style={styles.submitBtn} disabled={saving}>
              {saving ? 'Saving...' : '💾 Save Changes'}
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
  title: { color: 'var(--text)', margin: '0 0 1.5rem', fontSize: '1.6rem' },
  error: {
    backgroundColor: 'rgba(214, 69, 94, 0.12)',
    border: '1px solid var(--danger)',
    color: 'var(--danger)',
    padding: '0.75rem',
    borderRadius: '8px',
    marginBottom: '1rem',
  },
  form: { display: 'flex', flexDirection: 'column', gap: '0.75rem' },
  row: { display: 'flex', gap: '1rem', flexWrap: 'wrap' },
  field: { flex: '1 1 200px', display: 'flex', flexDirection: 'column', gap: '0.3rem' },
  label: { color: 'var(--muted)', fontSize: '0.85rem', marginTop: '0.25rem' },
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
  btnRow: { display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: '0.5rem' },
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

export default EditJobPage;
