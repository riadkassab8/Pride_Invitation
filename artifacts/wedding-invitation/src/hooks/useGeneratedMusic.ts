import { useRef, useState } from "react";

// Elegant ambient piano-pad music generator using Web Audio API
// Chord progression: Cmaj → Fmaj → Am → Gmaj (romantic loop)

const CHORDS = [
  [261.63, 329.63, 392.0],   // C major
  [349.23, 440.0,  523.25],  // F major
  [220.0,  261.63, 329.63],  // A minor
  [196.0,  246.94, 293.66],  // G major
];

const CHORD_DURATION = 3.5; // seconds per chord
const FADE_TIME = 0.8;

function createReverb(ctx: AudioContext): ConvolverNode {
  const convolver = ctx.createConvolver();
  const rate = ctx.sampleRate;
  const length = rate * 2.5;
  const impulse = ctx.createBuffer(2, length, rate);
  for (let c = 0; c < 2; c++) {
    const ch = impulse.getChannelData(c);
    for (let i = 0; i < length; i++) {
      ch[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / length, 2.5);
    }
  }
  convolver.buffer = impulse;
  return convolver;
}

function playChord(
  ctx: AudioContext,
  dest: AudioNode,
  freqs: number[],
  startTime: number,
  duration: number,
  masterGain: GainNode,
) {
  freqs.forEach((freq, i) => {
    // Main tone (triangle = warmer than sine)
    const osc = ctx.createOscillator();
    osc.type = "triangle";
    osc.frequency.value = freq;

    // Very slight vibrato for warmth
    const lfo = ctx.createOscillator();
    lfo.frequency.value = 4.5 + i * 0.3;
    const lfoGain = ctx.createGain();
    lfoGain.gain.value = 0.8;
    lfo.connect(lfoGain);
    lfoGain.connect(osc.frequency);

    // Harmonic overtone (octave up, quieter)
    const osc2 = ctx.createOscillator();
    osc2.type = "sine";
    osc2.frequency.value = freq * 2;

    const envGain = ctx.createGain();
    envGain.gain.setValueAtTime(0, startTime);
    envGain.gain.linearRampToValueAtTime(0.06 - i * 0.008, startTime + FADE_TIME);
    envGain.gain.setValueAtTime(0.06 - i * 0.008, startTime + duration - FADE_TIME);
    envGain.gain.linearRampToValueAtTime(0, startTime + duration);

    const env2Gain = ctx.createGain();
    env2Gain.gain.setValueAtTime(0, startTime);
    env2Gain.gain.linearRampToValueAtTime(0.015, startTime + FADE_TIME);
    env2Gain.gain.setValueAtTime(0.015, startTime + duration - FADE_TIME);
    env2Gain.gain.linearRampToValueAtTime(0, startTime + duration);

    osc.connect(envGain);
    osc2.connect(env2Gain);
    envGain.connect(dest);
    env2Gain.connect(dest);

    osc.start(startTime);
    osc2.start(startTime);
    lfo.start(startTime);
    osc.stop(startTime + duration);
    osc2.stop(startTime + duration);
    lfo.stop(startTime + duration);
  });
}

function scheduleMusic(ctx: AudioContext, masterGain: GainNode, loopRef: { active: boolean }) {
  const reverb = createReverb(ctx);
  const reverbGain = ctx.createGain();
  reverbGain.gain.value = 0.35;
  reverb.connect(reverbGain);
  reverbGain.connect(masterGain);

  // Mix: dry + reverb
  const dryGain = ctx.createGain();
  dryGain.gain.value = 0.65;
  dryGain.connect(masterGain);

  let currentTime = ctx.currentTime + 0.1;
  let chordIdx = 0;

  const scheduleNext = () => {
    if (!loopRef.active) return;

    // Schedule a few chords ahead
    const lookahead = 4;
    for (let i = 0; i < lookahead; i++) {
      const chord = CHORDS[chordIdx % CHORDS.length];
      const overlap = 0.3; // slight crossfade between chords
      playChord(ctx, dryGain, chord, currentTime, CHORD_DURATION + overlap, masterGain);
      playChord(ctx, reverb, chord, currentTime, CHORD_DURATION + overlap, masterGain);
      currentTime += CHORD_DURATION;
      chordIdx++;
    }

    // Reschedule before the last buffered chord ends
    const delay = (lookahead - 1) * CHORD_DURATION * 1000 - 500;
    setTimeout(() => {
      if (loopRef.active) scheduleNext();
    }, delay);
  };

  scheduleNext();
}

export function useGeneratedMusic() {
  const [isMuted, setIsMuted] = useState(false);
  const ctxRef = useRef<AudioContext | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);
  const loopRef = useRef({ active: false });

  const play = () => {
    if (loopRef.current.active) return;

    const ctx = new AudioContext();
    ctxRef.current = ctx;

    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0, ctx.currentTime);
    masterGain.gain.linearRampToValueAtTime(0.9, ctx.currentTime + 2.5); // gentle fade in
    masterGain.connect(ctx.destination);
    masterGainRef.current = masterGain;

    loopRef.current.active = true;
    scheduleMusic(ctx, masterGain, loopRef.current);
  };

  const toggleMute = () => {
    if (!masterGainRef.current || !ctxRef.current) return;
    const next = !isMuted;
    const ctx = ctxRef.current;
    const gain = masterGainRef.current;
    if (next) {
      gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.3);
    } else {
      gain.gain.linearRampToValueAtTime(0.9, ctx.currentTime + 0.3);
    }
    setIsMuted(next);
  };

  const stop = () => {
    loopRef.current.active = false;
    ctxRef.current?.close();
    ctxRef.current = null;
  };

  return { play, toggleMute, isMuted, stop };
}
