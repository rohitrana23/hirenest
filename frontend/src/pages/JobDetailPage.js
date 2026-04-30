// src/pages/JobDetailPage.js

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { useAuth } from '../context/AuthContext';

const JobDetailPage = () => {
  const { id } = useParams(); // Job ID from the URL
  const { userInfo } = useAuth();
  const navigate = useNavigate();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);
  const [applied, setApplied] = useState(false);
  const [coverLetter, setCoverLetter] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const { data } = await api.get(`/jobs/${id}`);
        setJob(data);
      } catch (err) {
        setMessage('Job not found');
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [id]);

  const handleApply = async () => {
    if (!userInfo) {
      navigate('/login');
      return;
    }
    setApplying(true);
    try {
      await api.post(`/jobs/${id}/apply`, { coverLetter });
      setApplied(true);
      setMessage('Application submitted successfully!');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Failed to apply');
    } finally {
      setApplying(false);
    }
  };

  if (loading) return <div style={styles.center}><p style={{ color: 'var(--muted)' }}>Loading...</p></div>;
  if (!job) return <div style={styles.center}><p style={{ color: 'var(--danger)' }}>Job not found.</p></div>;

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        {/* ─── Job Header ───────────────────────────────────────────── */}
        <div style={styles.header}>
          <div>
            <h1 style={styles.title}>{job.title}</h1>
            <p style={styles.company}>{job.company}</p>
          </div>
          <div style={styles.tags}>
            <span style={styles.tag}>{job.location}</span>
            <span style={styles.tag}>{job.salary || 'Not disclosed'}</span>
            <span style={styles.tag}>
              {new Date(job.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>

        {/* ─── Keywords ─────────────────────────────────────────────── */}
        {job.keywords?.length > 0 && (
          <div style={styles.keywords}>
            {job.keywords.map((kw, i) => (
              <span key={i} style={styles.keyword}>{kw}</span>
            ))}
          </div>
        )}

        {/* ─── Description ──────────────────────────────────────────── */}
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Job Description</h2>
          <p style={styles.description}>{job.description}</p>
        </div>

        {/* ─── Recruiter info ───────────────────────────────────────── */}
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Posted By</h2>
          <p style={styles.description}>
            {job.postedBy?.name} ({job.postedBy?.email})
          </p>
        </div>

        {/* ─── Apply section (job seekers only) ─────────────────────── */}
        {message && (
          <div style={{
            ...styles.message,
            borderColor: applied ? '#27ae60' : 'var(--danger)',
            color: applied ? '#27ae60' : 'var(--danger)',
          }}>
            {message}
          </div>
        )}

        {userInfo?.role === 'seeker' && !applied && (
          <div style={styles.applySection}>
            <h2 style={styles.sectionTitle}>Apply for this Job</h2>
            <textarea
              placeholder="Optional: Write a short cover letter..."
              value={coverLetter}
              onChange={(e) => setCoverLetter(e.target.value)}
              rows={4}
              style={styles.textarea}
            />
            <button
              onClick={handleApply}
              style={styles.applyBtn}
              disabled={applying}
            >
              {applying ? 'Submitting...' : 'Apply Now'}
            </button>
          </div>
        )}

        {!userInfo && (
          <div style={styles.applySection}>
            <p style={{ color: 'var(--muted)' }}>
              <a href="/login" style={{ color: 'var(--primary)' }}>Log in</a> to apply for this job.
            </p>
          </div>
        )}

        {userInfo?.role === 'recruiter' && (
          <div style={styles.applySection}>
            <p style={{ color: 'var(--muted)' }}>You are viewing this as a recruiter.</p>
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  page: {
    minHeight: '100vh',
    backgroundColor: 'var(--bg)',
    padding: '2rem 1.5rem',
    color: 'var(--text)',
  },
  center: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: 'var(--bg)',
  },
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },
  header: {
    backgroundColor: 'var(--surface)',
    border: '1px solid var(--border)',
    borderRadius: '12px',
    padding: '2rem',
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: '1rem',
  },
  title: {
    margin: 0,
    fontSize: '1.8rem',
    color: 'var(--text)',
  },
  company: {
    color: 'var(--primary)',
    margin: '0.25rem 0 0',
    fontSize: '1.1rem',
    fontWeight: '600',
  },
  tags: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    alignItems: 'flex-end',
  },
  tag: {
    backgroundColor: 'var(--surface-alt)',
    color: 'var(--muted)',
    padding: '0.3rem 0.75rem',
    borderRadius: '20px',
    fontSize: '0.85rem',
  },
  keywords: {
    display: 'flex',
    gap: '0.5rem',
    flexWrap: 'wrap',
  },
  keyword: {
    backgroundColor: 'var(--surface)',
    border: '1px solid var(--border)',
    color: 'var(--primary)',
    fontSize: '0.85rem',
    padding: '0.3rem 0.7rem',
    borderRadius: '6px',
  },
  section: {
    backgroundColor: 'var(--surface)',
    border: '1px solid var(--border)',
    borderRadius: '12px',
    padding: '1.5rem',
  },
  sectionTitle: {
    margin: '0 0 1rem',
    color: 'var(--text)',
    fontSize: '1.1rem',
    borderBottom: '1px solid var(--border)',
    paddingBottom: '0.5rem',
  },
  description: {
    color: 'var(--muted)',
    lineHeight: '1.8',
    margin: 0,
    whiteSpace: 'pre-wrap',
  },
  applySection: {
    backgroundColor: 'var(--surface)',
    border: '1px solid var(--border)',
    borderRadius: '12px',
    padding: '1.5rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  textarea: {
    backgroundColor: 'var(--bg)',
    border: '1px solid var(--border)',
    borderRadius: '8px',
    padding: '0.75rem',
    color: 'var(--text)',
    fontSize: '0.95rem',
    resize: 'vertical',
    outline: 'none',
  },
  applyBtn: {
    backgroundColor: 'var(--primary)',
    color: 'var(--text)',
    border: 'none',
    padding: '0.85rem 2rem',
    borderRadius: '8px',
    fontSize: '1rem',
    fontWeight: '700',
    cursor: 'pointer',
    alignSelf: 'flex-start',
  },
  message: {
    border: '1px solid',
    padding: '0.75rem 1rem',
    borderRadius: '8px',
    fontSize: '0.95rem',
  },
};

export default JobDetailPage;
