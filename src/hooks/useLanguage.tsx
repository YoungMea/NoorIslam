import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Language, setLanguage, getLanguage, getLanguageName, t } from '../i18n';
import { storage } from '../services/storage';

interface LanguageContextType {
  language: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => string;
  languageName: string;
}

const LanguageContext = createContext<LanguageContextType>({
  language: 'uz',
  setLang: () => {},
  t: (key: string) => key,
  languageName: "O'zbek (Lotin)",
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('uz');

  useEffect(() => {
    loadLanguage();
  }, []);

  const loadLanguage = async () => {
    const saved = await storage.getLanguage();
    if (saved === 'uz' || saved === 'uz_cyrillic' || saved === 'en') {
      setLanguageState(saved);
      setLanguage(saved);
    }
  };

  const setLang = useCallback(async (lang: Language) => {
    setLanguageState(lang);
    setLanguage(lang);
    await storage.setLanguage(lang);
  }, []);

  const translate = (key: string): string => {
    return (t as unknown as Record<string, string>)[key] || key;
  };

  const languageName = getLanguageName(language);

  return (
    <LanguageContext.Provider value={{ language, setLang, t: translate, languageName }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
