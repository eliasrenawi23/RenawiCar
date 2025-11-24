'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import en from '../public/locales/en.json';
import he from '../public/locales/he.json';
import ar from '../public/locales/ar.json';

export type Language = 'en' | 'he' | 'ar';

export interface Translations {
  nav: {
    home: string;
    browseCars: string;
    contact: string;
    admin: string;
    login: string;
  };
  common: {
    currency: string;
    loading: string;
    error: string;
    price: string;
    details: string;
    search: string;
    filter: string;
    contactUs: string;
    legal: string;
  };
  footer: {
    rights: string;
    privacy: string;
    terms: string;
    vatIncluded: string;
  };
}

const translations: Record<Language, Translations> = {
  en: en as Translations,
  he: he as Translations,
  ar: ar as Translations,
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
  dir: 'ltr' | 'rtl';
  formatCurrency: (amount: number) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    // Check local storage or browser preference
    const savedLang = localStorage.getItem('language') as Language;
    if (savedLang && ['en', 'he', 'ar'].includes(savedLang)) {
      setLanguage(savedLang);
    }
  }, []);

  useEffect(() => {
    const dir = language === 'en' ? 'ltr' : 'rtl';
    document.documentElement.dir = dir;
    document.documentElement.lang = language;
    localStorage.setItem('language', language);
  }, [language]);

  const t = translations[language];
  const dir = language === 'en' ? 'ltr' : 'rtl';

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat(language === 'en' ? 'en-IL' : language, {
      style: 'currency',
      currency: 'ILS',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, dir, formatCurrency }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
