---
inclusion: always
---

# Technology Stack

## Core Technologies

**Language**: TypeScript throughout (frontend and backend)

**Runtime**: Node.js

**Frontend**:
- React with TypeScript
- D3.js for interactive visualizations
- Tailwind CSS for styling
- react-i18next for internationalization

**Backend**:
- Express.js REST API
- WebSocket for real-time progress updates
- Tree-sitter for code parsing
- ESLint and typescript-eslint for JavaScript/TypeScript analysis

**Storage & Caching**:
- File system for temporary codebase storage
- Redis for caching analysis results

**AI Integration**:
- **Local**: Ollama for offline LLM inference with large models (CodeLlama, Llama 3, custom models)
- **Online**: Free/public LLM APIs without requiring user API keys (Hugging Face Inference API, public endpoints)
- Model selection: Auto-detection or multi-agent scanning for online deployment
- Explicit separation: online uses public APIs, offline uses Ollama

**Testing**:
- Jest for unit testing
- fast-check for property-based testing
- React Testing Library for component tests

**API Documentation**:
- Swagger/OpenAPI specification
- swagger-jsdoc for generating OpenAPI spec from JSDoc comments
- swagger-ui-express for interactive API documentation UI
- Integrated into Express backend at `/api-docs` endpoint

**Documentation**:
- VitePress for documentation site
- Swagger/OpenAPI for API documentation (auto-generated from Express routes)

**Deployment**:
- **Local**: Docker with docker-compose (includes Ollama, Redis, all services)
- **Online**: Railway (full-stack Node.js hosting) - NO Docker
  - Supports large file uploads (no 4.5MB limit)
  - WebSocket support for real-time updates
  - No timeout issues for long-running analysis
  - Redis add-on available
  - GitHub integration with auto-deploy
- Nginx for frontend serving (local deployment only)

## Supported Archive Formats

`.zip`, `.tar`, `.tar.gz`, `.tar.bz2`, `.tar.xz`, `.7z`

## Common Commands

### Development
```bash
# Install dependencies
npm install

# Run backend development server
npm run dev:backend

# Run frontend development server
npm run dev:frontend

# Run tests
npm test

# Run property-based tests
npm run test:properties
```

### Local Docker Deployment
```bash
# Local deployment (full stack with Ollama)
docker-compose up

# Stop containers
docker-compose down
```

### Online Deployment (Railway)
```bash
# Railway auto-detects and deploys from GitHub
# Just push to main branch and Railway handles:
# - npm install
# - npm run build (if needed)
# - npm start

# Manual deployment (optional):
railway up

# Add Redis (optional):
railway add redis
```

### Testing
```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run specific test file
npm test -- path/to/test.spec.ts

# Run with coverage
npm test -- --coverage
```

## Code Quality Tools

- **Prettier** for code formatting
- **typescript-eslint** for linting
- Consistent code style throughout (if starting with classes, continue with classes; if functional, stay functional)

## API Documentation Strategy

- Use **Swagger/OpenAPI** for REST API documentation
- Document endpoints with JSDoc comments in route files
- Auto-generate OpenAPI spec using swagger-jsdoc
- Serve interactive docs at `/api-docs` using swagger-ui-express
- Include request/response schemas, parameters, and examples
- Keep API docs in sync with code through JSDoc annotations

## Build System

The project uses standard npm scripts with TypeScript compilation. Frontend uses Vite or Webpack for bundling.

## Language Analysis Priority

1. **Primary**: JavaScript/TypeScript (extensive package ecosystem)
2. **Secondary**: Any language supported by Tree-sitter (Python, PHP, Ruby, Java, Go, Rust, etc.)
3. Tree-sitter provides broad language support for parsing and analysis
