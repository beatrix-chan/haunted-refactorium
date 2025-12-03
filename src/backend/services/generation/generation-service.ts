import { ArchitectureProposal, AnalysisResult, MigrationPhase, StackItem } from '../../../shared/types';
import { createLLMService } from '../llm/llm-service';
import {
  getJavaPhases,
  getGoPhases,
  getRustPhases,
  getRubyPhases,
  getCSharpPhases,
  getSwiftPhases,
  getKotlinPhases,
} from './migration-phases';

export class GenerationService {
  private llmService = createLLMService();

  async generateArchitectureProposal(analysis: AnalysisResult): Promise<ArchitectureProposal> {
    const currentStack = this.extractCurrentStackWithIssues(analysis);
    const currentStackNames = currentStack.map(s => s.name);
    const proposedStack = this.proposeModernStack(currentStackNames);

    console.log('🔍 Generating proposal for stack:', currentStackNames.join(', '));
    console.log('💡 Proposed stack:', proposedStack.join(', '));

    const migrationStrategy = await this.llmService.generateMigrationGuide(
      currentStackNames,
      proposedStack
    );
    const phases = this.generateMigrationPhases(currentStackNames, proposedStack);

    return {
      id: `arch-${Date.now()}`,
      analysisId: analysis.id,
      currentStack,
      proposedStack,
      migrationStrategy,
      phases,
      estimatedEffort: this.estimateEffort(analysis),
    };
  }

  private extractCurrentStackWithIssues(analysis: AnalysisResult): Array<{ name: string; version?: string; issue?: string }> {
    const stack: Array<{ name: string; version?: string; issue?: string }> = [];
    const seenNames = new Set<string>();

    // First, add technologies with actual issues (deprecated, cursed, haunted, spooky)
    for (const tech of analysis.technologies) {
      const lowerName = tech.name.toLowerCase();
      if (seenNames.has(lowerName)) continue;
      seenNames.add(lowerName);

      const item: { name: string; version?: string; issue?: string } = {
        name: tech.name,
        version: tech.version,
      };

      // Determine the issue based on severity and deprecation
      if (tech.deprecated) {
        item.issue = 'Deprecated and no longer maintained';
      } else if (tech.severity === 'cursed') {
        item.issue = 'Critical security vulnerabilities or major issues';
      } else if (tech.severity === 'haunted') {
        item.issue = 'Outdated version with known issues';
      } else if (tech.severity === 'spooky') {
        item.issue = 'Minor updates available';
      } else {
        // Clean - no issues, mark as up-to-date
        item.issue = '✓ Up to date';
      }

      stack.push(item);
    }

    // Add ghostly dependencies (deprecated packages)
    for (const dep of analysis.ghostlyDependencies) {
      const lowerName = dep.name.toLowerCase();
      if (seenNames.has(lowerName)) continue;
      seenNames.add(lowerName);

      stack.push({
        name: dep.name,
        version: dep.version,
        issue: 'Deprecated dependency - should be replaced',
      });
    }

    // Add code smells as issues
    const codeSmellSummary = this.summarizeCodeSmells(analysis);
    if (codeSmellSummary) {
      stack.push({
        name: 'Code Quality',
        issue: codeSmellSummary,
      });
    }

    // If no technologies detected, try to infer from cursed files
    if (stack.length === 0) {
      const languages = this.detectPrimaryLanguage(analysis);
      for (const lang of languages) {
        stack.push({
          name: lang,
          issue: 'Legacy patterns detected',
        });
      }
    }

    // If still nothing, add generic entry
    if (stack.length === 0) {
      stack.push({
        name: 'Legacy Code',
        issue: 'Requires modernization',
      });
    }

    // Sort: issues first, then clean items
    return stack.sort((a, b) => {
      const aHasIssue = a.issue && !a.issue.startsWith('✓');
      const bHasIssue = b.issue && !b.issue.startsWith('✓');
      if (aHasIssue && !bHasIssue) return -1;
      if (!aHasIssue && bHasIssue) return 1;
      return 0;
    });
  }

  private summarizeCodeSmells(analysis: AnalysisResult): string | undefined {
    const smells = analysis.codeSmells;
    if (smells.length === 0) return undefined;

    const cursedCount = smells.filter(s => s.severity === 'cursed').length;
    const hauntedCount = smells.filter(s => s.severity === 'haunted').length;
    const spookyCount = smells.filter(s => s.severity === 'spooky').length;

    const parts: string[] = [];
    if (cursedCount > 0) parts.push(`${cursedCount} critical`);
    if (hauntedCount > 0) parts.push(`${hauntedCount} major`);
    if (spookyCount > 0) parts.push(`${spookyCount} minor`);

    if (parts.length === 0) return undefined;
    return `${parts.join(', ')} issue${smells.length > 1 ? 's' : ''} detected`;
  }

