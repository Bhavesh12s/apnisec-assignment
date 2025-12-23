# ApniSec Assignment – Documentation

## Overview
This project is a full-stack Next.js application built as part of the ApniSec assignment.  
It demonstrates authentication, protected APIs, issue management, and production-ready deployment.

---

## Tech Stack
- Next.js (App Router)
- TypeScript
- Prisma ORM
- PostgreSQL
- JWT Authentication
- Tailwind CSS
- Vercel Deployment

---

## Features Implemented
- User Registration & Login
- JWT-based authentication
- Protected routes
- User profile API
- Issue CRUD APIs
- Rate limiting
- Secure backend architecture
- Production deployment on Vercel

---

## API Endpoints

### Authentication
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`

### Issues
- `POST /api/issues`
- `GET /api/issues`
- `GET /api/issues/:id`
- `PUT /api/issues/:id`
- `DELETE /api/issues/:id`

### Users
- `GET /api/users/profile`

---

## Environment Variables
```env
DATABASE_URL=
DIRECT_URL=
JWT_SECRET=
