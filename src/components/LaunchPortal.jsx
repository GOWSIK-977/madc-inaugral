import React, { useState, useEffect, useRef } from 'react';
import { soundFX } from '../audio/soundEffects';

const TARGET_URL = "https://madc-xi.vercel.app/";

export function LaunchPortal({ onLaunchComplete, soundEnabled, onToggleSound }) {
  // Phases: 'idle' -> 'counting' -> 'crackers' -> 'completing'
  const [phase, setPhase] = useState('idle');
  const [count, setCount] = useState(3);
  const [openInNewTab, setOpenInNewTab] = useState(false);

  const canvasRef = useRef(null);
  const animationFrameRef = useRef(null);
  const fireworksRef = useRef([]);
  const particlesRef = useRef([]);

  // Canvas for Starfield (idle/counting) and Fireworks (crackers)
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

    // Background stars
    const numStars = 220;
    const stars = Array.from({ length: numStars }, () => ({
      x: (Math.random() - 0.5) * width,
      y: (Math.random() - 0.5) * height,
      z: Math.random() * width,
      size: Math.random() * 2 + 0.8,
      color: Math.random() > 0.4 ? '#00FF66' : Math.random() > 0.5 ? '#00e5ff' : '#fbbf24'
    }));

    // Firework rocket spawner
    const spawnRocket = () => {
      fireworksRef.current.push({
        x: width * (0.1 + Math.random() * 0.8),
        y: height,
        targetY: height * (0.1 + Math.random() * 0.45),
        speed: 10 + Math.random() * 6,
        color: ['#00FF66', '#00e5ff', '#fbbf24', '#f43f5e', '#a855f7', '#ffffff', '#fb923c'][Math.floor(Math.random() * 7)],
        trail: []
      });
    };

    const explodeRocket = (x, y, color) => {
      const n = 90 + Math.floor(Math.random() * 50);
      for (let i = 0; i < n; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 8 + 2;
        particlesRef.current.push({
          x, y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          alpha: 1,
          decay: 0.011 + Math.random() * 0.014,
          color,
          size: Math.random() * 3.5 + 1.5,
          sparkle: Math.random() > 0.45
        });
      }
    };

    let crackerInterval = null;
    if (phase === 'crackers') {
      soundFX.playCrackersExplosion();
      crackerInterval = setInterval(() => {
        spawnRocket();
        spawnRocket();
      }, 320);
      for (let i = 0; i < 5; i++) setTimeout(spawnRocket, i * 120);
    }

    const render = () => {
      ctx.fillStyle = phase === 'crackers' ? 'rgba(4, 7, 5, 0.2)' : 'rgba(5, 8, 6, 0.95)';
      ctx.fillRect(0, 0, width, height);

      if (phase !== 'crackers') {
        const cx = width / 2, cy = height / 2;
        const speed = phase === 'counting' ? 20 : 2.5;
        stars.forEach(star => {
          star.z -= speed;
          if (star.z <= 0) {
            star.z = width;
            star.x = (Math.random() - 0.5) * width;
            star.y = (Math.random() - 0.5) * height;
          }
          const k = 280 / star.z;
          const px = star.x * k + cx, py = star.y * k + cy;
          if (px >= 0 && px <= width && py >= 0 && py <= height) {
            const s = (1 - star.z / width) * star.size * (phase === 'counting' ? 2.2 : 1.2);
            ctx.beginPath();
            ctx.arc(px, py, Math.max(0.5, s), 0, Math.PI * 2);
            ctx.fillStyle = star.color;
            ctx.shadowBlur = phase === 'counting' ? 14 : 4;
            ctx.shadowColor = star.color;
            ctx.fill();
          }
        });
      } else {
        // Rockets
        for (let i = fireworksRef.current.length - 1; i >= 0; i--) {
          const r = fireworksRef.current[i];
          r.y -= r.speed;
          r.trail.push({ x: r.x, y: r.y });
          if (r.trail.length > 7) r.trail.shift();
          ctx.beginPath();
          r.trail.forEach((p, idx) => idx === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y));
          ctx.strokeStyle = r.color;
          ctx.lineWidth = 2.5;
          ctx.stroke();
          ctx.beginPath();
          ctx.arc(r.x, r.y, 3.5, 0, Math.PI * 2);
          ctx.fillStyle = '#ffffff';
          ctx.shadowBlur = 12;
          ctx.shadowColor = r.color;
          ctx.fill();
          if (r.y <= r.targetY) { explodeRocket(r.x, r.y, r.color); fireworksRef.current.splice(i, 1); }
        }
        // Particles
        for (let i = particlesRef.current.length - 1; i >= 0; i--) {
          const p = particlesRef.current[i];
          p.x += p.vx; p.y += p.vy;
          p.vy += 0.09; p.vx *= 0.98; p.alpha -= p.decay;
          if (p.alpha <= 0) { particlesRef.current.splice(i, 1); continue; }
          ctx.save();
          ctx.globalAlpha = p.alpha;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = p.sparkle && Math.random() > 0.5 ? '#ffffff' : p.color;
          ctx.shadowBlur = 16;
          ctx.shadowColor = p.color;
          ctx.fill();
          ctx.restore();
        }
      }

      animationFrameRef.current = requestAnimationFrame(render);
    };

    render();
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      if (crackerInterval) clearInterval(crackerInterval);
    };
  }, [phase]);

  // Clicking the launch button -> straight to 3-2-1 countdown (no video)
  const handleLaunchClick = () => {
    soundFX.playClick();
    soundFX.playChargeUp(3.2);
    setPhase('counting');
    setCount(3);
    soundFX.playCountTick(3);

    setTimeout(() => { setCount(2); soundFX.playCountTick(2); }, 1000);
    setTimeout(() => { setCount(1); soundFX.playCountTick(1); }, 2000);

    setTimeout(() => {
      setCount(0);
      setPhase('crackers');
      soundFX.playCrackersExplosion();
      soundFX.playWelcomeChime();

      // Open website after 4.5s of crackers celebration
      setTimeout(() => {
        setPhase('completing');
        if (openInNewTab) {
          window.open(TARGET_URL, '_blank');
          setTimeout(() => onLaunchComplete(), 600);
        } else {
          window.location.href = TARGET_URL;
        }
      }, 4500);
    }, 3000);
  };

  const strokeDashoffset = phase === 'counting'
    ? 314 - (314 * ((3 - count) / 3))
    : 0;

  return (
    <div
      className={`launch-portal-wrapper ${phase === 'completing' ? 'fading-out' : ''}`}
      style={{ overflowY: 'auto', padding: '2rem 1rem' }}
    >
      <canvas ref={canvasRef} className="launch-canvas" />
      <div className="cyber-grid" />

      {/* Sound Toggle */}
      <div style={{ position: 'absolute', top: '20px', right: '20px', zIndex: 50 }}>
        <button onClick={onToggleSound} className="btn-sound-toggle"
          title={soundEnabled ? 'Mute' : 'Enable Sound'}>
          {soundEnabled ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
            </svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <line x1="23" y1="9" x2="17" y2="15" /><line x1="17" y1="9" x2="23" y2="15" />
            </svg>
          )}
        </button>
      </div>

      {/* ============================================================
          STAGE 1 — IDLE: INAUGURATION SCREEN
          ============================================================ */}
      {phase === 'idle' && (
        <div className="launch-center-card" style={{ maxWidth: '860px', zIndex: 10 }}>

          {/* ─── 1. KEC COLLEGE LOGO AT TOP ─── */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: '1.25rem',
            width: '100%'
          }}>
            <div style={{
              background: '#ffffff',
              padding: '12px 32px',
              borderRadius: '20px',
              boxShadow: '0 12px 35px rgba(0,0,0,0.65), 0 0 28px rgba(0,255,102,0.35)',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '2px solid rgba(0, 255, 102, 0.45)'
            }}>
              <img
                src="/kec-logo.png"
                alt="Kongu Engineering College"
                style={{ height: '88px', width: 'auto', maxWidth: '380px', objectFit: 'contain', display: 'block' }}
              />
            </div>
          </div>

          {/* ─── 2. MADC OFFICIAL PHOTO IMAGE LOGO ─── */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: '1.5rem',
            width: '100%'
          }}>
            <div style={{
              position: 'relative',
              padding: '12px 28px',
              borderRadius: '24px',
              background: 'radial-gradient(ellipse at center, rgba(0, 35, 15, 0.85) 0%, rgba(4, 8, 6, 0.95) 100%)',
              border: '2px solid rgba(0, 255, 102, 0.65)',
              boxShadow: '0 0 45px rgba(0, 255, 102, 0.45), inset 0 0 25px rgba(0, 255, 102, 0.2)',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <img
                src="/madc-logo.png"
                alt="MADC - Mobile Application Development Club"
                style={{
                  height: '110px',
                  width: 'auto',
                  maxWidth: '380px',
                  objectFit: 'contain',
                  filter: 'drop-shadow(0 0 20px rgba(0, 255, 102, 0.75))',
                  display: 'block'
                }}
              />
            </div>
          </div>

          {/* ─── ACCREDITATION BADGE ─── */}
          <div className="kec-badge-pill" style={{
            borderColor: 'rgba(0, 255, 102, 0.5)',
            color: '#00FF66',
            fontSize: '0.83rem',
            padding: '5px 16px',
            marginBottom: '1.35rem'
          }}>
            <span style={{
              width: '8px', height: '8px', borderRadius: '50%',
              backgroundColor: '#00FF66', display: 'inline-block',
              boxShadow: '0 0 10px #00FF66'
            }} />
            Autonomous • Affiliated to Anna University • Accredited by NAAC with 'A++' Grade
          </div>

          {/* ─── OPENING HEADLINE & TAGLINE ─── */}
          <div style={{ marginBottom: '1.65rem', maxWidth: '700px' }}>
            <h2 style={{
              fontSize: '0.95rem',
              letterSpacing: '0.24em',
              color: '#00FF66',
              textTransform: 'uppercase',
              marginBottom: '0.45rem',
              fontFamily: 'var(--font-mono)',
              fontWeight: 700
            }}>
              ✦ Grand Inaugural Ceremony ✦
            </h2>
            <h1 style={{
              fontSize: 'clamp(2rem, 4.6vw, 3.15rem)',
              lineHeight: 1.15,
              fontWeight: 800,
              color: '#ffffff',
              marginBottom: '0.8rem'
            }}>
              Where Code Meets <span style={{ color: '#00FF66', textShadow: '0 0 28px rgba(0,255,102,0.65)' }}>Innovation</span>
            </h1>
            <p style={{
              color: '#cbd5e1',
              fontSize: '1.05rem',
              lineHeight: 1.65,
              maxWidth: '660px',
              margin: '0 auto'
            }}>
              With immense pride and honor, we inaugurate the official digital portal of the Mobile Application Development Club at Kongu Engineering College — inspiring students to architect transformative Android, iOS, and cross-platform solutions.
            </p>
          </div>

          {/* ─── PRINCIPAL PORTRAIT CARD ─── */}
          <div style={{
            background: 'radial-gradient(ellipse at center, rgba(10, 18, 34, 0.96) 0%, rgba(4, 7, 5, 0.92) 100%)',
            border: '2px solid rgba(0, 255, 102, 0.45)',
            borderRadius: '28px',
            padding: '2.25rem 2.75rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            boxShadow: '0 25px 65px -10px rgba(0,0,0,0.9), 0 0 55px rgba(0,255,102,0.28)',
            marginBottom: '2rem',
            maxWidth: '480px',
            width: '100%',
            position: 'relative'
          }}>
            {/* Ceremonial ribbon */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '4px 16px',
              borderRadius: '9999px',
              background: 'rgba(0,255,102,0.14)',
              border: '1px solid rgba(0,255,102,0.4)',
              color: '#00FF66',
              fontSize: '0.73rem',
              fontWeight: 700,
              fontFamily: 'var(--font-mono)',
              textTransform: 'uppercase',
              letterSpacing: '0.07em',
              marginBottom: '1.35rem'
            }}>
              ✦ Official Website Inaugurator ✦
            </div>

            {/* Big principal portrait */}
            <div style={{ position: 'relative', marginBottom: '1.5rem' }}>
              <img
                src="/principal.jpg"
                alt="Dr. R. Parameshwaran — Principal, KEC"
                style={{
                  width: '220px',
                  height: '220px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  objectPosition: 'center top',
                  border: '5px solid #00FF66',
                  boxShadow: '0 0 45px rgba(0,255,102,0.6), 0 0 90px rgba(0,229,255,0.3)',
                  display: 'block'
                }}
              />
              {/* Graduation badge */}
              <div style={{
                position: 'absolute',
                bottom: '6px',
                right: '6px',
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #00FF66, #00e5ff)',
                color: '#000',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.25rem',
                boxShadow: '0 0 16px #00FF66',
                border: '2px solid rgba(0,0,0,0.3)'
              }}>
                🎓
              </div>
            </div>

            {/* Name below image */}
            <h2 style={{
              fontSize: '2.1rem',
              fontWeight: 800,
              color: '#ffffff',
              letterSpacing: '-0.02em',
              marginBottom: '0.4rem',
              lineHeight: 1.2,
              textShadow: '0 0 22px rgba(255,255,255,0.25)'
            }}>
              Dr. R. Parameshwaran
            </h2>

            {/* Designation below name */}
            <div style={{
              fontSize: '1.1rem',
              color: '#00FF66',
              fontWeight: 700,
              marginBottom: '0.75rem',
              textShadow: '0 0 12px rgba(0,255,102,0.55)'
            }}>
              Principal, Kongu Engineering College
            </div>

            <div style={{
              fontSize: '0.85rem',
              color: '#94a3b8',
              fontStyle: 'italic',
              maxWidth: '360px',
              lineHeight: 1.55,
              borderTop: '1px solid rgba(255,255,255,0.1)',
              paddingTop: '0.85rem',
              marginTop: '0.2rem'
            }}>
              "Inspiring students to engineer solutions for campus, industry, and the nation."
            </div>
          </div>

          {/* ─── MAIN LAUNCH BUTTON ─── */}
          <div style={{ position: 'relative', display: 'inline-block' }}>
            <div className="button-pulse-beacon" style={{ borderColor: '#00FF66' }} />
            <button
              onClick={handleLaunchClick}
              className="launch-trigger-button"
              id="launch-portal-btn"
              style={{
                background: 'linear-gradient(135deg, #00a843 0%, #00ff66 50%, #00e5ff 100%)',
                boxShadow: '0 0 55px rgba(0,255,102,0.7), 0 0 110px rgba(0,229,255,0.35)',
                color: '#020403',
                fontSize: '1.3rem',
                padding: '1.3rem 3.2rem'
              }}
            >
              <div className="button-shimmer-sweep" />
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#020403" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
              <span style={{ fontWeight: 800, letterSpacing: '0.06em' }}>Inaugurate & Launch Website</span>
            </button>
          </div>

          <div style={{
            marginTop: '1.15rem',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            fontSize: '0.82rem',
            color: '#94a3b8',
            fontFamily: 'var(--font-mono)',
            flexWrap: 'wrap',
            justifyContent: 'center'
          }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={openInNewTab}
                onChange={(e) => setOpenInNewTab(e.target.checked)}
                style={{ accentColor: '#00FF66' }}
              />
              <span>Open in new tab</span>
            </label>
            <span>•</span>
            <span style={{ color: '#00FF66' }}>3-2-1 Count ➔ Crackers Celebration ➔ Website Opens</span>
          </div>
        </div>
      )}

      {/* ============================================================
          STAGE 2 — COUNTDOWN 3-2-1
          ============================================================ */}
      {phase === 'counting' && (
        <div className="countdown-hud-container" style={{ zIndex: 10 }}>
          <div style={{
            fontSize: '0.95rem',
            color: '#00FF66',
            fontFamily: 'var(--font-mono)',
            textTransform: 'uppercase',
            letterSpacing: '0.22em',
            marginBottom: '1rem',
            fontWeight: 700
          }}>
            Inauguration Countdown
          </div>

          <div className="countdown-digits-wrapper">
            <svg className="hud-circular-meter" viewBox="0 0 120 120">
              <defs>
                <linearGradient id="neonGreenGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#00FF66" />
                  <stop offset="100%" stopColor="#00e5ff" />
                </linearGradient>
              </defs>
              <circle className="hud-meter-bg" cx="60" cy="60" r="50" />
              <circle
                className="hud-meter-progress"
                cx="60" cy="60" r="50"
                stroke="url(#neonGreenGrad)"
                strokeDasharray="314"
                strokeDashoffset={strokeDashoffset}
              />
            </svg>
            <div className="countdown-number" style={{ textShadow: '0 0 35px #00FF66, 0 0 70px #00e5ff' }}>
              {count > 0 ? count : 'GO!'}
            </div>
          </div>

          <div style={{ marginTop: '1.75rem', fontSize: '1.2rem', fontWeight: 700, color: '#ffffff', textAlign: 'center' }}>
            {count === 3 && 'Initializing MADC Mobile Systems...'}
            {count === 2 && 'Synchronizing KEC Engineering Clusters...'}
            {count === 1 && 'Engaging Ceremonial Launch Sequences...'}
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
            background: 'radial-gradient(circle, rgba(10,18,34,0.97) 0%, rgba(4,7,5,0.93) 100%)',
            border: '3px solid #00FF66',
            borderRadius: '32px',
            padding: '2.5rem 3.5rem',
            textAlign: 'center',
            boxShadow: '0 0 70px rgba(0,255,102,0.75), 0 0 140px rgba(0,229,255,0.45)',
            maxWidth: '700px',
            width: '90%',
            animation: 'modalScaleUp 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
          }}>
            <div style={{ fontSize: '3.5rem', marginBottom: '0.5rem' }}>🎉 🎆 ✨ 🎇</div>

            {/* Logos header in crackers popup */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '1.2rem',
              marginBottom: '1rem',
              flexWrap: 'wrap'
            }}>
              <div style={{ background: '#ffffff', padding: '6px 16px', borderRadius: '12px', display: 'flex', alignItems: 'center' }}>
                <img src="/kec-logo.png" alt="KEC" style={{ height: '36px', width: 'auto' }} />
              </div>
              <img
                src="/madc-logo.png"
                alt="MADC"
                style={{
                  height: '46px',
                  width: 'auto',
                  borderRadius: '8px',
                  filter: 'drop-shadow(0 0 14px rgba(0,255,102,0.85))'
                }}
              />
            </div>

            <div style={{
              fontSize: '0.9rem', color: '#00FF66',
              fontFamily: 'var(--font-mono)', letterSpacing: '0.2em',
              textTransform: 'uppercase', marginBottom: '0.5rem', fontWeight: 700
            }}>
              Kongu Engineering College
            </div>
            <h1 style={{
              fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
              fontWeight: 900, color: '#ffffff',
              lineHeight: 1.15, marginBottom: '0.75rem',
              textShadow: '0 0 30px #00FF66'
            }}>
              MADC Portal <span style={{ color: '#00FF66' }}>Inaugurated!</span>
            </h1>
            <p style={{ color: '#cbd5e1', fontSize: '1.2rem', marginBottom: '1.5rem', fontWeight: 600 }}>
              Officially Launched by Principal <strong>Dr. R. Parameshwaran</strong>
            </p>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.75rem',
              padding: '0.65rem 1.5rem',
              background: 'rgba(0,255,102,0.15)',
              borderRadius: '9999px',
              border: '1px solid rgba(0,255,102,0.4)',
              color: '#00FF66', fontFamily: 'var(--font-mono)', fontSize: '0.95rem'
            }}>
              <span className="terminal-cursor" style={{ width: '8px', height: '14px', background: '#00FF66' }} />
              <span>Opening Club Website now...</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
