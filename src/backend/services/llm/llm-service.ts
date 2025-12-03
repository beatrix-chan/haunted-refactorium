import { config } from '../../config';
import axios from 'axios';

export interface LLMService {
  generateArchitectureProposal(analysis: string): Promise<string>;
  generateMigrationGuide(currentStack: string[], proposedStack: string[]): Promise<string>;
}

class OllamaLLMService implements LLMService {
  async generateArchitectureProposal(analysis: string): Promise<string> {
    try {
      const response = await axios.post(`${config.ollama.url}/api/generate`, {
        model: config.ollama.model,
        prompt: `Based on this code analysis, propose a modern architecture:\n\n${analysis}\n\nProvide a detailed architecture proposal with recommended technologies and migration strategy.`,
        stream: false,
      });
      return response.data.response;
    } catch (error) {
      console.error('Ollama LLM error:', error);
      return this.getFallbackProposal();
    }
  }

  async generateMigrationGuide(currentStack: string[], proposedStack: string[]): Promise<string> {
    try {
      const response = await axios.post(`${config.ollama.url}/api/generate`, {
        model: config.ollama.model,
        prompt: `Create a migration guide from ${currentStack.join(', ')} to ${proposedStack.join(', ')}. Include step-by-step instructions and best practices.`,
        stream: false,
      });
      return response.data.response;
    } catch (error) {
      console.error('Ollama LLM error:', error);
      return this.getFallbackMigrationGuide(currentStack, proposedStack);
    }
  }

  private getFallbackProposal(): string {
    return 'Architecture proposal generation failed. Please check Ollama connection.';
  }

  private getFallbackMigrationGuide(current: string[], proposed: string[]): string {
    return `Migration from ${current.join(', ')} to ${proposed.join(', ')} - Guide generation failed.`;
  }
}

class OnlineLLMService implements LLMService {
  private readonly apiUrl: string;
  private readonly model: string;

  constructor() {
    this.apiUrl = config.huggingface.apiUrl;
    this.model = config.huggingface.model;
  }

  async generateArchitectureProposal(analysis: string): Promise<string> {
    const prompt = this.buildArchitecturePrompt(analysis);

    try {
      const response = await this.callHuggingFaceAPI(prompt);
      if (response) {
        return response;
      }
    } catch (error) {
      console.error('HuggingFace API error:', error);
    }

    // Fallback to template-based proposal using actual analysis data
    return this.buildTemplateProposal(analysis);
  }

  async generateMigrationGuide(currentStack: string[], proposedStack: string[]): Promise<string> {
    const prompt = this.buildMigrationPrompt(currentStack, proposedStack);

    try {
      const response = await this.callHuggingFaceAPI(prompt);
      if (response) {
        return response;
      }
    } catch (error) {
      console.error('HuggingFace API error:', error);
    }

    return this.buildTemplateMigrationGuide(currentStack, proposedStack);
  }

