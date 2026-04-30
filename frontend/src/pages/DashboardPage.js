// src/pages/DashboardPage.js
// Shows different content based on the user's role

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';
import { useAuth } from '../context/AuthContext';

const DashboardPage = () => {
  const { userInfo } = useAuth();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (userInfo.role === 'recruiter') {
          const { data } = await api.get('/jobs/my/listings');
          setItems(data);
        } else {
          const { data } = await api.get('/jobs/my/applications');
          setItems(data);
        }
      } catch (err) {
        setError('Failed to load data');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [userInfo.role]);

  const handleDelete = async (jobId) => {
    if (!window.confirm('Are you sure you want to delete this job?')) return;
    try {
      await api.delete(`/jobs/${jobId}`);
      setItems(items.filter((j) => j._id !== jobId));
    } catch (err) {
      alert('Failed to delete job');
    }
  };

  const handleHover = (e, enter) => {
    if (enter) {
      e.currentTarget.style.transform = 'translateY(-5px)';
      e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.9)';
    } else {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = 'var(--card-shadow)';
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>
            {userInfo.role === 'recruiter' ? 'Recruiter Dashboard' : 'My Dashboard'}
          </h1>
          <p style={styles.subtitle}>
            Welcome back, <strong>{userInfo.name}</strong>!
            {userInfo.role === 'recruiter'
              ? ' Manage your job listings below.'
              : ' Track your applications below.'}
          </p>
        </div>

        {userInfo.role === 'recruiter' && (
          <Link to="/post-job" style={styles.postBtn}>
            + Post New Job
          </Link>
        )}
      </div>

      {loading && <p style={styles.info}>Loading...</p>}
      {error && <p style={styles.errorText}>{error}</p>}

      {!loading && items.length === 0 && (
        <div style={styles.empty}>
          {userInfo.role === 'recruiter' ? (
            <>
              <p>You haven't posted any jobs yet.</p>
              <Link to="/post-job" style={styles.postBtn}>
                Post your first job →
              </Link>
            </>
          ) : (
            <>
              <p>You haven't applied to any jobs yet.</p>
              <Link to="/jobs" style={styles.postBtn}>
                Browse jobs →
              </Link>
            </>
          )}
        </div>
      )}

      <div style={styles.grid}>
        {userInfo.role === 'recruiter'
          ? items.map((job) => (
              <div
                key={job._id}
                style={styles.card}
                onMouseEnter={(e) => handleHover(e, true)}
                onMouseLeave={(e) => handleHover(e, false)}
              >
                <h3 style={styles.jobTitle}>{job.title}</h3>
                <p style={styles.company}>{job.company}</p>

                <div style={styles.meta}>
                  <span style={styles.tag}>{job.location}</span>
                  <span style={styles.tag}>
                    {job.salary || 'Not disclosed'}
                  </span>
                </div>

                <p style={styles.desc}>
                  {job.description.substring(0, 100)}...
                </p>

                <div style={styles.actions}>
                  <Link to={`/edit-job/${job._id}`} style={styles.editBtn}>
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(job._id)}
                    style={styles.deleteBtn}
                  >
                    Delete
                  </button>
                  <Link to={`/jobs/${job._id}`} style={styles.viewBtn}>
                    View
                  </Link>
                </div>
              </div>
            ))
          : items.map((app) => (
              <div
                key={app._id}
                style={styles.card}
                onMouseEnter={(e) => handleHover(e, true)}
                onMouseLeave={(e) => handleHover(e, false)}
              >
                <h3 style={styles.jobTitle}>
                  {app.jobId?.title || 'Job removed'}
                </h3>
                <p style={styles.company}>{app.jobId?.company}</p>

                <div style={styles.meta}>
                  <span style={styles.tag}>{app.jobId?.location}</span>
                  <span
                    style={{
                      ...styles.statusBadge,
                      backgroundColor: statusColor(app.status),
                    }}
                  >
                    {app.status}
                  </span>
                </div>

                <p style={styles.desc}>
                  Applied on{' '}
                  {new Date(app.createdAt).toLocaleDateString()}
                </p>

                {app.jobId && (
                  <Link
                    to={`/jobs/${app.jobId._id}`}
                    style={styles.viewBtn}
                  >
                    View Job
                  </Link>
                )}
              </div>
            ))}
      </div>
    </div>
  );
};

