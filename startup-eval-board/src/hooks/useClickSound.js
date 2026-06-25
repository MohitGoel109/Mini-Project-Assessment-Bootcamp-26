import { useCallback, useRef } from 'react';

// Ben 10 Omnitrix-inspired UI sounds generated entirely via Web Audio API.
// Four distinct sound types to match the weight/meaning of different button
// actions in the app — no audio files needed, all synthesized on-the-fly.
//
// TICK    — Omnitrix dial mechanical click. Navigation tabs, generic toggles.
// CONFIRM — Power-up ascending beep. Primary actions: Add, Save.
// DELETE  — Low descending blip. Destructive actions: Delete.
// SCAN    — Quick sci-fi scanner blip. Filters, chips, picker selection.

function createCtx(ctxRef) {
  if (ctxRef.current) return ctxRef.current;
  const AudioCtx = window.AudioContext || window.webkitAudioContext;
  if (!AudioCtx) return null;
  ctxRef.current = new AudioCtx();
  return ctxRef.current;
}

function ensureResumed(ctx) {
  if (ctx.state === 'suspended') ctx.resume();
}

// ── TICK: short mechanical Omnitrix dial click
function playTick(ctx) {
  const t = ctx.currentTime;

  const osc = ctx.createOscillator();
  osc.type = 'square';
  osc.frequency.setValueAtTime(420, t);
  osc.frequency.exponentialRampToValueAtTime(180, t + 0.04);

  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.18, t);
  gain.gain.exponentialRampToValueAtTime(0.001, t + 0.06);

  osc.connect(gain); gain.connect(ctx.destination);
  osc.start(t); osc.stop(t + 0.07);

  const snap = ctx.createOscillator();
  snap.type = 'sine';
  snap.frequency.setValueAtTime(3200, t);
  snap.frequency.exponentialRampToValueAtTime(800, t + 0.015);

  const snapGain = ctx.createGain();
  snapGain.gain.setValueAtTime(0.08, t);
  snapGain.gain.exponentialRampToValueAtTime(0.001, t + 0.02);

  snap.connect(snapGain); snapGain.connect(ctx.destination);
  snap.start(t); snap.stop(t + 0.025);
}

// ── CONFIRM: ascending two-tone power-up beep (Omnitrix lock-in)
function playConfirm(ctx) {
  const t = ctx.currentTime;
  const notes = [660, 1100];

  notes.forEach((freq, i) => {
    const start = t + i * 0.07;
    const osc = ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, start);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0, start);
    gain.gain.linearRampToValueAtTime(0.22, start + 0.012);
    gain.gain.exponentialRampToValueAtTime(0.001, start + 0.1);

    osc.connect(gain); gain.connect(ctx.destination);
    osc.start(start); osc.stop(start + 0.11);
  });

  const bufferSize = ctx.sampleRate * 0.06;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) data[i] = (Math.random() * 2 - 1) * 0.04;

  const noise = ctx.createBufferSource();
  noise.buffer = buffer;
  const noiseFilter = ctx.createBiquadFilter();
  noiseFilter.type = 'bandpass';
  noiseFilter.frequency.value = 1200;
  const noiseGain = ctx.createGain();
  noiseGain.gain.setValueAtTime(0.06, t);
  noiseGain.gain.exponentialRampToValueAtTime(0.001, t + 0.06);

  noise.connect(noiseFilter); noiseFilter.connect(noiseGain); noiseGain.connect(ctx.destination);
  noise.start(t); noise.stop(t + 0.06);
}

// ── DELETE: descending warning blip (low, heavy — danger confirmation)
function playDelete(ctx) {
  const t = ctx.currentTime;
  const notes = [440, 280];

  notes.forEach((freq, i) => {
    const start = t + i * 0.055;
    const osc = ctx.createOscillator();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(freq, start);
    osc.frequency.exponentialRampToValueAtTime(freq * 0.7, start + 0.08);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.15, start);
    gain.gain.exponentialRampToValueAtTime(0.001, start + 0.09);

    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 900;

    osc.connect(filter); filter.connect(gain); gain.connect(ctx.destination);
    osc.start(start); osc.stop(start + 0.1);
  });
}

// ── SCAN: quick sci-fi scanner/radar blip (Omnitrix scanning an alien)
function playScan(ctx) {
  const t = ctx.currentTime;

  const osc = ctx.createOscillator();
  osc.type = 'sine';
  osc.frequency.setValueAtTime(880, t);
  osc.frequency.linearRampToValueAtTime(1320, t + 0.04);
  osc.frequency.exponentialRampToValueAtTime(660, t + 0.09);

  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0, t);
  gain.gain.linearRampToValueAtTime(0.16, t + 0.008);
  gain.gain.exponentialRampToValueAtTime(0.001, t + 0.1);

  osc.connect(gain); gain.connect(ctx.destination);
  osc.start(t); osc.stop(t + 0.11);
}

// ─────────────────────────────────────────────────────────
// Public hook — returns a playClick(type) function.
// type: 'tick' | 'confirm' | 'delete' | 'scan' (default: 'tick')
// ─────────────────────────────────────────────────────────
export function useClickSound() {
  const ctxRef = useRef(null);

  const playClick = useCallback((type = 'tick') => {
    if (typeof window === 'undefined') return;
    try {
      const ctx = createCtx(ctxRef);
      if (!ctx) return;
      ensureResumed(ctx);

      switch (type) {
        case 'confirm': return playConfirm(ctx);
        case 'delete':  return playDelete(ctx);
        case 'scan':    return playScan(ctx);
        default:        return playTick(ctx);
      }
    } catch { /* Web Audio unavailable — fail silently */ }
  }, []);

  return playClick;
}