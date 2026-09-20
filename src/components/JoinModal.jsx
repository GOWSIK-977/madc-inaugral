import React, { useState } from 'react';
import { soundFX } from '../audio/soundEffects';

export function JoinModal({ onClose }) {
  const [formData, setFormData] = useState({
    fullName: '',
    rollNumber: '',
    department: 'Computer Applications',
    year: '2nd Year',
    domain: 'Android Native Core',
    github: ''
  });

  const [submittedCard, setSubmittedCard] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    soundFX.playWelcomeChime();

    // Generate member ID like KEC-MADC-2026-XXXX
    const randomId = Math.floor(1000 + Math.random() * 9000);
    const memberId = `KEC-MADC-26-${randomId}`;

    setSubmittedCard({
      ...formData,
      memberId,
      joinDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    });
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        {/* Close button */}
        <button
          onClick={() => {
            soundFX.playClick();
            onClose();
          }}
          className="modal-close-btn"
          aria-label="Close Modal"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        {!submittedCard ? (
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.25rem 0.75rem', borderRadius: '9999px', background: 'rgba(6, 182, 212, 0.15)', border: '1px solid rgba(6, 182, 212, 0.35)', color: '#38bdf8', fontSize: '0.78rem', fontFamily: 'var(--font-mono)', marginBottom: '0.85rem' }}>
              ✦ Membership Intake 2026-2027
            </div>

            <h2 style={{ fontSize: '1.85rem', fontWeight: 800, color: '#ffffff', marginBottom: '0.4rem' }}>
              Join <span className="text-gradient-cyan">MADC</span>
            </h2>
            <p style={{ color: '#94a3b8', fontSize: '0.92rem', marginBottom: '1.75rem' }}>
              Kongu Engineering College • Mobile Application Club. Elevate your craft with workshops, hackathon teams, and production deployments.
            </p>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.15rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontFamily: 'var(--font-mono)', color: '#cbd5e1', marginBottom: '0.35rem' }}>
                  Full Student Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Gowsik R"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    background: 'rgba(15, 23, 42, 0.9)',
                    border: '1px solid rgba(148, 163, 184, 0.2)',
                    borderRadius: '12px',
                    color: '#ffffff',
                    fontSize: '0.95rem',
                    outline: 'none'
                  }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontFamily: 'var(--font-mono)', color: '#cbd5e1', marginBottom: '0.35rem' }}>
                    KEC Roll Number *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 23CAD042"
                    value={formData.rollNumber}
                    onChange={(e) => setFormData({ ...formData, rollNumber: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      background: 'rgba(15, 23, 42, 0.9)',
                      border: '1px solid rgba(148, 163, 184, 0.2)',
                      borderRadius: '12px',
                      color: '#ffffff',
                      fontSize: '0.95rem',
                      outline: 'none'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontFamily: 'var(--font-mono)', color: '#cbd5e1', marginBottom: '0.35rem' }}>
                    Year of Study
                  </label>
                  <select
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      background: '#0f172a',
                      border: '1px solid rgba(148, 163, 184, 0.2)',
                      borderRadius: '12px',
                      color: '#ffffff',
                      fontSize: '0.95rem',
                      outline: 'none'
                    }}
                  >
                    <option>1st Year</option>
                    <option>2nd Year</option>
                    <option>3rd Year</option>
                    <option>Final Year</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontFamily: 'var(--font-mono)', color: '#cbd5e1', marginBottom: '0.35rem' }}>
                  Branch / Department
                </label>
                <select
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    background: '#0f172a',
                    border: '1px solid rgba(148, 163, 184, 0.2)',
                    borderRadius: '12px',
                    color: '#ffffff',
                    fontSize: '0.95rem',
                    outline: 'none'
                  }}
                >
                  <option>Computer Applications (MCA)</option>
                  <option>Computer Science & Engineering (CSE)</option>
                  <option>Information Technology (IT)</option>
                  <option>Artificial Intelligence & Data Science (AI & DS)</option>
                  <option>Electronics & Communication (ECE)</option>
                  <option>Electrical & Electronics (EEE)</option>
                  <option>Mechanical & Mechatronics Engineering</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontFamily: 'var(--font-mono)', color: '#cbd5e1', marginBottom: '0.35rem' }}>
                  Primary Domain of Interest
                </label>
                <select
                  value={formData.domain}
                  onChange={(e) => setFormData({ ...formData, domain: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    background: '#0f172a',
                    border: '1px solid rgba(148, 163, 184, 0.2)',
                    borderRadius: '12px',
                    color: '#ffffff',
                    fontSize: '0.95rem',
                    outline: 'none'
                  }}
                >
                  <option>Android Native Core (Kotlin, Jetpack Compose)</option>
                  <option>iOS Ecosystem (Swift, SwiftUI)</option>
                  <option>Cross-Platform (Flutter & React Native)</option>
                  <option>Mobile UI/UX & Design Systems</option>
                  <option>Mobile Cloud & Edge AI (TFLite, Supabase)</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontFamily: 'var(--font-mono)', color: '#cbd5e1', marginBottom: '0.35rem' }}>
                  GitHub or Portfolio URL (Optional)
                </label>
                <input
                  type="url"
                  placeholder="https://github.com/your-username"
                  value={formData.github}
                  onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    background: 'rgba(15, 23, 42, 0.9)',
                    border: '1px solid rgba(148, 163, 184, 0.2)',
                    borderRadius: '12px',
                    color: '#ffffff',
                    fontSize: '0.95rem',
                    outline: 'none'
                  }}
                />
              </div>

              <button
                type="submit"
                className="btn-primary-glow"
                style={{ width: '100%', justifyContent: 'center', marginTop: '0.5rem', padding: '0.95rem' }}
              >
                Submit Application & Generate Digital Pass
              </button>
            </form>
          </div>
        ) : (
          /* DIGITAL PASS GENERATED */
          <div style={{ textAlign: 'center' }}>
            <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.2)', border: '2px solid #10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem', color: '#10b981', fontSize: '1.8rem' }}>
              ✓
            </div>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#ffffff', marginBottom: '0.25rem' }}>
              Welcome to the Family!
            </h2>
            <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '1.75rem' }}>
              Your membership registration for Kongu Engineering College MADC is verified.
            </p>

            {/* DIGITAL MEMBER ID CARD */}
            <div className="member-id-card">
              <div className="member-id-watermark">MADC</div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem', position: 'relative', zIndex: 2 }}>
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontSize: '0.72rem', color: '#38bdf8', fontFamily: 'var(--font-mono)', letterSpacing: '0.08em' }}>
                    KONGU ENGINEERING COLLEGE
                  </div>
                  <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#ffffff' }}>
                    Mobile Application Club
                  </div>
                </div>
                <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(6, 182, 212, 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #06b6d4' }}>
                  📱
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center', textAlign: 'left', marginBottom: '1.5rem', position: 'relative', zIndex: 2 }}>
                <div style={{ width: '68px', height: '68px', borderRadius: '16px', background: 'linear-gradient(135deg, #0284c7, #8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem', fontWeight: 800, color: '#ffffff', border: '2px solid rgba(255, 255, 255, 0.2)' }}>
                  {submittedCard.fullName.charAt(0).toUpperCase()}
                </div>
                <div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffffff' }}>{submittedCard.fullName}</div>
                  <div style={{ fontSize: '0.85rem', color: '#38bdf8', fontFamily: 'var(--font-mono)' }}>{submittedCard.rollNumber} • {submittedCard.year}</div>
                  <div style={{ fontSize: '0.78rem', color: '#cbd5e1' }}>{submittedCard.department}</div>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px dashed rgba(255, 255, 255, 0.2)', paddingTop: '1rem', position: 'relative', zIndex: 2 }}>
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontSize: '0.65rem', color: '#94a3b8', textTransform: 'uppercase' }}>Focus Vertical</div>
                  <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#f8fafc' }}>{submittedCard.domain.split(' ')[0]} {submittedCard.domain.split(' ')[1]}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '0.65rem', color: '#94a3b8', textTransform: 'uppercase' }}>Member ID</div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#38bdf8', fontFamily: 'var(--font-mono)' }}>{submittedCard.memberId}</div>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
              <button
                onClick={() => {
                  soundFX.playClick();
                  alert(`Member Pass for ${submittedCard.fullName} (${submittedCard.memberId}) ready for orientation!`);
                }}
                className="btn-primary-glow"
                style={{ flex: 1, justifyContent: 'center', padding: '0.85rem' }}
              >
                Save Member Card
              </button>
              <button
                onClick={() => {
                  soundFX.playClick();
                  setSubmittedCard(null);
                }}
                className="btn-secondary-glass"
                style={{ padding: '0.85rem 1.5rem' }}
              >
                New Form
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
