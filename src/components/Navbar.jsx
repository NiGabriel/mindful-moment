import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Heart, Menu, X, Moon, Sun, Languages } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useTranslation } from '../utils/translations';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);
  const location = useLocation();
  const { theme, toggleTheme, language, changeLanguage } = useApp();
  const t = useTranslation(language);

  const navLinks = [
    { path: '/', label: t('home') },
    { path: '/breathing', label: t('breathing') },
    { path: '/meditation', label: t('meditation') },
    { path: '/affirmations', label: t('affirmations') },
    { path: '/sounds', label: t('sounds') },
    { path: '/grounding', label: t('grounding') },
    { path: '/resources', label: t('resources') }
  ];

  const languages = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'rw', name: 'Kinyarwanda', flag: '🇷🇼' }
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav style={{
      ...styles.nav,
      backgroundColor: theme === 'dark' ? '#1e293b' : '#ffffff',
      borderBottomColor: theme === 'dark' ? '#334155' : '#e2e8f0'
    }}>
      <div className="container" style={styles.container}>
        <Link to="/" style={styles.logo}>
          <Heart size={28} style={{color: '#6366f1'}} />
          <span style={styles.logoText}>MindfulMoment</span>
        </Link>

        {/* Desktop Navigation */}
        <div style={styles.desktopNav}>
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              style={{
                ...styles.navLink,
                color: theme === 'dark' ? '#cbd5e1' : '#64748b',
                ...(isActive(link.path) ? {
                  ...styles.navLinkActive,
                  color: '#6366f1'
                } : {})
              }}
            >
              {link.label}
            </Link>
          ))}
          
          {/* Language Selector */}
          <div style={styles.languageContainer}>
            <button
              onClick={() => setShowLangMenu(!showLangMenu)}
              style={{
                ...styles.iconButton,
                backgroundColor: theme === 'dark' ? '#334155' : '#f8fafc',
                color: theme === 'dark' ? '#cbd5e1' : '#64748b'
              }}
              aria-label="Change language"
            >
              <Languages size={20} />
            </button>
            {showLangMenu && (
              <div style={{
                ...styles.langMenu,
                backgroundColor: theme === 'dark' ? '#334155' : '#ffffff',
                borderColor: theme === 'dark' ? '#475569' : '#e2e8f0'
              }}>
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      changeLanguage(lang.code);
                      setShowLangMenu(false);
                    }}
                    style={{
                      ...styles.langOption,
                      backgroundColor: language === lang.code 
                        ? (theme === 'dark' ? '#475569' : '#f1f5f9')
                        : 'transparent',
                      color: theme === 'dark' ? '#f1f5f9' : '#1e293b'
                    }}
                  >
                    <span style={styles.flag}>{lang.flag}</span>
                    {lang.name}
                  </button>
                ))}
              </div>
            )}
          </div>
          
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            style={{
              ...styles.iconButton,
              backgroundColor: theme === 'dark' ? '#334155' : '#f8fafc',
              color: theme === 'dark' ? '#fbbf24' : '#64748b'
            }}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          style={{
            ...styles.menuButton,
            color: theme === 'dark' ? '#f1f5f9' : '#1e293b'
          }}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div style={{
          ...styles.mobileNav,
          backgroundColor: theme === 'dark' ? '#1e293b' : '#ffffff',
          borderTopColor: theme === 'dark' ? '#334155' : '#e2e8f0'
        }}>
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              style={{
                ...styles.mobileNavLink,
                color: theme === 'dark' ? '#cbd5e1' : '#64748b',
                ...(isActive(link.path) ? {
                  ...styles.mobileNavLinkActive,
                  backgroundColor: theme === 'dark' ? '#334155' : '#f1f5f9',
                  color: '#6366f1'
                } : {})
              }}
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          
          {/* Mobile Controls */}
          <div style={styles.mobileControls}>
            <button
              onClick={toggleTheme}
              style={{
                ...styles.mobileControlBtn,
                backgroundColor: theme === 'dark' ? '#334155' : '#f8fafc',
                color: theme === 'dark' ? '#fbbf24' : '#64748b'
              }}
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
              <span>{theme === 'dark' ? 'Light' : 'Dark'} Mode</span>
            </button>
            
            <div style={styles.mobileLangSelector}>
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    changeLanguage(lang.code);
                    setIsOpen(false);
                  }}
                  style={{
                    ...styles.mobileLangBtn,
                    backgroundColor: language === lang.code 
                      ? (theme === 'dark' ? '#334155' : '#f1f5f9')
                      : 'transparent',
                    color: theme === 'dark' ? '#f1f5f9' : '#1e293b'
                  }}
                >
                  <span style={styles.flag}>{lang.flag}</span>
                  {lang.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

const styles = {
  nav: {
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
    borderBottom: '1px solid',
    transition: 'all 0.3s ease'
  },
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem',
    maxWidth: '1200px',
    margin: '0 auto'
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    textDecoration: 'none',
    fontSize: '1.5rem',
    fontWeight: '700'
  },
  logoText: {
    background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text'
  },
  desktopNav: {
    display: 'flex',
    gap: '2rem',
    alignItems: 'center'
  },
  navLink: {
    textDecoration: 'none',
    fontWeight: '500',
    fontSize: '0.95rem',
    transition: 'color 0.3s ease',
    position: 'relative',
    padding: '0.5rem 0'
  },
  navLinkActive: {
    fontWeight: '600'
  },
  iconButton: {
    width: '40px',
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: 'none',
    borderRadius: '0.5rem',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  },
  languageContainer: {
    position: 'relative'
  },
  langMenu: {
    position: 'absolute',
    top: '100%',
    right: 0,
    marginTop: '0.5rem',
    borderRadius: '0.75rem',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
    border: '1px solid',
    overflow: 'hidden',
    minWidth: '150px',
    zIndex: 1000
  },
  langOption: {
    width: '100%',
    padding: '0.75rem 1rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    border: 'none',
    cursor: 'pointer',
    fontSize: '0.875rem',
    fontWeight: '500',
    transition: 'background-color 0.2s ease',
    textAlign: 'left'
  },
  flag: {
    fontSize: '1.25rem'
  },
  menuButton: {
    display: 'none',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '0.5rem'
  },
  mobileNav: {
    display: 'flex',
    flexDirection: 'column',
    borderTop: '1px solid',
    padding: '1rem'
  },
  mobileNavLink: {
    textDecoration: 'none',
    fontWeight: '500',
    padding: '0.75rem 1rem',
    borderRadius: '0.5rem',
    transition: 'all 0.3s ease'
  },
  mobileNavLinkActive: {
    fontWeight: '600'
  },
  mobileControls: {
    marginTop: '1rem',
    paddingTop: '1rem',
    borderTop: '1px solid rgba(0,0,0,0.1)',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem'
  },
  mobileControlBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    padding: '0.75rem 1rem',
    border: 'none',
    borderRadius: '0.5rem',
    cursor: 'pointer',
    fontSize: '0.95rem',
    fontWeight: '500'
  },
  mobileLangSelector: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem'
  },
  mobileLangBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    padding: '0.75rem 1rem',
    border: 'none',
    borderRadius: '0.5rem',
    cursor: 'pointer',
    fontSize: '0.95rem',
    fontWeight: '500',
    textAlign: 'left'
  }
};

// Media query for responsive design
const mediaQuery = window.matchMedia('(max-width: 768px)');
if (mediaQuery.matches) {
  styles.desktopNav.display = 'none';
  styles.menuButton.display = 'block';
}

export default Navbar;