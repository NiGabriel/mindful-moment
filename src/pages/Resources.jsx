import { Phone, MessageCircle, Globe, Heart, AlertCircle, Users, Book, Video } from 'lucide-react';
import Card from '../components/Card';
import { useApp } from '../context/AppContext';
import { useTranslation } from '../utils/translations';

const Resources = () => {
  const { theme, language } = useApp()
  const t = useTranslation(language);

  const crisisLines = [
    {
      name: '114 Suicide & Crisis Lifeline',
      description: '24/7 crisis support for people in suicidal crisis or emotional distress',
      contact: '912 or 114',
      type: 'Call or Text',
      icon: Phone,
      color: '#ef4444',
      urgent: true
    },
    {
      name: 'Crisis Text Line',
      description: 'Text with a trained crisis counselor',
      contact: 'Text HELLO to 741741',
      type: 'Text',
      icon: MessageCircle,
      color: '#f59e0b',
      urgent: true
    },
    {
      name: 'SAMHSA National Helpline',
      description: 'Treatment referral and information service',
      contact: '1-800-662-4357',
      type: 'Call',
      icon: Phone,
      color: '#ef4444',
      urgent: true
    },
    {
      name: 'Veterans Crisis Line',
      description: 'Support for veterans and their families',
      contact: '1-800-273-8255 (Press 1)',
      type: 'Call or Text',
      icon: Phone,
      color: '#8b5cf6',
      urgent: true
    },
    {
      name: 'NAMI Helpline',
      description: 'National Alliance on Mental Illness support',
      contact: '1-800-950-6264',
      type: 'Call',
      icon: Phone,
      color: '#6366f1',
      urgent: true
    }
  ];

  const supportResources = [
    {
      title: 'Online Therapy',
      description: 'Connect with licensed therapists from home',
      icon: Video,
      color: '#8b5cf6',
      links: [
        { name: 'BetterHelp', url: 'https://www.betterhelp.com' },
        { name: 'Talkspace', url: 'https://www.talkspace.com' },
        { name: 'Psychology Today', url: 'https://www.psychologytoday.com' }
      ]
    },
    {
      title: 'Support Groups',
      description: 'Find communities of people with shared experiences',
      icon: Users,
      color: '#10b981',
      links: [
        { name: 'NAMI Support Groups', url: 'https://www.nami.org/Support-Education' },
        { name: 'Mental Health America', url: 'https://www.mhanational.org' },
        { name: 'DBSA Support Groups', url: 'https://www.dbsalliance.org' }
      ]
    },
    {
      title: 'Educational Resources',
      description: 'Learn more about mental health and wellness',
      icon: Book,
      color: '#6366f1',
      links: [
        { name: 'National Institute of Mental Health', url: 'https://www.nimh.nih.gov' },
        { name: 'Mental Health First Aid', url: 'https://www.mentalhealthfirstaid.org' },
        { name: 'Anxiety and Depression Association', url: 'https://adaa.org' }
      ]
    },
    {
      title: 'Self-Help Tools',
      description: 'Apps and resources for daily mental health support',
      icon: Heart,
      color: '#ec4899',
      links: [
        { name: 'Headspace', url: 'https://www.headspace.com' },
        { name: 'Calm', url: 'https://www.calm.com' },
        { name: 'Sanvello', url: 'https://www.sanvello.com' }
      ]
    }
  ];

  const warningSigns = [
    'Talking about wanting to die or hurt oneself',
    'Looking for ways to end one\'s life',
    'Talking about feeling hopeless or having no purpose',
    'Talking about feeling trapped or being in unbearable pain',
    'Talking about being a burden to others',
    'Increasing use of alcohol or drugs',
    'Acting anxious, agitated, or reckless',
    'Sleeping too little or too much',
    'Withdrawing or feeling isolated',
    'Showing rage or talking about seeking revenge',
    'Displaying extreme mood swings'
  ];

  return (
    <div className="page-container fade-in">
      <div className="container">
        <h1 className="page-title">
          {t('resourcesTitle')}
        </h1>
        <p className="page-subtitle">
          {t('resourcesSubtitle')}
        </p>

        {/* Emergency Alert */}
        <Card style={styles.emergencyCard}>
          <AlertCircle size={32} style={{ color: '#ef4444' }} />
          <div style={styles.emergencyContent}>
            <h3 style={styles.emergencyTitle}>
              {t('emergencyTitle')}
            </h3>
            <p style={{
              ...styles.emergencyText,
              color: theme === 'dark' ? '#cbd5e1' : '#64748b'
            }}>
              {t('emergencyText')}
            </p>
          </div>
        </Card>

        {/* Crisis Lines */}
        <div style={styles.section}>
          <h2 style={{
            ...styles.sectionTitle,
            color: theme === 'dark' ? '#cbd5e1' : '#64748b'
          }}>Crisis Helplines</h2>
          <div className="grid grid-2">
            {crisisLines.map((line, idx) => {
              const Icon = line.icon;
              return (
                <Card
                  key={idx}
                  style={{
                    ...styles.crisisCard,
                    ...(line.urgent ? {
                      borderColor: line.color,
                      borderWidth: '2px',
                      backgroundColor: theme === 'dark' ? '#1e293b' : '#ffffff',
                      borderColor: theme === 'dark' ? '#334155' : '#e2e8f0'
                    } : {})
                  }}
                >
                  <div style={styles.crisisHeader}>
                    <div style={{
                      ...styles.crisisIcon,
                      backgroundColor: `${line.color}15`
                    }}>
                      <Icon size={28} style={{ color: line.color }} />
                    </div>
                    {line.urgent && (
                      <span style={{
                        ...styles.urgentBadge,
                        backgroundColor: line.color
                      }}>
                        24/7
                      </span>
                    )}
                  </div>
                  <h3 style={{
                    ...styles.crisisTitle,
                    color: theme === 'dark' ? '#cbd5e1' : '#64748b'
                  }}>
                    {line.name}</h3>
                  <p style={styles.crisisDescription}>{line.description}</p>
                  <div style={{
                    ...styles.contactInfo,
                    backgroundColor: theme === 'dark' ? '#143b79ff' : '#ffffff',
                    borderColor: theme === 'dark' ? '#cfd7e2ff' : '#e2e8f0'
                  }}>
                    <span style={styles.contactType}>{line.type}:</span>
                    <span style={{
                      ...styles.contactNumber,
                      color: line.color
                    }}>
                      {line.contact}
                    </span>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Support Resources */}
        <div style={styles.section}>
          <h2 style={{
            ...styles.sectionTitle,
            color: theme === 'dark' ? '#cbd5e1' : '#64748b'
          }}>Additional Support Resources</h2>
          <div className="grid grid-2">
            {supportResources.map((resource, idx) => {
              const Icon = resource.icon;
              return (
                <Card key={idx} style={{
                  ...styles.resourceCard,
                  backgroundColor: theme === 'dark' ? '#1e293b' : '#ffffff',
                  borderColor: theme === 'dark' ? '#334155' : '#e2e8f0'
                }}>
                  <div style={{
                    ...styles.resourceIcon,
                    backgroundColor: `${resource.color}15`
                  }}>
                    <Icon size={32} style={{ color: resource.color }} />
                  </div>
                  <h3 style={{
                    ...styles.resourceTitle,
                    color: theme === 'dark' ? '#cbd5e1' : '#64748b'
                  }}>
                    {resource.title}</h3>
                  <p style={styles.resourceDescription}>{resource.description}</p>
                  <div style={styles.linksList}>
                    {resource.links.map((link, linkIdx) => (
                      <a
                        key={linkIdx}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          ...styles.link,
                          color: resource.color
                        }}
                      >
                        <Globe size={16} />
                        {link.name}
                      </a>
                    ))}
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Warning Signs */}
        <Card style={styles.warningCard}>
          <div style={styles.warningHeader}>
            <AlertCircle size={28} style={{ color: '#f59e0b' }} />
            <h3 style={{
              ...styles.warningTitle,
              color: theme === 'dark' ? '#cbd5e1' : '#64748b'
            }}>
              Warning Signs to Watch For</h3>
          </div>
          <p style={styles.warningIntro}>
            If you or someone you know shows these signs, reach out for help immediately:
          </p>
          <div style={styles.warningGrid}>
            {warningSigns.map((sign, idx) => (
              <div key={idx} style={styles.warningItem}>
                <div style={styles.warningBullet}>•</div>
                <p style={styles.warningText}>{sign}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* International Resources */}
        <Card style={styles.internationalCard}>
          <h3 style={{
            ...styles.internationalTitle,
            color: theme === 'dark' ? '#cbd5e1' : '#64748b'
          }}>
            International Crisis Lines</h3>
          <p style={styles.internationalText}>
            If you're outside the United States, find crisis resources in your country:
          </p>
          <a
            href="https://findahelpline.com"
            target="_blank"
            rel="noopener noreferrer"
            style={styles.internationalLink}
          >
            <Globe size={20} />
            Find a Helpline (International Directory)
          </a>
        </Card>

        {/* Encouragement */}
        <Card style={styles.encouragementCard}>
          <Heart size={40} style={{ color: '#ec4899', marginBottom: '1rem' }} />
          <h3 style={styles.encouragementTitle}>You Matter</h3>
          <p style={styles.encouragementText}>
            Your life has value and meaning. Reaching out for help is a sign of strength,
            not weakness. These resources are here because people care about you and want
            to support you through difficult times. You deserve help, support, and healing.
          </p>
        </Card>
      </div>
    </div>
  );
};

const styles = {
  emergencyCard: {
    display: 'flex',
    alignItems: 'center',
    gap: '1.5rem',
    padding: '1.5rem',
    background: 'linear-gradient(135deg, #ef444415 0%, #f5900b15 100%)',
    border: '2px solid #ef4444',
    marginBottom: '3rem'
  },
  emergencyContent: {
    flex: 1
  },
  emergencyTitle: {
    fontSize: '1.25rem',
    fontWeight: '700',
    color: '#ef4444',
    marginBottom: '0.5rem'
  },
  emergencyText: {
    fontSize: '1rem',
    color: '#1e293b',
    fontWeight: '600',
    margin: 0
  },
  section: {
    marginBottom: '3rem'
  },
  sectionTitle: {
    fontSize: '2rem',
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: '2rem',
    textAlign: 'center'
  },
  crisisCard: {
    border: '1px solid #e2e8f0',
    transition: 'all 0.3s ease'
  },
  crisisHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '1rem'
  },
  crisisIcon: {
    width: '56px',
    height: '56px',
    borderRadius: '0.75rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  urgentBadge: {
    padding: '0.25rem 0.75rem',
    borderRadius: '1rem',
    color: '#ffffff',
    fontSize: '0.75rem',
    fontWeight: '700'
  },
  crisisTitle: {
    fontSize: '1.125rem',
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: '0.5rem'
  },
  crisisDescription: {
    fontSize: '0.875rem',
    color: '#64748b',
    lineHeight: '1.6',
    marginBottom: '1rem'
  },
  contactInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.25rem',
    padding: '1rem',
    background: '#f8fafc',
    borderRadius: '0.5rem'
  },
  contactType: {
    fontSize: '0.75rem',
    color: '#94a3b8',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: '0.05em'
  },
  contactNumber: {
    fontSize: '1.125rem',
    fontWeight: '700'
  },
  resourceCard: {
    display: 'flex',
    flexDirection: 'column'
  },
  resourceIcon: {
    width: '64px',
    height: '64px',
    borderRadius: '1rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '1rem'
  },
  resourceTitle: {
    fontSize: '1.25rem',
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: '0.5rem'
  },
  resourceDescription: {
    fontSize: '0.95rem',
    color: '#64748b',
    marginBottom: '1.5rem',
    lineHeight: '1.6'
  },
  linksList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
    marginTop: 'auto'
  },
  link: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    textDecoration: 'none',
    fontSize: '0.95rem',
    fontWeight: '600',
    transition: 'all 0.3s ease'
  },
  warningCard: {
    background: 'linear-gradient(135deg, #f59e0b08 0%, #ef444408 100%)',
    marginBottom: '2rem'
  },
  warningHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    marginBottom: '1rem'
  },
  warningTitle: {
    fontSize: '1.5rem',
    fontWeight: '700',
    color: '#1e293b',
    margin: 0
  },
  warningIntro: {
    fontSize: '1rem',
    color: '#475569',
    marginBottom: '1.5rem',
    lineHeight: '1.6'
  },
  warningGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '0.75rem'
  },
  warningItem: {
    display: 'flex',
    gap: '0.75rem',
    alignItems: 'flex-start'
  },
  warningBullet: {
    color: '#f59e0b',
    fontSize: '1.5rem',
    lineHeight: '1',
    paddingTop: '0.125rem'
  },
  warningText: {
    fontSize: '0.95rem',
    color: '#475569',
    margin: 0,
    lineHeight: '1.6'
  },
  internationalCard: {
    background: 'linear-gradient(135deg, #6366f108 0%, #8b5cf608 100%)',
    textAlign: 'center',
    marginBottom: '2rem'
  },
  internationalTitle: {
    fontSize: '1.5rem',
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: '0.75rem'
  },
  internationalText: {
    fontSize: '1rem',
    color: '#64748b',
    marginBottom: '1.5rem'
  },
  internationalLink: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.875rem 1.5rem',
    background: '#6366f1',
    color: '#ffffff',
    textDecoration: 'none',
    borderRadius: '0.75rem',
    fontWeight: '600',
    transition: 'all 0.3s ease'
  },
  encouragementCard: {
    background: 'linear-gradient(135deg, #ec489915 0%, #8b5cf615 100%)',
    textAlign: 'center',
    padding: '3rem 2rem'
  },
  encouragementTitle: {
    fontSize: '2rem',
    fontWeight: '700',
    color: '#ec4899',
    marginBottom: '1rem'
  },
  encouragementText: {
    fontSize: '1.125rem',
    color: '#475569',
    lineHeight: '1.8',
    maxWidth: '700px',
    margin: '0 auto'
  }
};

export default Resources;