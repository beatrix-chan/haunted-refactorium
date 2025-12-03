export type SeverityLevel = 'cursed' | 'haunted' | 'spooky' | 'clean';
export type DeploymentMode = 'local' | 'online';
export interface CodebaseMetadata {
    id: string;
    name: string;
    uploadedAt: Date;
    size: number;
    fileCount: number;
    languages: Record<string, number>;
}
export interface DetectedTechnology {
    name: string;
    version?: string;
    deprecated: boolean;
    lastUpdate?: Date;
    severity: SeverityLevel;
}
export interface CodeSmell {
    type: string;
    file: string;
    line: number;
    severity: SeverityLevel;
    description: string;
    recommendation: string;
}
export interface AnalysisResult {
    id: string;
    codebaseId: string;
    status: 'pending' | 'analyzing' | 'complete' | 'failed';
    progress: number;
    technologies: DetectedTechnology[];
    codeSmells: CodeSmell[];
    cursedFiles: FileHotspot[];
    ghostlyDependencies: DetectedTechnology[];
    metrics: CodeMetrics;
    createdAt: Date;
    completedAt?: Date;
}
export interface FileHotspot {
    path: string;
    severity: SeverityLevel;
    issues: number;
    complexity: number;
    lines: number;
}
export interface CodeMetrics {
    totalFiles: number;
    totalLines: number;
    avgComplexity: number;
    testCoverage?: number;
    technicalDebtScore: number;
}
export interface StackItem {
    name: string;
    version?: string;
    issue?: string;
}
export interface ArchitectureProposal {
    id: string;
    analysisId: string;
    currentStack: StackItem[];
    proposedStack: string[];
    migrationStrategy: string;
    phases: MigrationPhase[];
    estimatedEffort: string;
}
export interface MigrationPhase {
    phase: number;
    title: string;
    description: string;
    tasks: string[];
    priority: 'high' | 'medium' | 'low';
}
export interface ExportPackage {
    analysisReport: string;
    architectureProposal: string;
    migrationGuide: string;
    scaffold?: string;
}
export interface ThemeMode {
    spooky: boolean;
    highContrast: boolean;
    font: 'jetbrains' | 'dyslexic';
}
//# sourceMappingURL=index.d.ts.map