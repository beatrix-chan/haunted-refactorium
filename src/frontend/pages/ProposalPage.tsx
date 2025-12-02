import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { ArchitectureProposal } from '../../shared/types';
import axios from 'axios';

export default function ProposalPage() {
  const { id } = useParams();
  const { theme } = useTheme();
  const [proposal, setProposal] = useState<ArchitectureProposal | null>(null);
  const [loading, setLoading] = useState(true);
  const [downloadingScaffold, setDownloadingScaffold] = useState(false);

  useEffect(() => {
    // In a real app, fetch proposal from API
    // For now, simulate with mock data
    setTimeout(() => {
      setProposal({
        id: id || '',
        analysisId: '',
        currentStack: ['jQuery', 'PHP', 'MySQL'],
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
    }, 1000);
  }, [id]);

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
          <h3 className="text-2xl font-bold mb-4 text-red-400">
            {theme.spooky ? '💀 Current (Cursed)' : '📦 Current Stack'}
          </h3>
          <ul className="space-y-2">
            {proposal.currentStack.map((tech, idx) => (
              <li key={idx} className="flex items-center gap-2">
                <span className="text-red-400">❌</span>
                <span>{tech}</span>
              </li>
            ))}
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
        <p className="text-gray-300 mb-4">{proposal.migrationStrategy}</p>
        <div className="flex items-center gap-4 text-sm">
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
        <button className="px-8 py-4 bg-haunted-purple text-white font-bold rounded-lg hover:bg-opacity-90 transition">
          {theme.spooky ? '📜 Export Full Report' : '📄 Export Report'}
        </button>
      </div>
    </div>
  );
}
