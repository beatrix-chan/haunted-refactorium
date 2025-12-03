import { AnalysisResult } from '../../../shared/types';
export declare class AnalysisService {
    private detectionService;
    analyzeCodebase(codebaseId: string, codebasePath: string): Promise<AnalysisResult>;
    private detectLanguages;
    private getLanguageFromExtension;
    private detectCodeSmells;
    private identifyCursedFiles;
    private calculateComplexity;
    private calculateMetrics;
    private getCodeFiles;
}
//# sourceMappingURL=analysis-service.d.ts.map