"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IngestionService = void 0;
const promises_1 = __importDefault(require("fs/promises"));
const path_1 = __importDefault(require("path"));
class IngestionService {
    uploadDir = path_1.default.join(process.cwd(), 'uploads');
    async initialize() {
        await promises_1.default.mkdir(this.uploadDir, { recursive: true });
    }
    async cloneRepository(repoUrl, extractPath) {
        await promises_1.default.mkdir(extractPath, { recursive: true });
        // Use simple-git to clone the repository
        const simpleGit = (await Promise.resolve().then(() => __importStar(require('simple-git')))).default;
        const git = simpleGit();
        try {
            await git.clone(repoUrl, extractPath, ['--depth', '1']);
            console.log(`Successfully cloned repository: ${repoUrl}`);
        }
        catch (error) {
            console.error('Git clone error:', error);
            throw new Error(`Failed to clone repository: ${repoUrl}`);
        }
    }
    async extractArchive(filePath, extractPath) {
        const ext = path_1.default.extname(filePath).toLowerCase();
        await promises_1.default.mkdir(extractPath, { recursive: true });
        // For now, we'll just copy the file to the extract path
        // In production, you'd want to add unzipper/tar packages back
        // npm install unzipper tar @types/tar
        console.log(`Archive extraction not yet implemented for ${ext}`);
        console.log(`File: ${filePath} -> ${extractPath}`);
        // Placeholder: just note that extraction would happen here
        throw new Error('Archive extraction requires additional packages. Please upload extracted files for now.');
    }
    async analyzeCodebase(extractPath) {
        const files = await this.getAllFiles(extractPath);
        const languages = {};
        let totalSize = 0;
        for (const file of files) {
            const stats = await promises_1.default.stat(file);
            totalSize += stats.size;
            const ext = path_1.default.extname(file).toLowerCase();
            const lang = this.getLanguageFromExtension(ext);
            languages[lang] = (languages[lang] || 0) + 1;
        }
        return {
            name: path_1.default.basename(extractPath),
            size: totalSize,
            fileCount: files.length,
            languages,
        };
    }
    async getAllFiles(dir) {
        const entries = await promises_1.default.readdir(dir, { withFileTypes: true });
        const files = await Promise.all(entries.map(async (entry) => {
            const fullPath = path_1.default.join(dir, entry.name);
            if (entry.isDirectory()) {
                return this.getAllFiles(fullPath);
            }
            return [fullPath];
        }));
        return files.flat();
    }
    getLanguageFromExtension(ext) {
        const map = {
            '.js': 'JavaScript',
            '.ts': 'TypeScript',
            '.jsx': 'JavaScript',
            '.tsx': 'TypeScript',
            '.py': 'Python',
            '.php': 'PHP',
            '.java': 'Java',
            '.rb': 'Ruby',
            '.go': 'Go',
            '.rs': 'Rust',
            '.c': 'C',
            '.cpp': 'C++',
            '.cc': 'C++',
            '.cxx': 'C++',
            '.h': 'C/C++',
            '.hpp': 'C++',
            '.cs': 'C#',
            '.swift': 'Swift',
            '.kt': 'Kotlin',
            '.kts': 'Kotlin',
            '.hs': 'Haskell',
            '.zig': 'Zig',
            '.m': 'Objective-C',
            '.mm': 'Objective-C++',
            '.scala': 'Scala',
            '.clj': 'Clojure',
            '.ex': 'Elixir',
            '.exs': 'Elixir',
            '.erl': 'Erlang',
            '.dart': 'Dart',
            '.lua': 'Lua',
            '.r': 'R',
            '.jl': 'Julia',
        };
        return map[ext] || 'Other';
    }
}
exports.IngestionService = IngestionService;
//# sourceMappingURL=ingestion-service.js.map