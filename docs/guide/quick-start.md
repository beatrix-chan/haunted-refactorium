# Quick Start

Get up and running with your first code analysis in minutes.

## Step 1: Start the Application

Choose your preferred method:

::: code-group

```bash [Development]
# Terminal 1
npm run dev:backend

# Terminal 2
npm run dev:frontend
```

```bash [Docker]
docker-compose up -d
docker exec -it haunted-ollama ollama pull codellama
```

:::

Visit http://localhost:3000

## Step 2: Choose Input Method

You have two options for providing code to analyze:

### Option A: GitHub Repository URL

1. Click the **🔗 GitHub URL** tab
2. Enter a repository URL:
   ```
   https://github.com/jquery/jquery
   ```
3. Click **🔮 Begin the Haunting**

### Option B: Upload Archive

1. Click the **📦 Upload File** tab
2. Select a `.zip`, `.tar`, or `.tar.gz` file
3. Click **🔮 Begin the Haunting**

::: tip
For testing, try analyzing a legacy jQuery project or an old PHP application to see the full power of the analysis.
:::

## Step 3: View Analysis Results

After a few seconds, you'll see:

### Metrics Overview
- Total files and lines of code
- Code smells detected
- Technical debt score

### Ghostly Dependencies 👻
Deprecated packages that need updating:
- jQuery 2.x → Modern framework
- Bower → npm/yarn
- TSLint → ESLint

### Cursed Files 💀
Files with the most issues:
- High complexity
- Multiple code smells
- Severity ratings (Cursed/Haunted/Spooky)

### Code Smells 🕷️
Specific issues with recommendations:
- `var` usage → Use `const`/`let`
- Callback hell → Use `async`/`await`
- Long functions → Break into smaller pieces

## Step 4: Generate Architecture Proposal

Click **⚡ Generate Resurrection Plan** to get:

### Stack Comparison
- **Current**: jQuery, PHP, MySQL
- **Proposed**: React, TypeScript, Node.js, PostgreSQL

### Migration Strategy
AI-generated approach for incremental migration

### Implementation Phases
Detailed tasks broken down by priority:
1. **Setup & Planning** (High priority)
2. **Core Migration** (High priority)
3. **Refinement** (Medium priority)

### Effort Estimation
Time estimate based on codebase size and complexity

## Step 5: Download Scaffold

Click **📦 Download Scaffold** to get:
- Modern project structure
- Pre-configured `package.json`
- TypeScript configuration
- Vite build setup
- Basic React components

## Customizing the Experience

### Toggle Theme Mode

In the header, click:
- **🎃 Spooky** ↔ **💼 Professional** - Switch between Halloween and business themes
- **🔆 High Contrast** - Increase visibility
- **Aa Font** - Switch between JetBrains Mono and OpenDyslexic

### Keyboard Navigation

- `Tab` - Navigate between elements
- `Enter` - Activate buttons
- `Escape` - Close modals

## Example: Analyzing a Legacy Project

Let's analyze a real legacy codebase:

```bash
# Clone a legacy jQuery project
git clone https://github.com/jquery/jquery-ui.git
cd jquery-ui
zip -r jquery-ui.zip .

# Upload to Haunted Refactorium
# Or use the GitHub URL directly:
# https://github.com/jquery/jquery-ui
```

**Expected Results:**
- Detects jQuery as ghostly dependency
- Identifies deprecated patterns
- Recommends migration to React/Vue
- Generates modern scaffold

## Tips for Best Results

### For Accurate Analysis
- Upload complete projects (not just snippets)
- Include `package.json` for dependency detection
- Larger codebases take longer but provide better insights

### For GitHub Repos
- Public repositories work out of the box
- Private repos require authentication (coming soon)
- Large repos may take 1-2 minutes to clone

### For Archive Files
- Keep archives under 100MB for best performance
- Supported formats: `.zip`, `.tar`, `.tar.gz`, `.7z`
- Extract nested archives before uploading

## What's Next?

- [Code Analysis](/guide/code-analysis) - Deep dive into analysis features
- [Architecture Proposals](/guide/architecture-proposals) - Understanding AI recommendations
- [Theme Customization](/guide/theme-customization) - Personalize your experience
- [API Reference](/api/overview) - Integrate with your workflow

## Troubleshooting

### Analysis Takes Too Long
- Large codebases (>1000 files) may take 2-3 minutes
- Check browser console for errors
- Try a smaller test project first

### GitHub Clone Fails
- Verify the URL is correct
- Ensure repository is public
- Check internet connection

### Upload Fails
- Check file size (max 100MB)
- Verify archive format is supported
- Try extracting and re-zipping

Need more help? Check the [full documentation](/guide/getting-started) or open an issue on GitHub.
