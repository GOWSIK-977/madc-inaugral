import React from 'react';
import { soundFX } from '../audio/soundEffects';

export function ProjectModal({ project, onClose }) {
  if (!project) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button
          onClick={() => {
            soundFX.playClick();
            onClose();
          }}
          className="modal-close-btn"
          aria-label="Close Project Details"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        {/* Modal Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.6rem' }}>
          <span style={{
            fontSize: '0.75rem',
            padding: '0.25rem 0.65rem',
            borderRadius: '9999px',
            background: 'rgba(6, 182, 212, 0.15)',
            border: '1px solid rgba(6, 182, 212, 0.4)',
            color: '#38bdf8',
            fontFamily: 'var(--font-mono)'
          }}>
            {project.category}
          </span>
          <span style={{ fontSize: '0.8rem', color: '#f59e0b', fontWeight: 700 }}>
            ★ {project.rating} Rating
          </span>
          <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
            • {project.downloads} Downloads
          </span>
        </div>

        <h2 style={{ fontSize: '1.85rem', fontWeight: 800, color: '#ffffff', marginBottom: '0.4rem' }}>
          {project.title}
        </h2>
        <p style={{ fontSize: '1rem', color: '#38bdf8', marginBottom: '1.25rem' }}>
          {project.tagline}
        </p>

        {/* Description */}
        <p style={{ color: '#cbd5e1', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
          {project.description}
        </p>

        {/* Tech Stack Chips */}
        <div style={{ marginBottom: '1.5rem' }}>
          <div style={{ fontSize: '0.8rem', fontFamily: 'var(--font-mono)', color: '#94a3b8', marginBottom: '0.5rem', textTransform: 'uppercase' }}>
            Engineered With:
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {project.stack.map((item, i) => (
              <span key={i} className="tech-tag" style={{ color: '#f8fafc', borderColor: 'rgba(6, 182, 212, 0.3)', background: 'rgba(6, 182, 212, 0.1)' }}>
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* Key Features */}
        <div style={{ marginBottom: '1.75rem' }}>
          <div style={{ fontSize: '0.8rem', fontFamily: 'var(--font-mono)', color: '#94a3b8', marginBottom: '0.5rem', textTransform: 'uppercase' }}>
            Key Capabilities:
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {project.features.map((feat, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', fontSize: '0.9rem', color: '#e2e8f0' }}>
                <span style={{ color: '#10b981', fontWeight: 800 }}>✓</span>
                <span>{feat}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <a
            href={project.github}
            target="_blank"
            rel="noreferrer"
            className="btn-primary-glow"
            style={{ fontSize: '0.9rem', padding: '0.75rem 1.5rem' }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
            </svg>
            <span>View Source Code</span>
          </a>
          <button
            onClick={() => {
              soundFX.playClick();
              alert(`Simulated download of ${project.title} package initiated for Android/iOS.`);
            }}
            className="btn-secondary-glass"
            style={{ fontSize: '0.9rem', padding: '0.75rem 1.5rem' }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
            <span>Install APK / TestFlight</span>
          </button>
        </div>
      </div>
    </div>
  );
}
