import { useTheme } from '../context/ThemeContext.jsx';

// Recharts SVG fills don't reliably re-render on CSS var changes in all browsers,
// so we resolve the active theme's palette directly from the theme object.
// Re-runs whenever themeId changes (theme object is stable per id).
export function useThemeColors() {
  const { theme } = useTheme();
  const v = theme.vars;
  return {
    accent: v['--accent'],
    accentDim: v['--accent-dim'],
    accentDark: v['--accent-dark'],
    accentSecondary: v['--accent-secondary'],
    textDim: v['--text-dim'],
    border: v['--border'],
    bgPanel: v['--bg-panel'],
    warn: '#ffae00',
    danger: '#ff3f3f',
    series: [v['--accent'], v['--accent-secondary'], v['--accent-dim'], '#ffae00', v['--accent-dark']],
  };
}
