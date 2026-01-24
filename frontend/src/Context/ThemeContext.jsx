// ThemeContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';

// Create the context
const ThemeContext = createContext();

// Custom hook to use the theme context
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

// Theme provider component
export const ThemeProvider = ({ children }) => {
  // Define available themes
  const themes = {
    light: {
      name: 'light',
      label: 'Light',
      className: 'theme-light'
    },
    dark: {
      name: 'dark',
      label: 'Dark',
      className: 'theme-dark'
    },
    blue: {
      name: 'blue',
      label: 'Blue',
      className: 'theme-blue'
    },
    green: {
      name: 'green',
      label: 'Green',
      className: 'theme-green'
    }
  };

  // Get initial theme from localStorage or system preference
  const getInitialTheme = () => {
    // Check localStorage first
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme && themes[savedTheme]) {
      return savedTheme;
    }
    
    // Check system preference for dark mode
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    
    // Default to light
    return 'light';
  };

  const [theme, setTheme] = useState(getInitialTheme);
  const [isDarkMode, setIsDarkMode] = useState(theme === 'dark');

  // Apply theme to document
  const applyTheme = (themeName) => {
    // Remove all theme classes
    document.documentElement.classList.remove(
      'theme-light',
      'theme-dark', 
      'theme-blue',
      'theme-green'
    );
    
    // Add the new theme class
    document.documentElement.classList.add(themes[themeName].className);
    
    // Set data-theme attribute for Tailwind v4
    document.documentElement.setAttribute('data-theme', themeName);
    
    // Set dark mode flag
    setIsDarkMode(themeName === 'dark');
  };

  // Initialize theme on mount
  useEffect(() => {
    applyTheme(theme);
    localStorage.setItem('theme', theme);
    console.log(theme)
  }, [theme]);

  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e) => {
      // Only auto-switch if user hasn't explicitly chosen a theme
      const savedTheme = localStorage.getItem('theme');
      if (!savedTheme) {
        const newTheme = e.matches ? 'dark' : 'light';
        setTheme(newTheme);
      }
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Toggle between light and dark
  const toggleDarkMode = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  // Set a specific theme
  const changeTheme = (themeName) => {
    if (themes[themeName]) {
      setTheme(themeName);
    }
  };

  // Get all available themes
  const getAvailableThemes = () => {
    return Object.values(themes);
  };

  const value = {
    theme,
    themeData: themes[theme],
    isDarkMode,
    toggleDarkMode,
    changeTheme,
    getAvailableThemes
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};