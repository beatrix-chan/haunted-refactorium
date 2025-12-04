import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

export default function Header() {
  const { theme, updateTheme } = useTheme();

  return (
    <header className="bg-haunted-purple border-b-2 border-haunted-orange">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <span className="text-4xl float-animation">👻</span>
            <div>
              <h1 className="text-2xl font-bold text-haunted-orange">
                {theme.spooky ? 'Haunted Refactorium' : 'Code Refactoring Tool'}
              </h1>
              <p className="text-sm text-gray-300">
                {theme.spooky
                  ? 'Where legacy code goes to be resurrected'
                  : 'Modernize your codebase'}
              </p>
            </div>
          </Link>

          <div className="flex items-center gap-4">
            <button
              onClick={() => updateTheme({ spooky: !theme.spooky })}
              className="px-4 py-2 bg-haunted-gray rounded hover:bg-haunted-orange transition"
              aria-label="Toggle spooky mode"
            >
              {theme.spooky ? '🎃 Spooky' : '💼 Professional'}
            </button>

            <a
              href="/docs"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-haunted-gray rounded hover:bg-haunted-orange transition"
              aria-label="View documentation"
            >
              📚 Docs
            </a>

            <button
              onClick={() =>
                updateTheme({ font: theme.font === 'jetbrains' ? 'dyslexic' : 'jetbrains' })
              }
              className="px-4 py-2 bg-haunted-gray rounded hover:bg-haunted-orange transition"
              aria-label="Toggle font"
            >
              {theme.font === 'jetbrains' ? 'Aa' : 'Aa'}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
