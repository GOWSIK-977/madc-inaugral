import React, { useState, useEffect } from 'react';
import { LaunchPortal } from './components/LaunchPortal';
import { Navbar } from './components/Navbar';
import { InteractivePhone } from './components/InteractivePhone';
import { ProjectModal } from './components/ProjectModal';
import { JoinModal } from './components/JoinModal';
import { soundFX } from './audio/soundEffects';
import {
  KEC_INFO,
  CLUB_STATS,
  DOMAINS,
  STUDENT_PROJECTS,
  UPCOMING_EVENTS,
  PRINCIPAL_INFO,
  TEAM_MEMBERS,
  TESTIMONIALS
} from './data/clubData';

export function App() {
  const [isLaunched, setIsLaunched] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [activeProject, setActiveProject] = useState(null);
  const [isJoinOpen, setIsJoinOpen] = useState(false);

  // Toggle sound effects globally
  const handleToggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    soundFX.toggle(next);
    if (next) soundFX.playClick();
  };

  // Replay the opening launchpad
  const handleReplayLaunch = () => {
    setIsLaunched(false);
  };

  return (
    <div style={{ minHeight: '100vh', position: 'relative' }}>
      {/* 1. OPENING STAGE: Launch Portal with Opening Button & Effects */}
      {!isLaunched && (
        <LaunchPortal
          onLaunchComplete={() => setIsLaunched(true)}
          soundEnabled={soundEnabled}
          onToggleSound={handleToggleSound}
        />
      )}

      {/* 2. THE MAIN WEBSITE (Rendered smoothly upon launch completion) */}
      <div style={{ opacity: isLaunched ? 1 : 0, transition: 'opacity 0.6s ease' }}>
        {/* Navigation Bar */}
        <Navbar
          onReplayLaunch={handleReplayLaunch}
          onOpenJoinModal={() => setIsJoinOpen(true)}
          soundEnabled={soundEnabled}
          onToggleSound={handleToggleSound}
        />

        {/* HERO SECTION */}
        <section id="hero" className="hero-section">
          <div className="hero-glow-orb" />
          <div className="hero-glow-orb-2" />

          <div className="hero-grid-layout">
            <div className="hero-content">
              {/* Institution badge */}
              <div className="hero-badge-tag">
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#06b6d4', display: 'inline-block', boxShadow: '0 0 8px #06b6d4' }}></span>
                <span>{KEC_INFO.collegeName} • Autonomous</span>
              </div>

              <h1 className="hero-title">
                Architecting the Future of <br />
                <span className="text-gradient-cyan">Mobile Innovation.</span>
              </h1>

              <p className="hero-subtitle">
                Welcome to the official portal of <strong>Mobile Application Club (MADC)</strong> at <strong>Kongu Engineering College</strong>, Perundurai. Empowering engineers to build world-class Android, iOS, and Flutter applications.
              </p>

              <div className="hero-buttons-row">
                <a
                  href="#projects"
                  onClick={() => soundFX.playClick()}
                  className="btn-primary-glow"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <rect width="14" height="20" x="5" y="2" rx="3" ry="3" />
                    <path d="M12 18h.01" />
                  </svg>
                  <span>Explore Student Apps</span>
                </a>

                <button
                  onClick={() => {
                    soundFX.playClick();
                    setIsJoinOpen(true);
                  }}
                  className="btn-secondary-glass"
                >
                  <span>Join Club 2026</span>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </button>
              </div>

              {/* Quick accreditation pills */}
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '1rem', fontSize: '0.82rem', color: '#94a3b8', fontFamily: 'var(--font-mono)' }}>
                <span>✓ NAAC 'A++' Accredited</span>
                <span>✓ NBA Accredited Programs</span>
                <span>✓ Industry Mentorship</span>
              </div>
            </div>

            {/* Interactive 3D Smartphone Simulator */}
            <InteractivePhone />
          </div>
        </section>

        {/* INAUGURAL HONOR: PRINCIPAL DR. R. PARAMESHWARAN */}
        <section style={{ maxWidth: '1280px', margin: '-2rem auto 3rem', padding: '0 1.5rem', position: 'relative', zIndex: 10 }}>
          <div style={{
            background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.92) 0%, rgba(20, 30, 48, 0.88) 100%)',
            border: '1px solid rgba(0, 255, 102, 0.4)',
            borderRadius: '24px',
            padding: '1.75rem 2.25rem',
            boxShadow: '0 20px 45px -10px rgba(0, 0, 0, 0.7), 0 0 35px rgba(0, 255, 102, 0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1.75rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
              <div style={{ position: 'relative' }}>
                <img
                  src={PRINCIPAL_INFO.photo}
                  alt={PRINCIPAL_INFO.name}
                  style={{
                    width: '88px',
                    height: '88px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    border: '3px solid #00FF66',
                    boxShadow: '0 0 20px rgba(0, 255, 102, 0.4)',
                    display: 'block'
                  }}
                />
                <span style={{
                  position: 'absolute',
                  bottom: '-2px',
                  right: '-2px',
                  background: '#00FF66',
                  color: '#000',
                  fontSize: '0.65rem',
                  fontWeight: 800,
                  padding: '2px 7px',
                  borderRadius: '9999px',
                  fontFamily: 'var(--font-mono)'
                }}>
                  OPENING PERSON
                </span>
              </div>

              <div>
                <div style={{ fontSize: '0.75rem', color: '#00FF66', textTransform: 'uppercase', letterSpacing: '0.08em', fontFamily: 'var(--font-mono)', marginBottom: '0.2rem' }}>
                  {PRINCIPAL_INFO.honor}
                </div>
                <h3 style={{ fontSize: '1.55rem', fontWeight: 800, color: '#ffffff', lineHeight: 1.2 }}>
                  {PRINCIPAL_INFO.name}
                </h3>
                <div style={{ fontSize: '0.9rem', color: '#94a3b8' }}>
                  {PRINCIPAL_INFO.role}
                </div>
              </div>
            </div>

            <div style={{ maxWidth: '460px', borderLeft: '2px solid rgba(0, 255, 102, 0.3)', paddingLeft: '1.25rem' }}>
              <p style={{ fontSize: '0.88rem', color: '#cbd5e1', fontStyle: 'italic', lineHeight: 1.6 }}>
                "{PRINCIPAL_INFO.message}"
              </p>
            </div>
          </div>
        </section>

        {/* STATS TICKER */}
        <section className="stats-banner">
          <div className="stats-grid">
            {CLUB_STATS.map((stat, i) => (
              <div key={i} className="stat-item">
                <span className="stat-value text-gradient-cyan">{stat.value}</span>
                <span className="stat-label">{stat.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ABOUT SECTION */}
        <section id="about" className="section-wrapper">
          <div className="section-header">
            <div className="section-pill">About MADC & Kongu Engineering College</div>
            <h2 className="section-title">
              Nurturing Campus Developers into <span className="text-gradient-purple">Product Engineers</span>
            </h2>
            <p className="section-description">
              Located in Perundurai, Erode, Kongu Engineering College has fostered technological excellence for over 4 decades. MADC operates as the premier mobile technology hub, bringing together design, code, and deployment.
            </p>
          </div>

          <div className="about-grid">
            <div className="glass-panel" style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={{ width: '50px', height: '50px', borderRadius: '14px', background: 'rgba(6, 182, 212, 0.2)', border: '1px solid #06b6d4', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>
                🎯
              </div>
              <h3 style={{ fontSize: '1.65rem', fontWeight: 800, color: '#ffffff' }}>
                Our Vision & Mission
              </h3>
              <p style={{ color: '#cbd5e1', lineHeight: 1.7 }}>
                To establish an elite mobile engineering ecosystem within Kongu Engineering College where students master native development paradigms, create impactful solutions for campus and societal challenges, and publish production-grade apps on global app stores.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '0.5rem' }}>
                <div style={{ padding: '1rem', background: 'rgba(15, 23, 42, 0.6)', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
                  <div style={{ color: '#38bdf8', fontWeight: 700, fontSize: '0.9rem', marginBottom: '0.25rem' }}>Hands-on Labs</div>
                  <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Weekly live coding sprints and collaborative pull requests.</div>
                </div>
                <div style={{ padding: '1rem', background: 'rgba(15, 23, 42, 0.6)', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
                  <div style={{ color: '#a855f7', fontWeight: 700, fontSize: '0.9rem', marginBottom: '0.25rem' }}>Hackathons</div>
                  <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>National hackathon training, prototyping & mentorship.</div>
                </div>
              </div>
            </div>

            {/* Core Pillars List */}
            <div className="about-features-list">
              {[
                {
                  title: 'Clean Native Architecture',
                  desc: 'Adhering to MVVM, MVI, unidirectional data flow, dependency injection (Hilt, Koin), and test-driven mobile development.',
                  icon: '⚡',
                  bg: 'rgba(6, 182, 212, 0.15)',
                  border: '#06b6d4'
                },
                {
                  title: 'Apple & Material Design Standards',
                  desc: 'Transforming wireframes into fluid 120Hz micro-animations, accessible color contrasts, and tactile haptic feedback.',
                  icon: '🎨',
                  bg: 'rgba(244, 63, 94, 0.15)',
                  border: '#f43f5e'
                },
                {
                  title: 'Edge AI & Cloud Integration',
                  desc: 'Deploying optimized TensorFlow Lite and CoreML models directly on mobile silicon for instant offline inference.',
                  icon: '🧠',
                  bg: 'rgba(168, 85, 247, 0.15)',
                  border: '#a855f7'
                },
                {
                  title: 'Automated CI/CD Pipelines',
                  desc: 'Automating builds with GitHub Actions, Fastlane, Firebase App Distribution, and zero-downtime over-the-air updates.',
                  icon: '🚀',
                  bg: 'rgba(16, 185, 129, 0.15)',
                  border: '#10b981'
                }
              ].map((pillar, i) => (
                <div key={i} className="about-feature-card">
                  <div className="feature-icon-box" style={{ background: pillar.bg, border: `1px solid ${pillar.border}`, fontSize: '1.3rem' }}>
                    {pillar.icon}
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#f8fafc', marginBottom: '0.25rem' }}>
                      {pillar.title}
                    </h4>
                    <p style={{ fontSize: '0.88rem', color: '#94a3b8', lineHeight: 1.5 }}>
                      {pillar.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* DOMAINS & TECH STACK SECTION */}
        <section id="domains" className="section-wrapper" style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(15, 23, 42, 0.6) 0%, transparent 80%)' }}>
          <div className="section-header">
            <div className="section-pill">Specialized Verticals</div>
            <h2 className="section-title">
              Mastering Modern <span className="text-gradient-cyan">Mobile Frameworks</span>
            </h2>
            <p className="section-description">
              Whether you are passionate about bare-metal Kotlin performance, elegant SwiftUI canvas, or rapid Flutter cross-platform deployment, MADC has dedicated cohorts.
            </p>
          </div>

          <div className="domains-grid">
            {DOMAINS.map((domain) => (
              <div key={domain.id} className="glass-panel domain-card">
                <span className="domain-badge">{domain.badge}</span>
                <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: `${domain.color}20`, border: `1px solid ${domain.color}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem' }}>
                  {domain.icon === 'android' ? '🤖' : domain.icon === 'apple' ? '🍏' : domain.icon === 'layers' ? '⚡' : domain.icon === 'palette' ? '🎨' : '☁️'}
                </div>
                <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#ffffff' }}>
                  {domain.name}
                </h3>
                <p style={{ fontSize: '0.9rem', color: '#94a3b8', lineHeight: 1.6 }}>
                  {domain.description}
                </p>
                <div style={{ fontSize: '0.8rem', color: '#cbd5e1', background: 'rgba(15, 23, 42, 0.6)', padding: '0.65rem 0.85rem', borderRadius: '10px', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
                  <strong style={{ color: domain.color }}>Focus:</strong> {domain.focus}
                </div>
                <div className="domain-tech-tags">
                  {domain.techs.map((tech, i) => (
                    <span key={i} className="tech-tag">{tech}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* APPS & PROJECTS SHOWCASE */}
        <section id="projects" className="section-wrapper">
          <div className="section-header">
            <div className="section-pill">Student Portfolio</div>
            <h2 className="section-title">
              Featured Apps Built by <span className="text-gradient-cyan">KECians</span>
            </h2>
            <p className="section-description">
              Explore production applications created, engineered, and maintained by student developers of Kongu Engineering College.
            </p>
          </div>

          <div className="projects-grid">
            {STUDENT_PROJECTS.map((project) => (
              <div
                key={project.id}
                className="glass-panel project-card"
                onClick={() => {
                  soundFX.playClick();
                  setActiveProject(project);
                }}
              >
                <div className="project-card-header">
                  <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', padding: '0.2rem 0.6rem', borderRadius: '9999px', background: 'rgba(6, 182, 212, 0.12)', color: '#38bdf8', border: '1px solid rgba(6, 182, 212, 0.3)' }}>
                    {project.badge}
                  </span>
                  <div className="project-rating-pill">
                    ★ {project.rating}
                  </div>
                </div>

                <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#ffffff' }}>
                  {project.title}
                </h3>

                <p style={{ fontSize: '0.9rem', color: '#94a3b8', lineHeight: 1.6 }}>
                  {project.tagline}
                </p>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginTop: 'auto' }}>
                  {project.stack.map((tech, idx) => (
                    <span key={idx} className="tech-tag">{tech}</span>
                  ))}
                </div>

                <div className="project-actions-row">
                  <span style={{ fontSize: '0.8rem', color: '#64748b', fontFamily: 'var(--font-mono)' }}>
                    {project.downloads} Users
                  </span>
                  <button className="btn-view-project">
                    <span>View App Specs</span>
                    <span>→</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* UPCOMING EVENTS & HACKATHONS */}
        <section id="events" className="section-wrapper" style={{ background: 'radial-gradient(ellipse at 50% 30%, rgba(139, 92, 246, 0.08) 0%, transparent 70%)' }}>
          <div className="section-header">
            <div className="section-pill">Hackathons & Masterclasses</div>
            <h2 className="section-title">
              Upcoming Events & <span className="text-gradient-purple">Bootcamps</span>
            </h2>
            <p className="section-description">
              Sharpen your skills, collaborate in high-stakes hackathons, and learn directly from industry architects at Kongu Engineering College.
            </p>
          </div>

          <div className="events-list">
            {UPCOMING_EVENTS.map((event) => (
              <div key={event.id} className="glass-panel event-card">
                <div className="event-date-box">
                  <span style={{ fontSize: '1.6rem', fontWeight: 800, color: '#ffffff', lineHeight: 1 }}>
                    {event.daysRemaining}
                  </span>
                  <span style={{ fontSize: '0.65rem', fontFamily: 'var(--font-mono)', color: '#38bdf8', textTransform: 'uppercase', marginTop: '4px' }}>
                    Days Left
                  </span>
                </div>

                <div className="event-details-content">
                  <div style={{ display: 'flex', gap: '0.65rem', alignItems: 'center', flexWrap: 'wrap' }}>
                    <span style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', padding: '0.2rem 0.6rem', borderRadius: '6px', background: 'rgba(168, 85, 247, 0.2)', border: '1px solid rgba(168, 85, 247, 0.4)', color: '#c084fc' }}>
                      {event.type}
                    </span>
                    <span style={{ fontSize: '0.78rem', color: '#10b981', fontWeight: 700 }}>
                      ● {event.status}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#ffffff' }}>
                    {event.title}
                  </h3>

                  <p style={{ fontSize: '0.9rem', color: '#cbd5e1', lineHeight: 1.5 }}>
                    {event.description}
                  </p>

                  <div className="event-meta-row">
                    <span>📍 {event.venue}</span>
                    <span>📅 {event.date}</span>
                    <span>🏆 {event.prizePool}</span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    soundFX.playClick();
                    setIsJoinOpen(true);
                  }}
                  className="btn-primary-glow"
                  style={{ whiteSpace: 'nowrap', padding: '0.75rem 1.65rem', fontSize: '0.9rem' }}
                >
                  Register Now
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* LEADERSHIP TEAM */}
        <section id="team" className="section-wrapper">
          <div className="section-header">
            <div className="section-pill">Club Mentors & Office Bearers</div>
            <h2 className="section-title">
              Driven by Passionate <span className="text-gradient-cyan">Leaders</span>
            </h2>
            <p className="section-description">
              Meet the faculty advisors and student office bearers behind the Mobile Application Club at Kongu Engineering College.
            </p>
          </div>

          <div className="team-grid">
            {TEAM_MEMBERS.map((member, i) => (
              <div key={i} className="glass-panel team-card">
                <img src={member.avatar} alt={member.name} className="team-avatar" />
                <span style={{ fontSize: '0.7rem', fontFamily: 'var(--font-mono)', padding: '0.2rem 0.6rem', borderRadius: '9999px', background: 'rgba(6, 182, 212, 0.15)', color: '#38bdf8', border: '1px solid rgba(6, 182, 212, 0.3)' }}>
                  {member.badge}
                </span>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#ffffff' }}>
                  {member.name}
                </h3>
                <div style={{ fontSize: '0.85rem', color: '#06b6d4', fontWeight: 600 }}>
                  {member.role}
                </div>
                <div style={{ fontSize: '0.78rem', color: '#94a3b8' }}>
                  {member.dept}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ALUMNI TESTIMONIALS */}
        <section className="section-wrapper" style={{ paddingTop: '1rem' }}>
          <div className="section-header">
            <div className="section-pill">Alumni Impact</div>
            <h2 className="section-title">
              From KEC Labs to <span className="text-gradient-gold">Global Tech</span>
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.75rem' }}>
            {TESTIMONIALS.map((item, i) => (
              <div key={i} className="glass-panel" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ color: '#f59e0b', fontSize: '1.8rem', lineHeight: 1 }}>“</div>
                <p style={{ fontSize: '0.92rem', color: '#cbd5e1', fontStyle: 'italic', lineHeight: 1.6 }}>
                  {item.quote}
                </p>
                <div style={{ marginTop: 'auto', borderTop: '1px solid var(--border-subtle)', paddingTop: '1rem' }}>
                  <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#ffffff' }}>{item.author}</div>
                  <div style={{ fontSize: '0.8rem', color: '#38bdf8' }}>{item.currentRole}</div>
                  <div style={{ fontSize: '0.72rem', color: '#64748b' }}>{item.batch}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* JOIN CTA BANNER */}
        <section className="section-wrapper" style={{ paddingBottom: '6rem' }}>
          <div style={{
            background: 'linear-gradient(135deg, rgba(2, 132, 199, 0.25) 0%, rgba(139, 92, 246, 0.25) 100%)',
            border: '1px solid rgba(6, 182, 212, 0.4)',
            borderRadius: '28px',
            padding: '3.5rem 2rem',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: '0 20px 50px -10px rgba(6, 182, 212, 0.25)'
          }}>
            <div style={{ maxWidth: '650px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.35rem 0.95rem', borderRadius: '9999px', background: 'rgba(255, 255, 255, 0.1)', color: '#ffffff', fontSize: '0.8rem', fontFamily: 'var(--font-mono)', marginBottom: '1.25rem' }}>
                🚀 Ready to Build Real-World Mobile Apps?
              </div>
              <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, color: '#ffffff', marginBottom: '1rem', lineHeight: 1.2 }}>
                Be Part of the Mobile Revolution at <span className="text-gradient-cyan">KEC</span>
              </h2>
              <p style={{ color: '#cbd5e1', fontSize: '1.05rem', marginBottom: '2rem', lineHeight: 1.6 }}>
                Open to all enthusiastic students of Kongu Engineering College. No prior app development experience required — only curiosity and passion to learn.
              </p>
              <button
                onClick={() => {
                  soundFX.playClick();
                  setIsJoinOpen(true);
                }}
                className="btn-primary-glow"
                style={{ fontSize: '1.1rem', padding: '1.1rem 2.75rem' }}
              >
                Register & Get Your Member Pass
              </button>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="site-footer">
          <div className="footer-container">
            {/* Col 1: About */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                <div style={{ background: '#ffffff', padding: '4px 10px', borderRadius: '10px', display: 'flex', alignItems: 'center' }}>
                  <img src="/kec-logo.png" alt="KEC" style={{ height: '30px', width: 'auto' }} />
                </div>
                <img
                  src="/madc-logo.png"
                  alt="MADC Logo"
                  style={{ height: '38px', width: 'auto', borderRadius: '6px', filter: 'drop-shadow(0 0 10px rgba(0,255,102,0.7))' }}
                />
              </div>
              <p style={{ fontSize: '0.88rem', color: '#94a3b8', lineHeight: 1.6, maxWidth: '380px' }}>
                {KEC_INFO.location}. Affiliated to Anna University, Chennai. Approved by AICTE, Accredited by NAAC with 'A++' Grade.
              </p>
              <div style={{ fontSize: '0.82rem', color: '#38bdf8' }}>
                Contact: <a href={`mailto:${KEC_INFO.contactEmail}`} style={{ color: '#38bdf8', textDecoration: 'none' }}>{KEC_INFO.contactEmail}</a>
              </div>
            </div>

            {/* Col 2: Navigation */}
            <div>
              <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#ffffff', marginBottom: '1.25rem', fontFamily: 'var(--font-mono)' }}>
                EXPLORE
              </h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.88rem' }}>
                <li><a href="#about" style={{ color: '#94a3b8', textDecoration: 'none' }}>About Club</a></li>
                <li><a href="#domains" style={{ color: '#94a3b8', textDecoration: 'none' }}>Tech Domains</a></li>
                <li><a href="#projects" style={{ color: '#94a3b8', textDecoration: 'none' }}>Student Apps</a></li>
                <li><a href="#events" style={{ color: '#94a3b8', textDecoration: 'none' }}>AppThon 2026</a></li>
                <li><a href="#team" style={{ color: '#94a3b8', textDecoration: 'none' }}>Faculty & Leads</a></li>
              </ul>
            </div>

            {/* Col 3: Domains */}
            <div>
              <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#ffffff', marginBottom: '1.25rem', fontFamily: 'var(--font-mono)' }}>
                STACKS
              </h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.88rem', color: '#94a3b8' }}>
                <li>Android (Kotlin Compose)</li>
                <li>Apple iOS (SwiftUI)</li>
                <li>Cross-Platform (Flutter)</li>
                <li>UI/UX (Figma Design)</li>
                <li>Edge AI & Cloud</li>
              </ul>
            </div>

            {/* Col 4: Opening Replay & Campus Action */}
            <div>
              <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#ffffff', marginBottom: '1.25rem', fontFamily: 'var(--font-mono)' }}>
                INTERACTIVE PORTAL
              </h4>
              <p style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '1rem', lineHeight: 1.5 }}>
                Experience the opening launch button, audio effects, and countdown again:
              </p>
              <button
                onClick={() => {
                  soundFX.playClick();
                  handleReplayLaunch();
                }}
                className="btn-replay-launch"
                style={{ padding: '0.65rem 1.25rem', fontSize: '0.88rem' }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polygon points="5 3 19 12 5 21 5 3"></polygon>
                </svg>
                <span>Replay Opening Experience</span>
              </button>
            </div>
          </div>

          <div className="footer-bottom">
            <div>
              © 2026 Mobile Application Club (MADC), Kongu Engineering College. All rights reserved.
            </div>
            <div style={{ display: 'flex', gap: '1.5rem', fontFamily: 'var(--font-mono)' }}>
              <span>Autonomous</span>
              <span>NAAC A++</span>
              <span>NBA Accredited</span>
            </div>
          </div>
        </footer>
      </div>

      {/* MODALS */}
      {activeProject && (
        <ProjectModal
          project={activeProject}
          onClose={() => setActiveProject(null)}
        />
      )}

      {isJoinOpen && (
        <JoinModal
          onClose={() => setIsJoinOpen(false)}
        />
      )}
    </div>
  );
}

export default App;