const statusColor = (status) => {
  const map = {
    applied: 'var(--primary)',
    reviewed: '#7a5c00',
    accepted: '#1a4a1a',
    rejected: 'rgba(214, 69, 94, 0.16)',
  };
  return map[status] || 'var(--tag-bg)';
};

const styles = {
  page: {
    maxWidth: '1100px',
    margin: '0 auto',
    padding: '2rem 1.5rem',
    minHeight: '100vh',
    backgroundColor: 'var(--bg)',
    color: 'var(--text)',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    gap: '1rem',
    marginBottom: '2rem',
  },
  title: {
    margin: 0,
    fontSize: '1.8rem',
    color: 'var(--text)',
  },
  subtitle: {
    color: 'var(--muted)',
    marginTop: '0.25rem',
  },
  postBtn: {
    backgroundColor: 'var(--primary)',
    color: '#fff',
    padding: '0.6rem 1.2rem',
    borderRadius: '8px',
    textDecoration: 'none',
    fontWeight: '700',
    fontSize: '0.95rem',
    boxShadow: '0 0 10px rgba(99,102,241,0.4)',
  },
  info: { color: 'var(--muted)' },
  errorText: { color: 'var(--danger)' },
  empty: {
    textAlign: 'center',
    padding: '3rem',
    color: 'var(--muted)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '1rem',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '1.5rem',
  },
  card: {
    background: 'var(--card-bg)',
    border: '1px solid var(--card-border)',
    borderRadius: '14px',
    padding: '1.5rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.6rem',
    transition: 'all 0.25s ease',
    boxShadow: 'var(--card-shadow)',
  },
  jobTitle: {
    margin: 0,
    color: 'var(--text-primary)',
    fontSize: '1.05rem',
  },
  company: {
    color: 'var(--primary)',
    margin: 0,
    fontSize: '0.9rem',
  },
  meta: {
    display: 'flex',
    gap: '0.75rem',
    flexWrap: 'wrap',
  },
  tag: {
    color: 'var(--text-secondary)',
    fontSize: '0.85rem',
    backgroundColor: 'var(--tag-bg)',
    padding: '0.25rem 0.6rem',
    borderRadius: '20px',
    border: '1px solid var(--tag-border)',
  },
  desc: {
    color: 'var(--text-secondary)',
    fontSize: '0.88rem',
    margin: 0,
  },
  actions: {
    display: 'flex',
    gap: '0.5rem',
    marginTop: '0.5rem',
    flexWrap: 'wrap',
  },
  editBtn: {
    backgroundColor: 'var(--tag-bg)',
    color: 'var(--text-primary)',
    padding: '0.4rem 0.75rem',
    borderRadius: '6px',
    textDecoration: 'none',
    fontSize: '0.85rem',
    border: '1px solid var(--tag-border)',
  },
  deleteBtn: {
    backgroundColor: 'transparent',
    color: 'var(--danger)',
    border: '1px solid var(--danger)',
    padding: '0.4rem 0.75rem',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '0.85rem',
  },
  viewBtn: {
    backgroundColor: 'var(--primary)',
    color: '#fff',
    padding: '0.4rem 0.75rem',
    borderRadius: '6px',
    textDecoration: 'none',
    fontSize: '0.85rem',
    marginLeft: 'auto',
    boxShadow: '0 0 10px rgba(99,102,241,0.4)',
  },
  statusBadge: {
    color: '#fff',
    padding: '0.2rem 0.6rem',
    borderRadius: '20px',
    fontSize: '0.8rem',
    fontWeight: '600',
    textTransform: 'capitalize',
  },
};

export default DashboardPage;