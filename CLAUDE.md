# Flowly — CLAUDE.md

## Project Overview

Flowly is a full-stack SaaS task management app (landing page + auth + dashboard). Monorepo with separate `frontend/` and `backend/` directories, intended for independent deployment.

## Tech Stack

### Frontend
- React 19 + React Router DOM 7 (BrowserRouter)
- Vite 8 + `@tailwindcss/vite` plugin (Tailwind v4, no PostCSS needed)
- JavaScript/JSX (no TypeScript despite types packages being present)
- ESLint 9 flat config

### Backend
- Node.js ES modules (`"type": "module"`) + Express 4
- MongoDB + Mongoose 7
- JWT (7-day expiry) + bcryptjs for auth
- dotenv for config

## Project Structure

```
flowly/
├── frontend/
│   ├── src/
│   │   ├── components/     # All UI components (landing sections + app)
│   │   ├── lib/
│   │   │   ├── api.js      # Centralized fetch wrapper — auto-injects JWT
│   │   │   └── supabase.js # Supabase client for Google OAuth
│   │   └── App.jsx         # Routing + session state
│   ├── vercel.json         # SPA rewrite (all routes → index.html)
│   └── .env                # VITE_API_URL, VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY
│
└── backend/
    ├── src/
    │   ├── config/db.js          # Mongoose connection
    │   ├── models/               # User.js, Task.js
    │   ├── controllers/          # authController.js, taskController.js
    │   ├── middleware/auth.js     # JWT verification — populates req.user
    │   ├── routes/               # authRoutes.js, taskRoutes.js
    │   └── index.js              # Express entry point
    └── .env                      # MONGODB_URI, JWT_SECRET, FRONTEND_URL, PORT
```

## Commands

### Frontend
```bash
cd frontend
npm run dev       # Dev server on localhost:5173
npm run build     # Production build
npm run lint      # ESLint check
npm run preview   # Preview production build
```

### Backend
```bash
cd backend
npm run dev       # Nodemon auto-restart
npm start         # Production (node src/index.js)
```

## Architecture & Key Patterns

### Authentication (dual system)
- **Google OAuth**: via Supabase (`supabase.auth.signInWithOAuth`)
- **Email/password**: custom Express API — bcrypt hash stored in MongoDB, JWT returned
- Both paths store `token` + `user` in `localStorage`
- `App.jsx` checks both on mount; shows spinner while loading to prevent auth flash

### Routing (3 routes)
- `/` — Public landing page
- `/login` — Auth page, redirects to `/dashboard` if already logged in
- `/dashboard` — Wrapped in `ProtectedRoute`, redirects to `/login` if no session

### API Layer
All HTTP calls go through `frontend/src/lib/api.js` — never use raw `fetch` elsewhere. It handles:
- Setting `Authorization: Bearer <token>` from localStorage
- Base URL from `VITE_API_URL`

### Data Isolation
Task routes use `router.use(authMiddleware)` (not per-route). All Mongoose queries filter by `user: req.user.userId` — users never see each other's tasks.

### Dark Mode
Tailwind `dark:` classes toggled by adding/removing `.dark` class on `<html>` element inside `Navbar.jsx`.

## Environment Variables

### Frontend `.env`
```
VITE_API_URL=http://localhost:3001
VITE_SUPABASE_URL=<supabase-project-url>
VITE_SUPABASE_ANON_KEY=<supabase-public-key>
```

### Backend `.env`
```
MONGODB_URI=mongodb+srv://...
JWT_SECRET=<random-secret>
FRONTEND_URL=http://localhost:5173
PORT=3001
```

## Deployment

- **Frontend** → Vercel (`vercel.json` already configured)
- **Backend** → Render or Railway
- **Database** → MongoDB Atlas
- **Auth** → Supabase project for Google OAuth

## Known Limitations / TODOs

- JWT stored in `localStorage` (XSS-vulnerable; consider httpOnly cookies for production)
- No token refresh — simply expires after 7 days
- No backend input validation (email format, password strength)
- No rate limiting on auth endpoints
- TypeScript is not configured despite `@types/react` being present
