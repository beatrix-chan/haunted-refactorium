import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { ArchitectureProposal } from '../../shared/types';
import axios from 'axios';
import Markdown from 'react-markdown';

export default function ProposalPage() {
  const { id } = useParams();
  const { theme } = useTheme();
  const [proposal, setProposal] = useState<ArchitectureProposal | null>(null);
  const [loading, setLoading] = useState(true);
  const [downloadingScaffold, setDownloadingScaffold] = useState(false);
  const [showExportMenu, setShowExportMenu] = useState(false);

  useEffect(() => {
    loadProposal();
  }, [id]);

  const loadProposal = async () => {
    try {
      // The ID from the URL is the proposal ID
      // In the real flow, this comes from the backend after generating
      // For now, we need to fetch it from the proposals map
      // Since we don't have a GET endpoint yet, we'll need to add one
      // or store it in the frontend state

      // For now, check if we have it in sessionStorage
      const storedProposal = sessionStorage.getItem(`proposal-${id}`);
      if (storedProposal) {
        setProposal(JSON.parse(storedProposal));
        setLoading(false);
      } else {
        // Fallback to mock data if not found
        console.warn('Proposal not found in storage, using mock data');
        setProposal({
          id: id || '',
          analysisId: '',
          currentStack: [
            { name: 'jQuery', version: '2.1.0', issue: 'Deprecated and no longer maintained' },
            {
              name: 'PHP',
              version: '5.6',
              issue: 'Critical security vulnerabilities - end of life',
            },
            { name: 'MySQL', version: '5.5', issue: 'Outdated version with known security issues' },
            { name: 'Code Quality', issue: '3 critical, 5 major issues detected' },
            { name: 'Bootstrap', version: '3.3.7', issue: '✓ Up to date' },
          ],
          proposedStack: ['React', 'TypeScript', 'Node.js', 'Express', 'PostgreSQL'],
          migrationStrategy: 'Incremental migration using the Strangler Fig pattern',
          phases: [
            {
              phase: 1,
              title: 'Setup & Planning',
              description: 'Prepare the new project structure',
              tasks: [
                'Initialize React + TypeScript project with Vite',
                'Set up ESLint and Prettier',
                'Configure Tailwind CSS',
                'Set up testing framework (Jest + React Testing Library)',
              ],
              priority: 'high',
            },
            {
              phase: 2,
              title: 'Core Migration',
              description: 'Migrate critical functionality',
              tasks: [
                'Convert jQuery DOM manipulation to React components',
                'Migrate PHP backend to Node.js + Express',
                'Implement TypeScript types for all data structures',
                'Add comprehensive unit tests',
              ],
              priority: 'high',
            },
            {
              phase: 3,
              title: 'Refinement',
              description: 'Polish and optimize',
              tasks: [
                'Performance optimization',
                'Accessibility improvements (WCAG AA)',
                'Documentation updates',
                'Final testing and deployment',
              ],
              priority: 'medium',
            },
          ],
          estimatedEffort: '2-3 months',
        });
        setLoading(false);
      }
    } catch (error) {
      console.error('Failed to load proposal:', error);
      setLoading(false);
    }
  };

  const downloadScaffold = async () => {
    if (!proposal) return;

    setDownloadingScaffold(true);
    try {
      const response = await axios.get(`/api/scaffold/${proposal.id}`);
      const blob = new Blob([response.data.scaffold], { type: 'application/json' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'modern-scaffold.json';
      a.click();
    } catch (error) {
      console.error('Failed to download scaffold:', error);
    } finally {
      setDownloadingScaffold(false);
    }
  };

  const generateReportContent = () => {
    if (!proposal) return '';

    return `
# Architecture Proposal Report

**Generated:** ${new Date().toLocaleString()}

## Current Stack
${proposal.currentStack.map(tech => `- **${tech.name}**${tech.version ? ` (v${tech.version})` : ''}${tech.issue ? `\n  - Issue: ${tech.issue}` : ''}`).join('\n')}

## Proposed Stack
${proposal.proposedStack.map(tech => `- ${tech}`).join('\n')}

## Migration Strategy
${proposal.migrationStrategy}

**Estimated Effort:** ${proposal.estimatedEffort}

## Implementation Phases

${proposal.phases
  .map(
    phase => `
### Phase ${phase.phase}: ${phase.title}
**Priority:** ${phase.priority.toUpperCase()}

${phase.description}

**Tasks:**
${phase.tasks.map(task => `- ${task}`).join('\n')}
`
  )
  .join('\n')}

---
Generated by Haunted Refactorium
`;
  };

  const exportAsMarkdown = () => {
    const reportText = generateReportContent();
    const blob = new Blob([reportText], { type: 'text/markdown' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `architecture-proposal-${Date.now()}.md`;
    a.click();
    window.URL.revokeObjectURL(url);
    setShowExportMenu(false);
  };

  const exportAsPDF = () => {
    if (!proposal) return;

    // Create HTML content for PDF
    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Architecture Proposal Report</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      max-width: 800px;
      margin: 40px auto;
      padding: 20px;
      color: #333;
    }
    h1 { color: #ff6b35; border-bottom: 3px solid #ff6b35; padding-bottom: 10px; }
    h2 { color: #4a1a6b; margin-top: 30px; }
    h3 { color: #2dd881; margin-top: 20px; }
    ul { list-style-type: none; padding-left: 0; }
    li { padding: 5px 0; padding-left: 20px; position: relative; }
    li:before { content: "▸"; position: absolute; left: 0; color: #ff6b35; }
    .priority { 
      display: inline-block; 
      padding: 4px 12px; 
      border-radius: 4px; 
      font-weight: bold; 
      font-size: 12px;
    }
    .priority-high { background: #fee; color: #c00; }
    .priority-medium { background: #ffc; color: #880; }
    .meta { color: #666; font-size: 14px; }
    .footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #ddd; text-align: center; color: #999; }
  </style>
</head>
<body>
  <h1>🎃 Architecture Proposal Report</h1>
  <p class="meta"><strong>Generated:</strong> ${new Date().toLocaleString()}</p>
  
  <h2>Current Stack</h2>
  <ul>
    ${proposal.currentStack
      .map(
        tech => `
      <li style="margin-bottom: 12px;">
        <strong>❌ ${tech.name}</strong>${tech.version ? ` <span style="color: #666;">(v${tech.version})</span>` : ''}
        ${tech.issue ? `<br><span style="color: #999; font-size: 14px; margin-left: 20px;">⚠️ ${tech.issue}</span>` : ''}
      </li>
    `
      )
      .join('')}
  </ul>
  
  <h2>Proposed Stack</h2>
  <ul>
    ${proposal.proposedStack.map(tech => `<li>✓ ${tech}</li>`).join('')}
  </ul>
  
  <h2>Migration Strategy</h2>
  <p>${proposal.migrationStrategy}</p>
  <p><strong>Estimated Effort:</strong> ${proposal.estimatedEffort}</p>
  
  <h2>Implementation Phases</h2>
  ${proposal.phases
    .map(
      phase => `
    <div style="margin-bottom: 30px;">
      <h3>Phase ${phase.phase}: ${phase.title} 
        <span class="priority priority-${phase.priority}">${phase.priority.toUpperCase()}</span>
      </h3>
      <p>${phase.description}</p>
      <p><strong>Tasks:</strong></p>
      <ul>
        ${phase.tasks.map(task => `<li>${task}</li>`).join('')}
      </ul>
    </div>
  `
    )
    .join('')}
  
  <div class="footer">
    Generated by Haunted Refactorium
  </div>
</body>
</html>
`;

    // Open print dialog for PDF
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(htmlContent);
      printWindow.document.close();
      printWindow.focus();
      setTimeout(() => {
        printWindow.print();
      }, 250);
    }
    setShowExportMenu(false);
  };

  if (loading) {
    return (
      <div className="text-center py-20">
        <div className="text-6xl mb-4 float-animation">{theme.spooky ? '🔮' : '⏳'}</div>
        <p className="text-xl text-gray-300">
          {theme.spooky ? 'Conjuring your resurrection plan...' : 'Generating proposal...'}
        </p>
      </div>
    );
  }

  if (!proposal) {
    return (
      <div className="text-center py-20">
        <p className="text-xl text-red-400">Proposal not found</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h2 className="text-4xl font-bold mb-4 text-haunted-orange">
          {theme.spooky ? '⚡ Resurrection Plan' : '🏗️ Architecture Proposal'}
        </h2>
        <p className="text-xl text-gray-300">
          {theme.spooky
            ? 'Your path from the cursed past to a modern future'
            : 'Modernization strategy and implementation plan'}
        </p>
      </div>

      {/* Stack Comparison */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-haunted-gray p-6 rounded-lg">
          <h3 className="text-2xl font-bold mb-4 text-haunted-orange">
            {theme.spooky ? '🔍 Current Stack Analysis' : '📦 Current Stack'}
          </h3>
          <ul className="space-y-3">
            {proposal.currentStack.map((tech, idx) => {
              const isClean = tech.issue?.startsWith('✓');
              return (
                <li
                  key={idx}
                  className={`border-l-2 pl-3 ${isClean ? 'border-haunted-green' : 'border-red-400'}`}
                >
                  <div className="flex items-start gap-2">
                    <span className={`mt-1 ${isClean ? 'text-haunted-green' : 'text-red-400'}`}>
                      {isClean ? '✓' : '⚠️'}
                    </span>
                    <div className="flex-1">
                      <div className="font-semibold">
                        {tech.name}
                        {tech.version && (
                          <span className="text-gray-400 ml-2 text-sm">v{tech.version}</span>
                        )}
                      </div>
                      {tech.issue && (
                        <div
                          className={`text-sm mt-1 ${isClean ? 'text-haunted-green' : 'text-yellow-400'}`}
                        >
                          {tech.issue}
                        </div>
                      )}
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="bg-haunted-gray p-6 rounded-lg">
          <h3 className="text-2xl font-bold mb-4 text-haunted-green">
            {theme.spooky ? '✨ Proposed (Resurrected)' : '🚀 Proposed Stack'}
          </h3>
          <ul className="space-y-2">
            {proposal.proposedStack.map((tech, idx) => (
              <li key={idx} className="flex items-center gap-2">
                <span className="text-haunted-green">✓</span>
                <span>{tech}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Migration Strategy */}
      <div className="bg-haunted-gray p-6 rounded-lg mb-8">
        <h3 className="text-2xl font-bold mb-4 text-haunted-orange">
          {theme.spooky ? '🗺️ Resurrection Strategy' : '📋 Migration Strategy'}
        </h3>
        <div className="text-gray-300">
          <Markdown
            components={{
              h1: ({ children }) => (
                <h4 className="text-xl font-bold text-haunted-orange mt-6 mb-3 first:mt-0">
                  {children}
                </h4>
              ),
              h2: ({ children }) => (
                <h5 className="text-lg font-bold text-haunted-green mt-5 mb-2 first:mt-0">
                  {children}
                </h5>
              ),
              h3: ({ children }) => (
                <h6 className="text-base font-bold text-white mt-4 mb-2 first:mt-0">{children}</h6>
              ),
              p: ({ children }) => <p className="mb-4 leading-relaxed text-gray-300">{children}</p>,
              ul: ({ children }) => (
                <ul className="list-disc list-inside ml-4 mb-4 space-y-2 text-gray-300">
                  {children}
                </ul>
              ),
              ol: ({ children }) => (
                <ol className="list-decimal list-inside ml-4 mb-4 space-y-2 text-gray-300">
                  {children}
                </ol>
              ),
              li: ({ children }) => <li className="leading-relaxed">{children}</li>,
              strong: ({ children }) => (
                <strong className="font-bold text-white">{children}</strong>
              ),
              em: ({ children }) => <em className="italic text-haunted-green">{children}</em>,
              code: ({ children }) => (
                <code className="bg-black bg-opacity-50 px-2 py-1 rounded text-haunted-green font-mono text-sm">
                  {children}
                </code>
              ),
              pre: ({ children }) => (
                <pre className="bg-black bg-opacity-50 p-4 rounded-lg mb-4 overflow-x-auto">
                  {children}
                </pre>
              ),
              blockquote: ({ children }) => (
                <blockquote className="border-l-4 border-haunted-orange pl-4 italic text-gray-400 my-4">
                  {children}
                </blockquote>
              ),
              a: ({ children, href }) => (
                <a
                  href={href}
                  className="text-haunted-orange hover:text-haunted-green underline transition"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {children}
                </a>
              ),
            }}
          >
            {proposal.migrationStrategy}
          </Markdown>
        </div>
        <div className="flex items-center gap-4 text-sm mt-6 pt-4 border-t border-gray-700">
          <span className="text-gray-400">Estimated Effort:</span>
          <span className="px-3 py-1 bg-haunted-orange rounded font-bold">
            {proposal.estimatedEffort}
          </span>
        </div>
      </div>

      {/* Migration Phases */}
      <div className="space-y-6 mb-8">
        <h3 className="text-2xl font-bold text-haunted-orange">
          {theme.spooky ? '📜 Ritual Phases' : '📅 Implementation Phases'}
        </h3>
        {proposal.phases.map(phase => (
          <div key={phase.phase} className="bg-haunted-gray p-6 rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-xl font-bold">
                Phase {phase.phase}: {phase.title}
              </h4>
              <span
                className={`px-3 py-1 rounded text-sm font-bold ${
                  phase.priority === 'high'
                    ? 'bg-red-900 text-red-300'
                    : 'bg-yellow-900 text-yellow-300'
                }`}
              >
                {phase.priority.toUpperCase()}
              </span>
            </div>
            <p className="text-gray-300 mb-4">{phase.description}</p>
            <ul className="space-y-2">
              {phase.tasks.map((task, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-haunted-green mt-1">▸</span>
                  <span>{task}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Download Actions */}
      <div className="flex gap-4 justify-center">
        <button
          onClick={downloadScaffold}
          disabled={downloadingScaffold}
          className="px-8 py-4 bg-haunted-orange text-white font-bold rounded-lg hover:bg-opacity-90 disabled:opacity-50 transition"
        >
          {downloadingScaffold
            ? '⏳ Generating...'
            : theme.spooky
              ? '📦 Download Scaffold'
              : '📦 Download Project Scaffold'}
        </button>

        <div className="relative">
          <button
            onClick={() => setShowExportMenu(!showExportMenu)}
            className="px-8 py-4 bg-haunted-purple text-white font-bold rounded-lg hover:bg-opacity-90 transition"
          >
            {theme.spooky ? '📜 Export Full Report' : '📄 Export Report'}
          </button>

          {showExportMenu && (
            <div className="absolute bottom-full mb-2 right-0 bg-haunted-gray border-2 border-haunted-purple rounded-lg shadow-xl overflow-hidden z-10">
              <button
                onClick={exportAsMarkdown}
                className="block w-full px-6 py-3 text-left hover:bg-haunted-purple transition whitespace-nowrap"
              >
                📝 Export as Markdown
              </button>
              <button
                onClick={exportAsPDF}
                className="block w-full px-6 py-3 text-left hover:bg-haunted-purple transition whitespace-nowrap"
              >
                📄 Export as PDF
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
