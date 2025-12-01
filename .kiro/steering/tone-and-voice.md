---
inclusion: always
---

# Tone and Voice Guidelines

This document defines how Haunted Refactorium communicates with users - balancing spooky theming with professional developer needs.

## Core Principle: Fun but Functional

The Halloween theme should enhance the experience, not obscure the technical content. Developers need clear, actionable information - the spooky elements are flavor, not substance.

## When to Be Spooky 👻

### User-Facing UI Elements (High Spookiness)
- **Navigation labels**: "Haunt a Repo", "Summon Analysis", "Exorcise Code Smells"
- **Status messages**: "Spirits are analyzing...", "Conjuring architecture proposal..."
- **Severity levels**: "Cursed" (critical), "Haunted" (high), "Spooky" (medium), "Clean" (no issues)
- **Feature names**: "Ghostly Dependencies", "Cursed Files", "Haunted Hotspots"
- **Error messages**: "The spirits couldn't reach that repository", "This archive is too cursed to open"
- **Success messages**: "Your codebase has been successfully haunted!", "The spirits have spoken!"
- **Loading states**: "Summoning the spirits...", "Consulting the ancient tomes..."

### Visual Elements (High Spookiness)
- Icons: ghosts, skulls, cobwebs, bats, haunted houses
- Animations: floating ghosts, flickering effects, eerie transitions
- Color scheme: dark purples, oranges, greens with spooky accents
- Illustrations: haunted code snippets, ghostly dependency graphs

## When to Be Serious 🎯

### Technical Documentation (Low/No Spookiness)
- **API documentation**: Clear, professional, standard REST/OpenAPI terminology
- **Code comments**: Straightforward explanations, no metaphors
- **Error logs**: Technical details, stack traces, debugging information
- **Architecture diagrams**: Professional labels, standard notation
- **Migration guides**: Clear step-by-step instructions
- **Code examples**: Clean, well-commented, production-ready

### Analysis Results (Balanced)
- **Issue descriptions**: Clear technical explanation with optional spooky flavor
  - ✅ "This function has high cyclomatic complexity (cursed level: 8/10)"
  - ❌ "The spirits sense dark magic in this function" (too vague)
- **Recommendations**: Actionable technical advice first, theme second
  - ✅ "Replace jQuery with vanilla JavaScript or React (exorcise this ancient dependency)"
  - ❌ "Banish the jQuery demon!" (not helpful)

### Developer-Facing Content (Low Spookiness)
- **Contributing guidelines**: Professional, welcoming, clear
- **Setup instructions**: Step-by-step, no metaphors
- **Troubleshooting guides**: Direct, solution-focused
- **Changelog**: Standard format, clear version history
- **README**: Professional with subtle theming

## Tone Guidelines by Section

### Landing Page / Marketing
**Tone**: Playful, engaging, spooky
- "Haunted Refactorium: Where legacy code goes to be resurrected"
- "We haunt your repos to reveal cursed code and guide their resurrection"
- Use Halloween metaphors freely
- Make it fun and memorable

### Analysis Dashboard
**Tone**: Balanced - spooky labels, serious content
- Labels: "Cursed Files", "Ghostly Dependencies", "Haunted Hotspots"
- Content: Clear metrics, actionable insights, technical details
- Example: "5 Cursed Files detected (critical issues requiring immediate attention)"

### Technical Reports
**Tone**: Professional with subtle theming
- Use standard technical terminology
- Spooky elements only in section headers or severity labels
- Focus on clarity and actionability
- Example: "Code Quality Analysis" not "Séance Results"

### Error Messages
**Tone**: Helpful with spooky flavor
- Always provide clear explanation of what went wrong
- Suggest concrete next steps
- Spooky wrapper is optional
- ✅ "The spirits couldn't clone this repository. Please check the URL and ensure it's publicly accessible."
- ❌ "The spirits are confused!" (not helpful)

### API Responses
**Tone**: Professional, standard JSON
- Use standard field names: `status`, `error`, `message`, `data`
- No spooky field names in API responses
- Keep it predictable and parseable
- Spooky content can be in message strings, not structure

## Writing Style

### Do:
- Use active voice
- Be concise and clear
- Provide actionable recommendations
- Use technical terms correctly
- Add spooky flavor to enhance, not replace, meaning
- Consider accessibility (screen readers should understand content)

### Don't:
- Sacrifice clarity for theme
- Use obscure Halloween references that confuse meaning
- Make jokes in error messages that hide the actual problem
- Use spooky metaphors in code or technical documentation
- Overuse exclamation points!!!
- Be condescending or dismissive

## Accessibility Considerations

- **Screen readers**: Ensure spooky labels have clear ARIA descriptions
  - Visual: "👻 Ghostly Dependencies"
  - ARIA: "Outdated Dependencies"
- **Tooltips**: Provide plain-language explanations for themed terms
- **Documentation**: Always include non-themed alternative explanations
- **Internationalization**: Spooky terms should translate well or have cultural alternatives

## Examples of Good Balance

### Good: Clear + Spooky
```
🎃 Cursed Files Detected
5 files have critical issues requiring immediate attention:
- auth.js: High cyclomatic complexity (15)
- database.js: SQL injection vulnerability
- utils.js: Deprecated API usage
```

### Bad: Too Vague
```
👻 The spirits sense darkness!
Your code is haunted by evil forces.
Perform an exorcism immediately!
```

### Good: Professional with Flavor
```
Migration Guide: Exorcising jQuery
Step 1: Identify jQuery usage patterns
Step 2: Replace with vanilla JavaScript or React
Step 3: Update event handlers
Step 4: Test thoroughly
```

### Bad: Too Serious (Missing Theme)
```
Dependency Update Recommendations
The following packages should be updated:
- jquery: 2.1.0 → 3.7.1
```

## Severity Level Language

### Cursed (Critical)
- "This file is cursed with critical issues"
- "Immediate exorcism required"
- Use for: Security vulnerabilities, breaking bugs, deprecated critical dependencies

### Haunted (High)
- "This code is haunted by serious issues"
- "Refactoring strongly recommended"
- Use for: Major code smells, outdated patterns, performance issues

### Spooky (Medium)
- "Something spooky lurks in this code"
- "Consider refactoring when possible"
- Use for: Minor code smells, style inconsistencies, minor optimizations

### Clean (No Issues)
- "This code is clean and free of spirits"
- "No issues detected"
- Use for: Well-written, modern code

## Localization Considerations

When translating to other languages:
- Halloween themes may not translate culturally
- Provide culturally appropriate alternatives
- Keep technical terms consistent across languages
- Ensure spooky metaphors make sense in target language
- Consider "Professional Mode" toggle for users who prefer no theming

## Summary

**The Golden Rule**: If a developer can't understand what action to take because of the spooky theming, we've gone too far. Theme enhances, never obscures.
