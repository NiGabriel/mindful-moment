import { Link } from 'react-router-dom';
import { Wind, Brain, Sparkles, Volume2, HandHeart, LifeBuoy, ArrowRight } from 'lucide-react';
import Card from '../components/Card';
import { useApp } from '../context/AppContext';
import { useTranslation } from '../utils/translations';

const Home = () => {
  const { theme, userMood, setUserMood } = useApp();
  const { language } = useApp();
  const t = useTranslation(language);

  const moodMessages = {
    0: {
      text: "I see you're having a very tough time. Remember, it's okay to not be okay. Let's find some tools that might help you feel a bit better.",
      suggestions: ['/breathing', '/grounding', '/resources']
    },
    1: {
      text: t('difficultMoment'),
      suggestions: ['/breathing', '/meditation', '/grounding']
    },
    2: {
      text: "Feeling neutral is perfectly fine. Would you like to explore something to lift your spirits or maintain your balance?",
      suggestions: ['/affirmations', '/sounds', '/meditation']
    },
    3: {
      text: "It's wonderful that you're feeling okay! Keep nurturing your wellbeing with these practices.",
      suggestions: ['/meditation', '/affirmations', '/sounds']
    },
    4: {
      text: "That's beautiful! You're in a great place. These tools can help you maintain and even enhance your positive state.",
      suggestions: ['/affirmations', '/meditation', '/sounds']
    }
  };

  const handleMoodSelect = (moodIndex) => {
    setUserMood(moodIndex);
  };

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
          <h1 style={styles.heroTitle}>
             {t('welcomeTitle')}
          </h1>
          <p style={styles.heroSubtitle}>
            {t('welcomeSubtitle')}
            <br />
            {t('welcomeSubtitle2')}
          </p>

          {/* Quick Check-in */}
          <div style={{
            ...styles.checkIn,
            backgroundColor: theme === 'dark' ? '#1e293b' : '#ffffff',
            borderColor: theme === 'dark' ? '#334155' : '#e2e8f0'
          }}>
            <h3 style={{
              ...styles.checkInTitle,
              color: theme === 'dark' ? '#f1f5f9' : '#1e293b'
            }}>
              {t('howFeeling')}
            </h3>
            <div style={styles.moodContainer}>
              {['😢', '😟', '😐', '🙂', '😊'].map((emoji, idx) => (
                <button
                  key={idx}
                  style={{
                    ...styles.moodButton,
                    backgroundColor: userMood === idx
                      ? (theme === 'dark' ? '#334155' : '#f1f5f9')
                      : (theme === 'dark' ? '#0f172a' : '#f8fafc'),
                    borderColor: userMood === idx
                      ? '#6366f1'
                      : (theme === 'dark' ? '#475569' : '#e2e8f0'),
                    transform: userMood === idx ? 'scale(1.1)' : 'scale(1)',
                    boxShadow: userMood === idx ? '0 4px 12px rgba(99, 102, 241, 0.3)' : 'none'
                  }}
                  onClick={() => handleMoodSelect(idx)}
                  aria-label={`Mood ${idx + 1}`}
                >
                  <span style={styles.emoji}>{emoji}</span>
                </button>
              ))}
            </div>

            {userMood !== null && (
              <div style={{
                ...styles.moodFeedback,
                background: theme === 'dark'
                  ? 'linear-gradient(135deg, #6366f120 0%, #8b5cf620 100%)'
                  : 'linear-gradient(135deg, #6366f115 0%, #8b5cf615 100%)'
              }}>
                <p style={{
                  ...styles.moodMessage,
                  color: theme === 'dark' ? '#cbd5e1' : '#475569'
                }}>
                  {moodMessages[userMood].text}
                </p>
                <div style={styles.suggestionLinks}>
                  {moodMessages[userMood].suggestions.map((path, idx) => (
                    <Link
                      key={idx}
                      to={path}
                      style={styles.suggestionLink}
                    >
                      {path.replace('/', '').charAt(0).toUpperCase() + path.slice(2)}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Features Grid */}
        <div style={styles.featuresSection}>
          <h2 style={{
            ...styles.sectionTitle,
            color: theme === 'dark' ? '#f1f5f9' : '#1e293b'
          }}>
            {t('chooseNeed')}
          </h2>
          <div className="grid grid-3">
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <Link
                  key={idx}
                  to={feature.link}
                  style={styles.featureLink}
                >
                  <Card style={{
                    ...styles.featureCard,
                    backgroundColor: theme === 'dark' ? '#1e293b' : '#ffffff',
                    borderColor: theme === 'dark' ? '#334155' : '#e2e8f0'
                  }}>
                    <div style={{ ...styles.iconContainer, backgroundColor: `${feature.color}15` }}>
                      <Icon size={32} style={{ color: feature.color }} />
                    </div>
                    <h3 style={{
                      ...styles.featureTitle,
                      color: theme === 'dark' ? '#cbd5e1' : '#64748b'
                    }}>{feature.title}</h3>
                    <p style={{
                      ...styles.featureDescription,
                      color: theme === 'dark' ? '#cbd5e1' : '#64748b'
                    }}>{feature.description}</p>
                    <div style={styles.featureArrow}>
                      <span style={{ color: feature.color }}>Get Started</span>
                      <ArrowRight size={18} style={{ color: feature.color }} />
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
            <h3 style={styles.supportTitle}>
              {t('notAlone')}
            </h3>
            <p style={styles.supportText}>
              {t('notAloneText')}
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
    borderRadius: '1rem',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
    maxWidth: '600px',
    margin: '3rem auto 0',
    border: '1px solid'
  },
  checkInTitle: {
    fontSize: '1.25rem',
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
    border: '2px solid',
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
  moodFeedback: {
    marginTop: '1.5rem',
    padding: '1.5rem',
    borderRadius: '0.75rem'
  },
  moodMessage: {
    fontSize: '1rem',
    lineHeight: '1.6',
    marginBottom: '1rem'
  },
  suggestionLinks: {
    display: 'flex',
    gap: '0.75rem',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  suggestionLink: {
    padding: '0.5rem 1rem',
    background: '#6366f1',
    color: '#ffffff',
    textDecoration: 'none',
    borderRadius: '0.5rem',
    fontSize: '0.875rem',
    fontWeight: '600',
    transition: 'all 0.3s ease'
  },
  featuresSection: {
    marginBottom: '4rem'
  },
  sectionTitle: {
    fontSize: '2rem',
    fontWeight: '700',
    color: 'var(--surface)',
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