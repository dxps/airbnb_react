import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';

import { getItem, setItem } from '../lib/utils/localStorage';

const initialState = {
  theme: 'dark',
  setTheme: (theme: string) => {},
};

const ThemeProviderContext = createContext(initialState);

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined)
    throw new Error('useTheme must be used within a ThemeProvider');

  return context;
};

type ThemeProviderProps = {
  children: ReactNode;
  defaultTheme?: 'light' | 'dark' | 'system';
  storageKey?: string;
};

const ThemeProvider = ({
  children,
  defaultTheme = 'dark',
  storageKey = 'airbnb_react_theme',
  ...props
}: ThemeProviderProps) => {
  const [theme, setTheme] = useState<string>(
    () => getItem(storageKey) || defaultTheme,
  );
  const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    const newTheme = theme === 'system' ? systemTheme : theme;
    root.classList.add(theme);

    if (!getItem(storageKey)) {
      setItem(storageKey, newTheme);
    }
  }, [storageKey, systemTheme, theme]);

  const value = {
    theme,
    setTheme: (theme: string) => {
      const newTheme = theme === 'system' ? systemTheme : theme;
      setItem(storageKey, newTheme);
      setTheme(newTheme);
    },
  };

  return (
    <ThemeProviderContext.Provider value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
};

export default ThemeProvider;
