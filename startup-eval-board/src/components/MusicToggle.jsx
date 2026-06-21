import { Volume2, VolumeX } from 'lucide-react';
import { useBackgroundMusic } from '../hooks/useBackgroundMusic.js';

// Always-visible header button controlling the generated chiptune background
// loop. Music never auto-starts (browsers block audio before a user gesture
// anyway) — the user explicitly opts in by clicking this.
export default function MusicToggle() {
  const { enabled, toggle } = useBackgroundMusic();

  return (
    <button
      className={`music-toggle ${enabled ? 'active' : ''}`}
      onClick={toggle}
      title={enabled ? 'Mute background music' : 'Play background music'}
    >
      {enabled ? <Volume2 size={15} /> : <VolumeX size={15} />}
    </button>
  );
}