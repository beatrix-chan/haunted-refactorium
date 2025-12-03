import { CodebaseMetadata } from '../../../shared/types';
export declare class IngestionService {
    private uploadDir;
    initialize(): Promise<void>;
    cloneRepository(repoUrl: string, extractPath: string): Promise<void>;
    extractArchive(filePath: string, extractPath: string): Promise<void>;
    analyzeCodebase(extractPath: string): Promise<Omit<CodebaseMetadata, 'id' | 'uploadedAt'>>;
    private getAllFiles;
    private getLanguageFromExtension;
}
//# sourceMappingURL=ingestion-service.d.ts.map