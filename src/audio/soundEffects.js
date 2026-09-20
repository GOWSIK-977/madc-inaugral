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

      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.04);
    } catch (e) {
      console.warn('Audio click error:', e);
    }
  }

  // Dramatic cinematic countdown tick (Sub thump + digital pulse + rising tension)
  playCountTick(countNumber) {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;

      // 1. Sub-bass acoustic impact
      const subOsc = this.ctx.createOscillator();
      const subGain = this.ctx.createGain();
      subOsc.type = 'sine';
      const subFreq = countNumber === 1 ? 110 : countNumber === 2 ? 90 : 75;
      subOsc.frequency.setValueAtTime(subFreq, now);
      subOsc.frequency.exponentialRampToValueAtTime(30, now + 0.28);

      subGain.gain.setValueAtTime(0.45, now);
      subGain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

      subOsc.connect(subGain);
      subGain.connect(this.ctx.destination);
      subOsc.start(now);
      subOsc.stop(now + 0.32);

      // 2. High-energy resonant holographic chime
      const chimeOsc = this.ctx.createOscillator();
      const chimeGain = this.ctx.createGain();
      const pitch = countNumber === 1 ? 1200 : countNumber === 2 ? 960 : 720;
      chimeOsc.type = 'triangle';
      chimeOsc.frequency.setValueAtTime(pitch, now);
      chimeOsc.frequency.exponentialRampToValueAtTime(pitch * 1.5, now + 0.15);

      chimeGain.gain.setValueAtTime(0.28, now);
      chimeGain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);

      chimeOsc.connect(chimeGain);
      chimeGain.connect(this.ctx.destination);
      chimeOsc.start(now);
      chimeOsc.stop(now + 0.24);

      // 3. Crisp digital transient click
      const clickOsc = this.ctx.createOscillator();
      const clickGain = this.ctx.createGain();
      clickOsc.type = 'square';
      clickOsc.frequency.setValueAtTime(2400, now);
      clickOsc.frequency.exponentialRampToValueAtTime(400, now + 0.03);

      clickGain.gain.setValueAtTime(0.18, now);
      clickGain.gain.exponentialRampToValueAtTime(0.001, now + 0.035);

      clickOsc.connect(clickGain);
      clickGain.connect(this.ctx.destination);
      clickOsc.start(now);
      clickOsc.stop(now + 0.04);
    } catch (e) {
      console.warn('Audio tick error:', e);
    }
  }

  // Charge-up sound effect when opening button is initiated
  playChargeUp(durationSec = 2.8) {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;

      // Sub-bass rising drone
      const subOsc = this.ctx.createOscillator();
      const subGain = this.ctx.createGain();
      subOsc.type = 'sawtooth';
      subOsc.frequency.setValueAtTime(55, now);
      subOsc.frequency.exponentialRampToValueAtTime(520, now + durationSec);

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(120, now);
      filter.frequency.exponentialRampToValueAtTime(3600, now + durationSec);
      filter.Q.setValueAtTime(5, now);

      subGain.gain.setValueAtTime(0.01, now);
      subGain.gain.linearRampToValueAtTime(0.28, now + durationSec * 0.88);
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

  // Hyperspace launch explosion shockwave
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
      noiseFilter.frequency.exponentialRampToValueAtTime(4500, now + 0.3);
      noiseFilter.frequency.exponentialRampToValueAtTime(100, now + 1.4);
      noiseFilter.Q.setValueAtTime(3, now);

      const noiseGain = this.ctx.createGain();
      noiseGain.gain.setValueAtTime(0.35, now);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 1.4);

      noise.connect(noiseFilter);
      noiseFilter.connect(noiseGain);
      noiseGain.connect(this.ctx.destination);

      noise.start(now);
      noise.stop(now + 1.4);

      // Deep sonic sub drop
      const boomOsc = this.ctx.createOscillator();
      const boomGain = this.ctx.createGain();
      boomOsc.type = 'sine';
      boomOsc.frequency.setValueAtTime(160, now);
      boomOsc.frequency.exponentialRampToValueAtTime(25, now + 0.9);

      boomGain.gain.setValueAtTime(0.5, now);
      boomGain.gain.exponentialRampToValueAtTime(0.001, now + 0.9);

      boomOsc.connect(boomGain);
      boomGain.connect(this.ctx.destination);

      boomOsc.start(now);
      boomOsc.stop(now + 0.9);
    } catch (e) {
      console.warn('Audio launch error:', e);
    }
  }

  // Realistic festive celebration crackers (Authentic crackle burst chain + thunder pops)
  playCrackersExplosion() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;

      // 1. Initial Launch Rocket Whistle
      const whistleOsc = this.ctx.createOscillator();
      const whistleGain = this.ctx.createGain();
      whistleOsc.type = 'sine';
      whistleOsc.frequency.setValueAtTime(400, now);
      whistleOsc.frequency.exponentialRampToValueAtTime(2400, now + 0.35);

      whistleGain.gain.setValueAtTime(0.01, now);
      whistleGain.gain.linearRampToValueAtTime(0.18, now + 0.2);
      whistleGain.gain.exponentialRampToValueAtTime(0.001, now + 0.38);

      whistleOsc.connect(whistleGain);
      whistleGain.connect(this.ctx.destination);
      whistleOsc.start(now);
      whistleOsc.stop(now + 0.4);

      // 2. Main Aerial Shell BOOM
      const shellTime = now + 0.32;
      const shellOsc = this.ctx.createOscillator();
      const shellGain = this.ctx.createGain();
      shellOsc.type = 'sine';
      shellOsc.frequency.setValueAtTime(180, shellTime);
      shellOsc.frequency.exponentialRampToValueAtTime(32, shellTime + 0.6);

      shellGain.gain.setValueAtTime(0.55, shellTime);
      shellGain.gain.exponentialRampToValueAtTime(0.001, shellTime + 0.65);

      shellOsc.connect(shellGain);
      shellGain.connect(this.ctx.destination);
      shellOsc.start(shellTime);
      shellOsc.stop(shellTime + 0.7);

      // 3. Rapid festive garland crackle sequence (Ladi / Celebration crackers)
      const numCrackles = 24;
      for (let i = 0; i < numCrackles; i++) {
        const crackleTime = shellTime + 0.05 + (i * 0.08) + (Math.random() * 0.04);

        // Sharp noise snap
        const bufferSize = Math.floor(this.ctx.sampleRate * 0.08);
        const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let j = 0; j < bufferSize; j++) {
          data[j] = Math.random() * 2 - 1;
        }

        const noise = this.ctx.createBufferSource();
        noise.buffer = buffer;

        const filter = this.ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(1400 + Math.random() * 2200, crackleTime);
        filter.Q.setValueAtTime(2.5, crackleTime);

        const gain = this.ctx.createGain();
        const crackVolume = 0.25 + Math.random() * 0.2;
        gain.gain.setValueAtTime(crackVolume, crackleTime);
        gain.gain.exponentialRampToValueAtTime(0.001, crackleTime + 0.07);

        noise.connect(filter);
        filter.connect(gain);
        gain.connect(this.ctx.destination);

        noise.start(crackleTime);
        noise.stop(crackleTime + 0.08);

        // Occasional mini-thumps for rhythmic burst impact
        if (i % 3 === 0) {
          const miniThump = this.ctx.createOscillator();
          const miniGain = this.ctx.createGain();
          miniThump.type = 'triangle';
          miniThump.frequency.setValueAtTime(140 + Math.random() * 80, crackleTime);
          miniThump.frequency.exponentialRampToValueAtTime(45, crackleTime + 0.12);

          miniGain.gain.setValueAtTime(0.3, crackleTime);
          miniGain.gain.exponentialRampToValueAtTime(0.001, crackleTime + 0.12);

          miniThump.connect(miniGain);
          miniGain.connect(this.ctx.destination);
          miniThump.start(crackleTime);
          miniThump.stop(crackleTime + 0.13);
        }
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
