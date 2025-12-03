import fs from 'fs/promises';
import path from 'path';
import { DetectedTechnology, SeverityLevel } from '../../../shared/types';

export class DetectionService {
  async detectTechnologies(codebasePath: string): Promise<DetectedTechnology[]> {
    const technologies: DetectedTechnology[] = [];

    // Detect Python version from pyproject.toml or .python-version
    const pythonVersion = await this.detectPythonVersion(codebasePath);
    if (pythonVersion) {
      technologies.push({
        name: 'Python',
        version: pythonVersion,
        deprecated: false,
        severity: 'clean',
      });
    }

    // Check package.json for Node.js dependencies
    const packageJsonPath = path.join(codebasePath, 'package.json');
    try {
      const packageJson = JSON.parse(await fs.readFile(packageJsonPath, 'utf-8'));
      const deps = { ...packageJson.dependencies, ...packageJson.devDependencies };

      // Add Node.js as a technology
      if (packageJson.engines?.node) {
        technologies.push({
          name: 'Node.js',
          version: packageJson.engines.node,
          deprecated: false,
          severity: 'clean',
        });
      }

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

    // Check for Python dependencies (requirements.txt)
    const requirementsPath = path.join(codebasePath, 'requirements.txt');
    try {
      const requirements = await fs.readFile(requirementsPath, 'utf-8');
      const lines = requirements.split('\n');
      for (const line of lines) {
        const match = line.trim().match(/^([a-zA-Z0-9-_]+)([>=<~!]+.*)?$/);
        if (match) {
          const name = match[1];
          const version = match[2]?.replace(/[>=<~!]+/, '').trim();
          technologies.push({
            name,
            version,
            deprecated: this.isDeprecated(name),
            severity: this.getTechnologySeverity(name),
          });
        }
      }
    } catch (error) {
      // No requirements.txt found
    }

    // Check pyproject.toml for Python dependencies
    await this.detectPyprojectDependencies(codebasePath, technologies);

    // Check for jQuery in files
    const hasJQuery = await this.searchInFiles(codebasePath, /jquery|jQuery|\$\(/, 'js');
    if (hasJQuery) {
      technologies.push({
        name: 'jQuery',
        deprecated: true,
        severity: 'cursed',
      });
    }

    // Check for Streamlit
    const hasStreamlit = await this.searchInFiles(
      codebasePath,
      /import\s+streamlit|from\s+streamlit/,
      'py'
    );
    if (hasStreamlit && !technologies.some(t => t.name.toLowerCase() === 'streamlit')) {
      technologies.push({
        name: 'Streamlit',
        deprecated: false,
        severity: 'clean',
      });
    }

    return technologies;
  }

  private async detectPythonVersion(codebasePath: string): Promise<string | undefined> {
    // Check .python-version file
    try {
      const pythonVersionFile = path.join(codebasePath, '.python-version');
      const version = (await fs.readFile(pythonVersionFile, 'utf-8')).trim();
      return version;
    } catch {
      // Not found
    }

    // Check pyproject.toml
    try {
      const pyprojectPath = path.join(codebasePath, 'pyproject.toml');
      const content = await fs.readFile(pyprojectPath, 'utf-8');
      const match = content.match(/python\s*=\s*["']([^"']+)["']/);
      if (match) {
        return match[1];
      }
    } catch {
      // Not found
    }

    // Check runtime.txt (Heroku style)
    try {
      const runtimePath = path.join(codebasePath, 'runtime.txt');
      const content = (await fs.readFile(runtimePath, 'utf-8')).trim();
      const match = content.match(/python-(\d+\.\d+(\.\d+)?)/);
      if (match) {
        return match[1];
      }
    } catch {
      // Not found
    }

    return undefined;
  }

  private async detectPyprojectDependencies(
    codebasePath: string,
    technologies: DetectedTechnology[]
  ): Promise<void> {
    try {
      const pyprojectPath = path.join(codebasePath, 'pyproject.toml');
      const content = await fs.readFile(pyprojectPath, 'utf-8');

      // Simple regex to find dependencies
      const depMatches = content.matchAll(/["']([a-zA-Z0-9-_]+)(?:\[.*?\])?([>=<~!]+[^"'\s,\]]+)?["']/g);
      for (const match of depMatches) {
        const name = match[1];
        const version = match[2]?.replace(/[>=<~!]+/, '').trim();

        // Skip if already detected or if it's a common non-package string
        if (
          technologies.some(t => t.name.toLowerCase() === name.toLowerCase()) ||
          ['python', 'src', 'tests', 'docs'].includes(name.toLowerCase())
        ) {
          continue;
        }

        technologies.push({
          name,
          version,
          deprecated: this.isDeprecated(name),
          severity: this.getTechnologySeverity(name),
        });
      }
    } catch {
      // No pyproject.toml found
    }
  }

  private async searchInFiles(
    dir: string,
    pattern: RegExp,
    fileType: 'js' | 'py'
  ): Promise<boolean> {
    try {
      const files = await this.getCodeFiles(dir, fileType);
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

  private async getCodeFiles(dir: string, fileType: 'js' | 'py'): Promise<string[]> {
    const files: string[] = [];
    const pattern = fileType === 'js' ? /\.(js|jsx|ts|tsx)$/ : /\.py$/;

    try {
      const entries = await fs.readdir(dir, { withFileTypes: true });
      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (
          entry.isDirectory() &&
          !entry.name.startsWith('.') &&
          entry.name !== 'node_modules' &&
          entry.name !== '__pycache__'
        ) {
          files.push(...(await this.getCodeFiles(fullPath, fileType)));
        } else if (entry.isFile() && pattern.test(entry.name)) {
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
