import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { AnalysisResult } from '../../shared/types';
import { getSeverityColor, getSeverityLabel } from '../../shared/utils/severity';
import axios from 'axios';

export default function AnalysisPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [generatingProposal, setGeneratingProposal] = useState(false);

  useEffect(() => {
    loadAnalysis();
  }, [id]);

  const loadAnalysis = async () => {
    try {
      const response = await axios.get(`/api/analysis/${id}`);
      setAnalysis(response.data);
    } catch (error) {
      console.error('Failed to load analysis:', error);
    } finally {
      setLoading(false);
    }
  };

  const generateProposal = async () => {
    if (!analysis) return;

    setGeneratingProposal(true);
    try {
      const response = await axios.post('/api/proposal', { analysisId: analysis.id });
      
      // Store the proposal in sessionStorage so ProposalPage can access it
      sessionStorage.setItem(`proposal-${response.data.id}`, JSON.stringify(response.data));
      
      navigate(`/proposal/${response.data.id}`);
    } catch (error) {
      console.error('Failed to generate proposal:', error);
      setGeneratingProposal(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-20">
        <div className="text-6xl mb-4 float-animation">{theme.spooky ? '👻' : '⏳'}</div>
        <p className="text-xl text-gray-300">
          {theme.spooky ? 'The spirits are analyzing...' : 'Loading analysis...'}
        </p>
      </div>
    );
  }

  if (!analysis) {
    return (
      <div className="text-center py-20">
        <p className="text-xl text-red-400">Analysis not found</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h2 className="text-4xl font-bold mb-4 text-haunted-orange">
          {theme.spooky ? '🔮 Analysis Results' : '📊 Analysis Results'}
        </h2>
      </div>

      {/* Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-haunted-gray p-6 rounded-lg">
          <div className="text-3xl font-bold text-haunted-orange">
            {analysis.metrics.totalFiles}
          </div>
          <div className="text-gray-300">Total Files</div>
        </div>
        <div className="bg-haunted-gray p-6 rounded-lg">
          <div className="text-3xl font-bold text-haunted-orange">
            {analysis.metrics.totalLines}
          </div>
          <div className="text-gray-300">Lines of Code</div>
        </div>
        <div className="bg-haunted-gray p-6 rounded-lg">
          <div className="text-3xl font-bold text-haunted-orange">{analysis.codeSmells.length}</div>
          <div className="text-gray-300">{theme.spooky ? 'Code Smells' : 'Issues Found'}</div>
        </div>
        <div className="bg-haunted-gray p-6 rounded-lg">
          <div className="text-3xl font-bold text-haunted-orange">
            {analysis.metrics.technicalDebtScore}
          </div>
          <div className="text-gray-300">{theme.spooky ? 'Curse Level' : 'Debt Score'}</div>
        </div>
      </div>

      {/* Ghostly Dependencies */}
      {analysis.ghostlyDependencies.length > 0 && (
        <div className="bg-haunted-gray p-6 rounded-lg mb-8">
          <h3 className="text-2xl font-bold mb-4 text-haunted-orange">
            {theme.spooky ? '👻 Ghostly Dependencies' : '⚠️ Deprecated Dependencies'}
          </h3>
          <div className="space-y-2">
            {analysis.ghostlyDependencies.map((dep, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-3 bg-haunted-dark rounded"
              >
                <div>
                  <span className="font-bold">{dep.name}</span>
                  {dep.version && <span className="text-gray-400 ml-2">v{dep.version}</span>}
                </div>
                <span
                  className="px-3 py-1 rounded text-sm font-bold"
                  style={{
                    backgroundColor: getSeverityColor(dep.severity) + '40',
                    color: getSeverityColor(dep.severity),
                  }}
                >
                  {getSeverityLabel(dep.severity, theme.spooky)}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Cursed Files */}
      {analysis.cursedFiles.length > 0 && (
        <div className="bg-haunted-gray p-6 rounded-lg mb-8">
          <h3 className="text-2xl font-bold mb-4 text-haunted-orange">
            {theme.spooky ? '💀 Cursed Files' : '🔥 Problem Hotspots'}
          </h3>
          <div className="space-y-2">
            {analysis.cursedFiles.slice(0, 10).map((file, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-3 bg-haunted-dark rounded"
              >
                <div className="flex-1">
                  <div className="font-mono text-sm">{file.path}</div>
                  <div className="text-xs text-gray-400">
                    {file.issues} issues • Complexity: {file.complexity} • {file.lines} lines
                  </div>
                </div>
                <span
                  className="px-3 py-1 rounded text-sm font-bold ml-4"
                  style={{
                    backgroundColor: getSeverityColor(file.severity) + '40',
                    color: getSeverityColor(file.severity),
                  }}
                >
                  {getSeverityLabel(file.severity, theme.spooky)}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Code Smells */}
      {analysis.codeSmells.length > 0 && (
        <div className="bg-haunted-gray p-6 rounded-lg mb-8">
          <h3 className="text-2xl font-bold mb-4 text-haunted-orange">
            {theme.spooky ? '🕷️ Code Smells' : '🐛 Code Issues'}
          </h3>
          <div className="space-y-3">
            {analysis.codeSmells.slice(0, 15).map((smell, idx) => (
              <div key={idx} className="p-4 bg-haunted-dark rounded">
                <div className="flex items-start justify-between mb-2">
                  <div className="font-bold">{smell.description}</div>
                  <span
                    className="px-3 py-1 rounded text-xs font-bold ml-4"
                    style={{
                      backgroundColor: getSeverityColor(smell.severity) + '40',
                      color: getSeverityColor(smell.severity),
                    }}
                  >
                    {getSeverityLabel(smell.severity, theme.spooky)}
                  </span>
                </div>
                <div className="text-sm text-gray-400 mb-2">📁 {smell.file}</div>
                <div className="text-sm text-haunted-green">💡 {smell.recommendation}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Generate Proposal Button or Success Message */}
      <div className="text-center">
        {analysis.metrics.technicalDebtScore <= 20 ? (
          <div className="bg-haunted-green bg-opacity-20 border-2 border-haunted-green rounded-lg p-8 max-w-2xl mx-auto">
            <div className="text-6xl mb-4">{theme.spooky ? '✨🎉✨' : '🎉'}</div>
            <h3 className="text-3xl font-bold mb-4 text-haunted-green">
              {theme.spooky ? 'No Spirits Detected!' : 'Excellent Code Quality!'}
            </h3>
            <p className="text-xl text-gray-300 mb-4">
              {theme.spooky
                ? 'Your codebase is clean and free of curses. The spirits are pleased! 👻'
                : 'Your codebase is well-maintained with minimal technical debt. Great work!'}
            </p>
            <p className="text-gray-400">
              Technical Debt Score:{' '}
              <span className="text-haunted-green font-bold">
                {analysis.metrics.technicalDebtScore}
              </span>{' '}
              / 100
            </p>
            {analysis.codeSmells.length > 0 && (
              <p className="text-sm text-gray-400 mt-4">
                {theme.spooky
                  ? 'A few minor spirits linger, but nothing to worry about.'
                  : 'Minor improvements suggested above, but overall quality is excellent.'}
              </p>
            )}
          </div>
        ) : (
          <button
            onClick={generateProposal}
            disabled={generatingProposal}
            className="px-8 py-4 bg-haunted-orange text-white font-bold rounded-lg hover:bg-opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition text-lg"
          >
            {generatingProposal
              ? theme.spooky
                ? '🔮 Conjuring Architecture...'
                : '⏳ Generating Proposal...'
              : theme.spooky
                ? '⚡ Generate Resurrection Plan'
                : '🏗️ Generate Architecture Proposal'}
          </button>
        )}
      </div>
    </div>
  );
}
