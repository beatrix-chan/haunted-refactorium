import { ArchitectureProposal, AnalysisResult, MigrationPhase } from '../../../shared/types';
import { createLLMService } from '../llm/llm-service';

export class GenerationService {
  private llmService = createLLMService();

  async generateArchitectureProposal(analysis: AnalysisResult): Promise<ArchitectureProposal> {
    const currentStack = this.extractCurrentStack(analysis);
    const proposedStack = this.proposeModernStack(currentStack);

    const migrationStrategy = await this.llmService.generateMigrationGuide(
      currentStack,
      proposedStack
    );
    const phases = this.generateMigrationPhases(currentStack, proposedStack);

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

  private extractCurrentStack(analysis: AnalysisResult): string[] {
    const stack: string[] = [];

    for (const tech of analysis.technologies) {
      if (
        ['jquery', 'react', 'angular', 'vue', 'express', 'django', 'flask'].some(t =>
          tech.name.toLowerCase().includes(t)
        )
      ) {
        stack.push(tech.name);
      }
    }

    return stack.length > 0 ? stack : ['Legacy JavaScript'];
  }

  private proposeModernStack(currentStack: string[]): string[] {
    const hasBackend = currentStack.some(s =>
      ['express', 'django', 'flask', 'php'].some(t => s.toLowerCase().includes(t))
    );

    const proposed = ['React', 'TypeScript', 'Vite', 'Tailwind CSS'];

    if (hasBackend) {
      proposed.push('Node.js', 'Express', 'Prisma');
    }

    return proposed;
  }

  private generateMigrationPhases(current: string[], proposed: string[]): MigrationPhase[] {
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
