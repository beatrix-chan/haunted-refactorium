export interface LLMService {
    generateArchitectureProposal(analysis: string): Promise<string>;
    generateMigrationGuide(currentStack: string[], proposedStack: string[]): Promise<string>;
}
export declare function createLLMService(): LLMService;
//# sourceMappingURL=llm-service.d.ts.map