import { useState } from 'react';
import { HandHeart, Eye, Hand, Ear, Wind, Droplet, CheckCircle2, Brain } from 'lucide-react';
import Card from '../components/Card';
import { useApp } from '../context/AppContext';
import { useTranslation } from '../utils/translations';

const Grounding = () => {
  const [activeExercise, setActiveExercise] = useState(null);
  const [completedSteps, setCompletedSteps] = useState([]);
  const { theme, language } = useApp();
  const t = useTranslation(language);

  const techniques = [
    {
      id: '54321',
      name: '5-4-3-2-1 Technique',
      icon: Eye,
      color: '#6366f1',
      description: 'Engage your five senses to anchor yourself in the present moment',
      steps: [
        { sense: 'See', prompt: 'Name 5 things you can see around you', icon: Eye },
        { sense: 'Touch', prompt: 'Name 4 things you can touch', icon: Hand },
        { sense: 'Hear', prompt: 'Name 3 things you can hear', icon: Ear },
        { sense: 'Smell', prompt: 'Name 2 things you can smell', icon: Wind },
        { sense: 'Taste', prompt: 'Name 1 thing you can taste', icon: Droplet }
      ]
    },
    {
      id: 'body-scan',
      name: 'Body Scan',
      icon: HandHeart,
      color: '#8b5cf6',
      description: 'Progressively relax each part of your body from head to toe',
      steps: [
        { part: 'Head & Face', prompt: 'Focus on your head and face. Release any tension in your jaw and forehead' },
        { part: 'Neck & Shoulders', prompt: 'Notice your neck and shoulders. Let them drop and relax' },
        { part: 'Arms & Hands', prompt: 'Bring awareness to your arms and hands. Let them rest heavily' },
        { part: 'Chest & Back', prompt: 'Feel your chest rising and falling. Relax your back muscles' },
        { part: 'Legs & Feet', prompt: 'Notice your legs and feet. Allow them to feel heavy and relaxed' }
      ]
    },
    {
      id: 'categories',
      name: 'Category Game',
      icon: Brain,
      color: '#ec4899',
      description: 'Name items in different categories to distract and focus your mind',
      steps: [
        { category: 'Colors', prompt: 'Name 5 different colors you can see or think of' },
        { category: 'Animals', prompt: 'Name 5 different animals' },
        { category: 'Countries', prompt: 'Name 5 different countries' },
        { category: 'Foods', prompt: 'Name 5 different foods you enjoy' },
        { category: 'Movies/Books', prompt: 'Name 5 movies or books you like' }
      ]
    }
  ];

  const quickTechniques = [
    {
      title: 'Cold Water',
      description: 'Splash cold water on your face or hold an ice cube',
      icon: Droplet,
      color: '#06b6d4'
    },
    {
      title: 'Deep Breathing',
      description: 'Take 5 slow, deep breaths counting to 4 on each inhale and exhale',
      icon: Wind,
      color: '#10b981'
    },
    {
      title: 'Physical Movement',
      description: 'Stand up, stretch, or do 10 jumping jacks',
      icon: HandHeart,
      color: '#f59e0b'
    },
    {
      title: 'Hold Something',
      description: 'Hold an object and describe its texture, weight, and temperature',
      icon: Hand,
      color: '#8b5cf6'
    }
  ];

  const handleStepComplete = (stepIndex) => {
    if (!completedSteps.includes(stepIndex)) {
      setCompletedSteps([...completedSteps, stepIndex]);
    }
  };

  const resetExercise = () => {
    setCompletedSteps([]);
  };

  const startExercise = (exerciseId) => {
    setActiveExercise(exerciseId);
    setCompletedSteps([]);
  };

  const currentTechnique = techniques.find(t => t.id === activeExercise);

  return (
    <div className="page-container fade-in">
      <div className="container">
        <h1 className="page-title">
          {t('groundingTitle')}
        </h1>
        <p className="page-subtitle">
          {t('groundingSubtitle')}
        </p>

        {!activeExercise ? (
          <>
            {/* Main Techniques */}
            <div className="grid grid-3" style={{ marginBottom: '3rem' }}>
              {techniques.map((technique) => {
                const Icon = technique.icon;
                return (
                  <Card
                    key={technique.id}
                    style={{
                      ...styles.techniqueCard,
                      backgroundColor: theme === 'dark' ? '#1e293b' : '#ffffff',
                      borderColor: theme === 'dark' ? '#334155' : '#e2e8f0'
                    }}
                  >
                    <div style={{
                      ...styles.iconContainer,
                      backgroundColor: `${technique.color}15`
                    }}>
                      <Icon size={32} style={{ color: technique.color }} />
                    </div>
                    <h3 style={{
                      ...styles.techniqueTitle,
                      color: theme === 'dark' ? '#cbd5e1' : '#64748b'
                    }}>
                      {technique.name}</h3>
                    <p style={styles.techniqueDescription}>{technique.description}</p>
                    <button
                      onClick={() => startExercise(technique.id)}
                      style={{
                        ...styles.startButton,
                        backgroundColor: technique.color
                      }}
                    >
                      {t('startExercise')}
                    </button>
                  </Card>
                );
              })}
            </div>

            {/* Quick Techniques */}
            <div style={styles.quickSection}>
              <h2 style={{
                ...styles.sectionTitle,
                color: theme === 'dark' ? '#cbd5e1' : '#64748b'
              }}>
                Quick Relief Techniques</h2>
              <p style={styles.sectionSubtitle}>
                Try these when you need immediate grounding
              </p>
              <div className="grid grid-2">
                {quickTechniques.map((technique, idx) => {
                  const Icon = technique.icon;
                  return (
                    <Card key={idx} style={{
                      ...styles.quickCard,
                      backgroundColor: theme === 'dark' ? '#1e293b' : '#ffffff',
                      borderColor: theme === 'dark' ? '#334155' : '#e2e8f0'
                    }}>
                      <div style={styles.quickHeader}>
                        <div style={{
                          ...styles.quickIcon,
                          backgroundColor: `${technique.color}15`
                        }}>
                          <Icon size={24} style={{ color: technique.color }} />
                        </div>
                        <h4 style={{
                          ...styles.quickTitle,
                          color: theme === 'dark' ? '#cbd5e1' : '#64748b'
                        }}>
                          {technique.title}</h4>
                      </div>
                      <p style={styles.quickDescription}>{technique.description}</p>
                    </Card>
                  );
                })}
              </div>
            </div>

            {/* Information */}
            <Card style={styles.infoCard}>
              <h3 style={styles.infoTitle}>Why Grounding Works</h3>
              <p style={styles.infoText}>
                Grounding techniques help interrupt anxious thoughts and panic by redirecting your focus
                to the present moment. They activate your senses and bring you back to reality, helping
                your nervous system calm down. Regular practice makes these techniques more effective
                over time.
              </p>
            </Card>
          </>
        ) : (
          <Card style={{
            ...styles.exerciseCard,
            backgroundColor: theme === 'dark' ? '#1e293b' : '#ffffff',
            borderColor: theme === 'dark' ? '#334155' : '#e2e8f0'
          }}>
            <div style={styles.exerciseHeader}>
              <div style={{
                ...styles.exerciseIcon,
                backgroundColor: `${currentTechnique.color}15`
              }}>
                {(() => {
                  const Icon = currentTechnique.icon;
                  return <Icon size={40} style={{ color: currentTechnique.color }} />;
                })()}
              </div>
              <div>
                <h2 style={{
                  ...styles.exerciseTitle,
                  color: theme === 'dark' ? '#cbd5e1' : '#64748b'
                }}>
                  {currentTechnique.name}</h2>
                <p style={styles.exerciseDescription}>{currentTechnique.description}</p>
              </div>
            </div>

            <div style={styles.progressBar}>
              <div style={{
                ...styles.progressFill,
                width: `${(completedSteps.length / currentTechnique.steps.length) * 100}%`,
                backgroundColor: currentTechnique.color
              }} />
            </div>
            <p style={styles.progressText}>
              {completedSteps.length} of {currentTechnique.steps.length} completed
            </p>

            <div style={styles.stepsList}>
              {currentTechnique.steps.map((step, idx) => {
                const isCompleted = completedSteps.includes(idx);
                const StepIcon = step.icon;

                return (
                  <div
                    key={idx}
                    style={{
                      ...styles.stepCard,
                      ...(isCompleted ? {
                        borderColor: currentTechnique.color,
                        backgroundColor: `${currentTechnique.color}08`
                      } : {})
                    }}
                  >
                    <div style={styles.stepHeader}>
                      {StepIcon && (
                        <div style={{
                          ...styles.stepIconContainer,
                          backgroundColor: isCompleted ? currentTechnique.color : '#f1f5f9'
                        }}>
                          <StepIcon
                            size={20}
                            style={{ color: isCompleted ? '#ffffff' : '#94a3b8' }}
                          />
                        </div>
                      )}
                      <h4 style={{
                        ...styles.stepTitle,
                        color: theme === 'dark' ? '#cbd5e1' : '#64748b'
                      }}>
                        {step.sense || step.part || step.category}
                      </h4>
                      {isCompleted && (
                        <CheckCircle2 size={24} style={{ color: currentTechnique.color }} />
                      )}
                    </div>
                    <p style={styles.stepPrompt}>{step.prompt}</p>
                    {!isCompleted && (
                      <button
                        onClick={() => handleStepComplete(idx)}
                        style={{
                          ...styles.completeButton,
                          backgroundColor: currentTechnique.color
                        }}
                      >
                         {t('markComplete')}
                      </button>
                    )}
                  </div>
                );
              })}
            </div>

            <div style={styles.exerciseControls}>
              <button onClick={resetExercise} style={styles.resetButton}>
                {t('startOver')}
              </button>
              <button onClick={() => setActiveExercise(null)} style={styles.backButton}>
                {t('backToTechniques')}
              </button>
            </div>

            {completedSteps.length === currentTechnique.steps.length && (
              <div style={styles.completionMessage}>
                <CheckCircle2 size={48} style={{ color: currentTechnique.color }} />
                <h3 style={styles.completionTitle}>Great Job!</h3>
                <p style={styles.completionText}>
                  You've completed this grounding exercise. Notice how you feel now compared to when you started.
                </p>
              </div>
            )}
          </Card>
        )}
      </div>
    </div>
  );
};

