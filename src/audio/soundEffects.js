// Web Audio API Synthesizer for MADC Interactive Experience
// High-tech sound effects generated purely in-browser without external audio files

class SoundFX {
  constructor() {
    this.ctx = null;
    this.enabled = true;
  }

  init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.ctx = new AudioContext();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggle(enabled) {
    this.enabled = enabled;
  }

  // Quick tactile UI click
  playClick() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const now = this.ctx.currentTime;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, now);
      osc.frequency.exponentialRampToValueAtTime(300, now + 0.04);

      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.04);
    } catch (e) {
      console.warn('Audio click error:', e);
    }
  }

  // Futuristic countdown tick beep
  playCountTick(countNumber) {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const now = this.ctx.currentTime;

      // Pitch increases as count gets closer to launch
      const baseFreq = countNumber === 1 ? 1046.5 : countNumber === 2 ? 880 : 659.25;

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(baseFreq, now);
      osc.frequency.exponentialRampToValueAtTime(baseFreq * 1.25, now + 0.12);

      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.15);
    } catch (e) {
      console.warn('Audio tick error:', e);
    }
  }

  // Charge-up sound effect when opening button is initiated
  playChargeUp(durationSec = 2.5) {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;

      // Sub-bass oscillator
      const subOsc = this.ctx.createOscillator();
      const subGain = this.ctx.createGain();
      subOsc.type = 'sawtooth';
      subOsc.frequency.setValueAtTime(65, now);
      subOsc.frequency.exponentialRampToValueAtTime(440, now + durationSec);

      // Lowpass filter for smooth futuristic sweep
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(150, now);
      filter.frequency.exponentialRampToValueAtTime(3200, now + durationSec);
      filter.Q.setValueAtTime(4, now);

      subGain.gain.setValueAtTime(0.01, now);
      subGain.gain.linearRampToValueAtTime(0.22, now + durationSec * 0.85);
      subGain.gain.linearRampToValueAtTime(0.01, now + durationSec);

      subOsc.connect(filter);
      filter.connect(subGain);
      subGain.connect(this.ctx.destination);

      subOsc.start(now);
      subOsc.stop(now + durationSec);
    } catch (e) {
      console.warn('Audio charge error:', e);
    }
  }

  // Hyperspace warp / launch explosion shockwave
  playLaunchWarp() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;

      // Noise buffer for blast/whoosh
      const bufferSize = this.ctx.sampleRate * 1.5;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const noiseFilter = this.ctx.createBiquadFilter();
      noiseFilter.type = 'bandpass';
      noiseFilter.frequency.setValueAtTime(300, now);
      noiseFilter.frequency.exponentialRampToValueAtTime(4000, now + 0.3);
      noiseFilter.frequency.exponentialRampToValueAtTime(120, now + 1.2);
      noiseFilter.Q.setValueAtTime(3, now);

      const noiseGain = this.ctx.createGain();
      noiseGain.gain.setValueAtTime(0.28, now);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 1.2);

      noise.connect(noiseFilter);
      noiseFilter.connect(noiseGain);
      noiseGain.connect(this.ctx.destination);

      noise.start(now);
      noise.stop(now + 1.2);

      // Deep sub drop
      const boomOsc = this.ctx.createOscillator();
      const boomGain = this.ctx.createGain();
      boomOsc.type = 'sine';
      boomOsc.frequency.setValueAtTime(150, now);
      boomOsc.frequency.exponentialRampToValueAtTime(32, now + 0.8);

      boomGain.gain.setValueAtTime(0.35, now);
      boomGain.gain.exponentialRampToValueAtTime(0.001, now + 0.8);

      boomOsc.connect(boomGain);
      boomGain.connect(this.ctx.destination);

      boomOsc.start(now);
      boomOsc.stop(now + 0.8);
    } catch (e) {
      console.warn('Audio launch error:', e);
    }
  }

  // Realistic celebration fireworks & crackers sound
  playCrackersExplosion() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;

      // Burst of multiple cracker pops
      const numCrackers = 8;
      for (let i = 0; i < numCrackers; i++) {
        const delay = i * 0.12 + Math.random() * 0.08;
        const popTime = now + delay;

        // White noise pop
        const bufferSize = this.ctx.sampleRate * 0.25;
        const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let j = 0; j < bufferSize; j++) {
          data[j] = Math.random() * 2 - 1;
        }

        const noise = this.ctx.createBufferSource();
        noise.buffer = buffer;

        const filter = this.ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(1200 + Math.random() * 800, popTime);
        filter.frequency.exponentialRampToValueAtTime(100, popTime + 0.2);

        const gain = this.ctx.createGain();
        gain.gain.setValueAtTime(0.35, popTime);
        gain.gain.exponentialRampToValueAtTime(0.001, popTime + 0.22);

        noise.connect(filter);
        filter.connect(gain);
        gain.connect(this.ctx.destination);

        noise.start(popTime);
        noise.stop(popTime + 0.25);

        // Low frequency thud
        const thud = this.ctx.createOscillator();
        const thudGain = this.ctx.createGain();
        thud.type = 'triangle';
        thud.frequency.setValueAtTime(160 + Math.random() * 40, popTime);
        thud.frequency.exponentialRampToValueAtTime(40, popTime + 0.18);

        thudGain.gain.setValueAtTime(0.4, popTime);
        thudGain.gain.exponentialRampToValueAtTime(0.001, popTime + 0.18);

        thud.connect(thudGain);
        thudGain.connect(this.ctx.destination);

        thud.start(popTime);
        thud.stop(popTime + 0.18);
      }
    } catch (e) {
      console.warn('Audio crackers error:', e);
    }
  }

  // Welcome Arpeggio Chime upon website display
  playWelcomeChime() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      // Majestic chord: C5, E5, G5, B5, C6
      const freqs = [523.25, 659.25, 783.99, 987.77, 1046.5];

      freqs.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const startTime = now + idx * 0.08;

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, startTime);

        gain.gain.setValueAtTime(0.001, startTime);
        gain.gain.linearRampToValueAtTime(0.12, startTime + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.9);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(startTime);
        osc.stop(startTime + 0.9);
      });
    } catch (e) {
      console.warn('Audio chime error:', e);
    }
  }
}

export const soundFX = new SoundFX();
