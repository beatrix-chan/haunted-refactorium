# Local Development

Set up Haunted Refactorium for local development in minutes.

## Prerequisites

- **Node.js 18+** - [Download](https://nodejs.org/)
- **npm** - Comes with Node.js
- **Git** - For cloning the repository

## Quick Setup

### 1. Clone the Repository

```bash
git clone https://github.com/your-org/haunted-refactorium.git
cd haunted-refactorium
```

### 2. Install Dependencies

```bash
npm install
```

This installs all packages for both frontend and backend.

### 3. Configure Environment

```bash
cp .env.example .env
```

The default values work for local development. Edit if needed:

```env
PORT=3001
NODE_ENV=development
DEPLOYMENT_MODE=local
```

### 4. Verify Setup

```bash
npm run verify
```

This checks that everything is installed correctly.

### 5. Start Development Servers

Open two terminal windows:

**Terminal 1 - Backend:**

```bash
npm run dev:backend
```

**Terminal 2 - Frontend:**

```bash
npm run dev:frontend
```

### 6. Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001
- **API Docs**: http://localhost:3001/api-docs

## Development Workflow

### Making Changes

**Frontend changes** (React components, styles):

- Edit files in `src/frontend/`
- Changes auto-reload in browser
- Check browser console for errors

**Backend changes** (API, services):

- Edit files in `src/backend/`
- Server auto-restarts with `tsx watch`
- Check terminal for errors

**Shared code** (types, utilities):

- Edit files in `src/shared/`
- Used by both frontend and backend

### Running Tests

```bash
# All tests
npm test

# Watch mode (re-runs on changes)
npm test -- --watch

# Specific test file
npm test -- severity.spec.ts

# With coverage
npm test -- --coverage
```

### Code Quality

```bash
# Check linting
npm run lint

# Fix linting issues
npm run lint -- --fix

# Format code
npm run format
```

### Building for Production

```bash
# Build both frontend and backend
npm run build

# Or build separately
npm run build:backend
npm run build:frontend

# Run production build
npm start
```

## Project Structure

```
src/
├── backend/          # Express API
│   ├── api/          # Route handlers
│   ├── config/       # Configuration
│   ├── services/     # Business logic
│   └── index.ts      # Entry point
├── frontend/         # React app
│   ├── components/   # Reusable components
│   ├── context/      # React context
│   ├── pages/        # Page components
│   └── App.tsx       # Main component
└── shared/           # Shared code
    ├── types/        # TypeScript types
    └── utils/        # Utilities
```

## Common Tasks

### Adding a New API Endpoint

1. Add route in `src/backend/api/routes.ts`
2. Add Swagger documentation with JSDoc
3. Implement service logic if needed
4. Test with Swagger UI or cURL

### Adding a New Page

1. Create component in `src/frontend/pages/`
2. Add route in `src/frontend/App.tsx`
3. Update navigation if needed
4. Test in browser

### Adding a New Type

1. Add to `src/shared/types/index.ts`
2. Use in both frontend and backend
3. TypeScript will catch type errors

## Troubleshooting

### Port Already in Use

**Windows:**

```bash
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

**Mac/Linux:**

```bash
lsof -ti:3000 | xargs kill -9
```

### Backend Won't Start

Make sure you're using the dev command:

```bash
npm run dev:backend  # Not npm start
```

Or build first:

```bash
npm run build:backend
npm start
```

### Frontend Shows Blank Page

Check browser console for errors:

- Press F12
- Look in Console tab
- Fix any import or syntax errors

### TypeScript Errors

```bash
# Check for type errors
npx tsc --noEmit

# In frontend
npx tsc -p tsconfig.frontend.json --noEmit

# In backend
npx tsc -p tsconfig.backend.json --noEmit
```

### Module Not Found

```bash
# Clear and reinstall
rm -rf node_modules package-lock.json
npm install
```

## Development Tips

### Hot Reload

Both frontend and backend support hot reload:

- **Frontend**: Vite HMR (instant)
- **Backend**: tsx watch (restarts server)

### Debugging

**Frontend (Browser DevTools):**

- Use React DevTools extension
- Console.log for quick debugging
- Breakpoints in Sources tab

**Backend (VS Code):**

- Add breakpoints in code
- Use Debug panel
- Or add `console.log()` statements

### Environment Variables

Create `.env` for local overrides:

```env
PORT=3001
DEPLOYMENT_MODE=local
# Add your custom variables
```

Never commit `.env` to git!

## Next Steps

- [Quick Start](/guide/quick-start) - Run your first analysis
- [Contributing](/guide/contributing) - Contribution guidelines
- [Architecture](/guide/architecture) - System design
- [API Reference](/api/overview) - API documentation
