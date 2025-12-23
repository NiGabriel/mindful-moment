import { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';
import Card from '../components/Card';

const Breathing = () => {
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState('ready');
  const [technique, setTechnique] = useState('box');

  const techniques = {
    box: {
      name: 'Box Breathing',
      description: 'Equal parts breathing - perfect for focus and calm',
      phases: [
        { name: 'inhale', duration: 4000, text: 'Breathe In' },
        { name: 'hold', duration: 4000, text: 'Hold' },
        { name: 'exhale', duration: 4000, text: 'Breathe Out' },
        { name: 'hold', duration: 4000, text: 'Hold' }
      ]
    },
    calm: {
      name: '4-7-8 Breathing',
      description: 'Deep relaxation technique for stress relief',
      phases: [
        { name: 'inhale', duration: 4000, text: 'Breathe In' },
        { name: 'hold', duration: 7000, text: 'Hold' },
        { name: 'exhale', duration: 8000, text: 'Breathe Out' }
      ]
    },
    energy: {
      name: 'Energizing Breath',
      description: 'Quick breathing to boost alertness',
      phases: [
        { name: 'inhale', duration: 2000, text: 'Quick Inhale' },
        { name: 'exhale', duration: 2000, text: 'Quick Exhale' }
      ]
    }
  };

  useEffect(() => {
    if (!isActive) return;

    const currentTechnique = techniques[technique];
    let phaseIndex = 0;

    const cyclePhases = () => {
      setPhase(currentTechnique.phases[phaseIndex].name);
      phaseIndex = (phaseIndex + 1) % currentTechnique.phases.length;
    };

    cyclePhases();
    const phaseDuration = currentTechnique.phases.reduce((sum, p) => sum + p.duration, 0) / currentTechnique.phases.length;
    const interval = setInterval(cyclePhases, phaseDuration);

    return () => clearInterval(interval);
  }, [isActive, technique]);

  const getCircleStyle = () => {
    const baseStyle = {
      width: '200px',
      height: '200px',
      borderRadius: '50%',
      transition: 'all 3s ease-in-out'
    };

    switch (phase) {
      case 'inhale':
        return { ...baseStyle, transform: 'scale(1.5)', background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)' };
      case 'hold':
        return { ...baseStyle, transform: 'scale(1.5)', background: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)' };
      case 'exhale':
        return { ...baseStyle, transform: 'scale(1)', background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)' };
      default:
        return { ...baseStyle, transform: 'scale(1)', background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)' };
    }
  };

  const getPhaseText = () => {
    if (!isActive) return 'Click Start to Begin';
    const currentTechnique = techniques[technique];
    const currentPhase = currentTechnique.phases.find(p => p.name === phase);
    return currentPhase ? currentPhase.text : 'Ready';
  };

  const handleReset = () => {
    setIsActive(false);
    setPhase('ready');
  };

  return (
    <div className="page-container fade-in">
      <div className="container">
        <h1 className="page-title">Breathing Exercises</h1>
        <p className="page-subtitle">
          Focus on your breath. Let everything else fade away.
        </p>

        {/* Technique Selection */}
        <div style={styles.techniqueSelector}>
          {Object.keys(techniques).map((key) => (
            <button
              key={key}
              onClick={() => {
                setTechnique(key);
                setIsActive(false);
                setPhase('ready');
              }}
              style={{
                ...styles.techniqueButton,
                ...(technique === key ? styles.techniqueButtonActive : {})
              }}
            >
              <h3 style={styles.techniqueName}>{techniques[key].name}</h3>
              <p style={styles.techniqueDesc}>{techniques[key].description}</p>
            </button>
          ))}
        </div>

        {/* Breathing Circle */}
        <Card style={styles.breathingCard}>
          <div style={styles.breathingContainer}>
            <div style={getCircleStyle()}>
              <div style={styles.circleInner}>
                <span style={styles.circleText}>Breathe</span>
              </div>
            </div>
          </div>
          
          <div style={styles.phaseText}>
            <h2 style={styles.phaseTitle}>{getPhaseText()}</h2>
          </div>

          {/* Controls */}
          <div style={styles.controls}>
            <button
              onClick={() => setIsActive(!isActive)}
              style={{
                ...styles.controlButton,
                ...styles.playButton
              }}
            >
              {isActive ? (
                <>
                  <Pause size={24} />
                  <span>Pause</span>
                </>
              ) : (
                <>
                  <Play size={24} />
                  <span>Start</span>
                </>
              )}
            </button>
            
            <button
              onClick={handleReset}
              style={{
                ...styles.controlButton,
                ...styles.resetButton
              }}
            >
              <RotateCcw size={20} />
              <span>Reset</span>
            </button>
          </div>
        </Card>

        {/* Tips */}
        <div style={styles.tips}>
          <Card>
            <h3 style={styles.tipsTitle}>Tips for Best Results</h3>
            <ul style={styles.tipsList}>
              <li style={styles.tipItem}>Find a quiet, comfortable space</li>
              <li style={styles.tipItem}>Sit or lie down in a relaxed position</li>
              <li style={styles.tipItem}>Breathe through your nose when possible</li>
              <li style={styles.tipItem}>Focus on the movement of your belly, not your chest</li>
              <li style={styles.tipItem}>Practice daily for best results</li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
};

const styles = {
  techniqueSelector: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '1rem',
    marginBottom: '3rem'
  },
  techniqueButton: {
    background: '#ffffff',
    border: '2px solid #e2e8f0',
    borderRadius: '1rem',
    padding: '1.5rem',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    textAlign: 'left'
  },
  techniqueButtonActive: {
    borderColor: '#6366f1',
    background: 'linear-gradient(135deg, #6366f115 0%, #8b5cf615 100%)',
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 12px rgba(99, 102, 241, 0.2)'
  },
  techniqueName: {
    fontSize: '1.125rem',
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: '0.5rem'
  },
  techniqueDesc: {
    fontSize: '0.875rem',
    color: '#64748b',
    margin: 0
  },
  breathingCard: {
    padding: '3rem 2rem',
    textAlign: 'center',
    marginBottom: '2rem'
  },
  breathingContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '300px',
    marginBottom: '2rem'
  },
  circleInner: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  circleText: {
    color: '#ffffff',
    fontSize: '1.5rem',
    fontWeight: '700',
    textShadow: '0 2px 4px rgba(0,0,0,0.2)'
  },
  phaseText: {
    marginBottom: '2rem'
  },
  phaseTitle: {
    fontSize: '2rem',
    fontWeight: '700',
    color: '#6366f1',
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
    border: 'none',
    borderRadius: '0.75rem',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  },
  playButton: {
    background: '#6366f1',
    color: '#ffffff'
  },
  resetButton: {
    background: '#f1f5f9',
    color: '#64748b'
  },
  tips: {
    marginTop: '3rem'
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
    margin: 0
  },
  tipItem: {
    padding: '0.75rem 0',
    paddingLeft: '1.5rem',
    position: 'relative',
    color: '#64748b',
    fontSize: '0.95rem',
    '::before': {
      content: '"✓"',
      position: 'absolute',
      left: 0,
      color: '#10b981',
      fontWeight: 'bold'
    }
  }
};

export default Breathing;