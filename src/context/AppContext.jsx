import { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light';
  });
  
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('language') || 'en';
  });

  const [userMood, setUserMood] = useState(null);

  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const changeLanguage = (lang) => {
    setLanguage(lang);
  };

  const value = {
    theme,
    toggleTheme,
    language,
    changeLanguage,
    userMood,
    setUserMood
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;