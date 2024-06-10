import { useEffect, useState } from 'react';

const useThemeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Toggle the theme
  const toggleTheme = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem('isDarkMode', JSON.stringify(newMode));
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

  return { isDarkMode, toggleTheme };
};

export default useThemeToggle;
