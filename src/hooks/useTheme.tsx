import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useColorScheme } from 'react-native';
import { Colors, ThemeColors, ThemeMode } from '../theme';
import { storage } from '../services/storage';

interface ThemeContextType {
  colors: ThemeColors;
  mode: ThemeMode;
  isDark: boolean;
  toggleTheme: () => void;
  setTheme: (mode: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  colors: Colors.light,
  mode: 'light',
  isDark: false,
  toggleTheme: () => {},
  setTheme: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const systemColorScheme = useColorScheme();
  const [mode, setModeState] = useState<ThemeMode>('light');

  useEffect(() => {
    loadTheme();
  }, []);

  const loadTheme = async () => {
    const saved = await storage.getTheme();
    if (saved === 'light' || saved === 'dark') {
      setModeState(saved);
    } else {
      setModeState(systemColorScheme === 'dark' ? 'dark' : 'light');
    }
  };

  const setTheme = useCallback(async (newMode: ThemeMode) => {
    setModeState(newMode);
    await storage.setTheme(newMode);
  }, []);

  const toggleTheme = useCallback(async () => {
    const newMode = mode === 'light' ? 'dark' : ('dark' as const);
    await setTheme(newMode);
  }, [mode, setTheme]);

  const colors = mode === 'dark' ? Colors.dark : Colors.light;

  return (
    <ThemeContext.Provider value={{ colors, mode, isDark: mode === 'dark', toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}

export { ThemeContext };
