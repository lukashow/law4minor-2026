# Law4Minor - Youth Legal Education Platform

A full-stack web application for Law4Minor, featuring a modern landing page and WordPress-like CMS dashboard.

## Tech Stack

### Frontend
- React 18 + TypeScript
- Vite
- TailwindCSS
- Anime.js (animations)
- React Router DOM
- Editor.js (block editor)

### Backend
- Express.js + TypeScript
- PocketBase (database & auth)
- Zod (validation)

## Project Structure

```
law4minor2026-vibed-ofc/
├── frontend/          # React application
├── backend/           # Express API server
├── database/          # PocketBase data
├── package.json       # Workspace root
└── .env.example       # Environment template
```

## Getting Started

### Prerequisites
- [Bun](https://bun.sh/) (package manager)
- [PocketBase](https://pocketbase.io/) executable in `/database`

### Installation

```bash
# Install all dependencies
bun install

# Copy environment file
cp .env.example .env
```

### Development

```bash
# Start all services
bun run dev

# Start frontend only
bun run dev:frontend

# Start backend only
bun run dev:backend

# Start PocketBase (in separate terminal)
cd database && ./pocketbase serve
```

### Build

```bash
bun run build
```

## License

© 2024-2026 Law4Minor. All Rights Reserved.
