// src/utils/api.js
// Central Axios instance — automatically attaches the JWT token to every request

import axios from 'axios';

const api = axios.create({
  baseURL: '/api', // Uses the proxy defined in package.json → http://localhost:5000/api
});

// ─── Request interceptor ──────────────────────────────────────────────────────
// Before every request, check localStorage for a token and attach it
api.interceptors.request.use(
  (config) => {
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      const { token } = JSON.parse(userInfo);
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
