import { Heart } from 'lucide-react';
import { useApp } from '../context/AppContext';

const Footer = () => {
  const currentYear = new Date().getFullYear();
    const { theme } = useApp();


  return (
    <footer style={{
      ...styles.footer,
      backgroundColor: theme === 'dark' ? '#1e293b' : '#ffffff',
      borderBottomColor: theme === 'dark' ? '#334155' : '#e2e8f0'
    }}>
      <div className="container" style={styles.container}>
        <div style={styles.content}>
          <div style={styles.message}>
            <Heart size={16} style={styles.icon} />
            <p style={styles.text}>
              Remember: You are worthy of love and care. Take it one moment at a time.
            </p>
          </div>
          <div style={styles.copyright}>
            <p style={styles.copyrightText}>
              © {currentYear} G - E - A - R
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

const styles = {
  footer: {
    backgroundColor: '#ffffff',
    borderTop: '1px solid #e2e8f0',
    marginTop: 'auto',
    padding: '2rem 1rem'
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto'
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '1rem',
    textAlign: 'center'
  },
  message: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  icon: {
    color: '#6366f1',
    flexShrink: 0
  },
  text: {
    color: '#64748b',
    fontSize: '0.95rem',
    margin: 0
  },
  copyright: {
    paddingTop: '0.5rem'
  },
  copyrightText: {
    color: '#94a3b8',
    fontSize: '0.875rem',
    margin: 0
  }
};

export default Footer;