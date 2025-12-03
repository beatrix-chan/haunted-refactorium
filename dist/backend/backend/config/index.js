"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.config = {
    port: parseInt(process.env.PORT || '3001', 10),
    nodeEnv: process.env.NODE_ENV || 'development',
    deploymentMode: (process.env.DEPLOYMENT_MODE || 'online'),
    redis: {
        url: process.env.REDIS_URL || 'redis://localhost:6379',
    },
    ollama: {
        url: process.env.OLLAMA_URL || 'http://localhost:11434',
        model: process.env.OLLAMA_MODEL || 'codellama',
    },
    huggingface: {
        apiUrl: process.env.HUGGINGFACE_API_URL || 'https://api-inference.huggingface.co',
        model: process.env.HUGGINGFACE_MODEL || 'bigcode/starcoder',
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
//# sourceMappingURL=index.js.map