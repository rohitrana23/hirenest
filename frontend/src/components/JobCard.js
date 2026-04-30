// src/components/JobCard.js — Reusable card shown in job listings

import React from 'react';
import { Link } from 'react-router-dom';

const JobCard = ({ job }) => {
  return (
    <div
      style={styles.card}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-5px)';
        e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.9)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.6)';
      }}
    >
      <div style={styles.header}>
        <h3 style={styles.title}>{job.title}</h3>
        <span style={styles.company}>{job.company}</span>
      </div>

      <div style={styles.meta}>
        <span style={styles.tag}>{job.location}</span>
        <span style={styles.tag}>{job.salary || 'Not disclosed'}</span>
      </div>

      {job.keywords && job.keywords.length > 0 && (
        <div style={styles.keywords}>
          {job.keywords.slice(0, 4).map((kw, i) => (
            <span key={i} style={styles.keyword}>{kw}</span>
          ))}
        </div>
      )}

      <p style={styles.description}>
        {job.description.substring(0, 120)}
        {job.description.length > 120 ? '...' : ''}
      </p>

      <div style={styles.footer}>
        <span style={styles.postedBy}>
          Posted by {job.postedBy?.name || 'Recruiter'}
        </span>
        <Link to={`/jobs/${job._id}`} style={styles.viewBtn}>
          View Details →
        </Link>
      </div>
    </div>
  );
};

const styles = {
  card: {
    background: 'linear-gradient(145deg, #121212, #0d0d0d)',
    border: '1px solid rgba(255,255,255,0.06)',
    borderRadius: '14px',
    padding: '1.5rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
    transition: 'all 0.25s ease',
    cursor: 'default',
    boxShadow: '0 4px 20px rgba(0,0,0,0.6)',
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.2rem',
  },
  title: {
    margin: 0,
    color: '#ffffff',
    fontSize: '1.1rem',
    fontWeight: '700',
  },
  company: {
    color: 'var(--primary)',
    fontSize: '0.9rem',
    fontWeight: '600',
  },
  meta: {
    display: 'flex',
    gap: '0.75rem',
    flexWrap: 'wrap',
  },
  tag: {
    color: '#cfcfcf',
    fontSize: '0.85rem',
    backgroundColor: '#1a1a1a',
    padding: '0.25rem 0.6rem',
    borderRadius: '20px',
    border: '1px solid rgba(255,255,255,0.05)',
  },
  keywords: {
    display: 'flex',
    gap: '0.4rem',
    flexWrap: 'wrap',
  },
  keyword: {
    backgroundColor: '#161616',
    border: '1px solid rgba(255,255,255,0.08)',
    color: 'var(--primary)',
    fontSize: '0.78rem',
    padding: '0.2rem 0.5rem',
    borderRadius: '4px',
  },
  description: {
    color: '#b0b0b0',
    fontSize: '0.9rem',
    margin: 0,
    lineHeight: '1.5',
  },
  footer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '0.5rem',
  },
  postedBy: {
    color: '#888',
    fontSize: '0.8rem',
  },
  viewBtn: {
    backgroundColor: 'var(--primary)',
    color: '#fff',
    padding: '0.4rem 0.9rem',
    borderRadius: '6px',
    textDecoration: 'none',
    fontSize: '0.85rem',
    fontWeight: '600',
    boxShadow: '0 0 10px rgba(99,102,241,0.4)',
    transition: '0.2s',
  },
};

export default JobCard;