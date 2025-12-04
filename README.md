# 🎃 Haunted Refactorium

![Kiroween 2025](https://img.shields.io/badge/Kiroween_Hackathon-2025-indigo?style=for-the-badge) [![License](https://img.shields.io/github/license/beatrix-chan/haunted-refactorium?style=for-the-badge&color=orange)](LICENSE)

![GitHub repo size](https://img.shields.io/github/repo-size/beatrix-chan/haunted-refactorium?style=for-the-badge) ![GitHub last commit](https://img.shields.io/github/last-commit/beatrix-chan/haunted-refactorium?style=for-the-badge)

![Kiroween](Kiroween.png)

**Where legacy code goes to be resurrected**

Haunted Refactorium is a web application that analyzes legacy codebases to identify code smells, outdated patterns, and technical debt. It provides spooky-themed visualizations of problem areas and generates actionable modernization plans.

<details>

<summary>Table of Contents</summary>

- [✨ Features](#-features)
- [🚀 Quick Start](#-quick-start)
  - [Fastest Way (5 minutes)](#fastest-way-5-minutes)
  - [Local Docker Deployment (Offline-Capable)](#local-docker-deployment-offline-capable)
  - [Online Deployment (Railway)](#online-deployment-railway)
- [📦 Supported Archive Formats](#-supported-archive-formats)
- [🛠️ Technology Stack](#️-technology-stack)
- [🎨 Theme Customization](#-theme-customization)
- [📚 API Documentation](#-api-documentation)
- [🧪 Testing](#-testing)
- [🔒 Security Best Practices](#-security-best-practices)
- [♿ Accessibility](#-accessibility)
- [📖 Documentation](#-documentation)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)
- [🎃 Happy Haunting!](#-happy-haunting)
- [Credits](#credits)

</details>

## ✨ Features

- 👻 **Detect Ghostly Dependencies**: Identify outdated and deprecated packages
- 💀 **Find Cursed Files**: Highlight problematic code with severity-based visualization
- 🗺️ **Generate Resurrection Plans**: Get detailed architecture proposals and migration strategies
- 📦 **Download Modern Scaffolds**: Start fresh with a modern project structure
- 🎭 **Toggle Spooky/Professional Mode**: Switch between Halloween theme and professional interface
- ♿ **Accessibility First**: High contrast mode, dyslexic-friendly fonts, keyboard navigation

## 🚀 Quick Start

### Fastest Way (5 minutes)

```bash
# 1. Install dependencies
npm install

# 2. Setup environment
cp .env.example .env

# 3. Verify setup
npm run verify

# 4. Start backend (terminal 1)
npm run dev:backend

# 5. Start frontend (terminal 2)
npm run dev:frontend
```

Visit [`http://localhost:3000`](http://localhost:3000) 🎉

**See [Quick Start](/docs/guide/quick-start.md) for detailed setup options.**

### Local Docker Deployment (Offline-Capable)

For privacy-sensitive codebases with local LLM support:

```bash
# Start all services (includes Ollama for local AI)
docker-compose up

# Pull the CodeLlama model (first time only)
docker exec -it haunted-ollama ollama pull codellama
```

Visit [`http://localhost:3000`](http://localhost:3000)

**Local deployment includes:**

- Ollama for offline LLM inference
- Larger, more accurate AI models (CodeLlama, Llama 3)
- Complete privacy - no internet required after setup
- Redis for caching

### Online Deployment (Railway)

- Free/public LLM APIs (Hugging Face Inference API)
- No API keys required
- Optimized for speed with smaller models
- Supports large file uploads and WebSockets

## 📦 Supported Archive Formats

- [`.7z`](https://www.7-zip.org/)
- `.zip`
- `.tar`, `.tar.gz`, `.tgz`
- `.tar.bz2`, `.tar.xz`

## 🛠️ Technology Stack

![](https://skills.syvixor.com/api/icons?perline=10&i=kiro,react,ts,vite,tailwind,d3,node,express,treesitter,websocket,prettier,eslint,typescript-eslint,ollama,huggingface,jest,redis,vitepress,swagger,docker,nginx)

**AI IDE**

- Kiro

**Frontend:**

- React + TypeScript
- Vite
- Tailwind CSS
- D3.js for visualizations

**Backend:**

- Node.js + Express
- TypeScript
- Tree-sitter for code parsing
- WebSocket for real-time updates

**Formatting:**

- Prettier
- Eslint
- typescript-eslint

**AI Integration:**

- **Local**: Ollama (CodeLlama, Llama 3)
- **Online**: Hugging Face Inference API (free tier)

**Testing:**

- Jest

**Storage:**

- Redis for caching
- File system for temporary storage

**Documentation:**

- VitePress
- [SwaggerUI](https://swagger.io/tools/swagger-ui/)

**Deployment:**

- **Online**: Railway
- **Local**: Docker

**Web Sever:**

- Nginx

## 🎨 Theme Customization

Toggle between modes in the header:

- **🎃 Spooky Mode**: Halloween-themed interface with cursed files and ghostly dependencies
- **💼 Professional Mode**: Clean, business-appropriate interface
- **🔆 High Contrast**: Better visibility for accessibility
- **Aa Font Toggle**: Switch between JetBrains Mono and OpenDyslexic

## 📚 API Documentation

Interactive API docs available at [`http://localhost:3001/api-docs`](http://localhost:3001/api-docs) when running the backend.

## 🧪 Testing

```bash
# Run all tests
npm test

# Run property-based tests
npm run test:properties

# Run with coverage
npm test -- --coverage
```

## 🔒 Security Best Practices

- Input validation on all uploads
- File size limits enforced
- Secure file extraction (prevents path traversal)
- CORS and Helmet.js configured
- No sensitive data in logs

## ♿ Accessibility

Haunted Refactorium prioritizes accessibility:

- ✓ Keyboard navigation throughout
- ✓ ARIA labels and semantic HTML
- ✓ Screen reader compatible
- ✓ High contrast mode
- ✓ Dyslexic-friendly font option
- ✓ Adjustable text sizes
- ✓ Color-blind friendly palettes

## 📖 Documentation

You may check out these links for how Kiro and I planned this project:

- [Product Overview](.kiro/steering/product.md)
- [Technology Stack](.kiro/steering/tech.md)
- [Project Structure](.kiro/steering/structure.md)
- [Modernization Strategy](.kiro/steering/modernization-strategy.md)
- [Tone and Voice Guidelines](.kiro/steering/tone-and-voice.md)

For official documentation of the app, you may view it on [GitHub](https://github.com/beatrix-chan/haunted-refactorium/tree/main/docs) (completely unorganized...) or [online](https://haunted-refactorium-production.up.railway.app/docs/).

## 🤝 Contributing

Contributions welcome! Please follow the existing code style and add tests for new features.

## 📄 License

Copyright &copy; 2025 Beatrix CHAN

This program is free software; you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation; either version 2 of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License for more details.

You should have received a copy of the GNU General Public License along with this program; if not, write to the Free Software Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301 USA.


## 🎃 Happy Haunting!

Transform your legacy code from cursed to blessed. Upload your codebase and let the spirits guide your modernization journey.


## Credits

> [!IMPORTANT]
> *Credits are not sponsors! They are just platforms that gave me resources to build this project.*

- [Railway](https://railway.com?referralCode=beatrix-chan) for online deployment: Use [this](https://railway.com?referralCode=beatrix-chan) link to grab $20 credits! That's worth a month of Pro tier.
- [Shields.io](https://shields.io/) for beautiful badges on this README
- [Devpost](https://devpost.com) where I found this hackathon.
- [Qwen/Qwen2.5-Coder-32B-Instruct](https://huggingface.co/Qwen/Qwen2.5-Coder-32B-Instruct) on HuggingFace as default model on online version.
- [CodeLlama](https://ollama.com/library/codellama) on Ollama as default model on local version.
- [Zen Browser](https://zen-browser.app/) for the quite testing environment.
- [OBS Studio](https://obsproject.com/) for recording.
- [Open Shot](https://www.openshot.org/) for video editing.
- [Fast Fetch](https://github.com/fastfetch-cli/fastfetch) and [Starship](https://starship.rs/) to customize my terminal so I don't feel annoyed when anything fails in my terminal.
- [React Developer Tool](https://react.dev/learn/react-developer-tools) for testing.
- [Skills icon](https://builder.syvixor.com/)