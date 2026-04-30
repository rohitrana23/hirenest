import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        <div style={styles.brandColumn}>
          <div style={styles.brand}>HireNest</div>
          <p style={styles.description}>
            A polished platform for matching talent with the right opportunity.
          </p>
        </div>

        <div style={styles.linkColumns}>
          <div style={styles.linkColumn}>
            <h4 style={styles.heading}>Company</h4>
            <Link to="/about" style={styles.link}>About Us</Link>
            <Link to="/contact" style={styles.link}>Contact Us</Link>
          </div>
          <div style={styles.linkColumn}>
            <h4 style={styles.heading}>Explore</h4>
            <Link to="/jobs" style={styles.link}>Browse Jobs</Link>
            <Link to="/dashboard" style={styles.link}>Dashboard</Link>
          </div>
        </div>
      </div>
      <div style={styles.bottom}>
        © {new Date().getFullYear()} HireNest. All rights reserved.
      </div>
    </footer>
  );
};

const styles = {
  footer: {
    backgroundColor: 'var(--surface)',
    borderTop: '1px solid var(--border)',
    color: 'var(--text)',
    padding: '2rem 1.5rem 1rem',
    marginTop: '2rem',
  },
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '2rem',
    flexWrap: 'wrap',
    maxWidth: '1100px',
    margin: '0 auto',
  },
  brandColumn: {
    minWidth: '240px',
  },
  brand: {
    fontSize: '1.4rem',
    fontWeight: '700',
    color: 'var(--primary)',
    marginBottom: '0.75rem',
  },
  description: {
    color: 'var(--muted)',
    lineHeight: '1.8',
    maxWidth: '320px',
  },
  linkColumns: {
    display: 'flex',
    gap: '3rem',
    flexWrap: 'wrap',
  },
  linkColumn: {
    minWidth: '140px',
  },
  heading: {
    color: 'var(--text)',
    fontSize: '0.95rem',
    marginBottom: '0.9rem',
  },
  link: {
    display: 'block',
    color: 'var(--muted)',
    marginBottom: '0.6rem',
    textDecoration: 'none',
    transition: 'color 0.2s ease',
  },
  bottom: {
    marginTop: '1.5rem',
    color: 'var(--muted)',
    textAlign: 'center',
    fontSize: '0.9rem',
  },
};

export default Footer;
