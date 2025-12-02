import fs from 'fs/promises';
import path from 'path';
import { DetectedTechnology, SeverityLevel } from '../../../shared/types';

export class DetectionService {
  async detectTechnologies(codebasePath: string): Promise<DetectedTechnology[]> {
    const technologies: DetectedTechnology[] = [];

    // Check package.json for Node.js dependencies
    const packageJsonPath = path.join(codebasePath, 'package.json');
    try {
      const packageJson = JSON.parse(await fs.readFile(packageJsonPath, 'utf-8'));
      const deps = { ...packageJson.dependencies, ...packageJson.devDependencies };

      for (const [name, version] of Object.entries(deps)) {
        technologies.push({
          name,
          version: version as string,
          deprecated: this.isDeprecated(name),
          severity: this.getTechnologySeverity(name),
        });
      }
    } catch (error) {
      // No package.json found
    }

    // Check for jQuery in files
    const hasJQuery = await this.searchInFiles(codebasePath, /jquery|jQuery|\$\(/);
    if (hasJQuery) {
      technologies.push({
        name: 'jQuery',
        deprecated: true,
        severity: 'cursed',
      });
    }

    return technologies;
  }

  private async searchInFiles(dir: string, pattern: RegExp): Promise<boolean> {
    try {
      const files = await this.getJavaScriptFiles(dir);
      for (const file of files.slice(0, 50)) {
        // Limit search
        const content = await fs.readFile(file, 'utf-8');
        if (pattern.test(content)) {
          return true;
        }
      }
    } catch (error) {
      console.error('Error searching files:', error);
    }
    return false;
  }

  private async getJavaScriptFiles(dir: string): Promise<string[]> {
    const files: string[] = [];
    try {
      const entries = await fs.readdir(dir, { withFileTypes: true });
      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory() && !entry.name.startsWith('.') && entry.name !== 'node_modules') {
          files.push(...(await this.getJavaScriptFiles(fullPath)));
        } else if (entry.isFile() && /\.(js|jsx|ts|tsx)$/.test(entry.name)) {
          files.push(fullPath);
        }
      }
    } catch (error) {
      // Ignore errors
    }
    return files;
  }

  private isDeprecated(name: string): boolean {
    const deprecated = ['bower', 'grunt', 'gulp', 'tslint', 'moment', 'request'];
    return deprecated.includes(name.toLowerCase());
  }

  private getTechnologySeverity(name: string): SeverityLevel {
    const cursed = ['jquery', 'bower', 'tslint'];
    const haunted = ['moment', 'request', 'grunt', 'gulp'];

    if (cursed.includes(name.toLowerCase())) return 'cursed';
    if (haunted.includes(name.toLowerCase())) return 'haunted';
    return 'clean';
  }
}
