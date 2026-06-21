import { createContext, useContext, useState, useCallback } from 'react';
import { ALIENS, getTheme, isUltimateKey, alienIdFromKey } from '../data/themes.js';
import { useVoiceShout } from '../hooks/useVoiceShout.js';

const ThemeContext = createContext(null);

function applyTheme(theme) {
  const root = document.documentElement;
  Object.entries(theme.vars).forEach(([key, val]) => {
    root.style.setProperty(key, val);
  });
}

export function ThemeProvider({ children }) {
  // themeKey is either "alienId" (base form) or "alienId:ultimate" (evolved form)
  const [themeKey, setThemeKey] = useState('ben10');
  const [transforming, setTransforming] = useState(null); // theme object mid-transformation
  const shout = useVoiceShout();

  const theme = getTheme(themeKey);

  const setTheme = useCallback((key) => {
    if (key === themeKey) return;
    const next = getTheme(key);
    setTransforming(next);

    // Apply new CSS vars partway through the flash, so the reveal matches the animation peak
    setTimeout(() => applyTheme(next), 480);
    setTimeout(() => setThemeKey(key), 480);

    // Shout the alien's name right as the flash peaks (matches the
    // .transform-flash CSS animation-delay of 0.5s) — feels like the
    // character announcing its own transformation.
    setTimeout(() => shout(next.name), 500);

    // Clear overlay after animation completes
    setTimeout(() => setTransforming(null), 1450);
  }, [themeKey, shout]);

  // Convenience: evolve the CURRENT alien to its Ultimate form (or back to base).
  const toggleUltimate = useCallback(() => {
    const alienId = alienIdFromKey(themeKey);
    const nextKey = isUltimateKey(themeKey) ? alienId : `${alienId}:ultimate`;
    setTheme(nextKey);
  }, [themeKey, setTheme]);

  // Apply default theme on first mount
  useState(() => { applyTheme(theme); });

  return (
    <ThemeContext.Provider value={{
      theme,
      themeKey,
      setTheme,
      toggleUltimate,
      aliens: ALIENS,
      isUltimate: isUltimateKey(themeKey),
      currentAlienId: alienIdFromKey(themeKey),
      transforming,
    }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}