  private extractCurrentStack(analysis: AnalysisResult): string[] {
    const stack: string[] = [];

    // First, add all detected technologies (including languages)
    for (const tech of analysis.technologies) {
      stack.push(tech.name);
    }

    // If no technologies detected, try to infer from cursed files
    if (stack.length === 0) {
      const languages = this.detectPrimaryLanguage(analysis);
      stack.push(...languages);
    }

    return stack.length > 0 ? stack : ['Legacy Code'];
  }

  private detectPrimaryLanguage(analysis: AnalysisResult): string[] {
    const languages: string[] = [];
    
    // Check code smells for language hints
    const hasJSPatterns = analysis.codeSmells.some(s => 
      s.type === 'deprecated-syntax' || s.type === 'callback-hell'
    );
    
    if (hasJSPatterns) {
      languages.push('JavaScript');
    }
    
    // Check file extensions from cursed files
    const fileChecks = [
      { pattern: /\.py$/, lang: 'Python' },
      { pattern: /\.(js|jsx|ts|tsx)$/, lang: 'JavaScript' },
      { pattern: /\.php$/, lang: 'PHP' },
      { pattern: /\.java$/, lang: 'Java' },
      { pattern: /\.go$/, lang: 'Go' },
      { pattern: /\.rs$/, lang: 'Rust' },
      { pattern: /\.rb$/, lang: 'Ruby' },
      { pattern: /\.(c|cpp|cc|cxx|h|hpp)$/, lang: 'C/C++' },
      { pattern: /\.cs$/, lang: 'C#' },
      { pattern: /\.swift$/, lang: 'Swift' },
      { pattern: /\.(kt|kts)$/, lang: 'Kotlin' },
      { pattern: /\.hs$/, lang: 'Haskell' },
      { pattern: /\.zig$/, lang: 'Zig' },
    ];
    
    for (const check of fileChecks) {
      if (analysis.cursedFiles.some(f => check.pattern.test(f.path))) {
        languages.push(check.lang);
      }
    }
    
    return languages;
  }

  private proposeModernStack(currentStack: string[]): string[] {
    const stackStr = currentStack.join(' ').toLowerCase();
    
    // Swift projects (iOS/macOS)
    if (stackStr.includes('swift')) {
      return ['Swift 5.10+', 'SwiftUI', 'Combine', 'Swift Package Manager', 'XCTest'];
    }
    
    // Python-based projects
    if (stackStr.includes('python') || stackStr.includes('django') || stackStr.includes('flask') || stackStr.includes('streamlit')) {
      const proposed = ['Python 3.12+'];
      
      if (stackStr.includes('streamlit')) {
        proposed.push('Streamlit (latest)', 'Plotly', 'Pandas', 'Poetry');
      } else if (stackStr.includes('django')) {
        proposed.push('Django 5.x', 'Django REST Framework', 'PostgreSQL', 'Poetry');
      } else if (stackStr.includes('flask')) {
        proposed.push('FastAPI', 'Pydantic', 'SQLAlchemy', 'PostgreSQL', 'Poetry');
      } else {
        proposed.push('FastAPI', 'Pydantic', 'PostgreSQL', 'Poetry');
      }
      
      return proposed;
    }
    
    // Swift projects (check before Java since it might contain 'java' in package names)
    if (stackStr.includes('swift')) {
      return ['Swift 5.10+', 'SwiftUI', 'Combine', 'Swift Package Manager', 'XCTest'];
    }
    
    // Java projects
    if (stackStr.includes('java')) {
      return ['Java 21 LTS', 'Spring Boot 3.x', 'Maven/Gradle', 'PostgreSQL', 'JUnit 5'];
    }
    
    // Go projects
    if (stackStr.includes('go') || stackStr.includes('golang')) {
      return ['Go 1.22+', 'Gin or Echo', 'GORM', 'PostgreSQL', 'Testify'];
    }
    
    // Rust projects
    if (stackStr.includes('rust')) {
      return ['Rust (latest stable)', 'Actix-web or Axum', 'Diesel or SQLx', 'PostgreSQL'];
    }
    
    // Ruby projects
    if (stackStr.includes('ruby') || stackStr.includes('rails')) {
      return ['Ruby 3.3+', 'Rails 7.x', 'PostgreSQL', 'RSpec', 'Bundler'];
    }
    
    // C# projects
    if (stackStr.includes('c#') || stackStr.includes('csharp') || stackStr.includes('.net')) {
      return ['.NET 8', 'ASP.NET Core', 'Entity Framework Core', 'PostgreSQL', 'xUnit'];
    }
    
    // Kotlin projects
    if (stackStr.includes('kotlin')) {
      return ['Kotlin 1.9+', 'Ktor or Spring Boot', 'Exposed or Room', 'PostgreSQL'];
    }
    
    // PHP projects
    if (stackStr.includes('php')) {
      return ['PHP 8.3+', 'Laravel 11', 'Composer', 'PostgreSQL', 'PHPUnit'];
    }
    
    // Electron projects
    if (stackStr.includes('electron')) {
      return ['Electron (latest)', 'TypeScript', 'Vite', 'React or Vue', 'Tailwind CSS'];
    }
    
    // JavaScript/Node.js projects (default)
    const hasBackend = stackStr.includes('express') || stackStr.includes('node');
    const proposed = ['React', 'TypeScript', 'Vite', 'Tailwind CSS'];

    if (hasBackend) {
      proposed.push('Node.js 20+', 'Express', 'Prisma', 'PostgreSQL');
    }

    return proposed;
  }

