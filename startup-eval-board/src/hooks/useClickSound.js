import { useCallback, useRef } from 'react';

// A short synthesized "button click" blip (Web Audio API, no file needed) —
// plays instantly on any theme-related button press: opening the picker,
// selecting an alien, or hitting Evolve. Separate from the longer TTS shout,
// which fires later once the transformation animation completes.
export function useClickSound() {
  const ctxRef = useRef(null);

  const ensureContext = useCallback(() => {
    if (ctxRef.current) return ctxRef.current;
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return null;
    ctxRef.current = new AudioCtx();
    return ctxRef.current;
  }, []);

  const playClick = useCallback(() => {
    const ctx = ensureContext();
    if (!ctx) return;
    if (ctx.state === 'suspended') ctx.resume();

    // Single crisp tick — short attack, fast decay, like a UI button press.
    const start = ctx.currentTime;
    const osc = ctx.createOscillator();
    osc.type = 'square';
    osc.frequency.setValueAtTime(1100, start);
    osc.frequency.exponentialRampToValueAtTime(600, start + 0.05);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0, start);
    gain.gain.linearRampToValueAtTime(0.22, start + 0.006);
    gain.gain.exponentialRampToValueAtTime(0.001, start + 0.07);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(start);
    osc.stop(start + 0.08);
  }, [ensureContext]);

  return playClick;
}