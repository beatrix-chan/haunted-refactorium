# Architecture Overview

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         Frontend                            │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  React + TypeScript + Vite                           │   │
│  │  - Upload Interface                                  │   │
│  │  - Analysis Dashboard (D3 visualizations)            │   │
│  │  - Architecture Proposal Viewer                      │   │
│  │  - Theme Toggle (Spooky/Professional)                │   │
│  │  - Accessibility Controls                            │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                            │
                            │ HTTP/WebSocket
                            ▼
┌──────────────────────────────────────────────────────────────┐
│                      Backend API                             │
│  ┌──────────────────────────────────────────────────────┐    │
│  │  Express + TypeScript                                │    │
│  │  - REST API Endpoints                                │    │
│  │  - WebSocket Server (real-time updates)              │    │
│  │  - Swagger/OpenAPI Documentation                     │    │
│  └──────────────────────────────────────────────────────┘    │
│                            │                                 │
│  ┌─────────────────────────┴──────────────────────────┐      │
│  │                                                    │      │
│  ▼                                                    ▼      │
│  ┌──────────────────┐                    ┌──────────────────┐│
│  │ Service Layer    │                    │  LLM Service     ││
│  │                  │                    │                  ││
│  │ • Ingestion      │◄───────────────────┤ • Local: Ollama  │|
│  │ • Detection      │                    │ • Online: HF API ││
│  │ • Analysis       │                    │                  ││
│  │ • Generation     │                    │ (Mode-dependent) ││
│  │ • Export         │                    └──────────────────┘│
│  └──────────────────┘                                        │
└──────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                    Storage Layer                            │
│  ┌──────────────────┐              ┌──────────────────┐     │
│  │  File System     │              │  Redis Cache     │     │
│  │  - Uploads       │              │  - Analysis      │     │
│  │  - Extracted     │              │  - Proposals     │     │
│  │  - Temp files    │              │  - Metadata      │     │
│  └──────────────────┘              └──────────────────┘     │
└─────────────────────────────────────────────────────────────┘
```

## Deployment Modes

### Local Deployment (Docker)

```
┌─────────────────────────────────────────────────────────────┐
│                    Docker Compose                           │
│                                                             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐       │
│  │   Frontend   │  │   Backend    │  │    Redis     │       │
│  │   (Nginx)    │  │  (Node.js)   │  │              │       │
│  │   Port 3000  │  │   Port 3001  │  │  Port 6379   │       │
│  └──────────────┘  └──────────────┘  └──────────────┘       │
│                            │                                │
│                            ▼                                │
│                    ┌──────────────┐                         │
│                    │    Ollama    │                         │
│                    │  (Local LLM) │                         │
│                    │  Port 11434  │                         │
│                    └──────────────┘                         │
│                                                             │
│  Features:                                                  │
│  ✓ Complete offline capability                              │
│  ✓ Large AI models (CodeLlama, Llama 3)                     │
│  ✓ Full privacy - no external calls                         │
│  ✓ Self-hosted infrastructure                               │
└─────────────────────────────────────────────────────────────┘
```

### Online Deployment (Railway)

```
┌─────────────────────────────────────────────────────────────┐
│                      Railway Platform                       │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Full-Stack Node.js App                              │   │
│  │  - Frontend (built, served by Express)               │   │
│  │  - Backend API                                       │   │
│  │  - Auto-scaling                                      │   │
│  │  - Public URL                                        │   │
│  └──────────────────────────────────────────────────────┘   │
│                            │                                │
│                            ▼                                │
│                    ┌──────────────┐                         │
│                    │ Redis Add-on │                         │
│                    │  (Optional)  │                         │
│                    └──────────────┘                         │
│                                                             │
│  External Services:                                         │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Hugging Face Inference API (Free Tier)              │   │
│  │  - No API keys required                              │   │
│  │  - Public endpoints                                  │   │
│  │  - Smaller models (faster, less accurate)            │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                             │
│  Features:                                                  │
│  ✓ No Docker needed                                         │
│  ✓ Auto-deploy on git push                                  │
│  ✓ Supports large uploads & WebSockets                      │
│  ✓ Free tier available                                      │
└─────────────────────────────────────────────────────────────┘
```

## Data Flow

### Analysis Pipeline

```
1. Upload
   ├─ User uploads archive (.zip, .tar, etc.)
   ├─ Multer receives file
   └─ File saved to uploads/

2. Extraction
   ├─ Detect archive format
   ├─ Extract to temp directory
   └─ Scan file structure

3. Detection
   ├─ Parse package.json (if exists)
   ├─ Detect technologies & versions
   ├─ Identify deprecated dependencies
   └─ Search for legacy patterns (jQuery, var, etc.)

4. Analysis
   ├─ Parse code files with Tree-sitter
   ├─ Calculate complexity metrics
   ├─ Detect code smells
   │  ├─ Callback hell
   │  ├─ Long functions
   │  ├─ Deprecated syntax
   │  └─ Anti-patterns
   ├─ Identify cursed files (hotspots)
   └─ Calculate technical debt score

5. Generation (on request)
   ├─ Extract current stack
   ├─ Propose modern stack
   ├─ Generate migration strategy (via LLM)
   │  ├─ Local: Ollama API
   │  └─ Online: Hugging Face API
   ├─ Create migration phases
   └─ Generate project scaffold

6. Export
   ├─ Format analysis report
   ├─ Package architecture proposal
   ├─ Create migration guide
   └─ Generate downloadable scaffold
