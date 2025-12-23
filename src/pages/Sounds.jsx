import { useState } from 'react';
import { Volume2, VolumeX, Cloud, Waves, Wind, Moon, Flame, Droplets, Music, Bird } from 'lucide-react';
import Card from '../components/Card';

const Sounds = () => {
  const [playingSound, setPlayingSound] = useState(null);
  const [volume, setVolume] = useState(70);

  const sounds = [
    {
      id: 'rain',
      name: 'Gentle Rain',
      icon: Cloud,
      color: '#6366f1',
      description: 'Soft rainfall to ease your mind'
    },
    {
      id: 'ocean',
      name: 'Ocean Waves',
      icon: Waves,
      color: '#0891b2',
      description: 'Rhythmic waves washing ashore'
    },
    {
      id: 'wind',
      name: 'Forest Wind',
      icon: Wind,
      color: '#10b981',
      description: 'Gentle breeze through the trees'
    },
    {
      id: 'night',
      name: 'Night Ambience',
      icon: Moon,
      color: '#8b5cf6',
      description: 'Peaceful nighttime sounds'
    },
    {
      id: 'fire',
      name: 'Crackling Fire',
      icon: Flame,
      color: '#f59e0b',
      description: 'Warm fireplace crackling'
    },
    {
      id: 'stream',
      name: 'Flowing Stream',
      icon: Droplets,
      color: '#06b6d4',
      description: 'Babbling brook water flow'
    },
    {
      id: 'meditation',
      name: 'Meditation Tones',
      icon: Music,
      color: '#ec4899',
      description: 'Calming meditation music'
    },
    {
      id: 'birds',
      name: 'Morning Birds',
      icon: Bird,
      color: '#84cc16',
      description: 'Peaceful birdsong at dawn'
    }
  ];

  const toggleSound = (soundId) => {
    if (playingSound === soundId) {
      setPlayingSound(null);
    } else {
      setPlayingSound(soundId);
    }
  };

  const stopAll = () => {
    setPlayingSound(null);
  };

  return (
    <div className="page-container fade-in">
      <div className="container">
        <h1 className="page-title">Calming Sounds</h1>
        <p className="page-subtitle">
          Let soothing sounds transport you to a place of peace and tranquility.
        </p>

        {/* Volume Control */}
        <Card style={styles.volumeCard}>
          <div style={styles.volumeContainer}>
            <div style={styles.volumeHeader}>
              <Volume2 size={24} style={{color: '#6366f1'}} />
              <h3 style={styles.volumeTitle}>Volume Control</h3>
            </div>
            <div style={styles.volumeControl}>
              <VolumeX size={20} style={{color: '#94a3b8'}} />
              <input
                type="range"
                min="0"
                max="100"
                value={volume}
                onChange={(e) => setVolume(e.target.value)}
                style={styles.slider}
              />
              <Volume2 size={20} style={{color: '#94a3b8'}} />
              <span style={styles.volumeValue}>{volume}%</span>
            </div>
            {playingSound && (
              <button onClick={stopAll} style={styles.stopAllButton}>
                <VolumeX size={18} />
                Stop All Sounds
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
                  ...(isPlaying ? {
                    borderColor: sound.color,
                    background: `linear-gradient(135deg, ${sound.color}08 0%, ${sound.color}15 100%)`
                  } : {})
                }}
                onClick={() => toggleSound(sound.id)}
              >
                <div style={{
                  ...styles.iconContainer,
                  backgroundColor: `${sound.color}15`
                }}>
                  <Icon size={32} style={{color: sound.color}} />
                </div>
                
                <h3 style={styles.soundName}>{sound.name}</h3>
                <p style={styles.soundDescription}>{sound.description}</p>
                
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
                    <span style={{color: sound.color, fontWeight: '600', fontSize: '0.875rem'}}>
                      Now Playing
                    </span>
                  </div>
                )}
                
                <div style={styles.playButton}>
                  {isPlaying ? (
                    <VolumeX size={20} />
                  ) : (
                    <Volume2 size={20} />
                  )}
                  <span>{isPlaying ? 'Stop' : 'Play'}</span>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Benefits Section */}
        <div style={styles.benefitsSection}>
          <h2 style={styles.benefitsTitle}>Benefits of Sound Therapy</h2>
          <div className="grid grid-2">
            <Card style={styles.benefitCard}>
              <h4 style={styles.benefitTitle}>🧘 Reduces Stress</h4>
              <p style={styles.benefitText}>
                Natural sounds can lower cortisol levels and promote relaxation throughout your body.
              </p>
            </Card>
            <Card style={styles.benefitCard}>
              <h4 style={styles.benefitTitle}>😴 Improves Sleep</h4>
              <p style={styles.benefitText}>
                Ambient sounds mask disruptive noises and create a peaceful sleep environment.
              </p>
            </Card>
            <Card style={styles.benefitCard}>
              <h4 style={styles.benefitTitle}>🎯 Enhances Focus</h4>
              <p style={styles.benefitText}>
                Background sounds can help you concentrate by creating a consistent audio environment.
              </p>
            </Card>
            <Card style={styles.benefitCard}>
              <h4 style={styles.benefitTitle}>💆 Calms Anxiety</h4>
              <p style={styles.benefitText}>
                Soothing sounds trigger your body's natural relaxation response, easing anxious feelings.
              </p>
            </Card>
          </div>
        </div>

        {/* Tips */}
        <Card style={styles.tipsCard}>
          <h3 style={styles.tipsTitle}>Tips for Best Experience</h3>
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