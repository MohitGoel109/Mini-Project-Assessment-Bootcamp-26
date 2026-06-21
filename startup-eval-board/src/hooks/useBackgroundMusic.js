import { useRef, useCallback, useState, useEffect } from 'react';

// Generates a simple looping chiptune/synth background track using the Web
// Audio API — no audio files needed. A short arpeggio sequence repeats on a
// square-wave oscillator (classic 8-bit feel) with a soft low-pass filter
// and slow gain envelope so it sits in the background rather than dominating.
//
// Browsers block audio autoplay until a user gesture, so playback only
// actually starts the first time the user interacts with the page (handled
// by an internal click/keydown listener) — calling start() before that just
// arms it.

const NOTE_FREQS = {
  C4: 261.63, D4: 293.66, E4: 329.63, G4: 392.0, A4: 440.0,
  C5: 523.25, D5: 587.33, E5: 659.25, G5: 783.99,
};

// A short Ben-10-ish heroic arpeggio loop (root - fifth - octave - sixth pattern).
const SEQUENCE = [
  'C4', 'E4', 'G4', 'C5', 'G4', 'E4', 'D4', 'G4',
  'C4', 'E4', 'A4', 'C5', 'A4', 'E4', 'D4', 'G4',
];
const STEP_SECONDS = 0.22;

export function useBackgroundMusic() {
  const ctxRef = useRef(null);
  const masterGainRef = useRef(null);
  const filterRef = useRef(null);
  const schedulerRef = useRef(null);
  const stepRef = useRef(0);
  const nextNoteTimeRef = useRef(0);

  const [enabled, setEnabled] = useState(false);
  const [armed, setArmed] = useState(false); // true once a user gesture has occurred

  const ensureContext = useCallback(() => {
    if (ctxRef.current) return ctxRef.current;
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return null;
    const ctx = new AudioCtx();

    const masterGain = ctx.createGain();
    masterGain.gain.value = 0.06; // quiet background level, not intrusive
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 1800;

    masterGain.connect(filter);
    filter.connect(ctx.destination);

    ctxRef.current = ctx;
    masterGainRef.current = masterGain;
    filterRef.current = filter;
    return ctx;
  }, []);

  const playNote = useCallback((freq, time) => {
    const ctx = ctxRef.current;
    const masterGain = masterGainRef.current;
    if (!ctx || !masterGain) return;

    const osc = ctx.createOscillator();
    osc.type = 'square';
    osc.frequency.value = freq;

    const noteGain = ctx.createGain();
    noteGain.gain.setValueAtTime(0, time);
    noteGain.gain.linearRampToValueAtTime(0.9, time + 0.02);
    noteGain.gain.exponentialRampToValueAtTime(0.001, time + STEP_SECONDS * 0.9);

    osc.connect(noteGain);
    noteGain.connect(masterGain);

    osc.start(time);
    osc.stop(time + STEP_SECONDS);
  }, []);

  const scheduler = useCallback(() => {
    const ctx = ctxRef.current;
    if (!ctx) return;
    // Schedule notes slightly ahead of current time (standard Web Audio
    // look-ahead pattern) to keep timing tight regardless of JS timer jitter.
    while (nextNoteTimeRef.current < ctx.currentTime + 0.15) {
      const note = SEQUENCE[stepRef.current % SEQUENCE.length];
      playNote(NOTE_FREQS[note], nextNoteTimeRef.current);
      nextNoteTimeRef.current += STEP_SECONDS;
      stepRef.current += 1;
    }
  }, [playNote]);

  const stop = useCallback(() => {
    if (schedulerRef.current) {
      clearInterval(schedulerRef.current);
      schedulerRef.current = null;
    }
    setEnabled(false);
  }, []);

  const start = useCallback(() => {
    const ctx = ensureContext();
    if (!ctx) return;
    if (ctx.state === 'suspended') ctx.resume();
    if (schedulerRef.current) return; // already running

    nextNoteTimeRef.current = ctx.currentTime + 0.05;
    stepRef.current = 0;
    schedulerRef.current = setInterval(scheduler, 50);
    setEnabled(true);
  }, [ensureContext, scheduler]);

  const toggle = useCallback(() => {
    if (enabled) stop(); else start();
  }, [enabled, start, stop]);

  const setVolume = useCallback((v) => {
    if (masterGainRef.current) masterGainRef.current.gain.value = v;
  }, []);

  // Arm on first user gesture so browsers' autoplay policies don't block us;
  // does NOT auto-start music, just unlocks the AudioContext for later use.
  useEffect(() => {
    if (armed) return;
    const onGesture = () => {
      ensureContext();
      setArmed(true);
      window.removeEventListener('click', onGesture);
      window.removeEventListener('keydown', onGesture);
    };
    window.addEventListener('click', onGesture);
    window.addEventListener('keydown', onGesture);
    return () => {
      window.removeEventListener('click', onGesture);
      window.removeEventListener('keydown', onGesture);
    };
  }, [armed, ensureContext]);

  useEffect(() => () => stop(), [stop]);

  return { enabled, toggle, setVolume };
}