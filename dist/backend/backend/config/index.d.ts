import { DeploymentMode } from '../../shared/types';
export declare const config: {
    port: number;
    nodeEnv: string;
    deploymentMode: DeploymentMode;
    redis: {
        url: string;
    };
    ollama: {
        url: string;
        model: string;
    };
    huggingface: {
        apiUrl: string;
        model: string;
    };
    upload: {
        maxSize: string;
        maxArchiveSize: string;
    };
    analysis: {
        timeout: number;
        cacheTtl: number;
    };
};
//# sourceMappingURL=index.d.ts.map