const styles = {
  techniqueCard: {
    textAlign: 'center',
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
    marginBottom: '1.5rem'
  },
  techniqueTitle: {
    fontSize: '1.25rem',
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: '0.75rem'
  },
  techniqueDescription: {
    fontSize: '0.95rem',
    color: '#64748b',
    lineHeight: '1.6',
    marginBottom: '1.5rem',
    flex: 1
  },
  startButton: {
    padding: '0.75rem 1.5rem',
    color: '#ffffff',
    border: 'none',
    borderRadius: '0.75rem',
    fontWeight: '600',
    fontSize: '0.95rem',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    width: '100%'
  },
  quickSection: {
    marginBottom: '3rem'
  },
  sectionTitle: {
    fontSize: '2rem',
    fontWeight: '700',
    color: '#1e293b',
    textAlign: 'center',
    marginBottom: '0.5rem'
  },
  sectionSubtitle: {
    fontSize: '1rem',
    color: '#64748b',
    textAlign: 'center',
    marginBottom: '2rem'
  },
  quickCard: {
    transition: 'all 0.3s ease'
  },
  quickHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    marginBottom: '0.75rem'
  },
  quickIcon: {
    width: '48px',
    height: '48px',
    borderRadius: '0.75rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0
  },
  quickTitle: {
    fontSize: '1.125rem',
    fontWeight: '700',
    color: '#1e293b',
    margin: 0
  },
  quickDescription: {
    fontSize: '0.95rem',
    color: '#64748b',
    lineHeight: '1.6',
    margin: 0
  },
  infoCard: {
    background: 'linear-gradient(135deg, #6366f108 0%, #8b5cf608 100%)',
    textAlign: 'center'
  },
  infoTitle: {
    fontSize: '1.5rem',
    fontWeight: '700',
    color: '#6366f1',
    marginBottom: '1rem'
  },
  infoText: {
    fontSize: '1rem',
    color: '#475569',
    lineHeight: '1.8',
    margin: 0
  },
  exerciseCard: {
    padding: '2rem'
  },
  exerciseHeader: {
    display: 'flex',
    gap: '1.5rem',
    marginBottom: '2rem',
    alignItems: 'flex-start'
  },
  exerciseIcon: {
    width: '80px',
    height: '80px',
    borderRadius: '1rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0
  },
  exerciseTitle: {
    fontSize: '2rem',
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: '0.5rem'
  },
  exerciseDescription: {
    fontSize: '1rem',
    color: '#64748b',
    margin: 0
  },
  progressBar: {
    height: '8px',
    backgroundColor: '#e2e8f0',
    borderRadius: '4px',
    overflow: 'hidden',
    marginBottom: '0.5rem'
  },
  progressFill: {
    height: '100%',
    transition: 'width 0.3s ease',
    borderRadius: '4px'
  },
  progressText: {
    fontSize: '0.875rem',
    color: '#64748b',
    textAlign: 'center',
    marginBottom: '2rem'
  },
  stepsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    marginBottom: '2rem'
  },
  stepCard: {
    padding: '1.5rem',
    border: '2px solid #e2e8f0',
    borderRadius: '1rem',
    transition: 'all 0.3s ease'
  },
  stepHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    marginBottom: '0.75rem'
  },
  stepIconContainer: {
    width: '40px',
    height: '40px',
    borderRadius: '0.5rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.3s ease'
  },
  stepTitle: {
    fontSize: '1.125rem',
    fontWeight: '700',
    color: '#1e293b',
    margin: 0,
    flex: 1
  },
  stepPrompt: {
    fontSize: '0.95rem',
    color: '#475569',
    lineHeight: '1.6',
    marginBottom: '1rem'
  },
  completeButton: {
    padding: '0.625rem 1.25rem',
    color: '#ffffff',
    border: 'none',
    borderRadius: '0.5rem',
    fontWeight: '600',
    fontSize: '0.875rem',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  },
  exerciseControls: {
    display: 'flex',
    gap: '1rem',
    justifyContent: 'center',
    flexWrap: 'wrap'
  },
  resetButton: {
    padding: '0.75rem 1.5rem',
    background: '#f1f5f9',
    color: '#64748b',
    border: 'none',
    borderRadius: '0.75rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  },
  backButton: {
    padding: '0.75rem 1.5rem',
    background: '#6366f1',
    color: '#ffffff',
    border: 'none',
    borderRadius: '0.75rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  },
  completionMessage: {
    marginTop: '2rem',
    padding: '2rem',
    background: 'linear-gradient(135deg, #10b98115 0%, #06b6d415 100%)',
    borderRadius: '1rem',
    textAlign: 'center'
  },
  completionTitle: {
    fontSize: '1.5rem',
    fontWeight: '700',
    color: '#10b981',
    marginTop: '1rem',
    marginBottom: '0.5rem'
  },
  completionText: {
    fontSize: '1rem',
    color: '#475569',
    margin: 0
  }
};

export default Grounding;