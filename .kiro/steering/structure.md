---
inclusion: always
---

# Project Structure

## Directory Organization

```
haunted-refacatorium/
├── .kiro/
│   ├── specs/
│   │   └── haunted-refactorium/
│   │       ├── requirements.md    # User stories and acceptance criteria
│   │       ├── design.md          # Architecture, interfaces, correctness properties
│   │       └── tasks.md           # Implementation plan with property tests
│   └── steering/                  # AI assistant guidance documents
├── src/
│   ├── backend/                   # Express API and services
│   │   ├── services/              # Core business logic
│   │   │   ├── ingestion/         # Repository cloning and file upload
│   │   │   ├── detection/         # Technology and framework detection
│   │   │   ├── analysis/          # Code analysis engine
│   │   │   ├── visualization/     # Visualization data generation
│   │   │   ├── generation/        # Architecture, scaffold, migration generators
│   │   │   └── export/            # Report and package export
│   │   ├── api/                   # REST endpoint handlers
│   │   └── websocket/             # Real-time progress updates
│   ├── frontend/                  # React application
│   │   ├── components/            # React components
│   │   ├── pages/                 # Page-level components
│   │   ├── hooks/                 # Custom React hooks
│   │   ├── theme/                 # Halloween theme configuration
│   │   └── i18n/                  # Internationalization setup
│   ├── shared/                    # Shared types and utilities
│   │   ├── types/                 # TypeScript interfaces
│   │   └── utils/                 # Common utility functions
│   └── locales/                   # Translation files
│       ├── en/                    # English translations
│       └── [other-languages]/     # Additional language support
├── tests/
│   ├── unit/                      # Unit tests
│   ├── integration/               # Integration tests
│   ├── properties/                # Property-based tests (fast-check)
│   └── e2e/                       # End-to-end tests
├── docs/                          # VitePress documentation
├── docker/
│   ├── Dockerfile.frontend
│   ├── Dockerfile.backend
│   ├── docker-compose.yml         # Local deployment
│   └── docker-compose.prod.yml    # Production deployment
└── README.md
```

## Key Architectural Patterns

**Layered Architecture**:
- Frontend Layer (React UI + D3 visualizations)
- API Layer (Express REST + WebSocket)
- Analysis Layer (Ingestion, Detection, Analysis, Pattern Matching)
- Generation Layer (Architecture, Scaffold, Migration Guide)
- Storage Layer (File System + Redis Cache)

**Service-Oriented Design**: Each major feature is encapsulated in a service with clear interfaces defined in `design.md`.

**Property-Based Testing**: All correctness properties from `design.md` must have corresponding property-based tests in `tests/properties/`. Each test must be tagged with the property number and description.

## Naming Conventions

- **Services**: `[Feature]Service` (e.g., `IngestionService`, `AnalysisService`)
- **Interfaces**: PascalCase (e.g., `CodebaseMetadata`, `AnalysisResult`)
- **Components**: PascalCase (e.g., `VisualizationPanel`, `HotspotDetail`)
- **Files**: kebab-case for implementation files (e.g., `ingestion-service.ts`)
- **Test files**: `*.spec.ts` for unit tests, `*.property.spec.ts` for property tests
- **API Routes**: RESTful naming (e.g., `/api/codebases`, `/api/analysis/:id`)

## API Documentation

- All Express routes MUST have JSDoc comments with Swagger/OpenAPI annotations
- Include `@swagger` tags for endpoint documentation
- Document request bodies, query parameters, path parameters, and responses
- Provide example requests and responses
- Keep documentation in sync with implementation

## Code Style Guidelines

- **Consistency**: If starting with class-based components, continue with classes; if functional, stay functional
- **Error Handling**: Always output detailed error information to console with context
- **Formatting**: Use Prettier for automatic code formatting
- **Linting**: Use typescript-eslint for code quality
- **Testing**: Write tests alongside implementation, but prioritize core functionality first
- **Async Patterns**: Be consistent with async/await vs promises within each module

## Theming

All UI components must apply the Halloween theme consistently:
- **Color scheme**: Darker tones with purple-ish and orange-ish accents
- **High contrast mode**: Available in accessibility settings for better visibility
- **Fonts**: 
  - Default: JetBrains Mono NerdFont Mono
  - Accessibility option: OpenDyslexic NerdFont
- Spooky iconography (ghosts, skulls, haunted elements)
- Severity levels: "cursed" (critical), "haunted" (high), "spooky" (medium)
- User-facing error messages should maintain spooky tone

## Accessibility Requirements

**Accessibility is the top priority** - every feature must be accessible:
- Keyboard navigation for all interactive elements
- ARIA labels and semantic HTML throughout
- Screen reader compatibility
- High contrast mode toggle
- Font family selection (JetBrains Mono / OpenDyslexic)
- Adjustable text sizes and spacing
- Color-blind friendly color palettes
- Focus indicators on all interactive elements
- Skip navigation links

## Internationalization

- All user-facing text must use i18next translation keys
- Translation keys format: `namespace.section.key`
- English is the default language
- Language preference persists in localStorage
- Browser language auto-detection on first visit
