import { createContext, useContext, useState, useCallback } from 'react';
import { THEMES, getTheme } from '../data/themes.js';

const ThemeContext = createContext(null);

function applyTheme(theme) {
  const root = document.documentElement;
  Object.entries(theme.vars).forEach(([key, val]) => {
    root.style.setProperty(key, val);
  });
}

export function ThemeProvider({ children }) {
  const [themeId, setThemeId] = useState('ben10');
  const [transforming, setTransforming] = useState(null); // theme object mid-transformation

  const theme = getTheme(themeId);

  const setTheme = useCallback((id) => {
    if (id === themeId) return;
    const next = getTheme(id);
    setTransforming(next);

    // Apply new CSS vars partway through the flash, so the reveal matches the animation peak
    setTimeout(() => applyTheme(next), 480);
    setTimeout(() => setThemeId(id), 480);

    // Clear overlay after animation completes
    setTimeout(() => setTransforming(null), 1450);
  }, [themeId]);

  // Apply default theme on first mount
  useState(() => { applyTheme(theme); });

  return (
    <ThemeContext.Provider value={{ theme, themeId, setTheme, themes: THEMES, transforming }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}
