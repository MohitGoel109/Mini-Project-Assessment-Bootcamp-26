import { useCallback, useRef } from 'react';

// Speaks the alien's name aloud using the browser's built-in Text-to-Speech
// (Web Speech API), pushed to sound as punchy/dramatic as the TTS engine
// allows: faster rate, raised pitch, max volume, and a simulated echo tail
// built from layered low-volume repeat utterances + a generated "boom" swell
// underneath via Web Audio (since SpeechSynthesisUtterance itself has no
// reverb/echo controls — this fakes that effect around it).
export function useVoiceShout() {
  const voiceRef = useRef(null);
  const audioCtxRef = useRef(null);

  const pickVoice = useCallback(() => {
    if (voiceRef.current) return voiceRef.current;
    if (typeof window === 'undefined' || !window.speechSynthesis) return null;
    const voices = window.speechSynthesis.getVoices();
    const preferred = voices.find(v => /male|david|fred|google us english/i.test(v.name) && /en/i.test(v.lang))
      || voices.find(v => /en/i.test(v.lang))
      || voices[0]
      || null;
    voiceRef.current = preferred;
    return preferred;
  }, []);

  const ensureAudioCtx = useCallback(() => {
    if (audioCtxRef.current) return audioCtxRef.current;
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return null;
    audioCtxRef.current = new AudioCtx();
    return audioCtxRef.current;
  }, []);

  const playBoom = useCallback(() => {
    const ctx = ensureAudioCtx();
    if (!ctx) return;
    if (ctx.state === 'suspended') ctx.resume();

    const osc = ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(140, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(45, ctx.currentTime + 0.5);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.35, ctx.currentTime + 0.04);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.65);
  }, [ensureAudioCtx]);

  const speakOnce = useCallback((text, { pitch, rate, volume }) => {
    const utterance = new SpeechSynthesisUtterance(text);
    const voice = pickVoice();
    if (voice) utterance.voice = voice;
    utterance.pitch = pitch;
    utterance.rate = rate;
    utterance.volume = volume;
    window.speechSynthesis.speak(utterance);
  }, [pickVoice]);

  const shout = useCallback((name) => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;
    try {
      window.speechSynthesis.cancel();
      playBoom();

      const upper = name.toUpperCase();
      speakOnce(`${upper}!`, { pitch: 1.55, rate: 1.18, volume: 1 });
      setTimeout(() => speakOnce(upper, { pitch: 1.45, rate: 1.05, volume: 0.35 }), 260);
      setTimeout(() => speakOnce(upper, { pitch: 1.35, rate: 0.95, volume: 0.15 }), 520);
    } catch {
      // Speech synthesis unavailable or blocked — fail silently, animation still plays.
    }
  }, [playBoom, speakOnce]);

  return shout;
}