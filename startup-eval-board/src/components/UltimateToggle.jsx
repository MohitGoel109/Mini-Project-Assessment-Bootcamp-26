import { Sparkles } from 'lucide-react';
import { useTheme } from '../context/ThemeContext.jsx';

// Always-visible button next to the theme name. Flips the CURRENT alien
// between its Base and Ultimate form. Separate from ThemePicker, which only
// ever applies an alien's Base form when an alien is selected from the list.
export default function UltimateToggle() {
  const { isUltimate, toggleUltimate, currentAlienId } = useTheme();

  return (
    <button
      className={`ultimate-toggle ${isUltimate ? 'active' : ''}`}
      onClick={toggleUltimate}
      title={isUltimate ? 'Revert to base form' : 'Evolve to Ultimate form'}
    >
      <Sparkles size={13} />
      <span>{isUltimate ? 'Ultimate' : 'Evolve'}</span>
    </button>
  );
}