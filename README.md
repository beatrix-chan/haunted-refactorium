# Haunted Refacatorium

![Kiroween 2025](https://img.shields.io/badge/Kiroween_Hackathon-2025-indigo?style=for-the-badge) ![License](https://img.shields.io/badge/License-MIT-orange?style=for-the-badge)

![Kiroween](Kiroween.png)

[Haunted Refacatorium](https://github.com/beatrix-chan/haunted-refacatorium) is a web app that haunts legacy repos to reveal cursed code and guide their resurrection into modern architectures.

This project is **vibe-coded** using [Kiro](https://kiro.dev/) &mdash; an Agentic AI that allows development from prototype to production, built by Amazon Web Service (AWS) &mdash; for participation in [Kiroween 2025 Hackathon](https://kiroween.devpost.com/). For details how Kiro is used (the write up), please read [kiro-dev.md](kiro-dev.md).

## Project Details

Haunted Refacatorium is a web app that "haunts" odd or unfashionable tech (e.g., jQuery apps, PHP monoliths, outdated REST APIs, etc.) and guides users through modernizing them into a fresh stack.

This submission is aiming for the category **Resurrection** (dead/obsolete tech &rarr; modern implementation). And bonus submission for **Costume Contest** for the strong spooky theming in the UI and UX.

## Tech Stack

> [!NOTE]
> These can be viewed in [`design.md`](.kiro/specs/haunted-refactorium/design.md)

**IDE**

[![Kiro](https://skills.syvixor.com/api/icons?i=kiro)](https://kiro.dev)

**Core**

[![Typescript](https://skills.syvixor.com/api/icons?i=ts)](https://www.typescriptlang.org/) [![Node.js](https://skills.syvixor.com/api/icons?i=nodejs)](https://nodejs.org/en/) 

**Backend**

[![Express.js](https://skills.syvixor.com/api/icons?i=expressjs)](https://expressjs.com/) [![WebSocket](https://skills.syvixor.com/api/icons?i=websocket)](https://websocket.org)

**Frontend**

[![React](https://skills.syvixor.com/api/icons?i=react)](https://react.dev/) [![D3.js](https://skills.syvixor.com/api/icons?i=d3js)](https://d3js.org) [![Tailwind CSS](https://skills.syvixor.com/api/icons?i=tailwind)](https://tailwindcss.com/) [![react-i18next](https://skills.syvixor.com/api/icons?i=i18next)](https://react.i18next.com/)

**Documentation**

[![VitePress](https://skills.syvixor.com/api/icons?i=vitepress,markdown)](https://vitepress.dev/) [![Swagger](https://skills.syvixor.com/api/icons?i=swagger)](https://swagger.io) [![OpenAPI Initiative](https://skills.syvixor.com/api/icons?i=openapi)](https://www.openapis.org/)

**Analysis Tools**

[![Tree-sitter](https://skills.syvixor.com/api/icons?i=treesitter)](https://tree-sitter.github.io/tree-sitter/) [![Eslint](https://skills.syvixor.com/api/icons?i=eslint)](https://eslint.org/) [![typescript-eslint](https://skills.syvixor.com/api/icons?i=tslint)](https://typescript-eslint.io/)

**Storage and Caching**

- **File system** for temporary codebase storage.
- **Redis** for caching analysis results

**AI Integration**

[![Ollama](https://skills.syvixor.com/api/icons?i=ollama)](https://ollama.com)

**Translations**

[![i18next](https://skills.syvixor.com/api/icons?i=i18next)](https://www.i18next.com/)

**Testing**

- [Jest](https://jestjs.org) for unit testing
- [fast-check](https://fast-check.dev/) for property-based testing
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) for component tests

**Deployments**

[![Railway](https://skills.syvixor.com/api/icons?i=railway)](https://railway.com) [![Docker](https://skills.syvixor.com/api/icons?i=docker)](https://www.docker.com) [![Nginx](https://skills.syvixor.com/api/icons?i=nginx)](https://nginx.org/en/)

**Supported Archive Formats**

- [`.7z`](https://www.7-zip.org/)
- `.zip`
- `.tar`
- `.tar.gz`
- `.tar.bz2`
- `.tar.xz`

## Key Features

**Input**

- Repository URL or archive upload
- Auto-detect tech stack
- Support multiple languages

**Analysis**

- Code smells & anti-patterns
- Outdated dependencies (ghostly dependencies 👻)
- Deprecated tools (TSLint, Bower, etc.)
- Complexity metrics
- Hotspot identification (cursed files 💀)

**Visualization**

- Interactive codebase map
- Dependency graphs
- Severity-based styling (cursed/haunted/spooky)
- Halloween-themed UI

**Output**

- Modern architecture proposal
- Prioritized refactoring steps
- Migration guide with phases
- Modern project scaffold
- Exportable reports (PDF/HTML/Markdown/ZIP)

**Deployment Options**

- **Local Docker**: Full offline capabilioty, privacy-focused, includes Ollama + large models
- **Online Hosted**: Lighter deployment, smaller models, faster but slightly less accurate

**Internationalization and Localization**

- Browser language auto-detection
- Language selector component
- Persistent language preferences
- English default + extensible

### Testing Coverage

- **18 Correctness Properties** (property-based tests)#
- unit tests for all services
- Integration tests for API endpoints
- Component tests for React UI
- End-to-end workflow testing

