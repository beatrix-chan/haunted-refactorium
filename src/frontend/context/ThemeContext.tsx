import React, { createContext, useContext, useState, useEffect } from 'react';
import { ThemeMode } from '../../shared/types';

interface ThemeContextType {
  theme: ThemeMode;
  updateTheme: (updates: Partial<ThemeMode>) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<ThemeMode>({
    spooky: true,
    highContrast: false,
    font: 'jetbrains',
  });

  useEffect(() => {
    const saved = localStorage.getItem('theme');
    if (saved) {
      setTheme(JSON.parse(saved));
    }
  }, []);

  const updateTheme = (updates: Partial<ThemeMode>) => {
    const newTheme = { ...theme, ...updates };
    setTheme(newTheme);
    localStorage.setItem('theme', JSON.stringify(newTheme));

    // Apply theme classes
    document.body.classList.toggle('high-contrast', newTheme.highContrast);
    document.body.classList.toggle('font-dyslexic', newTheme.font === 'dyslexic');
  };

  return <ThemeContext.Provider value={{ theme, updateTheme }}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}
