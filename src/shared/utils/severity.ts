import { SeverityLevel } from '../types';

export function getSeverityColor(severity: SeverityLevel): string {
  switch (severity) {
    case 'cursed':
      return '#ff0000';
    case 'haunted':
      return '#ff6b35';
    case 'spooky':
      return '#ffa500';
    case 'clean':
      return '#2dd881';
  }
}

export function getSeverityLabel(severity: SeverityLevel, spooky: boolean): string {
  if (!spooky) {
    switch (severity) {
      case 'cursed':
        return 'Critical';
      case 'haunted':
        return 'High';
      case 'spooky':
        return 'Medium';
      case 'clean':
        return 'Clean';
    }
  }
  return severity.charAt(0).toUpperCase() + severity.slice(1);
}

export function calculateSeverity(issueCount: number, complexity: number): SeverityLevel {
  const score = issueCount * 2 + complexity;
  if (score >= 20) return 'cursed';
  if (score >= 10) return 'haunted';
  if (score >= 5) return 'spooky';
  return 'clean';
}
