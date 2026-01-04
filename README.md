# 🎃 Haunted Refactorium

![Kiroween 2025](https://img.shields.io/badge/Kiroween_Hackathon-2025-indigo?style=for-the-badge) [![License](https://img.shields.io/github/license/beatrix-chan/haunted-refactorium?style=for-the-badge&color=orange)](LICENSE)

![GitHub repo size](https://img.shields.io/github/repo-size/beatrix-chan/haunted-refactorium?style=for-the-badge) ![GitHub last commit](https://img.shields.io/github/last-commit/beatrix-chan/haunted-refactorium?style=for-the-badge)

![Kiroween](Kiroween.png)

**Where legacy code goes to be resurrected**

Haunted Refactorium is a web application that analyzes legacy codebases to identify code smells, outdated patterns, and technical debt. It provides spooky-themed visualizations of problem areas and generates actionable modernization plans.

- [3 Minute Features Video](https://youtu.be/0uK8QGzIIyk)
- [Haunted Refactorium (app)](https://haunted-refactorium.onrender.com/)
- [Haunted Refactorium (documentation)](https://haunted-refactorium.onrender.com/docs/)
- [Haunted Refactorium (api reference)](https://haunted-refactorium.onrender.com/api-docs/)

<details>

<summary>Table of Contents</summary>

- [📖 Project Story](#-project-story)
  - [Inspiration](#inspiration)
  - [What it does](#what-it-does)
  - [How I built it](#how-i-built-it)
  - [Challenges I ran into](#challenges-i-ran-into)
  - [Accomplishments that I'm proud of](#accomplishments-that-im-proud-of)
  - [What I learned](#what-i-learned)
  - [What's next for Haunted Refactorium](#whats-next-for-haunted-refactorium)
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

## 📖 Project Story

### Inspiration

The inspiration came from an outdated JavaScript Library called jQuery. Although jQuery's the library itself is still [active](https://github.com/jquery/jquery/commits/main/) and they have mentioned that they will be [releasing jQuery version 4.0 soon](https://jquery.com/support/), their [last release was in 2023](https://github.com/jquery/jquery/releases/tag/3.7.1). Scrolling down in jQuery's homepage, the other jQuery's project include jQuery UI and jQuery Mobile, but they are already in maintence-only and deprecated status. jQuery is a lightweight library but it has existed for too long and considering the main library's last release was two year ago (in terms of version 4 release, it might be more than two years ago), their dependency packages probably revolved a lot too. So I was thinking: "What if there is an app that can analysis a code base, provide result about the problems the code base has (overall issues and specific file issues), give a proper proposal how to keep the code base up to date with a plan how to upgrade everything, and user has the option to export the result? With the skills level I have now, there is no way I can write this whole thing by myself - I won't have enough time to learn everything and I won't have enough time, and I believed that it's time to use Kiro to make an impact.

### What it does

Haunted Refactorium transforms the often tedious process of reviewing legacy code into a more engaging experience - particularly fitting for the Halloween season. Rather than simply cataloging issues, it immerses you in a setting where problematic files are labeled as “cursed,” outdated dependencies become “ghostly,” and tangled code is flagged as “haunted hotspots.” The tool also provides a severity scale, ranging from “spooky” to “cursed,” so you can prioritize what requires immediate attention.

Beyond merely identifying issues, Haunted Refactorium delivers actionable guidance for modernizing your codebase. It suggests architectural improvements and supplies downloadable scaffolds to support your refactoring efforts. You have the flexibility to run it online through Railway for a swift analysis, or maintain complete privacy by operating it locally with Docker and Ollama which is ideal for sensitive projects that must remain offline.

### How I built it

First, I sat down to brainstorm all the features I wanted, considered the tech stack, and ensured the project would be inclusive. Following that, I discussed the details with Kiro to finalize the specifications so we’d have a clear starting point. We maintained an ongoing dialogue, delving further into steering documents and refining specific features, project flow, and routing. Once those elements were in place, I immediately began coding alongside Kiro. Since Kiro had already developed much of the codebase, I was able to proceed directly to testing. Over the next few days, I continued refining the AI integration, introduced additional features, and updated the routing to ensure smooth connectivity between the documentation and API reference. Honestly, I’ve never dedicated this much time to planning before building anything, it’s a different pace for me.

### Challenges I ran into

Kiro is very smart, so it created some mock output, the problem is that these mock outputs overrode the [Qwen/Qwen2.5-Coder-32B-Instruct](https://huggingface.co/Qwen/Qwen2.5-Coder-32B-Instruct) HuggingFace AI instruction, so no matter the repository language is written in JavaScript, Java, C#, Python, Go, or Rust, it would still return recommended tech stacks like react, typescript, etc. So we did a little bit to adjustment until we finally got every detection correctly, recommended stacks correctly, and every proposal is tailored for each repository. But we ran into another problem: it has wrong detection between Java and JavaScript, and some repository that uses multiple languages (e.g. Go + JavaScript, C + JavaScript), it only scans the JavaScript files and completely missed out the other languages. This took quite a relatively long time to fix. I have also encountered a lot of build fails and deployment crashes while deploying the app to Railway.

### Accomplishments that I'm proud of

I seriously think participating in Kiroween is already a big enough accomplishment because this is the first hackathon in my life. This web app overall is very powerful and I'm really proud I had the courage to participate in this hackathon and create this web app with Kiro.

### What I learned

This project helped me strengthen my knowledge in implementing REST API and routing. Because the first time I have to run Haunted Refactorium, I need three terminals to run `npm run dev:frontend`, `npm run dev:backend`, and `npm run docs:dev` separately, so they end up running on three different ports. It took me quite awhile to figure out how to redirect and connecting them with each other because during deployment, it will be a big pain to deploy to three different platforms and with three different links. I have also encountered that the routings works locally, but after deployment it failed, so the continuous fix really helped me to understand REST API better.

### What's next for Haunted Refactorium

There are actually some features that I wasn't able to implement even though I had planned with Kiro, and the biggest part is internationalization. I talked about inclusiveness above and I wanted to provide Haunted Refactorium in multiple languages so developer all over the world can use it without language barriers. Hopefully, Haunted Refactorium can support self-hosted git repositories as well instead of archive upload.

I also have to workout to find alternative platforms where I can host Haunted Refactorium because the free tier will end in 30 days. I will need a platform that can handle the frontend and backend without any file size issues, and it has to be able to run the app, documentation, and api reference smoothly together.

Another ongoing issue is the AI-integration, right now the online version is using free tier HuggingFace model as well and the local version is using Ollama. But I want in the future to maybe allow users to use specific API keys maybe from OpenAI and Claude, so that they can have more accurate result.

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

![](https://skills.syvixor.com/api/icons?perline=11&i=kiro,react,ts,vite,tailwind,d3,node,express,treesitter,websocket,prettier,eslint,typescript-eslint,ollama,huggingface,jest,redis,vitepress,swagger,railway,docker,nginx,render)

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

- **Online**: Railway, Render
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

Copyright &copy; 2026 Beatrix CHAN

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
- [React Developer Tool](https://react.dev/learn/react-developer-tools)
- [Skills icon](https://builder.syvixor.com/)
- [Render](https://render.com/) so I can redeploy my app online!