  private async callHuggingFaceAPI(prompt: string): Promise<string | null> {
    try {
      const response = await axios.post(
        `${this.apiUrl}/${this.model}`,
        {
          inputs: prompt,
          parameters: {
            max_new_tokens: 1024,
            temperature: 0.7,
            return_full_text: false,
          },
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          timeout: 60000,
        }
      );

      if (response.data && Array.isArray(response.data) && response.data[0]?.generated_text) {
        return response.data[0].generated_text.trim();
      }

      if (response.data?.generated_text) {
        return response.data.generated_text.trim();
      }

      console.warn('Unexpected HuggingFace response format:', response.data);
      return null;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 503) {
          console.log('Model is loading, using template fallback...');
        } else if (error.response?.status === 429) {
          console.log('Rate limited, using template fallback...');
        } else {
          console.error('HuggingFace API error:', error.response?.data || error.message);
        }
      }
      return null;
    }
  }

  private buildArchitecturePrompt(analysis: string): string {
    return `You are a software architect analyzing a legacy codebase. Based on the following analysis, provide a specific, actionable architecture proposal.

ANALYSIS:
${analysis}

Provide a modernization proposal that includes:
1. Specific technologies to adopt based on what was found
2. Architecture pattern recommendations
3. Priority order for changes
4. Key risks and mitigations

Be specific to the codebase analyzed, not generic advice.`;
  }

  private buildMigrationPrompt(currentStack: string[], proposedStack: string[]): string {
    return `Create a detailed migration guide for transitioning a codebase.

CURRENT STACK: ${currentStack.join(', ')}
TARGET STACK: ${proposedStack.join(', ')}

Provide:
1. Step-by-step migration phases
2. Specific code transformation examples
3. Testing strategy for each phase
4. Rollback procedures
5. Timeline estimates

Be practical and specific to these technologies.`;
  }

  private buildTemplateProposal(analysis: string): string {
    // Parse the analysis to extract relevant info for a tailored response
    const hasJQuery = analysis.toLowerCase().includes('jquery');
    const hasReact = analysis.toLowerCase().includes('react');
    const hasTypeScript = analysis.toLowerCase().includes('typescript');
    const hasWebpack = analysis.toLowerCase().includes('webpack');
    const hasExpress = analysis.toLowerCase().includes('express');
    const hasCallback = analysis.toLowerCase().includes('callback');
    const hasVar =
      analysis.toLowerCase().includes('var ') || analysis.toLowerCase().includes('"var"');

    const recommendations: string[] = [];

    if (hasJQuery && !hasReact) {
      recommendations.push(
        '**Replace jQuery with React**: Migrate DOM manipulation to React components with hooks for better maintainability and performance.'
      );
    }

    if (!hasTypeScript) {
      recommendations.push(
        '**Adopt TypeScript**: Add type safety to catch errors at compile time and improve developer experience.'
      );
    }

    if (hasWebpack) {
      recommendations.push(
        '**Consider Vite**: Replace Webpack with Vite for faster development builds and simpler configuration.'
      );
    }

    if (hasCallback) {
      recommendations.push(
        '**Modernize async patterns**: Replace callback-based code with async/await for cleaner, more readable asynchronous operations.'
      );
    }

    if (hasVar) {
      recommendations.push(
        '**Update variable declarations**: Replace `var` with `const` and `let` for proper scoping and immutability.'
      );
    }

    if (!hasExpress) {
      recommendations.push(
        '**Backend modernization**: Consider Express.js or Fastify with TypeScript for a robust, type-safe API layer.'
      );
    }

    if (recommendations.length === 0) {
      recommendations.push(
        '**Continue modernization**: The codebase shows some modern patterns. Focus on consistency and filling gaps in test coverage.'
      );
    }

    return `## Architecture Proposal

Based on the analysis of your codebase:

${recommendations.map((r, i) => `${i + 1}. ${r}`).join('\n\n')}

### Recommended Architecture Pattern
Use a **layered architecture** with clear separation:
- **Presentation Layer**: React + TypeScript with functional components
- **Business Logic Layer**: Service classes with dependency injection
- **Data Access Layer**: Repository pattern for data operations

### Migration Strategy
Follow the **Strangler Fig pattern** for incremental migration:
1. Identify boundaries in the existing system
2. Build new features in the modern stack
3. Gradually redirect traffic to new components
4. Retire legacy code as it becomes unused

### Priority Order
1. Security vulnerabilities and deprecated dependencies
2. Core business logic modernization
3. UI/UX improvements
4. Performance optimizations`;
  }

  private buildTemplateMigrationGuide(current: string[], proposed: string[]): string {
    const phases: string[] = [];

    // Generate specific migration steps based on actual stacks
    if (current.includes('jQuery') && proposed.includes('React')) {
      phases.push(`### Phase 1: jQuery to React Migration
1. Set up React alongside existing jQuery code
2. Create React components for new features
3. Gradually wrap jQuery widgets in React components
4. Replace jQuery DOM manipulation with React state
5. Remove jQuery dependency once all components migrated`);
    }

    if (current.includes('JavaScript') && proposed.includes('TypeScript')) {
      phases.push(`### Phase: TypeScript Adoption
1. Add TypeScript configuration (tsconfig.json)
2. Rename files from .js to .ts incrementally
3. Add type annotations starting with function signatures
4. Enable strict mode gradually
5. Add types for third-party libraries (@types packages)`);
    }

    if (current.includes('Webpack') && proposed.includes('Vite')) {
      phases.push(`### Phase: Webpack to Vite Migration
1. Install Vite and create vite.config.ts
2. Update import statements to use ES modules
3. Migrate environment variables to Vite format
4. Update build scripts in package.json
5. Remove Webpack configuration and dependencies`);
    }

    if (current.includes('callbacks') && proposed.includes('async/await')) {
      phases.push(`### Phase: Async Pattern Modernization
1. Identify callback-heavy modules
2. Wrap callbacks in Promises where needed
3. Convert Promise chains to async/await
4. Add proper error handling with try/catch
5. Update tests to handle async operations`);
    }

    if (phases.length === 0) {
      phases.push(`### General Migration Phases
1. **Assessment**: Document current architecture and dependencies
2. **Planning**: Define target architecture and migration order
3. **Foundation**: Set up new tooling alongside existing code
4. **Incremental Migration**: Move features one at a time
5. **Validation**: Test thoroughly at each step
6. **Cleanup**: Remove deprecated code and dependencies`);
    }

    return `# Migration Guide: ${current.join(', ')} → ${proposed.join(', ')}

> **Approach:** Incremental Migration (Strangler Fig Pattern)

${phases.join('\n\n')}

## Testing Strategy
- Write tests for existing behavior before migrating
- Run both old and new implementations in parallel
- Compare outputs to ensure consistency
- Gradually shift traffic to new implementation

## Rollback Plan
- Keep old code paths available behind feature flags
- Monitor error rates and performance metrics
- Have database migration rollback scripts ready
- Document rollback procedures for each phase`;
  }
}

export function createLLMService(): LLMService {
  return config.deploymentMode === 'local' ? new OllamaLLMService() : new OnlineLLMService();
}
