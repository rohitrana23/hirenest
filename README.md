# HireNest — Full-Stack Job Portal

A complete job search portal built with React, Node.js, Express, and MongoDB.  
Supports two roles: **Job Seekers** and **Recruiters**, with JWT authentication throughout.

---

## Folder Structure

```
hirenest/
├── backend/
│   ├── config/
│   │   └── db.js              ← MongoDB connection
│   ├── controllers/
│   │   ├── authController.js  ← Register & Login logic
│   │   └── jobController.js   ← All job CRUD + apply logic
│   ├── middleware/
│   │   └── authMiddleware.js  ← JWT verify + role guard
│   ├── models/
│   │   ├── User.js            ← User schema (bcrypt hashing built-in)
│   │   ├── Job.js             ← Job schema
│   │   └── Application.js     ← Application schema
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── jobRoutes.js
│   ├── .env.example           ← Copy to .env and fill in
│   ├── package.json
│   └── server.js              ← Entry point
│
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.js        ← Navigation bar
│   │   │   ├── JobCard.js       ← Reusable job card
│   │   │   └── ProtectedRoute.js ← Route guard component
│   │   ├── context/
│   │   │   └── AuthContext.js   ← Global auth state (React Context)
│   │   ├── pages/
│   │   │   ├── HomePage.js      ← Landing page
│   │   │   ├── LoginPage.js
│   │   │   ├── RegisterPage.js
│   │   │   ├── DashboardPage.js ← Role-based dashboard
│   │   │   ├── JobListingsPage.js ← Browse + search jobs
│   │   │   ├── JobDetailPage.js ← Job detail + apply
│   │   │   ├── PostJobPage.js   ← Recruiter: post job
│   │   │   └── EditJobPage.js   ← Recruiter: edit job
│   │   ├── utils/
│   │   │   └── api.js           ← Axios instance with auto-auth header
│   │   ├── App.js               ← Routes + AuthProvider
│   │   └── index.js             ← React entry point
│   └── package.json
│
└── HireNest.postman_collection.json
```

---

## Setup Instructions

### Prerequisites

Make sure you have these installed:
- [Node.js](https://nodejs.org/) (v16 or higher)
- [MongoDB](https://www.mongodb.com/try/download/community) (local) **OR** a free [MongoDB Atlas](https://www.mongodb.com/atlas) cluster
- npm (comes with Node.js)

---

### Step 1 — Clone / Set up the project

Place the `hirenest` folder wherever you like.

---

### Step 2 — Set up the Backend

```bash
cd hirenest/backend

# Install dependencies
npm install

# Create your environment file
cp .env.example .env
```

Now open `backend/.env` and fill in:

```env
MONGO_URI=mongodb://localhost:27017/hirenest   # or your Atlas URI
JWT_SECRET=some_long_random_secret_here
PORT=5000
```

**MongoDB Atlas URI looks like:**  
`mongodb+srv://username:password@cluster.mongodb.net/hirenest`

Start the backend:
```bash
# Development mode (auto-restarts on changes)
npm run dev

# OR production mode
npm start
```

You should see:
```
Server running on port 5000
MongoDB connected: localhost
```

---

### Step 3 — Set up the Frontend

```bash
cd hirenest/frontend

# Install dependencies
npm install

# Start the React dev server
npm start
```

The app opens at **http://localhost:3000**

> The `"proxy": "http://localhost:5000"` in frontend/package.json forwards all `/api` calls to the backend — no CORS issues during development.

---

### Step 4 — Test with Postman (optional)

1. Open Postman
2. Click **Import** → select `HireNest.postman_collection.json`
3. Register a recruiter → copy the `token` from the response
4. Set the `token` collection variable to that value
5. Now you can test all protected routes

---

## Key Concepts Explained

### How Authentication Works

```
User logs in → backend verifies password → returns JWT token
Frontend stores token in localStorage
Every API request includes: Authorization: Bearer <token>
Backend middleware verifies token → attaches user to req.user
```

### How Role-Based Access Works

```
protect middleware     → checks JWT is valid
recruiterOnly middleware → checks req.user.role === 'recruiter'

Routes stack these:
router.post('/jobs', protect, recruiterOnly, createJob)
              ↑           ↑            ↑
         any login    recruiter     controller
```

### How Password Hashing Works

```
User sets password "mypassword"
→ bcrypt.hash("mypassword", 10) runs in User model pre-save hook
→ Stored in DB as: "$2b$10$..."

Login check:
→ bcrypt.compare("mypassword", storedHash) → true/false
→ Plain text password is NEVER stored
```

---

## API Reference

| Method | Endpoint | Auth | Role | Description |
|--------|----------|------|------|-------------|
| POST | /api/auth/register | No | Any | Register new user |
| POST | /api/auth/login | No | Any | Login, get token |
| GET | /api/jobs | No | Any | Get all jobs (+ search) |
| GET | /api/jobs/:id | No | Any | Get single job |
| POST | /api/jobs | Yes | Recruiter | Post new job |
| PUT | /api/jobs/:id | Yes | Recruiter | Edit job |
| DELETE | /api/jobs/:id | Yes | Recruiter | Delete job |
| GET | /api/jobs/my/listings | Yes | Recruiter | My posted jobs |
| POST | /api/jobs/:id/apply | Yes | Seeker | Apply to job |
| GET | /api/jobs/my/applications | Yes | Seeker | My applications |

### Search Query Parameters
`GET /api/jobs?title=react&location=bangalore&keyword=node`

---

## Deployment Tips

**Backend** → Deploy to [Railway](https://railway.app), [Render](https://render.com), or [Heroku](https://heroku.com)  
Set environment variables in their dashboard instead of `.env`

**Frontend** → Run `npm run build` then deploy to [Vercel](https://vercel.com) or [Netlify](https://netlify.com)  
Update `api.js` baseURL to your deployed backend URL.

**MongoDB** → Use [MongoDB Atlas](https://www.mongodb.com/atlas) (free tier available)

---

## Security Notes for Production

1. Use a **long, random JWT_SECRET** (e.g. generated with `openssl rand -base64 64`)
2. Set JWT expiry shorter in production (e.g. `1d` instead of `7d`)
3. Add rate limiting: `npm install express-rate-limit`
4. Add input sanitization: `npm install express-mongo-sanitize`
5. Enable HTTPS on your server
6. Tighten CORS: replace `app.use(cors())` with specific origins

---

## 📦 Tech Stack Summary

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, React Router v6, Axios |
| Backend | Node.js, Express.js |
| Database | MongoDB, Mongoose |
| Auth | JWT (jsonwebtoken), bcryptjs |
| Dev | nodemon |
