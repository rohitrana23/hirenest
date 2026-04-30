// src/pages/HomePage.js — Public landing page

import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const HomePage = () => {
  const { userInfo } = useAuth();

  return (
    <div style={styles.page}>
      {/* ─── Hero ─────────────────────────────────────────────────────── */}
      <section style={styles.hero}>
        <div style={styles.heroContent}>
          <span style={styles.badge}>HireNest — Jobs Made Simple</span>
          <h1 style={styles.heroTitle}>
            Find the job that <span style={styles.accent}>fits your life</span>
          </h1>
          <p style={styles.heroDesc}>
            Thousands of roles across tech, design, marketing, and more. Apply directly. No middlemen.
          </p>
          <div style={styles.heroActions}>
            <Link to="/jobs" style={styles.primaryBtn}>Browse Jobs</Link>
            {!userInfo && (
              <Link to="/register" style={styles.secondaryBtn}>Get Started Free</Link>
            )}
            {userInfo && (
              <Link to="/dashboard" style={styles.secondaryBtn}>Go to Dashboard</Link>
            )}
          </div>
        </div>
      </section>

      {/* ─── Features ─────────────────────────────────────────────────── */}
      <section style={styles.features}>
        {[
          { icon: '', title: 'Smart Search', desc: 'Filter by title, location, or keywords to find exactly what you need.' },
          { icon: '', title: 'Easy Apply', desc: 'One-click applications with an optional cover letter.' },
          { icon: '', title: 'For Recruiters', desc: 'Post, edit, and manage your job listings from one clean dashboard.' },
        ].map((f) => (
          <div key={f.title} style={styles.featureCard}>
            <span style={styles.featureIcon}>{f.icon}</span>
            <h3 style={styles.featureTitle}>{f.title}</h3>
            <p style={styles.featureDesc}>{f.desc}</p>
          </div>
        ))}
      </section>

      {/* ─── CTA ──────────────────────────────────────────────────────── */}
      {!userInfo && (
        <section style={styles.cta}>
          <h2 style={styles.ctaTitle}>Ready to get started?</h2>
          <p style={styles.ctaDesc}>Join thousands of job seekers and recruiters on HireNest.</p>
          <div style={styles.ctaActions}>
            <Link to="/register" style={styles.primaryBtn}>Create Account</Link>
            <Link to="/login" style={styles.ghostBtn}>Log In</Link>
          </div>
        </section>
      )}
    </div>
  );
};

const styles = {
  page: {
    backgroundColor: 'var(--bg)',
    minHeight: '100vh',
    color: 'var(--text)',
  },
  hero: {
    padding: '6rem 2rem',
    textAlign: 'center',
    background: 'linear-gradient(135deg, var(--surface-alt) 0%, var(--surface) 50%, var(--surface-strong) 100%)',
    borderBottom: '1px solid var(--border)',
  },
  heroContent: {
    maxWidth: '700px',
    margin: '0 auto',
  },
  badge: {
    display: 'inline-block',
    backgroundColor: 'var(--surface)',
    color: 'var(--primary)',
    padding: '0.4rem 1rem',
    borderRadius: '20px',
    fontSize: '0.85rem',
    fontWeight: '600',
    marginBottom: '1.5rem',
    border: '1px solid var(--primary)',
  },
  heroTitle: {
    fontSize: 'clamp(2rem, 5vw, 3rem)',
    fontWeight: '800',
    margin: '0 0 1rem',
    lineHeight: '1.2',
    color: 'var(--text)',
  },
  accent: {
    color: 'var(--primary)',
  },
  heroDesc: {
    color: 'var(--muted)',
    fontSize: '1.1rem',
    lineHeight: '1.7',
    marginBottom: '2rem',
  },
  heroActions: {
    display: 'flex',
    gap: '1rem',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  primaryBtn: {
    backgroundColor: 'var(--primary)',
    color: 'var(--text)',
    padding: '0.85rem 2rem',
    borderRadius: '8px',
    textDecoration: 'none',
    fontWeight: '700',
    fontSize: '1rem',
  },
  secondaryBtn: {
    backgroundColor: 'transparent',
    color: 'var(--text)',
    border: '2px solid var(--text)',
    padding: '0.85rem 2rem',
    borderRadius: '8px',
    textDecoration: 'none',
    fontWeight: '700',
    fontSize: '1rem',
  },
  features: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
    gap: '2rem',
    padding: '4rem 2rem',
    maxWidth: '1000px',
    margin: '0 auto',
  },
  featureCard: {
    backgroundColor: 'var(--surface)',
    border: '1px solid var(--border)',
    borderRadius: '12px',
    padding: '2rem',
    textAlign: 'center',
  },
  featureIcon: { fontSize: '2.5rem', display: 'block', marginBottom: '1rem' },
  featureTitle: { color: 'var(--text)', margin: '0 0 0.75rem', fontSize: '1.1rem' },
  featureDesc: { color: 'var(--muted)', margin: 0, lineHeight: '1.6', fontSize: '0.9rem' },
  cta: {
    textAlign: 'center',
    padding: '4rem 2rem',
    backgroundColor: 'var(--surface)',
    borderTop: '1px solid var(--border)',
  },
  ctaTitle: { color: 'var(--text)', fontSize: '2rem', margin: '0 0 0.5rem' },
  ctaDesc: { color: 'var(--muted)', marginBottom: '2rem' },
  ctaActions: { display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' },
  ghostBtn: {
    backgroundColor: 'transparent',
    color: 'var(--primary)',
    border: '2px solid var(--primary)',
    padding: '0.85rem 2rem',
    borderRadius: '8px',
    textDecoration: 'none',
    fontWeight: '700',
    fontSize: '1rem',
  },
};

export default HomePage;
