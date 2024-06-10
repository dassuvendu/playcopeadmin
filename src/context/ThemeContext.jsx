import { createContext, useState, useEffect } from 'react';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  // Restore the theme from localStorage
  useEffect(() => {
    return () => {
      const storedMode = localStorage.getItem('isDarkMode');
      if (storedMode !== null) {
        setIsDarkMode(JSON.parse(storedMode));
      } else {
        const prefersDarkMode =
          window.matchMedia &&
          window.matchMedia('(prefers-color-scheme: dark)').matches;
        setIsDarkMode(prefersDarkMode);
      }
    };
  }, []);

  // Apply the appropriate theme class to the HTML element
  useEffect(() => {
    const html = window.document.documentElement;
    if (isDarkMode) {
      html.classList.remove('light');
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
      html.classList.add('light');
    }
  }, [isDarkMode]);

  const theme = {
    isDarkMode,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
};
