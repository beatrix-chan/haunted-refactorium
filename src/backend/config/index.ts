import dotenv from 'dotenv';
import { DeploymentMode } from '../../shared/types';

dotenv.config();

export const config = {
  port: parseInt(process.env.PORT || '3001', 10),
  nodeEnv: process.env.NODE_ENV || 'development',
  deploymentMode: (process.env.DEPLOYMENT_MODE || 'online') as DeploymentMode,

  redis: {
    url: process.env.REDIS_URL || 'redis://localhost:6379',
  },

  ollama: {
    url: process.env.OLLAMA_URL || 'http://localhost:11434',
    model: process.env.OLLAMA_MODEL || 'codellama',
  },

  huggingface: {
    apiUrl: process.env.HUGGINGFACE_API_URL || 'https://api-inference.huggingface.co/models',
    model: process.env.HUGGINGFACE_MODEL || 'Qwen/Qwen2.5-Coder-32B-Instruct',
  },

  upload: {
    maxSize: process.env.MAX_UPLOAD_SIZE || '100mb',
    maxArchiveSize: process.env.MAX_ARCHIVE_SIZE || '500mb',
  },

  analysis: {
    timeout: parseInt(process.env.ANALYSIS_TIMEOUT || '300000', 10),
    cacheTtl: parseInt(process.env.CACHE_TTL || '3600', 10),
  },
};
