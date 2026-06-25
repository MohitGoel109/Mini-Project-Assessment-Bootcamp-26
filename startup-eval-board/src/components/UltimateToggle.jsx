import { Sparkles } from 'lucide-react';
import { useTheme } from '../context/ThemeContext.jsx';
import { useClickSound } from '../hooks/useClickSound.js';

export default function UltimateToggle() {
  const { isUltimate, toggleUltimate } = useTheme();
  const playClick = useClickSound();

  const handleClick = () => {
    playClick('confirm'); // evolving feels like a power-up confirm
    toggleUltimate();
  };

  return (
    <button className={`ultimate-toggle ${isUltimate ? 'active' : ''}`}
      onClick={handleClick}
      title={isUltimate ? 'Revert to base form' : 'Evolve to Ultimate form'}>
      <Sparkles size={13} />
      <span>{isUltimate ? 'Ultimate' : 'Evolve'}</span>
    </button>
  );
}