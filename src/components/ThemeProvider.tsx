
import React, { createContext, useContext, useEffect, useState } from 'react';

interface ThemeContextType {
  theme: string;
  setTheme: (theme: string) => void;
  isDark: boolean;
  setIsDark: (isDark: boolean) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('color-theme');
    return savedTheme || 'default';
  });
  
  const [isDark, setIsDark] = useState(() => {
    const savedMode = localStorage.getItem('dark-mode');
    return savedMode === 'true';
  });

  useEffect(() => {
    localStorage.setItem('color-theme', theme);
    
    // Apply the theme by updating CSS variables
    const root = document.documentElement;
    switch(theme) {
      case 'blue':
        root.style.setProperty('--primary', '217 91% 60%');
        root.style.setProperty('--ring', '217 91% 60%');
        root.style.setProperty('--sidebar-primary', '217 91% 60%');
        break;
      case 'green':
        root.style.setProperty('--primary', '152 60% 36%');
        root.style.setProperty('--ring', '152 60% 36%');
        root.style.setProperty('--sidebar-primary', '152 60% 36%');
        break;
      case 'amber':
        root.style.setProperty('--primary', '45 93% 47%');
        root.style.setProperty('--ring', '45 93% 47%');
        root.style.setProperty('--sidebar-primary', '45 93% 47%');
        break;
      case 'purple':
        root.style.setProperty('--primary', '265 84% 64%');
        root.style.setProperty('--ring', '265 84% 64%');
        root.style.setProperty('--sidebar-primary', '265 84% 64%');
        break;
      default: // default pink theme
        root.style.setProperty('--primary', '328 76% 55%');
        root.style.setProperty('--ring', '328 76% 55%');
        root.style.setProperty('--sidebar-primary', '328 76% 55%');
        break;
    }
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('dark-mode', isDark.toString());
    document.documentElement.classList.toggle('dark', isDark);
  }, [isDark]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, isDark, setIsDark }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
