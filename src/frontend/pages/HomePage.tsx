import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import axios from 'axios';

export default function HomePage() {
  const [file, setFile] = useState<File | null>(null);
  const [repoUrl, setRepoUrl] = useState('');
  const [inputMode, setInputMode] = useState<'file' | 'url'>('url');
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { theme } = useTheme();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setError('');
    }
  };

  const handleSubmit = async () => {
    if (inputMode === 'url') {
      await handleClone();
    } else {
      await handleUpload();
    }
  };

  const handleClone = async () => {
    if (!repoUrl) {
      setError('Please enter a repository URL');
      return;
    }

    setUploading(true);
    setError('');

    try {
      const response = await axios.post('/api/clone', { repoUrl });

      // Navigate directly to analysis if available
      if (response.data.analysisId) {
        // Poll for analysis completion
        const checkAnalysis = async () => {
          try {
            const analysisResponse = await axios.get(`/api/analysis/${response.data.analysisId}`);
            if (analysisResponse.data && analysisResponse.data.status === 'complete') {
              navigate(`/analysis/${analysisResponse.data.id}`);
            } else if (analysisResponse.data && analysisResponse.data.status === 'failed') {
              setError(
                theme.spooky
                  ? 'The spirits encountered an error during analysis.'
                  : 'Analysis failed. Please try again.'
              );
              setUploading(false);
            } else {
              setTimeout(checkAnalysis, 2000);
            }
          } catch {
            setTimeout(checkAnalysis, 2000);
          }
        };

        setTimeout(checkAnalysis, 2000);
      }
    } catch (err) {
      console.error('Clone error:', err);
      setError(
        theme.spooky
          ? "The spirits couldn't reach that repository. Please check the URL."
          : 'Failed to clone repository. Please check the URL and try again.'
      );
      setUploading(false);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError('Please select a file');
      return;
    }

    setUploading(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('archive', file);

      const response = await axios.post('/api/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      // Navigate to analysis if available
      if (response.data.analysisId) {
        navigate(`/analysis/${response.data.analysisId}`);
      }
    } catch (err) {
      console.error('Upload error:', err);
      setError(
        theme.spooky
          ? "The spirits couldn't process your codebase. Please try again."
          : 'Failed to upload file. Please try again.'
      );
      setUploading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-5xl font-bold mb-4 text-haunted-orange">
          {theme.spooky ? '🎃 Haunt Your Codebase' : 'Analyze Your Codebase'}
        </h2>
        <p className="text-xl text-gray-300">
          {theme.spooky
            ? 'Upload your legacy code or summon a GitHub repository to reveal its darkest secrets'
            : 'Upload your code or clone a repository to identify technical debt and modernization opportunities'}
        </p>
      </div>

      <div className="bg-haunted-gray rounded-lg p-8 shadow-xl">
        {/* Input Mode Toggle */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => {
              setInputMode('url');
              setError('');
            }}
            className={`flex-1 py-3 rounded-lg font-bold transition ${
              inputMode === 'url'
                ? 'bg-haunted-orange text-white'
                : 'bg-haunted-dark text-gray-400 hover:text-white'
            }`}
          >
            🔗 URL
          </button>
          <button
            onClick={() => {
              setInputMode('file');
              setError('');
            }}
            className={`flex-1 py-3 rounded-lg font-bold transition ${
              inputMode === 'file'
                ? 'bg-haunted-orange text-white'
                : 'bg-haunted-dark text-gray-400 hover:text-white'
            }`}
          >
            📦 Upload File
          </button>
        </div>

        {/* GitHub URL Input */}
        {inputMode === 'url' && (
          <div className="mb-6">
            <label className="block text-lg mb-2">
              {theme.spooky ? '🔗 Repository URL to Haunt' : '🔗 Repository URL'}
            </label>
            <input
              type="text"
              value={repoUrl}
              onChange={e => setRepoUrl(e.target.value)}
              placeholder="https://github.com/username/repo.git"
              className="w-full px-4 py-3 bg-haunted-dark rounded border-2 border-haunted-purple focus:border-haunted-orange outline-none text-white"
              aria-label="GitHub repository URL"
            />
            <p className="text-sm text-gray-400 mt-2">
              Supports repositories on major Git Hosting platforms. Read more{' '}
              <a href="./docs/guide/features">here</a>.
            </p>
          </div>
        )}

        {/* File Upload Input */}
        {inputMode === 'file' && (
          <div className="mb-6">
            <label className="block text-lg mb-2">
              {theme.spooky ? '📦 Select Archive to Haunt' : '📦 Select Code Archive'}
            </label>
            <input
              type="file"
              accept=".7z,.zip,.tar,.tar.gz,.tgz,.tar.bz2,.tar.xz"
              onChange={handleFileChange}
              className="w-full px-4 py-3 bg-haunted-dark rounded border-2 border-haunted-purple focus:border-haunted-orange outline-none"
              aria-label="Upload code archive"
            />
            <p className="text-sm text-gray-400 mt-2">
              Supported formats: .7z, .zip, .tar, .tar.gz
            </p>
          </div>
        )}

        {/* Selected File Display */}
        {file && inputMode === 'file' && (
          <div className="mb-6 p-4 bg-haunted-dark rounded">
            <p className="text-haunted-green">
              ✓ Selected: {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
            </p>
          </div>
        )}

        {/* Repository URL Display */}
        {repoUrl && inputMode === 'url' && (
          <div className="mb-6 p-4 bg-haunted-dark rounded">
            <p className="text-haunted-green">✓ Repository: {repoUrl}</p>
          </div>
        )}

        {/* Error Display */}
        {error && (
          <div className="mb-6 p-4 bg-red-900 bg-opacity-30 border border-red-500 rounded">
            <p className="text-red-300">{error}</p>
          </div>
        )}

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={
            (inputMode === 'file' && !file) || (inputMode === 'url' && !repoUrl) || uploading
          }
          className="w-full py-4 bg-haunted-orange text-white font-bold rounded-lg hover:bg-opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition text-lg"
        >
          {uploading
            ? theme.spooky
              ? '👻 Summoning the Spirits...'
              : '⏳ Analyzing...'
            : theme.spooky
              ? '🔮 Begin the Haunting'
              : '🚀 Start Analysis'}
        </button>
      </div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-haunted-gray p-6 rounded-lg">
          <div className="text-4xl mb-3">{theme.spooky ? '👻' : '🔍'}</div>
          <h3 className="text-xl font-bold mb-2 text-haunted-orange">
            {theme.spooky ? 'Detect Ghosts' : 'Detect Issues'}
          </h3>
          <p className="text-gray-300">
            {theme.spooky
              ? 'Identify ghostly dependencies and cursed code patterns'
              : 'Identify outdated dependencies and code smells'}
          </p>
        </div>

        <div className="bg-haunted-gray p-6 rounded-lg">
          <div className="text-4xl mb-3">{theme.spooky ? '🗺️' : '📋'}</div>
          <h3 className="text-xl font-bold mb-2 text-haunted-orange">
            {theme.spooky ? 'Resurrection Plan' : 'Migration Plan'}
          </h3>
          <p className="text-gray-300">
            {theme.spooky
              ? 'Get a detailed plan to resurrect your code from the dead'
              : 'Receive a detailed modernization strategy'}
          </p>
        </div>

        <div className="bg-haunted-gray p-6 rounded-lg">
          <div className="text-4xl mb-3">{theme.spooky ? '⚡' : '🏗️'}</div>
          <h3 className="text-xl font-bold mb-2 text-haunted-orange">
            {theme.spooky ? 'Modern Scaffold' : 'Project Scaffold'}
          </h3>
          <p className="text-gray-300">
            {theme.spooky
              ? 'Download a fresh scaffold to start your resurrection'
              : 'Download a modern project structure'}
          </p>
        </div>
      </div>
    </div>
  );
}
