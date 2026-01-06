# Law4Minor Deployment Guide

## Overview

This project consists of three applications:
1. **Backend** - Express.js API with Prisma/PostgreSQL
2. **Frontend** (public) - Vite + React with Vike SSR
3. **Frontend-Management** - Vite + React SPA (admin panel)

---

## Prerequisites

- Node.js 20+ or Bun 1.0+
- PostgreSQL 15+
- Docker (optional, for development)

---

## Environment Variables

### Backend (`backend/.env`)
```env
DATABASE_URL="postgresql://user:password@localhost:5432/law4minor?schema=public"
JWT_SECRET="your-jwt-secret-here"
PORT=3001
```

### Frontend (`frontend/.env`) - Optional
```env
VITE_API_URL=http://localhost:3001
```

---

## Development Setup

### 1. Backend
```bash
cd backend
bun install
bunx prisma generate
bunx prisma migrate deploy
bun run src/server.ts
```

### 2. Public Frontend (SSR)
```bash
cd frontend
bun install
bun run dev
```

### 3. Management Frontend
```bash
cd frontend-management
bun install
bun run dev
```

---

## Production Build

### Backend
```bash
cd backend
bun install --production
bunx prisma generate
bunx prisma migrate deploy
NODE_ENV=production bun run src/server.ts
```

### Public Frontend (SSR)
```bash
cd frontend
bun install
bun run build
bun run preview  # or use a production server
```

### Management Frontend (SPA)
```bash
cd frontend-management
bun install
bun run build
# Serve the `dist/` folder with nginx or any static file server
```

---

## Docker Compose (Development)

Create `docker-compose.yml` at project root:

```yaml
version: '3.8'

services:
  postgres:
    image: postgres:15-alpine
    environment:
      POSTGRES_USER: law4minor
      POSTGRES_PASSWORD: password
      POSTGRES_DB: law4minor
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

  backend:
    build: ./backend
    ports:
      - "3001:3001"
    environment:
      DATABASE_URL: postgresql://law4minor:password@postgres:5432/law4minor
      JWT_SECRET: dev-secret
    depends_on:
      - postgres
    volumes:
      - ./backend/uploads:/app/uploads

  frontend:
    build: ./frontend
    ports:
      - "5173:5173"
    depends_on:
      - backend

  frontend-management:
    build: ./frontend-management
    ports:
      - "5174:5174"
    depends_on:
      - backend

volumes:
  postgres_data:
```

---

## Production Deployment Checklist

### Security
- [ ] Set strong `JWT_SECRET`
- [ ] Use HTTPS for all services
- [ ] Configure CORS properly in backend
- [ ] Enable rate limiting
- [ ] Set up database backups

### Performance
- [ ] Enable gzip compression
- [ ] Configure CDN for static assets
- [ ] Set up caching headers

### Monitoring
- [ ] Set up health checks
- [ ] Configure logging (stdout/file)
- [ ] Set up error tracking (e.g., Sentry)

---

## Ports Summary

| Service | Dev Port | Description |
|---------|----------|-------------|
| Backend | 3001 | API server |
| Frontend | 5173 | Public website (SSR) |
| Management | 5174 | Admin panel |
| PostgreSQL | 5432 | Database |
