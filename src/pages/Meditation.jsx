import { useState, useEffect } from 'react';
import { Clock, Play, Pause } from 'lucide-react';
import Card from '../components/Card';

const Meditation = () => {
  const [selectedSession, setSelectedSession] = useState(null);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [isActive, setIsActive] = useState(false);

  const sessions = [
    {
      id: 1,
      title: 'Quick Calm',
      duration: 300,
      description: '5-minute guided meditation for instant relaxation',
      color: '#6366f1'
    },
    {
      id: 2,
      title: 'Deep Peace',
      duration: 600,
      description: '10-minute session for deeper meditation practice',
      color: '#8b5cf6'
    },
    {
      id: 3,
      title: 'Full Restoration',
      duration: 900,
      description: '15-minute comprehensive meditation journey',
      color: '#ec4899'
    },
    {
      id: 4,
      title: 'Extended Tranquility',
      duration: 1200,
      description: '20-minute immersive meditation experience',
      color: '#10b981'
    }
  ];

  useEffect(() => {
    let interval = null;

    if (isActive && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining((time) => {
          if (time <= 1) {
            setIsActive(false);
            return 0;
          }
          return time - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, timeRemaining]);

  const startSession = (session) => {
    setSelectedSession(session);
    setTimeRemaining(session.duration);
    setIsActive(true);
  };

  const togglePause = () => {
    setIsActive(!isActive);
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

  return (
    <div className="page-container fade-in">
      <div className="container">
        <h1 className="page-title">Guided Meditation</h1>
        <p className="page-subtitle">
          Find your center. Let go of what weighs you down.
        </p>

        {!selectedSession ? (
          <div className="grid grid-2">
            {sessions.map((session) => (
              <Card key={session.id} style={styles.sessionCard}>
                <div style={{...styles.sessionHeader, backgroundColor: `${session.color}15`}}>
                  <Clock size={32} style={{color: session.color}} />
                </div>
                <h3 style={styles.sessionTitle}>{session.title}</h3>
                <p style={styles.sessionDescription}>{session.description}</p>
                <div style={styles.sessionDuration}>
                  <Clock size={16} style={{color: '#64748b'}} />
                  <span>{session.duration / 60} minutes</span>
                </div>
                <button
                  onClick={() => startSession(session)}
                  style={{
                    ...styles.startButton,
                    backgroundColor: session.color
                  }}
                >
                  <Play size={20} />
                  Start Session
                </button>
              </Card>
            ))}
          </div>
        ) : (
          <Card style={styles.activeSessionCard}>
            <div style={styles.activeSessionContent}>
              <h2 style={styles.activeTitle}>{selectedSession.title}</h2>
              
              <div style={styles.timerContainer}>
                <div style={styles.timerCircle}>
                  <svg style={styles.progressRing} width="200" height="200">
                    <circle
                      style={styles.progressRingBackground}
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
                    <span style={styles.timeDisplay}>{formatTime(timeRemaining)}</span>
                  </div>
                </div>
              </div>

              <div style={styles.meditationGuide}>
                <p style={styles.guideText}>
                  {isActive ? (
                    timeRemaining > selectedSession.duration * 0.8 ? (
                      "Close your eyes. Take a deep breath. Feel your body relax."
                    ) : timeRemaining > selectedSession.duration * 0.5 ? (
                      "Notice your thoughts without judgment. Let them drift away like clouds."
                    ) : timeRemaining > selectedSession.duration * 0.2 ? (
                      "Feel the peace within you. You are calm, safe, and present."
                    ) : (
                      "Slowly bring your awareness back. Notice how you feel. Take your time."
                    )
                  ) : (
                    "Session paused. Resume when you're ready."
                  )}
                </p>
              </div>

              <div style={styles.controls}>
                <button
                  onClick={togglePause}
                  style={styles.controlButton}
                >
                  {isActive ? (
                    <>
                      <Pause size={24} />
                      Pause
                    </>
                  ) : (
                    <>
                      <Play size={24} />
                      Resume
                    </>
                  )}
                </button>
                
                <button
                  onClick={() => {
                    setSelectedSession(null);
                    setIsActive(false);
                    setTimeRemaining(0);
                  }}
                  style={styles.endButton}
                >
                  End Session
                </button>
              </div>
            </div>
          </Card>
        )}

        <div style={styles.benefitsSection}>
          <h2 style={styles.benefitsTitle}>Benefits of Regular Meditation</h2>
          <div className="grid grid-3">
            {[
              { title: 'Reduces Stress', desc: 'Lower cortisol levels and improved stress management' },
              { title: 'Improves Focus', desc: 'Enhanced concentration and mental clarity' },
              { title: 'Better Sleep', desc: 'Deeper, more restful sleep patterns' },
              { title: 'Emotional Balance', desc: 'Greater emotional awareness and stability' },
              { title: 'Reduced Anxiety', desc: 'Decreased worry and anxious thoughts' },
              { title: 'Increased Mindfulness', desc: 'Greater present-moment awareness' }
            ].map((benefit, idx) => (
              <Card key={idx} style={styles.benefitCard}>
                <h4 style={styles.benefitTitle}>{benefit.title}</h4>
                <p style={styles.benefitDesc}>{benefit.desc}</p>
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
    color: '#1e293b',
    marginBottom: '0.75rem'
  },
  sessionDescription: {
    fontSize: '0.95rem',
    color: '#64748b',
    marginBottom: '1.5rem',
    flex: 1
  },
  sessionDuration: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    color: '#64748b',
    fontSize: '0.875rem',
    marginBottom: '1.5rem'
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
    color: '#1e293b',
    marginBottom: '2rem'
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
    stroke: '#e2e8f0',
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
    fontWeight: '700',
    color: '#1e293b'
  },
  meditationGuide: {
    maxWidth: '600px',
    margin: '0 auto 2rem',
    padding: '2rem',
    background: 'linear-gradient(135deg, #6366f108 0%, #8b5cf608 100%)',
    borderRadius: '1rem'
  },
  guideText: {
    fontSize: '1.125rem',
    color: '#475569',
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
    background: '#6366f1',
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
    background: '#f1f5f9',
    color: '#64748b',
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
    color: '#1e293b',
    textAlign: 'center',
    marginBottom: '2rem'
  },
  benefitCard: {
    textAlign: 'center'
  },
  benefitTitle: {
    fontSize: '1.125rem',
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: '0.5rem'
  },
  benefitDesc: {
    fontSize: '0.875rem',
    color: '#64748b',
    margin: 0
  }
};

export default Meditation;