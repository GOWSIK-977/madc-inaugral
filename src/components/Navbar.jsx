import React, { useState, useEffect } from 'react';
import { soundFX } from '../audio/soundEffects';

export function Navbar({ onReplayLaunch, onOpenJoinModal, soundEnabled, onToggleSound }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, id) => {
    e.preventDefault();
    soundFX.playClick();
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className={`site-navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        {/* Brand Logo with KEC and MADC */}
        <a href="#hero" onClick={(e) => handleNavClick(e, 'hero')} className="nav-brand" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ background: '#ffffff', padding: '3px 8px', borderRadius: '8px', display: 'flex', alignItems: 'center' }}>
            <img src="/kec-logo.png" alt="KEC" style={{ height: '24px', width: 'auto' }} />
          </div>
          <img
            src="/madc-logo.png"
            alt="MADC"
            style={{
              height: '30px',
              width: 'auto',
              borderRadius: '6px',
              filter: 'drop-shadow(0 0 6px rgba(0,255,102,0.6))'
            }}
          />
          <div className="nav-brand-text">
            <span className="nav-brand-title">
              MADC <span style={{ color: '#00FF66', fontSize: '0.85em' }}>• KEC</span>
            </span>
            <span className="nav-brand-sub">Mobile Application Club</span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav>
          <ul className="nav-links">
            <li><a href="#about" onClick={(e) => handleNavClick(e, 'about')} className="nav-link">About Club</a></li>
            <li><a href="#domains" onClick={(e) => handleNavClick(e, 'domains')} className="nav-link">Domains</a></li>
            <li><a href="#projects" onClick={(e) => handleNavClick(e, 'projects')} className="nav-link">Apps & Projects</a></li>
            <li><a href="#events" onClick={(e) => handleNavClick(e, 'events')} className="nav-link">Events</a></li>
            <li><a href="#team" onClick={(e) => handleNavClick(e, 'team')} className="nav-link">Team</a></li>
          </ul>
        </nav>

        {/* Action Controls */}
        <div className="nav-actions">
          {/* Live Website Link */}
          <a
            href="https://madc-xi.vercel.app/"
            target="_blank"
            rel="noreferrer"
            className="btn-replay-launch"
            style={{ color: '#00FF66', borderColor: 'rgba(0, 255, 102, 0.4)', background: 'rgba(0, 255, 102, 0.08)' }}
            title="Visit live deployed website"
          >
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#00FF66' }}></span>
            <span>madc-xi.vercel.app ↗</span>
          </a>

          {/* Replay Opening Effect Button */}
          <button
            onClick={() => {
              soundFX.playClick();
              onReplayLaunch();
            }}
            className="btn-replay-launch"
            title="Replay the opening launch countdown and effects"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polygon points="5 3 19 12 5 21 5 3"></polygon>
            </svg>
            <span>Replay Launch</span>
          </button>

          {/* Sound Toggle */}
          <button
            onClick={onToggleSound}
            className="btn-sound-toggle"
            title={soundEnabled ? 'Mute Sound FX' : 'Enable Sound FX'}
          >
            {soundEnabled ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                <line x1="23" y1="9" x2="17" y2="15"></line>
                <line x1="17" y1="9" x2="23" y2="15"></line>
              </svg>
            )}
          </button>

          {/* Join Club CTA */}
          <button
            onClick={() => {
              soundFX.playClick();
              onOpenJoinModal();
            }}
            className="btn-join-nav"
          >
            Join Club
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="mobile-menu-toggle"
            aria-label="Toggle Navigation Menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {mobileMenuOpen ? (
                <path d="M18 6L6 18M6 6l12 12" />
              ) : (
                <path d="M3 12h18M3 6h18M3 18h18" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div style={{
          background: 'rgba(9, 13, 22, 0.98)',
          borderBottom: '1px solid rgba(6, 182, 212, 0.3)',
          padding: '1.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.25rem'
        }}>
          <a href="#about" onClick={(e) => handleNavClick(e, 'about')} style={{ color: '#f8fafc', textDecoration: 'none', fontWeight: 600 }}>About Club</a>
          <a href="#domains" onClick={(e) => handleNavClick(e, 'domains')} style={{ color: '#f8fafc', textDecoration: 'none', fontWeight: 600 }}>Domains & Technologies</a>
          <a href="#projects" onClick={(e) => handleNavClick(e, 'projects')} style={{ color: '#f8fafc', textDecoration: 'none', fontWeight: 600 }}>Apps & Projects</a>
          <a href="#events" onClick={(e) => handleNavClick(e, 'events')} style={{ color: '#f8fafc', textDecoration: 'none', fontWeight: 600 }}>Events & Hackathons</a>
          <a href="#team" onClick={(e) => handleNavClick(e, 'team')} style={{ color: '#f8fafc', textDecoration: 'none', fontWeight: 600 }}>Leadership Team</a>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenJoinModal();
            }}
            className="btn-primary-glow"
            style={{ width: '100%', justifyContent: 'center' }}
          >
            Join MADC 2026
          </button>
        </div>
      )}
    </header>
  );
}