  private generateMigrationPhases(current: string[], proposed: string[]): MigrationPhase[] {
    const stackStr = current.join(' ').toLowerCase();
    
    // Check for each language (order matters - check most specific first)
    if (stackStr.includes('swift')) {
      return getSwiftPhases();
    }
    
    if (stackStr.includes('kotlin')) {
      return getKotlinPhases();
    }
    
    if (stackStr.includes('rust')) {
      return getRustPhases();
    }
    
    if (stackStr.includes('go') || stackStr.includes('golang')) {
      return getGoPhases();
    }
    
    if (stackStr.includes('java')) {
      return getJavaPhases();
    }
    
    if (stackStr.includes('ruby') || stackStr.includes('rails')) {
      return getRubyPhases();
    }
    
    if (stackStr.includes('c#') || stackStr.includes('csharp') || stackStr.includes('.net')) {
      return getCSharpPhases();
    }
    
    const isPython = stackStr.includes('python') || stackStr.includes('django') || stackStr.includes('flask') || stackStr.includes('streamlit');
    const isElectron = stackStr.includes('electron');
    const isPHP = stackStr.includes('php');
    
    // Python-specific phases
    if (isPython) {
      return [
        {
          phase: 1,
          title: 'Setup & Planning',
          description: 'Prepare the Python environment and tooling',
          tasks: [
            'Set up Python 3.11+ virtual environment',
            'Configure poetry or pip-tools for dependency management',
            'Set up pytest and coverage tools',
            'Configure black, isort, and mypy for code quality',
            'Set up pre-commit hooks',
          ],
          priority: 'high',
        },
        {
          phase: 2,
          title: 'Core Migration',
          description: 'Modernize Python code and dependencies',
          tasks: [
            'Update to latest framework versions',
            'Add type hints throughout codebase',
            'Refactor long functions and complex logic',
            'Implement async/await where beneficial',
            'Add comprehensive unit tests',
          ],
          priority: 'high',
        },
        {
          phase: 3,
          title: 'Refinement',
          description: 'Polish and optimize',
          tasks: [
            'Performance profiling and optimization',
            'Security audit and updates',
            'Documentation with Sphinx or MkDocs',
            'Final testing and deployment',
          ],
          priority: 'medium',
        },
      ];
    }
    
    // Electron-specific phases
    if (isElectron) {
      return [
        {
          phase: 1,
          title: 'Setup & Planning',
          description: 'Modernize Electron project structure',
          tasks: [
            'Update to latest Electron version',
            'Set up TypeScript configuration',
            'Configure Vite for fast builds',
            'Set up testing with Playwright',
            'Configure electron-builder for packaging',
          ],
          priority: 'high',
        },
        {
          phase: 2,
          title: 'Core Migration',
          description: 'Migrate to modern patterns',
          tasks: [
            'Convert vanilla JS to TypeScript',
            'Implement React or Vue for UI (optional)',
            'Use IPC for main-renderer communication',
            'Add security best practices',
            'Implement auto-updates',
          ],
          priority: 'high',
        },
        {
          phase: 3,
          title: 'Refinement',
          description: 'Polish and optimize',
          tasks: [
            'Optimize bundle size',
            'Add crash reporting',
            'Documentation updates',
            'Cross-platform testing',
          ],
          priority: 'medium',
        },
      ];
    }
    
    // PHP-specific phases
    if (isPHP) {
      return [
        {
          phase: 1,
          title: 'Setup & Planning',
          description: 'Modernize PHP environment',
          tasks: [
            'Update to PHP 8.3+',
            'Set up Composer for dependency management',
            'Configure PHPStan or Psalm for static analysis',
            'Set up PHPUnit for testing',
            'Configure Laravel or modern framework',
          ],
          priority: 'high',
        },
        {
          phase: 2,
          title: 'Core Migration',
          description: 'Migrate to modern PHP',
          tasks: [
            'Use typed properties and return types',
            'Implement PSR standards',
            'Refactor to use modern PHP features',
            'Add comprehensive tests',
            'Implement proper error handling',
          ],
          priority: 'high',
        },
        {
          phase: 3,
          title: 'Refinement',
          description: 'Polish and optimize',
          tasks: [
            'Performance optimization',
            'Security hardening',
            'Documentation updates',
            'Final testing and deployment',
          ],
          priority: 'medium',
        },
      ];
    }
    
    // JavaScript/React (default)
    return [
      {
        phase: 1,
        title: 'Setup & Planning',
        description: 'Prepare the new project structure and tooling',
        tasks: [
          'Initialize new project with Vite + React + TypeScript',
          'Set up ESLint, Prettier, and testing framework',
          'Configure Tailwind CSS',
          'Set up CI/CD pipeline',
        ],
        priority: 'high',
      },
      {
        phase: 2,
        title: 'Core Migration',
        description: 'Migrate critical functionality',
        tasks: [
          'Identify and migrate core business logic',
          'Convert deprecated patterns to modern equivalents',
          'Implement new component architecture',
          'Add comprehensive tests',
        ],
        priority: 'high',
      },
      {
        phase: 3,
        title: 'Refinement',
        description: 'Polish and optimize',
        tasks: [
          'Performance optimization',
          'Accessibility improvements',
          'Documentation updates',
          'Final testing and deployment',
        ],
        priority: 'medium',
      },
    ];
  }