```

## Service Layer Details

### Ingestion Service

- **Responsibility**: Handle file uploads and extraction
- **Key Methods**:
  - `extractArchive()`: Unzip/untar archives
  - `analyzeCodebase()`: Count files, detect languages
- **Dependencies**: unzipper, tar, fs

### Detection Service

- **Responsibility**: Identify technologies and patterns
- **Key Methods**:
  - `detectTechnologies()`: Parse package.json, search files
  - `isDeprecated()`: Check against deprecated list
- **Patterns Detected**:
  - jQuery usage
  - Deprecated packages (bower, tslint, moment)
  - Legacy build tools (grunt, gulp)

### Analysis Service

- **Responsibility**: Deep code analysis
- **Key Methods**:
  - `analyzeCodebase()`: Main analysis orchestrator
  - `detectCodeSmells()`: Find anti-patterns
  - `identifyCursedFiles()`: Rank problematic files
  - `calculateMetrics()`: Compute complexity, debt score
- **Code Smells**:
  - `var` usage
  - Callback hell
  - Long functions (>200 lines)
  - High cyclomatic complexity

### Generation Service

- **Responsibility**: Create proposals and scaffolds
- **Key Methods**:
  - `generateArchitectureProposal()`: Create modernization plan
  - `generateScaffold()`: Create project structure
- **LLM Integration**:
  - Uses LLMService (mode-dependent)
  - Fallback to template-based generation

### LLM Service

- **Responsibility**: AI-powered recommendations
- **Implementations**:
  - `OllamaLLMService`: Local inference
  - `OnlineLLMService`: Hugging Face API
- **Key Methods**:
  - `generateArchitectureProposal()`
  - `generateMigrationGuide()`
- **Fallbacks**: Template-based responses if API fails

## Frontend Architecture

### Component Hierarchy

```
App
├── ThemeProvider (Context)
│   └── theme state (spooky, highContrast, font)
│
├── Header
│   ├── Logo
│   └── Theme Controls
│       ├── Spooky/Professional Toggle
│       ├── High Contrast Toggle
│       └── Font Toggle
│
└── Routes
    ├── HomePage
    │   ├── Upload Form
    │   └── Feature Cards
    │
    ├── AnalysisPage
    │   ├── Metrics Overview
    │   ├── Ghostly Dependencies
    │   ├── Cursed Files List
    │   ├── Code Smells List
    │   └── Generate Proposal Button
    │
    └── ProposalPage
        ├── Stack Comparison
        ├── Migration Strategy
        ├── Phase Timeline
        └── Download Actions
```

### State Management

- **Theme**: React Context (persisted to localStorage)
- **API Data**: Component state + axios
- **Real-time Updates**: WebSocket connection

### Accessibility Features

- Semantic HTML throughout
- ARIA labels on interactive elements
- Keyboard navigation (Tab, Enter, Escape)
- Focus indicators
- High contrast mode
- Font options (JetBrains Mono / OpenDyslexic)
- Screen reader announcements

## API Endpoints

### REST API

```
POST   /api/upload          Upload codebase archive
GET    /api/analysis/:id    Get analysis results
POST   /api/proposal        Generate architecture proposal
GET    /api/scaffold/:id    Download project scaffold
GET    /api/health          Health check
GET    /api-docs            Swagger documentation
```

### WebSocket

```
/ws                          Real-time progress updates
```

## Technology Decisions

### Why TypeScript?

- Type safety reduces bugs
- Better IDE support
- Self-documenting code
- Easier refactoring

### Why Vite?

- Faster than Webpack
- Better DX with HMR
- Modern ESM-first approach
- Smaller bundle sizes

### Why Express?

- Mature, well-documented
- Large ecosystem
- Simple, unopinionated
- Easy to extend

### Why Tree-sitter?

- Multi-language support
- Fast, incremental parsing
- Robust error recovery
- Used by GitHub, Atom

### Why Ollama (Local)?

- Runs completely offline
- No API keys needed
- Privacy-focused
- Supports large models

### Why Hugging Face (Online)?

- Free tier available
- No API keys required
- Good model selection
- Reliable infrastructure

### Why Redis?

- Fast caching
- Simple key-value store
- Widely supported
- Easy to deploy

## Security Considerations

### Input Validation

- File size limits enforced
- Archive format validation
- Path traversal prevention
- Malicious file detection

### API Security

- CORS configured
- Helmet.js headers
- Rate limiting (TODO)
- Input sanitization

### Data Privacy

- **Local**: All data stays on-premise
- **Online**: Code sent to HF API (use for non-sensitive only)
- Temporary files cleaned up
- No persistent storage of user code

## Performance Optimizations

### Backend

- Redis caching for repeated analyses
- Streaming file processing
- Async/await throughout
- Limited file scanning (top 100 files)

### Frontend

- Code splitting with React.lazy
- Memoization (useMemo, useCallback)
- Debounced inputs
- Lazy loading of visualizations

### Analysis

- Early termination for large codebases
- Parallel file processing
- Incremental results via WebSocket
- Complexity limits to prevent hangs

## Future Enhancements

### Planned Features

- [ ] Interactive dependency graph (D3.js)
- [ ] Diff view for proposed changes
- [ ] Custom rule configuration
- [ ] Multi-language support (i18n)
- [ ] Export to PDF/Markdown
- [ ] GitHub integration
- [ ] CI/CD integration
- [ ] Historical analysis tracking
- [ ] Team collaboration features

### Technical Improvements

- [ ] Database for persistent storage
- [ ] Queue system for long analyses
- [ ] Horizontal scaling support
- [ ] Advanced caching strategies
- [ ] More language parsers
- [ ] Plugin system for custom analyzers
