import React, { useState, useEffect } from 'react';
import { soundFX } from '../audio/soundEffects';

export function InteractivePhone() {
  const [activeTab, setActiveTab] = useState('home'); // 'home', 'apps', 'quiz', 'terminal'
  const [time, setTime] = useState('09:41');
  const [quizAnswer, setQuizAnswer] = useState(null);
  const [terminalCommands, setTerminalCommands] = useState([
    'madc@kec-mobile:~$ flutter run --release',
    '✓ Compiling Dart to ARM64 native...',
    '✓ Running on Android 15 & iOS 18',
    '✓ Build succeeded: 0 errors'
  ]);

  useEffect(() => {
    const updateClock = () => {
      const d = new Date();
      const h = String(d.getHours()).padStart(2, '0');
      const m = String(d.getMinutes()).padStart(2, '0');
      setTime(`${h}:${m}`);
    };
    updateClock();
    const interval = setInterval(updateClock, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleTabChange = (tab) => {
    soundFX.playClick();
    setActiveTab(tab);
  };

  const handleQuizOption = (opt) => {
    soundFX.playClick();
    setQuizAnswer(opt);
  };

  return (
    <div className="phone-mockup-wrapper">
      {/* Floating Badges */}
      <div className="floating-badge floating-badge-1">
        <span style={{ fontSize: '1.2rem' }}>⚡</span>
        <div>
          <div style={{ color: '#ffffff', fontSize: '0.78rem' }}>Native Engines</div>
          <div style={{ color: '#06b6d4', fontSize: '0.7rem' }}>Kotlin & Swift</div>
        </div>
      </div>

      <div className="floating-badge floating-badge-2">
        <span style={{ fontSize: '1.2rem' }}>🏆</span>
        <div>
          <div style={{ color: '#ffffff', fontSize: '0.78rem' }}>48+ Production Apps</div>
          <div style={{ color: '#10b981', fontSize: '0.7rem' }}>Built by KEC Students</div>
        </div>
      </div>

      {/* Smartphone Hardware Frame */}
      <div className="smartphone-device">
        {/* Hardware side keys */}
        <div className="phone-volume-up" />
        <div className="phone-volume-down" />
        <div className="phone-power" />

        {/* Dynamic Island */}
        <div className="phone-island">
          <div className="island-sensor" />
          <div style={{ fontSize: '0.6rem', color: '#06b6d4', fontWeight: 700, letterSpacing: '0.04em' }}>MADC LIVE</div>
          <div className="island-camera" />
        </div>

        {/* Phone Status Bar */}
        <div className="phone-status-bar">
          <span>{time}</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontSize: '0.68rem' }}>5G</span>
            {/* Battery icon */}
            <svg width="18" height="10" viewBox="0 0 24 14" fill="currentColor">
              <rect x="1" y="1" width="19" height="12" rx="3" stroke="currentColor" strokeWidth="1.5" fill="none" />
              <rect x="3" y="3" width="12" height="8" rx="1.5" fill="#10b981" />
              <path d="M22 5v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>
        </div>

        {/* Phone Screen Canvas */}
        <div className="phone-screen">
          {/* Internal Top Bar */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', marginTop: '0.4rem' }}>
            <div>
              <div style={{ fontSize: '0.68rem', color: '#94a3b8' }}>Kongu Engineering College</div>
              <div style={{ fontSize: '1rem', fontWeight: 800, color: '#f8fafc' }}>MADC OS 2.6</div>
            </div>
            <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'linear-gradient(135deg, #06b6d4, #8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 800 }}>
              K
            </div>
          </div>

          {/* TAB 1: OVERVIEW */}
          {activeTab === 'home' && (
            <div style={{ display: 'flex', flexDirections: 'column', flexDirection: 'column', gap: '0.85rem' }}>
              <div style={{ padding: '0.85rem', background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.2), rgba(139, 92, 246, 0.2))', border: '1px solid rgba(6, 182, 212, 0.4)', borderRadius: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.3rem' }}>
                  <span style={{ fontSize: '0.7rem', color: '#38bdf8', fontWeight: 700, textTransform: 'uppercase' }}>Upcoming Event</span>
                  <span style={{ fontSize: '0.62rem', background: '#10b981', color: '#000', padding: '1px 6px', borderRadius: '6px', fontWeight: 800 }}>LIVE</span>
                </div>
                <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#ffffff' }}>AppThon 2026</div>
                <div style={{ fontSize: '0.72rem', color: '#cbd5e1', marginTop: '2px' }}>36-Hour Mobile Hackathon @ KEC</div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.65rem' }}>
                <div style={{ padding: '0.75rem', background: 'rgba(15, 23, 42, 0.8)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '14px' }}>
                  <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#06b6d4' }}>48+</div>
                  <div style={{ fontSize: '0.68rem', color: '#94a3b8' }}>Live Apps</div>
                </div>
                <div style={{ padding: '0.75rem', background: 'rgba(15, 23, 42, 0.8)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '14px' }}>
                  <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#a855f7' }}>1,250+</div>
                  <div style={{ fontSize: '0.68rem', color: '#94a3b8' }}>Members</div>
                </div>
              </div>

              <div style={{ padding: '0.85rem', background: 'rgba(15, 23, 42, 0.8)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '14px' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#f8fafc', marginBottom: '0.4rem' }}>Today's Mobile Tip:</div>
                <div style={{ fontSize: '0.7rem', color: '#94a3b8', fontStyle: 'italic' }}>
                  "Use rememberSaveable in Jetpack Compose to survive configuration changes and process death."
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: APPS */}
          {activeTab === 'apps' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase' }}>Installed Student Apps</div>
              
              {[
                { name: 'Kongu Campus Connect', icon: '🏫', rating: '4.9 ★', cat: 'Campus' },
                { name: 'MediQuick SOS', icon: '🚑', rating: '4.9 ★', cat: 'Health' },
                { name: 'SkillSync KEC', icon: '💡', rating: '4.8 ★', cat: 'Network' },
                { name: 'NutriTrack AI', icon: '🥗', rating: '4.7 ★', cat: 'Edge AI' }
              ].map((app, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.65rem', background: 'rgba(15, 23, 42, 0.8)', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
                  <div style={{ fontSize: '1.4rem' }}>{app.icon}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#f8fafc' }}>{app.name}</div>
                    <div style={{ fontSize: '0.65rem', color: '#94a3b8' }}>{app.cat} • {app.rating}</div>
                  </div>
                  <span style={{ fontSize: '0.65rem', color: '#06b6d4', fontWeight: 700 }}>OPEN</span>
                </div>
              ))}
            </div>
          )}

          {/* TAB 3: QUIZ */}
          {activeTab === 'quiz' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div style={{ fontSize: '0.72rem', color: '#38bdf8', fontWeight: 700 }}>DAILY MOBILE DEV CHALLENGE</div>
              <div style={{ fontSize: '0.82rem', fontWeight: 600, color: '#ffffff', lineHeight: 1.4 }}>
                Which keyword in Kotlin declares a read-only (immutable) variable?
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                {['val', 'var', 'const val', 'let'].map((option) => (
                  <button
                    key={option}
                    onClick={() => handleQuizOption(option)}
                    style={{
                      padding: '0.55rem 0.75rem',
                      textAlign: 'left',
                      borderRadius: '10px',
                      fontSize: '0.75rem',
                      fontFamily: 'var(--font-mono)',
                      background: quizAnswer === option 
                        ? (option === 'val' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(244, 63, 94, 0.2)')
                        : 'rgba(15, 23, 42, 0.8)',
                      border: quizAnswer === option 
                        ? (option === 'val' ? '1px solid #10b981' : '1px solid #f43f5e')
                        : '1px solid rgba(255, 255, 255, 0.1)',
                      color: '#ffffff',
                      cursor: 'pointer'
                    }}
                  >
                    {option}
                  </button>
                ))}
              </div>

              {quizAnswer && (
                <div style={{
                  padding: '0.5rem',
                  borderRadius: '8px',
                  fontSize: '0.68rem',
                  background: quizAnswer === 'val' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(244, 63, 94, 0.15)',
                  color: quizAnswer === 'val' ? '#34d399' : '#fb7185'
                }}>
                  {quizAnswer === 'val' 
                    ? '✓ Correct! "val" creates an immutable reference in Kotlin.' 
                    : '✗ Incorrect. "val" is read-only, while "var" is mutable.'}
                </div>
              )}
            </div>
          )}

          {/* TAB 4: TERMINAL */}
          {activeTab === 'terminal' && (
            <div style={{
              flex: 1,
              background: '#040711',
              borderRadius: '12px',
              padding: '0.65rem',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.64rem',
              color: '#38bdf8',
              lineHeight: 1.5,
              border: '1px solid rgba(6, 182, 212, 0.2)'
            }}>
              {terminalCommands.map((cmd, i) => (
                <div key={i} style={{ color: cmd.startsWith('✓') ? '#34d399' : '#94a3b8' }}>
                  {cmd}
                </div>
              ))}
              <div style={{ color: '#06b6d4', marginTop: '0.5rem' }}>
                $ madc deploy --kec-server
                <span className="terminal-cursor" style={{ width: '5px', height: '10px' }}></span>
              </div>
            </div>
          )}

          {/* Internal Bottom Tab Bar */}
          <div style={{
            marginTop: 'auto',
            paddingTop: '0.75rem',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center'
          }}>
            {[
              { id: 'home', label: 'Home', icon: '🏠' },
              { id: 'apps', label: 'Apps', icon: '📱' },
              { id: 'quiz', label: 'Quiz', icon: '💡' },
              { id: 'terminal', label: 'Shell', icon: '⚡' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                style={{
                  background: 'none',
                  border: 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '2px',
                  cursor: 'pointer',
                  color: activeTab === tab.id ? '#06b6d4' : '#64748b',
                  fontSize: '0.65rem',
                  fontWeight: 600
                }}
              >
                <span style={{ fontSize: '1rem' }}>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
