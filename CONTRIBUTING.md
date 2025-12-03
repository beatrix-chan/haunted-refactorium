# Contributing to Haunted Refactorium

Thanks for your interest in contributing! This guide will help you get started.

## 🎯 Development Setup

1. **Fork and clone:**

```bash
git clone https://github.com/<username>/haunted-refactorium.git
cd haunted-refactorium
```

> [!NOTE]
> Remember to replace `<username>` with your own username.

2. **Install dependencies:**

```bash
npm install
```

3. **Start development servers:**

```bash
# Terminal 1: Backend
npm run dev:backend

# Terminal 2: Frontend
npm run dev:frontend
```

## 📁 Project Structure

```
src/
├── backend/          # Express API and services
│   ├── api/          # REST endpoints
│   ├── config/       # Configuration
│   └── services/     # Business logic
│       ├── analysis/ # Code analysis
│       ├── detection/# Technology detection
│       ├── generation/# Scaffold generation
│       ├── ingestion/# File upload handling
│       └── llm/      # AI integration
├── frontend/         # React application
│   ├── components/   # Reusable components
│   ├── context/      # React context
│   └── pages/        # Page components
└── shared/           # Shared types and utilities
    ├── types/        # TypeScript interfaces
    └── utils/        # Common utilities
```

## 🎨 Code Style

We use ESLint and Prettier for consistent code style:

```bash
# Check linting
npm run lint

# Format code
npm run format
```

**Key conventions:**

- Use TypeScript throughout
- Functional components with hooks (React)
- Async/await over callbacks
- Descriptive variable names
- Comments for complex logic

## 🧪 Testing

All new features should include tests:

```bash
# Run all tests
npm test

# Run specific test file
npm test -- severity.spec.ts

# Run with coverage
npm test -- --coverage
```

**Test types:**

- Unit tests: `tests/unit/*.spec.ts`
- Property-based tests: `tests/properties/*.property.spec.ts`
- Integration tests: `tests/integration/*.spec.ts`

## 🎃 Theme Guidelines

Follow the tone and voice guidelines in `.kiro/steering/tone-and-voice.md`:

**Spooky Mode (default):**

- Use Halloween metaphors: "cursed files", "ghostly dependencies"
- Keep it fun but functional
- Technical content stays clear

**Professional Mode:**

- Business-appropriate language
- Same functionality, different labels
- "Critical issues" instead of "cursed files"

**Both modes must:**

- Provide clear, actionable information
- Maintain accessibility
- Work for screen readers

## ♿ Accessibility Requirements

All UI changes must maintain accessibility:

- ✓ Keyboard navigation
- ✓ ARIA labels
- ✓ Semantic HTML
- ✓ Color contrast (WCAG AA)
- ✓ Screen reader compatibility
- ✓ Focus indicators

Test with:

- Tab navigation
- Screen reader (NVDA, JAWS, VoiceOver)
- High contrast mode

## 🔄 Pull Request Process

1. **Create a feature branch:**

```bash
git checkout -b feature/your-feature-name
```

2. **Make your changes:**

- Write clean, documented code
- Add tests for new features
- Update documentation if needed

3. **Test thoroughly:**

```bash
npm test
npm run lint
```

4. **Commit with clear messages:**

```bash
git commit -m "feat: add dependency graph visualization"
```

Use conventional commits:

- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation
- `style:` Formatting
- `refactor:` Code restructuring
- `test:` Adding tests
- `chore:` Maintenance

5. **Push and create PR:**

```bash
git push origin feature/your-feature-name
```

Then open a pull request on GitHub.

## 🐛 Bug Reports

When reporting bugs, include:

- **Description**: What happened vs what you expected
- **Steps to reproduce**: Detailed steps
- **Environment**: OS, Node version, deployment mode
- **Logs**: Relevant error messages
- **Screenshots**: If applicable

## 💡 Feature Requests

For new features, describe:

- **Use case**: What problem does it solve?
- **Proposed solution**: How should it work?
- **Alternatives**: Other approaches considered
- **Impact**: Who benefits from this?

## 🏗️ Architecture Decisions

For significant changes:

1. Open an issue first to discuss
2. Consider impact on both deployment modes (local/online)
3. Update relevant steering docs in `.kiro/steering/`
4. Ensure backward compatibility

## 📚 Documentation

Update docs when you:

- Add new features
- Change APIs
- Modify deployment process
- Update dependencies

Documentation locations:

- `README.md`: Overview and quick start
- `DEPLOYMENT.md`: Deployment guides
- `QUICKSTART.md`: Getting started
- `.kiro/steering/`: Architecture and guidelines
- API docs: JSDoc comments in code

## 🔒 Security

Report security issues privately:

- Don't open public issues for vulnerabilities
- Email maintainers directly
- Include detailed reproduction steps

## 🎯 Good First Issues

Look for issues labeled:

- `good first issue`: Great for newcomers
- `help wanted`: Community contributions welcome
- `documentation`: Improve docs

## 📝 Code Review

Expect feedback on:

- Code quality and style
- Test coverage
- Documentation
- Accessibility
- Performance
- Security

Be patient and respectful during review.

## 🙏 Thank You!

Every contribution helps make Haunted Refactorium better. Whether it's code, documentation, bug reports, or feature ideas - we appreciate your help!

Happy haunting! 👻