  private estimateEffort(analysis: AnalysisResult): string {
    const { totalFiles, technicalDebtScore } = analysis.metrics;

    if (totalFiles < 50 && technicalDebtScore < 30) {
      return '2-4 weeks';
    } else if (totalFiles < 200 && technicalDebtScore < 60) {
      return '1-3 months';
    } else {
      return '3-6 months';
    }
  }

  async generateScaffold(proposal: ArchitectureProposal): Promise<string> {
    // Generate basic project structure
    const scaffold = {
      'package.json': this.generatePackageJson(proposal.proposedStack),
      'tsconfig.json': this.generateTsConfig(),
      'vite.config.ts': this.generateViteConfig(),
      'src/App.tsx': this.generateAppComponent(),
      'src/main.tsx': this.generateMainFile(),
    };

    return JSON.stringify(scaffold, null, 2);
  }

  private generatePackageJson(stack: string[]): object {
    return {
      name: 'modernized-app',
      version: '1.0.0',
      type: 'module',
      scripts: {
        dev: 'vite',
        build: 'tsc && vite build',
        preview: 'vite preview',
      },
      dependencies: {
        react: '^18.2.0',
        'react-dom': '^18.2.0',
      },
      devDependencies: {
        '@types/react': '^18.2.0',
        '@types/react-dom': '^18.2.0',
        '@vitejs/plugin-react': '^4.2.0',
        typescript: '^5.3.0',
        vite: '^5.0.0',
      },
    };
  }

  private generateTsConfig(): object {
    return {
      compilerOptions: {
        target: 'ES2020',
        useDefineForClassFields: true,
        lib: ['ES2020', 'DOM', 'DOM.Iterable'],
        module: 'ESNext',
        skipLibCheck: true,
        moduleResolution: 'bundler',
        strict: true,
        jsx: 'react-jsx',
      },
    };
  }

  private generateViteConfig(): string {
    return `import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
});`;
  }

  private generateAppComponent(): string {
    return `function App() {
  return (
    <div className="app">
      <h1>Welcome to Your Modernized App</h1>
    </div>
  );
}

export default App;`;
  }

  private generateMainFile(): string {
    return `import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);`;
  }
}
