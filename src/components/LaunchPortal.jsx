import React, { useState, useEffect, useRef } from 'react';
import { soundFX } from '../audio/soundEffects';

const TARGET_URL = "https://madc-xi.vercel.app/";

export function LaunchPortal({ onLaunchComplete, soundEnabled, onToggleSound }) {
  // Phases: 'idle' -> 'counting' -> 'crackers' -> 'completing'
  const [phase, setPhase] = useState('idle');
  const [count, setCount] = useState(3);

  const canvasRef = useRef(null);
  const animationFrameRef = useRef(null);
  const fireworksRef = useRef([]);
  const particlesRef = useRef([]);

  // High-performance Canvas Fireworks & Ambient Particles (Zero Lag, 60fps)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Warm ambient floating dust motes for idle phase
    const numMotes = 50;
    const motes = Array.from({ length: numMotes }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: -0.25 - Math.random() * 0.35,
      size: Math.random() * 2.5 + 1.2,
      color: Math.random() > 0.5 ? 'rgba(184, 82, 38, 0.35)' : 'rgba(245, 158, 11, 0.3)'
    }));

    // Firework rocket spawner — no cap, wide spread
    const spawnRocket = (side) => {
      const colorPalette = [
        '#00FF66', '#00e5ff', '#F59E0B', '#FF3366',
        '#FF6B00', '#A855F7', '#FFFFFF', '#FF1493',
        '#00BFFF', '#FFD700', '#7CFC00', '#FF4500'
      ];
      const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      // Allow rockets from sides too
      let rx;
      if (side === 'left')  rx = width * (0.02 + Math.random() * 0.18);
      else if (side === 'right') rx = width * (0.80 + Math.random() * 0.18);
      else rx = width * (0.05 + Math.random() * 0.90);
      fireworksRef.current.push({
        x: rx,
        y: height,
        targetY: height * (0.04 + Math.random() * 0.42),
        speed: 15 + Math.random() * 9,
        color,
        trail: []
      });
    };

    // Massive particle explosion with golden star-ring
    const explodeRocket = (x, y, color) => {
      const n = 75 + Math.floor(Math.random() * 50);
      for (let i = 0; i < n; i++) {
        if (particlesRef.current.length > 600) break;
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 10 + 2.5;
        particlesRef.current.push({
          x, y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          alpha: 1,
          decay: 0.012 + Math.random() * 0.014,
          color,
          size: Math.random() * 3.5 + 1.5,
          isSparkle: Math.random() > 0.45
        });
      }
      // Golden star-ring burst
      for (let i = 0; i < 18; i++) {
        const angle = (i / 18) * Math.PI * 2;
        const sp = 6 + Math.random() * 5;
        particlesRef.current.push({
          x, y,
          vx: Math.cos(angle) * sp,
          vy: Math.sin(angle) * sp,
          alpha: 1,
          decay: 0.008 + Math.random() * 0.006,
          color: '#FFD700',
          size: 2.8 + Math.random() * 2.5,
          isSparkle: true
        });
      }
      // White core flash
      for (let i = 0; i < 10; i++) {
        const angle = Math.random() * Math.PI * 2;
        particlesRef.current.push({
          x, y,
          vx: Math.cos(angle) * (Math.random() * 4 + 1),
          vy: Math.sin(angle) * (Math.random() * 4 + 1),
          alpha: 1,
          decay: 0.022 + Math.random() * 0.018,
          color: '#FFFFFF',
          size: 4 + Math.random() * 3,
          isSparkle: true
        });
      }
    };

    let crackerInterval = null;
    let soundInterval = null;
    if (phase === 'crackers') {
      soundFX.playLaunchWarp();
      soundFX.playCrackersExplosion();

      // Rapid rocket launches — 3 every 280ms from all positions
      crackerInterval = setInterval(() => {
        spawnRocket();
        spawnRocket();
        spawnRocket('left');
        spawnRocket('right');
        if (Math.random() > 0.35) spawnRocket();
      }, 280);

      // Burst of rockets at start
      for (let i = 0; i < 8; i++) {
        setTimeout(() => {
          spawnRocket();
          spawnRocket('left');
          spawnRocket('right');
        }, i * 100);
      }

      // Repeat cracker sound every 1.8s
      soundInterval = setInterval(() => {
        soundFX.playCrackersExplosion();
      }, 1800);
    }

    const render = () => {
      if (phase === 'crackers' || phase === 'completing') {
        // Deep semi-transparent overlay creates smooth motion trails
        ctx.fillStyle = 'rgba(10, 5, 2, 0.18)';
        ctx.fillRect(0, 0, width, height);

        // Enable additive blending for brilliant glow without expensive shadowBlur
        ctx.globalCompositeOperation = 'lighter';

        // Update & draw rockets
        for (let i = fireworksRef.current.length - 1; i >= 0; i--) {
          const r = fireworksRef.current[i];
          r.y -= r.speed;
          r.trail.push({ x: r.x, y: r.y });
          if (r.trail.length > 6) r.trail.shift();

          ctx.beginPath();
          r.trail.forEach((p, idx) => (idx === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y)));
          ctx.strokeStyle = r.color;
          ctx.lineWidth = 2.5;
          ctx.stroke();

          ctx.beginPath();
          ctx.arc(r.x, r.y, 3, 0, Math.PI * 2);
          ctx.fillStyle = '#ffffff';
          ctx.fill();

          if (r.y <= r.targetY) {
            explodeRocket(r.x, r.y, r.color);
            fireworksRef.current.splice(i, 1);
          }
        }

        // Update & draw particles (optimized single path operations)
        for (let i = particlesRef.current.length - 1; i >= 0; i--) {
          const p = particlesRef.current[i];
          p.x += p.vx;
          p.y += p.vy;
          p.vy += 0.08; // Gravity
          p.vx *= 0.98; // Air resistance
          p.alpha -= p.decay;

          if (p.alpha <= 0) {
            particlesRef.current.splice(i, 1);
            continue;
          }

          ctx.save();
          ctx.globalAlpha = p.alpha;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = p.isSparkle && Math.random() > 0.4 ? '#ffffff' : p.color;
          ctx.fill();
          ctx.restore();
        }

        // Reset composite operation
        ctx.globalCompositeOperation = 'source-over';
      } else {
        // Soft ambient floating motes for idle / counting
        ctx.clearRect(0, 0, width, height);
        motes.forEach(m => {
          m.y += m.vy;
          m.x += m.vx;
          if (m.y < -10) { m.y = height + 10; m.x = Math.random() * width; }
          if (m.x < -10) m.x = width + 10;
          if (m.x > width + 10) m.x = -10;
          ctx.beginPath();
          ctx.arc(m.x, m.y, m.size, 0, Math.PI * 2);
          ctx.fillStyle = m.color;
          ctx.fill();
        });
      }

      animationFrameRef.current = requestAnimationFrame(render);
    };

    render();
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      if (crackerInterval) clearInterval(crackerInterval);
      if (soundInterval) clearInterval(soundInterval);
    };
  }, [phase]);

  // Clicking the launch button -> cinematic countdown -> crackers -> redirect
  const handleLaunchClick = () => {
    soundFX.playClick();
    soundFX.playChargeUp(3.0);
    setPhase('counting');
    setCount(3);
    soundFX.playCountTick(3);

    setTimeout(() => {
      setCount(2);
      soundFX.playCountTick(2);
    }, 1000);

    setTimeout(() => {
      setCount(1);
      soundFX.playCountTick(1);
    }, 2000);

    setTimeout(() => {
      setCount(0);
      setPhase('crackers');
      soundFX.playLaunchWarp();
      soundFX.playCrackersExplosion();
      soundFX.playWelcomeChime();

      // Open website after celebration (6s of fireworks!)
      setTimeout(() => {
        setPhase('completing');
        window.location.href = TARGET_URL;
      }, 6000);
    }, 3000);
  };

  const strokeDashoffset = phase === 'counting'
    ? 314 - (314 * ((3 - count) / 3))
    : 0;

  // Dynamic colors for countdown numbers
  const countColor = count === 3 ? '#00FF66' : count === 2 ? '#F59E0B' : count === 1 ? '#FF5722' : '#FFFFFF';
  const countGlow = count === 3 ? '0 0 45px #00FF66' : count === 2 ? '0 0 45px #F59E0B' : count === 1 ? '0 0 50px #FF5722' : '0 0 60px #FFFFFF';

  return (
    <div className={`launch-portal-wrapper warm-theme ${phase === 'completing' ? 'fading-out' : ''}`}>
      <canvas ref={canvasRef} className="launch-canvas" />

      {/* Warm Ambient Diffuse Lighting Orbs */}
      <div className="warm-ambient-orb-1" />
      <div className="warm-ambient-orb-2" />

      {/* Sound Toggle (Top Right) */}
      <div style={{ position: 'fixed', top: '22px', right: '24px', zIndex: 60 }}>
        <button
          onClick={onToggleSound}
          className="btn-sound-toggle"
          style={{
            background: '#FFFFFF',
            color: '#4A2818',
            border: '1.5px solid rgba(184, 82, 38, 0.25)',
            boxShadow: '0 6px 18px rgba(74, 40, 24, 0.12)'
          }}
          title={soundEnabled ? 'Mute Sound' : 'Enable Sound'}
        >
          {soundEnabled ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
            </svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <line x1="23" y1="9" x2="17" y2="15" /><line x1="17" y1="9" x2="23" y2="15" />
            </svg>
          )}
        </button>
      </div>

      {/* ============================================================
          STAGE 1 — IDLE: STRAIGHT CENTERED OFFICIAL INAUGURAL PORTAL
          ============================================================ */}
      {phase === 'idle' && (
        <div style={{ width: '100%', maxWidth: '980px', margin: '0 auto', position: 'relative', zIndex: 10, padding: '2.5rem 1.25rem 4.5rem 1.25rem' }}>

          {/* ─── 1. KEC OFFICIAL LOGO IN BIG AT THE VERY TOP ─── */}
          <div className="inaugural-top-banner">
            <div className="inaugural-top-kec-card" style={{ padding: '18px 48px', borderRadius: '28px' }}>
              <img
                src="/kec-logo.png"
                alt="Kongu Engineering College"
                style={{
                  height: '115px',
                  width: 'auto',
                  maxWidth: '480px',
                  objectFit: 'contain',
                  display: 'block',
                  filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.06))'
                }}
              />
            </div>

            <div style={{
              marginTop: '1rem',
              fontSize: '0.86rem',
              color: '#B85028',
              fontFamily: 'var(--font-mono)',
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#B85028', display: 'inline-block' }} />
              Autonomous • Affiliated to Anna University • Accredited by NAAC with 'A++' Grade
            </div>
          </div>

          {/* ─── 2. STRAIGHT CENTERED INAUGURAL CONTENT ─── */}
          <main className="straight-hero-container">

            {/* Official MADC Logo taken directly from the launching website (madc-xi.vercel.app) */}
            <div className="inaugural-madc-logo-card">
              <svg
                viewBox="0 0 460 140"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{
                  height: '75px',
                  width: 'auto',
                  maxWidth: '340px',
                  filter: 'drop-shadow(0 0 20px rgba(0, 255, 102, 0.65))'
                }}
              >
                {/* M */}
                <path d="M 20 120 L 20 20 L 45 20 L 65 75 L 85 20 L 110 20 L 110 120 L 88 120 L 88 50 L 71 95 L 59 95 L 42 50 L 42 120 Z" fill="#FFFFFF" />
                <path d="M 46 45 L 65 88 L 73 88 L 52 45 Z" fill="#00FF66" />
                {/* A (Android Robot) */}
                <g id="android-a">
                  <line x1="165" y1="26" x2="152" y2="10" stroke="#FFFFFF" strokeWidth="6" strokeLinecap="round" />
                  <line x1="215" y1="26" x2="228" y2="10" stroke="#FFFFFF" strokeWidth="6" strokeLinecap="round" />
                  <path d="M 152 42 C 152 24 228 24 228 42 Z" fill="#FFFFFF" />
                  <circle cx="170" cy="34" r="3.5" fill="#00FF66" />
                  <circle cx="210" cy="34" r="3.5" fill="#00FF66" />
                  <rect x="142" y="44" width="7" height="18" rx="3.5" fill="#FFFFFF" />
                  <rect x="231" y="44" width="7" height="18" rx="3.5" fill="#FFFFFF" />
                  <rect x="152" y="46" width="76" height="54" rx="4" fill="#FFFFFF" />
                  <rect x="138" y="52" width="10" height="38" rx="5" fill="#FFFFFF" />
                  <rect x="232" y="52" width="10" height="38" rx="5" fill="#FFFFFF" />
                  <rect x="164" y="98" width="14" height="22" rx="4" fill="#FFFFFF" />
                  <rect x="202" y="98" width="14" height="22" rx="4" fill="#FFFFFF" />
                  <rect x="160" y="52" width="60" height="42" rx="6" fill="#00FF66" />
                </g>
                {/* D */}
                <path d="M 258 20 H 305 C 332 20 348 38 348 70 C 348 102 332 120 305 120 H 258 V 20 Z M 282 42 V 98 H 303 C 318 98 325 87 325 70 C 325 53 318 42 303 42 H 282 Z" fill="#FFFFFF" />
                {/* C */}
                <path d="M 430 40 C 418 24 398 20 378 20 C 352 20 335 38 335 70 C 335 102 352 120 378 120 C 400 120 420 112 432 92 L 413 80 C 405 92 393 98 378 98 C 364 98 358 87 358 70 C 358 53 364 42 378 42 C 392 42 404 48 412 60 L 430 40 Z" fill="#FFFFFF" />
              </svg>

              <div style={{
                fontSize: '10.5px',
                letterSpacing: '0.24em',
                textTransform: 'uppercase',
                color: '#00FF66',
                fontFamily: 'var(--font-mono)',
                fontWeight: 700
              }}>
                MOBILE APPLICATION DEVELOPMENT CLUB
              </div>
            </div>

            {/* Ceremony Tag */}
            <div className="warm-pre-tag" style={{ marginBottom: '0.65rem' }}>
              ✦ OFFICIAL CLUB WEBSITE INAUGURATION ✦
            </div>

            {/* Main Headline */}
            <h1 className="warm-hero-title" style={{ fontSize: 'clamp(2.5rem, 5.8vw, 4.2rem)', marginBottom: '1.2rem' }}>
              Where Code Meets <span className="warm-hero-title-accent">Innovation</span>
            </h1>

            {/* Short Inaugural Description */}
            <p className="warm-hero-desc" style={{ fontSize: '1.15rem', maxWidth: '680px', margin: '0 auto 1.8rem auto' }}>
              With immense pride and honor, Kongu Engineering College inaugurates the official digital portal of the <strong>Mobile Application Development Club (MADC)</strong> — architecting transformative Android, iOS, and cross-platform solutions for campus, industry, and the nation.
            </p>

            {/* Meta Row Bullets */}
            <div className="warm-meta-row" style={{ justifyContent: 'center', marginBottom: '2.4rem' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                <span className="warm-meta-dot" />
                Kongu Engineering College
              </span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                <span className="warm-meta-dot" />
                Mobile Application Club
              </span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                <span className="warm-meta-dot" />
                madc-xi.vercel.app
              </span>
            </div>

            {/* ─── 3. GRAND ATTRACTIVE LAUNCH BUTTON (CENTERPIECE) ─── */}
            <div className="grand-launch-button-wrapper">
              <div className="grand-beacon-ring-1" />
              <div className="grand-beacon-ring-2" />

              <button
                onClick={handleLaunchClick}
                id="grand-launch-portal-btn"
                className="grand-launch-btn"
                style={{ padding: '1.45rem 4.2rem', fontSize: '1.35rem' }}
              >
                <div className="button-shimmer-sweep" />
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" style={{ filter: 'drop-shadow(0 0 8px rgba(0,255,102,0.9))' }}>
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
                <span>Inaugurate & Launch Website</span>
              </button>
            </div>

          </main>
        </div>
      )}

      {/* ============================================================
          STAGE 2 — CINEMATIC 3-2-1 HOLOGRAPHIC COUNTDOWN
          ============================================================ */}
      {phase === 'counting' && (
        <div className="cinematic-countdown-overlay">
          {/* Telemetry Status Pill */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 20px',
            borderRadius: '9999px',
            background: 'rgba(200, 90, 50, 0.15)',
            border: '1.5px solid rgba(200, 90, 50, 0.4)',
            color: '#FF7A45',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.92rem',
            fontWeight: 700,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            boxShadow: '0 0 25px rgba(200, 90, 50, 0.2)'
          }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: countColor, boxShadow: `0 0 10px ${countColor}` }} />
            T-MINUS 0{count} • INAUGURATION PROTOCOL ACTIVE
          </div>

          {/* Holographic Ring Stage with Shockwave and Rotating Concentric Meters */}
          <div className="countdown-stage-ring">
            <div className="countdown-outer-ring" />
            <div className="countdown-middle-ring" style={{ borderColor: countColor }} />
            <div className="countdown-pulse-shockwave" style={{ borderColor: countColor }} />

            {/* Circular Meter SVG */}
            <svg className="hud-circular-meter" viewBox="0 0 120 120" style={{ width: '100%', height: '100%' }}>
              <defs>
                <linearGradient id="countdownGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#00FF66" />
                  <stop offset="50%" stopColor="#F59E0B" />
                  <stop offset="100%" stopColor="#FF5722" />
                </linearGradient>
              </defs>
              <circle className="hud-meter-bg" cx="60" cy="60" r="50" style={{ stroke: 'rgba(255, 255, 255, 0.1)' }} />
              <circle
                className="hud-meter-progress"
                cx="60" cy="60" r="50"
                stroke="url(#countdownGrad)"
                strokeDasharray="314"
                strokeDashoffset={strokeDashoffset}
                style={{ strokeWidth: 9 }}
              />
            </svg>

            {/* Big Punch-Scale Countdown Number */}
            <div
              key={count}
              className="countdown-hero-num"
              style={{ color: countColor, textShadow: countGlow }}
            >
              {count > 0 ? count : 'GO!'}
            </div>
          </div>

          {/* Dynamic Telemetry Status */}
          <div style={{
            maxWidth: '650px',
            background: 'rgba(15, 9, 6, 0.85)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            borderRadius: '16px',
            padding: '1rem 2rem',
            boxShadow: '0 15px 35px rgba(0,0,0,0.5)',
            fontFamily: 'var(--font-mono)'
          }}>
            <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '4px' }}>
              {count === 3 && 'Initializing MADC Mobile Core Architecture...'}
              {count === 2 && 'Synchronizing Kongu Engineering College Clusters...'}
              {count === 1 && 'All Systems Armed • Commencing Official Launch!'}
              {count === 0 && '🚀 Blast Off! Opening MADC Digital Ecosystem!'}
            </div>
            <div style={{ fontSize: '0.8rem', color: '#9E8B80', letterSpacing: '0.08em' }}>
              STATUS: <span style={{ color: countColor, fontWeight: 700 }}>OK (READY)</span> • KEC PERUNDURAI • AUTONOMOUS
            </div>
          </div>
        </div>
      )}

      {/* ============================================================
          STAGE 3 — CRACKERS & FIREWORKS CELEBRATION
          ============================================================ */}
      {(phase === 'crackers' || phase === 'completing') && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 80,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          pointerEvents: 'none'
        }}>
          <div style={{
            background: 'radial-gradient(ellipse at 50% 30%, #FFFFFF 0%, #F5EEE4 60%, #EDE3D0 100%)',
            border: '3px solid #00FF66',
            borderRadius: '36px',
            padding: '2.8rem 4rem',
            textAlign: 'center',
            boxShadow: '0 30px 90px rgba(74, 40, 24, 0.5), 0 0 80px rgba(0, 255, 102, 0.45), 0 0 150px rgba(0,255,102,0.2)',
            maxWidth: '680px',
            width: '90%',
            animation: 'modalScaleUp 0.55s cubic-bezier(0.16, 1, 0.3, 1)'
          }}>

            {/* Logos */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '1.4rem',
              marginBottom: '1.2rem',
              flexWrap: 'wrap'
            }}>
              <div style={{ background: '#ffffff', padding: '8px 22px', borderRadius: '14px', display: 'flex', alignItems: 'center', border: '1.5px solid rgba(184,82,38,0.2)', boxShadow: '0 6px 18px rgba(74,40,24,0.1)' }}>
                <img src="/kec-logo.png" alt="KEC" style={{ height: '42px', width: 'auto' }} />
              </div>
              <div style={{ background: '#0D0806', padding: '8px 18px', borderRadius: '14px', display: 'flex', alignItems: 'center', border: '2px solid #00FF66', boxShadow: '0 0 20px rgba(0,255,102,0.4)' }}>
                <img src="/madc-logo.png" alt="MADC" style={{ height: '42px', width: 'auto' }} />
              </div>
            </div>

            {/* Celebration horizontal divider */}
            <div style={{
              width: '80px', height: '3px',
              background: 'linear-gradient(90deg, #B85028, #00FF66)',
              borderRadius: '9999px',
              margin: '0 auto 1rem auto'
            }} />

            <div style={{
              fontSize: '0.85rem', color: '#B85028',
              fontFamily: 'var(--font-mono)', letterSpacing: '0.22em',
              textTransform: 'uppercase', marginBottom: '0.6rem', fontWeight: 800
            }}>
              Kongu Engineering College (Autonomous)
            </div>

            <h1 style={{
              fontSize: 'clamp(2.2rem, 5vw, 3.4rem)',
              fontWeight: 900, color: '#2B1911',
              lineHeight: 1.1, marginBottom: '0.75rem',
              fontFamily: 'var(--font-display)',
              letterSpacing: '-0.02em'
            }}>
              MADC Portal <span style={{
                background: 'linear-gradient(135deg, #00a843, #00FF66)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>Inaugurated!</span>
            </h1>

            <p style={{ color: '#604E45', fontSize: '1.1rem', marginBottom: '1.8rem', fontWeight: 600, lineHeight: 1.6 }}>
              Welcome to the official Mobile Application Development Club
              digital ecosystem — where ideas become apps.
            </p>

            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.75rem',
              padding: '0.8rem 2rem',
              background: 'linear-gradient(135deg, #1A0D06 0%, #00a843 100%)',
              borderRadius: '9999px',
              color: '#FFFFFF', fontFamily: 'var(--font-mono)', fontSize: '1rem',
              fontWeight: 700,
              boxShadow: '0 10px 28px rgba(0, 168, 67, 0.5), 0 0 40px rgba(0,168,67,0.25)',
              letterSpacing: '0.05em'
            }}>
              <span className="terminal-cursor" style={{ width: '8px', height: '16px', background: '#FFFFFF' }} />
              <span>Opening Club Website now...</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
