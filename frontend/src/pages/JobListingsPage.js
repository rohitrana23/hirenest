// src/pages/JobListingsPage.js

import React, { useState, useEffect, useCallback } from 'react';
import api from '../utils/api';
import JobCard from '../components/JobCard';

const JobListingsPage = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState({ title: '', location: '', keyword: '' });

  const fetchJobs = useCallback(async () => {
    setLoading(true);
    try {
      // Build query string from non-empty fields
      const params = {};
      if (search.title) params.title = search.title;
      if (search.location) params.location = search.location;
      if (search.keyword) params.keyword = search.keyword;

      const { data } = await api.get('/jobs', { params });
      setJobs(data);
    } catch (err) {
      console.error('Failed to load jobs', err);
    } finally {
      setLoading(false);
    }
  }, [search]);

  // Fetch on mount
  useEffect(() => {
    fetchJobs();
  }, []); // eslint-disable-line

  const handleSearch = (e) => {
    e.preventDefault();
    fetchJobs();
  };

  const handleClear = () => {
    setSearch({ title: '', location: '', keyword: '' });
    // Re-fetch with no filters
    api.get('/jobs').then(({ data }) => setJobs(data));
  };

  return (
    <div style={styles.page}>
      <div style={styles.heroSection}>
        <h1 style={styles.heroTitle}>Find Your Next Opportunity</h1>
        <p style={styles.heroSub}>Search through hundreds of live job listings</p>

        {/* ─── Search Form ─────────────────────────────────────────────── */}
        <form onSubmit={handleSearch} style={styles.searchForm}>
          <input
            placeholder="Job title (e.g. Frontend Developer)"
            value={search.title}
            onChange={(e) => setSearch({ ...search, title: e.target.value })}
            style={styles.searchInput}
          />
          <input
            placeholder="Location (e.g. Bangalore)"
            value={search.location}
            onChange={(e) => setSearch({ ...search, location: e.target.value })}
            style={styles.searchInput}
          />
          <input
            placeholder="Keyword (e.g. React, Python)"
            value={search.keyword}
            onChange={(e) => setSearch({ ...search, keyword: e.target.value })}
            style={styles.searchInput}
          />
          <button type="submit" style={styles.searchBtn}>Search</button>
          <button type="button" onClick={handleClear} style={styles.clearBtn}>Clear</button>
        </form>
      </div>

      {/* ─── Results ─────────────────────────────────────────────────── */}
      <div style={styles.resultsSection}>
        <p style={styles.count}>
          {loading ? 'Loading...' : `${jobs.length} job${jobs.length !== 1 ? 's' : ''} found`}
        </p>

        {!loading && jobs.length === 0 && (
          <div style={styles.empty}>
            <p>No jobs match your search. Try different keywords.</p>
          </div>
        )}

        <div style={styles.grid}>
          {jobs.map((job) => (
            <JobCard key={job._id} job={job} />
          ))}
        </div>
      </div>
    </div>
  );
};

const styles = {
  page: {
    minHeight: '100vh',
    backgroundColor: 'var(--bg)',
    color: 'var(--text)',
  },
  heroSection: {
    backgroundColor: 'var(--surface)',
    padding: '3rem 2rem',
    textAlign: 'center',
    borderBottom: '1px solid var(--border)',
  },
  heroTitle: {
    fontSize: '2.2rem',
    margin: '0 0 0.5rem',
    color: 'var(--text)',
  },
  heroSub: {
    color: 'var(--muted)',
    marginBottom: '2rem',
  },
  searchForm: {
    display: 'flex',
    gap: '0.75rem',
    maxWidth: '900px',
    margin: '0 auto',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  searchInput: {
    flex: '1 1 200px',
    backgroundColor: 'var(--bg)',
    border: '1px solid var(--border)',
    borderRadius: '8px',
    padding: '0.75rem 1rem',
    color: 'var(--text)',
    fontSize: '0.95rem',
    outline: 'none',
  },
  searchBtn: {
    backgroundColor: 'var(--primary)',
    color: 'var(--text)',
    border: 'none',
    padding: '0.75rem 1.5rem',
    borderRadius: '8px',
    fontSize: '0.95rem',
    fontWeight: '700',
    cursor: 'pointer',
  },
  clearBtn: {
    backgroundColor: 'transparent',
    color: 'var(--muted)',
    border: '1px solid var(--border)',
    padding: '0.75rem 1rem',
    borderRadius: '8px',
    fontSize: '0.95rem',
    cursor: 'pointer',
  },
  resultsSection: {
    maxWidth: '1100px',
    margin: '0 auto',
    padding: '2rem 1.5rem',
  },
  count: {
    color: 'var(--muted)',
    marginBottom: '1.5rem',
    fontSize: '0.9rem',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
    gap: '1.5rem',
  },
  empty: {
    textAlign: 'center',
    padding: '3rem',
    color: 'var(--muted)',
  },
};

export default JobListingsPage;
