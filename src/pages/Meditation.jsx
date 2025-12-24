import { useState, useEffect, useRef } from 'react';
import { Clock, Play, Pause, Volume2, VolumeX, Bell } from 'lucide-react';
import Card from '../components/Card';
import { useApp } from '../context/AppContext';
import { useTranslation } from '../utils/translations';

const Meditation = () => {
  const { theme, language } = useApp();
  const t = useTranslation(language);
  const [selectedSession, setSelectedSession] = useState(null);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [alarmEnabled, setAlarmEnabled] = useState(true);
  const audioRef = useRef(null);
  const alarmRef = useRef(null);

  const sessions = [
    {
      id: 1,
      title: 'Quick Calm',
      duration: 300,
      description: '5-minute guided meditation for instant relaxation',
      color: '#6366f1',
      audioFile: '/audio/QuickCalm.mp3'
    },
    {
      id: 2,
      title: 'Deep Peace',
      duration: 600,
      description: '10-minute session for deeper meditation practice',
      color: '#8b5cf6',
      audioFile: '/audio/DeepPeace.mp3'
    },
    {
      id: 3,
      title: 'Full Restoration',
      duration: 900,
      description: '15-minute comprehensive meditation journey',
      color: '#ec4899',
      audioFile: '/audio/Restoration.mp3'
    },
    {
      id: 4,
      title: 'Extended Tranquility',
      duration: 1200,
      description: '20-minute immersive meditation experience',
      color: '#10b981',
      audioFile: '/audio/Tranquility.mp3'
    }
  ];

  const guidanceMessages = {
    start: t('CloseEyes'),
    early: 'Notice your thoughts without judgment. Let them drift away like clouds.',
    mid: 'Feel the peace within you. You are calm, safe, and present.',
    late: 'Slowly bring your awareness back. Notice how you feel. Take your time.',
    complete: 'Your meditation is complete. Take a moment to appreciate this time you gave yourself.'
  };

  useEffect(() => {
    let interval = null;

    if (isActive && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining((time) => {
          if (time <= 1) {
            handleSessionComplete();
            return 0;
          }
          
          // Voice guidance at specific intervals
          if (voiceEnabled) {
            speakGuidance(time);
          }
          
          return time - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, timeRemaining, voiceEnabled]);

  const speakGuidance = (time) => {
    if (!('speechSynthesis' in window)) return;
    
    const totalDuration = selectedSession.duration;
    let message = '';
    
    if (time === totalDuration - 5) {
      message = guidanceMessages.start;
    } else if (time === Math.floor(totalDuration * 0.75)) {
      message = guidanceMessages.early;
    } else if (time === Math.floor(totalDuration * 0.5)) {
      message = guidanceMessages.mid;
    } else if (time === Math.floor(totalDuration * 0.2)) {
      message = guidanceMessages.late;
    }
    
    if (message) {
      const utterance = new SpeechSynthesisUtterance(message);
      utterance.rate = 0.8;
      utterance.pitch = 1;
      utterance.volume = 0.8;
      
      // Set language based on current app language
      if (language === 'fr') {
        utterance.lang = 'fr-FR';
      } else if (language === 'rw') {
        utterance.lang = 'rw-RW';
      } else {
        utterance.lang = 'en-US';
      }
      
      window.speechSynthesis.speak(utterance);
    }
  };

  const playAlarm = () => {
    if (alarmEnabled && alarmRef.current) {
      alarmRef.current.play().catch(e => console.log('Alarm play failed:', e));
    }
    
    // Also use browser notification if available
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification('Meditation Complete', {
        body: 'Your meditation session has ended. Well done!',
        icon: '/icon.png'
      });
    }
  };

  const handleSessionComplete = () => {
    setIsActive(false);
    playAlarm();
    
    if (voiceEnabled && 'speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(guidanceMessages.complete);
      utterance.rate = 0.8;
      window.speechSynthesis.speak(utterance);
    }
    
    // Stop background music if playing
    if (audioRef.current) {
      audioRef.current.pause();
    }
  };

  const startSession = (session) => {
    setSelectedSession(session);
    setTimeRemaining(session.duration);
    setIsActive(true);
    
    // Request notification permission
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
    
    // Play background music for longer sessions
    if (session.id >= 2 && audioRef.current) {
      audioRef.current.play().catch(e => console.log('Audio play failed:', e));
    }
  };

  const togglePause = () => {
    setIsActive(!isActive);
    
    if (audioRef.current) {
      if (isActive) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(e => console.log('Audio play failed:', e));
      }
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getProgress = () => {
    if (!selectedSession) return 0;
    return ((selectedSession.duration - timeRemaining) / selectedSession.duration) * 100;
  };

  const getCurrentGuidance = () => {
    if (!isActive || !selectedSession) return guidanceMessages.start;
    
    const progress = getProgress();
    if (progress < 10) return guidanceMessages.start;
    if (progress < 40) return guidanceMessages.early;
    if (progress < 70) return guidanceMessages.mid;
    if (progress < 95) return guidanceMessages.late;
    return guidanceMessages.complete;
  };

  return (
    <div className="page-container fade-in">
      <div className="container">
        <h1 className="page-title">{t('meditationTitle')}</h1>
        <p className="page-subtitle">{t('meditationSubtitle')}</p>

        {/* Hidden audio elements */}
        <audio ref={audioRef} loop>
          <source src="/audio/MeditationTone.mp3" type="audio/mpeg" />
        </audio>
        <audio ref={alarmRef}>
          <source src="/audio/Restoration.mp3" type="audio/mpeg" />
        </audio>

        {!selectedSession ? (
          <div className="grid grid-2">
            {sessions.map((session) => (
              <Card key={session.id} style={{
                ...styles.sessionCard,
                backgroundColor: theme === 'dark' ? '#1e293b' : '#ffffff',
                borderColor: theme === 'dark' ? '#334155' : '#e2e8f0'
              }}>
                <div style={{...styles.sessionHeader, backgroundColor: `${session.color}15`}}>
                  <Clock size={32} style={{color: session.color}} />
                </div>
                <h3 style={{
                  ...styles.sessionTitle,
                  color: theme === 'dark' ? '#f1f5f9' : '#1e293b'
                }}>
                  {session.title}
                </h3>
                <p style={{
                  ...styles.sessionDescription,
                  color: theme === 'dark' ? '#cbd5e1' : '#64748b'
                }}>
                  {session.description}
                </p>
                <div style={{
                  ...styles.sessionDuration,
                  color: theme === 'dark' ? '#cbd5e1' : '#64748b'
                }}>
                  <Clock size={16} />
                  <span>{session.duration / 60} {t('minutes')}</span>
                </div>
                {session.id >= 2 && (
                  <div style={styles.musicalNote}>
                    🎵 Includes calming instrumental music
                  </div>
                )}
                <button
                  onClick={() => startSession(session)}
                  style={{
                    ...styles.startButton,
                    backgroundColor: session.color
                  }}
                >
                  <Play size={20} />
                  {t('startSession')}
                </button>
              </Card>
            ))}
          </div>
        ) : (
          <Card style={{
            ...styles.activeSessionCard,
            backgroundColor: theme === 'dark' ? '#1e293b' : '#ffffff'
          }}>
            <div style={styles.activeSessionContent}>
              <h2 style={{
                ...styles.activeTitle,
                color: theme === 'dark' ? '#f1f5f9' : '#1e293b'
              }}>
                {selectedSession.title}
              </h2>
              
              {/* Settings */}
              <div style={styles.settingsRow}>
                <label style={{
                  ...styles.settingLabel,
                  color: theme === 'dark' ? '#cbd5e1' : '#64748b'
                }}>
                  <input
                    type="checkbox"
                    checked={voiceEnabled}
                    onChange={(e) => setVoiceEnabled(e.target.checked)}
                    style={styles.checkbox}
                  />
                  <Volume2 size={18} />
                  <span>Voice Guidance</span>
                </label>
                
                <label style={{
                  ...styles.settingLabel,
                  color: theme === 'dark' ? '#cbd5e1' : '#64748b'
                }}>
                  <input
                    type="checkbox"
                    checked={alarmEnabled}
                    onChange={(e) => setAlarmEnabled(e.target.checked)}
                    style={styles.checkbox}
                  />
                  <Bell size={18} />
                  <span>Completion Alarm</span>
                </label>
              </div>
              
              <div style={styles.timerContainer}>
                <div style={styles.timerCircle}>
                  <svg style={styles.progressRing} width="200" height="200">
                    <circle
                      style={{
                        ...styles.progressRingBackground,
                        stroke: theme === 'dark' ? '#334155' : '#e2e8f0'
                      }}
                      cx="100"
                      cy="100"
                      r="90"
                    />
                    <circle
                      style={{
                        ...styles.progressRingProgress,
                        strokeDasharray: `${2 * Math.PI * 90}`,
                        strokeDashoffset: `${2 * Math.PI * 90 * (1 - getProgress() / 100)}`,
                        stroke: selectedSession.color
                      }}
                      cx="100"
                      cy="100"
                      r="90"
                    />
                  </svg>
                  <div style={styles.timerText}>
                    <span style={{
                      ...styles.timeDisplay,
                      color: theme === 'dark' ? '#f1f5f9' : '#1e293b'
                    }}>
                      {formatTime(timeRemaining)}
                    </span>
                  </div>
                </div>
              </div>

              <div style={{
                ...styles.meditationGuide,
                background: theme === 'dark'
                  ? 'linear-gradient(135deg, #6366f115 0%, #8b5cf615 100%)'
                  : 'linear-gradient(135deg, #6366f108 0%, #8b5cf608 100%)'
              }}>
                <p style={{
                  ...styles.guideText,
                  color: theme === 'dark' ? '#cbd5e1' : '#475569'
                }}>
                  {isActive ? getCurrentGuidance() : "Session paused. Resume when you're ready."}
                </p>
              </div>

              <div style={styles.controls}>
                <button
                  onClick={togglePause}
                  style={{
                    ...styles.controlButton,
                    backgroundColor: theme === 'dark' ? '#6366f1' : '#6366f1'
                  }}
                >
                  {isActive ? (
                    <>
                      <Pause size={24} />
                      {t('pause')}
                    </>
                  ) : (
                    <>
                      <Play size={24} />
                      {t('resume')}
                    </>
                  )}
                </button>
                
                <button
                  onClick={() => {
                    setSelectedSession(null);
                    setIsActive(false);
                    setTimeRemaining(0);
                    if (audioRef.current) audioRef.current.pause();
                  }}
                  style={{
                    ...styles.endButton,
                    backgroundColor: theme === 'dark' ? '#334155' : '#f1f5f9',
                    color: theme === 'dark' ? '#cbd5e1' : '#64748b'
                  }}
                >
                  {t('endSession')}
                </button>
              </div>
            </div>
          </Card>
        )}

        <div style={styles.benefitsSection}>
          <h2 style={{
            ...styles.benefitsTitle,
            color: theme === 'dark' ? '#f1f5f9' : '#1e293b'
          }}>
            {t('benefitsTitle')}
          </h2>
          <div className="grid grid-3">
            {[
              { title: 'Reduces Stress', desc: 'Lower cortisol levels and improved stress management' },
              { title: 'Improves Focus', desc: 'Enhanced concentration and mental clarity' },
              { title: 'Better Sleep', desc: 'Deeper, more restful sleep patterns' },
              { title: 'Emotional Balance', desc: 'Greater emotional awareness and stability' },
              { title: 'Reduced Anxiety', desc: 'Decreased worry and anxious thoughts' },
              { title: 'Increased Mindfulness', desc: 'Greater present-moment awareness' }
            ].map((benefit, idx) => (
              <Card key={idx} style={{
                ...styles.benefitCard,
                backgroundColor: theme === 'dark' ? '#1e293b' : '#ffffff'
              }}>
                <h4 style={{
                  ...styles.benefitTitle,
                  color: theme === 'dark' ? '#f1f5f9' : '#1e293b'
                }}>
                  {benefit.title}
                </h4>
                <p style={{
                  ...styles.benefitDesc,
                  color: theme === 'dark' ? '#94a3b8' : '#64748b'
                }}>
                  {benefit.desc}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  sessionCard: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%'
  },
  sessionHeader: {
    width: '64px',
    height: '64px',
    borderRadius: '1rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '1.5rem'
  },
  sessionTitle: {
    fontSize: '1.5rem',
    fontWeight: '700',
    marginBottom: '0.75rem'
  },
  sessionDescription: {
    fontSize: '0.95rem',
    marginBottom: '1.5rem',
    flex: 1
  },
  sessionDuration: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontSize: '0.875rem',
    marginBottom: '1rem'
  },
  musicalNote: {
    fontSize: '0.875rem',
    color: '#8b5cf6',
    marginBottom: '1rem',
    fontStyle: 'italic'
  },
  startButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    padding: '0.875rem',
    border: 'none',
    borderRadius: '0.75rem',
    color: '#ffffff',
    fontWeight: '600',
    fontSize: '1rem',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  },
  activeSessionCard: {
    padding: '3rem 2rem',
    marginBottom: '3rem'
  },
  activeSessionContent: {
    textAlign: 'center'
  },
  activeTitle: {
    fontSize: '2rem',
    fontWeight: '700',
    marginBottom: '1.5rem'
  },
  settingsRow: {
    display: 'flex',
    gap: '2rem',
    justifyContent: 'center',
    marginBottom: '2rem',
    flexWrap: 'wrap'
  },
  settingLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontSize: '0.95rem',
    cursor: 'pointer'
  },
  checkbox: {
    width: '18px',
    height: '18px',
    cursor: 'pointer'
  },
  timerContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '2rem'
  },
  timerCircle: {
    position: 'relative',
    width: '200px',
    height: '200px'
  },
  progressRing: {
    transform: 'rotate(-90deg)'
  },
  progressRingBackground: {
    fill: 'none',
    strokeWidth: '8'
  },
  progressRingProgress: {
    fill: 'none',
    strokeWidth: '8',
    strokeLinecap: 'round',
    transition: 'stroke-dashoffset 0.3s ease'
  },
  timerText: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  timeDisplay: {
    fontSize: '2.5rem',
    fontWeight: '700'
  },
  meditationGuide: {
    maxWidth: '600px',
    margin: '0 auto 2rem',
    padding: '2rem',
    borderRadius: '1rem'
  },
  guideText: {
    fontSize: '1.125rem',
    lineHeight: '1.8',
    fontStyle: 'italic',
    margin: 0
  },
  controls: {
    display: 'flex',
    justifyContent: 'center',
    gap: '1rem',
    flexWrap: 'wrap'
  },
  controlButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.875rem 2rem',
    color: '#ffffff',
    border: 'none',
    borderRadius: '0.75rem',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  },
  endButton: {
    padding: '0.875rem 2rem',
    border: 'none',
    borderRadius: '0.75rem',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  },
  benefitsSection: {
    marginTop: '4rem'
  },
  benefitsTitle: {
    fontSize: '2rem',
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: '2rem'
  },
  benefitCard: {
    textAlign: 'center'
  },
  benefitTitle: {
    fontSize: '1.125rem',
    fontWeight: '700',
    marginBottom: '0.5rem'
  },
  benefitDesc: {
    fontSize: '0.875rem',
    margin: 0
  }
};

export default Meditation;