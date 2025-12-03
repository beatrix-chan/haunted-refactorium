# Code Analysis

Haunted Refactorium provides comprehensive code analysis to identify technical debt, code smells, and modernization opportunities.

## How It Works

The analysis engine scans your codebase through multiple passes:

1. **Technology Detection** - Identifies frameworks, libraries, and versions
2. **Dependency Analysis** - Checks for outdated or deprecated packages
3. **Code Parsing** - Analyzes code structure and patterns
4. **Smell Detection** - Identifies anti-patterns and bad practices
5. **Metrics Calculation** - Computes complexity and debt scores

## Technology Detection

### What Gets Detected

**JavaScript/TypeScript:**

- Frameworks (React, Angular, Vue, jQuery)
- Build tools (Webpack, Gulp, Grunt, Vite)
- Package managers (npm, Yarn, Bower)
- Testing frameworks (Jest, Mocha, Jasmine)

**Backend:**

- Node.js frameworks (Express, Fastify, Koa)
- PHP frameworks (Laravel, Symfony, CodeIgniter)
- Python frameworks (Django, Flask, FastAPI)

**Dependencies:**

- Parses `package.json`, `composer.json`, `requirements.txt`
- Checks version numbers
- Identifies deprecated packages
- Suggests modern alternatives

### Deprecation Detection

Automatically flags deprecated technologies:

- **jQuery** → Recommend React/Vue/vanilla JS
- **Bower** → Recommend npm/Yarn
- **TSLint** → Recommend ESLint
- **Moment.js** → Recommend date-fns/Day.js
- **Grunt/Gulp** → Recommend Vite/esbuild

## Code Smell Detection

### Deprecated Syntax

**`var` Usage:**

```javascript
// ❌ Detected as code smell
var x = 10;
var y = 20;

// ✅ Recommended
const x = 10;
let y = 20;
```

**Recommendation:** Replace with `const` or `let` for better scoping and immutability.

### Callback Hell

**Nested Callbacks:**

```javascript
// ❌ Detected as code smell
getData(function (a) {
  getMoreData(a, function (b) {
    getMoreData(b, function (c) {
      console.log(c);
    });
  });
});

// ✅ Recommended
const a = await getData();
const b = await getMoreData(a);
const c = await getMoreData(b);
console.log(c);
```

**Recommendation:** Refactor to use `async`/`await` for better readability.

### Long Functions

**Functions Over 200 Lines:**

```javascript
// ❌ Detected as code smell
function processEverything() {
  // 250 lines of code...
}

// ✅ Recommended
function processEverything() {
  validateInput();
  transformData();
  saveResults();
}

function validateInput() {
  /* ... */
}
function transformData() {
  /* ... */
}
function saveResults() {
  /* ... */
}
```

**Recommendation:** Break into smaller, focused functions.

### High Complexity

**Cyclomatic Complexity:**

```javascript
// ❌ High complexity (10+)
function processData(data) {
  if (data.type === 'A') {
    if (data.valid) {
      if (data.priority === 'high') {
        // nested logic...
      } else if (data.priority === 'medium') {
        // more nested logic...
      }
    }
  } else if (data.type === 'B') {
    // even more branches...
  }
}

// ✅ Lower complexity
function processData(data) {
  const processor = getProcessor(data.type);
  return processor.process(data);
}
```

**Recommendation:** Use strategy pattern or early returns to reduce complexity.

## Severity Levels

### Cursed (Critical)

- Security vulnerabilities
- Deprecated critical dependencies
- Breaking bugs
- Callback hell
- Extremely high complexity (20+)

**Action:** Fix immediately

### Haunted (High)

- Major code smells
- Outdated patterns
- Performance issues
- High complexity (10-20)

**Action:** Prioritize in next sprint

### Spooky (Medium)

- Minor code smells
- Style inconsistencies
- Minor optimizations
- Medium complexity (5-10)

**Action:** Address when refactoring

### Clean

- Well-written code
- Modern patterns
- Good practices
- Low complexity (<5)

**Action:** No changes needed

## Metrics Explained

