import { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX, Cloud, Waves, Wind, Moon, Flame, Droplets, Music, Bird, TreePine, Coffee, Zap } from 'lucide-react';
import Card from '../components/Card';
import { useApp } from '../context/AppContext';
import { useTranslation } from '../utils/translations';


const Sounds = () => {
  const { theme, language } = useApp();
  const t = useTranslation(language);
  const [playingSound, setPlayingSound] = useState(null);
  const [volume, setVolume] = useState(70);
  const audioRefs = useRef({});

  const sounds = [
    {
      id: 'rain',
      name: 'Gentle Rain',
      icon: Cloud,
      color: '#6366f1',
      description: 'Soft rainfall to ease your mind',
      audioFile: '/audio/sounds/rain.mp3' // Replace with your file
    },
    {
      id: 'ocean',
      name: 'Ocean Waves',
      icon: Waves,
      color: '#0891b2',
      description: 'Rhythmic waves washing ashore',
      audioFile: '/audio/sounds/ocean.mp3'
    },
    {
      id: 'wind',
      name: 'Forest Wind',
      icon: Wind,
      color: '#10b981',
      description: 'Gentle breeze through the trees',
      audioFile: '/audio/sounds/wind.mp3'
    },
    {
      id: 'night',
      name: 'Night Ambience',
      icon: Moon,
      color: '#8b5cf6',
      description: 'Peaceful nighttime sounds',
      audioFile: '/audio/sounds/night.mp3'
    },
    {
      id: 'fire',
      name: 'Crackling Fire',
      icon: Flame,
      color: '#f59e0b',
      description: 'Warm fireplace crackling',
      audioFile: '/audio/sounds/fire.mp3'
    },
    {
      id: 'stream',
      name: 'Flowing Stream',
      icon: Droplets,
      color: '#06b6d4',
      description: 'Babbling brook water flow',
      audioFile: '/audio/sounds/stream.mp3'
    },
    {
      id: 'meditation',
      name: 'Meditation Tones',
      icon: Music,
      color: '#ec4899',
      description: 'Calming meditation music',
      audioFile: '/audio/sounds/meditation.mp3'
    },
    {
      id: 'birds',
      name: 'Morning Birds',
      icon: Bird,
      color: '#84cc16',
      description: 'Peaceful birdsong at dawn',
      audioFile: '/audio/sounds/birds.mp3'
    },
    {
      id: 'forest',
      name: 'Deep Forest',
      icon: TreePine,
      color: '#059669',
      description: 'Immersive forest atmosphere',
      audioFile: '/audio/sounds/forest.mp3'
    },
    {
      id: 'cafe',
      name: 'Coffee Shop',
      icon: Coffee,
      color: '#92400e',
      description: 'Cozy cafe background noise',
      audioFile: '/audio/sounds/cafe.mp3'
    },
    {
      id: 'thunder',
      name: 'Distant Thunder',
      icon: Zap,
      color: '#7c3aed',
      description: 'Gentle rolling thunder',
      audioFile: '/audio/Thunder.mp3'
    },
    {
      id: 'whitenoise',
      name: 'White Noise',
      icon: Wind,
      color: '#64748b',
      description: 'Pure white noise for focus',
      audioFile: '/audio/sounds/whitenoise.mp3'
    }
  ];

  useEffect(() => {
    // Update volume for all audio elements
    Object.values(audioRefs.current).forEach(audio => {
      if (audio) {
        audio.volume = volume / 100;
      }
    });
  }, [volume]);

  useEffect(() => {
    // Cleanup on unmount
    return () => {
      Object.values(audioRefs.current).forEach(audio => {
        if (audio) {
          audio.pause();
          audio.currentTime = 0;
        }
      });
    };
  }, []);

  const toggleSound = (soundId) => {
    const audio = audioRefs.current[soundId];

    if (playingSound === soundId) {
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
      setPlayingSound(null);
    } else {
      // Stop currently playing sound
      if (playingSound && audioRefs.current[playingSound]) {
        audioRefs.current[playingSound].pause();
        audioRefs.current[playingSound].currentTime = 0;
      }

      // Play new sound
      if (audio) {
        audio.volume = volume / 100;
        audio.loop = true;
        audio.play().catch(e => console.log('Audio play failed:', e));
      }
      setPlayingSound(soundId);
    }
  };

  const stopAll = () => {
    Object.values(audioRefs.current).forEach(audio => {
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
    });
    setPlayingSound(null);
  };

  return (
    <div className="page-container fade-in">
      <div className="container">
        <h1 className="page-title">{t('soundsTitle')}</h1>
        <p className="page-subtitle">{t('soundsSubtitle')}</p>

        {/* Hidden audio elements */}
        {sounds.map(sound => (
          <audio
            key={sound.id}
            ref={el => audioRefs.current[sound.id] = el}
            src={sound.audioFile}
          />
        ))}

        {/* Volume Control */}
        <Card style={{
          ...styles.volumeCard,
          backgroundColor: theme === 'dark' ? '#1e293b' : '#ffffff',
          background: theme === 'dark'
            ? 'linear-gradient(135deg, #6366f115 0%, #8b5cf615 100%)'
            : 'linear-gradient(135deg, #6366f108 0%, #8b5cf608 100%)'
        }}>
          <div style={styles.volumeContainer}>
            <div style={styles.volumeHeader}>
              <Volume2 size={24} style={{ color: '#6366f1' }} />
              <h3 style={{
                ...styles.volumeTitle,
                color: theme === 'dark' ? '#f1f5f9' : '#1e293b'
              }}>
                {t('volumeControl')}
              </h3>
            </div>
            <div style={styles.volumeControl}>
              <VolumeX size={20} style={{ color: theme === 'dark' ? '#94a3b8' : '#94a3b8' }} />
              <input
                type="range"
                min="0"
                max="100"
                value={volume}
                onChange={(e) => setVolume(e.target.value)}
                style={styles.slider}
              />
              <Volume2 size={20} style={{ color: theme === 'dark' ? '#94a3b8' : '#94a3b8' }} />
              <span style={{
                ...styles.volumeValue,
                color: theme === 'dark' ? '#cbd5e1' : '#475569'
              }}>
                {volume}%
              </span>
            </div>
            {playingSound && (
              <button onClick={stopAll} style={styles.stopAllButton}>
                <VolumeX size={18} />
                {t('stopAll')}
              </button>
            )}
          </div>
        </Card>

        {/* Sound Grid */}
        <div className="grid grid-3">
          {sounds.map((sound) => {
            const Icon = sound.icon;
            const isPlaying = playingSound === sound.id;

            return (
              <Card
                key={sound.id}
                style={{
                  ...styles.soundCard,
                  backgroundColor: theme === 'dark' ? '#1e293b' : '#ffffff',
                  borderColor: isPlaying
                    ? sound.color
                    : (theme === 'dark' ? '#334155' : '#e2e8f0'),
                  background: isPlaying
                    ? `linear-gradient(135deg, ${sound.color}08 0%, ${sound.color}15 100%)`
                    : (theme === 'dark' ? '#1e293b' : '#ffffff')
                }}
                onClick={() => toggleSound(sound.id)}
              >
                <div style={{
                  ...styles.iconContainer,
                  backgroundColor: `${sound.color}15`
                }}>
                  <Icon size={32} style={{ color: sound.color }} />
                </div>

                <h3 style={{
                  ...styles.soundName,
                  color: theme === 'dark' ? '#f1f5f9' : '#1e293b'
                }}>
                  {sound.name}
                </h3>
                <p style={{
                  ...styles.soundDescription,
                  color: theme === 'dark' ? '#94a3b8' : '#64748b'
                }}>
                  {sound.description}
                </p>

                {isPlaying && (
                  <div style={styles.playingIndicator}>
                    <div style={styles.waveContainer}>
                      {[0, 1, 2, 3].map((i) => (
                        <div
                          key={i}
                          style={{
                            ...styles.wave,
                            backgroundColor: sound.color,
                            animationDelay: `${i * 0.1}s`
                          }}
                        />
                      ))}
                    </div>
                    <span style={{ color: sound.color, fontWeight: '600', fontSize: '0.875rem' }}>
                      {t('nowPlaying')}
                    </span>
                  </div>
                )}

                <div style={{
                  ...styles.playButton,
                  backgroundColor: theme === 'dark' ? '#0f172a' : '#f8fafc',
                  color: theme === 'dark' ? '#cbd5e1' : '#475569'
                }}>
                  {isPlaying ? (
                    <VolumeX size={20} />
                  ) : (
                    <Volume2 size={20} />
                  )}
                  <span>{isPlaying ? t('stop') : t('Play')}</span>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Benefits Section */}
        <div style={styles.benefitsSection}>
          <h2 style={{
            ...styles.benefitsTitle,
            color: theme === 'dark' ? '#cbd5e1' : '#64748b'
          }}>
            Benefits of Sound Therapy</h2>
          <div className="grid grid-2">
            <Card style={{
              ...styles.benefitCard,
              backgroundColor: theme === 'dark' ? '#1e293b' : '#ffffff',
              borderColor: theme === 'dark' ? '#334155' : '#e2e8f0'
            }}>
              <h4 style={{
                ...styles.benefitTitle,
                color: theme === 'dark' ? '#cbd5e1' : '#64748b'
              }}>
                🧘 Reduces Stress</h4>
              <p style={styles.benefitText}>
                Natural sounds can lower cortisol levels and promote relaxation throughout your body.
              </p>
            </Card>
            <Card style={{
              ...
              styles.benefitCard,
              backgroundColor: theme === 'dark' ? '#1e293b' : '#ffffff',
              borderColor: theme === 'dark' ? '#334155' : '#e2e8f0'
            }}>
              <h4 style={{
                ...styles.benefitTitle,
                color: theme === 'dark' ? '#cbd5e1' : '#64748b'
              }}>
                😴 Improves Sleep</h4>
              <p style={styles.benefitText}>
                Ambient sounds mask disruptive noises and create a peaceful sleep environment.
              </p>
            </Card>
            <Card style={{
              ...
              styles.benefitCard,
              backgroundColor: theme === 'dark' ? '#1e293b' : '#ffffff',
              borderColor: theme === 'dark' ? '#334155' : '#e2e8f0'
            }}>
              <h4 style={{
                ...styles.benefitTitle,
                color: theme === 'dark' ? '#cbd5e1' : '#64748b'
              }}>
                🎯 Enhances Focus</h4>
              <p style={styles.benefitText}>
                Background sounds can help you concentrate by creating a consistent audio environment.
              </p>
            </Card>
            <Card style={{
              ...styles.benefitCard,
              backgroundColor: theme === 'dark' ? '#1e293b' : '#ffffff',
              borderColor: theme === 'dark' ? '#334155' : '#e2e8f0'
            }}>
              <h4 style={{
                ...styles.benefitTitle,
                color: theme === 'dark' ? '#cbd5e1' : '#64748b'
              }}>
                💆 Calms Anxiety</h4>
              <p style={styles.benefitText}>
                Soothing sounds trigger your body's natural relaxation response, easing anxious feelings.
              </p>
            </Card>
          </div>
        </div>

        {/* Tips */}
        <Card style={styles.tipsCard}>
          <h3 style={{
            ...styles.tipsTitle,
            color: theme === 'dark' ? '#cbd5e1' : '#64748b'
          }}>
            Tips for Best Experience</h3>
          <ul style={styles.tipsList}>
            <li style={styles.tipItem}>Use headphones for immersive experience</li>
            <li style={styles.tipItem}>Adjust volume to a comfortable, not overwhelming level</li>
            <li style={styles.tipItem}>Combine sounds with breathing exercises or meditation</li>
            <li style={styles.tipItem}>Use during work, study, or before sleep</li>
            <li style={styles.tipItem}>Create a quiet space free from other distractions</li>
          </ul>
        </Card>
      </div>
    </div>
  );
};

const styles = {
  volumeCard: {
    marginBottom: '2rem',
    background: 'linear-gradient(135deg, #6366f108 0%, #8b5cf608 100%)'
  },
  volumeContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem'
  },
  volumeHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem'
  },
  volumeTitle: {
    fontSize: '1.25rem',
    fontWeight: '700',
    color: '#1e293b',
    margin: 0
  },
  volumeControl: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem'
  },
  slider: {
    flex: 1,
    height: '6px',
    borderRadius: '3px',
    outline: 'none',
    background: '#e2e8f0',
    cursor: 'pointer'
  },
  volumeValue: {
    minWidth: '50px',
    textAlign: 'right',
    fontWeight: '600',
    color: '#475569',
    fontSize: '0.95rem'
  },
  stopAllButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.75rem 1.5rem',
    background: '#ef4444',
    color: '#ffffff',
    border: 'none',
    borderRadius: '0.75rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    alignSelf: 'flex-start'
  },
  soundCard: {
    cursor: 'pointer',
    textAlign: 'center',
    transition: 'all 0.3s ease',
    border: '2px solid #e2e8f0',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  iconContainer: {
    width: '72px',
    height: '72px',
    borderRadius: '1rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '1rem'
  },
  soundName: {
    fontSize: '1.125rem',
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: '0.5rem'
  },
  soundDescription: {
    fontSize: '0.875rem',
    color: '#64748b',
    marginBottom: '1rem'
  },
  playingIndicator: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '0.5rem',
    marginBottom: '1rem'
  },
  waveContainer: {
    display: 'flex',
    gap: '4px',
    height: '24px',
    alignItems: 'flex-end'
  },
  wave: {
    width: '4px',
    borderRadius: '2px',
    animation: 'wave 1s ease-in-out infinite'
  },
  playButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.5rem 1rem',
    background: '#f8fafc',
    borderRadius: '0.5rem',
    fontWeight: '600',
    fontSize: '0.875rem',
    color: '#475569',
    marginTop: 'auto'
  },
  benefitsSection: {
    marginTop: '4rem',
    marginBottom: '2rem'
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
    fontSize: '1.25rem',
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: '0.75rem'
  },
  benefitText: {
    fontSize: '0.95rem',
    color: '#64748b',
    lineHeight: '1.6',
    margin: 0
  },
  tipsCard: {
    marginTop: '2rem',
    background: 'linear-gradient(135deg, #10b98108 0%, #06b6d408 100%)'
  },
  tipsTitle: {
    fontSize: '1.25rem',
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: '1rem'
  },
  tipsList: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem'
  },
  tipItem: {
    paddingLeft: '1.5rem',
    position: 'relative',
    color: '#475569',
    fontSize: '0.95rem',
    lineHeight: '1.6'
  }
};

export default Sounds;