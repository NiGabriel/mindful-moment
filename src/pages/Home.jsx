import { Link } from 'react-router-dom';
import { Wind, Brain, Sparkles, Volume2, HandHeart, LifeBuoy, ArrowRight } from 'lucide-react';
import Card from '../components/Card';

const Home = () => {
  const features = [
    {
      icon: Wind,
      title: 'Breathing Exercises',
      description: 'Guided breathing techniques to calm your mind and reduce anxiety',
      link: '/breathing',
      color: '#6366f1'
    },
    {
      icon: Brain,
      title: 'Meditation',
      description: 'Peaceful meditation sessions to center yourself and find inner peace',
      link: '/meditation',
      color: '#8b5cf6'
    },
    {
      icon: Sparkles,
      title: 'Affirmations',
      description: 'Positive daily affirmations to boost your mood and self-worth',
      link: '/affirmations',
      color: '#ec4899'
    },
    {
      icon: Volume2,
      title: 'Calming Sounds',
      description: 'Soothing ambient sounds to help you relax and focus',
      link: '/sounds',
      color: '#10b981'
    },
    {
      icon: HandHeart,
      title: 'Grounding Techniques',
      description: 'Proven methods to manage overwhelming emotions and anxiety',
      link: '/grounding',
      color: '#f59e0b'
    },
    {
      icon: LifeBuoy,
      title: 'Crisis Resources',
      description: 'Important contacts and resources for when you need immediate help',
      link: '/resources',
      color: '#ef4444'
    }
  ];

  return (
    <div className="page-container fade-in">
      <div className="container">
        {/* Hero Section */}
        <div style={styles.hero}>
          <h1 style={styles.heroTitle}>Welcome to Your Safe Space</h1>
          <p style={styles.heroSubtitle}>
            Take a deep breath. You're here, and that's what matters. 
            <br />
            Let's work through this together, one moment at a time.
          </p>
          
          {/* Quick Check-in */}
          <div style={styles.checkIn}>
            <h3 style={styles.checkInTitle}>How are you feeling right now?</h3>
            <div style={styles.moodContainer}>
              {['😢', '😟', '😐', '🙂', '😊'].map((emoji, idx) => (
                <button
                  key={idx}
                  style={styles.moodButton}
                  onClick={() => {}}
                  aria-label={`Mood ${idx + 1}`}
                >
                  <span style={styles.emoji}>{emoji}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div style={styles.featuresSection}>
          <h2 style={styles.sectionTitle}>Choose What You Need</h2>
          <div className="grid grid-3">
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <Link
                  key={idx}
                  to={feature.link}
                  style={styles.featureLink}
                >
                  <Card style={styles.featureCard}>
                    <div style={{...styles.iconContainer, backgroundColor: `${feature.color}15`}}>
                      <Icon size={32} style={{color: feature.color}} />
                    </div>
                    <h3 style={styles.featureTitle}>{feature.title}</h3>
                    <p style={styles.featureDescription}>{feature.description}</p>
                    <div style={styles.featureArrow}>
                      <span style={{color: feature.color}}>Get Started</span>
                      <ArrowRight size={18} style={{color: feature.color}} />
                    </div>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Support Message */}
        <div style={styles.supportMessage}>
          <Card style={styles.supportCard}>
            <h3 style={styles.supportTitle}>You're Not Alone</h3>
            <p style={styles.supportText}>
              Remember, seeking help is a sign of strength, not weakness. 
              Every tool here is designed with care to support you through difficult moments. 
              Take your time, be gentle with yourself, and use whatever helps you feel better.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
};

const styles = {
  hero: {
    textAlign: 'center',
    marginBottom: '4rem',
    padding: '3rem 1rem'
  },
  heroTitle: {
    fontSize: '3rem',
    fontWeight: '700',
    marginBottom: '1rem',
    background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #ec4899 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text'
  },
  heroSubtitle: {
    fontSize: '1.25rem',
    color: '#64748b',
    lineHeight: '1.8',
    maxWidth: '700px',
    margin: '0 auto'
  },
  checkIn: {
    marginTop: '3rem',
    padding: '2rem',
    backgroundColor: '#ffffff',
    borderRadius: '1rem',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
    maxWidth: '600px',
    margin: '3rem auto 0'
  },
  checkInTitle: {
    fontSize: '1.25rem',
    color: '#1e293b',
    marginBottom: '1.5rem',
    fontWeight: '600'
  },
  moodContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '1rem',
    flexWrap: 'wrap'
  },
  moodButton: {
    background: '#f8fafc',
    border: '2px solid #e2e8f0',
    borderRadius: '1rem',
    padding: '1rem',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    minWidth: '70px'
  },
  emoji: {
    fontSize: '2rem',
    display: 'block'
  },
  featuresSection: {
    marginBottom: '4rem'
  },
  sectionTitle: {
    fontSize: '2rem',
    fontWeight: '700',
    color: '#1e293b',
    textAlign: 'center',
    marginBottom: '3rem'
  },
  featureLink: {
    textDecoration: 'none',
    color: 'inherit'
  },
  featureCard: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  },
  iconContainer: {
    width: '64px',
    height: '64px',
    borderRadius: '1rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '1.5rem'
  },
  featureTitle: {
    fontSize: '1.25rem',
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: '0.75rem'
  },
  featureDescription: {
    fontSize: '0.95rem',
    color: '#64748b',
    lineHeight: '1.6',
    marginBottom: '1.5rem',
    flex: 1
  },
  featureArrow: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontWeight: '600',
    fontSize: '0.95rem'
  },
  supportMessage: {
    marginTop: '4rem'
  },
  supportCard: {
    background: 'linear-gradient(135deg, #6366f115 0%, #8b5cf615 100%)',
    borderColor: '#6366f130',
    textAlign: 'center',
    padding: '2.5rem'
  },
  supportTitle: {
    fontSize: '1.5rem',
    fontWeight: '700',
    color: '#6366f1',
    marginBottom: '1rem'
  },
  supportText: {
    fontSize: '1.05rem',
    color: '#64748b',
    lineHeight: '1.8',
    maxWidth: '800px',
    margin: '0 auto'
  }
};

export default Home;