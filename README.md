# 🚀 Developer Portfolio — Full Stack

A complete portfolio website with animated frontend (React + Vite + Tailwind) and a full Node.js/Express REST API backend with MongoDB.

---

## 📁 Project Structure

```
portfolio-project/
├── frontend/                  ← React + TypeScript + Vite
│   ├── src/
│   │   ├── app/
│   │   │   ├── api/           ← Axios API calls
│   │   │   ├── components/    ← Hero, About, Skills, Projects, Contact, Header, Footer
│   │   │   │   ├── ui/        ← shadcn/ui components
│   │   │   │   └── figma/     ← ImageWithFallback
│   │   │   ├── pages/         ← HomePage
│   │   │   └── routes.tsx     ← React Router setup
│   │   ├── styles/            ← Tailwind + theme CSS
│   │   └── main.tsx
│   ├── .env.example
│   ├── package.json
│   ├── tsconfig.json
│   └── vite.config.ts
│
└── backend/                   ← Node.js + Express REST API
    ├── server.js              ← Entry point
    ├── seed.js                ← Database seeder
    ├── models/                ← Profile, Project, Skill, Message, Admin
    ├── controllers/           ← profileController, projectsController,
    │                             skillsController, contactController, adminController
    ├── routes/                ← profile, projects, skills, contact, admin
    ├── middleware/            ← JWT auth middleware
    ├── .env.example
    └── package.json
```

---

## 🚀 Getting Started

### 1. Backend Setup

```bash
cd backend
npm install

# Create your .env file
cp .env.example .env
# Edit .env — set your MONGO_URI and JWT_SECRET

# Seed database with default data
npm run seed

# Start the API server
npm run dev        # development (nodemon)
npm start          # production
```

**API runs on:** `http://localhost:5000`

---

### 2. Frontend Setup

```bash
cd frontend
npm install

# Create your .env file
cp .env.example .env
# VITE_API_URL=http://localhost:5000/api

# Start dev server
npm run dev        # http://localhost:5173

# Build for production
npm run build
```

---

## 📡 API Endpoints

### Public Endpoints (no auth required)

| Method | Endpoint           | Description                  |
|--------|--------------------|------------------------------|
| GET    | `/api/profile`     | Get portfolio owner profile  |
| GET    | `/api/projects`    | Get featured projects        |
| GET    | `/api/projects/:id`| Get single project           |
| GET    | `/api/skills`      | Get all skill categories     |
| POST   | `/api/contact`     | Submit contact form message  |

### Admin Endpoints (JWT required)

| Method | Endpoint                        | Description              |
|--------|---------------------------------|--------------------------|
| POST   | `/api/admin/login`              | Admin login              |
| GET    | `/api/admin/stats`              | Dashboard stats          |
| PUT    | `/api/profile`                  | Update profile           |
| GET    | `/api/projects/all`             | Get all projects         |
| POST   | `/api/projects`                 | Create project           |
| PUT    | `/api/projects/:id`             | Update project           |
| DELETE | `/api/projects/:id`             | Delete project           |
| POST   | `/api/skills`                   | Create skill category    |
| PUT    | `/api/skills/:id`               | Update skill category    |
| DELETE | `/api/skills/:id`               | Delete skill category    |
| GET    | `/api/contact/messages`         | Get all messages         |
| PATCH  | `/api/contact/messages/:id/read`| Mark message as read     |
| DELETE | `/api/contact/messages/:id`     | Delete message           |

### Admin Login
```json
POST /api/admin/login
{
  "email": "admin@portfolio.com",
  "password": "admin123"
}
```

---

## 🗄️ MongoDB Models

| Model     | Fields                                                                 |
|-----------|------------------------------------------------------------------------|
| Profile   | name, title, bio, yearsExp, projectsCount, heroImage, github, linkedin, email, phone, location ... |
| Project   | title, description, image, tags[], github, live, gradient, featured, order |
| Skill     | title, gradient, order, skills[{name, level}]                          |
| Message   | name, email, message, isRead, ip                                       |
| Admin     | email, password (bcrypt hashed)                                        |

---

## ✨ Frontend Features

- **Animated Hero** — loads profile name, title, bio, stats from API
- **Skills** — animated progress bars loaded from API
- **Projects** — project cards loaded from API with GitHub/live links
- **Contact Form** — POSTs to backend, shows success/error states
- **Fully responsive** — mobile-first with Tailwind CSS
- **Framer Motion** animations throughout
- **Graceful fallback** — shows default content if API is unavailable

---

## 🛠 Tech Stack

| Layer     | Technology                                   |
|-----------|----------------------------------------------|
| Frontend  | React 18, TypeScript, Vite, Tailwind CSS v4  |
| Animation | Framer Motion (motion/react)                 |
| UI        | shadcn/ui + Radix UI                         |
| HTTP      | Axios                                        |
| Routing   | React Router v7                              |
| Backend   | Node.js, Express.js                          |
| Database  | MongoDB + Mongoose                           |
| Auth      | JWT + bcryptjs                               |
| Security  | Helmet, CORS, express-rate-limit             |
| Email     | Nodemailer (optional)                        |

---

## 🔒 Security Features

- **JWT authentication** for all admin routes
- **Rate limiting** on contact form (5 messages/15 min per IP)
- **Helmet** for HTTP security headers
- **CORS** configured for specific frontend origin
- **Password hashing** with bcryptjs (12 rounds)
- **Input sanitization** and maxlength validation

---

## 📦 Deployment

**Backend** → Deploy on Railway, Render, or any Node.js host  
**Frontend** → Deploy on Vercel, Netlify, or static hosting  
**Database** → MongoDB Atlas (free tier available)

Set `VITE_API_URL` in frontend `.env` to your deployed backend URL.
