'use client';

import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from 'react';

export type Theme = 'light' | 'black-purple' | 'black-green';

const STORAGE_KEY = 'theme';
const THEMES: Theme[] = ['light', 'black-purple', 'black-green'];

type ThemeContextValue = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('black-purple');
  const hasHydrated = useRef(false);

  useEffect(() => {
    hasHydrated.current = true;
    const stored = localStorage.getItem(STORAGE_KEY) as Theme | null;
    if (stored && THEMES.includes(stored)) {
      setThemeState(stored);
    }
  }, []);

  useEffect(() => {
    if (hasHydrated.current) {
      document.documentElement.setAttribute('data-theme', theme);
    }
  }, [theme]);

  const setTheme = (next: Theme) => {
    setThemeState(next);
    localStorage.setItem(STORAGE_KEY, next);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme harus dipanggil di dalam ThemeProvider');
  return ctx;
}