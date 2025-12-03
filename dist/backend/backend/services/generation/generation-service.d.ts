import { ArchitectureProposal, AnalysisResult } from '../../../shared/types';
export declare class GenerationService {
    private llmService;
    generateArchitectureProposal(analysis: AnalysisResult): Promise<ArchitectureProposal>;
    private extractCurrentStackWithIssues;
    private summarizeCodeSmells;
    private extractCurrentStack;
    private detectPrimaryLanguage;
    private proposeModernStack;
    private generateMigrationPhases;
    private estimateEffort;
    generateScaffold(proposal: ArchitectureProposal): Promise<string>;
    private generatePackageJson;
    private generateTsConfig;
    private generateViteConfig;
    private generateAppComponent;
    private generateMainFile;
}
//# sourceMappingURL=generation-service.d.ts.map