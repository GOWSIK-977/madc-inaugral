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

  // Canvas for warm ambient dust/particles (idle) and Fireworks (crackers)
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

    // Warm ambient floating motes for idle phase
    const numMotes = 70;
    const motes = Array.from({ length: numMotes }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.45,
      vy: -0.3 - Math.random() * 0.4,
      size: Math.random() * 2.8 + 1.2,
      color: Math.random() > 0.5 ? 'rgba(184, 82, 38, 0.4)' : Math.random() > 0.5 ? 'rgba(217, 119, 70, 0.35)' : 'rgba(245, 158, 11, 0.3)'
    }));

    // Firework rocket spawner for crackers phase
    const spawnRocket = () => {
      fireworksRef.current.push({
        x: width * (0.15 + Math.random() * 0.7),
        y: height,
        targetY: height * (0.12 + Math.random() * 0.42),
        speed: 11 + Math.random() * 6,
        color: ['#B85028', '#C85A32', '#F59E0B', '#10B981', '#06B6D4', '#8B5CF6', '#FFFFFF'][Math.floor(Math.random() * 7)],
        trail: []
      });
    };

    const explodeRocket = (x, y, color) => {
      const n = 95 + Math.floor(Math.random() * 50);
      for (let i = 0; i < n; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 8.5 + 2.5;
        particlesRef.current.push({
          x, y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          alpha: 1,
          decay: 0.012 + Math.random() * 0.015,
          color,
          size: Math.random() * 3.5 + 1.5,
          sparkle: Math.random() > 0.4
        });
      }
    };

    let crackerInterval = null;
    if (phase === 'crackers') {
      soundFX.playCrackersExplosion();
      crackerInterval = setInterval(() => {
        spawnRocket();
        spawnRocket();
      }, 300);
      for (let i = 0; i < 5; i++) setTimeout(spawnRocket, i * 110);
    }

    const render = () => {
      if (phase === 'crackers' || phase === 'completing') {
        // Deep festive overlay for crisp firework contrast
        ctx.fillStyle = 'rgba(28, 18, 14, 0.28)';
        ctx.fillRect(0, 0, width, height);

        // Rockets
        for (let i = fireworksRef.current.length - 1; i >= 0; i--) {
          const r = fireworksRef.current[i];
          r.y -= r.speed;
          r.trail.push({ x: r.x, y: r.y });
          if (r.trail.length > 7) r.trail.shift();
          ctx.beginPath();
          r.trail.forEach((p, idx) => idx === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y));
          ctx.strokeStyle = r.color;
          ctx.lineWidth = 2.8;
          ctx.stroke();
          ctx.beginPath();
          ctx.arc(r.x, r.y, 4, 0, Math.PI * 2);
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
      } else {
        // Clear canvas softly for warm ambient floating motes
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
    };
  }, [phase]);

  // Clicking the launch button -> countdown -> crackers -> redirect
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

      // Open website after celebration
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
    <div className={`launch-portal-wrapper warm-theme ${phase === 'completing' ? 'fading-out' : ''}`}>
      <canvas ref={canvasRef} className="launch-canvas" />

      {/* Warm Ambient Diffuse Lighting Orbs */}
      <div className="warm-ambient-orb-1" />
      <div className="warm-ambient-orb-2" />

      {/* ============================================================
          STAGE 1 — IDLE: WARM AESTHETIC INAUGURAL PORTAL
          ============================================================ */}
      {phase === 'idle' && (
        <div style={{ width: '100%', position: 'relative', zIndex: 10, padding: '1.5rem 1.25rem 3.5rem 1.25rem' }}>

          {/* ─── TOP NAVIGATION BAR ─── */}
          <header className="warm-header">
            {/* Logos: KEC + MADC */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div style={{
                background: '#ffffff',
                padding: '6px 14px',
                borderRadius: '12px',
                boxShadow: '0 4px 15px rgba(74, 40, 24, 0.08)',
                display: 'flex',
                alignItems: 'center',
                border: '1px solid rgba(184, 82, 38, 0.15)'
              }}>
                <img src="/kec-logo.png" alt="Kongu Engineering College" style={{ height: '34px', width: 'auto', display: 'block' }} />
              </div>

              <div style={{
                background: 'radial-gradient(ellipse at center, rgba(40, 25, 20, 0.95) 0%, rgba(20, 12, 10, 0.98) 100%)',
                padding: '5px 12px',
                borderRadius: '12px',
                border: '1px solid rgba(184, 82, 38, 0.35)',
                display: 'flex',
                alignItems: 'center'
              }}>
                <img src="/madc-logo.png" alt="MADC Club" style={{ height: '32px', width: 'auto', display: 'block' }} />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '1.05rem', fontWeight: 800, color: '#2B1911', fontFamily: 'var(--font-display)', letterSpacing: '-0.02em' }}>
                  MADC<span style={{ color: '#B85028' }}>'26</span>
                </span>
                <span style={{ fontSize: '0.72rem', color: '#7D6B60', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>
                  Kongu Engineering College • Autonomous
                </span>
              </div>
            </div>

            {/* Center Navigation Links (Hidden on small mobile) */}
            <nav style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
              <a href="#home" onClick={(e) => { e.preventDefault(); soundFX.playClick(); }} style={{ color: '#2B1911', textDecoration: 'none', fontWeight: 700, fontSize: '0.92rem', borderBottom: '2px solid #B85028', paddingBottom: '2px' }}>
                Home
              </a>
              <a href="#about" onClick={(e) => { e.preventDefault(); soundFX.playClick(); }} style={{ color: '#7D6B60', textDecoration: 'none', fontWeight: 600, fontSize: '0.92rem' }}>
                About Club
              </a>
              <a href="#domains" onClick={(e) => { e.preventDefault(); soundFX.playClick(); }} style={{ color: '#7D6B60', textDecoration: 'none', fontWeight: 600, fontSize: '0.92rem' }}>
                Tech Domains
              </a>
              <a href="#projects" onClick={(e) => { e.preventDefault(); soundFX.playClick(); }} style={{ color: '#7D6B60', textDecoration: 'none', fontWeight: 600, fontSize: '0.92rem' }}>
                Apps & Projects
              </a>
            </nav>

            {/* Right Action: Sound Toggle + Launch Pill */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <button
                onClick={onToggleSound}
                className="btn-sound-toggle"
                style={{
                  background: '#FFFFFF',
                  color: '#4A2818',
                  border: '1px solid rgba(184, 82, 38, 0.2)',
                  boxShadow: '0 4px 12px rgba(74, 40, 24, 0.08)'
                }}
                title={soundEnabled ? 'Mute Sound' : 'Enable Sound'}
              >
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

              <button
                onClick={handleLaunchClick}
                className="warm-btn-primary"
                style={{ padding: '0.65rem 1.6rem', fontSize: '0.92rem' }}
              >
                <span>Launch Now</span>
              </button>
            </div>
          </header>

          {/* ─── MAIN HERO SECTION (MATCHING SCREENSHOT) ─── */}
          <main className="warm-hero-container">

            {/* LEFT COLUMN: HERO HEADLINE & INAUGURAL DETAILS */}
            <div>
              {/* — MADC CLUB PRESENTS */}
              <div className="warm-pre-tag">
                <span>—</span>
                <span>MADC CLUB PRESENTS</span>
              </div>

              {/* MADC'26 Main Title */}
              <h1 className="warm-hero-title">
                MADC<span className="warm-hero-title-accent">'26</span>
              </h1>

              {/* Short Inaugural Description */}
              <p className="warm-hero-desc">
                A premier internet symposium and digital gateway bringing MADC developers together for coding battles, UI challenges, and mobile app sprints — empowering next-gen Android, iOS, and Flutter innovations at Kongu Engineering College.
              </p>

              {/* Meta Row with Bullets */}
              <div className="warm-meta-row">
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                  <span className="warm-meta-dot" />
                  Sept 21, 2026
                </span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                  <span className="warm-meta-dot" />
                  Kongu Engineering College
                </span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                  <span className="warm-meta-dot" />
                  Autonomous • NAAC 'A++'
                </span>
              </div>

              {/* Action Buttons */}
              <div className="warm-buttons-row">
                <button
                  onClick={handleLaunchClick}
                  id="warm-launch-btn"
                  className="warm-btn-primary"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                  <span>Inaugurate & Launch Website</span>
                </button>

                <a
                  href={TARGET_URL}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => soundFX.playClick()}
                  className="warm-btn-secondary"
                >
                  <span>View Live Portal ↗</span>
                </a>
              </div>

              {/* Toggle option */}
              <div style={{ marginBottom: '2.5rem', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: '#7D6B60', fontFamily: 'var(--font-mono)' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={openInNewTab}
                    onChange={(e) => setOpenInNewTab(e.target.checked)}
                    style={{ accentColor: '#B85028' }}
                  />
                  <span>Open target site in new tab</span>
                </label>
                <span>•</span>
                <span style={{ color: '#B85028', fontWeight: 600 }}>Audio + 3-2-1 Countdown + Celebration</span>
              </div>

              {/* Countdown / Stats Row (matching 00 11 18 00 cards) */}
              <div className="warm-timer-grid">
                <div className="warm-timer-card">
                  <div className="warm-timer-num">20</div>
                  <div className="warm-timer-label">YEAR</div>
                </div>
                <div className="warm-timer-card">
                  <div className="warm-timer-num">26</div>
                  <div className="warm-timer-label">EDITION</div>
                </div>
                <div className="warm-timer-card">
                  <div className="warm-timer-num">04</div>
                  <div className="warm-timer-label">DOMAINS</div>
                </div>
                <div className="warm-timer-card">
                  <div className="warm-timer-num" style={{ color: '#B85028' }}>LIVE</div>
                  <div className="warm-timer-label">PORTAL</div>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: PERSPECTIVE-TILTED 3D SMARTPHONE */}
            <div className="warm-phone-stage">
              {/* Floating Gear Widget (matches screenshot) */}
              <div className="warm-gear-floating" title="Engineering System Core">
                ⚙
              </div>

              {/* Floating 3D Cube (matches screenshot) */}
              <div className="warm-cube-floating" />

              {/* Smartphone Body */}
              <div className="warm-phone-body">
                <div className="warm-phone-screen">
                  {/* Phone Status Bar */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.72rem', color: '#9E8B80', fontFamily: 'var(--font-mono)', marginBottom: '14px', padding: '0 4px' }}>
                    <span>9:41</span>
                    <div style={{ width: '42px', height: '12px', background: '#3B2D26', borderRadius: '6px' }} />
                    <span>5G • 100%</span>
                  </div>

                  {/* Phone Header */}
                  <div style={{ textAlign: 'center', marginBottom: '18px' }}>
                    <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.02em', fontFamily: 'var(--font-display)' }}>
                      MADC'26
                    </div>
                    <div style={{ fontSize: '0.68rem', color: '#B85028', fontFamily: 'var(--font-mono)', letterSpacing: '0.14em', textTransform: 'uppercase', marginTop: '2px', fontWeight: 700 }}>
                      MADC CLUB • BUILD • WIN
                    </div>
                  </div>

                  {/* 6 App Icon Challenge Grid Tiles (matches screenshot) */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', flex: 1 }}>
                    <div style={{ background: '#C85A32', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFFFFF', fontSize: '1.35rem', fontWeight: 800, boxShadow: '0 4px 14px rgba(200,90,50,0.3)' }}>
                      &lt;/&gt;
                    </div>
                    <div style={{ background: '#4A6B82', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFFFFF', fontSize: '1.3rem' }}>
                      ☁️
                    </div>
                    <div style={{ background: '#3E4E59', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFFFFF', fontSize: '1.3rem' }}>
                      ⚙️
                    </div>
                    <div style={{ background: '#5C3D2E', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFFFFF', fontSize: '1.3rem' }}>
                      📱
                    </div>
                    <div style={{ background: '#2D3748', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFFFFF', fontSize: '1.2rem' }}>
                      🛡️
                    </div>
                    <div style={{ background: '#C85A32', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFFFFF', fontSize: '1.35rem', fontWeight: 800, boxShadow: '0 4px 14px rgba(200,90,50,0.3)' }}>
                      &lt;/&gt;
                    </div>
                  </div>

                  {/* Bottom Phone Action bar */}
                  <div style={{ marginTop: '14px', paddingTop: '10px', borderTop: '1px solid rgba(255,255,255,0.08)', display: 'flex', justifyContent: 'center' }}>
                    <div style={{ width: '80px', height: '4px', background: '#7D6B60', borderRadius: '2px' }} />
                  </div>
                </div>
              </div>
            </div>

          </main>
        </div>
      )}

      {/* ============================================================
          STAGE 2 — COUNTDOWN 3-2-1
          ============================================================ */}
      {phase === 'counting' && (
        <div className="countdown-hud-container" style={{ zIndex: 30 }}>
          <div style={{
            fontSize: '1rem',
            color: '#B85028',
            fontFamily: 'var(--font-mono)',
            textTransform: 'uppercase',
            letterSpacing: '0.24em',
            marginBottom: '1rem',
            fontWeight: 800
          }}>
            ✦ Inauguration Countdown ✦
          </div>

          <div className="countdown-digits-wrapper" style={{ boxShadow: '0 20px 50px rgba(74, 40, 24, 0.2)', border: '2px solid rgba(184, 82, 38, 0.3)' }}>
            <svg className="hud-circular-meter" viewBox="0 0 120 120">
              <defs>
                <linearGradient id="warmGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#C85A32" />
                  <stop offset="100%" stopColor="#F59E0B" />
                </linearGradient>
              </defs>
              <circle className="hud-meter-bg" cx="60" cy="60" r="50" style={{ stroke: 'rgba(74, 40, 24, 0.15)' }} />
              <circle
                className="hud-meter-progress"
                cx="60" cy="60" r="50"
                stroke="url(#warmGrad)"
                strokeDasharray="314"
                strokeDashoffset={strokeDashoffset}
              />
            </svg>
            <div className="countdown-number" style={{ color: '#2B1911', textShadow: '0 4px 20px rgba(184, 82, 38, 0.4)' }}>
              {count > 0 ? count : 'GO!'}
            </div>
          </div>

          <div style={{ marginTop: '1.75rem', fontSize: '1.25rem', fontWeight: 800, color: '#2B1911', textAlign: 'center' }}>
            {count === 3 && 'Initializing MADC Mobile Architecture...'}
            {count === 2 && 'Connecting Kongu Engineering College Clusters...'}
            {count === 1 && 'Launching MADC Official Portal...'}
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
            background: 'radial-gradient(circle at center, #FFFFFF 0%, #F8F3EA 100%)',
            border: '3px solid #B85028',
            borderRadius: '32px',
            padding: '2.5rem 3.5rem',
            textAlign: 'center',
            boxShadow: '0 25px 80px rgba(74, 40, 24, 0.45), 0 0 60px rgba(200, 90, 50, 0.3)',
            maxWidth: '650px',
            width: '90%',
            animation: 'modalScaleUp 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
          }}>
            <div style={{ fontSize: '3.5rem', marginBottom: '0.5rem' }}>🎉 🎆 ✨ 🎇</div>

            {/* Logos in celebration popup */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '1.2rem',
              marginBottom: '1rem',
              flexWrap: 'wrap'
            }}>
              <div style={{ background: '#ffffff', padding: '6px 16px', borderRadius: '12px', display: 'flex', alignItems: 'center', border: '1px solid rgba(184,82,38,0.2)', boxShadow: '0 4px 12px rgba(74,40,24,0.08)' }}>
                <img src="/kec-logo.png" alt="KEC" style={{ height: '36px', width: 'auto' }} />
              </div>
              <div style={{ background: '#1C120E', padding: '6px 14px', borderRadius: '12px', display: 'flex', alignItems: 'center', border: '1px solid #B85028' }}>
                <img src="/madc-logo.png" alt="MADC" style={{ height: '38px', width: 'auto' }} />
              </div>
            </div>

            <div style={{
              fontSize: '0.9rem', color: '#B85028',
              fontFamily: 'var(--font-mono)', letterSpacing: '0.2em',
              textTransform: 'uppercase', marginBottom: '0.5rem', fontWeight: 800
            }}>
              Kongu Engineering College (Autonomous)
            </div>

            <h1 style={{
              fontSize: 'clamp(2.2rem, 5vw, 3.2rem)',
              fontWeight: 900, color: '#2B1911',
              lineHeight: 1.15, marginBottom: '0.75rem',
              fontFamily: 'var(--font-display)'
            }}>
              MADC Portal <span style={{ color: '#B85028' }}>Inaugurated!</span>
            </h1>

            <p style={{ color: '#604E45', fontSize: '1.15rem', marginBottom: '1.5rem', fontWeight: 600 }}>
              Welcome to the official Mobile Application Development Club digital ecosystem.
            </p>

            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.75rem',
              padding: '0.75rem 1.75rem',
              background: '#4A2818',
              borderRadius: '9999px',
              color: '#FFFFFF', fontFamily: 'var(--font-mono)', fontSize: '0.95rem',
              boxShadow: '0 8px 20px rgba(74, 40, 24, 0.3)'
            }}>
              <span className="terminal-cursor" style={{ width: '8px', height: '14px', background: '#FFFFFF' }} />
              <span>Opening Club Website now...</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
