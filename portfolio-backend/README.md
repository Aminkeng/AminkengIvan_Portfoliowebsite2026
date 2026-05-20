# BigJones Portfolio — Backend API

A production-ready Node.js/Express REST API backend for the [bigjonesportfolio_44](https://github.com/Aminkeng/bigjonesportfolio_44) React + Vite frontend.

---

## Features

| Feature | Details |
|---|---|
| **Projects API** | CRUD – list, get, create, update, delete portfolio projects |
| **Contact Form** | Validated submissions stored in DB + email notifications (SMTP) |
| **Admin Auth** | JWT-based login for a single admin account |
| **Admin Dashboard** | Stats endpoint: project counts, unread messages |
| **Rate Limiting** | General API limiter + strict limits on contact form & login |
| **Security** | Helmet, CORS whitelist, input validation, bcrypt passwords |
| **Logging** | Winston logger (coloured dev / JSON prod) |
| **Error handling** | Centralised handler for Mongoose, JWT, and custom errors |
| **Tests** | Jest + Supertest |
| **Graceful shutdown** | SIGTERM / unhandledRejection handlers |

---

## Tech Stack

- **Runtime**: Node.js ≥ 18
- **Framework**: Express 4
- **Database**: MongoDB (Mongoose)
- **Auth**: JSON Web Tokens (jsonwebtoken)
- **Email**: Nodemailer (SMTP)
- **Validation**: express-validator
- **Security**: helmet, cors, bcryptjs, express-rate-limit
- **Logging**: Winston, Morgan

---

## Quick Start

### 1. Clone & install

```bash
git clone https://github.com/Aminkeng/bigjonesportfolio_44.git
cd bigjonesportfolio_44

# Copy the backend folder to a separate directory (or keep it here)
cd portfolio-backend
npm install
```

### 2. Configure environment

```bash
cp .env.example .env
```

Edit `.env` with your values:

| Variable | Description |
|---|---|
| `MONGO_URI` | MongoDB connection string |
| `JWT_SECRET` | Long random string (≥ 32 chars) |
| `ADMIN_EMAIL` | Your admin login email |
| `ADMIN_PASSWORD` | Your admin login password |
| `ALLOWED_ORIGINS` | Comma-separated frontend URLs |
| `SMTP_*` | Email provider credentials |
| `CONTACT_RECIPIENT` | Where contact emails are sent |

### 3. Seed the database

```bash
node src/scripts/seed.js
```

This creates the admin account and three sample projects.

### 4. Run

```bash
# Development (auto-reload)
npm run dev

# Production
npm start
```

Server starts on `http://localhost:5000`.

---

## API Reference

### Public Endpoints

| Method | URL | Description |
|---|---|---|
| `GET` | `/health` | Health check |
| `GET` | `/api/projects` | List published projects |
| `GET` | `/api/projects/:id` | Get single project |
| `POST` | `/api/contact` | Submit contact form |

**Query params for `GET /api/projects`:**
- `category` – filter by `web`, `mobile`, `design`, `other`
- `featured` – `true` / `false`
- `page` – page number (default `1`)
- `limit` – results per page (default `20`)

**Contact form body:**
```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "subject": "Hello",
  "message": "I'd love to work together!"
}
```

### Auth Endpoints

| Method | URL | Description |
|---|---|---|
| `POST` | `/api/auth/login` | Admin login → returns JWT |
| `GET` | `/api/auth/me` | 🔒 Get current admin |
| `PUT` | `/api/auth/change-password` | 🔒 Change admin password |

**Login body:**
```json
{ "email": "admin@example.com", "password": "yourpassword" }
```

All 🔒 routes require `Authorization: Bearer <token>`.

### Admin Endpoints (🔒 all protected)

| Method | URL | Description |
|---|---|---|
| `GET` | `/api/admin/dashboard` | Stats overview |
| `GET` | `/api/admin/projects` | All projects (incl. unpublished) |
| `POST` | `/api/admin/projects` | Create project |
| `PUT` | `/api/admin/projects/:id` | Update project |
| `DELETE` | `/api/admin/projects/:id` | Delete project |
| `GET` | `/api/admin/contacts` | List contact submissions |
| `GET` | `/api/admin/contacts/:id` | Get + auto-mark-read |
| `PATCH` | `/api/admin/contacts/:id/status` | Update status |
| `DELETE` | `/api/admin/contacts/:id` | Delete contact |

---

## Connecting to the React Frontend

In your Vite frontend, create a `.env` file:

```
VITE_API_URL=http://localhost:5000/api
```

Then use it in your fetch calls:

```js
// src/api.js
const BASE = import.meta.env.VITE_API_URL;

export const fetchProjects = () =>
  fetch(`${BASE}/projects`).then(r => r.json());

export const submitContact = (data) =>
  fetch(`${BASE}/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }).then(r => r.json());
```

---

## Deployment

### Environment variables for production

- Set `NODE_ENV=production`
- Use a strong `JWT_SECRET` (generate with `openssl rand -hex 64`)
- Use a MongoDB Atlas URI for `MONGO_URI`
- Add your live domain to `ALLOWED_ORIGINS`

### Popular platforms

- **Railway** / **Render**: push repo, set env vars in dashboard
- **Heroku**: `git push heroku main`
- **VPS**: use PM2 (`pm2 start src/server.js --name portfolio-api`)

---

## Running Tests

```bash
npm test
# With coverage
npm test -- --coverage
```

---

## Project Structure

```
portfolio-backend/
├── src/
│   ├── config/
│   │   └── db.js              # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── contactController.js
│   │   └── projectController.js
│   ├── middleware/
│   │   ├── auth.js            # JWT protect middleware
│   │   ├── errorHandler.js    # Global error handler
│   │   └── rateLimiter.js     # Rate limiting configs
│   ├── models/
│   │   ├── Admin.js
│   │   ├── Contact.js
│   │   └── Project.js
│   ├── routes/
│   │   ├── admin.js
│   │   ├── auth.js
│   │   ├── contact.js
│   │   └── projects.js
│   ├── scripts/
│   │   └── seed.js            # Initial DB seed
│   ├── utils/
│   │   ├── email.js           # Nodemailer helpers
│   │   └── logger.js          # Winston logger
│   └── server.js              # App entry point
├── tests/
│   └── api.test.js
├── .env.example
├── .gitignore
└── package.json
```

---

## License

MIT
