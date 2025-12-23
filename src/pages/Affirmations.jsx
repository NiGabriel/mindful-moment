import { useState, useEffect } from 'react';
import { Sparkles, ChevronLeft, ChevronRight, Shuffle } from 'lucide-react';
import Card from '../components/Card';

const Affirmations = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [category, setCategory] = useState('general');
  const [autoPlay, setAutoPlay] = useState(false);

  const affirmations = {
    general: [
      "You are stronger than you know",
      "This moment will pass, and peace will come",
      "You deserve kindness, especially from yourself",
      "Your feelings are valid, and it's okay to feel them",
      "You have survived 100% of your worst days",
      "Taking it one breath at a time is enough",
      "You are not alone in this struggle",
      "Small steps forward are still progress",
      "Be gentle with yourself today",
      "Your worth is not determined by your productivity"
    ],
    anxiety: [
      "I am safe in this moment",
      "I release what I cannot control",
      "My anxiety does not define me",
      "I choose peace over worry",
      "This feeling is temporary",
      "I trust in my ability to handle this",
      "I am breathing, I am present, I am okay",
      "I give myself permission to rest",
      "My mind is calm and my body is relaxed",
      "I am doing the best I can, and that is enough"
    ],
    selfworth: [
      "I am worthy of love and respect",
      "I accept myself completely",
      "I am enough, just as I am",
      "My value does not depend on others' opinions",
      "I deserve good things",
      "I am proud of how far I've come",
      "I honor my needs and boundaries",
      "I am worthy of my own compassion",
      "I celebrate my unique qualities",
      "I am valuable and important"
    ],
    hope: [
      "Every day is a new beginning",
      "I trust that things will get better",
      "I am resilient and capable of healing",
      "There is light ahead, even if I can't see it yet",
      "I have the power to create positive change",
      "My story isn't over yet",
      "I believe in my ability to overcome this",
      "Better days are coming",
      "I am worthy of happiness and joy",
      "I choose to hope, even when it's hard"
    ]
  };

  const categories = {
    general: { name: 'General', color: '#6366f1', icon: '✨' },
    anxiety: { name: 'Anxiety Relief', color: '#8b5cf6', icon: '🕊️' },
    selfworth: { name: 'Self-Worth', color: '#ec4899', icon: '💖' },
    hope: { name: 'Hope & Healing', color: '#10b981', icon: '🌅' }
  };

  useEffect(() => {
    if (autoPlay) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % affirmations[category].length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [autoPlay, category]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % affirmations[category].length);
  };

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + affirmations[category].length) % affirmations[category].length);
  };

  const handleRandom = () => {
    const randomIndex = Math.floor(Math.random() * affirmations[category].length);
    setCurrentIndex(randomIndex);
  };

  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
    setCurrentIndex(0);
  };

  return (
    <div className="page-container fade-in">
      <div className="container">
        <h1 className="page-title">Daily Affirmations</h1>
        <p className="page-subtitle">
          Speak kindly to yourself. You deserve your own compassion.
        </p>

        {/* Category Selection */}
        <div style={styles.categoryContainer}>
          {Object.keys(categories).map((key) => (
            <button
              key={key}
              onClick={() => handleCategoryChange(key)}
              style={{
                ...styles.categoryButton,
                ...(category === key ? {
                  ...styles.categoryButtonActive,
                  backgroundColor: `${categories[key].color}15`,
                  borderColor: categories[key].color,
                  color: categories[key].color
                } : {})
              }}
            >
              <span style={styles.categoryIcon}>{categories[key].icon}</span>
              <span>{categories[key].name}</span>
            </button>
          ))}
        </div>

        {/* Affirmation Display */}
        <Card style={{
          ...styles.affirmationCard,
          background: `linear-gradient(135deg, ${categories[category].color}08 0%, ${categories[category].color}15 100%)`
        }}>
          <div style={styles.affirmationContent}>
            <Sparkles 
              size={48} 
              style={{color: categories[category].color, marginBottom: '2rem'}}
            />
            <p style={styles.affirmationText}>
              {affirmations[category][currentIndex]}
            </p>
            <div style={styles.counter}>
              {currentIndex + 1} / {affirmations[category].length}
            </div>
          </div>

          {/* Navigation Controls */}
          <div style={styles.controls}>
            <button onClick={handlePrevious} style={styles.navButton}>
              <ChevronLeft size={24} />
            </button>
            
            <button 
              onClick={handleRandom} 
              style={{
                ...styles.randomButton,
                backgroundColor: categories[category].color
              }}
            >
              <Shuffle size={20} />
              Random
            </button>
            
            <button onClick={handleNext} style={styles.navButton}>
              <ChevronRight size={24} />
            </button>
          </div>

          {/* Auto-play Toggle */}
          <div style={styles.autoPlayContainer}>
            <label style={styles.autoPlayLabel}>
              <input
                type="checkbox"
                checked={autoPlay}
                onChange={(e) => setAutoPlay(e.target.checked)}
                style={styles.checkbox}
              />
              <span>Auto-play (5 seconds each)</span>
            </label>
          </div>
        </Card>

        {/* All Affirmations List */}
        <div style={styles.listSection}>
          <h2 style={styles.listTitle}>All {categories[category].name} Affirmations</h2>
          <div className="grid grid-2">
            {affirmations[category].map((affirmation, idx) => (
              <Card 
                key={idx}
                style={{
                  ...styles.listCard,
                  ...(idx === currentIndex ? {
                    borderColor: categories[category].color,
                    backgroundColor: `${categories[category].color}08`
                  } : {})
                }}
                onClick={() => setCurrentIndex(idx)}
              >
                <p style={styles.listCardText}>{affirmation}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Usage Tips */}
        <Card style={styles.tipsCard}>
          <h3 style={styles.tipsTitle}>How to Use Affirmations</h3>
          <div style={styles.tipsList}>
            <div style={styles.tipItem}>
              <span style={styles.tipNumber}>1</span>
              <p style={styles.tipText}>Read slowly and let the words sink in</p>
            </div>
            <div style={styles.tipItem}>
              <span style={styles.tipNumber}>2</span>
              <p style={styles.tipText}>Repeat aloud or in your mind several times</p>
            </div>
            <div style={styles.tipItem}>
              <span style={styles.tipNumber}>3</span>
              <p style={styles.tipText}>Try to truly believe what you're saying</p>
            </div>
            <div style={styles.tipItem}>
              <span style={styles.tipNumber}>4</span>
              <p style={styles.tipText}>Practice daily, especially during difficult moments</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

const styles = {
  categoryContainer: {
    display: 'flex',
    gap: '1rem',
    marginBottom: '3rem',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  categoryButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.75rem 1.5rem',
    background: '#ffffff',
    border: '2px solid #e2e8f0',
    borderRadius: '0.75rem',
    fontSize: '0.95rem',
    fontWeight: '600',
    color: '#64748b',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  },
  categoryButtonActive: {
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
  },
  categoryIcon: {
    fontSize: '1.25rem'
  },
  affirmationCard: {
    padding: '3rem 2rem',
    marginBottom: '3rem',
    textAlign: 'center',
    minHeight: '400px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  affirmationContent: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  affirmationText: {
    fontSize: '2rem',
    fontWeight: '600',
    color: '#1e293b',
    lineHeight: '1.6',
    maxWidth: '700px',
    margin: '0 auto 2rem'
  },
  counter: {
    fontSize: '0.875rem',
    color: '#94a3b8',
    fontWeight: '500'
  },
  controls: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '1rem',
    marginTop: '2rem'
  },
  navButton: {
    width: '48px',
    height: '48px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#f8fafc',
    border: '1px solid #e2e8f0',
    borderRadius: '0.75rem',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    color: '#475569'
  },
  randomButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.75rem 1.5rem',
    color: '#ffffff',
    border: 'none',
    borderRadius: '0.75rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  },
  autoPlayContainer: {
    marginTop: '1.5rem',
    display: 'flex',
    justifyContent: 'center'
  },
  autoPlayLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontSize: '0.95rem',
    color: '#64748b',
    cursor: 'pointer'
  },
  checkbox: {
    width: '18px',
    height: '18px',
    cursor: 'pointer'
  },
  listSection: {
    marginBottom: '3rem'
  },
  listTitle: {
    fontSize: '1.5rem',
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: '1.5rem',
    textAlign: 'center'
  },
  listCard: {
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    border: '2px solid #e2e8f0'
  },
  listCardText: {
    fontSize: '1rem',
    color: '#475569',
    margin: 0,
    lineHeight: '1.6'
  },
  tipsCard: {
    background: 'linear-gradient(135deg, #6366f108 0%, #8b5cf608 100%)'
  },
  tipsTitle: {
    fontSize: '1.25rem',
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: '1.5rem',
    textAlign: 'center'
  },
  tipsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem'
  },
  tipItem: {
    display: 'flex',
    gap: '1rem',
    alignItems: 'flex-start'
  },
  tipNumber: {
    width: '32px',
    height: '32px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#6366f1',
    color: '#ffffff',
    borderRadius: '50%',
    fontWeight: '700',
    flexShrink: 0
  },
  tipText: {
    fontSize: '0.95rem',
    color: '#475569',
    margin: 0,
    paddingTop: '0.25rem'
  }
};

export default Affirmations;