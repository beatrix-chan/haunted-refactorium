# Getting Started

This guide will help you set up Haunted Refactorium for development or deployment.

## Prerequisites

### Required
- **Node.js 18+** - [Download](https://nodejs.org/)
- **npm** - Comes with Node.js
- **Git** - For cloning repositories

### Optional (for Docker deployment)
- **Docker** - [Download](https://www.docker.com/products/docker-desktop)
- **Docker Compose** - Usually included with Docker Desktop
- **8GB+ RAM** - For running Ollama with larger models

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/your-org/haunted-refactorium.git
cd haunted-refactorium
```

### 2. Install Dependencies

```bash
npm install
```

This will install all required packages for both frontend and backend.

### 3. Configure Environment

```bash
cp .env.example .env
```

Edit `.env` if needed. Default values work for local development.

### 4. Verify Setup

```bash
npm run verify
```

This script checks that everything is installed correctly.

## Development Mode

The fastest way to start developing:

```bash
# Terminal 1: Start backend
npm run dev:backend

# Terminal 2: Start frontend
npm run dev:frontend
```

- **Backend**: http://localhost:3001
- **Frontend**: http://localhost:3000
- **API Docs**: http://localhost:3001/api-docs

Changes to code will automatically reload.

## Docker Deployment

For a production-like environment with local AI:

```bash
# Start all services
docker-compose up -d

# Pull AI model (first time only, ~4GB)
docker exec -it haunted-ollama ollama pull codellama

# Check status
docker-compose ps

# View logs
docker-compose logs -f
```

Access the app at http://localhost:3000

### Stop Docker Services

```bash
docker-compose down
```

## Railway Deployment

For cloud deployment with auto-scaling:

1. **Push to GitHub**:
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin <your-github-repo>
git push -u origin main
```

2. **Deploy on Railway**:
   - Go to [railway.app](https://railway.app)
   - Sign in with GitHub
   - Click "New Project" → "Deploy from GitHub repo"
   - Select your repository
   - Railway auto-configures from `railway.json`

3. **Optional: Add Redis**:
   - In Railway dashboard, click "New"
   - Select "Database" → "Redis"
   - It will auto-connect to your app

## Project Structure

```
haunted-refactorium/
├── src/
│   ├── backend/          # Express API
│   ├── frontend/         # React app
│   └── shared/           # Shared types
├── docs/                 # VitePress documentation
├── tests/                # Test suites
├── scripts/              # Setup scripts
└── docker-compose.yml    # Docker configuration
```

## Common Commands

```bash
# Development
npm run dev:backend       # Start backend dev server
npm run dev:frontend      # Start frontend dev server

# Building
npm run build:backend     # Compile TypeScript
npm run build:frontend    # Build React app
npm run build             # Build both

# Production
npm start                 # Run compiled backend

# Testing
npm test                  # Run all tests
npm run test:properties   # Run property-based tests

# Code Quality
npm run lint              # Check code style
npm run format            # Format code with Prettier

# Utilities
npm run verify            # Verify setup
```

## Troubleshooting

### Port Already in Use

If ports 3000 or 3001 are in use:

**Windows:**
```bash
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

**Mac/Linux:**
```bash
lsof -ti:3000 | xargs kill -9
```

### Docker Out of Memory

Increase Docker memory in Docker Desktop settings:
- Settings → Resources → Memory → 8GB+

Or use a smaller model:
```bash
docker exec -it haunted-ollama ollama pull codellama:7b
```

### npm install Fails

Clear cache and reinstall:
```bash
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
```

### Backend Won't Start

Make sure you've built it first:
```bash
npm run build:backend
npm start
```

Or use dev mode (auto-compiles):
```bash
npm run dev:backend
```

## Next Steps

- [Quick Start](/guide/quick-start) - Run your first analysis
- [Code Analysis](/guide/code-analysis) - Learn about analysis features
- [API Reference](/api/overview) - Explore the REST API
