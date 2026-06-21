import { useRef, useCallback, useState, useEffect } from 'react';

// Plays the real background music track at public/audio/bgm.mp3 on a loop.
// Browsers block audio autoplay until a user gesture, so playback only
// actually starts once the user clicks the music toggle button themselves —
// that click IS the gesture, so no separate "arming" step is needed here.
//
// import.meta.env.BASE_URL resolves to "/" in local dev and to whatever
// `base` is set to in vite.config.js (e.g. "/startup-eval-board/") once
// built/deployed — using it here means this path is correct in both cases.
const BGM_SRC = `${import.meta.env.BASE_URL}audio/bgm.mp3`;
const DEFAULT_VOLUME = 0.35;

export function useBackgroundMusic() {
  const audioRef = useRef(null);
  const [enabled, setEnabled] = useState(false);

  const ensureAudio = useCallback(() => {
    if (audioRef.current) return audioRef.current;
    const audio = new Audio(BGM_SRC);
    audio.loop = true; // native seamless looping for the whole clip
    audio.volume = DEFAULT_VOLUME;
    audio.preload = 'auto';
    audioRef.current = audio;
    return audio;
  }, []);

  const start = useCallback(() => {
    const audio = ensureAudio();
    audio.play()
      .then(() => setEnabled(true))
      .catch((err) => {
        // Surface the real reason instead of failing silently — most common
        // cause is the file not being found at public/audio/bgm.mp3 (404),
        // which shows up here as a NotSupportedError or similar.
        console.error('[useBackgroundMusic] Failed to play bgm.mp3:', err.message || err);
        setEnabled(false);
      });
  }, [ensureAudio]);

  const stop = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    setEnabled(false);
  }, []);

  const toggle = useCallback(() => {
    if (enabled) stop(); else start();
  }, [enabled, start, stop]);

  const setVolume = useCallback((v) => {
    if (audioRef.current) audioRef.current.volume = v;
  }, []);

  // Pause cleanly if the component using this hook unmounts (e.g. hot reload).
  useEffect(() => () => {
    if (audioRef.current) audioRef.current.pause();
  }, []);

  return { enabled, toggle, setVolume };
}