import React, { createContext, useContext, useState, useEffect, useMemo, useCallback, ReactNode } from 'react';
import { en, Translation } from './translations/en';
import { vi } from './translations/vi';

type Language = 'en' | 'vi';

interface I18nContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

const translations: Record<Language, Translation> = { en, vi };

export const I18nProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    // Read from localStorage on mount (SSR-safe check)
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('language');
      if (saved === 'en' || saved === 'vi') return saved;
    }
    return 'en'; // Default to English
  });

  // Sync HTML lang attribute for SEO/accessibility
  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  // Wrap setLanguage to update state
  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
  }, []);

  // Translation function with nested key support
  const t = useCallback((key: string): string => {
    const keys = key.split('.');
    let value: any = translations[language];

    for (const k of keys) {
      value = value?.[k];
    }

    return typeof value === 'string' ? value : key; // Fallback to key if missing
  }, [language]);

  // CRITICAL: Memoize context value to prevent re-render thrashing
  const value = useMemo(() => ({ language, setLanguage, t }), [language, setLanguage, t]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
};

export const useI18n = (): I18nContextType => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within I18nProvider');
  }
  return context;
};
