# VR Painting Solutions — Website

Full-stack website for **VR Painting Solutions**, a painting contractor in Hadapsar, Pune.

## Tech Stack

| Layer | Technology | Deploy to |
|-------|-----------|-----------|
| Frontend | Next.js 15 + TypeScript + Tailwind CSS | Vercel |
| Backend | Express + TypeScript | Railway / Render |
| Database | PostgreSQL | Supabase |
| Storage | Supabase Storage / Cloudinary | — |
| Email | Resend | — |

## Quick Start

### 1. Backend

```bash
cd backend
cp .env.example .env    # Edit with your Supabase/Resend credentials
npm install
npm run seed            # Create tables & seed data (needs DATABASE_URL)
npm run dev             # http://localhost:4000
```

### 2. Frontend

```bash
cd frontend
npm install
npm run dev             # http://localhost:3000
```

### Environment Variables

**Backend** (`backend/.env`) — see `backend/.env.example` for all keys.

**Frontend** (`frontend/.env.local`):
```
NEXT_PUBLIC_API_URL=http://localhost:4000
# Optional — only needed for production:
# NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
# NEXT_PUBLIC_META_PIXEL_ID=123456789
```

## Project Structure

```
├── frontend/           Next.js app (Vercel)
│   ├── app/            Pages (App Router)
│   ├── components/     Reusable UI
│   ├── lib/            API client, constants, types
│   └── public/         Static assets
├── backend/            Express API (Railway/Render)
│   └── src/
│       ├── routes/     API endpoints
│       ├── middleware/  Auth, uploads
│       ├── db/         Postgres client, schema, seed
│       └── services/   Email notifications
└── docs/               Spec & assets
```

## Pages

| URL | Description |
|-----|-------------|
| `/` | Homepage — hero, trust bar, services, process, testimonials, contact |
| `/about` | Company story, values, stats |
| `/services` | All services overview |
| `/services/:slug` | Individual service landing page (5 total) |
| `/gallery` | Filterable photo gallery with lightbox |
| `/contact` | Contact form + info + map |
| `/admin/login` | Admin authentication |
| `/admin/dashboard` | Lead stats + recent leads |
| `/admin/leads` | Full lead table + CSV export |
| `/admin/services` | Edit service titles/descriptions |
| `/admin/gallery` | Upload, tag, delete gallery images |

## API Endpoints

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/api/health` | — | Health check |
| GET | `/api/services` | — | List active services |
| GET | `/api/services/:slug` | — | Service detail |
| POST | `/api/leads` | — | Submit contact form |
| POST | `/api/auth/login` | — | Admin login → JWT |
| GET | `/api/auth/me` | Admin | Verify token |
| GET | `/api/leads` | Admin | All leads |
| GET | `/api/leads/export` | Admin | CSV download |
| POST | `/api/services` | Admin | Create service |
| PATCH | `/api/services/:id` | Admin | Update service |
| DELETE | `/api/services/:id` | Admin | Delete service |
| GET | `/api/gallery` | — | Gallery images |
| POST | `/api/gallery/upload` | Admin | Upload image |
| PATCH | `/api/gallery/reorder` | Admin | Reorder images |
| DELETE | `/api/gallery/:id` | Admin | Delete image |

## TODOs Before Launch

- [ ] Replace all placeholder/Unsplash images with real client photos
- [ ] Confirm real business hours (GMB shows "Open 24 hours")
- [ ] Confirm pricing for each service before showing price hints
- [ ] Set up Supabase project and add credentials to `.env`
- [ ] Set up Resend and add API key for email notifications
- [ ] Configure custom domain on Vercel
- [ ] Add Google Analytics and Meta Pixel IDs
- [ ] Commission professional photo shoot tagged by service type
