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
  async generateArchitectureProposal(analysis: string): Promise<string> {
    try {
      const response = await axios.post(
        `${config.huggingface.apiUrl}/${config.huggingface.model}`,
        {
          inputs: `Based on this code analysis, propose a modern architecture:\n\n${analysis.substring(0, 1000)}\n\nArchitecture proposal:`,
          parameters: { max_new_tokens: 500, temperature: 0.7 },
        },
        { timeout: 30000 }
      );
      return response.data[0]?.generated_text || this.getFallbackProposal();
    } catch (error) {
      console.error('Online LLM error:', error);
      return this.getFallbackProposal();
    }
  }

  async generateMigrationGuide(currentStack: string[], proposedStack: string[]): Promise<string> {
    try {
      const response = await axios.post(
        `${config.huggingface.apiUrl}/${config.huggingface.model}`,
        {
          inputs: `Migration guide from ${currentStack.join(', ')} to ${proposedStack.join(', ')}:\n\n`,
          parameters: { max_new_tokens: 500, temperature: 0.7 },
        },
        { timeout: 30000 }
      );
      return (
        response.data[0]?.generated_text ||
        this.getFallbackMigrationGuide(currentStack, proposedStack)
      );
    } catch (error) {
      console.error('Online LLM error:', error);
      return this.getFallbackMigrationGuide(currentStack, proposedStack);
    }
  }

  private getFallbackProposal(): string {
    return 'Recommend migrating to: React + TypeScript + Vite for frontend, Node.js + Express + TypeScript for backend. Use modern patterns like hooks, async/await, and proper error handling.';
  }

  private getFallbackMigrationGuide(current: string[], proposed: string[]): string {
    return `# Migration Guide\n\n## Current: ${current.join(', ')}\n## Target: ${proposed.join(', ')}\n\n1. Set up new project structure\n2. Migrate dependencies\n3. Refactor code incrementally\n4. Add tests\n5. Deploy gradually`;
  }
}

export function createLLMService(): LLMService {
  return config.deploymentMode === 'local' ? new OllamaLLMService() : new OnlineLLMService();
}
