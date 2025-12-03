import fs from 'fs/promises';
import path from 'path';
import {
  AnalysisResult,
  CodeSmell,
  FileHotspot,
  CodeMetrics,
} from '../../../shared/types';
import { DetectionService } from '../detection/detection-service';
import { calculateSeverity } from '../../../shared/utils/severity';

export class AnalysisService {
  private detectionService = new DetectionService();

  async analyzeCodebase(codebaseId: string, codebasePath: string): Promise<AnalysisResult> {
    const technologies = await this.detectionService.detectTechnologies(codebasePath);
    const codeSmells = await this.detectCodeSmells(codebasePath);
    const cursedFiles = await this.identifyCursedFiles(codebasePath, codeSmells);
    const metrics = await this.calculateMetrics(codebasePath, codeSmells);

    // Detect primary languages from file extensions
    const languages = await this.detectLanguages(codebasePath);

    // Add detected languages as technologies
    for (const [lang, count] of Object.entries(languages)) {
      if (count > 0 && !technologies.some(t => t.name.toLowerCase() === lang.toLowerCase())) {
        technologies.push({
          name: lang,
          deprecated: false,
          severity: 'clean',
        });
      }
    }

    return {
      id: `analysis-${Date.now()}`,
      codebaseId,
      status: 'complete',
      progress: 100,
      technologies,
      codeSmells,
      cursedFiles,
      ghostlyDependencies: technologies.filter(t => t.deprecated),
      metrics,
      createdAt: new Date(),
      completedAt: new Date(),
    };
  }

  private async detectLanguages(codebasePath: string): Promise<Record<string, number>> {
    const languages: Record<string, number> = {};
    const files = await this.getCodeFiles(codebasePath);

    for (const file of files) {
      const ext = path.extname(file).toLowerCase();
      const lang = this.getLanguageFromExtension(ext);
      if (lang !== 'Other') {
        languages[lang] = (languages[lang] || 0) + 1;
      }
    }

    return languages;
  }

  private getLanguageFromExtension(ext: string): string {
    const map: Record<string, string> = {
      '.js': 'JavaScript',
      '.jsx': 'JavaScript',
      '.ts': 'TypeScript',
      '.tsx': 'TypeScript',
      '.py': 'Python',
      '.php': 'PHP',
      '.java': 'Java',
      '.rb': 'Ruby',
      '.go': 'Go',
      '.rs': 'Rust',
      '.c': 'C',
      '.cpp': 'C++',
      '.cs': 'C#',
      '.swift': 'Swift',
      '.kt': 'Kotlin',
    };
    return map[ext] || 'Other';
  }

  private async detectCodeSmells(codebasePath: string): Promise<CodeSmell[]> {
    const smells: CodeSmell[] = [];
    const files = await this.getCodeFiles(codebasePath);

    for (const file of files.slice(0, 100)) {
      // Limit analysis
      try {
        const content = await fs.readFile(file, 'utf-8');
        const relativePath = path.relative(codebasePath, file);

        // Check for var usage
        if (/\bvar\s+/.test(content)) {
          smells.push({
            type: 'deprecated-syntax',
            file: relativePath,
            line: 0,
            severity: 'haunted',
            description: 'Using deprecated "var" keyword',
            recommendation: 'Replace with "const" or "let"',
          });
        }

        // Check for callback hell
        if (
          /function\s*\([^)]*\)\s*{\s*[^}]*function\s*\([^)]*\)\s*{\s*[^}]*function/.test(content)
        ) {
          smells.push({
            type: 'callback-hell',
            file: relativePath,
            line: 0,
            severity: 'cursed',
            description: 'Nested callbacks detected (callback hell)',
            recommendation: 'Refactor to use async/await',
          });
        }

        // Check for long functions
        const functionMatches = content.match(/function[^{]*{/g);
        if (functionMatches && functionMatches.length > 0) {
          const lines = content.split('\n');
          if (lines.length > 200) {
            smells.push({
              type: 'long-function',
              file: relativePath,
              line: 0,
              severity: 'spooky',
              description: 'Function exceeds 200 lines',
              recommendation: 'Break into smaller functions',
            });
          }
        }
      } catch (error) {
        console.error(`Error analyzing ${file}:`, error);
      }
    }

    return smells;
  }

  private async identifyCursedFiles(
    codebasePath: string,
    smells: CodeSmell[]
  ): Promise<FileHotspot[]> {
    const fileMap = new Map<string, { issues: number; complexity: number; lines: number }>();

    for (const smell of smells) {
      const existing = fileMap.get(smell.file) || { issues: 0, complexity: 0, lines: 0 };
      existing.issues++;
      fileMap.set(smell.file, existing);
    }

    const hotspots: FileHotspot[] = [];
    for (const [filePath, data] of fileMap.entries()) {
      try {
        const fullPath = path.join(codebasePath, filePath);
        const content = await fs.readFile(fullPath, 'utf-8');
        const lines = content.split('\n').length;
        const complexity = this.calculateComplexity(content);

        hotspots.push({
          path: filePath,
          severity: calculateSeverity(data.issues, complexity),
          issues: data.issues,
          complexity,
          lines,
        });
      } catch (error) {
        // File might not exist
      }
    }

    return hotspots.sort((a, b) => b.issues - a.issues).slice(0, 20);
  }

  private calculateComplexity(content: string): number {
    let complexity = 1;
    const patterns = [/\bif\b/, /\bfor\b/, /\bwhile\b/, /\bswitch\b/, /\bcatch\b/];
    for (const pattern of patterns) {
      const matches = content.match(new RegExp(pattern, 'g'));
      if (matches) complexity += matches.length;
    }
    return Math.min(complexity, 50);
  }

  private async calculateMetrics(codebasePath: string, smells: CodeSmell[]): Promise<CodeMetrics> {
    const files = await this.getCodeFiles(codebasePath);
    let totalLines = 0;
    let totalComplexity = 0;

    for (const file of files.slice(0, 100)) {
      try {
        const content = await fs.readFile(file, 'utf-8');
        totalLines += content.split('\n').length;
        totalComplexity += this.calculateComplexity(content);
      } catch (error) {
        // Ignore
      }
    }

    const avgComplexity = files.length > 0 ? totalComplexity / files.length : 0;
    const technicalDebtScore = Math.min(100, smells.length * 2 + avgComplexity);

    return {
      totalFiles: files.length,
      totalLines,
      avgComplexity: Math.round(avgComplexity),
      technicalDebtScore: Math.round(technicalDebtScore),
    };
  }

  private async getCodeFiles(dir: string): Promise<string[]> {
    const files: string[] = [];
    try {
      const entries = await fs.readdir(dir, { withFileTypes: true });
      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (
          entry.isDirectory() &&
          !entry.name.startsWith('.') &&
          entry.name !== 'node_modules' &&
          entry.name !== '__pycache__' &&
          entry.name !== 'vendor'
        ) {
          files.push(...(await this.getCodeFiles(fullPath)));
        } else if (
          entry.isFile() &&
          /\.(js|jsx|ts|tsx|py|php|java|rb|go|rs|swift|kt|cs|hs|zig|c|cpp|h|hpp)$/.test(entry.name)
        ) {
          files.push(fullPath);
        }
      }
    } catch (error) {
      // Ignore
    }
    return files;
  }
}
