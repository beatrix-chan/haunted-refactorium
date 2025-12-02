import fs from 'fs/promises';
import path from 'path';
import { CodebaseMetadata } from '../../../shared/types';

export class IngestionService {
  private uploadDir = path.join(process.cwd(), 'uploads');

  async initialize(): Promise<void> {
    await fs.mkdir(this.uploadDir, { recursive: true });
  }

  async cloneRepository(repoUrl: string, extractPath: string): Promise<void> {
    await fs.mkdir(extractPath, { recursive: true });
    
    // Use simple-git to clone the repository
    const simpleGit = (await import('simple-git')).default;
    const git = simpleGit();
    
    try {
      await git.clone(repoUrl, extractPath, ['--depth', '1']);
      console.log(`Successfully cloned repository: ${repoUrl}`);
    } catch (error) {
      console.error('Git clone error:', error);
      throw new Error(`Failed to clone repository: ${repoUrl}`);
    }
  }

  async extractArchive(filePath: string, extractPath: string): Promise<void> {
    const ext = path.extname(filePath).toLowerCase();
    await fs.mkdir(extractPath, { recursive: true });

    // For now, we'll just copy the file to the extract path
    // In production, you'd want to add unzipper/tar packages back
    // npm install unzipper tar @types/tar
    console.log(`Archive extraction not yet implemented for ${ext}`);
    console.log(`File: ${filePath} -> ${extractPath}`);

    // Placeholder: just note that extraction would happen here
    throw new Error(
      'Archive extraction requires additional packages. Please upload extracted files for now.'
    );
  }

  async analyzeCodebase(extractPath: string): Promise<Omit<CodebaseMetadata, 'id' | 'uploadedAt'>> {
    const files = await this.getAllFiles(extractPath);
    const languages: Record<string, number> = {};
    let totalSize = 0;

    for (const file of files) {
      const stats = await fs.stat(file);
      totalSize += stats.size;

      const ext = path.extname(file).toLowerCase();
      const lang = this.getLanguageFromExtension(ext);
      languages[lang] = (languages[lang] || 0) + 1;
    }

    return {
      name: path.basename(extractPath),
      size: totalSize,
      fileCount: files.length,
      languages,
    };
  }

  private async getAllFiles(dir: string): Promise<string[]> {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    const files = await Promise.all(
      entries.map(async entry => {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
          return this.getAllFiles(fullPath);
        }
        return [fullPath];
      })
    );
    return files.flat();
  }

  private getLanguageFromExtension(ext: string): string {
    const map: Record<string, string> = {
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
      '.cs': 'C#',
    };
    return map[ext] || 'Other';
  }
}
