# What is Haunted Refactorium?

Haunted Refactorium is a web application that analyzes legacy codebases to identify code smells, outdated patterns, and technical debt. It provides spooky-themed visualizations of problem areas and generates actionable modernization plans.

## Core Purpose

Transform legacy code into modern architectures by:

- **Detecting outdated technologies** and deprecated dependencies ("ghostly dependencies")
- **Identifying code smells** and anti-patterns
- **Highlighting problematic files** ("cursed files") through severity-based visualization
- **Generating modern architecture proposals** with migration guides
- **Providing downloadable scaffolds** for new implementations

## Target Users

### Developers
Working with legacy codebases who need guidance on modernization priorities and refactoring strategies.

### Consultants
Assessing client codebases and creating modernization proposals with professional or spooky presentations.

### Teams
Planning technical debt reduction and coordinating refactoring efforts across multiple developers.

### Enterprises
Auditing legacy systems before major modernization initiatives with privacy-focused local deployment.

## Key Differentiators

### 🎃 Halloween-Themed UX
Spooky visualizations make code analysis engaging with cursed/haunted/spooky severity levels. Toggle to professional mode for business contexts.

### 🔒 Offline-Capable
Full Docker deployment with local LLM support (Ollama) for privacy-sensitive codebases. No internet required after initial setup.

### 📊 Comprehensive Output
Not just analysis, but architecture proposals, scaffolds, and migration guides. Everything you need to start modernizing.

### 🌍 Multi-Language Support
Internationalization built-in from the start. Easy to add new languages.

### ♿ Accessibility First
High contrast mode, dyslexic-friendly fonts, keyboard navigation, and screen reader support are core features, not afterthoughts.

## How It Works

1. **Upload or Clone**: Provide a code archive or GitHub repository URL
2. **Analysis**: Automated detection of technologies, dependencies, and code smells
3. **Visualization**: Interactive dashboard showing cursed files, ghostly dependencies, and metrics
4. **Proposal**: AI-generated architecture proposal with migration strategy
5. **Scaffold**: Downloadable modern project structure to start fresh

## Deployment Models

### Local Docker Deployment
- **Offline-capable** with Ollama for local LLM inference
- **Larger, more accurate models** (CodeLlama, Llama 3)
- **Complete privacy** - no external API calls
- **Ideal for**: Enterprise, sensitive codebases, privacy-focused users

### Online Hosted Deployment
- **Railway deployment** with free/public LLM APIs
- **No API keys required** - uses Hugging Face free tier
- **Faster setup** and auto-deploy from GitHub
- **Ideal for**: Quick analysis, demos, public use, non-sensitive codebases

## Technology Stack

- **Frontend**: React + TypeScript + Vite + Tailwind CSS
- **Backend**: Node.js + Express + TypeScript
- **AI**: Ollama (local) or Hugging Face API (online)
- **Storage**: Redis for caching, file system for temporary storage
- **Deployment**: Docker Compose (local) or Railway (online)

## Next Steps

- [Getting Started](/guide/getting-started) - Set up your development environment
- [Quick Start](/guide/quick-start) - Run your first analysis
- [API Reference](/api/overview) - Integrate with your tools
