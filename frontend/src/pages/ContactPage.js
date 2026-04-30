import React from 'react';

const ContactPage = () => {
  return (
    <div style={styles.page}>
      <section style={styles.hero}>
        <div style={styles.content}>
          <h1 style={styles.title}>Contact Us</h1>
          <p style={styles.text}>
            Have a question or want to talk about hiring? Reach out and our team will respond quickly.
          </p>
        </div>
      </section>

      <section style={styles.contactCards}>
        <div style={styles.card}>
          <h2 style={styles.cardTitle}>General Inquiries</h2>
          <p style={styles.cardText}>hello@hirenest.com</p>
        </div>
        <div style={styles.card}>
          <h2 style={styles.cardTitle}>Support</h2>
          <p style={styles.cardText}>support@hirenest.com</p>
        </div>
        <div style={styles.card}>
          <h2 style={styles.cardTitle}>Office</h2>
          <p style={styles.cardText}>Bangalore, India</p>
        </div>
      </section>

      <section style={styles.formSection}>
        <div style={styles.formCard}>
          <h2 style={styles.formTitle}>Send us a message</h2>
          <p style={styles.formText}>Fill in the details and we will get back to you within one business day.</p>
          <form style={styles.form}>
            <input type="text" placeholder="Your name" style={styles.input} />
            <input type="email" placeholder="Your email" style={styles.input} />
            <textarea placeholder="How can we help?" rows="5" style={styles.textarea} />
            <button type="submit" style={styles.button}>Send Message</button>
          </form>
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
  contactCards: {
    display: 'grid',
    gap: '1.3rem',
    maxWidth: '900px',
    margin: '0 auto 2rem',
    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
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
    fontSize: '1.15rem',
  },
  cardText: {
    margin: 0,
    color: 'var(--muted)',
    lineHeight: '1.75',
  },
  formSection: {
    maxWidth: '900px',
    margin: '0 auto',
  },
  formCard: {
    backgroundColor: 'var(--surface)',
    border: '1px solid var(--border)',
    borderRadius: '20px',
    padding: '2rem',
  },
  formTitle: {
    margin: 0,
    fontSize: '1.75rem',
    marginBottom: '0.5rem',
  },
  formText: {
    margin: 0,
    color: 'var(--muted)',
    marginBottom: '1.5rem',
  },
  form: {
    display: 'grid',
    gap: '1rem',
  },
  input: {
    width: '100%',
    backgroundColor: 'var(--bg)',
    border: '1px solid var(--border)',
    borderRadius: '12px',
    padding: '0.9rem 1rem',
    color: 'var(--text)',
    outline: 'none',
  },
  textarea: {
    width: '100%',
    backgroundColor: 'var(--bg)',
    border: '1px solid var(--border)',
    borderRadius: '12px',
    padding: '1rem',
    color: 'var(--text)',
    outline: 'none',
    resize: 'vertical',
  },
  button: {
    alignSelf: 'flex-start',
    backgroundColor: 'var(--primary)',
    color: 'var(--text)',
    border: 'none',
    borderRadius: '12px',
    padding: '0.95rem 1.5rem',
    fontWeight: '700',
    cursor: 'pointer',
  },
};

export default ContactPage;