### Technical Debt Score

**Scale:** 0-100 (higher is worse)

**Calculation:**

```
Score = (Code Smells × 2) + Average Complexity
```

**Interpretation:**

- **0-20:** Low debt, well-maintained
- **21-50:** Moderate debt, some refactoring needed
- **51-80:** High debt, significant refactoring required
- **81-100:** Critical debt, consider rewrite

### Cyclomatic Complexity

**Definition:** Number of independent paths through code

**Calculation:**

```
Complexity = 1 + (if statements) + (loops) + (switch cases) + (catch blocks)
```

**Guidelines:**

- **1-5:** Simple, easy to test
- **6-10:** Moderate, acceptable
- **11-20:** Complex, needs refactoring
- **21+:** Very complex, hard to maintain

### Average Complexity

Average cyclomatic complexity across all functions.

**Target:** Keep below 8 for maintainability

## Cursed Files

Files ranked by severity based on:

- Number of issues
- Complexity score
- File size
- Code smell density

**Example:**

```
app.js
├─ Severity: Cursed
├─ Issues: 15
├─ Complexity: 25
└─ Lines: 450
```

**Recommendation:** Prioritize refactoring these files first.

## Ghostly Dependencies

Deprecated or outdated packages that need updating.

**Example:**

```json
{
  "dependencies": {
    "jquery": "2.1.0", // Cursed - deprecated
    "moment": "2.24.0", // Haunted - outdated
    "lodash": "4.17.15" // Spooky - old version
  }
}
```

**Recommendations:**

- jQuery → React/Vue or vanilla JS
- Moment → date-fns or Day.js
- Lodash → Native methods or modern alternative

## Analysis Limitations

### What's Analyzed

- JavaScript/TypeScript files
- Package manifests (package.json, etc.)
- Common frameworks and libraries
- Code structure and patterns

### What's Not Analyzed (Yet)

- Runtime behavior
- Performance profiling
- Security vulnerabilities (use dedicated tools)
- Test coverage (run tests separately)
- Documentation quality

### File Limits

For performance, analysis is limited to:

- **Top 100 files** for detailed analysis
- **All files** for basic metrics
- **Configurable** in future versions

## Interpreting Results

### High Technical Debt

**Causes:**

- Legacy codebase
- Rapid development without refactoring
- Multiple developers with different styles
- Lack of code reviews

**Solutions:**

1. Prioritize cursed files
2. Fix high-severity issues first
3. Establish coding standards
4. Implement code reviews
5. Allocate refactoring time

### Many Code Smells

**Causes:**

- Outdated patterns
- Copy-paste programming
- Lack of testing
- Time pressure

**Solutions:**

1. Address one smell type at a time
2. Write tests before refactoring
3. Use linters (ESLint, Prettier)
4. Pair programming for knowledge sharing

### High Complexity

**Causes:**

- God functions
- Deep nesting
- Too many responsibilities
- Lack of abstraction

**Solutions:**

1. Extract smaller functions
2. Use early returns
3. Apply design patterns
4. Simplify conditionals

## Best Practices

### Before Analysis

1. **Clean up** - Remove unused files
2. **Update dependencies** - Run `npm update`
3. **Run linters** - Fix obvious issues
4. **Commit changes** - Have a clean baseline

### After Analysis

1. **Review results** - Understand the issues
2. **Prioritize** - Focus on cursed files first
3. **Plan refactoring** - Break into manageable tasks
4. **Write tests** - Before making changes
5. **Refactor incrementally** - Small, safe changes
6. **Re-analyze** - Track improvement

### Continuous Improvement

1. **Regular analysis** - Weekly or monthly
2. **Track metrics** - Monitor technical debt trend
3. **Set goals** - Target debt score reduction
4. **Celebrate wins** - Acknowledge improvements
5. **Share results** - Team visibility

## Next Steps

- [Architecture Proposals](/guide/architecture-proposals) - Get modernization plans
- [Quick Start](/guide/quick-start) - Run your first analysis
- [API Reference](/api/analysis) - Integrate analysis into your workflow
