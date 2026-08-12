# Project Guide — AminkengIvan Portfolio

## Architecture

Monorepo with two workspaces:

- **`Frontend/`** — Vite + React 18 (SPA). Builds to `Frontend/dist`.
- **`portfolio-backend/`** — Express 4 API (Mongoose, JWT auth, express-validator).
- **`api/index.js`** — Vercel serverless entry that delegates to `portfolio-backend/src/vercel.js`.

## Deployment (Vercel)

The app deploys as a **single Vercel project** from the repo root.

- `vercel.json` configures Vite as the framework, builds the frontend to `Frontend/dist`, and exposes the Express app as a serverless function at `/api/*`.
- All non-API routes fall back to `/index.html` (SPA client-side routing).
- The frontend calls the API at `import.meta.env.VITE_API_URL || '/api'`.

### Required Vercel Environment Variables

Set these in the Vercel project settings (Project → Settings → Environment Variables):

| Variable | Purpose |
|---|---|
| `MONGO_URI` | MongoDB connection string (Atlas recommended for serverless) |
| `JWT_SECRET` | Secret used to sign JWT auth tokens |
| `JWT_EXPIRES_IN` | Token lifetime (e.g. `7d`) |
| `ADMIN_EMAIL` | Default admin account email (created on first cold start) |
| `ADMIN_PASSWORD` | Default admin account password |
| `ADMIN_NAME` | Default admin display name (optional, defaults to `Admin`) |
| `ALLOWED_ORIGINS` | Comma-separated list of allowed CORS origins (e.g. `https://your-app.vercel.app`) |
| `NODE_ENV` | Set to `production` |

Email notifications (`nodemailer`) also require SMTP env vars — check `portfolio-backend/src/utils/email.js`.

## Local Development

```bash
# Install all workspaces
npm install

# Run frontend + backend concurrently
npm run dev

# Or individually
npm run dev --workspace frontend
npm run dev --workspace bigjonesportfolio-backend
```

The Vite dev server proxies `/api` to `http://127.0.0.1:5000` (see `Frontend/vite.config.js`).

## Verification Commands

```bash
npm run check   # lint + test + build
npm run lint    # eslint across workspaces
npm test        # backend jest tests
npm run build   # frontend vite build
```

## Key Conventions

- Backend response shape: `{ success: boolean, data?: any, message?: string, errors?: array }`
- Auth tokens contain `{ id, role }` where role is `admin` or `user`.
- `protect` middleware allows any authenticated user; `protectAdmin` requires admin role.
- MongoDB connection is cached on `globalThis` for serverless reuse.
- File-based logging is disabled on Vercel (read-only filesystem); console transport only.
- ObjectId validation is performed in controllers before DB queries to avoid CastError.
