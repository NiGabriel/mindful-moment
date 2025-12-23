import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Heart, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/breathing', label: 'Breathing' },
    { path: '/meditation', label: 'Meditation' },
    { path: '/affirmations', label: 'Affirmations' },
    { path: '/sounds', label: 'Sounds' },
    { path: '/grounding', label: 'Grounding' },
    { path: '/resources', label: 'Resources' }
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav style={styles.nav}>
      <div className="container" style={styles.container}>
        <Link to="/" style={styles.logo}>
          <Heart size={28} style={styles.logoIcon} />
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
                ...(isActive(link.path) ? styles.navLinkActive : {})
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          style={styles.menuButton}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div style={styles.mobileNav}>
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              style={{
                ...styles.mobileNavLink,
                ...(isActive(link.path) ? styles.mobileNavLinkActive : {})
              }}
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

const styles = {
  nav: {
    backgroundColor: '#ffffff',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
    borderBottom: '1px solid #e2e8f0'
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
  logoIcon: {
    color: '#6366f1'
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
    color: '#64748b',
    fontWeight: '500',
    fontSize: '0.95rem',
    transition: 'color 0.3s ease',
    position: 'relative',
    padding: '0.5rem 0'
  },
  navLinkActive: {
    color: '#6366f1',
    fontWeight: '600'
  },
  menuButton: {
    display: 'none',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: '#1e293b',
    padding: '0.5rem'
  },
  mobileNav: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    borderTop: '1px solid #e2e8f0',
    padding: '1rem'
  },
  mobileNavLink: {
    textDecoration: 'none',
    color: '#64748b',
    fontWeight: '500',
    padding: '0.75rem 1rem',
    borderRadius: '0.5rem',
    transition: 'all 0.3s ease'
  },
  mobileNavLinkActive: {
    backgroundColor: '#f1f5f9',
    color: '#6366f1',
    fontWeight: '600'
  }
};

// Media query for responsive design
const mediaQuery = window.matchMedia('(max-width: 768px)');
if (mediaQuery.matches) {
  styles.desktopNav.display = 'none';
  styles.menuButton.display = 'block';
}

export default Navbar;