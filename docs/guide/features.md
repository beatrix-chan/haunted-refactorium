# Features

Haunted Refactorium provides comprehensive code analysis and modernization tools with a unique spooky twist.

## 🔗 Input Methods

### GitHub Repository Cloning

- Paste any repository URL that supports [Git Hosting](https://git-scm.com/tools/hosting)
- Automatic shallow cloning for faster downloads
- No manual download required
- Works with public repositories

### File Upload

- Support for multiple archive formats
- [`.7z`](https://www.7-zip.org/), `.zip`, `.tar`, `.tar.gz`, and more
- Drag-and-drop interface
- Up to 100MB file size

## 👻 Code Analysis

### Technology Detection

- Automatic framework and library identification
- Version detection from `package.json`, `composer.json`, etc.
- Deprecation status checking
- Severity-based classification

### Code Smell Detection

- **Deprecated Syntax**: `var` usage, old patterns
- **Callback Hell**: Nested callback detection
- **Long Functions**: Functions exceeding 200 lines
- **High Complexity**: Cyclomatic complexity analysis
- **Anti-patterns**: Common code smells and bad practices

### Dependency Analysis

- Outdated package detection
- Deprecated dependency identification
- Security vulnerability awareness
- Modern alternative suggestions

## 📊 Visualization

### Metrics Dashboard

- Total files and lines of code
- Average complexity scores
- Technical debt score (0-100)
- Language distribution

### Cursed Files

- Files ranked by severity
- Issue count per file
- Complexity metrics
- Line count statistics

### Ghostly Dependencies

- Deprecated packages highlighted
- Version information
- Severity indicators
- Replacement recommendations

### Code Smells List

- Detailed issue descriptions
- File and line locations
- Actionable recommendations
- Severity classification

## 🗺️ Architecture Proposals

### Stack Comparison

- Current technology stack
- Proposed modern alternatives
- Side-by-side comparison
- Clear upgrade paths

### Migration Strategy

- AI-generated approach
- Incremental migration patterns
- Risk assessment
- Best practices

### Implementation Phases

- Broken down by priority
- Detailed task lists
- Time estimates
- Dependencies identified

### Effort Estimation

- Based on codebase size
- Complexity consideration
- Technical debt factor
- Realistic timelines

## 📦 Scaffold Generation

### Modern Project Structure

- Pre-configured `package.json`
- TypeScript configuration
- Vite build setup
- ESLint and Prettier configs

### Framework Setup

- React + TypeScript
- Tailwind CSS
- Testing framework
- Development tools

### Best Practices

- Proper folder structure
- Configuration files
- Environment setup
- Documentation templates

## 🎭 Theme Customization

### Spooky Mode (Default)

- Halloween-themed colors
- Spooky terminology
- Animated elements
- Fun but functional

### Professional Mode

- Business-appropriate language
- Clean interface
- Same functionality
- Formal presentation

### Accessibility Options

- **High Contrast Mode**: Enhanced visibility
- **Font Selection**: JetBrains Mono or OpenDyslexic
- **Keyboard Navigation**: Full keyboard support
- **Screen Reader**: ARIA labels throughout

## ♿ Accessibility Features

### Visual Accessibility

- WCAG AA compliant color contrast
- High contrast mode toggle
- Adjustable text sizes
- Clear focus indicators

### Navigation

- Full keyboard navigation
- Logical tab order
- Skip navigation links
- Escape key support

### Screen Readers

- Semantic HTML throughout
- ARIA labels on all interactive elements
- Status announcements
- Descriptive alt text

### Font Options

- JetBrains Mono (default)
- OpenDyslexic (accessibility option)
- Consistent sizing
- Readable line heights

## 🤖 AI Integration

### Local Deployment (Ollama)

- Complete offline capability
- Large, accurate models (CodeLlama, Llama 3)
- Full privacy - no external calls
- Self-hosted infrastructure

### Online Deployment (Hugging Face)

- Free/public API access
- No API keys required
- Faster, smaller models
- Cloud-based processing

### Fallback System

- Template-based generation
- Works without AI
- Consistent output
- Reliable results

## 📡 Real-Time Updates

### WebSocket Support

- Live progress updates
- Analysis status changes
- Real-time notifications
- Instant feedback

### Progress Tracking

- Percentage completion
- Current phase indication
- Estimated time remaining
- Status messages

## 🔒 Security & Privacy

### Input Validation

- File size limits
- Format verification
- Path traversal prevention
- Malicious file detection

### Data Privacy

- **Local Mode**: All data stays on-premise
- **Online Mode**: Code sent to public APIs only
- Temporary file cleanup
- No persistent storage

### API Security

- CORS configuration
- Helmet.js headers
- Input sanitization
- Error handling

## 📚 Documentation

### Interactive API Docs

- Swagger/OpenAPI specification
- Try endpoints directly
- Request/response examples
- Authentication details

### Comprehensive Guides

- Getting started tutorials
- Deployment instructions
- API reference
- Troubleshooting tips

### Code Examples

- cURL commands
- JavaScript/TypeScript
- Python
- Multiple languages

## 🚀 Deployment Options

### Local Development

- Quick setup (5 minutes)
- Hot reload
- Development tools
- Easy debugging

### Docker Deployment

- Complete offline capability
- Local AI models
- All services included
- Production-ready

### Railway Deployment

- Cloud hosting
- Auto-scaling
- GitHub integration
- Free tier available

## 🧪 Testing Support

### Unit Tests

- Jest framework
- TypeScript support
- Code coverage
- Fast execution

### Property-Based Tests

- fast-check library
- Correctness verification
- Edge case discovery
- Robust validation

### Integration Tests

- End-to-end scenarios
- API testing
- Component testing
- Real-world workflows

## 📈 Performance

### Backend Optimization

- Redis caching
- Async processing
- Streaming responses
- Limited file scanning

### Frontend Optimization

- Code splitting
- Lazy loading
- Memoization
- Optimized bundles

### Analysis Speed

- Shallow git clones
- Parallel processing
- Incremental results
- Smart caching

## 🌍 Future Features

### Planned Enhancements

- Interactive dependency graphs (D3.js)
- Diff view for proposed changes
- Custom rule configuration
- Multi-language i18n support
- GitHub integration
- CI/CD integration
- Historical tracking
- Team collaboration

### Community Requests

- More language parsers
- Plugin system
- Advanced caching
- Database persistence
- Queue system for long analyses

## Next Steps

- [Quick Start](/guide/quick-start) - Try these features now
- [API Reference](/api/overview) - Integrate with your tools
- [Contributing](https://github.com/beatrix-chan/haunted-refactorium/blob/main/CONTRIBUTING.md) - Help add new features
