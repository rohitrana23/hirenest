import React from 'react';

const AboutPage = () => {
  return (
    <div style={styles.page}>
      <section style={styles.hero}>
        <div style={styles.content}>
          <h1 style={styles.title}>About HireNest</h1>
          <p style={styles.text}>
            HireNest is built to bring hiring teams and qualified talent together with a clean,
            professional experience. We focus on meaningful job connections, fast applications,
            and a reliable experience for both candidates and recruiters.
          </p>
        </div>
      </section>

      <section style={styles.mission}>
        <div style={styles.card}>
          <h2 style={styles.cardTitle}>Our Mission</h2>
          <p style={styles.cardText}>
            We simplify hiring by creating clear, modern job listings and streamlined candidate
            workflows, backed by a design-first experience.
          </p>
        </div>
        <div style={styles.card}>
          <h2 style={styles.cardTitle}>Our Values</h2>
          <p style={styles.cardText}>
            Transparency, professionalism, and trust are at the center of every feature and interaction.
            We want hiring to feel efficient, not overwhelming.
          </p>
        </div>
      </section>
    </div>
  );
};

const styles = {
  page: {
    minHeight: '100vh',
    backgroundColor: 'var(--bg)',
    color: 'var(--text)',
    padding: '3rem 1.5rem',
  },
  hero: {
    maxWidth: '900px',
    margin: '0 auto 2rem',
    padding: '2.5rem',
    backgroundColor: 'var(--surface)',
    border: '1px solid var(--border)',
    borderRadius: '20px',
  },
  content: {
    display: 'grid',
    gap: '1.5rem',
  },
  title: {
    margin: 0,
    fontSize: '2.6rem',
    lineHeight: '1.05',
  },
  text: {
    margin: 0,
    color: 'var(--muted)',
    fontSize: '1rem',
    lineHeight: '1.8',
  },
  mission: {
    display: 'grid',
    gap: '1.5rem',
    maxWidth: '900px',
    margin: '0 auto',
    gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
  },
  card: {
    backgroundColor: 'var(--surface)',
    border: '1px solid var(--border)',
    borderRadius: '18px',
    padding: '1.75rem',
  },
  cardTitle: {
    margin: '0 0 0.75rem',
    color: 'var(--text)',
    fontSize: '1.25rem',
  },
  cardText: {
    margin: 0,
    color: 'var(--muted)',
    lineHeight: '1.75',
  },
};

export default AboutPage;
