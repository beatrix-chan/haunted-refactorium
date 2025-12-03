import { DetectedTechnology } from '../../../shared/types';
export declare class DetectionService {
    detectTechnologies(codebasePath: string): Promise<DetectedTechnology[]>;
    private detectPythonVersion;
    private detectPyprojectDependencies;
    private searchInFiles;
    private getCodeFiles;
    private isDeprecated;
    private getTechnologySeverity;
}
//# sourceMappingURL=detection-service.d.ts.map