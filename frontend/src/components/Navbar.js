// src/components/Navbar.js

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

const Navbar = () => {
  const { userInfo, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar" style={styles.nav}>
      <Link to="/" className="navbar-brand" style={styles.brand}>
        HireNest
      </Link>

      <div style={styles.links}>
        <Link to="/jobs" className="navbar-link" style={styles.link}>Browse Jobs</Link>

        {userInfo ? (
          <>
            <Link to="/dashboard" className="navbar-link" style={styles.link}>Dashboard</Link>
            {userInfo.role === 'recruiter' && (
              <Link to="/post-job" className="navbar-link" style={styles.link}>Post a Job</Link>
            )}
            <span style={styles.userName}>Hi, {userInfo.name.split(' ')[0]}</span>
            <button onClick={handleLogout} className="navbar-action" style={styles.logoutBtn}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="navbar-link" style={styles.link}>Login</Link>
            <Link to="/register" className="navbar-cta" style={styles.signupBtn}>Sign Up</Link>
          </>
        )}

        {/* <button onClick={toggleTheme} className="navbar-theme-toggle" style={styles.themeBtn}>
          {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
        </button> */}
      </div>
    </nav>
  );
};

const styles = {
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 2rem',
    height: '72px',
    backgroundColor: 'rgba(11, 15, 32, 0.94)',
    borderBottom: '1px solid rgba(255,255,255,0.08)',
    boxShadow: '0 24px 60px rgba(0, 0, 0, 0.20)',
    backdropFilter: 'blur(16px)',
    position: 'sticky',
    top: 0,
    zIndex: 100,
  },
  brand: {
    color: 'var(--primary)',
    fontSize: '1.55rem',
    fontWeight: '700',
    textDecoration: 'none',
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
  },
  links: {
    display: 'flex',
    alignItems: 'center',
    gap: '1.25rem',
    flexWrap: 'wrap',
  },
  link: {
    color: 'var(--text)',
    textDecoration: 'none',
    fontSize: '0.95rem',
    transition: 'color 0.2s ease, background-color 0.2s ease',
    padding: '0.35rem 0.55rem',
    borderRadius: '999px',
  },
  signupBtn: {
    backgroundColor: 'var(--primary)',
    color: 'var(--text)',
    padding: '0.45rem 1.05rem',
    borderRadius: '999px',
    textDecoration: 'none',
    fontSize: '0.9rem',
    fontWeight: '600',
    boxShadow: '0 20px 35px rgba(45, 108, 223, 0.18)',
  },
  logoutBtn: {
    backgroundColor: 'rgba(45, 108, 223, 0.08)',
    border: '1px solid rgba(45, 108, 223, 0.24)',
    color: 'var(--primary)',
    padding: '0.45rem 0.9rem',
    borderRadius: '999px',
    cursor: 'pointer',
    fontSize: '0.9rem',
  },
  themeBtn: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid rgba(255, 255, 255, 0.12)',
    color: 'var(--text)',
    padding: '0.45rem 0.9rem',
    borderRadius: '999px',
    cursor: 'pointer',
    fontSize: '0.9rem',
  },
  userName: {
    color: 'var(--muted)',
    fontSize: '0.9rem',
  },
};

export default Navbar;
