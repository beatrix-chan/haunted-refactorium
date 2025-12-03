---
inclusion: always
---

# Modernization Strategy

This document defines how Haunted Refactorium analyzes legacy code and recommends modern architectures.

## Preferred Modern Stack Recommendations

When generating architecture proposals and scaffolds, prioritize these modern patterns:

### Frontend
- **React** with TypeScript (functional components + hooks)
- **Vite** for build tooling (faster than Webpack)
- **Tailwind CSS** for styling (utility-first)
- **React Query** or **SWR** for data fetching
- **Zustand** or **Context API** for state management (avoid Redux unless necessary)
- **React Router** for routing

### Backend
- **Node.js** with **Express** or **Fastify**
- **TypeScript** throughout
- **Prisma** or **TypeORM** for database (if needed)
- **Zod** or **Yup** for validation
- **JWT** for authentication
- RESTful APIs or **GraphQL** (depending on use case)

### Testing
- **Jest** for unit tests
- **Vitest** as modern alternative to Jest
- **React Testing Library** for component tests
- **Playwright** or **Cypress** for E2E tests
- **fast-check** for property-based testing
- Aim for 80%+ code coverage on critical paths

### Code Quality
- **ESLint** + **typescript-eslint** for linting
- **Prettier** for formatting
- **Husky** for git hooks
- **lint-staged** for pre-commit checks
- **Conventional Commits** for commit messages

### Security Best Practices
- **Input validation** on all user inputs (use Zod/Yup)
- **Parameterized queries** to prevent SQL injection
- **CORS** configuration for API security
- **Helmet.js** for Express security headers
- **Rate limiting** on API endpoints
- **Content Security Policy** (CSP) headers
- **Dependency scanning** (npm audit, Snyk)
- **Environment variables** for secrets (never commit .env)
- **HTTPS** in production
- **Authentication & Authorization** with proper session management

## Architecture Patterns to Recommend

### Prefer:
- **Layered architecture** (presentation, business logic, data access)
- **Service-oriented design** with clear interfaces
- **Dependency injection** for testability
- **Repository pattern** for data access
- **Factory pattern** for object creation
- **Strategy pattern** for interchangeable algorithms
- **Middleware pattern** for cross-cutting concerns

### Avoid Recommending:
- Monolithic architectures (unless very small projects)
- Tight coupling between layers
- God objects or classes
- Circular dependencies
- Global state (unless managed properly)

## Legacy Patterns to Flag

### High Priority (Cursed):
- **jQuery** for DOM manipulation (recommend vanilla JS or React)
- **Callback hell** (recommend async/await)
- **var** declarations (recommend const/let)
- **Deprecated APIs** (e.g., TSLint → ESLint)
- **Outdated build tools** (Grunt, Gulp → Vite, esbuild)
- **Bower** for package management (recommend npm/yarn/pnpm)
- **Synchronous file operations** in Node.js
- **eval()** usage (security risk)
- **document.write()** (recommend modern DOM APIs)

### Medium Priority (Haunted):
- **Class components** in React (recommend functional + hooks)
- **Prototype-based inheritance** (recommend ES6 classes or composition)
- **XMLHttpRequest** (recommend fetch or axios)
- **Moment.js** (recommend date-fns or Day.js)
- **Lodash** for simple operations (recommend native methods)
- **CoffeeScript** (recommend TypeScript)

### Low Priority (Spooky):
- **CommonJS** (recommend ES modules)
- **Webpack** (consider Vite for new projects)
- **Redux** for simple state (recommend Context API or Zustand)
- **CSS-in-JS** libraries (consider Tailwind or CSS modules)

## Refactoring Priorities

When generating refactoring recommendations, prioritize in this order:

1. **Security vulnerabilities** (critical dependencies, injection risks)
2. **Deprecated/unmaintained dependencies** (ghostly dependencies)
3. **Code smells affecting maintainability** (long functions, deep nesting)
4. **Performance bottlenecks** (N+1 queries, unnecessary re-renders)
5. **Testing gaps** (untested critical paths)
6. **Documentation gaps** (missing API docs, unclear interfaces)
7. **Code style inconsistencies** (formatting, naming conventions)

## Migration Approach

Recommend **incremental migration** strategies:
- **Strangler Fig pattern** (gradually replace old system)
- **Feature flags** for gradual rollout
- **Parallel run** for critical systems
- **Automated testing** before and after migration
- **Rollback plan** for each phase

Avoid "big bang" rewrites unless absolutely necessary.

## Technology-Specific Recommendations

### JavaScript/TypeScript
- Migrate to TypeScript for type safety
- Use ES6+ features (arrow functions, destructuring, spread operator)
- Prefer async/await over callbacks
- Use modern array methods (map, filter, reduce)

### React
- Functional components with hooks
- Custom hooks for reusable logic
- Proper key props in lists
- Memoization for performance (useMemo, useCallback)
- Code splitting with React.lazy

### Node.js
- Use async/await for asynchronous operations
- Proper error handling with try/catch
- Stream processing for large files
- Worker threads for CPU-intensive tasks
- Cluster mode for scalability

### PHP
- Migrate to modern frameworks (Laravel, Symfony)
- Use Composer for dependency management
- Implement PSR standards
- Use prepared statements for database queries
- Consider migrating to Node.js/Python for new features

### Python
- Use virtual environments (venv, poetry)
- Type hints for better code quality
- Modern frameworks (FastAPI, Django)
- Async support with asyncio
- Proper package structure

## Performance Optimization Guidelines

- **Lazy loading** for large datasets
- **Caching** strategies (Redis, in-memory)
- **Database indexing** for frequent queries
- **CDN** for static assets
- **Code splitting** for frontend bundles
- **Image optimization** (WebP, lazy loading)
- **API pagination** for large result sets
- **Debouncing/throttling** for user inputs

## Accessibility in Modernization

All modernization recommendations MUST include accessibility improvements:
- Semantic HTML elements
- ARIA labels where needed
- Keyboard navigation support
- Screen reader compatibility
- Color contrast compliance (WCAG AA minimum)
- Focus management
- Skip navigation links
