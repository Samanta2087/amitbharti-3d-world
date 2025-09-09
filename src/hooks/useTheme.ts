import { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'dark' | 'light' | 'system';

type ThemeProviderContext = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const ThemeProviderContext = createContext<ThemeProviderContext | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);
  
  if (context === undefined) {
    // Return a default implementation when used outside of provider
    const [theme, setThemeState] = useState<Theme>('system');
    
    useEffect(() => {
      const stored = localStorage.getItem('theme') as Theme;
      if (stored) {
        setThemeState(stored);
      }
    }, []);

    const setTheme = (newTheme: Theme) => {
      setThemeState(newTheme);
      localStorage.setItem('theme', newTheme);
      
      const root = window.document.documentElement;
      root.classList.remove('light', 'dark');
      
      if (newTheme === 'system') {
        const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        root.classList.add(systemTheme);
      } else {
        root.classList.add(newTheme);
      }
    };

    return { theme, setTheme };
  }
  
  return context;
};