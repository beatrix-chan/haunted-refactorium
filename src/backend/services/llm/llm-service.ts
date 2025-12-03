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
    // Note: Hugging Face Inference API is deprecated
    // For production, consider using:
    // - OpenRouter (https://openrouter.ai) - free tier available
    // - Together AI (https://together.ai) - free tier available
    // - Or deploy with Docker + Ollama for local inference
    
    console.log('ℹ️ Using template-based proposal (Hugging Face API deprecated)');
    console.log('💡 For AI-generated proposals, use Docker deployment with Ollama');
    return this.getFallbackProposal();
  }

  async generateMigrationGuide(currentStack: string[], proposedStack: string[]): Promise<string> {
    // Using template-based guide for now
    return this.getFallbackMigrationGuide(currentStack, proposedStack);
  }

  private getFallbackProposal(): string {
    return 'Recommend migrating to: React + TypeScript + Vite for frontend, Node.js + Express + TypeScript for backend. Use modern patterns like hooks, async/await, and proper error handling.';
  }

  private getFallbackMigrationGuide(current: string[], proposed: string[]): string {
    return `> **Approach:** Incremental Migration (Strangler Fig Pattern)
> 
> This strategy minimizes risk by gradually replacing the old system with the new one, allowing you to test each component before fully committing.

**Why This Approach?**
- Lower risk with isolated, reversible changes
- Keep shipping features during migration
- Gradual team learning of new technologies
- Easy rollback if issues arise

**Key Principles:**
1. Start small with non-critical features
2. Test thoroughly at each step
3. Monitor performance and errors closely
4. Document everything for team alignment
5. Iterate quickly with short feedback loops

**Next Steps:** Review the implementation phases below for detailed tasks and timelines.`;
  }
}

export function createLLMService(): LLMService {
  return config.deploymentMode === 'local' ? new OllamaLLMService() : new OnlineLLMService();
}
