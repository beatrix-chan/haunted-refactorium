---
inclusion: always
---

# Product Overview

Haunted Refactorium is a web application that analyzes legacy codebases to identify code smells, outdated patterns, and technical debt. It provides spooky-themed visualizations of problem areas and generates actionable modernization plans.

## Core Purpose

Transform legacy code into modern architectures by:

- Detecting outdated technologies and deprecated dependencies ("ghostly dependencies")
- Identifying code smells and anti-patterns
- Highlighting problematic files ("cursed files") through severity-based visualization
- Generating modern architecture proposals with migration guides
- Providing downloadable scaffolds for new implementations

## Target Users

Developers and teams working with legacy codebases who need guidance on modernization priorities and refactoring strategies.

## Key Differentiators

- **Halloween-themed UX**: Spooky visualizations make code analysis engaging (cursed/haunted/spooky severity levels)
- **Offline-capable**: Full Docker deployment with local LLM support for privacy-sensitive codebases
- **Comprehensive output**: Not just analysis, but architecture proposals, scaffolds, and migration guides
- **Multi-language support**: Internationalization built-in from the start

## Deployment Models

The application supports two distinct deployment strategies:

### Local Docker Deployment

- **Docker-based** with full offline capability - no internet required after initial setup
- Uses **Ollama** for local LLM inference
- Supports **larger, more accurate models** (CodeLlama, Llama 3, custom models)
- Includes: Frontend, Backend, Redis, Ollama containers
- Ideal for: Enterprise environments, sensitive codebases, privacy-focused users
- Trade-off: Requires more resources, slower inference

### Online Hosted Deployment

- **Railway deployment** (NOT Docker) - full-stack Node.js hosting
- Uses **free/public LLM APIs** that don't require API keys (e.g., Hugging Face Inference API free tier, public endpoints)
- Optimized for speed and cost efficiency with smaller/flash models
- **No user API keys required** - keeps deployment simple and secure
- May use multi-agent scanning or auto-selection of available models
- Supports large file uploads, WebSockets, and long-running processes
- Simple GitHub integration with auto-deploy
- Ideal for: Quick analysis, demos, public use, non-sensitive codebases
- Trade-off: Slightly lower quality recommendations, requires internet connection

Both deployments share the same codebase and feature set - only the AI model backend and deployment method differ.

## Accessibility First

Accessibility is a **top priority** throughout the application:

- High contrast mode option for better visibility
- Font options: JetBrains Mono NerdFont Mono (default), OpenDyslexic NerdFont (accessibility option)
- Keyboard navigation support
- Screen reader compatibility
- ARIA labels and semantic HTML
- Adjustable text sizes and spacing
- Color-blind friendly palettes
